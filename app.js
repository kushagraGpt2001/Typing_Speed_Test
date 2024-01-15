
let submitBtn = document.getElementById("submitBtn");
let resetBtn = document.getElementById("resetBtn");
let result = document.getElementById("result");
let quoteDisplay = document.getElementById("quoteDisplay");
let quoteInput = document.getElementById("quoteInput");
let timer = document.getElementById("timer");
let spinner = document.getElementById("spinner");


let count = -1;
let input;

function timercount() {
    input = setInterval(function() {
        count = count + 1;
        timer.textContent = count;
        spinner.classList.add('d-none')
    }, 1000);
}



function varify(jsonData) {
    quoteDisplay.textContent = jsonData;
    spinner.classList.add('d-none')

}

function validate() {

    let url = "https://apis.ccbp.in/random-quote";
    let options = {
        method: "GET"
    };

    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            varify(jsonData.content);
            spinner.classList.add('d-none')
        })
}
resetBtn.onclick = function() {
    spinner.classList.remove('d-none')
    validate();
    quoteInput.value = "";
    result.textContent = "";
    clearInterval(input)
    timercount();
    count = -1;
}
submitBtn.onclick = function() {

    if(quoteInput.value === ""){
        result.textContent = "please Enter text";
        result.style.color = "#FF0000";
        clearInterval(input)
    }else if (quoteInput.value === quoteDisplay.textContent) {
        clearInterval(input);
        result.textContent = `You typed in ${timer.textContent} seconds`;
        result.style.color = "#008000";
    } else{
        result.textContent = "You typed is incorrect";
        clearInterval(input);
        result.style.color = "#FF0000";
    }
}
validate();
timercount();