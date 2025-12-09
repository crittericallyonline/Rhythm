"use strict";
var Mods;
(function (Mods) {
    Mods[Mods["xmod"] = 0] = "xmod";
    Mods[Mods["x"] = 1] = "x";
    Mods[Mods["y"] = 2] = "y";
    Mods[Mods["z"] = 3] = "z";
    Mods[Mods["movex"] = 4] = "movex";
    Mods[Mods["movey"] = 5] = "movey";
    Mods[Mods["movez"] = 6] = "movez";
    Mods[Mods["rotationx"] = 7] = "rotationx";
    Mods[Mods["rotationy"] = 8] = "rotationy";
    Mods[Mods["rotationz"] = 9] = "rotationz";
    Mods[Mods["skewx"] = 10] = "skewx";
    Mods[Mods["skewy"] = 11] = "skewy";
    Mods[Mods["drunk"] = 12] = "drunk";
    Mods[Mods["drunkspeed"] = 13] = "drunkspeed";
    Mods[Mods["drunkoffset"] = 14] = "drunkoffset";
    Mods[Mods["drunkperiod"] = 15] = "drunkperiod";
    Mods[Mods["tipsy"] = 16] = "tipsy";
    Mods[Mods["tipsyspeed"] = 17] = "tipsyspeed";
    Mods[Mods["tipsyoffset"] = 18] = "tipsyoffset";
    Mods[Mods["tipsyperiod"] = 19] = "tipsyperiod";
    Mods[Mods["drunkz"] = 20] = "drunkz";
    Mods[Mods["drunkzspeed"] = 21] = "drunkzspeed";
    Mods[Mods["drunkzoffset"] = 22] = "drunkzoffset";
    Mods[Mods["drunkzperiod"] = 23] = "drunkzperiod";
})(Mods || (Mods = {}));
var Game;
(function (Game) {
    const container = document.getElementById('container');
    let Player;
    (function (Player) {
        class Actor {
            buffer;
            modifiers;
            element;
            keybinds;
            using;
            constructor(pn) {
                this.buffer = new ArrayBuffer(4 * 1024);
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
                this.modifiers[Mods.xmod] = 1.5;
            }
            applyModifiers() {
                this.element.style.transform = `
                    rotateX(${this.modifiers[Mods.rotationx]}deg)
                    rotateY(${this.modifiers[Mods.rotationy]}deg)
                    rotateZ(${this.modifiers[Mods.rotationz]}deg)
                `;
            }
            setKeybinds(data) {
                this.keybinds.map((kb, i) => {
                    return data[i];
                });
            }
        }
        function create() {
            return new Actor(document.querySelectorAll("player").length);
        }
        Player.create = create;
    })(Player = Game.Player || (Game.Player = {}));
    Game.P1 = Game.Player.create();
    function gameLoop() {
        Game.P1.applyModifiers();
    }
    setInterval(gameLoop, 1000 / 60);
})(Game || (Game = {}));
