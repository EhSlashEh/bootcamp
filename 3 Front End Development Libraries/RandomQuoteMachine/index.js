const quoteText = document.querySelector("#text"),
    authorName = document.querySelector("#author"),
    quoteBtn = document.querySelector("button"),
    backColor = document.querySelector("body"),
    myColor = document.querySelector("#my-name");

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


        // Do it
        backColor.style.backgroundColor = ranColor();
    })
}

quoteBtn.addEventListener("click", randomQuote);

// Tweet Quote
function tweetText() {
    const text = encodeURIComponent(document.getElementById('text').textContent);
    const author = encodeURIComponent(document.getElementById('author').textContent);
    const tweet = text + " " + author;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${tweet}`;
    window.open(tweetUrl);
}

function ranColor() {
    // Generate random RGB color components
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    // Construct CSS color string
    const color = `rgb(${red}, ${green}, ${blue})`;

    return color;
}