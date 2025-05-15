let cellWidth = 100;
let cellHeight = 130;
let border = 1;

let currentYear;
let currentMonth;

let cellArray = [];


function getCurrentDate() {
    let d = new Date();
    currentYear = d.getFullYear();
    currentMonth = d.getMonth();
}

function printTitle(yy, mm) {
    let d = new Date(yy, mm);
    let currentYear = d.getFullYear();
    let currentMonth = d.getMonth();
    let h2 = document.querySelector("#header h2");
    h2.innerText = `${currentYear}.${currentMonth + 1}`;
}

function createCell() {
    let wrapper = document.getElementById("calendar");
    // wrapper.style.backgroundColor = "red";
    // wrapper.style.width = cellWidth * 7 + border * 14 + 5 + "px";
    // wrapper.style.height = cellHeight * 6 + border * 12 + 50 + 40 + 10 + "px";

    for (let i = 0; i < 7; i++) {
        new Cell(document.getElementById("days"), cellWidth+3, 40, "orange", 1, "none", convertDay(i, "kor"), 0, false);
    }

    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
            let cell = new Cell(document.getElementById("section"), cellWidth, cellHeight, "white", 1, "lightgray", "", 0, true);
            cellArray.push(cell);
        }
    }
}

/**
 * 달력에서의 각 날짜별 리뷰 모음
 * @param {*} n 일
 * @param {*} cell 달력 셀
 */
function printDailyReviewInCalendar(n, cell) {
    let dailyReview = reviewApp.getReviewCountByDay(currentYear, currentMonth + 1, n);
    let dateKey = currentYear.toString() + "-" + (currentMonth + 1).toString().padStart(2, '0') + "-" + n.toString().padStart(2, '0');

    if (dailyReview[dateKey]) { // dateKey를 키로 갖는 리뷰가 존재하는 경우
        // console.log("데일리리뷰", currentYear, currentMonth + 1, n, dailyReview, dailyReview[dateKey].length);
        // 해당 일에 작성한 리뷰 수 출력
        cell.div.innerHTML += `<span class="count">${dailyReview[dateKey].length}</span>`;
        cell.div.addEventListener("click", function(){
            reviewApp.printReviews(currentYear, currentMonth+1, n);
        });
    }
}

function printDate() {
    let idx = 0;
    let n = 0;
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
            let cell = cellArray[idx];
            if (idx >= getStartDay(currentYear, currentMonth) && n < getLastDate(currentYear, currentMonth)) {
                n++;
                // cell.setText(n);
                cell.div.innerHTML = `<span class="date">${n}</span><br>`;
                cell.setDateAttr(currentYear, currentMonth, n);

                printDailyReviewInCalendar(n, cell);
            } else {
                cell.div.style.border
                cell.setDateAttr();
            }
            idx++;
        }
    }
}

function clearDate() {
    let idx = 0;
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
            cellArray[idx++].div.innerText = "";
        }
    }
}
