const quizzes = [
    {question: "1:<br><br>1 + 1 = ?", choices: ["11", "2024", "2", "1"], answer: "2"},
    {question: "<br><br><br>2:<br><br>2x + 3 = 4<br> x = ?", choices: ["2/1", "1/2", "2", "4"], answer: "1/2"},
    {question: "<br><br><br>3:<br><br>Which number is a square?<br>2, 3, 5, 9, 17, □, 65", choices: ["44", "53", "23", "33"], answer: "33"},
    {question: "<br><br><br>4:<br><br>What day is it today?<br>I wish yesterday was tomorrow... Then today would be Friday...", choices: ["Saturday", "Sunday", "Monday", "Tuesday"], answer: "Sunday"},
    {question: "<br><br><br>5:<br><br>There is an airplane with 100 seats.<br>The nth passenger sits in the nth seat.<br>The first drunk passenger sits in a random seat.<br><br>Passengers numbered 2 through 100 are seated according to the following rules:<br>If a passenger's seat is empty, he sits in his own seat.<br>If the passenger's seat is not empty, the passenger sits in a random empty seat.<br><br>What is the probability that the 100th passenger will sit in the 100th seat?", choices: ["Cannot be calculated", "47,71319237266%", "50%", "40%"], answer: "50%"}
    // 나머지 퀴즈도 이와 같은 형식으로 추가
  ];

const explanations = [
    "<br>1 + 1 = 2",
    "<br>2x + 3 = 4<br>= 2x = 1<br>x = 1/2",
    "<br>2, 3, 5, 9, 17, □, 65<br>2 * 2 -1 = 3<br>3 * 2 - 1 = 5<br>5 * 2 - 1 = 9<br>9 * 2 - 1 = 17<br>17 * 2 - 1 = 33<br>33 * 2 - 1 = 65",
    "<br>What day is it today?<br>I wish yesterday was tomorrow... Then today would be Friday...<br>If today is Sunday -> yesterday = Saturday<br>I wish yesterday was tomorrow <- It means that I wish Saturday to be tomorrow.<br>This would make today Friday, so the correct answer is Sunday.",
    "<br>What is the probability that the 100th passenger will sit in the 100th seat?<br>For example, if the first passenger sits at seat 14, passengers 2 through 13 will sit in their seats, and the 14th passenger will sit in a random seat.<br>The 14th passenger has 3 possibilities.<br>Seat 1, seat 100, or any other seat.<br>If he sits in seat 1, passengers 15-100 can sit in their seats unconditionally, so the 100th passenger can sit in his seat unconditionally.<br>If he sit in seat 100, then the 100th passenger cannot sit in your seat because someone is already sitting in seat 100.<br>The next passenger who can't sit in their seat has the same three possibilities, and so on.<br>This means that sitting any other seat has no effect on whether the 100th passenger can sit in their seat.<br>And the 14th passenger has the same probability of being seated in seat 1 as the 100th passenger (50:50).<br>Therefore, the correct answer is 50%."
];
  
  let score = 0;
  
  function showQuizzes() {
    const quizDiv = document.getElementById('quiz');
    quizzes.forEach((quiz, index) => {
      const questionElement = document.createElement('div');
      questionElement.innerHTML = `<p>${quiz.question}</p>`;
      quiz.choices.forEach(choice => {
        const choiceElement = document.createElement('input');
        choiceElement.type = 'radio';
        choiceElement.name = `quiz${index}`;
        choiceElement.value = choice;
        questionElement.appendChild(choiceElement);
        questionElement.innerHTML += choice + '<br>';
      });
      quizDiv.appendChild(questionElement);
    });
  }
  
  showQuizzes();
  
  let seconds = 0;
let interval = null;

function startTimer() {
    interval = setInterval(function() {
        seconds++;
        document.getElementById('timer').textContent = formatTime(seconds);
    }, 1000);
}

function formatTime(sec) {
    const minutes = Math.floor(sec / 60);
    const seconds = sec % 60;
    return `${pad(minutes)}:${pad(seconds)}`;
}

function pad(value) {
    return value.toString().padStart(2, '0');
}

// 타이머 시작
startTimer();

// 퀴즈 제출 함수에 타이머 중지 코드 추가
function submitQuiz() {
    // 타이머 중지
    clearInterval(interval);

    // 점수 계산
    let score = 0; // 점수 초기화
    quizzes.forEach((quiz, index) => {
        const selectedChoice = document.querySelector(`input[name="quiz${index}"]:checked`);
        if(selectedChoice && selectedChoice.value === quiz.answer) {
            score++;
        }
    });
    
    let userAnswers = quizzes.map((quiz, index) => {
        const selectedChoice = document.querySelector(`input[name="quiz${index}"]:checked`);
        return {
            question: quiz.question,
            selectedAnswer: selectedChoice ? selectedChoice.value : null,
            correctAnswer: quiz.answer
        };
    });
    localStorage.setItem("explanations", JSON.stringify(explanations));

    localStorage.setItem("userAnswers", JSON.stringify(userAnswers));

    // localStorage에 seconds 저장
    localStorage.setItem("seconds", seconds);

    // 결과 페이지로 리다이렉트
    window.location.href = `result.html?score=${score}`;
}


// 나머지 코드는 그대로 유지합니다.
