import ts from 'typescript';

const MAX_SOURCE_CHARACTERS = 50_000;
const FILE_NAME = 'learner.ts';

export interface TypeScriptDiagnosticReport {
  ok: boolean;
  compilerVersion: string;
  diagnostics: string[];
}

export function diagnoseTypeScript(source: string): TypeScriptDiagnosticReport {
  if (source.length > MAX_SOURCE_CHARACTERS) {
    return {
      ok: false,
      compilerVersion: ts.version,
      diagnostics: [`Source must be ${MAX_SOURCE_CHARACTERS.toLocaleString()} characters or less.`],
    };
  }

  const options: ts.CompilerOptions = {
    strict: true,
    noEmit: true,
    noUncheckedIndexedAccess: true,
    exactOptionalPropertyTypes: true,
    target: ts.ScriptTarget.ES2024,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    skipLibCheck: true,
  };
  const defaultHost = ts.createCompilerHost(options, true);
  const host: ts.CompilerHost = {
    ...defaultHost,
    fileExists: (fileName) => fileName === FILE_NAME || defaultHost.fileExists(fileName),
    readFile: (fileName) => (fileName === FILE_NAME ? source : defaultHost.readFile(fileName)),
    getSourceFile: (fileName, languageVersion) =>
      fileName === FILE_NAME
        ? ts.createSourceFile(FILE_NAME, source, languageVersion, true, ts.ScriptKind.TS)
        : defaultHost.getSourceFile(fileName, languageVersion),
    writeFile: () => undefined,
  };
  const program = ts.createProgram([FILE_NAME], options, host);
  const diagnostics = ts.getPreEmitDiagnostics(program).map((diagnostic) => {
    const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
    if (!diagnostic.file || diagnostic.start === undefined) return message;
    const position = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
    return `Line ${position.line + 1}, column ${position.character + 1}: ${message}`;
  });

  return {
    ok: diagnostics.length === 0,
    compilerVersion: ts.version,
    diagnostics,
  };
}
