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

function renderNotFound(res) {
    return res.status(404).render("404", {
        title: "Oops! Nothing here",
        page: "404",
        description: "We couldn’t find the page you were looking for.",
        source: "/",
        keywords: "error, missing, not found"
    });
}

module.exports = {
    secureEncrypt,
    renderNotFound
};



