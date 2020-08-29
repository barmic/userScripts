// ==UserScript==
// @name         Tarsnap Human Readable
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Tarsnap Human Readable
// @author       You
// @match        https://www.tarsnap.com/manage.cgi*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function convert(value) {
        const units = ['o', 'Kio', 'Mio', 'Gio', 'Tio'];
        const values = value.split(" ");
        if (!values || values.length !== 2 || values[1] !== 'bytes') {
            return value;
        }
        var bValue = values[0];
        var unitIdx = 0;
        while (bValue >= 1000) {
            bValue = bValue / 1024;
            unitIdx += 1;
        }
        return bValue.toFixed(2) + ' ' + units[unitIdx];
    }

    for(let num of document.querySelectorAll("td")) {
        if (num.textContent.includes(' bytes')) {
            num.textContent = convert(num.textContent);
        }
    }
})();