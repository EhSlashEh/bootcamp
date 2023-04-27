#! /bin/bash

PSQL="psql --username=freecodecamp --dbname=worldcup --no-align --tuples-only -c"

# Do not change code above this line. Use the PSQL variable above to query your database.

echo -e "\nTotal number of goals in all games from winning teams:"
echo "$($PSQL "SELECT SUM(winner_goals) FROM games")"

echo -e "\nTotal number of goals in all games from both teams combined:"
echo "$($PSQL "SELECT SUM(winner_goals + opponent_goals) AS total_goals FROM games")"

echo -e "\nAverage number of goals in all games from the winning teams:"
echo "$($PSQL "SELECT AVG(winner_goals) AS avg_winning_goals FROM games WHERE winner_id IS NOT NULL")"

echo -e "\nAverage number of goals in all games from the winning teams rounded to two decimal places:"
echo "$($PSQL "SELECT ROUND(AVG(winner_goals), 2) AS avg_winning_goals FROM games WHERE winner_id IS NOT NULL")"

echo -e "\nAverage number of goals in all games from both teams:"
echo "$($PSQL "SELECT AVG(winner_goals + opponent_goals) AS avg_goals FROM games")"

echo -e "\nMost goals scored in a single game by one team:"
echo "$($PSQL "SELECT MAX(winner_goals) AS most_goals FROM games")"

echo -e "\nNumber of games where the winning team scored more than two goals:"
echo "$($PSQL "SELECT COUNT(*) AS num_games FROM games WHERE winner_goals > 2")"

echo -e "\nWinner of the 2018 tournament team name:"
echo "$($PSQL "SELECT teams.name FROM games INNER JOIN teams ON games.winner_id = teams.team_id WHERE games.year = '2018' AND games.round = 'Final'")"

echo -e "\nList of teams who played in the 2014 'Eighth-Final' round:"
echo "$($PSQL "SELECT DISTINCT teams.name FROM games INNER JOIN teams ON games.winner_id = teams.team_id OR games.opponent_id = teams.team_id WHERE games.year = '2014' AND games.round = 'Eighth-Final'")"

echo -e "\nList of unique winning team names in the whole data set:"
echo "$($PSQL "SELECT DISTINCT teams.name FROM games INNER JOIN teams ON games.winner_id = teams.team_id ORDER BY teams.name")"

echo -e "\nYear and team name of all the champions:"
echo "$($PSQL "SELECT games.year, teams.name AS champion FROM games INNER JOIN teams ON games.winner_id = teams.team_id WHERE games.round = 'Final' ORDER BY games.year")"

echo -e "\nList of teams that start with 'Co':"
echo "$($PSQL "SELECT name FROM teams WHERE name LIKE 'Co%'")"
