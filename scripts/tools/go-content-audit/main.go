package main

import (
	"encoding/json"
	"fmt"
	"go/ast"
	"go/importer"
	"go/parser"
	"go/token"
	"go/types"
	"io/fs"
	"os"
	"path/filepath"
	"strconv"
	"strings"
)

var allowedImports = map[string]bool{
	"bytes": true, "cmp": true, "container/heap": true, "container/list": true,
	"container/ring": true, "context": true, "encoding/csv": true, "encoding/hex": true,
	"crypto/aes": true, "crypto/cipher": true, "crypto/ecdh": true, "crypto/ed25519": true,
	"crypto/hmac": true, "crypto/rsa": true, "crypto/sha256": true, "crypto/sha512": true,
	"crypto/subtle": true, "crypto/x509": true, "encoding/base64": true, "encoding/binary": true,
	"encoding/pem":  true,
	"encoding/json": true, "errors": true, "fmt": true, "io": true, "maps": true,
	"math": true, "math/big": true, "math/bits": true, "math/rand": true, "math/rand/v2": true,
	"reflect": true, "regexp": true, "slices": true, "sort": true, "strconv": true,
	"strings": true, "sync": true, "sync/atomic": true, "time": true,
	"unicode": true, "unicode/utf8": true,
}

type contentBlock struct {
	Type     string `json:"type"`
	Language string `json:"language"`
	Code     string `json:"code"`
}

type step struct {
	Content []contentBlock `json:"content"`
}

type activity struct {
	ID           string            `json:"id"`
	StarterFiles map[string]string `json:"starterFiles"`
	Steps        []step            `json:"steps"`
}

func main() {
	checked := 0
	roots := []string{
		filepath.Join("content", "v2", "courses", "go-basics", "activities"),
		filepath.Join("content", "v2", "courses", "http-clients-go", "activities"),
		filepath.Join("content", "v2", "courses", "cryptography-go", "activities"),
	}
	for _, root := range roots {
		err := filepath.WalkDir(root, func(path string, entry fs.DirEntry, walkErr error) error {
			if walkErr != nil {
				return walkErr
			}
			if entry.IsDir() || filepath.Ext(path) != ".json" {
				return nil
			}

			data, err := os.ReadFile(path)
			if err != nil {
				return err
			}
			var lesson activity
			if err := json.Unmarshal(data, &lesson); err != nil {
				return fmt.Errorf("%s: %w", path, err)
			}

			if starter := lesson.StarterFiles["go"]; starter != "" {
				if err := checkSource(lesson.ID+" starter", starter); err != nil {
					return err
				}
				checked++
			}
			for stepIndex, lessonStep := range lesson.Steps {
				for blockIndex, block := range lessonStep.Content {
					if block.Type != "code" || block.Language != "go" {
						continue
					}
					label := fmt.Sprintf("%s step %d block %d", lesson.ID, stepIndex+1, blockIndex+1)
					if err := checkSource(label, completeSource(block.Code)); err != nil {
						return err
					}
					checked++
				}
			}
			return nil
		})
		if err != nil {
			fmt.Fprintln(os.Stderr, err)
			os.Exit(1)
		}
	}
	if checked < 700 {
		fmt.Fprintf(os.Stderr, "expected at least 700 Go sources, checked %d\n", checked)
		os.Exit(1)
	}
	fmt.Printf("Go content audit passed: %d starter and lesson sources parsed and type-checked.\n", checked)
}

func completeSource(source string) string {
	trimmed := strings.TrimSpace(source)
	if strings.HasPrefix(trimmed, "package ") {
		return source
	}
	imports := ""
	if strings.Contains(source, "fmt.") {
		imports = "\nimport \"fmt\"\n"
	}
	return "package main\n" + imports + "\n" + source
}

func checkSource(label, source string) error {
	files := token.NewFileSet()
	parsed, err := parser.ParseFile(files, label+".go", source, parser.AllErrors)
	if err != nil {
		return fmt.Errorf("%s syntax: %w", label, err)
	}
	if err := checkImports(label, parsed); err != nil {
		return err
	}
	configuration := types.Config{Importer: importer.Default()}
	if _, err := configuration.Check("learn-it-all/content", files, []*ast.File{parsed}, nil); err != nil {
		return fmt.Errorf("%s types: %w", label, err)
	}
	return nil
}

func checkImports(label string, parsed *ast.File) error {
	for _, imported := range parsed.Imports {
		path, err := strconv.Unquote(imported.Path.Value)
		if err != nil {
			return fmt.Errorf("%s import: %w", label, err)
		}
		if !allowedImports[path] {
			return fmt.Errorf("%s imports unavailable browser package %q", label, path)
		}
	}
	return nil
}
