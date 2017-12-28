var dictionary = {
  A: 1,
  1: "A",
  B: 2,
  2: "B",
  C: 3,
  3: "C",
  D: 4,
  4: "D",
  E: 5,
  5: "E",
  F: 6,
  6: "F",
  G: 7,
  7: "G",
  H: 8,
  8: "H",
  I: 9,
  9: "I",
  J: 10,
  10: "J"
};
var top10 = [];
var top10Str = localStorage.getItem("top10"); // keep track of the top 10 players
if (top10Str != null) {
  top10 = JSON.parse(top10Str);
  console.log(top10);
}
// each element in array represents a square of space the ship takes up;
var player1A = [];
var player1B = [];
var player1S = [];
var player2A = [];
var player2B = [];
var player2S = [];
// Will Hash the ships location of the player
var shipMap1 = {};
var shipMap2 = {};
var player1 = {};
var player2 = {};
// Keep track of the number of hits the ships are hit
var aCounter1 = 0;
var bCounter1 = 0;
var sCounter1= 0;
var aCounter2 = 0;
var bCounter2 = 0;
var sCounter2 = 0;
// Ships that have been sunk by opposing player
var graveyard1 = [];
var graveyard2 = [];
// Current Player ships have his ships displayed on the bottom grid
// Current player is shooting at currentPlayerTarget (top grid)
var currentPlayer = {};
var currentPlayerTarget = {};
// Keep track if the player has fired or not
var fireFlag = 0;
// elements will be children of this node
var containerDiv = document.getElementsByClassName("container")[0];

var hit = null; // keeps track of hits
var miss = null; // keeps track of misses
// Player 1 and 2 total hits, used to compute final score
var player1TotalHits = 0;
var player2TotalHits = 0;
/*
 * This function handles the event where the user has clicked on a space
 */
var fire = function(e) {
  var player = currentPlayer;
  var shipMap = {};
  var hitCounter;
  if(e.target.style.backgroundColor != "red" && e.target.style.backgroundColor != "white") {
  if (player.type == "player1") {
    shipMap = shipMap2;
    hitCounter = player1TotalHits;
  } else if (player.type == "player2") {
    shipMap = shipMap1;
    hitCounter = player2TotalHits;
  }
  if (fireFlag == 0) { // if player hasn't fired yet, then fire
    //console.log("Firing cannons at: " + e.target.id);
    var coordinate = shipMap[e.target.id.split("|")[0]];
    if(coordinate == 1) {
      setTimeout(function() {alert("HIT");},10); // Hit
      hitCounter ++;
      if (player.type == "player1") {
        player1TotalHits = hitCounter;
      } else if(player.type == "player2") {
        player2TotalHits = hitCounter;
      }
      var hitSquare = document.getElementById(e.target.id);
      hitSquare.setAttribute("style", "height: 25px; width: 30px;background-color: red;");
      hit = (e.target.id);
      checkShipStatus(e.target.id.split("|")[0]);
    } else { // otherwise miss
      setTimeout(function() {alert("MISS");},10);
      var missSquare = document.getElementById(e.target.id);
      missSquare.setAttribute("style", "background-color: white;height: 25px; width: 30px;");
      miss = (e.target.id);
    }
    }
  fireFlag = 1;
  }
}
function checkShipStatus(shipId) { // check to see if ship has sunk
  var A = [];
  var B = [];
  var S = [];
  var graveyard = [];
  var aCounter = 0;
  var bCounter = 0;
  var sCounter= 0;
  // Get the current state of the ships
  if (currentPlayerTarget.type == "player1") {
    //shipMap = shipMap1;
    A = player1A;
    B = player1B;
    S = player1S;
    graveyard = graveyard1;
    aCounter = aCounter1;
    bCounter = bCounter1;
    sCounter = sCounter1;
  } else if (currentPlayerTarget.type == "player2") {
     //shipMap = shipMap2;
    A = player2A;
    B = player2B;
    S = player2S;
    graveyard = graveyard2;
    aCounter = aCounter2;
    bCounter = bCounter2;
    sCounter = sCounter2;
  }
    for(var i = 0; i < A.length; i++) {
      var square = document.getElementById(A[i] + "|" + currentPlayerTarget.type);
      if (shipId == A[i]) {
        aCounter ++;
      }
    }
    if (aCounter == A.length) { // If there are 5 hits, then the Aircraft Carrier has sunk
      graveyard.push("Aircraft Carrier");
      aCounter ++;
      setTimeout(function() {alertShipStatus(graveyard);},10);
    }
    for(var j = 0; j < B.length; j++) {
    var bText = document.createTextNode("");
      var square = document.getElementById(B[j] + "|" + currentPlayerTarget.type);
      //square.textContent = "";
      if (shipId == B[j]) {
        bCounter ++;
      }
    }
    if (bCounter == B.length) { // if there are 4 hits, then battleship has sunk
      graveyard.push("battleship");
      bCounter ++;
      setTimeout(function() {alertShipStatus(graveyard);},10);
    }
    for(var k = 0; k < S.length; k++) { // Print S
      var sText = document.createTextNode("");
      var square = document.getElementById(S[k] + "|" + currentPlayerTarget.type);
      //square.textContent = "";
      if (shipId == S[k]) {
        sCounter ++;
      }
    }
    if (sCounter == S.length) { // if there are 3 hits, then the Submarine has sunk
      graveyard.push("Submarine");
      sCounter ++;
      setTimeout(function() {alertShipStatus(graveyard);},10);
    }
    // transfer the values to the global variables
    if (currentPlayerTarget.type == "player1") {
      graveyard1 = graveyard;
      sCounter1 = sCounter;
      bCounter1 = bCounter;
      aCounter1 = aCounter;
    } else if (currentPlayerTarget.type == "player2") {
      graveyard2 = graveyard;
      sCounter2 = sCounter;
      bCounter2 = bCounter;
      aCounter2 = aCounter;
    }
}
/*
 * Alerts what ships have sunk. Also report the final score after a player loses 3 ships
 */
function alertShipStatus(arr) {
  var str = currentPlayerTarget.name + "\'s "
  if (arr.length == 1) {
    str = str + arr[0] + " has sunk."
    setTimeout(function(){alert(str);}, 1);
  } else if (arr.length == 2) {
    str = str + arr[0] + " and " + arr[1] + " has sunk.";
    setTimeout(function(){alert(str);}, 1);
  } else {
  for (var i = 0; i < arr.length - 1; i++) {
    str = str + arr[i] + ", ";
  }
    str = str + "and " + arr[2] + " has sunk.";
    setTimeout(function(){alert(str);}, 5);
    setTimeout(function(){alert(currentPlayer.name + " has won!");}, 7);
    var score = calculateScore();

    setTimeout(function(){alert("total score: " + score);}, 10);

    var max = checkScoreList(top10);
    if (max >= 10) {
      console.log("top10 scores full.");
      console.log("top10 no longer being tracked, please clear the localStorage if you wish to reset");
    } else {
      var saveScore = {};
      saveScore.name = currentPlayer.name;
      saveScore.score = score;
      top10.push(saveScore);
      top10.sort(function(a,b) {return b.score - a.score});
      if (top10.length > 10) {
        top10.splice(top10.length - 1, top10.length - 10);
      }
      // save to localStorage
      localStorage.setItem("top10", JSON.stringify(top10));
    }
    var button = document.getElementById("endTurn");
    button.remove();
  }
}
// Computes the final score
function calculateScore() {
  // each hit worth 2 points
  var player1Score = player1TotalHits * 2;
  var player2Score = player2TotalHits * 2;
  var winnerScore = 0;
  if (player1Score == 24) {
    winnerScore = player1Score - player2Score;
  } else if (player2Score == 24) {
    winnerScore = player2Score - player1Score;
  }
  return winnerScore;
}
// if score is maxed out at 10 players with scores with 24, then stop
function checkScoreList(arr) {
  var maxScoreCounter = 0;
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].score == 24) {
      maxScoreCounter++;
    }
  }
  return maxScoreCounter;
}
// make sure dom has loaded before doing any alterations
window.onload = function() {
  // endTurn Button will end the users turn, causes screen to blank out
  var endTurn = document.createElement("button");
  endTurn.setAttribute("style", "height: 30px; width: 100px;");
  endTurn.setAttribute("class", "btn btn-primary");
  endTurn.setAttribute("id", "endTurn");
  var buttonText = document.createTextNode("End Turn");
  endTurn.appendChild(buttonText);
  endTurn.addEventListener("click", function() {
  if (fireFlag == 1) { // if user has already  taken a shot, then prepare to switch turns
      unregisterEventListener(currentPlayerTarget);
      containerDiv.setAttribute("style", "display:none;"); // blank out page
      var prompt = document.createElement("h1");
      var promptText = document.createTextNode("Press any key to continue");
      prompt.appendChild(promptText);
      prompt.id = "prompt";
      document.body.appendChild(prompt);
      document.body.addEventListener("keypress", function() { // users hits a key to start his turn.
        if(containerDiv.style.display == "none") {
          //topTable.setAttribute("style", "display: block;");
          var prompt = document.getElementById("prompt");
          prompt.remove();
          containerDiv.setAttribute("style", "display: block;");
          if (currentPlayer.type == "player1") { // no switch to player2
            fireFlag = 0;
            currentPlayer = player2;
            currentPlayerTarget = player1;

            playGame = playerTurn(player2, playGame);
          } else if (currentPlayer.type == "player2") { // switch to player 1
            fireFlag = 0;
            currentPlayer = player1;
            currentPlayerTarget = player2;
            playGame = playerTurn(player1, playGame);
          }
        }
      },false);
   }
}, false);
containerDiv.appendChild(endTurn); // append button to the DOM

player1.name = prompt("Player1, Please Enter Your Name.");
while(!player1.name.match(/\w+/)) {
  alert("Name cannot be empty");
  player1.name = prompt("Player1, Please Enter Your Name.");
}
player1.type = "player1";
currentPlayer = player1;
currentPlayerTarget = player2;
// need to put input validation, e.g reg expressions to determine correct syntax
var shipLayout1 = inputShipStr(player1.type);
// do something for player 2
player2.name = prompt("Player2, Please Enter Your Name.");
while(!player2.name.match(/\w+/)) {
  alert("Name cannot be empty");
  player2.name = prompt("Player2, Please Enter Your Name.");
}
player2.type = "player2";
var shipLayout2 = inputShipStr(player2.type);
var endGame = false;
var playGame = true;
var initializeBoard = 1;
alert(player1.name + "\'s turn. Hit ok to continue.");
playGame = playerTurn(player1, playGame, initializeBoard);

function playerTurn(player, playGame, initialState) {
    if (player1TotalHits == 12 || player2TotalHits == 12) {
      return false;
    }
    if(playGame) {
      if (player.type == "player1" && initialState == 1) { // draw player1 ships
        initializeBoardState();
      } else if (player.type == "player1" && initialState != 1) {
        alert(player.name + "\'s turn");
        // logic to switch board to player 1's perspective.
        registerEventListener(currentPlayerTarget);
        hideShipLocations(currentPlayerTarget);
        showShipLocations(currentPlayer);
        swapPosition();
      } else if (player.type == "player2") {
        alert(player.name + "\'s turn");
        // logic to switch board state to player 2's perspective.
        registerEventListener(currentPlayerTarget);
        hideShipLocations(currentPlayerTarget);
        showShipLocations(currentPlayer);
        swapPosition();
      }
      return true;
  } else {
    return false;
  }
}

/*
 * This function will return a proper ship string
 */
function inputShipStr(player) {
  var shipStr = "B(B6-E6);S(H3-J3);A(A1-A5)";
  shipStr = validateShipStr(player, shipStr);
}
function validateShipStr(player, str) {
  var flag = false;
  while (flag === false) {
    //shipMap = {};
    str = prompt("Please input a string to place your ships. An Example is provided below", str);
    // first check proper format/syntax
    if (str.match(/[ABS]:[A-J][1-9]0?-[A-J][1-9]0?;[\s]*[ABS]:[A-J][1-9]0?-[A-J][1-9]0?;[\s]*[ABS]:[A-J][1-9]0?-[A-J][1-9]0?;?[\s]*/)
        || str.match(/[ABS]\([A-J][1-9]0?-[A-J][1-9]0?\);[\s]*[ABS]\([A-J][1-9]0?-[A-J][1-9]0?\);[\s]*[ABS]\([A-J][1-9]0?-[A-J][1-9]0?\);?[\s]*/)) {

      var A = str.match(/A[\:\(]/g);
      var B = str.match(/B[\:\(]/g);
      var S = str.match(/S[\:\(]/g);

      // There must be 1 A, 1 B, and 1 S
      if (A != null && B != null && S != null) {
        if (A.length == 1 && B.length == 1 && S.length == 1) {
          // Make sure ship is within the 10 x 10 area, just check if the number is less than or equal to 10
          flag = true;
           var checkNum = str.match(/\d\d/g);
           if (checkNum != null) {
            for(var i = 0; i < checkNum.length; i++) {
               if (checkNum[i] > 10) {
                 flag = false;
                 alert("Invalid Row. Rows can only be from 1-10");
                 continue;
               }
            }
           }
           // Make sure ships are not diagonal
           var range = str.match(/\w\d+-\w\d+/g);
           var shipTypes = str.match(/[ABS][(:]/g);

           //alert(range);
           var coordinate = null;
           var tempArr = null;
           var tempArr2 = null;

           for(var i = 0; i < range.length; i++) {
             coordinate = range[i].split("-");
             //alert(coordinate);
             tempArr = coordinate[0].split(/\B/);
             tempArr2 = coordinate[1].split(/\B/);
             if(tempArr[0] != tempArr2[0] && tempArr[1] != tempArr2[1]) {
               alert("SHIPS CANNOT BE DIAGONAL!!!");
               if (player == "player1") {
                  shipMap1 = {};
               } else if (player == "player2") {
                  shipMap2 = {};
               }
               flag = false;
               break;
             }
             var ship = (shipTypes[i].split(/[:()]/))[0];
             // Make sure ships take up appropriate space, A = 5 spaces,  B =  4 spaces,  S = 3 spaces
            if(player == "player1") {
               if(validateShip(player,ship,tempArr, tempArr2, shipMap1) == false) {
                  flag = false;
                  break;
               }
             } else if(player == "player2") {
                 if(validateShip(player,ship,tempArr, tempArr2, shipMap2) == false) {
                  flag = false;
                  break;
               }
             }
           }
         }
      } else {
        alert("There can only be 1 Aircraft Carrier, 1 battleship, and 1 Submarine");
      }
    } else {
      alert("Incorrect Syntax, please try again.");
    }
  }
  return str;
}
function validateShip(player,shipType, arr1, arr2, shipMap) {
  var checkRange = 0;
  if (shipType == "A") {
    if(arr1[0] == arr2[0]) {
      checkRange = arr2[1] - arr1[1] + 1;
      if (checkRange == 5)
      if(expandShipState(player,"V",arr1,5, shipType, shipMap) == false)
        return false;
    } else if (arr1[1] == arr2[1]) {
      checkRange = dictionary[arr2[0]] - dictionary[arr1[0]] + 1;
      if (checkRange == 5)
      if(expandShipState(player,"H",arr1,5, shipType, shipMap) == false)
        return false;
    }
    if (checkRange != 5) {
      alert("Aircraft Carriers can only take up 5 spaces");
      return false;
    }
  } else if (shipType == "B") {
    if(arr1[0] == arr2[0]) {
      checkRange = arr2[1] - arr1[1] + 1;
      if (checkRange == 4)
      if(expandShipState(player,"V",arr1, 4, shipType, shipMap) == false)
        return false;
    } else if (arr1[1] == arr2[1]) {
      checkRange = dictionary[arr2[0]] - dictionary[arr1[0]] + 1;
      if (checkRange == 4)
      if(expandShipState(player, "H",arr1, 4, shipType, shipMap) == false)
        return false;
    }
    if (checkRange != 4) {
      alert("battleship can only take up 4 spaces");
      return false;
    }
  } else if (shipType == "S") {
    if(arr1[0] == arr2[0]) {
      checkRange = arr2[1] - arr1[1] + 1;
      if (checkRange == 3)
      if(expandShipState(player,"V",arr1, 3, shipType, shipMap) == false)
        return false;
    } else if (arr1[1] == arr2[1]) {
      checkRange = dictionary[arr2[0]] - dictionary[arr1[0]] + 1;
      if (checkRange == 3)
      if(expandShipState(player,"H",arr1, 3, shipType, shipMap) == false)
        return false;
    }
    if (checkRange != 3) {
      alert("Submarine can only take up 3 spaces");
      return false;
    }
  }
  return true;
}
function expandShipState(player, mode, begin, shipLength,shipType, shipMap) {
   var shipSpace = [];
   if (mode == "H") { // expand horizontally
     var start = dictionary[begin[0]];
     if (shipMap[begin[0] + begin[1]] == undefined) {
      shipSpace.push(begin[0] + begin[1]);
      shipMap[begin[0] + begin[1]] = 1;
    } else if (shipMap[begin[0] + begin[1]] == 1) {
      alert("ship overlapping, cannot add ship to map");
      alert("Cannot add: " + shipType + ":" + begin[0] + begin[1]);
      if(player == "player1") {
        shipMap1 = {};
        shipMap = {};
      }
      else if (player == "player2") {
        shipMap2 = {};
        shipMap = {};
      }
      return false;
    }
     for (var i = 0; i < shipLength - 1; i++) {
       start ++;
      if (shipMap[dictionary[start] + begin[1]] == undefined) {
        shipSpace.push(dictionary[start] + begin[1]);
        shipMap[dictionary[start] + begin[1]] = 1;
      } else if (shipMap[dictionary[start] + begin[1]] == 1) {
        alert("ship overlapping, cannot add ship to map");
        alert("Cannot add: " + shipType + ":" + dictionary[start] + begin[1]);
        if(player == "player1") {
          shipMap1 = {};
          shipMap = {};
        }
        else if (player == "player2") {
          shipMap2 = {};
          shipMap = {};
        }
        return false;
      }
     }
   } else if (mode == "V") { // expand Vertically
     var counter = begin[1];
     for (var i = 0; i < shipLength; i++) {
       if (shipMap[begin[0] + counter] == undefined) {
         shipSpace.push(begin[0] + counter);
         shipMap[begin[0] + counter] = 1;
       } else if (shipMap[begin[0] + counter] == 1) {
         alert("ship is overlapping");
         alert("Collision: Cannot add: " + shipType + ":" + begin[0] + counter);
         if(player == "player1") {
           shipMap1 = {};
           shipMap = {};
         }
         else if (player == "player2") {
           shipMap2 = {};
           shipMap = {};
         }
         return false;
       }
       counter ++;
     }
   }
    if (player == "player1") {
      shipMap1 = shipMap;
      if (shipType == "A") {
        player1A = shipSpace;
      } else if(shipType == "B") {
        player1B = shipSpace;
      } else if(shipType == "S") {
        player1S = shipSpace;
      }
    } else if (player == "player2") {
      shipMap2 = shipMap;
      if (shipType == "A") {
        player2A = shipSpace;
      } else if(shipType == "B") {
        player2B = shipSpace;
      } else if(shipType == "S") {
        player2S = shipSpace;
      }
    }
  }
 function initializeBoardState() {
   drawBoard("top", "player1");
   drawBoard("bottom", "player1");
 }
 function drawBoard(position, player) {
     var shipMap = {};
     if (player == "player1") {
       shipMap = shipMap1;
     } else if (player == "player2") {
       shipMap = shipMap2;
     }
     var table = document.createElement("table");
     var column = 10;
     var row = 10;
     //var grid = [];
     for(var y = 0; y <= column; y++)
      {
         var tr = document.createElement("tr");
         //grid.push([]);
         for(var x = 0; x <= row; x++)
         {
            var td = document.createElement("td");
            var div = document.createElement("div");
             div.setAttribute("style", "height: 25px; width: 30px;"); // this div represents the squares of the ship space
             if(x == 0 && y != 0) {
                var text = document.createTextNode(y);
                div.appendChild(text);
             } else if (x != 0 && y == 0) {
                var text = document.createTextNode(dictionary[x]);
                div.appendChild(text);
             } else if(x!=0 && y !=0) {
                 div.setAttribute("class", "space");
                 var id = dictionary[x] + y;
                 if (position == "top") {
                   div.setAttribute("id", id + "|player2");
                 } else if (position == "bottom") {
                   div.setAttribute("id", id + "|player1");
                 }
               }
                 td.appendChild(div);
                 tr.appendChild(td);
                 table.appendChild(tr);

          }
       }
       var div = document.createElement("div");
       div.setAttribute("class", "text-center");
       div.appendChild(table);
       if (position == "top") {
          div.setAttribute("style", "padding: 2.5% 10% 2.5% 37%;");
          div.setAttribute("id", "tableTop");
          var page = document.getElementsByClassName("container");
          page[0].appendChild(div);
        } else if(position == "bottom") {
          div.setAttribute("style", "padding: 2.5% 10% 2.5% 37%;");
          div.setAttribute("id", "tableBottom");
          var page = document.getElementsByClassName("container");
          page[0].appendChild(div);
          registerEventListener(currentPlayerTarget);
          showShipLocations(currentPlayer);
        }
 }
 function registerEventListener(player) {
   var column = 10;
   var row = 10;
   for(var y = 1; y <= column; y++)
    {
       for(var x = 1; x <= row; x++)
       {
         var id = dictionary[y] + x;
         var square = document.getElementById(id + "|" + player.type);
         square.addEventListener("click", fire ,true);
       }
     }
 }
 function unregisterEventListener(player) {
   var column = 10;
   var row = 10;
   for(var y = 1; y <= column; y++)
    {
       for(var x = 1; x <= row; x++)
       {
         var id = dictionary[y] + x;
         var square = document.getElementById(id + "|" + player.type);
         square.removeEventListener("click", fire ,true);
       }
     }
 }
 function showShipLocations(player) {
     var A = [];
     var B = [];
     var S = [];
     if (player.type == "player1") {
       //shipMap = shipMap1;
       A = player1A;
       B = player1B;
       S = player1S;
     } else if (player.type == "player2") {
        //shipMap = shipMap2;
       A = player2A;
       B = player2B;
       S = player2S;
     }
   for(var i = 0; i < A.length; i++) { //Print A
     var aText = document.createTextNode("A");
     var square = document.getElementById(A[i] + "|" + player.type);
     square.appendChild(aText);
   }
   for(var j = 0; j < B.length; j++) { // Print B
   var bText = document.createTextNode("B");
     var square = document.getElementById(B[j] + "|" + player.type);
     square.appendChild(bText);
   }
   for(var k = 0; k < S.length; k++) { // Print S
     var sText = document.createTextNode("S");
     var square = document.getElementById(S[k] + "|" + player.type);
     square.appendChild(sText);
   }
 }
 function hideShipLocations(player) {
     var A = [];
     var B = [];
     var S = [];
     if (player.type == "player1") {
       //shipMap = shipMap1;
       A = player1A;
       B = player1B;
       S = player1S;
     } else if (player.type == "player2") {
        //shipMap = shipMap2;
       A = player2A;
       B = player2B;
       S = player2S;
     }
   for(var i = 0; i < A.length; i++) { //Print A
     //var aText = document.createTextNode("");
     var square = document.getElementById(A[i] + "|" + player.type);
     //square.appendChild(aText);
     square.textContent = "";
   }
   for(var j = 0; j < B.length; j++) { // Print B
   var bText = document.createTextNode("");
     var square = document.getElementById(B[j] + "|" + player.type);
     square.textContent = "";
   }
   for(var k = 0; k < S.length; k++) { // Print S
     var sText = document.createTextNode("");
     var square = document.getElementById(S[k] + "|" + player.type);
     square.textContent = "";
   }
 }
  function swapPosition() {
    var top = document.getElementById("tableTop");
    var bottom = document.getElementById("tableBottom");
    top.setAttribute("id", "tableBottom");
    bottom.setAttribute("id", "tableTop");
    top.remove();
    containerDiv.appendChild(top);
  }
}
