let review = new Review();

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

  review.bindForm();
  review.addTestData(); 
});