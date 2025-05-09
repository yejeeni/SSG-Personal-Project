/**
 * 입력한 연, 월의 시작 요일 구하기
 * (월은 0부터 시작)
 * ex) 2025년 5월을 원할 경우, getStartDay(2025, 4)
 */
function getStartDay(yy, mm) {
  let d = new Date(yy, mm, 1); // yy년 mm월 1일
  return d.getDay();
}

/**
* 입력한 월의 마지막 날 구하기 
* (월은 0부터 시작)
* ex) getLastDate(원하는 연도, 원하는 월)
*/
function getLastDate(yy, mm) {
  let d = new Date(yy, mm + 1, 0);
  return d.getDate();
}

/**
* 영어 또는 한국어로 요일을 변환하여 반환
* ex) convertDay(2, "eng") -> Tue
*/ 
function convertDay(n, lang) {
  let korArray = ["일", "월", "화", "수", "목", "금", "토"];
  let EngArray = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  let day = (lang == "kor")? korArray[n] : EngArray[n];

  return day; 
}