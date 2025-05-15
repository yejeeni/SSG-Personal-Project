// 달력을 이루는 하나의 셀을 정의
class Cell{
  constructor(container, width, height, bg, border, bdColor, num, img, hover){
      this.container = container;
      this.div = document.createElement("div");
      this.width = width;
      this.height = height;
      this.bg = bg; // 배경색
      this.border = border; // 경계선 두께
      this.bdColor = bdColor; // 경계선 색상
      this.num = num; // 셀에 출력될 날짜
      this.img = img;

      // style
      this.div.style.width = this.width+"px";
      this.div.style.height = this.height+"px";
      this.div.style.background = this.bg;
      this.div.style.border = `${this.border}px solid ${this.bdColor}`;
      this.div.style.borderRadius = 7+"px";
      this.div.style.display = "inline-block";
      this.div.innerHTML = this.num;
      // this.img.style.width = 80+"px";
      // this.img.style.height = 80+"px";

      if (hover == true){
        this.div.addEventListener("mouseover", () => {
          this.div.style.backgroundColor = "#e3e7f7";
        });
        this.div.addEventListener("mouseout", () => {
          this.div.style.backgroundColor = this.bg;
        });
      }

      // 컨테이너에 자식 요소 부착
      this.container.appendChild(this.div);
  }

  setText(text){
    this.div.innerText = text;
  }

  /**
   * 셀에 날짜를 추가하거나 제거
   * @param {number} year 연도
   * @param {number} month 월 (0부터 시작)
   * @param {number|null} date 일 (1~31). 없으면 속성 제거
   */
  setDateAttr(year, month, date){
    if (date){
      // yy-mm-dd 형식
      let mm = (month+1).toString().padStart(2, '0');
      let dd = date.toString().padStart(2, '0');
      this.div.dataset.date = `${year}+${mm}+${dd}`;
    } else{
      this.div.removeAttribute("data-date");
    }
  }
}