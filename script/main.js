"use strict";
var KEYBOARDMANAGER;
(function (KEYBOARDMANAGER) {
    const keys = new Uint32Array(4);
    function down(ev) {
        ev.preventDefault();
        console.log(ev.code);
    }
    function up(ev) {
        ev.preventDefault();
    }
    document.addEventListener('keydown', down, {
        passive: false,
        capture: false,
        once: false
    });
    document.addEventListener('keyup', up, {
        passive: false,
        capture: false,
        once: false
    });
})(KEYBOARDMANAGER || (KEYBOARDMANAGER = {}));
var FILEMANAGER;
(function (FILEMANAGER) {
    function download(fileData, fileName) {
        const e = document.createElement('a');
        e.setAttribute('href', `data:text/plain;charset=utf-8,${fileData}`);
        e.setAttribute('download', fileName);
        e.style.display = 'none';
        document.body.appendChild(e);
        e.click();
        e.remove();
    }
    FILEMANAGER.download = download;
})(FILEMANAGER || (FILEMANAGER = {}));
var Players;
(function (Players) {
    let noteWidth = 75;
    let noteHeight = 75;
    class Player {
        constructor() {
        }
    }
    Players.P = [new Player, new Player];
})(Players || (Players = {}));
var Gamestate;
(function (Gamestate) {
    function export_data() {
        const data = [];
        FILEMANAGER.download(data.flat(1).join(''), 'gamestate.dat');
    }
    Gamestate.export_data = export_data;
})(Gamestate || (Gamestate = {}));
