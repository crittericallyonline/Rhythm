namespace Settings {
    const IDENTITY = 'rhythm/settings';
    let data = new ArrayBuffer(4 * 64); // alloc(4 * 3 = 12 bytes)
    const U8 = new Uint8Array(data);

    const values = {
        volume: {
            master: 0,
            sfx: 0,
            background: 0, // possibly an unused property
            music: 0
        },
        user: {
            score: 0,
            accuracy: 0, // how accurate
            name: "Unnamed"
        }
    }
    
    export function write()
    {
        // move all data into the array before saving to disk.
        // WHEN LOADING PLEASE DO NOT ORDER THIS ANY DIFFERENT.
        // 4 bytes for volumes.
        U8[0] = values.volume.master
        U8[1] = values.volume.sfx
        U8[2] = values.volume.music
        U8[3] = values.volume.background

        // PROFILE
        const U32 = new Uint32Array(data);
        U32[1] = values.user.score;

        const F32 = new Float32Array(data);
        F32[2] = values.user.accuracy;
        
        U8[12] = values.user.name.length;
        for (let i = 0; i < values.user.name.length; i++) {
            U8[13+i] = values.user.name.charCodeAt(i);
        }

        // save to disk.
        localStorage.setItem(IDENTITY, String.fromCodePoint(...U8));
    }

    // we are kinda in a rush rn, gotta push changes before class begins. -- 8/12/2025
    export function load()
    {
        const item = localStorage.getItem(IDENTITY);
        if(!item) {
            write();
            load();
            return;
        }

        item.split("").forEach((str, i) => {
            U8[i] = str.charCodeAt(0)
        })


        // first 4 bytes for the volumes
        values.volume.master = U8[0];
        values.volume.sfx = U8[1];
        values.volume.music = U8[2];
        values.volume.background = U8[3];

        // PROFILE
        const U32 = new Uint32Array(data);
        values.user.score = U32[1];

        const F32 = new Float32Array(data);
        values.user.accuracy = F32[2];

        values.user.name = ""
        for (let i = 0; i < U8[12]; i++) {
            values.user.name += String.fromCharCode(U8[13+i])
        }
    }

    export function getValues()
    {
        return values;
    }

    // load when the user loads the document
    document.addEventListener('DOMContentLoaded', load);
}