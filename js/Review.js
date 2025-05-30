/**
 * 리뷰 데이터를 관리하는 클래스
 */
class Review {
  constructor() {
    this.nextId = 0;
    this.reviews = [];
    this.category = ["영화", "스포츠", "맛집", "독서"];
  }

  /**
   * 새로운 리뷰 추가
   * @param {*} date 날짜
   * @param {*} category 카테고리
   * @param {*} rating 별점
   * @param {*} title 제목
   * @param {*} text 본문
   * @param {*} img 이미지
   */
  addReview(date, category, rating, title, text, img) {
    const review = new ReviewItem(
      this.nextId++,
      date,
      category,
      rating,
      title,
      text,
      img
    );

    review.dateObj = new Date(date); // 날짜 Date 객체 저장
    this.reviews.push(review); // 리뷰를 리뷰 배열에 추가
  }

  /**
   * 선택한 이미지를 미리보기에 띄우는 함수
   */
  previewImg(e) {
    let reader = new FileReader();
    reader.onload = function (data) {
      const profileData = data.target.result;
      document.getElementById("imagePreview").src = profileData;
    };
    reader.readAsDataURL(e.target.files[0]);
  }

  /**
   * 리뷰 폼을 바인드하는 함수
   */
  bindForm() {
    let form = document.getElementById("reviewForm");
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      // 폼의 입력값 가져오기
      let date = document.getElementById("reviewDate").value;
      let category = document.getElementById("categorySelect").value;
      let rating = parseInt(
        document.querySelector('input[name="rating"]:checked').value
      );
      let title = document.getElementById("reviewTitle").value;
      let text = document.getElementById("reviewText").value;
      let img = document.getElementById("imagePreview").src;

      // 작성한 리뷰를 추가
      this.addReview(date, category, rating, title, text, img);

      // 화면 갱신
      createBarChart();
      this.printReviews();
      myCalendar.populateCalendarWithDates();

      form.reset();
      alert("등록되었습니다.");
    });
  }

  /**
   * 년, 월, 일을 yyyy-mm-dd 형식의 문자열로 변환하는 함수
   * @param {*} yy 
   * @param {*} mm 
   * @param {*} dd 
   * @returns 
   */
  targetDate(yy, mm, dd) {
    return `${yy}-${String(mm).padStart(2, '0')}-${String(dd).padStart(2, '0')}`;
  }

  /**
   * 전체 리뷰나 특정 날짜의 리뷰를 반환하는 함수
   */
  getReviewsByDateorAll(yy, mm, dd) {
    let reviewArray = [];

    if (yy != null && mm != null && dd != null) {
      let targetDate = new Date(yy, mm - 1, dd); // 월은 0부터 시작

      for (let i = 0; i < this.reviews.length; i++) {
        let reviewDate = this.reviews[i].dateObj;

        if (
          reviewDate.getFullYear() === targetDate.getFullYear() &&
          reviewDate.getMonth() === targetDate.getMonth() &&
          reviewDate.getDate() === targetDate.getDate()
        ) {
          reviewArray.push(this.reviews[i]);
        }
      }
    } else {
      for (let i = 0; i < this.reviews.length; i++) {
        reviewArray.push(this.reviews[i]);
      }
    }

    return reviewArray;
  }




  /**
   * 리뷰 목록을 렌더링하는 함수
   */
  renderReviewList(reviewArray) {
    let container = document.getElementById("reviewList");
    container.innerHTML = "";

    if (reviewArray.length > 0) {
      // 배열에서 하나씩 꺼내면서 반복
      for (let review of reviewArray) {
        let reviewDiv = document.createElement("div");
        reviewDiv.className = "review-item";

        reviewDiv.innerHTML = `
            <div class="review-date">${review.date}</div>
            <div class="review-category">${review.category}</div>
            <div class="review-rating">${review.rating}점</div>
            <div class="review-title">${review.title}</div>
            <img class="review-img" src="${review.img}" />
            <div class="review-text">${review.text}</div>
          `;

        container.appendChild(reviewDiv);
      }
    } else {
      let emptyDiv = document.createElement("div");
      emptyDiv.innerText = "아직 등록한 리뷰가 없어요. 등록해보세요!";
      container.appendChild(emptyDiv);
    }
  }

  /**
   * 전체 리뷰나 특정 날짜의 리뷰를 출력하는 함수
  */
  printReviews(yy, mm, dd) {
    // 출력할 리뷰를 담을 배열
    let reviewArray = [];

    if (yy != null && mm != null && dd != null) { // 특정 날짜가 전달된 경우
      for (let i = 0; i < this.reviews.length; i++) {
        let review = this.reviews[i];
        if (
          review.dateObj.getFullYear() === yy &&
          review.dateObj.getMonth() === mm - 1 && // JS의 월은 0부터 시작
          review.dateObj.getDate() === dd
        ) {
          reviewArray.push(this.reviews[i]);
        }
      }
    } else {
      reviewArray = this.reviews;
    }
    this.renderReviewList(reviewArray);
  }

  /**
   * 전체 리뷰나 특정 날짜의 리뷰를 출력하는 함수
  */
  selectDailyReviews(yy, mm, dd) {
    // 출력할 리뷰를 담을 배열
    // 출력할 리뷰를 담을 배열
    let reviewArray = [];

    if (yy != null && mm != null && dd != null) { // 특정 날짜가 전달된 경우
      for (let i = 0; i < this.reviews.length; i++) {
        let review = this.reviews[i];
        if (
          review.dateObj.getFullYear() === yy &&
          review.dateObj.getMonth() === mm - 1 && // JS의 월은 0부터 시작
          review.dateObj.getDate() === dd
        ) {
          reviewArray.push(this.reviews[i]);
        }
      }
    } else {
      reviewArray = this.reviews;
    }
    return reviewArray;
  }

  /**
   * 일치하는 카테고리의 리뷰를 반환하는 함수
   */
  getReviewsByCategory(category) {
    let container = document.getElementById("reviewList");
    container.innerHTML = "";

    let reviewOfCategory = []; // 해당 카테고리의 리뷰를 저장할 배열

    for (let i = 0; i < this.reviews.length; i++) {
      if (this.reviews[i].category == category) {
        reviewOfCategory.push(this.reviews[i]);
      }
    }

    return reviewOfCategory;
  }

  /**
   * 카테고리 별 리뷰 수를 반환하는 함수
   */
  getCategoryCounts() {
    let counts = [];
    for (let i = 0; i < this.category.length; i++) {
      let category = this.category[i];
      let reviewsOfCat = this.getReviewsByCategory(category);
      counts.push(reviewsOfCat.length);
    }
    return counts;
  }

  /**
   * 카테고리 별 리뷰 수를 출력하는 함수
   */
  printCategoryCounts() {
    let counts = this.getCategoryCounts();
    let container = document.getElementById("reviewStats");

    container.innerHTML = "";
    for (let i = 0; i < counts.length; i++) {
      let div = document.createElement("div");
      div.innerText = `${this.category[i]}: ${counts[i]}개`;
      container.appendChild(div);
    }
  }

  /**
   * 특정 날짜에 해당하는 리뷰 객체 배열 반환
   */
  getReviewCountByDay(yy, mm, dd) {
    return this.reviews.filter((r) => {
      let d = r.dateObj;
      return (
        d.getFullYear() === yy &&
        d.getMonth() + 1 === mm &&
        d.getDate() === dd
      );
    });
  }

  /**
  * 오늘 날짜 기준 리뷰들을 요약 문자열로 반환하는 함수
  * @returns {string} 예: "맛집 - 떡볶이맛집 / 스포츠 - 고척에서 먹은 츄러스"
  */
  getTodayReviewSummary() {
    let today = new Date();
    let yy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();

    let todayReviews = this.selectDailyReviews(yy, mm, dd);
    console.log(todayReviews);

    if (todayReviews.length === 0) {
      return "오늘 작성된 리뷰가 없습니다.";
    }

    // "카테고리 - 제목" 형태로 조합
    let summaryList = todayReviews.map((r) => `${r.category} - ${r.title}`);
    return summaryList.join(" / ");
  }


  /**
   * 테스트 리뷰 데이터 추가
   */
  addTestData() {
    this.addReview(
      "2025-05-13",
      "독서",
      4,
      "버드스트라이크",
      "엄청 재미있는 건 아닌데, 그렇다고 재미 없는 건 또 아닌? 그저그런 책이었다.",
      "../image/책.png"
    );
    this.addReview(
      "2025-05-10",
      "맛집",
      5,
      "떡볶이맛집",
      "가격도 싸고 좋았다. 라면사리 넣어 먹었음.",
      "../image/떡볶이.jpg"
    );
    this.addReview(
      "2025-05-30",
      "스포츠",
      5,
      "처음으로 고척 간 날",
      "오늘 처음으로 고척에 갔다. 완전 재미있었고 승리했다~!",
      "../image/고척.jpg"
    );
    this.addReview(
      "2025-05-30",
      "스포츠",
      5,
      "고척에서 먹은 츄러스",
      "야구장 음식 치고는 가격도 적당하고 양도 괜찮았는데, 소스가 너무 달았다. 나중에는 단품만 시켜야지.",
      "../image/츄러스.jpg"
    );

    // this.renderReviewList();
  }
}

let reviewApp = new Review();
