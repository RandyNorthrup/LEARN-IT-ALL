---
id: lesson-002-001
title: "Bash + SQL — Build a Bike Rental Shop"
chapterId: chapter-02
order: 7
duration: 180
objectives:
  - Combine Bash scripting with PostgreSQL to build a full interactive application
  - Query and modify database records from within a Bash script using psql
  - Build a menu-driven terminal interface with input validation
  - Track resource availability using database state changes
  - Handle customer management with lookup-or-create logic
  - Design an end-to-end application architecture connecting scripts to databases
---

# Bash + SQL — Build a Bike Rental Shop

In this lesson, you will combine everything you have learned about Bash scripting and PostgreSQL to build a real application: an interactive bike rental shop. Customers can rent bikes, return them, and the system tracks availability, customer information, and rental history — all from the terminal.

## Application Architecture

The bike rental shop consists of:

1. **A PostgreSQL database** with three tables: `bikes`, `customers`, and `rentals`
2. **A Bash script** (`bike-shop.sh`) that provides a menu interface and interacts with the database

Data flows like this:

```
User Input → Bash Script → psql Commands → PostgreSQL Database
                ↑                                    |
                └───────── Query Results ────────────┘
```

## Step 1 — Create the Database and Tables

First, set up the database:

```bash
psql --username=freecodecamp --dbname=postgres
```

```sql
CREATE DATABASE bikes;
\c bikes

CREATE TABLE bikes(
  bike_id SERIAL PRIMARY KEY,
  type VARCHAR(50) NOT NULL,
  size INT NOT NULL,
  available BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE customers(
  customer_id SERIAL PRIMARY KEY,
  phone VARCHAR(15) NOT NULL UNIQUE,
  name VARCHAR(40) NOT NULL
);

CREATE TABLE rentals(
  rental_id SERIAL PRIMARY KEY,
  customer_id INT NOT NULL REFERENCES customers(customer_id),
  bike_id INT NOT NULL REFERENCES bikes(bike_id),
  date_rented DATE NOT NULL DEFAULT NOW(),
  date_returned DATE
);
```

### Insert Initial Bike Inventory

```sql
INSERT INTO bikes(type, size) VALUES('Mountain', 27);
INSERT INTO bikes(type, size) VALUES('Mountain', 28);
INSERT INTO bikes(type, size) VALUES('Mountain', 29);
INSERT INTO bikes(type, size) VALUES('Road', 27);
INSERT INTO bikes(type, size) VALUES('Road', 28);
INSERT INTO bikes(type, size) VALUES('Road', 29);
INSERT INTO bikes(type, size) VALUES('BMX', 19);
INSERT INTO bikes(type, size) VALUES('BMX', 20);
INSERT INTO bikes(type, size) VALUES('BMX', 21);
```

Exit psql:

```sql
\q
```

## Step 2 — Set Up the Script

Create `bike-shop.sh`:

```bash
#!/bin/bash

PSQL="psql -X --username=freecodecamp --dbname=bikes --no-align --tuples-only -c"
```

The `PSQL` variable is a reusable command template. The flags mean:

| Flag | Purpose |
|------|---------|
| `-X` | Ignore `.psqlrc` startup file |
| `--no-align` | Remove column alignment padding |
| `--tuples-only` | Output data rows only (no headers or footers) |
| `-c` | Execute the following SQL command |

This setup lets you run queries and capture their clean output in variables:

```bash
RESULT=$($PSQL "SELECT * FROM bikes")
```

## Step 3 — Build the Main Menu

```bash
MAIN_MENU() {
  if [[ $1 ]]; then
    echo -e "\n$1"
  fi

  echo -e "~~~~~ Bike Rental Shop ~~~~~\n"
  echo "How may I help you?"
  echo ""
  echo "1. Rent a bike"
  echo "2. Return a bike"
  echo "3. Exit"

  read MAIN_MENU_SELECTION

  case $MAIN_MENU_SELECTION in
    1) RENT_MENU ;;
    2) RETURN_MENU ;;
    3) EXIT_MENU ;;
    *) MAIN_MENU "Please enter a valid option." ;;
  esac
}
```

The function accepts an optional message parameter for displaying feedback. The `case` statement routes to the appropriate sub-menu. Invalid input recursively calls `MAIN_MENU` with an error message.

## Step 4 — Build the Rent Menu

The rent menu shows available bikes, lets the customer pick one, captures customer info, and records the rental:

```bash
RENT_MENU() {
  # Get available bikes from the database
  AVAILABLE_BIKES=$($PSQL "SELECT bike_id, type, size FROM bikes WHERE available = true ORDER BY bike_id")

  # Check if any bikes are available
  if [[ -z $AVAILABLE_BIKES ]]; then
    MAIN_MENU "Sorry, we don't have any bikes available right now."
    return
  fi

  # Display available bikes
  echo -e "\nHere are the bikes we have available:"
  echo "$AVAILABLE_BIKES" | while IFS="|" read BIKE_ID TYPE SIZE; do
    echo "  $BIKE_ID) $SIZE\" $TYPE"
  done

  # Ask which bike they want
  echo ""
  echo "Which one would you like to rent?"
  read BIKE_ID_TO_RENT

  # Validate the selection
  BIKE_AVAILABILITY=$($PSQL "SELECT available FROM bikes WHERE bike_id = $BIKE_ID_TO_RENT AND available = true")

  if [[ -z $BIKE_AVAILABILITY ]]; then
    MAIN_MENU "That bike is not available."
    return
  fi

  # Get customer info
  echo -e "\nWhat's your phone number?"
  read PHONE_NUMBER

  CUSTOMER_NAME=$($PSQL "SELECT name FROM customers WHERE phone = '$PHONE_NUMBER'")

  # If customer doesn't exist, create them
  if [[ -z $CUSTOMER_NAME ]]; then
    echo "What is your name?"
    read CUSTOMER_NAME

    INSERT_CUSTOMER_RESULT=$($PSQL "INSERT INTO customers(phone, name) VALUES('$PHONE_NUMBER', '$CUSTOMER_NAME')")
  fi

  # Get customer_id
  CUSTOMER_ID=$($PSQL "SELECT customer_id FROM customers WHERE phone = '$PHONE_NUMBER'")

  # Record the rental
  INSERT_RENTAL_RESULT=$($PSQL "INSERT INTO rentals(customer_id, bike_id) VALUES($CUSTOMER_ID, $BIKE_ID_TO_RENT)")

  # Mark bike as unavailable
  UPDATE_BIKE_RESULT=$($PSQL "UPDATE bikes SET available = false WHERE bike_id = $BIKE_ID_TO_RENT")

  # Get bike details for the confirmation message
  BIKE_INFO=$($PSQL "SELECT size, type FROM bikes WHERE bike_id = $BIKE_ID_TO_RENT")
  BIKE_INFO_FORMATTED=$(echo "$BIKE_INFO" | sed 's/|/" /')

  MAIN_MENU "I have put you down for the $BIKE_INFO_FORMATTED, $(echo $CUSTOMER_NAME | sed -r 's/^ *| *$//g')."
}
```

This function demonstrates several important patterns:

- **Querying the database** and checking if the result is empty with `[[ -z $VARIABLE ]]`
- **Parsing pipe-delimited output** with `IFS="|"` since psql uses `|` as the default separator with `--no-align`
- **Lookup-or-create logic** for customers — check if they exist before inserting
- **Updating state** in the database when a bike is rented

## Step 5 — Build the Return Menu

```bash
RETURN_MENU() {
  # Get customer info
  echo -e "\nWhat's your phone number?"
  read PHONE_NUMBER

  CUSTOMER_ID=$($PSQL "SELECT customer_id FROM customers WHERE phone = '$PHONE_NUMBER'")

  # Check if customer exists
  if [[ -z $CUSTOMER_ID ]]; then
    MAIN_MENU "I could not find a record for that phone number."
    return
  fi

  # Get customer's active rentals
  CUSTOMER_RENTALS=$($PSQL "SELECT bike_id, type, size FROM bikes
    INNER JOIN rentals USING(bike_id)
    WHERE rentals.customer_id = $CUSTOMER_ID AND rentals.date_returned IS NULL
    ORDER BY bike_id")

  # Check if they have any bikes to return
  if [[ -z $CUSTOMER_RENTALS ]]; then
    MAIN_MENU "You do not have any bikes rented."
    return
  fi

  # Display rented bikes
  echo -e "\nHere are your rentals:"
  echo "$CUSTOMER_RENTALS" | while IFS="|" read BIKE_ID TYPE SIZE; do
    echo "  $BIKE_ID) $SIZE\" $TYPE"
  done

  # Ask which bike to return
  echo ""
  echo "Which one would you like to return?"
  read BIKE_ID_TO_RETURN

  # Validate the return
  RENTAL_ID=$($PSQL "SELECT rental_id FROM rentals
    WHERE bike_id = $BIKE_ID_TO_RETURN AND customer_id = $CUSTOMER_ID AND date_returned IS NULL")

  if [[ -z $RENTAL_ID ]]; then
    MAIN_MENU "You do not have that bike rented."
    return
  fi

  # Process the return
  RETURN_RESULT=$($PSQL "UPDATE rentals SET date_returned = NOW() WHERE rental_id = $RENTAL_ID")
  AVAILABLE_RESULT=$($PSQL "UPDATE bikes SET available = true WHERE bike_id = $BIKE_ID_TO_RETURN")

  MAIN_MENU "Thank you for returning your bike."
}
```

The return menu uses a **JOIN query** to find which bikes belong to a specific customer and have not yet been returned (`date_returned IS NULL`).

## Step 6 — Exit Menu and Script Entry Point

```bash
EXIT_MENU() {
  echo -e "\nThank you for stopping in.\n"
}

# Start the application
MAIN_MENU
```

The last line calls `MAIN_MENU` to start the program.

## Running the Application

```bash
chmod +x bike-shop.sh
./bike-shop.sh
```

A session might look like:

```
~~~~~ Bike Rental Shop ~~~~~

How may I help you?

1. Rent a bike
2. Return a bike
3. Exit
1

Here are the bikes we have available:
  1) 27" Mountain
  2) 28" Mountain
  3) 29" Mountain
  4) 27" Road
  5) 28" Road
  6) 29" Road
  7) 19" BMX
  8) 20" BMX
  9) 21" BMX

Which one would you like to rent?
5

What's your phone number?
555-1234

What is your name?
Alex

I have put you down for the 28" Road, Alex.
```

## Application Design Patterns

This project demonstrates several patterns common in database-backed applications:

1. **Menu loop pattern** — the main menu calls itself recursively, keeping the application running until the user exits.
2. **Lookup-or-create** — before inserting a customer, check if they already exist by phone number.
3. **State management** — the `available` boolean on bikes and `date_returned` on rentals track the current state of the system.
4. **Input validation** — check that selected bikes exist and are available before proceeding.
5. **Separation of concerns** — each menu is its own function, making the code modular and readable.

## Key Takeaways

1. **Bash + psql** is a powerful combination for building database-driven command-line applications.
2. **Store the psql command in a variable** with formatting flags so you can reuse it throughout the script.
3. **`IFS="|"`** parses the pipe-delimited output from psql's `--no-align` mode.
4. **Check for empty results** with `[[ -z $VAR ]]` before using database output in logic.
5. **Lookup-or-create** prevents duplicate records when the user might be a returning customer.
6. **State tracking** with boolean flags and NULL date columns is a clean pattern for resource management.
7. **Recursive menu functions** with optional message parameters create a smooth user experience with feedback.

---

*This lesson is based on the "Learn Bash and SQL by Building a Bike Rental Shop" project from the [freeCodeCamp Relational Database Certification](https://www.freecodecamp.org/learn/relational-database/).*
