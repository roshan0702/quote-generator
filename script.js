const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];


// show loading ....
function loading() {
   loader.hidden = false;
   quoteContainer.hidden = true;
}

// hide loading ....
function complete() {
   loader.hidden = true;
   quoteContainer.hidden = false;
}

// to show quote
function newQuote() {
   loading();
   const quote = apiQuotes[Math.round(Math.random() * apiQuotes.length)];
   //  to check if autorh is null
   if (!quote.author) {
      authorText.textContent = 'Unknown';
   } else {
      authorText.textContent = quote.author;
   }

   if (quote.text.length > 100) {
      quoteText.classList.add('long-quote');  // to add long- quote style for quote > 100 len
   } else {
      quoteText.classList.remove('long-quote');
   }
   complete();
   quoteText.textContent = quote.text; 
}

// get quotes from api
async function getQuotes() {
   loading();
   const apiurl = 'https://type.fit/api/quotes';

   try {
      const response = await fetch(apiurl);
      apiQuotes = await response.json();
      console.log(apiQuotes);
      newQuote();
   } catch (error) {
      // catch error
   }
}
// used to connect twitterBtn to tweet quote on twitter
function tweetQuote() {
   const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`; //used twitter integration to connect to twitter
   window.open(twitterUrl, '_blank');
}

// Event Listners used to do what on click on the buttons
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);


// On loads
getQuotes();