// ==UserScript==
// @name         AutoFill Push
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://qlf-sun-admin.sfr.com/sun/push/ng/bundles/*/campaigns/add/*
// @match        https://sun-admin.sfr.com/sun/push/ng/bundles/*/campaigns/add/*
// @match        https://dev-sun-admin.inovatel.com/sun/push/ng/bundles/*/campaigns/add/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var D=document.forms[0];
    D.firstname.value='AAAA';
    D.lastname.value='BBBB';
    D.birthday.value='01/01/1970';
    D.lieunaissance.value='Paris';
    D.address.value='55 Rue du Faubourg Saint-Honoré';
    D.town.value='Paris';
    D.zipcode.value=75008;
})();