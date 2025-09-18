const CryptoJS = require("crypto-js");
const CryptoJS = require("crypto-js");

function secureEncrypt(payload, key) {
    const ivBytes = CryptoJS.lib.WordArray.random(16);
    const encrypted = CryptoJS.AES.encrypt(
        JSON.stringify(payload),
        CryptoJS.enc.Utf8.parse(key),
        {
            iv: ivBytes,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }
    );

    const response = {
        iv: ivBytes.toString(CryptoJS.enc.Hex),
        cipher: encrypted.toString()
    };

    if (process.env.ENVNAME !== "prod") {
        response.debugInfo = payload;
    }

    return response;
}

function isDateGreaterThanOrEqualToTodayInIST(date) {
    // Create a Moment object for the current date in IST
    const currentDateIST = moment().tz('Asia/Kolkata').startOf('day');

    // Create a Moment object for the input date
    const inputDate = moment(date, dateFormat).tz('Asia/Kolkata').startOf('day');

    // Compare the input date with the current date
    return inputDate.isSameOrAfter(currentDateIST);
}




function isThursday(day) {
    return day === 4;
}

function indexSymbol() {
    return ["NIFTY", "BANKNIFTY", "MIDCPNIFTY", "FINNIFTY", "NIFTYNXT50", "SENSEX", "BANKEX"];

}

function isIndexSymbol(symbol) {
    return indexSymbol().includes(symbol?.toUpperCase());
}

function isCurrencySymbol(symbol) {
    symbol = symbol.toUpperCase();
    return symbol === "USDINR";
}
function isCommoditySymbol(symbol) {
    symbol = symbol.toUpperCase();
    return symbol === "NATURALGAS" ||
        symbol === "CRUDEOIL" || symbol === "GOLD"
}

function isCurrOrCommoditySymbol(symbol) {
    symbol = symbol.toUpperCase();
    return symbol === "USDINR" || symbol === "NATURALGAS" ||
        symbol === "CRUDEOIL" || symbol === "GOLD"
}

function generateCacheKeys(cacheName, symbol, expiry) {
    let cacheKey = `${cacheName}_${isIndexSymbol(symbol) ? `INDEX` : expiry}`;
    let primaryKey = `${isIndexSymbol(symbol) ? `${symbol}_${expiry}` : `${symbol}`}`;
    return { cacheKey, primaryKey };
}


function getClassNameForPCR(val) {
    if (val > 0 && val <= 0.8) {
        return "danger"
    } else if (val >= 1.2) {
        return "success"
    } else if (val == 0) {
        return "secondary"
    } else return "info"
}

function getTextForPCR(val) {
    if (val > 0 && val <= 0.8) {
        return "Bearish Trend"
    } else if (val >= 1.2) {
        return "Bullish Trend"
    } else if (val == 0) {
        return "InSufficient Data"
    } else return "Neutral Trend"
}

function capitalizeFirstLetterOfEachWord(name) {
    return name
        ?.toLowerCase() // Convert the entire string to lowercase
        ?.replace(/\b\w/g, char => char.toUpperCase()) ?? ""; // Capitalize the first letter of each word
}

/*
module.exports.getTextForPCR = getTextForPCR;
module.exports.getClassNameForPCR = getClassNameForPCR;
module.exports.notFoundPage = notFoundPage;
module.exports.redirectTo404 = redirectTo404;
module.exports.redirectOnException = redirectOnException;
module.exports.groupByKey = groupByKey;
module.exports.tickerFormatting = tickerFormatting;
module.exports.capitalizeWords = capitalizeWords;
module.exports.showLiveTickerFor = showLiveTicker;
module.exports.yesterday = yesterday;
module.exports.isThursday = isThursday;
module.exports.isIndexSymbol = isIndexSymbol;
module.exports.isCurrOrCommoditySymbol = isCurrOrCommoditySymbol;
module.exports.isCurrencySymbol = isCurrencySymbol;
module.exports.generateCacheKeys = generateCacheKeys;
module.exports.seoHeadTagValues = seoHeadTagValues;
module.exports.todayIST = todayIST;
module.exports.indexSymbol = indexSymbol;
module.exports.isDateGreaterThanOrEqualToTodayInIST = isDateGreaterThanOrEqualToTodayInIST;
module.exports.capitalizeFirstLetterOfEachWord = capitalizeFirstLetterOfEachWord;
module.exports.encryptData = encryptData;
*/