
enum Mods {
    xmod,
    x, y, z,
    movex, movey, movez,
    rotationx, rotationy, rotationz,
    skewx, skewy,
    drunk, drunkspeed, drunkoffset, drunkperiod,
    tipsy, tipsyspeed, tipsyoffset, tipsyperiod,
    drunkz, drunkzspeed, drunkzoffset, drunkzperiod,
}

namespace Game {
    const container = document.getElementById('container');

    export namespace Player {


        class Actor {
            private buffer: ArrayBuffer;
            public modifiers: Float16Array;
            private element: HTMLElement;
            private keybinds: Uint8Array;
            private using: string;

            constructor(pn: number)
            {
                this.buffer = new ArrayBuffer(4 * 1024); // ~4k modifiers
                this.modifiers = new Float16Array(this.buffer);

                const e = document.createElement('player');
                e.setAttribute('pn', `${pn}`);
                e.innerHTML =
                `
                    <div class="receptors">
                        <div class="receptor left"></div>
                        <div class="receptor down"></div>
                        <div class="receptor up"></div>
                        <div class="receptor right"></div>
                    </div>
                    <div class="notefield">
                        <div class="line left">
                            <tap></tap>
                        </div>
                        <div class="line down">
                        </div>
                        <div class="line up">
                        </div>
                        <div class="line right">
                        </div>
                    </div>
                `;
                this.element = e;
                this.keybinds = new Uint8Array(4);
                container.querySelector('.players').appendChild(e);
                this.modifiers[Mods.xmod] = 1.5 ; // 1.5x DEFAULT MODIFIER SETUP
            }

            applyModifiers()
            {
                this.element.style.transform = `
                    rotateX(${this.modifiers[Mods.rotationx]}deg)
                    rotateY(${this.modifiers[Mods.rotationy]}deg)
                    rotateZ(${this.modifiers[Mods.rotationz]}deg)
                `
            }

            setKeybinds(data: number[]) {
                this.keybinds.map((kb, i) => {
                    return data[i];
                })
                // this.keybinds[Key.l] = data[Key.l];
                // this.keybinds[Key.d] = data[Key.d];
                // this.keybinds[Key.u] = data[Key.u];
                // this.keybinds[Key.r] = data[Key.r];
            }
        }

        export function create()
        {
            return new Actor(document.querySelectorAll("player").length);
        }
    }
    
    export const P1 = Game.Player.create();

    function gameLoop()
    {
        P1.applyModifiers();
    }

    setInterval(gameLoop, 1000/60);
}
