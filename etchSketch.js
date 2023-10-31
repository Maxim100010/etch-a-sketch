
const colorPicker = document.getElementById('picker');
let color = "#4287f5";
const sizeChanger = document.getElementById('size');
let size = "30px"

const board = document.querySelector('div.drawingSpace > div.board');

////////////////////////////////////////////////////

//Code for drawing by click and hold courtesy of user "charlietfl" on Stack Overflow

let MDOWN = false;

['mousedown', 'mouseup'].forEach(eName => board.addEventListener(eName, () => MDOWN = !MDOWN));

function cellEnter() {
    if (MDOWN) {
      this.style.backgroundColor = color;
    }
  }

////////////////////////////////////////////////////

//Add event listener for color picker
colorPicker.addEventListener('input', function () {
    color = colorPicker.value;
});

sizeChanger.addEventListener('change', function() {
    generateNewBoard(sizeChanger.value);
});

//Initialize the default 16 by 16 white background board
for (let i = 0; i < 16; i++){
    for (let j = 0; j < 16; j++){
        const defaultGrid = document.createElement('div');
        defaultGrid.className = 'defaultGridStyle';
        defaultGrid.addEventListener('mouseenter', cellEnter)
        board.append(defaultGrid);
    }

}

function generateNewBoard (adjustedSize){
    const elements1 = document.getElementsByClassName('defaultGridStyle');
    while(elements1.length > 0){
        elements1[0].parentNode.removeChild(elements1[0]);
    }

    const elements2 = document.getElementsByClassName('newGridStyle');
    while(elements2.length > 0){
        elements2[0].parentNode.removeChild(elements2[0]);
    }

    actualSize = 512/parseInt(adjustedSize);

    for (let i = 0; i < adjustedSize; i++){
        for (let j = 0; j < adjustedSize; j++){
            const newGrid = document.createElement('div');
            newGrid.className = 'newGridStyle';
            newGrid.style.cssText = 'width: '+actualSize+'px;height: '+actualSize+'px;'
            newGrid.addEventListener('mouseenter', cellEnter)
            board.append(newGrid);
        }
    
    }
    
}

const button = document.querySelector('button');
button.addEventListener('click', function () {
    generateNewBoard(sizeChanger.value);
});

