class Review{
  constructor(){
    this.nextId = 0;
    this.reviews = []; // 리뷰 목록을 저장할 배열
  }
   
  addReview(date, category, rating, title, text){
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
      console.log(this.reviews);
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

  /**
   * 리뷰 목록을 출력하는 함수
   */
  printReviews(){
    let container = document.getElementById("review-list");
    container.innerHTML = "";

     // 리뷰 내용을 담을 새로운 div 요소 riviewDiv 생성
    let reviewDiv = document.createElement("div");
    
    // riviewDiv에 review-item 클래스를 추가
    reviewDiv.classList.add("review-item");

    // 반복문으로 리뷰 내용을 추가
    for (let i=0; i<this.reviews.length; i++){
      let review = this.reviews[i]; // 리뷰 하나
      // console.log(review);

      // 리뷰 내용을 담을 div 생성
      let reviewDiv = document.createElement("div");

      reviewDiv.classList.add("review-item");

      // reviewDiv의 innerHTML에 리뷰 내용 출력
      reviewDiv.innerHTML += `
        <div>날짜 ${review.date}</div>
        <div>카테고리 ${review.category}</div>
        <div>별점 ${review.rating}</div>
        <div>제목 ${review.title}</div>
        <div>내용 ${review.text}</div>
      `;
      container.appendChild(reviewDiv); 
    }
  }

  // 테스트 데이터 입력
  addTestData() {
  this.addReview("2025-05-10", "도서", 5, "정말 재밌어요!", "책이 너무 흥미로웠어요!");
  this.addReview("2025-05-11", "영화", 4, "볼만했어요", "스토리도 괜찮고 배우 연기도 좋았어요!");
  this.printReviews();
}
}

let reviewApp = new Review();
reviewApp.bindForm(); // 폼 바인딩
reviewApp.addTestData(); // 테스트용 리뷰 추가