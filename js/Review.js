class Review {
  constructor() {
    this.nextId = 0;
    this.reviews = []; // 리뷰 목록을 저장할 배열
  }

  addReview(date, category, rating, title, text) {
    let inputReview = {
      id: this.nextId++, // 현재 id를 사용하고 1 증가시킴
      date,
      category,
      rating,
      title,
      text
    };

    // 리뷰를 배열에 추가
    this.reviews.push(inputReview);
    // console.log(this.reviews);
  }

  /**
  * 리뷰 폼을 바인드하는 함수
  */
  bindForm() {
    let form = document.getElementById("form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      let date = document.getElementById("date").value;
      let category = document.getElementById("category").value;
      let rating = parseInt(document.querySelector('input[name="rating"]:checked').value);
      let title = document.getElementById("title").value;
      let text = document.getElementById("text").value;

      // ✅ 같은 인스턴스의 addReview를 사용
      this.addReview(date, category, rating, title, text);
      this.printReviews();

      form.reset();
    });
  }

  targetDate(yy, mm, dd) {
    return yy.toString() + "-" + mm.toString().padStart(2, '0') + "-" + dd.toString().padStart(2, '0');
  }

  // 단일 리뷰를 출력하는 함수
  printReviewOne(id){
//////////////////////////////////////////////
  }

  /**
   * 리뷰 목록을 출력하는 함수
   */
  printReviews(yy, mm, dd) {
    let reviewArray = [];
    let container = document.getElementById("review-list");
    container.innerHTML = "";
    let targetDate = null;

    // 날짜가 모두 있으면 해당 날짜만 출력
    if (yy != null && mm != null && dd != null) {
      targetDate = this.targetDate(yy, mm, dd);
      for (let i = 0; i < this.reviews.length; i++) {
        if (this.reviews[i].date === targetDate) {
          reviewArray.push(this.reviews[i]);
        }
      }
    } else {
      // 아니면 전체 리뷰 출력
      reviewArray = this.reviews;
    }

    // 리뷰 배열을 출력
    for (let i = 0; i < reviewArray.length; i++) {
      const review = reviewArray[i];

      // 각 리뷰마다 div 생성
      let reviewDiv = document.createElement("div");
      reviewDiv.classList.add("review-item");
      reviewDiv.style.backgroundColor = "skyblue";
      reviewDiv.style.border = "2px solid black";

      reviewDiv.innerHTML = `
      <div>날짜: ${review.date}</div>
      <div>카테고리: ${review.category}</div>
      <div>별점: ${review.rating}</div>
      <div>제목: ${review.title}</div>
      <div>내용: ${review.text}</div>
    `;

      container.appendChild(reviewDiv);
    }
    // console.log("printReviews", reviewArray);
  }

  /**
   * 
   * @param {number} yy 연도
   * @param {number} mm 월 (0~11)
   * @param {number} dd 일
   * @returns 날짜를 인덱스로, 리뷰 객체를 값으로 갖는 배열
   */
  getReviewCountByDay(yy, mm, dd) {
    let dailyReview = {}; // 날짜: [리뷰, 리뷰, ...]
    // 비교용 날짜 문자열
    // console.log("getReviewCountByDay called", yy, mm, dd);
    let targetDate = yy.toString() + "-" + mm.toString().padStart(2, '0') + "-" + dd.toString().padStart(2, '0');
    // console.log(targetDate);

    for (let i = 0; i < this.reviews.length; i++) {
      let review = this.reviews[i];

      if (review.date === targetDate) {
        // 해당 날짜 키가 없으면 빈 배열로 초기화
        if (!dailyReview[targetDate]) {
          dailyReview[targetDate] = [];
        }
        dailyReview[targetDate].push(review);
      }
    }
    // console.log("데일리리뷰", dailyReview);
    return dailyReview;
  }

  // 테스트 데이터 입력
  addTestData() {
    this.addReview("2025-04-10", "도서", 5, "재밌어요!", "책이 너무 흥미로웠어요!");
    this.addReview("2025-05-10", "도서", 5, "정말 재밌어요!", "책이 너무 흥미로웠어요!");
    this.addReview("2025-05-13", "영화", 4, "볼만했어요", "스토리도 괜찮고 배우 연기도 좋았어요!");
    this.addReview("2025-05-13", "영화", 1, "별로였어요", "쓰레기입니다");
    this.printReviews();
  }
}


let reviewApp = new Review();
reviewApp.bindForm(); // 폼 바인딩
reviewApp.addTestData(); // 테스트용 리뷰 추가
reviewApp.getReviewCountByDay();