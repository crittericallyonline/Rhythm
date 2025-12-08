"use strict";
var Settings;
(function (Settings) {
    const IDENTITY = 'rhythm/settings';
    let data = new ArrayBuffer(4 * 3 + 256);
    const U8 = new Uint8Array(data);
    const values = {
        volume: {
            master: 0,
            sfx: 0,
            background: 0,
            music: 0
        },
        user: {
            score: 0,
            accuracy: 0,
            name: "Unnamed"
        }
    };
    function write() {
        U8[0] = values.volume.master;
        U8[1] = values.volume.sfx;
        U8[2] = values.volume.music;
        U8[3] = values.volume.background;
        const U32 = new Uint32Array(data);
        U32[1] = values.user.score;
        const F32 = new Float32Array(data);
        F32[2] = values.user.accuracy;
        U8[12] = Math.min(values.user.name.length, 255);
        for (let i = 0; i < U8[12]; i++) {
            U8[13 + i] = values.user.name.charCodeAt(i);
        }
        localStorage.setItem(IDENTITY, String.fromCodePoint(...U8));
    }
    Settings.write = write;
    function load() {
        const item = localStorage.getItem(IDENTITY);
        if (!item) {
            write();
            load();
            return;
        }
        item.split("").forEach((str, i) => {
            U8[i] = str.charCodeAt(0);
        });
        values.volume.master = U8[0];
        values.volume.sfx = U8[1];
        values.volume.music = U8[2];
        values.volume.background = U8[3];
        const U32 = new Uint32Array(data);
        values.user.score = U32[1];
        const F32 = new Float32Array(data);
        values.user.accuracy = F32[2];
        values.user.name = "";
        for (let i = 0; i < U8[12]; i++) {
            values.user.name += String.fromCharCode(U8[13 + i]);
        }
        console.log(`username: ${values.user.name} (${U8[12]})`);
    }
    Settings.load = load;
    function getValues() {
        return values;
    }
    Settings.getValues = getValues;
    function toString() {
        return String.fromCodePoint(...U8);
    }
    Settings.toString = toString;
    function setName() {
        const a = prompt("Enter a memorable username.");
        if (!a || a.length > 255)
            return new Error("Could not set username.");
        for (let i = 0; i < a.length; i++) {
            const char = a.charCodeAt(i);
            if ((char < "0".charCodeAt(0) || char > "9".charCodeAt(0)) &&
                (char < "A".charCodeAt(0) || char > "Z".charCodeAt(0)) &&
                (char < "a".charCodeAt(0) || char > "z".charCodeAt(0))) {
                return new Error("Could not set username.");
            }
        }
        values.user.name = a;
        console.log('name set to ' + a);
        write();
    }
    Settings.setName = setName;
    document.addEventListener('DOMContentLoaded', load);
})(Settings || (Settings = {}));
var Gamestate;
(function (Gamestate) {
    function export_data() {
        const data = [];
        data.push(Settings.toString());
        download(data.flat(1).join(''), 'gamestate.dat');
    }
    Gamestate.export_data = export_data;
    function download(fileData, fileName) {
        const e = document.createElement('a');
        e.setAttribute('href', `data:text/plain;charset=utf-8,${fileData}`);
        e.setAttribute('download', fileName);
        e.style.display = 'none';
        document.body.appendChild(e);
        e.click();
        e.remove();
    }
    Gamestate.download = download;
})(Gamestate || (Gamestate = {}));
