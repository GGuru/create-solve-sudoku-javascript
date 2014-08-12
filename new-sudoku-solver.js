var sudokuSolver = (function() {

	var checkRow = function (board, row, value) {			
		
		for(var i = 0; i < board[row].length; i++) {
			
			if(board[row][i] === value) {
				return false;
			}
		}
	
		return true;
	};	
	var checkColumn = function (board, column, value) {
		for(var i = 0; i < board.length; i++) {    
			if(board[i][column] === value) {
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
		solvePuzzle: function(Matrix, emptyPositions) {
			
			var i, flag, row, column, value;
			for(i = 0; i < emptyPositions.length;) {	
				//console.log(i);
				row =  emptyPositions[i][0];
				column =  emptyPositions[i][1];
				
				value = Matrix[row][column]+1;
				flag = false;
						
				while (value <= 9) {
					if(this.validateBoard(Matrix, row, column, value) === true) {
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


	var sudokuMatrix =  [
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

var emptyPositions = sudokuSolver.getEmptyPositions(sudokuMatrix);
var test = sudokuSolver.solvePuzzle(sudokuMatrix,emptyPositions);
console.log(test);
