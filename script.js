//"sprites"
let gameGrid = [[" "," "," "," "," "," "," "," "," "," "," "],
[" "," "," "," "," "," "," "," "," "," "," "],
  ["&lt!"," ."," ."," ."," ."," ."," ."," ."," ."," .", " .","!>"],
  ["&lt!"," ."," ."," ."," ."," ."," ."," ."," ."," .", " .","!>"],
  ["&lt!"," ."," ."," ."," ."," ."," ."," ."," ."," .", " .","!>"],
  ["&lt!"," ."," ."," ."," ."," ."," ."," ."," ."," .", " .","!>"],
  ["&lt!"," ."," ."," ."," ."," ."," ."," ."," ."," .", " .","!>"],
  ["&lt!"," ."," ."," ."," ."," ."," ."," ."," ."," .", " .","!>"],
  ["&lt!"," ."," ."," ."," ."," ."," ."," ."," ."," .", " .","!>"],
  ["&lt!"," ."," ."," ."," ."," ."," ."," ."," ."," .", " .","!>"],
  ["&lt!"," ."," ."," ."," ."," ."," ."," ."," ."," .", " .","!>"],
  ["&lt!"," ."," ."," ."," ."," ."," ."," ."," ."," .", " .","!>"],
  ["&lt!"," ."," ."," ."," ."," ."," ."," ."," ."," .", " .","!>"],
  ["&lt!"," ."," ."," ."," ."," ."," ."," ."," ."," .", " .","!>"],
  ["&lt!"," ."," ."," ."," ."," ."," ."," ."," ."," .", " .","!>"],
  ["&lt!"," ."," ."," ."," ."," ."," ."," ."," ."," .", " .","!>"],
  ["&lt!"," ."," ."," ."," ."," ."," ."," ."," ."," .", " .","!>"],
  ["&lt!"," ."," ."," ."," ."," ."," ."," ."," ."," .", " .","!>"],
  ["&lt!"," ."," ."," ."," ."," ."," ."," ."," ."," .", " .","!>"],
  ["&lt!"," ."," ."," ."," ."," ."," ."," ."," ."," .", " .","!>"],
  ["&lt!"," ."," ."," ."," ."," ."," ."," ."," ."," .", " .","!>"],
  ["&lt!"," ."," ."," ."," ."," ."," ."," ."," ."," .", " .","!>"],
  ["&lt!","==","==","==","==","==","==","==","==","==","==","!>",],
["\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/"]];
const sprites = [[
["","[]","[]"],
["[]","[]",""],
["","",""],
],[
["[]","[]",""],
["","[]","[]"],
["","",""]
],[
["","[]",""],
["[]","[]","[]"],
["","",""]
],[
["","","[]"],
["[]","[]","[]"],
["","",""]
],[
["[]","",""],
["[]","[]","[]"],
["","",""]
],[
["","","",""],
["[]","[]","[]","[]"],
["","","",""],
["","","",""]
],[
["[]","[]"],
["[]","[]"]
]]
// INDEPENDANT FUNCTION UNION
function arrayToGrid(mapT) {let mapImage = "";for(let row = 2; row < mapT.length; row++) {for(let unit = 0; unit < mapT[row].length; unit++) {mapImage += mapT[row][unit];}mapImage += "<br>";}return mapImage;};

function arrayToString(mapT) {let mapImage = "";for(let row = 0; row < mapT.length; row++) {for(let unit = 0; unit < mapT[row].length; unit++) {mapImage += mapT[row][unit];}mapImage += "<br>";}return mapImage;};

function rotateSquare(array) {
  let copy = [];
  for(let y = 0; y < array.length;y++) {
    copy.push([]);
    for(let x = 0; x < array.length;x++) {
      copy[y][x] = array[array.length-1-x][y];
    }
  }
  return copy;
};
function display(grid, sprite, x, y) {
  let newGrid = [];
  for(let y = 0; y < grid.length;y++) {
    newGrid.push([]);
    for(let x = 0; x < grid[y].length;x++) {
      newGrid[y][x] = grid[y][x];
    }
  }
    for(let y1 = 0; y1 < sprite.length;y1++) {
      for(let x1 = 0; x1 < sprite.length;x1++) {
        if(sprite[y1][x1]) {
          newGrid[y+y1][x+x1] = sprite[y1][x1];
        }
     }
   }
   return newGrid;
};

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function collision(OGgrid, array, x, y, setting) {
  let grid = display(OGgrid, array, x, y);
  let ok = true;
  switch(setting) {
    case "a" :
    for(let y1 = 0; y1 < array.length; y1++) {
      let stop = true;
      let x1 = -1;
      while(stop) {
          x1++;
        if(array[y1][x1] === "[]") stop = false;
        if(x1+1 === array[y1].length) {
          stop = false;
          x1 = NaN;
        }
      }
      if(grid[y + y1][x - 1 + x1] === "[]" || grid[y + y1][x - 1 + x1] === "&lt!") ok = false;
    }
    break;
	
    case "d" :
    for(let y1 = 0; y1 < array.length; y1++) {
    let x1 = 0;
    for(let x2 = 0; x2<array[y1].length;x2++) {
      if(array[y1][x2] === "[]" ) x1 = x2+1;
    }
    if(grid[y + y1][x + x1] === "[]" || grid[y + y1][x +x1] === "!>")ok = false;
    console.log(y,x,"d",y1,x1,grid[y + y1][x + x1], ok);
  }
    break;
	
    case "w" :
    let copy = display(OGgrid, rotateSquare(array), x, y);
    let num1 = 0, num2 = 0;
    for(let y1 = y;y1<y+array.length;y1++) {
      for(let x1 = x; x1<x+array.length;x1++) {
        if(copy[y1][x1] !== " .") num2++ ;
        if(grid[y1][x1] !== " .") num1++ ;
      }
    }
    if(num1 !== num2) ok = false;
    break;
	
	case "s" :
      let Y = 0;
      let X = 0;
	for(let y1 = array.length-1; y1 > 0; y1--) {
		for(let x2 = 0; x2<array[y1].length;x2++) {
			if(array[y1][x2] === "[]") {
        if(OGgrid[y + y1 + 1][x + x2] === "[]" || OGgrid[y + y1 + 1][x] === "==") {
          ok = false;
          Y = y1;
          X = x2;
          y1 = 0;
          break;
        } }
		} 
	}

	console.log(OGgrid[y + Y + 1][x], ok, x, y, Y);
  }
  return ok;
}

function checkLine(OGgrid) {


  let newGrid = [];

  for(let y = 0; y < OGgrid.length;y++) {
    newGrid.push([]);
    for(let x = 0; x < OGgrid[y].length;x++) {
      newGrid[y][x] = OGgrid[y][x];
    }
  }

  let lines = -1;
  let isFull = false;
  for(let y = OGgrid.length-2; y > OGgrid.length - 6; y-- ) {
    for(let x = 1; x < OGgrid[y].length - 2; x++) {
      if(OGgrid[y][x] === " .") {
        isFull = false;
        break;
      } else {
        isFull = true;
      }

    }
    if(isFull) lines++;
  }
  if(isFull > 0) {
    console.log("in");
    for(let y = OGgrid.length-2; y > OGgrid.length - 2 - lines; y--) {
      for(let x = 1; x < OGgrid[y].length - 2; x++) { 
        grid[y][x] = " ."; 
      }
    }}

  console.log("Full lines: " + lines)
  return newGrid;
}
//VARIABLE DECLARATION DEPOSIT
let scr = document.querySelector("#scr");
let grid = document.querySelector("#grid");
let contr = document.querySelector("#contr");
let game = document.querySelector("#game");
let gameOn = false;
let key;
let current = [];
let x = 5;
let y = 0;
let tempY = 0;
let gravCounter = 0;
let stillCounter = 0;
//#####SETUP#####
function start() {
    gameOn = true;

    scr.innerHTML = "FULL LINES = <span id=\"lines\">0</span><br>LEVEL = <span id=\"lvl\">0</span><br>SCORE = <span id=\"score\">0</span><br>TIME = <span id=\"time\">0</span><br><br><span id=\"next\"></span>"
grid.innerHTML = arrayToString(gameGrid);
contr.innerHTML = "ROTATE: w<br>MOVE LEFT: a<br>MOVE RIGHT: d"
current.push(sprites[getRandomArbitrary(0, 7)]);
current.push(sprites[getRandomArbitrary(0, 7)]);
let timer = 0;
let difficulty = 1000;
let time = document.querySelector("#time");
let lvl = document.querySelector("#lvl");
let next = document.querySelector("#next");
  setInterval(() => {
    timer++;time.innerHTML = timer+ "s";
  }, difficulty);

  frames.push(gameGrid);
  frames[1] = [];
    window.setInterval(() => {draw();}, 100);
}



//#####DRAW#####
function draw() {

	
	
  for(let y = 0; y < frames[0].length;y++) {
    frames[1].push([]);
    for(let x = 0; x < frames[0][y].length;x++) {
      frames[1][y].push(frames[0][y][x]);
    }
  }

  tempY = y;

  gravCounter = gravCounter < 4 ? gravCounter + 1 : 0;
  y = gravCounter === 3 ? collision(frames[0], current[0], x, y, "s") ? y + 1 : y : y;
  
  for(letter in inputStream) {
    console.log("this is x    " + inputStream[letter]);
    switch(inputStream[letter]) {
      case "a":
      if(collision(frames[0], current[0], x, y, "a")) x--;
      //frames[1] = display(frames[1], current, x, y);
       break;
      case "d":
      if(collision(frames[0], current[0], x, y, "d")) x++;
      //frames[1] = display(frames[1], current, x, y);
      break;
      case "w" :
      if(collision(frames[0], current[0], x, y, "w")) current[0] = rotateSquare(current[0]);
      //frames[1] = display(frames[1], current, x, y);
      break;
      case "s" :
      if(collision(frames[0], current[0], x, y, "s")) y++;
      //frames[1] = ;
      break;
      default :
      //frames[1] = display(frames[1], current, x, y);
      break;
    }
  }

stillCounter = (tempY === y) ? stillCounter+1 : 0;
if(stillCounter > 4) {

  frames[0] = display(frames[0], current[0], x, y);
  frames[0] = checkLine(frames[0]);
 x = 5;
 y = 0;
 current.unshift(current.pop());
current[1] = sprites[getRandomArbitrary(0, 7)];
stillCounter = 0;

}
 inputStream = [];

  console.log("draw")


  next.innerHTML = arrayToString(current[1]);
  grid.innerHTML = arrayToGrid(display(frames[0], current[0], x, y));
  frames[1] = [];

}
//the thing that makes everything work

let inputStream = [];
let frames = [];

document.addEventListener('keydown', (event) => {
  key = event.key;
  inputStream.push(key);
console.log(inputStream);
  //
  if(key === " " && !gameOn) {
    start();
  }

  //
});
