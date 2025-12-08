"use strict";
var Settings;
(function (Settings) {
    const IDENTITY = 'rhythm/settings';
    let data = new ArrayBuffer(4 * 64);
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
        U8[12] = values.user.name.length;
        for (let i = 0; i < values.user.name.length; i++) {
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
    }
    Settings.load = load;
    function getValues() {
        return values;
    }
    Settings.getValues = getValues;
    document.addEventListener('DOMContentLoaded', load);
})(Settings || (Settings = {}));
