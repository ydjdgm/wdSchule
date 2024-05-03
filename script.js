document.getElementById("startQuiz").addEventListener("click", function() {
    var userName = document.getElementById("userName").value;
    // 사용자 이름을 로컬 스토리지에 저장
    localStorage.setItem("userName", userName);
    // quiz.html 페이지로 이동
    window.location.href = "quiz.html";
});
