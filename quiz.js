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
  
  function submitQuiz() {
    quizzes.forEach((quiz, index) => {
      const selectedChoice = document.querySelector(`input[name="quiz${index}"]:checked`);
      if(selectedChoice && selectedChoice.value === quiz.answer) {
        score++;
      }
    });
    window.location.href = `result.html?score=${score}`;
  }
  
  showQuizzes();
  
