// ==UserScript==
// @name         DLFTags
// @namespace    DLFTags
// @version      0.1
// @author       You
// @match        https://linuxfr.org/*
// @grant        none
// @run-at       document-body
// ==/UserScript==
(function() {
    'use strict';
    let tags = new Set(['covid-19']);
    for(let article of document.querySelectorAll("article")) {
      for(let tag of article.querySelectorAll("a[rel=tag]")) {
        if (tags.has(tag.textContent)) {
            article.style.display = 'none';
            break;
        }
      }
    }
})();