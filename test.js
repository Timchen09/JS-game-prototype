const app = new PIXI.Application();

// Wait for the Renderer to be available
await app.init();

// The application will create a canvas element for you that you
// can then insert into the DOM
document.body.appendChild(app.canvas);

// load the texture we need
const texture = await PIXI.Assets.load('sprites/sample.jpg');

// This creates a texture from a 'bunny.png' image

let bunny = PIXI.Sprite.from(texture);

// Setup the position of the bunny
bunny.x = app.renderer.width / 2;
bunny.y = app.renderer.height / 2;

// Rotate around the center
bunny.anchor.x = 0.5;
bunny.anchor.y = 0.5;

// Add the bunny to the scene we are building
app.stage.addChild(bunny);
// Listen for frame updates
app.ticker.add(() => {
    // each frame we spin the bunny around a bit
    bunny.rotation += 0.01;
});