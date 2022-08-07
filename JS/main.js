// بسم الله الرحمن الرحيم 
// Start project


const words = [
    "Hello",
    "Programming",
    "Code",
    "Javascript",
    "Town",
    "Country",
    "Testing",
    "Youtube",
    "Linkedin",
    "Twitter",
    "Github",
    "Leetcode",
    "Internet",
    "Python",
    "Scala",
    "Destructuring",
    "Paradigm",
    "Styling",
    "Cascade",
    "Documentation",
    "Coding",
    "Funny",
    "Working",
    "Dependencies",
    "Task",
    "Runner",
    "Roles",
    "Test",
    "Rust",
    "Playing"
];




// Setting lvls
const lvls = {
    "Easy": 5,
    "Normal": 3,
    "Hard": 2
}

// Default lvl
let defaultLevelName = "Normal";
let defaultLevelSeconds = lvls[defaultLevelName]


// choose deficulty
let deficulty = document.querySelector(".game .contaner .deficulty select")

deficulty.onclick = function () {
    if (deficulty.value === "1") {
        defaultLevelName = "Easy"
    } else if (deficulty.value === "2"){
        defaultLevelName = "Normal"
    }else {
        defaultLevelName = "Hard"
    }
    LvlNameSpan.innerHTML = defaultLevelName;
    defaultLevelSeconds = lvls[defaultLevelName]
    LvlSecondsSpan.innerHTML = defaultLevelSeconds;
    timeLeftSpan.innerHTML = defaultLevelSeconds;
    ScoreTotal.innerHTML = words.length
}


// Catch Selectors
let LvlNameSpan = document.querySelector(".game .contaner .messsage .lvl")
let LvlSecondsSpan = document.querySelector(".game .contaner .messsage .seconds")

let StartButton = document.querySelector(".game .contaner .start")

let theWord = document.querySelector(".game .contaner .the-word")
let upComingWords = document.querySelector(".game .contaner .upcoming-words")

let input = document.querySelector(".game .contaner .input")

let timeLeftSpan = document.querySelector(".game .contaner .controle .time span")
let ScoreGot = document.querySelector(".game .contaner .controle .score .got")
let ScoreTotal = document.querySelector(".game .contaner .controle .score .total")

let finishMessage = document.querySelector(".game .contaner .finish")


// setting Level name &&  Level Second && Score
LvlNameSpan.innerHTML = defaultLevelName;
LvlSecondsSpan.innerHTML = defaultLevelSeconds;
timeLeftSpan.innerHTML = defaultLevelSeconds;
ScoreTotal.innerHTML = words.length



//desable Past event at input
input.onpaste = function() {
    return false
}


// Start Game
StartButton.onclick = function () {
    deficulty.setAttribute("disabled", "")

    StartButton.remove();
    input.focus();

    // Generate word function
    generateWord();

}



function generateWord () {
    //get random word from words array with his index
    let RandomWord = words[Math.floor(Math.random() * words.length)]
    let wordIndex = words.indexOf(RandomWord)
    // remove this word from words array
    words.splice(wordIndex, 1)
    //Empty The word Place && generatr the word
    theWord.innerHTML = ""
    theWord.innerHTML = RandomWord
    // Empty Upcoming words && generate Upcoming words -> not incloud Random ward
    upComingWords.innerHTML = ""
    for(let i = 0; i < words.length; i++) {
        let div = document.createElement("div")
        div.appendChild(document.createTextNode(words[i]))
        upComingWords.appendChild(div)
    }
    //start play function
    StartPlay()
}


function StartPlay() {
    timeLeftSpan.innerHTML = defaultLevelSeconds; // !important
    let start = setInterval(() => {
        timeLeftSpan.innerHTML--
        if (timeLeftSpan.innerHTML === "0") {
            // clear this interval
            clearInterval(start)
            // compare inpute value with random word
            if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
                input.value = "";
                ScoreGot.innerHTML++;
                if (words.length > 0) {
                    generateWord();
                }else {
                    let span = document.createElement("span")
                    span.classList.add("good")
                    span.appendChild(document.createTextNode("O_- Congratulations -_O"))
                    finishMessage.appendChild(span)
                    // remove upcoming words
                    upComingWords.remove()
                }
            } else {
                let span = document.createElement("span")
                span.classList.add("bad")
                span.appendChild(document.createTextNode("Game Over"))
                finishMessage.appendChild(span)
                // remove upcoming words
                upComingWords.remove()
            }
        }
    }, 1000)
}