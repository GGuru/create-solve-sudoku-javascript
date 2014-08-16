var sudokuSolver = (function() {

	var checkRow = function (Matrix, row, value) {			
		var len = Matrix[row].length;
		for(var i = 0; i < len; i++) {			
			if(Matrix[row][i] === value) {
				return false;
			}
		}	
		return true;
	};	
	var checkColumn = function (Matrix, column, value) {
		var len = Matrix.length;
		for(var i = 0; i < len; i++) {
			if(Matrix[i][column] === value) {
				return false;
			}
		}  
		return true;
	};
	var checkMatrix = function (sudokuGrid, i, j, value) {
		
		var flag = true;	
		var rowCol = i%3+"x"+j%3;	
		
		switch(rowCol) {
		
			case "0x0":
				if(sudokuGrid[i+1][j+1] == value || sudokuGrid[i+1][j+2] == value || sudokuGrid[i+2][j+1] == value ||  sudokuGrid[i+2][j+1] == value) {
					flag = false;
				}
				break;
			case "0x1":
				if(sudokuGrid[i+1][j-1] == value || sudokuGrid[i+1][j+1] == value || sudokuGrid[i+2][j-1] == value ||  sudokuGrid[i+2][j+1] == value) {
					flag = false;
				}
				break;
			case "0x2":
				if(sudokuGrid[i+1][j-1] == value || sudokuGrid[i+1][j-2] == value || sudokuGrid[i+2][j-1] == value ||  sudokuGrid[i+2][j-2] == value) {
					flag = false;
				}
				break;
			case "1x0":
				if(sudokuGrid[i-1][j+1] == value || sudokuGrid[i-1][j+2] == value || sudokuGrid[i+1][j+1] == value ||  sudokuGrid[i+1][j+2] == value) {
					flag = false;
				}
				break;
			case "1x1":
				if(sudokuGrid[i+1][j+1] == value || sudokuGrid[i+1][j-1] == value || sudokuGrid[i-1][j+1] == value ||  sudokuGrid[i-1][j-1] == value) {
					flag = false;
				}
				break;
			case "1x2":
				if(sudokuGrid[i-1][j-1] == value || sudokuGrid[i-1][j-2] == value || sudokuGrid[i+1][j-1] == value ||  sudokuGrid[i+1][j-2] == value) {
					flag = false;
				}
				break;
			case "2x0":
				if(sudokuGrid[i-1][j+1] == value || sudokuGrid[i-1][j+2] == value || sudokuGrid[i-2][j+1] == value ||  sudokuGrid[i-2][j+2] == value) {
					flag = false;
				}
				break;
			case "2x1":
				if(sudokuGrid[i-1][j+1] == value || sudokuGrid[i-1][j-1] == value || sudokuGrid[i-2][j+1] == value ||  sudokuGrid[i-2][j-1] == value) {
					flag = false;
				}
				break;
			case "2x2":
				if(sudokuGrid[i-1][j-1] == value || sudokuGrid[i-1][j-2] == value || sudokuGrid[i-2][j-1] == value ||  sudokuGrid[i-2][j-2] == value) {
					flag = false;
				}
				break;
		}	
		return flag;	

	};
	return {	
		validateBoard: function(Matrix, row, column, value) {		
			if(checkRow(Matrix, row, value)) {
				if(checkColumn(Matrix, column, value)) {
					if(checkMatrix(Matrix, row, column, value)) {
						return true;
					}
				}
			}			
			return false;
		},
		getEmptyPositions: function(puzzleMatrix) {
			var emptyPositions = [];
			var puzzleMatrixLen = puzzleMatrix.length, puzzleMatrixSubLen;
			for(var i = 0; i < puzzleMatrixLen; i++) {
				puzzleMatrixSubLen = puzzleMatrix[i].length;
				for(var j = 0; j < puzzleMatrixSubLen; j++) {
					if(puzzleMatrix[i][j] === 0) {
						emptyPositions.push([i, j]);
					}
				}
			}  
			return emptyPositions;
		},	
		solvePuzzle: function(Matrix, emptyPositions, shouldNotBeEqualTo) {
			
			var i, flag, row, column, value;
			for(i = 0; i < emptyPositions.length;) {	
				//console.log(i);
				row =  emptyPositions[i][0];
				column =  emptyPositions[i][1];
				
				value = Matrix[row][column]+1;
				flag = false;
						
				while (value <= 9) {
					if(this.validateBoard(Matrix, row, column, value) === true && value !== shouldNotBeEqualTo) {
						Matrix[row][column] = value;
						flag = true;
						break;						
					}
					else {
						value++;
					}
				}
				if(flag === false) {
					Matrix[row][column] = 0;
					i--;
					if(i < 0) {
						break;
					}				
				
				}
				else {
					i++;
				}
			}
			return Matrix;		
		}
		
		}
	}

)();

var createSudoku = (function () {

	var rowColCombination = function (separator) {
			var randomRow = utils.randomNumber(8,0);
			var randomColumn = utils.randomNumber(8,0);
			var rowCol = randomRow+separator+randomColumn;
			
			var rowColObj = {"stringCombination": rowCol, "indexCombination": [randomRow,randomColumn]};			
			return rowColObj;
	}
	
	return {
		limit: 9,		
		difficultyLevel: 45,
		generateSudoku: function() {		
			var newPuzzle =  [
				  [0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0,0],
				  [0,0,0,0,0,0,0,0,0]
				];

			var positionsArray = [];
	
			while (positionsArray.length  <= this.limit) {				
				
				var randomRowColCombination = rowColCombination("x");
				if(positionsArray.indexOf(randomRowColCombination["stringCombination"]) == -1) {
					positionsArray.push(randomRowColCombination["stringCombination"]);
					var randNumber = utils.randomNumber(9,1);					
					while(sudokuSolver.validateBoard(newPuzzle, randomRowColCombination["indexCombination"][0], randomRowColCombination["indexCombination"][1], randNumber) === false) {
						randNumber = utils.randomNumber(9,1);
					}
					newPuzzle[randomRowColCombination["indexCombination"][0]][randomRowColCombination["indexCombination"][1]] = randNumber;
				}
			}			
			var emptPos = sudokuSolver.getEmptyPositions(newPuzzle);
			var solMatrix = sudokuSolver.solvePuzzle(newPuzzle,emptPos);		
			var c = 0;
			while( c < this.difficultyLevel) {			
				var randomRowColCombination = rowColCombination("x");				
				solMatrix[randomRowColCombination["indexCombination"][0]][randomRowColCombination["indexCombination"][1]] = 0;				
				c++;
			}
			return solMatrix;
		}
	
	}

})();


var displayUIRegisterEvents = (function() {		
	
	
	var displaySolution = function(solutionMatrix, emptyPos) {
		for(var k =0, len = emptyPos.length; k < len; k++) {
			$("#"+emptyPos[k][0]+"x"+emptyPos[k][1]).text(solutionMatrix[emptyPos[k][0]][emptyPos[k][1]]);
		}
	};
	return {
		sudokuWrapperId:"sudokuWrapper", 
		numberKeysWrapperId:"displayNumbers",
		resetBtnId:"resetBtn",
		validateBtnId:"validateBtn",
		showSolutionBtnId:"showSolution",
		messagingContainer: "messagingContainer",
		newGameId: "newGame",
		
		displayPuzzle: function(sudokuMatrix, emptyPositions) {		
				var runningsudokuMatrix = $.extend(true, [], sudokuMatrix);
				var prevElement;	
				var fragment = document.createDocumentFragment();
				var sudokuLen =  sudokuMatrix.length;
				var i, j;
				var sudokuGrid = $('<div>').addClass('sudokuGrid');
				for(i = 0; i < sudokuLen; i++) {
					var sudokuSubLen =  sudokuMatrix[i].length;
					for(j = 0; j < sudokuSubLen; j++) {
						
						var grid = $(sudokuGrid).clone().attr('id',i+"x"+j);
						if(j === 0){
							$(grid).addClass("wrapDown");
						}
						if(sudokuMatrix[i][j] !== 0) {
							$(grid).text(sudokuMatrix[i][j]);
						}
						else {
							$(grid).addClass("emptyCell");
							$(grid).html("&nbsp;");
						}
						$(fragment).append(grid);
					}
				}	
				$("#sudokuWrapper").append(fragment);
				
				var self = this;
				//RegisterEvents
				$(document).on("click","#"+self.sudokuWrapperId,function(e) {
					var clickedNumberElem = $(e.target);
					if(clickedNumberElem.hasClass("sudokuGrid")) {
						var analyzeIdElem = clickedNumberElem.attr("id").split("x");
						if(analyzeIdElem && sudokuMatrix[analyzeIdElem[0]][analyzeIdElem[1]] === 0 ){
						if(prevElement) {
							prevElement.removeClass("currentGrid");
						}
						$(e.target).addClass("currentGrid");
						prevElement = $(e.target);
						}
					}		
				});
				$(document).on("click","#"+self.numberKeysWrapperId,function(e) {
					var clickedNumberElem = $(e.target);
					if(prevElement && clickedNumberElem.hasClass('numberPad')) {
						var elemPosition = prevElement.attr("id").split("x");
						var clickedElemText = clickedNumberElem.text();
						if(clickedNumberElem.attr('id') === "clear") {
							runningsudokuMatrix[elemPosition[0]][elemPosition[1]] = 0;				
							prevElement.html("&nbsp;");				
						}
						else {
							runningsudokuMatrix[elemPosition[0]][elemPosition[1]] = parseInt(clickedElemText.trim());
							prevElement.text(clickedElemText);
						}
						prevElement.removeClass("currentGrid");
						prevElement = null;
					}
					else {
						
						var clonedMsgElem = $("#"+self.messagingContainer).removeClass('fade').clone(true);
						$("#"+self.messagingContainer).remove();
						$("#"+self.sudokuWrapperId).append(clonedMsgElem);						
						
						if(clickedNumberElem.attr("id") === self.resetBtnId) {
							var len = emptyPositions.length;
							for(var k =0; k < len; k++) {				
								if(runningsudokuMatrix[emptyPositions[k][0]][emptyPositions[k][1]] !== 0) {
									runningsudokuMatrix[emptyPositions[k][0]][emptyPositions[k][1]] = 0;
									$("#"+emptyPositions[k][0]+"x"+emptyPositions[k][1]).html("&nbsp;");
								}					
							}
						}
						else if(clickedNumberElem.attr("id") === self.validateBtnId) {
							var len = emptyPositions.length;
							var tempVar, flag = true, gameCompleted = true;
							for(var k =0; k < len; k++) {					
									tempVar = runningsudokuMatrix[emptyPositions[k][0]][emptyPositions[k][1]];
									if(tempVar > 0) {
										runningsudokuMatrix[emptyPositions[k][0]][emptyPositions[k][1]] = 0;
										if(!sudokuSolver.validateBoard(runningsudokuMatrix, emptyPositions[k][0], emptyPositions[k][1], tempVar)) {
											flag = false;							
										}
										runningsudokuMatrix[emptyPositions[k][0]][emptyPositions[k][1]] = tempVar;						
										if(!flag) {
										
											$("#"+self.messagingContainer).text("The board is currently Invalid").removeClass("fade").addClass("fade");
											break;
										}					
									}
									else {
										gameCompleted = false;
									}
									
							}
							if(flag) {
								$("#"+self.messagingContainer).text("The board is currently valid").removeClass("fade").addClass("fade");								
							}
							if(gameCompleted) {
								$("#"+self.messagingContainer).text("Congratulations. The game is completed").removeClass("fade").addClass("fade");
								self.resetUI();
							}
						}
						else if(clickedNumberElem.attr("id") === self.showSolutionBtnId) {
							var solutionMatrix = sudokuSolver.solvePuzzle(sudokuMatrix,emptyPositions);
							if(solutionMatrix) {				
								displaySolution(solutionMatrix, emptyPositions);
								self.resetUI();
							}
						}
						else if(clickedNumberElem.attr("id") === self.newGameId) {							
							$("#"+self.sudokuWrapperId).empty();
							createAndDispPuzzle.init();
							
							
						}
					}
				});				
				
		},
		resetUI: function() {			
			$(document).off("click","#"+this.sudokuWrapperId);
			$(document).off("click","#"+this.numberKeysWrapperId);
			$('body').addClass('blurIt');		
		}		
	}
})();


/**
var runningsudokuMatrix = [
  [5,3,0,0,7,0,0,0,0],
  [6,0,0,1,9,5,0,0,0],
  [0,9,8,0,0,0,0,6,0],
  [8,0,0,0,6,0,0,0,3],
  [4,0,0,8,0,3,0,0,1],
  [7,0,0,0,2,0,0,0,6],
  [0,6,0,0,0,0,2,8,0],
  [0,0,0,4,1,9,0,0,5],
  [0,0,0,0,8,0,0,7,9]
];
**/


var createAndDispPuzzle = (function() {

return {
	init: function () {
		var sudokuMatrix = createSudoku.generateSudoku();
		var emptyPositions = sudokuSolver.getEmptyPositions(sudokuMatrix);
		displayUIRegisterEvents.displayPuzzle(sudokuMatrix, emptyPositions);
	}
}
})();

createAndDispPuzzle.init();
