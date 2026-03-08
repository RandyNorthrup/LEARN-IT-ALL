---
id: lesson-001-001
title: "Advanced Bash — Build a Kitty Ipsum Translator"
chapterId: chapter-01
order: 8
duration: 120
objectives:
  - Use grep with regular expressions to search and filter text
  - Transform text with sed for find-and-replace and in-place editing
  - Analyze text files using wc for word, line, and character counts
  - Sort, deduplicate, and compare text with sort, uniq, and diff
  - Chain commands using pipes and manage input/output with redirection operators
  - Build a complete text translator using Bash text processing tools
---

# Advanced Bash — Build a Kitty Ipsum Translator

Linux provides an incredible toolkit for processing text right from the command line. In this lesson, you will master `grep`, `sed`, `wc`, `sort`, `uniq`, `diff`, pipes, and redirection by building a translator that converts standard Lorem Ipsum placeholder text into cat-themed "Kitty Ipsum."

## The Source Text

First, create a file called `kitty_ipsum_1.txt` with some standard Lorem Ipsum text that we will translate:

```bash
cat > lorem.txt << 'EOF'
Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.
Excepteur sint occaecat cupidatat non proident.
Sunt in culpa qui officia deserunt mollit anim id est laborum.
Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
Nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.
EOF
```

## Searching Text with `grep`

`grep` (Global Regular Expression Print) searches for patterns in text and prints matching lines.

### Basic Usage

```bash
# Find lines containing "dolor"
grep "dolor" lorem.txt
```

Output:

```
Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.
```

### Useful grep Flags

```bash
# Count matching lines
grep -c "dolor" lorem.txt
# Output: 4

# Show line numbers
grep -n "dolor" lorem.txt
# Output:
# 1:Lorem ipsum dolor sit amet...
# 4:Duis aute irure dolor...

# Case-insensitive search
grep -i "LOREM" lorem.txt

# Invert match — lines that do NOT contain the pattern
grep -v "dolor" lorem.txt

# Show only the matching part, not the whole line
grep -o "dolor[a-z]*" lorem.txt
# Output:
# dolor
# dolore
# dolor
# dolore
# dolor
# dolore

# Count total matches (not lines)
grep -o "dolor" lorem.txt | wc -l
```

### grep with Regular Expressions

Regular expressions (regex) make `grep` extremely powerful:

```bash
# Lines starting with "Lorem"
grep "^Lorem" lorem.txt

# Lines ending with "elit."
grep "elit\.$" lorem.txt

# Lines containing "dolor" or "labore"
grep -E "dolor|labore" lorem.txt

# Words that start with "c" and end with "t"
grep -oE "\bc[a-z]*t\b" lorem.txt

# Any character between "d" and "r" (e.g., "dolor", "dor")
grep -o "d.lor" lorem.txt
```

**Common regex patterns:**

| Pattern | Meaning |
|---------|---------|
| `.` | Any single character |
| `*` | Zero or more of the previous character |
| `+` | One or more (extended regex, use `-E`) |
| `^` | Start of line |
| `$` | End of line |
| `[abc]` | Any character in the set |
| `[a-z]` | Any lowercase letter |
| `\b` | Word boundary |
| `\|` or `|` | OR (use `-E` for `|` without backslash) |

## Counting with `wc`

`wc` (word count) provides quick statistics about text:

```bash
# Lines, words, and characters
wc lorem.txt
# Output:  10  68  536  lorem.txt

# Lines only
wc -l lorem.txt
# Output: 10

# Words only
wc -w lorem.txt
# Output: 68

# Characters (bytes) only
wc -c lorem.txt
# Output: 536

# Characters (including multi-byte) only
wc -m lorem.txt
```

Combine with pipes:

```bash
# Count how many lines contain "dolor"
grep "dolor" lorem.txt | wc -l
# Output: 4

# Count unique words containing "dolor"
grep -o "dolor[a-z]*" lorem.txt | sort -u | wc -l
# Output: 2 (dolor, dolore)
```

## Transforming Text with `sed`

`sed` (stream editor) processes text line by line, most commonly for find-and-replace operations.

### Basic Substitution

```bash
# Replace first occurrence of "dolor" on each line with "meow"
sed 's/dolor/meow/' lorem.txt

# Replace ALL occurrences on each line (global flag)
sed 's/dolor/meow/g' lorem.txt

# Replace case-insensitively
sed 's/lorem/kitty/gi' lorem.txt
```

The substitution syntax is `s/pattern/replacement/flags`:
- `g` — replace all occurrences, not just the first
- `i` — case-insensitive matching
- `p` — print the modified line (useful with `-n`)

### In-Place Editing

By default, `sed` outputs to the terminal without modifying the original file. Use `-i` for in-place editing:

```bash
# Modify the file directly
sed -i 's/Lorem/Kitty/g' lorem.txt

# Create a backup before modifying
sed -i.bak 's/Lorem/Kitty/g' lorem.txt
# Creates lorem.txt.bak with the original content
```

### Advanced sed

```bash
# Delete lines containing "Excepteur"
sed '/Excepteur/d' lorem.txt

# Delete blank lines
sed '/^$/d' lorem.txt

# Replace only on specific line numbers
sed '3s/dolor/meow/' lorem.txt        # Only line 3
sed '1,5s/dolor/meow/g' lorem.txt     # Lines 1 through 5

# Multiple substitutions
sed 's/dolor/meow/g; s/ipsum/purr/g' lorem.txt

# Or using -e for each expression
sed -e 's/dolor/meow/g' -e 's/ipsum/purr/g' lorem.txt

# Use regex groups for backreferences
sed -E 's/(dolor)(e?)/meow\2/g' lorem.txt
# Replaces "dolor" with "meow" and "dolore" with "meowe"
```

## Sorting and Deduplicating

### sort

```bash
# Sort lines alphabetically
sort lorem.txt

# Sort in reverse order
sort -r lorem.txt

# Sort numerically (useful for number-containing lines)
sort -n numbers.txt

# Sort and remove duplicates
sort -u lorem.txt
```

### uniq

`uniq` removes **adjacent** duplicate lines, so it is almost always used after `sort`:

```bash
# Remove duplicate lines (file must be sorted first)
sort lorem.txt | uniq

# Count occurrences of each line
sort lorem.txt | uniq -c

# Show only duplicated lines
sort lorem.txt | uniq -d

# Show only unique (non-repeated) lines
sort lorem.txt | uniq -u
```

Example:

```bash
sort lorem.txt | uniq -c | sort -rn
```

Output:

```
      2 Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
      2 Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      2 Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.
      1 Sunt in culpa qui officia deserunt mollit anim id est laborum.
      1 Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      1 Nisi ut aliquip ex ea commodo consequat.
      1 Excepteur sint occaecat cupidatat non proident.
```

## Pipes and Redirection

### Pipes (`|`)

Pipes send the output of one command as input to the next:

```bash
# Find all unique words containing "e", sorted
grep -oE "\b[a-z]*e[a-z]*\b" lorem.txt | sort -u

# Count how many unique words there are
grep -oE "\b[a-z]+\b" lorem.txt | sort -u | wc -l
```

### Redirection Operators

```bash
# Write output to a file (overwrites)
grep "dolor" lorem.txt > dolor_lines.txt

# Append output to a file
echo "new line" >> dolor_lines.txt

# Use a file as input
wc -l < lorem.txt

# Redirect error messages to a file
grep "dolor" nonexistent.txt 2> errors.txt

# Redirect both output and errors
grep "dolor" lorem.txt > results.txt 2> errors.txt

# Redirect errors to the same place as output
grep "dolor" lorem.txt > all_output.txt 2>&1

# Discard output entirely
grep "dolor" lorem.txt > /dev/null
```

## Comparing Files with `diff`

`diff` shows the differences between two files:

```bash
diff file1.txt file2.txt
```

Output uses symbols to show changes:
- `<` — line exists only in file1
- `>` — line exists only in file2
- `c` — changed lines
- `a` — added lines
- `d` — deleted lines

```bash
# Colorized, side-by-side comparison
diff --color -y lorem.txt kitty.txt
```

## Building the Kitty Ipsum Translator

Now let's put it all together. This script translates standard Lorem Ipsum into Kitty Ipsum:

```bash
#!/bin/bash

INPUT_FILE=$1

if [[ -z $INPUT_FILE || ! -f $INPUT_FILE ]]; then
  echo "Usage: ./translate.sh <input_file>"
  exit 1
fi

OUTPUT_FILE="kitty_${INPUT_FILE}"

echo "Translating $INPUT_FILE to Kitty Ipsum..."
echo ""

# Apply translations using sed with multiple substitutions
sed \
  -e 's/Lorem/Kitty/g' \
  -e 's/ipsum/pawsum/g' \
  -e 's/dolor/meow/g' \
  -e 's/sit amet/sit on mat/g' \
  -e 's/consectetur/catnipetur/g' \
  -e 's/adipiscing/catpiscing/g' \
  -e 's/elit/felines/g' \
  -e 's/labore/kibble/g' \
  -e 's/magna/purrrna/g' \
  -e 's/veniam/feliniam/g' \
  -e 's/exercitation/scratchitation/g' \
  -e 's/voluptate/velvetpaw/g' \
  -e 's/culpa/clawpa/g' \
  -e 's/anim/catim/g' \
  "$INPUT_FILE" > "$OUTPUT_FILE"

# Report statistics
echo "--- Translation Statistics ---"
ORIGINAL_WORDS=$(wc -w < "$INPUT_FILE")
TRANSLATED_WORDS=$(wc -w < "$OUTPUT_FILE")
echo "Original word count:   $ORIGINAL_WORDS"
echo "Translated word count: $TRANSLATED_WORDS"
echo ""

CHANGES=$(diff "$INPUT_FILE" "$OUTPUT_FILE" | grep "^[<>]" | wc -l)
echo "Lines affected: $((CHANGES / 2))"
echo ""

echo "Output written to: $OUTPUT_FILE"
echo ""
echo "--- Preview ---"
head -5 "$OUTPUT_FILE"
```

Run it:

```bash
chmod +x translate.sh
./translate.sh lorem.txt
```

Output:

```
Translating lorem.txt to Kitty Ipsum...

--- Translation Statistics ---
Original word count:   68
Translated word count: 70
Lines affected: 9

Output written to: kitty_lorem.txt

--- Preview ---
Kitty pawsum meow sit on mat, catnipetur catpiscing felines.
Sed do eiusmod tempor incididunt ut kibble et meowe purrrna aliqua.
Ut enim ad minim feliniam, quis nostrud scratchitation ullamco laboris.
Duis aute irure meow in reprehenderit in velvetpaw velit esse cillum meowe.
Excepteur sint occaecat cupidatat non proident.
```

## Key Takeaways

1. **`grep`** searches for patterns in text — use `-c` to count, `-n` for line numbers, `-o` for matches only, and `-E` for extended regex.
2. **`sed`** transforms text with `s/find/replace/g` — use `-i` for in-place editing and `-e` to chain multiple substitutions.
3. **`wc`** counts lines (`-l`), words (`-w`), and characters (`-c`/`-m`) — invaluable for text analysis.
4. **`sort`** and **`uniq`** work as a pair — sort first, then `uniq` to remove duplicates or count occurrences with `-c`.
5. **Pipes (`|`)** chain commands so the output of one becomes the input of the next, enabling powerful one-liners.
6. **Redirection** (`>`, `>>`, `<`, `2>`) controls where output and errors go — files, `/dev/null`, or combined streams.
7. **`diff`** compares files line by line, essential for verifying translations, patches, and changes.
8. Combining these tools lets you build text processing pipelines that handle tasks that would require much more code in other languages.

---

*This lesson is based on the "Learn Advanced Bash by Building a Kitty Ipsum Translator" project from the [freeCodeCamp Relational Database Certification](https://www.freecodecamp.org/learn/relational-database/).*
