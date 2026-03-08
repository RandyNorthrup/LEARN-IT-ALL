---
id: lesson-002-006
title: Install and Configure Visual Studio Code
chapterId: chapter-02
order: 6
duration: 5
objectives:
  - Install the .NET 8 SDK and verify the installation
  - Install and configure VS Code with the C# Dev Kit extension
  - Create, build, and run a console project with the dotnet CLI
  - Understand the project structure (.csproj, Program.cs, bin, obj)
---

# Install and Configure Visual Studio Code for C#

## Installing the .NET SDK

The **.NET SDK** (Software Development Kit) includes everything you need to build and run C# applications: the compiler, runtime, and CLI tools.

1. Go to [https://dotnet.microsoft.com/download](https://dotnet.microsoft.com/download)
2. Download **.NET 8** (LTS) for your operating system (Windows, macOS, or Linux)
3. Run the installer and follow the prompts

Verify the installation by opening a terminal:

```bash
dotnet --version
```

You should see something like `8.0.xxx`. You can also check all installed SDKs:

```bash
dotnet --list-sdks
```

## Installing Visual Studio Code

1. Download VS Code from [https://code.visualstudio.com](https://code.visualstudio.com)
2. Install it for your operating system
3. Launch VS Code

## Installing the C# Extension

VS Code needs extensions for C# support:

1. Open the **Extensions** panel (`Ctrl+Shift+X` / `Cmd+Shift+X`)
2. Search for **"C# Dev Kit"** by Microsoft
3. Click **Install**

The C# Dev Kit installs several components:
- **C#** — language support (IntelliSense, syntax highlighting, debugging)
- **C# Dev Kit** — project management, testing, solution explorer
- **.NET Install Tool** — helps manage .NET SDK versions

## Creating Your First Project

Use the `dotnet` CLI to create a new console application:

```bash
dotnet new console -n MyFirstApp
cd MyFirstApp
```

This creates a project with the following structure:

```
MyFirstApp/
├── MyFirstApp.csproj    # Project configuration file
├── Program.cs           # Your C# source code
└── obj/                 # Build metadata (auto-generated)
```

### Understanding the .csproj File

The `.csproj` file is an XML file that configures your project:

```xml
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net8.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>
</Project>
```

- **OutputType**: `Exe` means it produces an executable
- **TargetFramework**: `net8.0` targets .NET 8
- **ImplicitUsings**: automatically imports common namespaces (`System`, `System.Collections.Generic`, etc.)
- **Nullable**: enables nullable reference type warnings

### Understanding Program.cs

The generated `Program.cs` contains a single line:

```csharp
Console.WriteLine("Hello, World!");
```

This uses **top-level statements** (C# 9+) — the compiler generates the `Main` method and class for you behind the scenes.

## Building and Running

### Build the Project

```bash
dotnet build
```

This compiles your code and places the output in the `bin/Debug/net8.0/` directory. You'll see your compiled `.dll` file there.

### Run the Project

```bash
dotnet run
```

Output:

```
Hello, World!
```

`dotnet run` automatically builds (if needed) and then executes the program.

### Build for Release

For optimized builds without debug information:

```bash
dotnet build --configuration Release
```

## Project Directory Structure After Building

```
MyFirstApp/
├── MyFirstApp.csproj
├── Program.cs
├── bin/
│   └── Debug/
│       └── net8.0/
│           ├── MyFirstApp.dll      # Compiled assembly
│           ├── MyFirstApp.exe      # Executable (on Windows)
│           └── MyFirstApp.runtimeconfig.json
└── obj/                            # Build metadata
```

- `bin/` contains build output — this is what gets deployed or executed
- `obj/` contains intermediate build files — you can safely ignore it
- Both `bin/` and `obj/` are typically listed in `.gitignore`

## Useful dotnet CLI Commands

| Command                    | Description                          |
|----------------------------|--------------------------------------|
| `dotnet new console -n X`  | Create a new console project         |
| `dotnet build`             | Compile the project                  |
| `dotnet run`               | Build and run the project            |
| `dotnet clean`             | Remove build outputs                 |
| `dotnet new list`          | Show all available project templates |
| `dotnet add package X`     | Add a NuGet package                  |

## Debugging in VS Code

To debug your C# application:

1. Open `Program.cs` in VS Code
2. Set a **breakpoint** by clicking in the gutter (left margin) next to a line number
3. Press `F5` or go to **Run > Start Debugging**
4. VS Code will build and launch the debugger, pausing at your breakpoint
5. Use the debug toolbar to **Step Over** (`F10`), **Step Into** (`F11`), or **Continue** (`F5`)

The debug console shows output, and the **Variables** panel lets you inspect values at runtime.

## Key Takeaways

- Install the .NET 8 SDK and verify with `dotnet --version`
- Install the **C# Dev Kit** extension in VS Code for full C# support
- Use `dotnet new console` to create projects and `dotnet run` to execute them
- The `.csproj` file configures your project; `Program.cs` contains your code
- `bin/` holds compiled output; `obj/` holds build metadata

*Based on the [freeCodeCamp Foundational C# with Microsoft Certification](https://www.freecodecamp.org/learn/foundational-c-sharp-with-microsoft/)*
