export const k = kaboom({
    global: false,
    width: 600,
    height: 600,
    canvas: document.querySelector("#game-on"),
    background: [ 0, 0, 0, 0.9],
    // crisp: true,
})

k.loadRoot('./src/');

k.loadSprite('1stars', 'assets/sprites/1stars.png');
k.loadSprite('2stars', 'assets/sprites/2stars.png');
k.loadSprite('3stars', 'assets/sprites/3stars.png');
k.loadSprite('skull', 'assets/sprites/skull.png');
k.loadSprite('navBtnLeft', 'assets/sprites/nav-btn-left.png');
k.loadSprite('navBtnRight', 'assets/sprites/nav-btn-right.png');
k.loadSprite('backBtnIcon', 'assets/sprites/back-btn.png');
k.loadSprite('retryIcon', 'assets/sprites/retry.png');
k.loadSprite('closeBtn', 'assets/sprites/closeBtn.png');

k.loadSprite('tutorial1', 'assets/sprites/tutorial1.png');
k.loadSprite('tutorial2', 'assets/sprites/tutorial2.png');
k.loadSprite('tutorial3', 'assets/sprites/tutorial3.png');
k.loadSprite('tutorial4', 'assets/sprites/tutorial4.png');
k.loadSprite('tutorial5', 'assets/sprites/tutorial5.png');
k.loadSprite('tutorial6', 'assets/sprites/tutorial6.png');
k.loadSprite('tutorial7', 'assets/sprites/tutorial7.png');
k.loadSprite('tutorial8', 'assets/sprites/tutorial8.png');
k.loadSprite('tutorial9', 'assets/sprites/tutorial9.png');
k.loadSprite('tutorial10', 'assets/sprites/tutorial10.png');

k.loadSound("bgSong", "assets/audio/bgSong.mp3");
k.loadSound("die", "assets/audio/die.mp3");
k.loadSound("eat", "assets/audio/eat.wav");
k.loadSound("walk", "assets/audio/walk.wav");
k.loadSound("jump", "assets/audio/jump.wav");

export default k;