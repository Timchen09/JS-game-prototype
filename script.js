const app = new PIXI.Application();
await app.init();
document.body.appendChild(app.canvas);


// load the PNG asynchronously
const texture = await PIXI.Assets.load('sprites/sample.jpg');
let sprite = PIXI.Sprite.from(texture);


app.stage.addChild(sprite);

// Add a ticker callback to move the sprite back and forth

/*
let elapsed = 10.0;
app.ticker.add((ticker) => {
  elapsed += ticker.deltaTime;
  sprite.x = 100.0 + Math.cos(elapsed/50.0) * 100.0;
});

*/