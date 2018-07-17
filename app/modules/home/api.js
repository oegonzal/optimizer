import { database } from "../../config/firebase";

export function addQuote(quote, callback) {
    const { userId } = quote;
    const newQuoteRef = database.ref().child('quotes').push();
    const newQuoteKey = newQuoteRef.key;

    quote.id = newQuoteKey;

    // Write the new quote data simultaneously in the quotes list and the user's quotes list.
    let updates = {};
    updates['/quotes/' + newQuoteKey] = quote;
    updates['/user-quotes/' + userId + '/' + newQuoteKey] = quote;

    database.ref().update(updates)
        .then(() => callback(true, quote, null))
        .catch((error) => callback(false, null, error));
}

// TODO: consider having superadmin that has a further bucket
// to be able to see a level higher

export function getQuotes(callback) {
    // TODO: Make this by bucket or userId

    const quotesRef = database.ref('quotes');

    //start listening for new data
    quotesRef.on('value', function(snapshot) {
        callback(true, snapshot, null)
    });
}

export function updateQuote(quote, callback) {
    const { id, userId } = quote;

    let updates = {};
    updates['quotes/' + id] = quote;
    updates['/user-quotes/' + userId + '/' + id] = quote;

    database.ref().update(updates)
        .then(() => callback(true, quote, null))
        .catch((error) => callback(false, null, error));
}

export function updateQuoteOrder(quotes) {
    console.log(quotes);
}

export function updateNewOrder(quotesInNewOrder) {
    // TODO: may be able to get away by using updateQuote function above
    // All you have to do is make an object of the keys you want to update
}

export function deleteQuote(quote, callback) {
    const { id, userId } = quote;

    let updates = {};
    updates['quotes/' + id] = null;
    updates['/user-quotes/' + userId + '/' + id] = null;

    database.ref().update(updates)
        .then(() => callback(true, quote, null))
        .catch((error) => callback(false, null, error));
}

export function toggleLove(data, callback) {
    const { quote, uid } = data;
    const quoteRef = database.ref('quotes/' + quote.id);

    quoteRef.transaction(function(quote) {
        if (quote) {
            if (quote.loves && quote.loves[uid]) {
                quote.loveCount--;
                quote.loves[uid] = null;
            } else {
                quote.loveCount++;
                if (!quote.loves) quote.loves = {};
                quote.loves[uid] = true;
            }
        }

        return quote;

    }, function(error, committed, snapshot) {
        if (error || !committed) callback(false, null, error)
        else callback(true, snapshot.val(), null)
    });
}