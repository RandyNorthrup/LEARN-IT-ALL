---
id: lesson-006-001
title: "Nano — Build a Castle"
chapterId: chapter-06
order: 2
duration: 60
objectives:
  - Open, edit, and save files using the Nano text editor
  - Navigate within files using keyboard shortcuts
  - Use cut, copy, paste, and undo operations in Nano
  - Search for and replace text within a file
  - Build a multi-line ASCII art castle using Nano
---

# Nano — Build a Castle

Nano is a simple, beginner-friendly terminal text editor that comes pre-installed on most Linux distributions. Unlike editors such as Vim or Emacs, Nano displays its available commands right on the screen, making it approachable for newcomers. In this lesson, you will learn how to use Nano by building an ASCII art castle — a creative project that exercises navigation, editing, and file management skills.

## Opening Nano

To open Nano with a new or existing file:

```bash
nano castle.sh
```

If `castle.sh` does not exist, Nano creates it when you save. If it does exist, Nano opens it for editing. You will see a screen like this:

```
  GNU nano 6.2                    castle.sh

|
                            (cursor is here)



^G Help    ^O Write Out  ^W Where Is   ^K Cut
^X Exit    ^R Read File  ^\ Replace    ^U Paste
```

The bottom two rows show available commands. The `^` symbol means **Ctrl**. So `^O` means press **Ctrl+O**.

## Essential Nano Shortcuts

Here are the shortcuts you will use most often:

| Shortcut | Action |
|----------|--------|
| `Ctrl+O` | **Write Out** — Save the file |
| `Ctrl+X` | **Exit** — Close Nano (prompts to save if modified) |
| `Ctrl+W` | **Where Is** — Search for text |
| `Ctrl+\` | **Replace** — Find and replace text |
| `Ctrl+K` | **Cut** — Cut the current line |
| `Ctrl+U` | **Paste** (Uncut) — Paste the last cut text |
| `Ctrl+6` | **Mark** — Start selecting text |
| `Alt+6` | **Copy** — Copy the current line (without cutting) |
| `Ctrl+_` | **Go to Line** — Jump to a specific line number |
| `Ctrl+G` | **Help** — Display the full help screen |
| `Alt+U` | **Undo** — Undo the last action |
| `Alt+E` | **Redo** — Redo the last undone action |

## Building the Castle — Step by Step

### Step 1 — Create the Script File

Open the file:

```bash
nano castle.sh
```

First, add the shebang line so the file can be executed as a script:

```bash
#!/bin/bash
```

Type that line, then press **Enter** twice to leave a blank line.

### Step 2 — Add the Print Command

We will use `echo` statements to print each line of the castle. Start with a comment and the first `echo`:

```bash
#!/bin/bash

# ASCII Art Castle
echo ""
echo "                 |>>>"
echo "                 |"
echo "           _   ___ _   _"
echo "          |;| |;| |;| |;|"
echo "          |;| |;| |;| |;|"
echo "         /   \\         /   \\"
echo "        /     \\       /     \\"
echo "       | _____ |     | _____ |"
echo "       ||     ||     ||     ||"
echo "       ||     ||     ||     ||"
echo "       ||  _  || |=| ||  _  ||"
echo "       || | | ||     || | | ||"
echo "       ||_| |_||     ||_| |_||"
echo "      /===] [===\\   /===] [===\\"
echo "     ///           \\\\\\\\\\"
echo "    ///             \\\\\\\\\\"
echo "   ///               \\\\\\\\\\"
echo ""
```

Save the file with **Ctrl+O**, press **Enter** to confirm the filename, then stay in the editor.

### Step 3 — Practice Navigation

Now that you have multiple lines, practice moving around:

- **Arrow keys** move the cursor one character or line at a time.
- **Ctrl+A** moves to the beginning of the current line.
- **Ctrl+E** moves to the end of the current line.
- **Ctrl+Y** scrolls up one page.
- **Ctrl+V** scrolls down one page.
- **Ctrl+_** (Ctrl+Underscore) then type a line number to jump directly to it.

Try jumping to line 5:

1. Press **Ctrl+_**
2. Type `5`
3. Press **Enter**

Your cursor should now be on the fifth line of the file.

### Step 4 — Using Cut and Paste

Suppose you want to move a line. Navigate to the line you want to move, then:

1. Press **Ctrl+K** to cut the line.
2. Move your cursor to the new location.
3. Press **Ctrl+U** to paste it there.

You can also cut multiple consecutive lines by pressing **Ctrl+K** multiple times in a row. All cut lines stack up in the cut buffer, and pressing **Ctrl+U** pastes them all at once.

### Step 5 — Copying Lines

To copy without removing the original line:

1. Move to the line you want to copy.
2. Press **Alt+6** to copy the line.
3. Move to the destination.
4. Press **Ctrl+U** to paste.

This is useful when you need to duplicate a row of the castle (for example, repeating a wall pattern).

### Step 6 — Search and Replace

Suppose you want to replace every `|;|` with `|#|` to change the tower window style:

1. Press **Ctrl+\\** to open Find and Replace.
2. Type `|;|` and press **Enter**.
3. Type `|#|` and press **Enter**.
4. Nano will highlight the first match and ask: **Replace this instance?**
   - Press `Y` to replace this one.
   - Press `N` to skip this one.
   - Press `A` to replace **all** occurrences at once.

Press `A` to replace all. Nano will report how many replacements were made.

If you change your mind, press **Alt+U** to undo changes one at a time.

### Step 7 — Selecting Text with Mark

To select a specific block of text:

1. Move your cursor to the start of the selection.
2. Press **Ctrl+6** (or **Alt+A**) to set a mark.
3. Move your cursor to the end of the selection — the text will be highlighted.
4. Press **Ctrl+K** to cut the selection, or **Alt+6** to copy it.

This is useful for selecting parts of a line rather than the entire line.

### Step 8 — Make the Script Executable and Run It

Save the file (**Ctrl+O**, **Enter**) and exit (**Ctrl+X**). Then back in the terminal:

```bash
chmod +x castle.sh
./castle.sh
```

You should see your ASCII castle printed to the terminal:

```
                 |>>>
                 |
           _   ___ _   _
          |#| |#| |#| |#|
          |#| |#| |#| |#|
         /   \         /   \
        /     \       /     \
       | _____ |     | _____ |
       ||     ||     ||     ||
       ||     ||     ||     ||
       ||  _  || |=| ||  _  ||
       || | | ||     || | | ||
       ||_| |_||     ||_| |_||
      /===] [===\   /===] [===\
```

## Additional Nano Tips

### Configuration with `.nanorc`

You can customize Nano by creating a `~/.nanorc` file:

```bash
nano ~/.nanorc
```

Add useful settings:

```
set linenumbers       # Show line numbers
set tabsize 4         # Set tab width to 4 spaces
set autoindent        # Auto-indent new lines
set mouse             # Enable mouse support
set softwrap          # Wrap long lines visually
```

### Syntax Highlighting

Nano supports syntax highlighting for many languages. Most distributions include highlighting rules in `/usr/share/nano/`. Enable them by adding to your `.nanorc`:

```
include "/usr/share/nano/*.nanorc"
```

This enables color-coded syntax for Bash, Python, HTML, CSS, JavaScript, SQL, and many other languages.

### Opening at a Specific Line

You can open a file directly at a specific line number:

```bash
nano +10 castle.sh    # Opens castle.sh with cursor on line 10
```

## Key Takeaways

1. **Nano is the most accessible terminal editor** — commands are displayed on screen, making it easy to learn without memorization.
2. **Ctrl+O saves, Ctrl+X exits** — these two shortcuts are the foundation of working in Nano.
3. **Ctrl+K and Ctrl+U** form a cut-and-paste system that operates on entire lines by default.
4. **Ctrl+\\** provides find-and-replace with options to replace one instance or all matches.
5. **Ctrl+6** lets you mark and select specific text regions for precise editing.
6. **Alt+U** undoes mistakes — a safety net while learning.
7. Nano is an excellent choice for quick edits on servers, config files, and scripts where a full IDE is unavailable.

---

*This lesson is based on the "Learn Nano by Building a Castle" project from the [freeCodeCamp Relational Database Certification](https://www.freecodecamp.org/learn/relational-database/).*
