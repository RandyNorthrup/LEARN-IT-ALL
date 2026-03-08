---
id: lesson-003-001
title: "Bash — Build a Boilerplate"
chapterId: chapter-03
order: 1
duration: 120
objectives:
  - Navigate the Linux filesystem using pwd, ls, and cd
  - Create and manage files and directories with mkdir, touch, cp, mv, and rm
  - View and manipulate file contents using echo, cat, and redirection operators
  - Understand Linux file permissions and modify them with chmod
  - Build a complete website boilerplate project from the terminal
---

# Bash — Build a Boilerplate

The Linux terminal is one of the most powerful tools available to a developer. In this project-based lesson, you will learn essential Bash commands by building a website boilerplate — a starter template with HTML, CSS, and JavaScript files — entirely from the command line. No graphical file manager, no code editor with a GUI: just you and the terminal.

## Understanding the Terminal

When you open a terminal, you are given a **shell** — a text-based interface to your operating system. The default shell on most Linux distributions is **Bash** (Bourne Again SHell). Every command you type is interpreted by the shell and executed by the operating system.

The **prompt** typically looks something like this:

```bash
user@hostname:~$
```

The `~` represents your home directory, and the `$` indicates you are a regular user (a `#` would mean root/superuser).

## Navigating the Filesystem

### Where Am I? — `pwd`

The `pwd` command prints the **present working directory**, your current location in the filesystem:

```bash
pwd
# Output: /home/user
```

### What's Here? — `ls`

The `ls` command lists the contents of the current directory:

```bash
ls
# Output: Desktop  Documents  Downloads  Music  Pictures

ls -l
# Output: detailed listing with permissions, owner, size, date

ls -a
# Output: includes hidden files (those starting with .)

ls -la
# Output: detailed listing including hidden files
```

The `-l` flag shows a **long listing** with file permissions, ownership, size, and modification date. The `-a` flag shows **all** files, including hidden ones.

### Moving Around — `cd`

The `cd` command changes your working directory:

```bash
cd Documents        # Move into the Documents folder
cd ..               # Move up one directory
cd ../..            # Move up two directories
cd ~                # Go to your home directory
cd /                # Go to the root of the filesystem
cd -                # Go to the previous directory
```

## Building the Boilerplate — Step by Step

Now let's build a real project. We will create a website boilerplate with an organized directory structure.

### Step 1 — Create the Project Directory

```bash
mkdir website-boilerplate
cd website-boilerplate
pwd
# Output: /home/user/website-boilerplate
```

The `mkdir` command creates a new directory. You can also create nested directories in one command with the `-p` flag:

```bash
mkdir -p src/css src/js src/images
```

This creates the `src` directory and three subdirectories inside it — all at once. Let's verify the structure:

```bash
ls src
# Output: css  images  js
```

### Step 2 — Create Files with `touch`

The `touch` command creates empty files (or updates the timestamp of existing files):

```bash
touch index.html
touch src/css/styles.css
touch src/js/main.js
touch README.md
```

### Step 3 — Add Content with `echo` and Redirection

The `echo` command prints text to the terminal. Combined with the **redirection operator** `>`, it writes text to a file. The `>>` operator **appends** instead of overwriting:

```bash
echo "<!DOCTYPE html>" > index.html
echo "<html lang=\"en\">" >> index.html
echo "<head>" >> index.html
echo "  <meta charset=\"UTF-8\">" >> index.html
echo "  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">" >> index.html
echo "  <title>My Boilerplate</title>" >> index.html
echo "  <link rel=\"stylesheet\" href=\"src/css/styles.css\">" >> index.html
echo "</head>" >> index.html
echo "<body>" >> index.html
echo "  <h1>Hello, Terminal!</h1>" >> index.html
echo "  <script src=\"src/js/main.js\"></script>" >> index.html
echo "</body>" >> index.html
echo "</html>" >> index.html
```

### Step 4 — View File Contents with `cat`

The `cat` command prints the contents of a file to the terminal:

```bash
cat index.html
```

Output:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Boilerplate</title>
  <link rel="stylesheet" href="src/css/styles.css">
</head>
<body>
  <h1>Hello, Terminal!</h1>
  <script src="src/js/main.js"></script>
</body>
</html>
```

Now add some CSS:

```bash
echo "* { margin: 0; padding: 0; box-sizing: border-box; }" > src/css/styles.css
echo "body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; }" >> src/css/styles.css
echo "h1 { color: #333; }" >> src/css/styles.css
```

And a simple JavaScript file:

```bash
echo "console.log('Boilerplate loaded successfully!');" > src/js/main.js
```

### Step 5 — Copy and Move Files

The `cp` command copies files. The `mv` command moves or renames them:

```bash
# Copy index.html as a backup
cp index.html index.backup.html

# Rename the backup
mv index.backup.html backup.html

# Move it into a new directory
mkdir backups
mv backup.html backups/

# Copy an entire directory (requires -r for recursive)
cp -r src src-backup
```

### Step 6 — Remove Files and Directories

The `rm` command removes files. Use `-r` for directories and `-f` to force removal without prompts:

```bash
# Remove the backup copy
rm backups/backup.html

# Remove the empty backups directory
rmdir backups

# Remove the src-backup directory and everything inside it
rm -r src-backup
```

> **Warning:** `rm` is permanent. There is no recycle bin in the terminal. Be very careful, especially with `rm -rf`.

### Step 7 — Add a README

```bash
echo "# Website Boilerplate" > README.md
echo "" >> README.md
echo "A simple starter template for web projects." >> README.md
echo "" >> README.md
echo "## Structure" >> README.md
echo "" >> README.md
echo "- index.html — Main HTML file" >> README.md
echo "- src/css/styles.css — Stylesheet" >> README.md
echo "- src/js/main.js — JavaScript entry point" >> README.md
```

## File Permissions

Every file in Linux has **permissions** that control who can read, write, or execute it. View them with `ls -l`:

```bash
ls -l index.html
# Output: -rw-r--r-- 1 user user 312 Jan 15 10:30 index.html
```

The permission string `-rw-r--r--` breaks down as:

| Position | Meaning |
|----------|---------|
| `-` | File type (- = file, d = directory) |
| `rw-` | Owner permissions (read, write, no execute) |
| `r--` | Group permissions (read only) |
| `r--` | Others permissions (read only) |

Use `chmod` to change permissions:

```bash
# Make main.js executable
chmod +x src/js/main.js

# Set specific permissions using octal notation
chmod 755 src/js/main.js   # rwxr-xr-x
chmod 644 index.html        # rw-r--r--
```

The octal values are: **4** = read, **2** = write, **1** = execute. Add them together for each group (owner, group, others).

## Verifying the Final Structure

```bash
ls -R
# Output:
# .:
# index.html  README.md  src
#
# ./src:
# css  images  js
#
# ./src/css:
# styles.css
#
# ./src/images:
#
# ./src/js:
# main.js
```

The `-R` flag for `ls` provides a **recursive** listing that shows all files inside all subdirectories.

## Key Takeaways

1. **`pwd`, `ls`, `cd`** are your navigation trio — always know where you are and what is around you.
2. **`mkdir` and `touch`** create directories and files. Use `mkdir -p` for nested paths.
3. **`echo` with `>` and `>>`** lets you write content to files without opening an editor.
4. **`cat`** displays file contents quickly in the terminal.
5. **`cp`, `mv`, `rm`** manage files — copy, move/rename, and delete. Always be careful with `rm`.
6. **File permissions** (read, write, execute) protect your files. Use `chmod` to modify them.
7. Building projects from the terminal gives you precise control and is essential for server administration, automation, and development workflows.

---

*This lesson is based on the "Learn Bash by Building a Boilerplate" project from the [freeCodeCamp Relational Database Certification](https://www.freecodecamp.org/learn/relational-database/).*
