// The LEARN-IT-ALL Go runner is compiled to WebAssembly and loaded only inside
// a dedicated browser worker. Learner source never reaches the application
// server or a host command. The JavaScript side terminates the worker on a
// deadline, while this side bounds source/output and exposes a small stdlib
// allowlist to the Yaegi interpreter.
package main

import (
	"bytes"
	"fmt"
	"go/parser"
	"go/token"
	"runtime"
	"strconv"
	"strings"
	"syscall/js"

	"github.com/traefik/yaegi/interp"
	"github.com/traefik/yaegi/stdlib"
)

const (
	maxSourceBytes = 32 * 1024
	maxOutputBytes = 64 * 1024
)

var runtimeVersion = "Go " + strings.TrimPrefix(runtime.Version(), "go") + " host · Yaegi 0.16.1 interpreter"

var allowedImports = map[string]struct{}{
	"bytes":           {},
	"cmp":             {},
	"container/heap":  {},
	"container/list":  {},
	"container/ring":  {},
	"context":         {},
	"crypto/aes":      {},
	"crypto/cipher":   {},
	"crypto/ecdh":     {},
	"crypto/ed25519":  {},
	"crypto/hmac":     {},
	"crypto/rsa":      {},
	"crypto/sha256":   {},
	"crypto/sha512":   {},
	"crypto/subtle":   {},
	"crypto/x509":     {},
	"encoding/base64": {},
	"encoding/binary": {},
	"encoding/csv":    {},
	"encoding/hex":    {},
	"encoding/json":   {},
	"encoding/pem":    {},
	"errors":          {},
	"fmt":             {},
	"io":              {},
	"math":            {},
	"math/big":        {},
	"math/bits":       {},
	"math/rand":       {},
	"math/rand/v2":    {},
	"maps":            {},
	"reflect":         {},
	"regexp":          {},
	"slices":          {},
	"sort":            {},
	"strconv":         {},
	"strings":         {},
	"sync":            {},
	"sync/atomic":     {},
	"time":            {},
	"unicode":         {},
	"unicode/utf8":    {},
}

type runResult struct {
	Output  string
	Error   string
	Version string
}

func main() {
	js.Global().Set("runLearnerGo", js.FuncOf(runLearnerGo))
	select {}
}

func runLearnerGo(_ js.Value, args []js.Value) any {
	if len(args) != 1 {
		return resultValue(runResult{Error: "Expected one Go source string.", Version: runtimeVersion})
	}

	source := args[0].String()
	if len(source) > maxSourceBytes {
		return resultValue(runResult{
			Error:   fmt.Sprintf("Source is %d bytes; the browser lab limit is %d bytes.", len(source), maxSourceBytes),
			Version: runtimeVersion,
		})
	}

	if err := validateImports(source); err != nil {
		return resultValue(runResult{Error: err.Error(), Version: runtimeVersion})
	}

	var stdout bytes.Buffer
	var stderr bytes.Buffer
	runner := interp.New(interp.Options{
		Stdout: &stdout,
		Stderr: &stderr,
		Args:   []string{"learn-it-all-go"},
		Env:    []string{},
	})

	if err := runner.Use(safeStandardLibrary()); err != nil {
		return resultValue(runResult{Error: "Could not initialize the safe Go library: " + err.Error(), Version: runtimeVersion})
	}

	_, evalErr := runner.Eval(source)
	output := stdout.String()
	if stderr.Len() > 0 {
		if output != "" && !strings.HasSuffix(output, "\n") {
			output += "\n"
		}
		output += stderr.String()
	}
	output = boundedOutput(output)

	errText := ""
	if evalErr != nil {
		errText = evalErr.Error()
	}

	return resultValue(runResult{Output: output, Error: errText, Version: runtimeVersion})
}

func validateImports(source string) error {
	parsed, err := parser.ParseFile(token.NewFileSet(), "learner.go", source, parser.ImportsOnly)
	if err != nil {
		return fmt.Errorf("Go syntax error: %w", err)
	}

	for _, imported := range parsed.Imports {
		path, err := strconv.Unquote(imported.Path.Value)
		if err != nil {
			return fmt.Errorf("invalid import path %s", imported.Path.Value)
		}
		if _, ok := allowedImports[path]; !ok {
			return fmt.Errorf("import %q is unavailable in this isolated browser lab", path)
		}
	}
	return nil
}

func safeStandardLibrary() interp.Exports {
	safe := interp.Exports{}
	for importPath := range allowedImports {
		if symbols, ok := stdlib.Symbols[importPath+"/"+packageName(importPath)]; ok {
			safe[importPath+"/"+packageName(importPath)] = symbols
			continue
		}
		if symbols, ok := stdlib.Symbols[importPath]; ok {
			safe[importPath] = symbols
		}
	}
	return safe
}

func packageName(importPath string) string {
	if importPath == "math/rand/v2" {
		return "rand"
	}
	if slash := strings.LastIndexByte(importPath, '/'); slash >= 0 {
		return importPath[slash+1:]
	}
	return importPath
}

func boundedOutput(output string) string {
	if len(output) <= maxOutputBytes {
		return output
	}
	return output[:maxOutputBytes] + "\n… output stopped at the 64 KiB browser-lab limit"
}

func resultValue(result runResult) map[string]any {
	return map[string]any{
		"output":  result.Output,
		"error":   result.Error,
		"version": result.Version,
	}
}
