const quoteText = document.querySelector("#text"),
    authorName = document.querySelector("#author"),
    quoteBtn = document.querySelector("button");

// random quote
function randomQuote() {
    console.log("Clicked");
    quoteBtn.innerText = "Loading...";
    // fetch random quote/data from api and parse it into javascript object
    fetch("https://api.quotable.io/random").then(res => res.json()).then(result => {
        console.log(result);
        quoteText.innerText = '"' + result.content + '"';
        authorName.innerText = "- " + result.author;
        quoteBtn.innerText = "New Quote";
    })
}

quoteBtn.addEventListener("click", randomQuote);