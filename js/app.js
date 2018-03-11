'use strict';
/* App Controllers */


var memoryGameApp = angular.module('PairGameApp', []);
var bestResult = [];
var tileNames = ['angular', 'd3', 'jenkins', 'postcss', 'react', 'redux',
    'sass', 'supercharge', 'ts', 'webpack'];

function GetBestResultByDeckSize(deckSize, newResult){
	  var result = "Best result is ";
	  if(bestResult.length == 0)
	  {
		  bestResult[deckSize] = newResult;
		  result += bestResult[deckSize];
	  }
	  else if(bestResult[deckSize] && bestResult[deckSize] > newResult){
		  bestResult[deckSize] = newResult;
		  result += "Yours congrats! Your number is: newResult";
	  }
	  else
	  {
		  result += bestResult[deckSize];
	  }
	  return result;
  };
	
memoryGameApp.factory('game', function() {
  return new Game(tileNames, 10 * 2);
});

memoryGameApp.controller('GameCtrl', function GameCtrl($scope, game) {
  $scope.game = game;
  $scope.tileSize = 0;
  $scope.SetDeckSize = function(tileSize){
	  $scope.game =  new Game(tileNames, tileSize);
  };
  
  $scope.RestartGame = function(){
	  $scope.game =  new Game(tileNames, 20);
  };
});

memoryGameApp.directive('mgCard', function() {
  return {
    restrict: 'E',
    template: '<div class="container">' +
                '<div class="card" ng-class="{flipped: tile.flipped}">' +
                  '<img class="front" ng-src="img/back.png">' +
                  '<img class="back" ng-src="img/{{tile.title}}.png">' +
                '</div>' +
              '</div>',
    scope: {
      tile: '='
    }
  }
});
