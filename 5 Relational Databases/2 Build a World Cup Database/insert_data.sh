#! /bin/bash

if [[ $1 == "test" ]]
then
  PSQL="psql --username=postgres --dbname=worldcuptest -t --no-align -c"
else
  PSQL="psql --username=freecodecamp --dbname=worldcup -t --no-align -c"
fi

# Do not change code above this line. Use the PSQL variable above to query your database.

# Remove existing entries
$PSQL "TRUNCATE TABLE games, teams"

# Reset the sequences to 1
$PSQL "ALTER SEQUENCE teams_id_seq RESTART WITH 1"
$PSQL "ALTER SEQUENCE games_game_id_seq RESTART WITH 1"

# Read the CSV file and extract the unique team names
TEAMS=$(tail -n +2 games.csv | sort -t, -k4,4 | cut -d',' -f4 | sed 's/ /_/g' | uniq)
TEAMS3=$(tail -n +2 games.csv | sort -t, -k3,3 | cut -d',' -f3 | sed 's/ /_/g' | uniq)
TEAMS="$TEAMS"$'\n'"$TEAMS3"
TEAMS=$(echo "$TEAMS" | sort | uniq)

# Insert each unique team into the teams table
for TEAM in $TEAMS; do
  # Replace underscores with spaces in team name
  TEAM=$(echo "$TEAM" | sed 's/_/ /g')
  $PSQL "INSERT INTO teams (name) VALUES (REPLACE('$TEAM', '_', ' '))"
done

# Insert game data from the CSV file
tail -n +2 games.csv | while IFS=',' read -r YEAR ROUND WINNER OPPONENT WINNER_GOALS OPPONENT_GOALS; do
  # Get the team IDs for the winner and opponent teams
  WINNER_ID=$($PSQL "SELECT team_id FROM teams WHERE name = '$WINNER'")
  OPPONENT_ID=$($PSQL "SELECT team_id FROM teams WHERE name = '$OPPONENT'")
  
  if [ -z "$WINNER_ID" ] || [ -z "$OPPONENT_ID" ]; then
    echo "Failed to find team ID for game: $WINNER vs $OPPONENT"
    continue
  fi

  # Insert the game data into the games table
  $PSQL "INSERT INTO games (year, round, winner_id, opponent_id, winner_goals, opponent_goals) VALUES ($YEAR, '$ROUND', $WINNER_ID, $OPPONENT_ID, $WINNER_GOALS, $OPPONENT_GOALS)"
done