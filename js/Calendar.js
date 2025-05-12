let cellWidth = 100;
let cellHeight = 100;
let border = 1;

let currentYear;
let currentMonth;

let cellArray = [];

function getCurrentDate(){
    let d = new Date();
    currentYear = d.getFullYear();
    currentMonth = d.getMonth();
}

function printTitle(yy, mm){ 
    let d = new Date(yy, mm);
    let currentYear = d.getFullYear();
    let currentMonth = d.getMonth();
    let h2 = document.querySelector("#header h2");
    h2.innerText = `${currentYear}.${currentMonth+1}`;
}

function createCell(){
    let wrapper = document.getElementById("wrapper");
    wrapper.style.width = cellWidth * 7 + border * 14 + 5 + "px";
    wrapper.style.height = cellHeight * 6 + border * 12 + 50 + 40 + 10 + "px";

    for(let i=0; i<7; i++){
        new Cell(document.getElementById("days"), cellWidth, 40, "white", 1, "gray", convertDay(i, "kor"), false);
    }

    for(let i=0; i<6; i++){
        for(let j=0; j<7; j++){
            let cell = new Cell(document.getElementById("section"), 100, 100, "white", 1, "navy", "", true);
            cellArray.push(cell);
        }
    }
}

function printDate(){
    let idx = 0;
    let n = 0;
    for(let i=0; i<6; i++){
        for(let j=0; j<7; j++){
            let cell = cellArray[idx];
            if (idx >= getStartDay(currentYear, currentMonth) && n < getLastDate(currentYear, currentMonth)){
                n++;
                cell.setText(n);
                cell.setDateAttr(currentYear, currentMonth, n);
            } else {
                cell.setDateAttr();
            }
            idx++;
        }
    }
}

function clearDate(){
    let idx = 0;
    for(let i=0; i<6; i++){
        for(let j=0; j<7; j++){
            cellArray[idx++].div.innerText = "";
        }
    }
}
