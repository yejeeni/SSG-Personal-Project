import { GoogleGenerativeAI } from "@google/generative-ai";
const model = new GoogleGenerativeAI("");

/**
 * 클릭 이벤트 연결 함수
 * @param {*} id 연결 대상 ID
 * @param {*} handler 클릭 시 실행할 함수
 */
function bindClick(id, handler) {
  const elem = document.getElementById(id)
  elem.addEventListener("click", handler);
}

window.addEventListener("load", function () {
  // 초기 세팅
  insertCategoryOption();
  reviewApp.bindForm();
  reviewApp.addTestData();

  myCalendar.init();

  // 달력 이전/다음 버튼
  bindClick("calendarPrevBtn", () => {
    myCalendar.currentMonth--;
    myCalendar.adjustYearMonth();
    myCalendar.renderMonthHeader();
    myCalendar.populateCalendarWithDates();
  });

  bindClick("calendarNextBtn", () => {
    myCalendar.currentMonth++;
    myCalendar.adjustYearMonth();
    myCalendar.renderMonthHeader();
    myCalendar.populateCalendarWithDates();
  });


  // 이미지 버튼 클릭 → 파일 선택
  bindClick("imageUploadBtn", () => {
    document.getElementById("imageInput").click();
  });

  // 이미지 선택 → 미리보기
  document.getElementById("imageInput").addEventListener("change", function (e) {
    reviewApp.previewImg(e);
  });

  // 카테고리 다이얼로그 열기/닫기/등록
  bindClick("openCategoryDialogBtn", openDialog);
  bindClick("registerCategoryBtn", registCategory);
  bindClick("closeCategoryDialogBtn", closeDialog);

  // 카테고리 필터 선택 시
  document.getElementById("filterCategorySelect").addEventListener("change", (e) => {
    let selectedValue = e.target.value;
    if (selectedValue === "전체") {
      reviewApp.printReviews();
    } else {
      let filterReview = reviewApp.getReviewsByCategory(selectedValue);
      reviewApp.renderReviewList(filterReview);
    }
  });

  // ESC 누르면 다이얼로그 닫기
  document.body.addEventListener("keyup", (e) => {
    if (e.key === "Escape") {
      closeDialog();
    }
  });

  createBarChart();
  reviewApp.renderReviewList(reviewApp.reviews);

  let text;

  // Fetch your API_KEY
  const API_KEY = "key값";
  // Reminder: This should only be for local testing

  // Access your API key (see "Set up your API key" above)
  const genAI = new GoogleGenerativeAI(API_KEY);

  // The Gemini 1.5 models are versatile and work with most use cases
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // Access your API key (see "Set up your API key" above)

  async function run() {
    // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    let question = "오늘 작성한 다이어리 요약이야. '" 
      + reviewApp.getTodayReviewSummary() 
      + "'내 이야기를 들은 친구처럼 대답해줄래? ~습니다. 같은 정중한 말투로 해주고, 2문장으로 간단하게 말해줘";
    console.log(question);
    const prompt = question;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    text = response.text();
    console.log(text);

    let gemini = document.getElementById("gemini-hello");
    gemini.innerHTML = text;
  }

  run();
});

window.addEventListener("DOMContentLoaded", () => {
  let gemini = document.getElementById("gemini-hello");
  gemini.innerHTML = "Hello Gemini!";
});
