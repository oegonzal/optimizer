import * as t from './actionTypes';
import * as api from './api';

let initialState = {
    isLoading: false,
    quotes: [],
    buckets: []
};

const homeReducer = (state = initialState, action) => {
    switch (action.type) {

        case t.LOADING_QUOTES: {
            const quotes = state.quotes;

            // show loading signal
            if (quotes.length === 0) return {...state, isLoading: true}

            return state;
        }

        case t.LOADING_BUCKETS: {
            const buckets = state.buckets;

            // show loading signal
            if (buckets.length === 0) return {...state, isLoading: true};

            return state;
        }

        case t.QUOTES_AVAILABLE: {
            let { data } = action;
            let quotes = [];

            // convert the snapshot (json object) to array
            data.forEach(function (childSnapshot) {
                const item = childSnapshot.val();
                item.key = childSnapshot.key;

                quotes.push(item);
            });

            quotes.reverse();

            return {...state, quotes, isLoading: false};
        }

        case t.BUCKETS_AVAILABLE: {
            let { data } = action;
            let buckets = [];

            // convert the snapshot (json object) to array
            action.data.forEach(function (childSnapshot) {
                const item = childSnapshot.val();
                buckets.push(item);
            });

            buckets.reverse();
            return {...state, buckets, isLoading: false};
        }

        case t.QUOTE_DELETED: {
            const { quote } = action;
            const { quotes, currentQuotesIndexOrder } = state;

            if (currentQuotesIndexOrder) {
                for ( let i = 0; i < quotes.length; i++ ) {
                    if (quotes[i].id === quote.id) {
                        currentQuotesIndexOrder.splice(i, 1);
                        break;
                    }
                }
            }

            return {...state, currentQuotesIndexOrder};
        }

        case t.BUCKET_DELETED: {
            const { bucket } = action;
            return state;
        }

        case t.LIST_ORDER_CHANGE: {
            let { currentQuotesIndexOrder } = action;
            return { ...state, currentQuotesIndexOrder };
        }

        case t.LIST_ELEMENT_DROP: {
            // return state;
            let { index } = action;
            const { quotes, currentQuotesIndexOrder } = state;
            const quotesInNewOrder = currentQuotesIndexOrder.map((ind) => quotes[ind]);
            return { ...state, quotes: quotesInNewOrder };
        }

        case t.LOGGED_OUT: {
            return {...state, quotes: []};
        }

        default:
            return state;
    }
};

export default homeReducer;