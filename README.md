# BattleshipJS
Implements a "Pass and Play" battleship game in JavaScript  
## Source Code  
* battleship.js: contains the logic for the game  
* index.html: html page  
## How to Play  
### Starting the Game
1. Player 1 enters his/her Name  
2. Player 1 enters ship arrangement  
3. Repeat step 1 & 2 for Player 2
### Ship Arrangement Rules  
* Ships will placed on a 10 x 10 grid, with rows labeled 1 - 10 and columns labeled A - J.  
* There are 3 ships:  
  * Aircraft Carrier(A): 5 spaces  
  * Battleship(B): 4 spaces  
  * Submarine(S): 3 spaces  
* These ships can be placed horizontally or vertically, and cannot overlap.  
### Taking Turns  
1. After Player 2 has entered his/her name and ship arrangement   
2. Player 1's turn begins. The top grid represents the space where your opponent placed the ships. The bottom grid represents the ships that you placed. Click a space on the top grid to fire a shot. You will be notified of a hit/miss.  
3. Click "End Turn" and pass to the other player  
4. Repeat steps 2 & 3 for Player 2  

Players will keep taking turns until one of them loses all their ships.  
## Scoring  
The winner score is computed by the following:  
For each ship's space that is not hit is worth 2 points. So a perfect score is 24.  
The top 10 scores are stored in localStorage. When the game starts, the array of top scores is printed in the browser's console.  
## Screenshot  
![alt text](screenshot.png "battleship_screenshot")  
