let review = new Review();

// 대표이미지 미리보기
function previewImg(e) {
  // js는 사용자의 pc에 접근 불가. 그러나 <input type=file> 컴포넌트에 의해 사용자가 파일을 선택하게 되면, 해당 파일에 대해서는 접근 수락을 받아 제어가 가능해짐
  // 이때 브라우저에서 읽어들인 파일을 제어할 수 있도록 제공되는 객체가 FileReader (js표준은 아니지만 많이 쓰여 필수 객체가 되어버렸기 때문에 거의 대부분의 브라우저가 지원)
  let reader = new FileReader();

  // 브라우저가 문서를 다 읽으면, 우측에 정의한 함수를 호출
  reader.onload = function (data) { // result: 매개변수가 읽어들인 결과
    // console.log(data.target.result);
    // 크롬브라우저가 이미지 바이너리를 문자열화 시켜놓은 결과물을 img.src에 대입
    profileData = data.target.result;
    document.getElementById("preview").src = profileData;
  }
  // 모든 파일은 사람이 읽을 수 있는지 여부를 기준으로 할 때 2가지로 분류됨
  // 문서 파일(.txt, .java, ...), 바이너리 파일(.img, .mp4, .psd, .class...)
  reader.readAsDataURL(e.target.files[0]);
  // console.log(e);
}


addEventListener("load", function () {
  getCurrentDate();

  createCell();
  printTitle(currentYear, currentMonth);
  getStartDay(currentYear, currentMonth);
  printDate();

  // 달력 이전/다음 버튼
  let bt_prev = document.querySelector("#header :nth-child(1)");
  let bt_next = document.querySelector("#header :nth-child(3)");

  bt_prev.addEventListener("click", function () {
    currentMonth--;
    printTitle(currentYear, currentMonth);
    clearDate();
    printDate();
  });

  bt_next.addEventListener("click", function () {
    currentMonth++;
    printTitle(currentYear, currentMonth);
    clearDate();
    printDate();
  });

  // 대표이미지 파일을 선택했을 때
  document.getElementById("profile").addEventListener("change", function (e) {
    previewImg(e);
  });

  review.bindForm();
  review.addTestData();
  
});