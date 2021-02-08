// ==UserScript==
// @name         DLFPlonk
// @version      0.1
// @author       You
// @match        https://linuxfr.org/*
// @run-at       document-body
// ==/UserScript==
(async () => {
    'use strict';
  	const separator = '/';
    const storeName = '#stored_plonks';
    const storedP = await GM.getValue(storeName, "");
    let plonks = storedP.split(separator);

    function hidePlonked() {
        for(let comment of document.querySelectorAll("span.posted_by_spanblock")) {
            const auth = comment.querySelector("a[rel=author]").href.split('/');
            const author = auth[auth.length - 1];
            if (plonks && plonks.includes(author)) {
                let toBeHide = comment.parentNode.parentNode;
                if (toBeHide.tagName === 'HEADER') {
                    toBeHide.parentNode.style.display = 'none';
                } else {
                    toBeHide.style.display = 'none';
                }
            }
        }
    }
    function plonk(user) {
        plonks.push(user);
        GM.setValue(storeName, plonks.join(separator)).then((val) => hidePlonked());
    }
    function unplonk(user) {
        plonks = plonks.filter((val, idx, arr) => user !== val);
        GM.setValue(storeName, plonks.join(separator)).then((val) => hidePlonked());
    }

    // effective plonks
    for(let comment of document.querySelectorAll("span.posted_by_spanblock")) {
        const auth = comment.querySelector("a[rel=author]").href.split('/');
        const author = auth[auth.length - 1];
        if (plonks.includes(author)) {
            let toBeHide = comment.parentNode.parentNode;
            if (toBeHide.tagName === 'HEADER') {
                toBeHide.parentNode.style.display = 'none';
            } else {
                toBeHide.style.display = 'none';
            }
        } else {
            let hide = document.createElement("a");
            hide.textContent = '[✖]';
            hide.style = 'cursor: pointer';
            hide.onclick = (ev) => plonk(author);
            comment.prepend(hide);
        }
    }

    // list of users plonks
    const sidebar = document.getElementById('sidebar');
    const plonkView = document.createElement('div');
    sidebar.append(plonkView);
    plonkView.id = 'plonks';
    plonkView.className = 'box';
    const plonkTitle = document.createElement('h1');
    plonkView.append(plonkTitle);
    plonkTitle.textContent = 'Plonks';
    const plonkDescription = document.createElement('p');
    plonkView.append(plonkDescription);
    plonkDescription.textContent = 'Liste des utilisateurs plonkés :';
    const plonkList = document.createElement('ul');
    plonkView.append(plonkList);
    for(let p of plonks) {
        const plonkUser = document.createElement('li');
        const l = document.createElement('a');
        plonkUser.append(l);
        l.textContent = '[✖] ' + p;
        l.style = 'cursor: pointer';
        l.onclick = (ev) => unplonk(p);
        plonkList.append(plonkUser);
    }
    const plonkClear = document.createElement('a');
    plonkView.append(plonkClear);
    plonkClear.textContent = 'Supprimer la liste';
    plonkClear.style = 'cursor: pointer';
    plonkClear.onclick = (ev) => {
        plonks = [];
        GM.deleteValue(storeName).then((v) => hidePlonked());
    };

})();
