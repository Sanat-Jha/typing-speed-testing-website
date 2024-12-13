var textContentElement = document.getElementsByClassName("text-content")[0];
var typingBox = document.getElementById("typing-box");
var timer = document.getElementById("timer");
var wordCount = 0;
var correctWordCount = 0;
var typingStarted = false;
var currentWordN = 0;
var textWordList = [];
var boolList = [];
var letterpersecond = [];
var ismobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
const resultchartelement = document.getElementById('resultChart').getContext('2d');
// import { wordList } from "./wordList.js";
// Sample list of 1000 common English words


// Generate random text by selecting random words from the word list
function generateRandomText(wordCount = ismobile ? 20 : 100) {
    
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
    let currentTime = null; // Variable to track the current time
    let lastSpaceTime = null; // Variable to track the last space time
    typingBox.addEventListener("input", (element) => {
        currentTime = Date.now();
        if (!typingStarted) {
            startTimer();
            lastSpaceTime = currentTime;
            typingStarted = true;
        } else if (element.data === " " && typingBox.value != " ") {
            let typedWord = typingBox.value.trim();
            typingBox.value = "";
            wordCount++;
            if (typedWord === textWordList[currentWordN]) correctWordCount++;
            boolList.push(typedWord === textWordList[currentWordN]);
            currentWordN++;
            let timeDiff = currentTime - lastSpaceTime
            letterpersecond.push(typedWord.length/(timeDiff/1000));
            lastSpaceTime = currentTime;
            if (currentWordN >= textWordList.length-10) {
                //refresh the text list and continue typing
                generateRandomText(10);
            }
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
            console.log(letterpersecond);
            typingBox.style.display = "none";
            let resultbox = document.getElementsByClassName("result")[0];
            resultbox.style.display = "block";
            document.getElementsByClassName("tryagain")[0].style.display = "block";
            let accuracy = (correctWordCount / wordCount) * 100;
            
            // Show the results text separately
            resultbox.innerHTML = `Total Words typed: ${wordCount} <br> Total Correct Words typed: ${correctWordCount}<br><br>Accuracy: ${accuracy.toFixed(2)}%<br><br>`;
            
            // Add the canvas for the chart
            const canvas = document.createElement("canvas");
            canvas.id = "resultChart";
            canvas.width = 700;
            canvas.height = 400;
            resultbox.appendChild(canvas);

            const xAxis = letterpersecond.map((_, index) => textWordList[index]);
            const pointColors = boolList.map(isCorrect => isCorrect ? 'green' : 'red');
            const resultChart = new Chart(canvas.getContext('2d'), {
                type: 'line', // Type of chart (line chart)
                data: {
                    labels: xAxis, // X-axis values (index of the array)
                    datasets: [{
                        label: 'Letter Per Second',
                        data: letterpersecond, // Y-axis values (float list)
                        borderColor: 'white', // Line color
                        backgroundColor: 'black', // Area color under the line
                        fill: true, // Fill the area under the line
                        tension: 0.1, // Line smoothness
                        pointBackgroundColor: pointColors, 
                    }]
                },
                
                


            });

            clearInterval(a);
        }
    }, 1000);
}

// Initialize the app by setting random text and setting up the typing test
generateRandomText();
startTypingTest();

