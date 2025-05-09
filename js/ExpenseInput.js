class ExpenseInput{
  constructor(){
    this.expenses = []; // 지출 목록을 저장할 배열
  }
    /**
     * 지출항목 추가 메서드
     */
    addExpense(date, category, title, amount){
      let inputExpense = {
        id: Date.now(),
        category,
        date,
        title,
        amount
      };

      // 지출항목을 배열에 추가
      this.expenses.push(inputExpense);
      console.log(this.expenses);
    }
  }
  
  /**
   * 지출항목을 제출받는 메서드
   */
  function formSubmit(){
    // 클래스 인스턴스
    let expenseInput = new ExpenseInput();

    // 지출 항목을 담을 폼
    let form = document.getElementById("expense-form");
    form.addEventListener("submit", function(e){
      // 폼 제출 후 페이지 새로고침 방지
      e.preventDefault();
      
      // 입력 필드의 값 가져오기
      let date = document.getElementById("date").value;
      let category = document.getElementById("category").value;
      let title = document.getElementById("title").value;
      let amount = document.getElementById("amount").value;
  
      expenseInput.addExpense(date, category, title, amount);
    })
  }
