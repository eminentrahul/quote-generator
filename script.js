const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterButton = document.getElementById('twitter');
const newQuoteButton = document.getElementById('new-quote');
const loader = document.getElementById('loader');

//Show Loader
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//Hide loader
function completeLoading() {
    if(!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

async function getQuote() {

    loading();

    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'

    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {

        const response = await fetch(proxyUrl+apiUrl);
        const data = await response.json();

        //If author is blank, add 'Unknown'
        if (data.quoteAuthor === '') {
            authorText.innerText = 'Unknown';
        } else {
            authorText.innerText = data.quoteAuthor;

        }

        //Reduce the font size for long quote
        if (data.quoteText.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }

        quoteText.innerText = data.quoteText;

        //Stop loader and show quote
        completeLoading();

    } catch(error) {
        getQuote();
        console.log('Whoops, no quote', error);
    }
}
// Tweet quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

// Event Listner

newQuoteButton.addEventListener('click', getQuote)
twitterButton.addEventListener('click', tweetQuote);

getQuote();