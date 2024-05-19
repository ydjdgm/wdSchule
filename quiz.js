const quizzes = [
    {question: "문제 1", choices: ["선택지 1", "선택지 2", "선택지 3", "선택지 4"], answer: "선택지 1"},
    {question: "문제 2", choices: ["선택지 1", "선택지 2", "선택지 3", "선택지 4"], answer: "선택지 2"},
    // 나머지 퀴즈도 이와 같은 형식으로 추가
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
    let score = 0; // 점수 초기화 (이 부분이 코드에 없었다면 추가 필요)
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
    localStorage.setItem("userAnswers", JSON.stringify(userAnswers));

    // localStorage에 seconds 저장
    localStorage.setItem("seconds", seconds);

    // 결과 페이지로 리다이렉트
    window.location.href = `result.html?score=${score}`;
}


// 나머지 코드는 그대로 유지합니다.
