var textContent = document.getElementsByClassName("text-content")[0].innerHTML;
var textWordList = textContent.split(" ");
var typingBox = document.getElementById("typing-box");
var timer = document.getElementById("timer");
var wordCount = 0;
var correctWordCount = 0;
var typingStarted = false;
var currentWordN = 0;
typingBox.addEventListener("input",(element,p)=>{
    if(!typingStarted){
        startTimer();
        typingStarted = true;
    }
    else if (element.data == " "){
        let typedword = typingBox.value;
        typedword = typedword.slice(0,typedword.length-1);
        typingBox.value = "";
        wordCount++;
        if (typedword==textWordList[currentWordN]) correctWordCount++;
        currentWordN++;
    }
});
function startTimer(){
    timer.innerText = 59;
    a = setInterval(()=>{
        timer.innerText = timer.innerText -1;
        if (timer.innerText == "0"){
            typingBox.style.display = "none";
            let resultbox = document.getElementsByClassName("result")[0];
            resultbox.innerText = `Total Words typed: ${wordCount} \nTotal Correct Words typed: ${correctWordCount}`;
            clearInterval(a);
            return;
        }
    },1000);
}