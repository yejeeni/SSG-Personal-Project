/**
 * 달력을 생성하고 셀에 날짜와 리뷰 뱃지를 출력하는 클래스
 */
class Calendar {
    constructor({ daysContainerId, sectionContainerId, headerSelector, reviewApp, cellWidth = 70, cellHeight = 100, border = 1 }) {
        this.cellWidth = cellWidth;
        this.cellHeight = cellHeight;
        this.border = border;
        this.currentYear = null;
        this.currentMonth = null;
        this.cellArray = [];

        this.daysContainer = document.getElementById(daysContainerId);
        this.sectionContainer = document.getElementById(sectionContainerId);
        this.headerElem = document.querySelector(headerSelector);
        
        // 리뷰 데이터 객체
        this.reviewApp = reviewApp;
    }

    /**
     * 달력 초기화 함수
     */
    init() {
        this.setCurrentDate(); // 현재 날짜를 기준으로 연월 설정
        this.renderMonthHeader(); // 헤더에 연월 표시
        this.createCalendarCells(); // 달력의 셀 생성
        this.populateCalendarWithDates(); // 셀에 날짜와 리뷰 반영
    }

    /**
     * 현재 날짜를 기준으로 현재 연월을 설정하는 함수
     */
    setCurrentDate() {
        let d = new Date();
        this.currentYear = d.getFullYear();
        this.currentMonth = d.getMonth();
    }

    /**
     * 이전, 다음 버튼으로 월이 1 미만 12 초과가 되지 않도록 조절하는 함수
     */
    adjustYearMonth() {
        let date = new Date(this.currentYear, this.currentMonth, 1);
        this.currentYear = date.getFullYear();
        this.currentMonth = date.getMonth();
    }

    /**
     * 달력 헤더에 연월 출력하는 함수
     * @param {} year 
     * @param {*} month 
     */
    renderMonthHeader(year = this.currentYear, month = this.currentMonth) {
        this.headerElem.innerText = `${year}.${month + 1}`;
    }

    /**
     * 해당 연월의 1일의 요일을 반환하는 함수
     * @param {*} year 
     * @param {*} month
     * @returns 
     */
    getStartDayOfWeek(year, month) {
        return new Date(year, month, 1).getDay();
    }

    /**
     * 해당 연월의 마지막 날짜를 반환하는 함수
     * @param {*} year 
     * @param {*} month 
     * @returns 
     */
    getLastDateOfMonth(year, month) {
        return new Date(year, month + 1, 0).getDate();
    }

    /**
     * 요일 인덱스에 따른 요일 문자를 반환하는 함수
     * @param {*} idx 
     * @returns 
     */
    convertDay(idx) {
        let daysKor = ['일', '월', '화', '수', '목', '금', '토'];
        return daysKor[idx];
    }

    /**
     * 달력의 요일 헤더와 날짜 셀을 생성하는 함수
     */
    createCalendarCells() {
        // 요일 헤더, 날짜 셀 초기화
        this.daysContainer.innerHTML = '';
        this.sectionContainer.innerHTML = '';
        this.cellArray = [];

        // 요일 헤더 생성
        for (let i = 0; i < 7; i++) {
            new Cell(
                this.daysContainer,
                this.cellWidth + 2,
                40,
                'orange',
                this.border,
                'none',
                this.convertDay(i),
                0,
                false
            );
        }

        // 날짜 셀 생성
        for (let row = 0; row < 6; row++) {
            for (let col = 0; col < 7; col++) {
                let cell = new Cell(
                    this.sectionContainer,
                    this.cellWidth,
                    this.cellHeight,
                    'white',
                    this.border,
                    'lightgray',
                    '',
                    0,
                    true
                );
                this.cellArray.push(cell);
            }
        }
    }

    /**
     * 셀에서 해당 날짜의 리뷰 이미지와 개수 뱃지를 보여주는 함수
     * @param {*} day 
     * @param {*} cell 
     */
    displayDailyReviewsOnCell(day, cell) {
        let year = this.currentYear;
        let month = this.currentMonth + 1;
        let list = reviewApp.getReviewsByDateorAll(year, month, day);
        // console.log("displayDailyReviewsOnCell", list);

        if (list.length > 0) {
            // 리뷰 개수 뱃지
            let countSpan = document.createElement("span");
            countSpan.className = "count";
            countSpan.textContent = list.length;

            // 해당 날짜의 가장 최근 리뷰 이미지를 담을 div
            let reviewImgDiv = document.createElement("div");
            reviewImgDiv.style.margin = "auto";
            reviewImgDiv.style.display = "flex";
            reviewImgDiv.style.justifyContent = "center";
            reviewImgDiv.style.alignItems = "center";
            reviewImgDiv.style.lineHeight = "102px";

            // 최근 리뷰 이미지
            let img = document.createElement("img");
            img.src = list[list.length - 1].img;
            img.style.width = "80%";
            img.style.height = "100%";
            img.style.borderRadius = "3px";

            // 이미지 div에 이미지 추가
            reviewImgDiv.appendChild(img);

            // 셀에 이미지, 개수 뱃지 추가
            cell.div.appendChild(countSpan);
            cell.div.appendChild(reviewImgDiv);

            // 클릭 시 해당 날짜의 리뷰를 출력하는 이벤트 리스너 추가
            cell.div.addEventListener("click", () => {
                reviewApp.renderReviewList(list);
            });
        }
    }

    /**
     * 셀에 날짜 텍스트와 리뷰를 채우는 함수
     */
    populateCalendarWithDates() {
        let startDayIndex = this.getStartDayOfWeek(this.currentYear, this.currentMonth);
        let lastDate = this.getLastDateOfMonth(this.currentYear, this.currentMonth);
        let cellIndex = 0;
        let dayNumber = 1;

        for (let row = 0; row < 6; row++) {
            for (let col = 0; col < 7; col++) {
                let cell = this.cellArray[cellIndex];
                cell.div.innerHTML = ''; // 셀 내용 초기화

                let isInMonth = cellIndex >= startDayIndex && dayNumber <= lastDate;
                if (isInMonth) {
                    // 날짜 텍스트 추가
                    let dateSpan = document.createElement("span");
                    dateSpan.className = "date";
                    dateSpan.textContent = dayNumber;
                    cell.div.appendChild(dateSpan);
                    // 호버 효과 추가
                    cell.addHoverEffect();
                    // 리뷰 이미지 추가
                    this.displayDailyReviewsOnCell(dayNumber, cell);
                    dayNumber++;
                } else {
                    // 날짜가 없는 셀의 호버 제거
                    cell.removeHoverEffect();
                }
                cellIndex++;
            }
        }
    }
}

// Calendar 인스턴스 생성 및 초기화
let myCalendar = new Calendar({
    daysContainerId: 'calendarDays',
    sectionContainerId: 'calendarGrid',
    headerSelector: '#calendarTitle',
    reviewApp
  });
  
  
myCalendar.init();
