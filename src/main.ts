// namespace Settings {
//     const IDENTITY = 'rhythm/settings';
//     let data = new ArrayBuffer(4 * 3 + 256);
//     const U8 = new Uint8Array(data);

//     const values = {
//         volume: {
//             master: 0,
//             sfx: 0,
//             background: 0, // possibly an unused property
//             music: 0
//         },
//         user: {
//             score: 0,
//             accuracy: 0, // how accurate
//             name: "Unnamed"
//         }
//     }
    
//     export function write()
//     {
//         // move all data into the array before saving to disk.
//         // WHEN LOADING PLEASE DO NOT ORDER THIS ANY DIFFERENT.
//         // 4 bytes for volumes.
//         // 4(3) for [score, accuracy, u.name_len, u.name]

//         // #VOLUME
//         // a byte for each volume knob
//         U8[0] = values.volume.master
//         U8[1] = values.volume.sfx
//         U8[2] = values.volume.music
//         U8[3] = values.volume.background

//         // #PROFILE
//         const U32 = new Uint32Array(data);
//         U32[1] = values.user.score;

//         const F32 = new Float32Array(data);
//         F32[2] = values.user.accuracy;
        
//         U8[12] = Math.min(values.user.name.length, 255);
//         for (let i = 0; i < U8[12]; i++) {
//             U8[13+i] = values.user.name.charCodeAt(i);
//         }

//         // save to disk.
//         localStorage.setItem(IDENTITY, String.fromCodePoint(...U8));
//     }

//     // we are kinda in a rush rn, gotta push changes before class begins. -- 8/12/2025
//     export function load()
//     {
//         const item = localStorage.getItem(IDENTITY);
//         if(!item) {
//             write();
//             load();
//             return;
//         }

//         item.split("").forEach((str, i) => {
//             U8[i] = str.charCodeAt(0)
//         })


//         // first 4 bytes for the volumes (32 BITS)
//         values.volume.master = U8[0];
//         values.volume.sfx = U8[1];
//         values.volume.music = U8[2];
//         values.volume.background = U8[3];

//         // PROFILE
//         const U32 = new Uint32Array(data);
//         values.user.score = U32[1];

//         const F32 = new Float32Array(data);
//         values.user.accuracy = F32[2];

//         values.user.name = ""
//         for (let i = 0; i < U8[12]; i++) {
//             values.user.name += String.fromCharCode(U8[13+i])
//         }

//         console.log(`username: ${values.user.name} (${U8[12]})`)
//     }

//     export function getValues()
//     {
//         return values;
//     }

//     export function toString()
//     {
//         return String.fromCodePoint(...U8);
//     }

//     export function setName()
//     {
//         const a = prompt("Enter a memorable username.");
//         if(!a || a.length > 255) return new Error("Could not set username.");
//         for (let i = 0; i < a.length; i++) {
//             const char = a.charCodeAt(i);
//             if(
//                 // make sure the character is within the normal ASCII thingy
//                 (char < "0".charCodeAt(0) || char > "9".charCodeAt(0)) &&
//                 ( char < "A".charCodeAt(0) || char > "Z".charCodeAt(0)) &&
//                 ( char < "a".charCodeAt(0) || char > "z".charCodeAt(0))
//             )
//             {
//                 return new Error("Could not set username.");
//             }
//         }
//         values.user.name = a;
//         console.log('name set to ' + a);
//         write();
//     }

//     // load when the user loads the document
//     document.addEventListener('DOMContentLoaded', load);
// }


namespace KEYBOARDMANAGER {

    const keys = new Uint32Array(4);

    function down(ev: KeyboardEvent)
    {
        ev.preventDefault();
        console.log(ev.code)
    }

    function up(ev: KeyboardEvent)
    {
        ev.preventDefault();
    }

    document.addEventListener('keydown', down, {
        passive: false,
        capture: false,
        once: false
    })

    document.addEventListener('keyup', up, {
        passive: false,
        capture: false,
        once: false
    })
}

namespace FILEMANAGER {
    export function download(fileData: string, fileName: string)
    {
        const e = document.createElement('a');
        e.setAttribute('href', `data:text/plain;charset=utf-8,${fileData}`);
        e.setAttribute('download', fileName);
        e.style.display = 'none';
        document.body.appendChild(e);
        e.click();
        e.remove();
    }
}




namespace Players {
    let noteWidth = 75; //px
    let noteHeight = 75; //px
    class Player {
        constructor() {
        }
    }
    export const P: Player[] = [new Player, new Player];
    
}

namespace Gamestate {
    export function export_data()
    {
        const data: string[] = [];
        // some other things like the game's current state and whats next in the queue, advancements, achievements idk vro you make it up.
        // data.push(Settings.toString())
        FILEMANAGER.download(data.flat(1).join(''), 'gamestate.dat');
    }
}

