import { getJSON, parameters, app } from "../script.js";
import { oSpritesheets } from "./load_spritesheets.js";

let aBlockDims = parameters.aBlockDims;
let aScreenDims = parameters.aScreenDims;
let fScalingFactor = parameters.fScalingFactor;
let fCameraAngle = parameters.fCameraAngle;


function calcBlockSize() {
    let aBlock = [0, 0, 0];
    aBlock[0] = aBlockDims[0] * fScalingFactor;
    aBlock[1] = Math.sin(fCameraAngle) * aBlockDims[1] * fScalingFactor;
    aBlock[2] = Math.cos(fCameraAngle) * aBlockDims[2] * fScalingFactor;
    return aBlock;
}

function translate_world_pos(aPos) {
    let aScreenPos = [0, 0];

    let aBlockSize = calcBlockSize();

    aScreenPos[0] = aPos[0] * aBlockSize[0];
    aScreenPos[1] = aBlockSize[1] * aPos[1] + aBlockSize[2] * aPos[2];

    aScreenPos[1] = aScreenDims[1] - aScreenPos[1] - aBlockSize[1] - aBlockSize[2];
    return aScreenPos;
}

function calculateZ(aPos, aDimensions) {
    let z = -aPos[1];
    z += aPos[2] * aDimensions[1]
    return z;
}

function render(oWorld, oWorldContainer) {
    for( var x=0; x<oWorld.metadata.dimensions[0]; x++) {
        for( var y=0; y<oWorld.metadata.dimensions[1]; y++) {
            for( var z=0; z<oWorld.metadata.dimensions[2]; z++) {
                console.log(x + " " + y + " " + z);
                let oSpritesheet = Object.values(oSpritesheets)[oWorld.blocks[z][x][y]];
                let zIndex = calculateZ([x, y, z], oWorld.metadata.dimensions);
                let aBlockSize = calcBlockSize();
                let aPos = translate_world_pos([x, y, z]);

                let oSpriteWall = PIXI.Sprite.from(oSpritesheet.textures.wall);
                oSpriteWall.x = aPos[0];
                oSpriteWall.y = aPos[1] + aBlockSize[1];
                oSpriteWall.width = aBlockSize[0];
                oSpriteWall.height = aBlockSize[2];
                oSpriteWall.zIndex = zIndex;
                oWorldContainer.addChild(oSpriteWall);

                let oSpriteGround = PIXI.Sprite.from(oSpritesheet.textures.ground);
                oSpriteGround.x = aPos[0];
                oSpriteGround.y = aPos[1];
                oSpriteGround.width = aBlockSize[0];
                oSpriteGround.height = aBlockSize[1];
                oSpriteGround.zIndex = zIndex;
                oWorldContainer.addChild(oSpriteGround);
                
                
            }
        }
    }
}
const oWorldContainer = new PIXI.Container()
oWorldContainer.sortableChildren = true;
app.stage.addChild(oWorldContainer);

render(getJSON("world_data/test.json"), app.stage);