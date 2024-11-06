var textContentElement = document.getElementsByClassName("text-content")[0];
var typingBox = document.getElementById("typing-box");
var timer = document.getElementById("timer");
var wordCount = 0;
var correctWordCount = 0;
var typingStarted = false;
var currentWordN = 0;
var textWordList = [];
var boolList = [];

// import { wordList } from "./wordList.js";
// Sample list of 1000 common English words


// Generate random text by selecting random words from the word list
function generateRandomText(wordCount = ismobile ? 20 : 100) {
    textWordList = [];
    for (let i = 0; i < wordCount; i++) {
        let randomWord = wordList[Math.floor(Math.random() * wordList.length)];
        textWordList.push(randomWord);
    }
    // let     randomText =  randomTextArray.join(" ");
    // textContentElement.innerText = randomText;
    // textWordList = randomText.split(" ");
    textRefresh();
}


function textRefresh() {
    textContentElement.innerText = "";
    console.log(currentWordN);
    textWordList.forEach((element, index) => {
        if(index == currentWordN) {
            textContentElement.innerHTML += `<span class="current-word">${element} </span>`;
        } else  if (boolList[index]) {
            textContentElement.innerHTML += `<span class="correct">${element} </span>`;
        } else if (boolList[index] == undefined) {
            textContentElement.innerHTML += `<span>${element} </span>`;
        } else {
            textContentElement.innerHTML += `<span class="incorrect">${element} </span>`;
        }
    })
}

// Start the typing test timer and event listeners after the text is loaded
function startTypingTest() {
    typingBox.addEventListener("input", (element) => {
        if (!typingStarted) {
            startTimer();
            typingStarted = true;
        } else if (element.data === " " && typingBox.value != " ") {
            let typedWord = typingBox.value.trim();
            typingBox.value = "";
            wordCount++;
            if (typedWord === textWordList[currentWordN]) correctWordCount++;
            boolList.push(typedWord === textWordList[currentWordN]);
            currentWordN++;
            textRefresh();
        }
    });
}

// Timer function
function startTimer() {
    timer.innerText = 59;
    var a = setInterval(() => {
        timer.innerText = timer.innerText - 1;
        if (timer.innerText == "0") {
            typingBox.style.display = "none";
            let resultbox = document.getElementsByClassName("result")[0];
            resultbox.style.display = "block";
            resultbox.innerText = `Total Words typed: ${wordCount} \nTotal Correct Words typed: ${correctWordCount}`;
            clearInterval(a);
        }
    }, 1000);
}

// Initialize the app by setting random text and setting up the typing test
generateRandomText();
startTypingTest();

