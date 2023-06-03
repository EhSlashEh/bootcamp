#!/bin/bash

element="$1"

PSQL="psql --username=freecodecamp --dbname=periodic_table --no-align --tuples-only -c"

if [[ -z $1 ]]; then
    echo "Please provide an element as an argument."
elif [[ $1 =~ ^[0-9]+$ ]]; then
    element_info="$($PSQL "SELECT e.atomic_number, symbol, name, type, atomic_mass, melting_point_celsius, boiling_point_celsius FROM elements e JOIN properties p ON e.atomic_number = p.atomic_number JOIN types t ON p.type_id = t.type_id WHERE e.atomic_number = '$element'")"

    if [[ -z $element_info ]]; then
        echo "I could not find that element in the database."
    else
        IFS='|' read -r atomic_number symbol name classification atomic_mass melting_point boiling_point <<<"$element_info"
        echo "The element with atomic number $atomic_number is $name ($symbol). It's a $classification, with a mass of $atomic_mass amu. $name has a melting point of $melting_point celsius and a boiling point of $boiling_point celsius."
    fi
else
    element_info="$($PSQL "SELECT e.atomic_number, symbol, name, type, atomic_mass, melting_point_celsius, boiling_point_celsius FROM elements e JOIN properties p ON e.atomic_number = p.atomic_number JOIN types t ON p.type_id = t.type_id WHERE symbol = '$element' OR name = '$element'")"

    if [[ -z $element_info ]]; then
        echo "I could not find that element in the database."
    else
        IFS='|' read -r atomic_number symbol name classification atomic_mass melting_point boiling_point <<<"$element_info"
        echo "The element with atomic number $atomic_number is $name ($symbol). It's a $classification, with a mass of $atomic_mass amu. $name has a melting point of $melting_point celsius and a boiling point of $boiling_point celsius."
    fi
fi
