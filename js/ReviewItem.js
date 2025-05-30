/**
 * 리뷰 하나를 나타내는 클래스
 */

class ReviewItem {
  /**
   * 리뷰 객체 생성자
   * @param {number} id 리뷰 번호
   * @param {string} dateStr 작성일 (문자열 형식, 예: "2025-05-13")
   * @param {string} category 카테고리
   * @param {number} rating 별점 (예: 1~5)
   * @param {string} title 제목
   * @param {string} text 본문
   * @param {string} img 이미지 URL
   */
  constructor(id, dateStr, category, rating, title, text, img) {
    this.id = id;
    this.date = dateStr; // "2025-05-13"
    this.dateObj = new Date(dateStr); // 실제 비교용
    this.category = category;
    this.rating = rating;
    this.title = title;
    this.text = text;
    this.img = img;
  }
}