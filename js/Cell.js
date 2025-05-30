/**
 * 달력의 셀(요일 또는 날짜 하나)을 나타내는 클래스
 */
class Cell {
  constructor(container, width, height, bg, border, bdColor, num) {
    this.container = container;
    this.div = document.createElement("div");
    this.width = width;
    this.height = height;
    this.bg = bg;
    this.border = border;
    this.bdColor = bdColor;
    this.num = num;
    // 호버 이벤트 핸들러 저장용 변수 (중복 등록 방지)
    this.hoverHandler = null; 
    this.outHandler = null;

    // style
    this.div.style.width = this.width + "px";
    this.div.style.height = this.height + "px";
    this.div.style.background = this.bg;
    this.div.style.border = `${this.border}px solid ${this.bdColor}`;
    this.div.style.borderRadius = "7px";
    this.div.style.display = "inline-block";
    this.div.style.position = "relative";
    this.div.innerHTML = this.num;

    this.container.appendChild(this.div);
  }

  /**
   * 셀에 마우스 호버 효과 추가
   * @returns 
   */
  addHoverEffect() {
    if (this.mouseOverHandler || this.mouseOutHandler){
      return;
    }
    
    let cellDiv = this.div;
    let originalBg = this.bg;
  
    // 핸들러 함수 정의
    this.mouseOverHandler = function () {
      cellDiv.style.backgroundColor = "#dad7d7";
    };
  
    this.mouseOutHandler = function () {
      cellDiv.style.backgroundColor = originalBg;
    };
  
    cellDiv.addEventListener("mouseover", this.mouseOverHandler);
    cellDiv.addEventListener("mouseout", this.mouseOutHandler);
  }
  
  /**
   * 셀에서 마우스 호버 효과 삭제
   */
  removeHoverEffect() {
    if (this.mouseOverHandler) {
      this.div.removeEventListener("mouseover", this.mouseOverHandler);
      this.mouseOverHandler = null;
    }
  
    if (this.mouseOutHandler) {
      this.div.removeEventListener("mouseout", this.mouseOutHandler);
      this.mouseOutHandler = null;
    }
  }
}
