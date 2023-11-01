const colorPicker = document.getElementById("picker");
let color = "#4287f5";
const sizeChanger = document.getElementById("size");
let size = "30px";

const board = document.querySelector("div.drawingSpace > div.board");

let randomizerFlag = false;

////////////////////////////////////////////////////

//Code for drawing by click and hold courtesy of user "charlietfl" on Stack Overflow

let MDOWN = false;

["mousedown", "mouseup"].forEach((eName) =>
  board.addEventListener(eName, () => (MDOWN = !MDOWN))
);

function cellEnter() {
  if (MDOWN) {
    if(randomizerFlag === true){
      this.style.backgroundColor = randomColor();
    }
    else{
      this.style.backgroundColor = colorPicker.value;
    }
    
  }
}

////////////////////////////////////////////////////

//Add event listener for color picker
colorPicker.addEventListener("input", function () {
  randomizerFlag = false;
});

sizeChanger.addEventListener("change", function () {
  generateNewBoard(sizeChanger.value);
});

//Initialize the default 16 by 16 white background board
for (let i = 0; i < 16; i++) {
  for (let j = 0; j < 16; j++) {
    const defaultGrid = document.createElement("div");
    defaultGrid.className = "defaultGridStyle";
    defaultGrid.setAttribute("draggable", false);
    defaultGrid.addEventListener("mouseenter", cellEnter);
    board.append(defaultGrid);
  }
}

//Generates new board depending on the size picked.
// The board is 512x512 so only available values are 16x16, 32x32, 64x64. Anything above or below is either too big or small
// the function first clears the board
function generateNewBoard(adjustedSize) {
  const elements1 = document.getElementsByClassName("defaultGridStyle");
  while (elements1.length > 0) {
    elements1[0].parentNode.removeChild(elements1[0]);
  }

  const elements2 = document.getElementsByClassName("newGridStyle");
  while (elements2.length > 0) {
    elements2[0].parentNode.removeChild(elements2[0]);
  }

  actualSize = 512 / parseInt(adjustedSize);

  for (let i = 0; i < adjustedSize; i++) {
    for (let j = 0; j < adjustedSize; j++) {
      const newGrid = document.createElement("div");
      newGrid.className = "newGridStyle";
      newGrid.style.cssText =
        "width: " + actualSize + "px;height: " + actualSize + "px;";
      newGrid.setAttribute("draggable", false);
      newGrid.addEventListener("mouseenter", cellEnter);
      board.append(newGrid);
    }
  }
}

//Clears board
// could be made more effective by just changing the color to white instead of
// regenerating the entire board
const button = document.querySelector("#clear");
button.addEventListener("click", function () {
  generateNewBoard(sizeChanger.value);
});

//Changes whether the color should be randomized from false to true and vice versa
const randomizerButton = document.querySelector("#rainbow");
randomizerButton.addEventListener("click", function () {
  if (randomizerFlag === false) {
    randomizerFlag = true;
  } else {
    randomizerFlag = false;
  }
});

//Generates random color
function randomColor() {
  let randomColor = Math.floor(Math.random() * 16777215).toString(16);
  color = "#" + randomColor;
  return color;
}
