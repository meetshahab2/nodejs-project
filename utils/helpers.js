



function encryptData(data, secretKey) {
    const iv = CryptoJS.lib.WordArray.random(16); // Generate random IV
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), CryptoJS.enc.Utf8.parse(secretKey), {
        iv: iv,
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
    });

    // Return encrypted data along with IV and optionally _data based on environment
    return {
        i: iv.toString(CryptoJS.enc.Hex),  // IV in hex
        d: encrypted.toString(),          // Encrypted data
        ...(process.env.ENVNAME !== 'prod' ? { __data: data } : {}) // Conditionally add _data if not 'prod'
    };
}

let notFoundPage = (res) => {
    res.render('404', {
        page: "404"
    });
};
let redirectTo404 = (res) => {
    return res.status(404).render('404', { menu: '404', title: 'Not-Found', description: "Page not found", source: "/", keywords: "" });
};

let redirectOnException = (res) => {
    return res.status(301).redirect("/");

};

let internalServerError = (res) => {
    res.render('500', {
        page: "500"
    });
};

function groupByKey(data, keyFn = (e) => e.ticker.symbol[0]) {
    let reduce = data.reduce((r, e) => {
        // get first letter of name of current element
        let group = keyFn(e);
        // if there is no property in accumulator with this letter create it
        if (!r[group]) r[group] = { group, children: [e] };
        // if there is push current element to children array for that letter
        else r[group].children.push(e);
        // return accumulator
        return r;
    }, {});
    return Object.values(reduce);
}

function dd(...args) {
    console.log(...args);
    process.exit();
}

function tickerFormatting(tickers, excludeSymbol) {
    let dict = {};
    let dictNameToSymbolMap = {};
    let dictSymbolToNameMap = {};
    tickers.forEach(x => {
        if (x.ticker.symbol !== excludeSymbol) {
            dict[`${x.ticker.symbol} - ${x.ticker.name}`] = null;
            dictNameToSymbolMap[`${x.ticker.symbol} - ${x.ticker.name}`] = x.ticker.symbol;
            dictSymbolToNameMap[`${x.ticker.symbol}`] = `${x.ticker.symbol} - ${x.ticker.name}`;
        }
    });
    let tickerGroup = groupByKey(tickers);
    return { dict, dictNameToSymbolMap, dictSymbolToNameMap, tickerGroup };
}

function capitalizeWords(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

function showLiveTicker(symbol) {
    return symbol === "BANKNIFTY"
        || symbol === "NIFTY"
        || symbol === "NIFTYIT"
        || symbol === "MCDOWELL-N";
}

function yesterday() {
    return new Date(new Date().setDate(new Date().getDate() - 1))
}
function todayIST() {

    return new Date(new Date().getTime() + istOffset);;
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