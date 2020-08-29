// ==UserScript==
// @name         DLFPNoKarma
// @namespace    DLFPNoKarma
// @version      0.1
// @description  https://linuxfr.org/users/peetah/journaux/plonk
// @author       You
// @match        https://linuxfr.org/*
// @grant        none
// @run-at       document-body
// ==/UserScript==
(function() {
    'use strict';
    let style = document.createElement("style");
    style.textContent = `
    .details, .vote {
        display: none !important;
    }
    .fold {
        display: contents !important;
    }
    .hidden {
        display: contents !important;
    }
    .score {
        display: none !important;
    }
    `;
    document.querySelector("head").appendChild(style);
    // user space
    let nbVotes = document.getElementById('nb_votes');
    if (nbVotes) nbVotes.parentNode.style.display = 'none';
    // column notes in board
    let comments = document.getElementById('my_comments');
    if (comments) {
        for(let myComments of comments.childNodes[1].childNodes) {
            if (myComments.nodeType === Node.ELEMENT_NODE) {
                myComments.removeChild(myComments.childNodes[7]);
            }
        }
    }
    // karma counter in user space
    for(let userKarma of document.querySelectorAll("#user_recent_contents > ul > li")) {
        if(userKarma.textContent.includes('Karma')) {
            userKarma.style.display = 'none'
        }
    }
    // remove notes
    for(let score of document.querySelectorAll("span.score")) {
        score.parentNode.childNodes[3].textContent='';
        score.parentNode.childNodes[5].textContent='';
    }
})();