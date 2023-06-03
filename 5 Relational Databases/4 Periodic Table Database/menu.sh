#!/bin/bash

# Function to run the pg_dump command
run_pg_dump() {
    pg_dump -cC --inserts -U freecodecamp periodic_table > periodic_table.sql
    echo "pg_dump command executed."
}

# Function to load
psql_load() {
    psql -U postgres < periodic_table.sql
    echo "pg_dump save executed."
}

# Function to run the psql command with specific username and database name
run_psql_with_args() {
    psql --username=freecodecamp --dbname=periodic_table
    echo "psql command executed."
}

# Display the menu
echo "Menu:"
echo "1. Dump"
echo "2. Load"
echo "3. Open psql"
echo "4. Exit"

# Read user input
read -p "Enter your choice: " choice

# Handle user input
case $choice in
    1)
        run_pg_dump
        ;;
    2)
        psql_load
        ;;
    3)
        run_psql_with_args
        ;;
    4)
        echo "Exiting..."
        ;;
    *)
        echo "Invalid choice."
        ;;
esac
