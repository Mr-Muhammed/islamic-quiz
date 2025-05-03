// Initialize EmailJS (Replace with your own User ID)
emailjs.init('YOUR_EMAILJS_USER_ID');

// Quiz Questions
const questions = [
    {
        question: "من هم الثلاثة الذين خُلِّفوا عن النبي ﷺ ونزل فيهم قوله تعالى: (وَعَلَى الثَّلَاثَةِ الَّذِينَ خُلِّفُوا)؟",
        options: [
            "سعد بن أبي وقاص، عبد الله بن عمر، أبو هريرة",
            "كعب بن مالك، مرارة بن الربيع، هلال بن أمية ✅",
            "خالد بن الوليد، عمرو بن العاص، معاوية بن أبي سفيان",
            "بلال بن رباح، زيد بن حارثة، أسامة بن زيد"
        ],
        explanation: "هم كعب بن مالك، مرارة بن الربيع، وهلال بن أمية - رضي الله عنهم - وقد تاب الله عليهم."
    },
    {
        question: "ما هي الغزوة التي أُطلق عليها 'ساعة العسرى'؟",
        options: [
            "غزوة بدر",
            "غزوة أحد",
            "غزوة تبوك ✅",
            "غزوة الخندق"
        ],
        explanation: "غزوة تبوك سميت بذلك لشدة الحر ومشقة السفر فيها، وكانت في شهر رجب سنة 9 هـ."
    },
    {
        question: "ما هي القبيلة اليهودية التي نُفذ فيها حكم الإعدام (عكس القبيلتين اللتين أُجليتا من المدينة)؟",
        options: [
            "بني قينقاع",
            "بني النضير",
            "بني قريظة ✅",
            "بني حنيفة"
        ],
        explanation: "بني قريظة نقضوا العهد مع المسلمين في غزوة الأحزاب، فحكم سعد بن معاذ فيهم بحكم الشريعة."
    },
    {
        question: "من هي الصحابية التي كانت تداوي الجرحى في الغزوات؟",
        options: [
            "رفيدة الأسلمية ✅",
            "أم سلمة",
            "صفية بنت عبد المطلب",
            "حفصة بنت عمر"
        ],
        explanation: "رفيدة الأسلمية - رضي الله عنها - كانت أول ممرضة في الإسلام، وأقامت خيمة لعلاج الجرحى."
    },
    {
        question: "من هي الصحابية التي كانت تقاتل مع الصحابة في غزوة أحد؟",
        options: [
            "أم عمارة نسيبة بنت كعب ✅",
            "صفية بنت عبد المطلب",
            "عائشة بنت أبي بكر",
            "حفصة بنت عمر"
        ],
        explanation: "أم عمارة - رضي الله عنها - دافعت عن النبي ﷺ في أحد حتى أصيبت بجراح كثيرة."
    },
    {
        question: "من هي المرأة التي كانت تلبس قناعًا في غزوة أحد وتقاتل مع المشركين؟",
        options: [
            "هند بنت عتبة ✅",
            "زينب بنت الرسول",
            "أم حكيم بنت الحارث",
            "خولة بنت الأزور"
        ],
        explanation: "هند بنت عتبة - زوجة أبي سفيان - كانت تحرض المشركين وحزت رأس حمزة بن عبد المطلب."
    }
];

// Quiz Variables
let currentQuestion = 0;
let score = 0;
let userAnswers = [];
let timer;
let timeLeft = 30;
let username = "";

// DOM Elements
const introSection = document.getElementById('intro');
const quizContainer = document.getElementById('quiz-container');
const resultsSection = document.getElementById('results');
const startBtn = document.getElementById('startQuiz');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const questionCounterEl = document.getElementById('question-counter');
const timerEl = document.getElementById('timer');
const userResultEl = document.getElementById('user-result');
const scoreEl = document.getElementById('score');
const answersReviewEl = document.getElementById('answers-review');
const darkModeToggle = document.getElementById('darkModeToggle');
const usernameInput = document.getElementById('username');

// Dark Mode Toggle
darkModeToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
});

// Start Quiz
startBtn.addEventListener('click', () => {
    username = usernameInput.value.trim();
    
    if (!username) {
        alert('الرجاء إدخال اسمك!');
        return;
    }
    
    introSection.classList.add('d-none');
    quizContainer.classList.remove('d-none');
    loadQuestion();
    startTimer();
});

// Load Question
function loadQuestion() {
    if (currentQuestion >= questions.length) {
        showResults();
        return;
    }
    
    resetTimer();
    questionCounterEl.textContent = `السؤال ${currentQuestion + 1} من ${questions.length}`;
    questionEl.textContent = questions[currentQuestion].question;
    optionsEl.innerHTML = '';
    
    questions[currentQuestion].options.forEach((option, index) => {
        const isCorrect = option.includes('✅');
        const cleanOption = option.replace('✅', '');
        
        const optionEl = document.createElement('div');
        optionEl.className = 'option card p-3 mb-2';
        optionEl.innerHTML = `
            <input type="radio" name="answer" id="option${index}" value="${index}">
            <label for="option${index}" class="ms-2">${cleanOption}</label>
        `;
        
        optionEl.addEventListener('click', () => {
            document.querySelectorAll('.option').forEach(opt => {
                opt.classList.remove('bg-light', 'bg-dark');
            });
            optionEl.classList.add('bg-light');
            if (document.body.classList.contains('dark-mode')) {
                optionEl.classList.add('bg-dark');
            }
        });
        
        optionsEl.appendChild(optionEl);
    });
}

// Next Question
nextBtn.addEventListener('click', () => {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    
    if (!selectedOption) {
        alert('الرجاء اختيار إجابة!');
        return;
    }
    
    const answerIndex = parseInt(selectedOption.value);
    const isCorrect = questions[currentQuestion].options[answerIndex].includes('✅');
    
    userAnswers.push({
        question: questions[currentQuestion].question,
        userAnswer: questions[currentQuestion].options[answerIndex].replace('✅', ''),
        correctAnswer: questions[currentQuestion].options.find(opt => opt.includes('✅')).replace('✅', ''),
        isCorrect: isCorrect,
        explanation: questions[currentQuestion].explanation
    });
    
    if (isCorrect) {
        score++;
    }
    
    currentQuestion++;
    loadQuestion();
});

// Timer
function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = `الوقت: ${timeLeft} ثانية`;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            if (currentQuestion < questions.length) {
                userAnswers.push({
                    question: questions[currentQuestion].question,
                    userAnswer: "لم يتم الإجابة",
                    correctAnswer: questions[currentQuestion].options.find(opt => opt.includes('✅')).replace('✅', ''),
                    isCorrect: false,
                    explanation: questions[currentQuestion].explanation
                });
                currentQuestion++;
                loadQuestion();
            }
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = 30;
    timerEl.textContent = `الوقت: ${timeLeft} ثانية`;
    startTimer();
}

// Show Results
function showResults() {
    clearInterval(timer);
    quizContainer.classList.add('d-none');
    resultsSection.classList.remove('d-none');
    
    const percentage = Math.round((score / questions.length) * 100);
    
    userResultEl.textContent = `${username}، هذه هي نتيجتك:`;
    scoreEl.textContent = `${score} / ${questions.length} (${percentage}%)`;
    
    answersReviewEl.innerHTML = '<h4 class="mb-3">تفاصيل الإجابات:</h4>';
    
    userAnswers.forEach((answer, index) => {
        const answerCard = document.createElement('div');
        answerCard.className = `card mb-3 ${answer.isCorrect ? 'correct-answer' : 'wrong-answer'}`;
        answerCard.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">السؤال ${index + 1}: ${answer.question}</h5>
                <p class="card-text"><strong>إجابتك:</strong> ${answer.userAnswer}</p>
                <p class="card-text"><strong>الإجابة الصحيحة:</strong> ${answer.correctAnswer}</p>
                <p class="card-text"><strong>التفسير:</strong> ${answer.explanation}</p>
            </div>
        `;
        answersReviewEl.appendChild(answerCard);
    });
    
    // Send email with results
    sendEmailResults(percentage);
}

// Restart Quiz
restartBtn.addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    userAnswers = [];
    timeLeft = 30;
    
    resultsSection.classList.add('d-none');
    introSection.classList.remove('d-none');
    usernameInput.value = '';
});

// Send Email with Results
function sendEmailResults(percentage) {
    let emailContent = `
        <h2>نتيجة مسابقة السيرة النبوية</h2>
        <p><strong>اسم المشارك:</strong> ${username}</p>
        <p><strong>النتيجة:</strong> ${score}/${questions.length} (${percentage}%)</p>
        <h3>تفاصيل الإجابات:</h3>
    `;
    
    userAnswers.forEach((answer, index) => {
        emailContent += `
            <div style="margin-bottom: 20px; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
                <h4>السؤال ${index + 1}: ${answer.question}</h4>
                <p><strong>إجابة المشارك:</strong> ${answer.userAnswer}</p>
                <p><strong>الإجابة الصحيحة:</strong> ${answer.correctAnswer}</p>
                <p><strong>التفسير:</strong> ${answer.explanation}</p>
                <p><strong>الحالة:</strong> ${answer.isCorrect ? '✔ صحيح' : '✖ خطأ'}</p>
            </div>
        `;
    });
    
    const emailParams = {
        to_email: "mohammedbenantar251@gmail.com",
        from_name: "مسابقة السيرة النبوية",
        subject: `نتيجة مسابقة السيرة النبوية - ${username}`,
        message: emailContent
    };
    
    emailjs.send('YOUR_EMAILJS_SERVICE_ID', 'YOUR_EMAILJS_TEMPLATE_ID', emailParams)
        .then(() => {
            console.log('تم إرسال النتائج بنجاح!');
        }, (error) => {
            console.error('فشل في إرسال النتائج:', error);
        });
}