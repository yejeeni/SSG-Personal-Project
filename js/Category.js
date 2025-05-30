/**
 * 카테고리 목록을 보여주는 함수
 */
function showCategory() {
  let dialogCategoryList = document.getElementById("categoryList");
  dialogCategoryList.innerHTML = "";

  for (let category of reviewApp.category) {
    let div = document.createElement("div");
    div.style.paddingBottom = "5px";
    div.innerText = category;
    dialogCategoryList.appendChild(div);
  }

  dialogCategoryList.appendChild(document.createElement("br"));
}

/**
 * 카테고리 추가 다이얼로그 열기
 */
function openDialog() {
  document.getElementById("categoryDialogBackdrop").style.display = "";
  document.body.classList.add('show-dialog');
  showCategory();
}

/**
 * 카테고리를 추가하는 함수
 */
function registCategory() {
  let categoryName = document.getElementById("newCategoryInput").value.trim();
  if (!categoryName) return;

  reviewApp.category.push(categoryName);

  let feedback = document.getElementById("categoryFeedback");
  feedback.textContent = `${categoryName} 카테고리가 추가되었습니다.`;
  feedback.classList.add("show");

  setTimeout(() => {
    feedback.classList.remove("show");
  }, 2000);

  insertCategoryOption();
  showCategory();
}

/**
 * 카테고리 추가 다이얼로그를 닫는 함수
 */
function closeDialog() {
  document.getElementById("categoryDialogBackdrop").style.display = "none";
  document.getElementById("newCategoryInput").value = "";
  document.body.classList.remove('show-dialog');
}

/**
 * 주어진 값으로 option을 생성하는 함수
 */
function createCategoryOption(value) {
  let option = document.createElement("option");
  option.value = value;
  option.textContent = value;
  return option;
}

/**
 * 카테고리를 옵션에 출력하는 함수
 */
function insertCategoryOption() {
  let select = document.getElementById("categorySelect"); 
  let listCategory = document.getElementById("filterCategorySelect");

  select.innerHTML = "";
  listCategory.innerHTML = "";

  listCategory.appendChild(createCategoryOption("전체"));

  for (let value of reviewApp.category) {
    select.appendChild(createCategoryOption(value));
    listCategory.appendChild(createCategoryOption(value));
  }
}
