---
id: lesson-004-001
title: "Bash Scripting — Build Five Programs"
chapterId: chapter-04
order: 3
duration: 180
objectives:
  - Write executable Bash scripts with proper shebang lines and permissions
  - Use variables, user input, and conditional logic (if/elif/else) in scripts
  - Implement loops (for, while, until) for repetitive tasks
  - Work with arrays, functions, and command substitution
  - Apply case statements and random number generation
  - Build five complete interactive Bash programs from scratch
---

# Bash Scripting — Build Five Programs

Bash is not just for running commands one at a time — it is a full programming language. In this lesson, you will build five increasingly complex programs that teach you the fundamentals of Bash scripting: variables, user input, conditionals, loops, functions, arrays, and more.

## Getting Started with Bash Scripts

Every Bash script starts with a **shebang** line that tells the system which interpreter to use:

```bash
#!/bin/bash
```

After writing a script, make it executable:

```bash
chmod +x script.sh
./script.sh
```

## Program 1: The Questionnaire

Our first program asks the user questions and responds with their answers. This introduces **variables** and **reading user input**.

Create a file called `questionnaire.sh`:

```bash
#!/bin/bash

echo "~~ Questionnaire ~~"
echo ""

echo "What is your name?"
read NAME

echo "Where are you from?"
read LOCATION

echo "What is your favorite coding language?"
read LANGUAGE

echo ""
echo "Hello $NAME from $LOCATION. Your favorite language is $LANGUAGE."
```

The `read` command pauses the script and waits for the user to type something, then stores their input in the specified variable. Variables are referenced with the `$` prefix.

**Key concepts:**
- `read VARIABLE` stores user input
- `$VARIABLE` or `${VARIABLE}` accesses the value
- Variable names are conventionally UPPERCASE in Bash
- Double quotes allow variable expansion; single quotes do not

Run it:

```bash
chmod +x questionnaire.sh
./questionnaire.sh
```

## Program 2: The Countdown Timer

This program counts down from a given number to zero, then says "Go!" It introduces **command-line arguments**, **conditions**, and **loops**.

Create `countdown.sh`:

```bash
#!/bin/bash

# Check if an argument was provided
if [[ -z $1 ]]; then
  echo "Usage: ./countdown.sh <number>"
  exit 1
fi

# Validate that the argument is a positive integer
if [[ ! $1 =~ ^[0-9]+$ ]]; then
  echo "Error: Please provide a positive integer."
  exit 1
fi

echo "~~ Countdown Timer ~~"
echo ""

# Using a while loop
I=$1
while [[ $I -gt 0 ]]; do
  echo "$I..."
  sleep 1
  (( I-- ))
done

echo "Go!"
```

**Conditional syntax breakdown:**

```bash
if [[ condition ]]; then
  # code when true
elif [[ other_condition ]]; then
  # code when other condition is true
else
  # code when all conditions are false
fi
```

**Common comparison operators:**

| Operator | Meaning |
|----------|---------|
| `-eq` | Equal (numbers) |
| `-ne` | Not equal (numbers) |
| `-gt` | Greater than |
| `-lt` | Less than |
| `-ge` | Greater than or equal |
| `-le` | Less than or equal |
| `==` | Equal (strings) |
| `!=` | Not equal (strings) |
| `-z` | String is empty |
| `-n` | String is not empty |

**Loop alternatives:** You could also write this with `until` or `for`:

```bash
# Until loop (runs until condition becomes true)
I=$1
until [[ $I -eq 0 ]]; do
  echo "$I..."
  (( I-- ))
done

# For loop with a range
for (( I=$1; I>0; I-- )); do
  echo "$I..."
done
```

## Program 3: Bingo Number Generator

This program generates a random Bingo call using **random numbers** and **case statements**.

Create `bingo.sh`:

```bash
#!/bin/bash

echo "~~ Bingo Number Generator ~~"
echo ""

# Generate random number between 1 and 75
NUMBER=$(( RANDOM % 75 + 1 ))

# Determine the letter based on the number range
case $NUMBER in
  [1-9] | 1[0-5])
    LETTER="B"
    ;;
  1[6-9] | 2[0-9] | 30)
    LETTER="I"
    ;;
  3[1-9] | 4[0-5])
    LETTER="N"
    ;;
  4[6-9] | 5[0-9] | 60)
    LETTER="G"
    ;;
  *)
    LETTER="O"
    ;;
esac

echo "The next Bingo call is: $LETTER:$NUMBER"
```

**Key concepts:**

- `$RANDOM` is a built-in Bash variable that generates a random integer between 0 and 32767.
- `$(( expression ))` performs arithmetic. `RANDOM % 75 + 1` produces a number from 1 to 75.
- `case` is like a switch statement — it matches patterns using `|` for OR and `*` as a wildcard.
- Each case block ends with `;;`.

## Program 4: Fortune Teller

This program introduces **arrays** and **functions** to randomly select and display a fortune.

Create `fortune.sh`:

```bash
#!/bin/bash

echo "~~ Fortune Teller ~~"
echo ""

# Define an array of fortunes
FORTUNES=(
  "The code you write today will save hours tomorrow."
  "A bug fixed in development is worth ten fixed in production."
  "Your next commit will be your best one yet."
  "An unexpected merge conflict will lead to a better solution."
  "The documentation you write will be appreciated."
  "A refactor is in your near future."
  "Today is a good day to learn a new command."
  "Your terminal skills will impress someone this week."
)

# Function to get a random fortune
GET_FORTUNE() {
  local INDEX=$(( RANDOM % ${#FORTUNES[@]} ))
  echo "${FORTUNES[$INDEX]}"
}

# Function to display the fortune with decoration
DISPLAY_FORTUNE() {
  local FORTUNE=$1
  echo "  ╔══════════════════════════════════════════╗"
  echo "  ║                                          ║"
  echo "    $FORTUNE"
  echo "  ║                                          ║"
  echo "  ╚══════════════════════════════════════════╝"
}

# Ask the user a question
echo "Ask a question (or press Enter for a general fortune):"
read QUESTION

if [[ -n $QUESTION ]]; then
  echo ""
  echo "You asked: $QUESTION"
fi

echo ""
echo "Your fortune:"
RESULT=$(GET_FORTUNE)
DISPLAY_FORTUNE "$RESULT"
```

**Array syntax:**

```bash
# Declare an array
MY_ARRAY=("item1" "item2" "item3")

# Access by index (0-based)
echo ${MY_ARRAY[0]}        # item1

# Get array length
echo ${#MY_ARRAY[@]}       # 3

# Get all elements
echo ${MY_ARRAY[@]}        # item1 item2 item3

# Loop through an array
for ITEM in "${MY_ARRAY[@]}"; do
  echo "$ITEM"
done
```

**Function syntax:**

```bash
# Define a function
MY_FUNCTION() {
  local LOCAL_VAR="only visible inside this function"
  echo "Function output: $1"   # $1 is the first argument
}

# Call a function
MY_FUNCTION "hello"

# Capture function output
RESULT=$(MY_FUNCTION "hello")
```

## Program 5: Number Guessing Game

The final program brings everything together — loops, conditionals, functions, user input, and arithmetic — into an interactive game.

Create `guessing_game.sh`:

```bash
#!/bin/bash

echo "~~ Number Guessing Game ~~"
echo ""

# Generate a secret number between 1 and 100
SECRET=$(( RANDOM % 100 + 1 ))
ATTEMPTS=0

echo "I'm thinking of a number between 1 and 100."
echo "Can you guess it?"
echo ""

# Game loop
while true; do
  # Read the guess
  echo "Enter your guess:"
  read GUESS

  # Validate input
  if [[ ! $GUESS =~ ^[0-9]+$ ]]; then
    echo "Please enter a valid number."
    continue
  fi

  (( ATTEMPTS++ ))

  # Check the guess
  if [[ $GUESS -eq $SECRET ]]; then
    echo ""
    echo "🎉 Correct! The number was $SECRET."
    echo "You got it in $ATTEMPTS attempt(s)!"
    break
  elif [[ $GUESS -lt $SECRET ]]; then
    echo "Too low! Try again."
  else
    echo "Too high! Try again."
  fi
done

# Rate the performance
echo ""
if [[ $ATTEMPTS -le 3 ]]; then
  echo "Outstanding! You're a natural!"
elif [[ $ATTEMPTS -le 7 ]]; then
  echo "Good job! That's a solid performance."
elif [[ $ATTEMPTS -le 12 ]]; then
  echo "Not bad, but you can do better!"
else
  echo "Keep practicing! Try a binary search strategy next time."
fi
```

**Key concepts combined in this program:**

- `while true; do ... done` creates an infinite loop; `break` exits it.
- `continue` skips the rest of the current iteration and starts the next one.
- `(( ATTEMPTS++ ))` increments a counter using arithmetic expansion.
- `=~` performs a regex match inside `[[ ]]`.
- Multiple `elif` blocks create a chain of conditions for rating the player.

## Command Substitution

Throughout these programs, we used `$( command )` to capture command output:

```bash
# Store the output of a command in a variable
CURRENT_DIR=$(pwd)
FILE_COUNT=$(ls | wc -l)
TODAY=$(date +"%Y-%m-%d")

echo "You are in $CURRENT_DIR with $FILE_COUNT files. Today is $TODAY."
```

This is one of the most powerful features in Bash — it lets you compose commands together and use their results in your scripts.

## Key Takeaways

1. **Every script needs `#!/bin/bash`** at the top and executable permissions via `chmod +x`.
2. **`read`** captures user input and stores it in a variable for interactive programs.
3. **`if/elif/else`** handles branching logic; use `[[ ]]` for conditions with `-eq`, `-lt`, `-gt`, `==`, etc.
4. **`while`, `until`, and `for`** provide looping. Use `break` and `continue` to control flow.
5. **`case`** statements are cleaner than long `if/elif` chains for pattern matching.
6. **Arrays** store lists of values and are accessed with `${ARRAY[index]}` syntax.
7. **Functions** group reusable logic. Use `local` for variables that should not leak out.
8. **`$(command)`** captures output from any command for use in variables or expressions.

---

*This lesson is based on the "Learn Bash Scripting by Building Five Programs" project from the [freeCodeCamp Relational Database Certification](https://www.freecodecamp.org/learn/relational-database/).*
