'use strict';
/* Pair Game Models and Business Logic */

function Tile(title) {
  this.title = title;
  this.flipped = false;
}

Tile.prototype.flip = function() {
  this.flipped = !this.flipped;
}



function Game(tileNames, tileSize) {
  var tileDeck = makeDeck(tileNames, tileSize);
  this.unmatchedPairs = tileDeck.length / 2;

  this.grid = makeGrid(tileDeck, tileSize);
  this.message = Game.MESSAGE_CLICK;
  this.howManyTries = 0;

  this.flipTile = function(tile) {
    if (tile.flipped) {
      return;
    }

    tile.flip();

    if (!this.firstPick || this.secondPick) {

      if (this.secondPick) {
        this.firstPick.flip();
        this.secondPick.flip();
        this.firstPick = this.secondPick = undefined;
      }

      this.firstPick = tile;
      this.message = Game.MESSAGE_ONE_MORE;

    } else {

      if (this.firstPick.title === tile.title) {
        this.unmatchedPairs--;
		this.howManyTries++;
        this.message = (this.unmatchedPairs > 0) ? Game.MESSAGE_MATCH : Game.MESSAGE_WON;
		this.message += (this.unmatchedPairs == 0) ? GetBestResultByDeckSize(tileSize, this.howManyTries) : ""; 
        this.firstPick = this.secondPick = undefined;
      } else {
        this.secondPick = tile;
        this.message = Game.MESSAGE_MISS;
	    this.howManyTries++;
      }
    }
  }
}

Game.MESSAGE_CLICK = 'Click on a tile.';
Game.MESSAGE_ONE_MORE = 'Pick one more card.'
Game.MESSAGE_MISS = 'Try again.';
Game.MESSAGE_MATCH = 'Good job! Keep going.';
Game.MESSAGE_WON = 'You win!';



/* Create an array with two of each tileName in it */
function makeDeck(tileNames, tileSize) {
  var tileDeck = [];
  tileNames.forEach(function(name) {
    tileDeck.push(new Tile(name));
    tileDeck.push(new Tile(name));
  });
  var sliceNumber = tileDeck.length - tileSize;
  if(sliceNumber > 0)
  {
    return tileDeck.splice((tileDeck.length - sliceNumber), (tileDeck.length - sliceNumber));
  }
  else
  {
    return tileDeck;
  }
}


function makeGrid(tileDeck, tileSize) {
  var gridDimension = Math.ceil(tileSize / 5),
      grid = [];
  var tileAdded = 0;
  for (var row = 0; row < gridDimension; row++) {
    grid[row] = [];
    for (var col = 0; col < 6; col++) {
        grid[row][col] = removeRandomTile(tileDeck);
		tileAdded++;
		if(tileAdded == tileSize){
			col = 6;
			row = gridDimension;
		}
    }
  }
  return grid;
}


function removeRandomTile(tileDeck) {
  var i = Math.floor(Math.random()*tileDeck.length);
  return tileDeck.splice(i, 1)[0];
}

