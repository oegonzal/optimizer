import * as t from './actionTypes';
import * as api from './api';

export function updateListOrder(quotes) {
    return (dispatch) => {
        api.updateQuoteOrder(quotes);
    };
}

export function changeOrder(currentQuotesIndexOrder) {
    return (dispatch) => {
        // Use this action when an item is getting switched on the list
        dispatch({type: t.LIST_ORDER_CHANGE, currentQuotesIndexOrder});
    };
}


// TODO: consider using this again when you change quotes to props instead of state
// on Home component, when prop changes it won't reload page but action can
// save state version and upload api!
export function dropListElement(index) {
    return (dispatch) => {
        // Use this action when an items gets dropped/switched in the list
        // dispatch({type: t.LIST_ELEMENT_DROP}, index);
        // api.updateNewOrder
    };
}

export function addBucket(bucket, successCB, errorCB) {
    return (dispatch) => {
        api.addBucket(bucket, function (success, data, error) {
            if (success) successCB();
            else if (error) errorCB(error)
        });
    };
}

export function getBucketsBasic(params, errorCB) {
    return (dispatch) => {
        dispatch({type: t.LOADING_BUCKETS});
        api.getBuckets(params, function (success, data, error) {
            if (success) dispatch({type: t.BUCKETS_AVAILABLE, data});
            else if (error) errorCB(error);
        });
    };
}

export function getBucketsDetailed(errorCB) {
    return (dispatch) => {

    };
}

export function updateBucket(bucket, successCB, errorCB) {
    return (dispatch) => {
        api.updateBucket(bucket, function (success, data, error) {
            if (success) successCB();
            else if (error) errorCB(error);
        });
    };
}

export function deleteBucket(params, errorCB) {
    return (dispatch) => {
        dispatch({type: t.BUCKET_DELETED, quote});
        api.deleteBucket(params, function (success, data, error) {
            if (error) errorCB(error);
        })
    };
}

export function archiveBucket(bucket, errorCB) {
    return (dispatch) => {

    };
}

export function archiveQuote(quote, errorCB) {
    return (dispatch) => {

    };
}

// Add Quote - CREATE (C)
export function addQuote(quote, successCB, errorCB) {
    return (dispatch) => {
        api.addQuote(quote, function (success, data, error) {
            if (success) successCB();
            else if (error) errorCB(error)
        });
    };
}

// Get Quotes - READ (R)
export function getQuotes(errorCB) {
    return (dispatch) => {
        dispatch({type: t.LOADING_QUOTES});
        api.getQuotes(function (success, data, error) {
            if (success) dispatch({type: t.QUOTES_AVAILABLE, data});
            else if (error) errorCB(error);
        });
    };
}

// Update Quote - UPDATE (U)
export function updateQuote(quote, successCB, errorCB) {
    return (dispatch) => {
        api.updateQuote(quote, function (success, data, error) {
            if (success) successCB();
            else if (error) errorCB(error)
        });
    };
}

// Delete Quote - DELETE (D)
export function deleteQuote(quote, errorCB) {
    return (dispatch) => {
        dispatch({type: t.QUOTE_DELETED, quote});
        api.deleteQuote(quote, function (success, data, error) {
            if (error) errorCB(error)
        });
    };
}

// Like/Unlike
export function toggleLove(data, errorCB) {
    return (dispatch) => {
        dispatch({type: t.LOADING_QUOTES});
        api.toggleLove(data, function (success, data, error) {
            if (error) errorCB(error)
        });
    };
}