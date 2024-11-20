import { getJSON, parameters, app } from "../script.js";

let data = getJSON("sprites/spritesheets.json")

for (var key in data) {
    let texture = await PIXI.Assets.load(data[key].meta.image);
    texture.source.scaleMode = 'nearest';
    data[key] = new PIXI.Spritesheet(texture, data[key]);
    await data[key].parse();
}

const oSpritesheets = data;
export {oSpritesheets}