import k from '../kaboom.js';
import { actionList, function1Actions, function2Actions, restartAction } from './../layout.js'
import { configModal } from './HomeScreen.js';


// k.loadSprite('map-bg', 'assets/sprites/mapBg.jpg');
k.loadSprite('wall-steel', 'assets/sprites/map-tiles.png', {
    sliceX: 5,
    sliceY: 1,
    scale: 2
});
k.loadSprite('robot', 'assets/sprites/robot.png');
k.loadSprite('fly-food', 'assets/sprites/fly.png');
k.loadSprite('laser-horizontal', 'assets/sprites/laser-horizontal.png', {
    sliceX: 4,
    sliceY: 1,
    scale: 2,
    animeSpeed: 0.1,
    anims: {
        on: { from: 0, to: 3 }
    }
});
k.loadSprite('laser-vertical', 'assets/sprites/laser-vertical.png', {
    sliceX: 1,
    sliceY: 4,
    scale: 2,
    animeSpeed: 0.1,
    anims: {
        on: { from: 0, to: 3 }
    }
});
k.loadSprite('laser-headers', 'assets/sprites/laser-headers.png', {
    sliceX: 5,
    sliceY: 1,
    scale: 2
});

export default function Game (playerInfo) {
    console.log('Game->', playerInfo)

    let playerSpeed = 200;
    let speedMutiplier = 2.5;
    let didHitWall = false;
    let hasWonLevel = false;
    let canEat = false;
    let isDead = false;
    let movements = playerInfo.completedLevelsInfo[playerInfo.choosedLevel].movements ?? 0;
    let score = playerInfo.completedLevelsInfo[playerInfo.choosedLevel].score ?? 0;
    let attempts = playerInfo.completedLevelsInfo[playerInfo.choosedLevel].attempts ?? 0;
    let deaths = playerInfo.completedLevelsInfo[playerInfo.choosedLevel].deaths ?? 0;
    let timeStart = new Date();
    let timeEnd = null;

    const playButton = document.querySelector('.btn-action-play-play');
    const restartButton = document.querySelector('.btn-action-play-restart');   
    const configButton = document.querySelector('.btn-action-play-settings')
    restartAction();
    k.gravity(0)

    const maps = [
        [
            [
                'aaaaaaaaaa',
                'a     a  a',
                'a     a  a',
                'a        a',
                'a        a',
                'a  aaaa  a',
                'a   a    a',
                'a   a    a',
                'a   a    a',
                'aaaaaaaaaa',
            ],
            {
                playerPosX: 60 + 30,
                playerPosY: 180 + 30,
                playerFacing: 'faceRight',
                enemyPosX: 420 + 30, 
                enemyPosY: 300 + 30,
                scoreRule: [6, 8, 10]
            },
        ],
        [
            [
            'aa aaaaaaa',
            'a    aa  a',
            'a    a   a',
            'a    a   a',
            'a        a',
            'ejjg aaa a',
            'a      a  ',
            '       a  ',
            ' a  aa a  ',
            'aaaaaaaaaa',
            ],
            {
                playerPosX: 60 + 30,
                playerPosY: 120 + 30,
                playerFacing: 'faceRight',
                enemyPosX: 240 + 30, 
                enemyPosY: 420 + 30,
                scoreRule: [5, 7, 9]
            }
        ],
        [
            [
            'aaaa aaaaa',
            'a    aa  a',
            'a    a    ',
            '     a   a',
            'a    a i a',
            'a    a k a',
            'a      k a',
            '  ejjfjh  ',
            'a        a',
            'aaaaaaaaaa',
            ],
            {
                playerPosX: 60 + 30,
                playerPosY: 120 + 30,
                playerFacing: 'faceRight',
                enemyPosX: 480 + 30, 
                enemyPosY: 60 + 30,
                scoreRule: [3, 5, 7]
            }
        ]
    ]
    
    k.layers(['bg', 'obj', 'ui', 'food', 'modalBg', 'modalBox', 'modalBtn', 'modalText'], 'obj');

    const levelCfg = {
        width: 60,
        height: 60,
        'a': () => [k.sprite('wall-steel', {frame: 0}), 'wall-steel1', k.solid(), 'wall1', k.area(), k.scale(3.75)],
        'b': () => [k.sprite('wall-steel', {frame: 1}), 'wall-steel2', k.solid(), 'wall2', k.area(), k.scale(3.75)],
        'c': () => [k.sprite('wall-steel', {frame: 2}), 'wall-steel3', k.solid(), 'wall3', k.area(), k.scale(3.75)],
        'd': () => [k.sprite('wall-steel', {frame: 3}), 'wall-steel4', k.solid(), 'wall4', k.area(), k.scale(3.75)],
        'e': () => [k.sprite('laser-headers', {frame: 0}), 'laser-headers1', k.solid(), 'laser-headers1', k.area(), k.scale(3.75)],
        'f': () => [k.sprite('laser-headers', {frame: 1}), 'laser-headers2', k.solid(), 'laser-headers2', k.area(), k.scale(3.75)],
        'g': () => [k.sprite('laser-headers', {frame: 2}), 'laser-headers3', k.solid(), 'laser-headers3', k.area(), k.scale(3.75)],
        'h': () => [k.sprite('laser-headers', {frame: 3}), 'laser-headers4', k.solid(), 'laser-headers4', k.area(), k.scale(3.75)],
        'i': () => [k.sprite('laser-headers', {frame: 4}), 'laser-headers5', k.solid(), 'laser-headers5', k.area(), k.scale(3.75)],
        'j': () => [k.sprite('laser-horizontal', {frame: 0}), 'dangerous', k.solid(), 'laser', k.area(),  k.scale(3.75)],
        'k': () => [k.sprite('laser-vertical', {frame: 0}), 'dangerous', k.solid(), 'laser', k.area(),  k.scale(3.75)],
        // d: [sprite('brick-red'), 'wall-brick-dool', solid(), 'wall'],
        // b: [sprite('wall-gold'), 'wall-gold', solid(), 'wall'],
        // w: [sprite('brick-wood'), 'wall-brick', solid(), 'wall'],
        // p: [sprite('brick-wood'), 'wall-brick-dool', solid(), 'wall'],
        // t: [sprite('door'), 'door', 'wall'],    
        // '}': [sprite('ghost'), 'dangerous', 'ghost', { dir: -1, timer: 0 }],
        // '&': [sprite('slime'), 'slime', { dir: -1 }, 'dangerous', { timer: 0 }],    
        // '*': [sprite('baloon'), 'baloon', { dir: -1 }, 'dangerous', { timer: 0 }],
    };

    const mapBoundaries = {
        x: k.width(),
        y: k.height(),
    }
    const gameLevel = k.addLevel(maps[playerInfo.choosedLevel][0], levelCfg);  //playerInfo.choosedLevel

    const backButton = k.add([
        k.sprite('backBtnIcon'),
        k.origin('center'),
        k.pos(26, 28),
        k.scale(0.35),
        k.area(),
        'backBtnIcon'
    ]);
    k.onUpdate(() => {
        k.every('backBtnIcon', (o) => {
            o.scale = o.isHovering() ? 0.39 : 0.35;
        });
    });
    k.onClick('backBtnIcon', (b) => {
        playerInfo.completedLevelsInfo[playerInfo.choosedLevel] = {
            levelIndex: playerInfo.choosedLevel,
            movements,
            score,
            attempts,
            deaths,
            timeStart,
            timeEnd,
        }
        k.go('roadmap', playerInfo)
    });

    // const background = k.add([
    //     k.sprite("map-bg"),
    //     k.layer('bg'),
    // ]);

    const deg = (dir) => {
        if (dir === 'faceLeft') return 270;
        if (dir === 'faceRight') return 90;
        if (dir === 'faceUp') return 180;
        if (dir === 'faceDown') return 0;
    };

    const player = k.add([
        k.sprite('robot', {
            animeSpeed: 0.1,
            frame: 0
        }),
        k.origin('center'),
        k.pos(maps[playerInfo.choosedLevel][1].playerPosX, maps[playerInfo.choosedLevel][1].playerPosY),
        k.rotate(deg(maps[playerInfo.choosedLevel][1].playerFacing)),
        // k.pos(300 + 30, 420 + 30),
        // k.rotate(deg('faceLeft')),
        // k.pos(480 + 30, 0 + 30),
        // k.rotate(deg('faceDown')),
        // k.pos(0 + 30, 120 + 30),
        // k.rotate(deg('faceUp')),
        // k.pos(60 + 30, 120 + 30),
        // k.rotate(deg('faceRight')),
        k.scale(3.75),
        k.area(),
        k.solid(),
        k.body(),
        k.layer('obj'),
        "player"
    ])

    const enemy = k.add([
        k.sprite('fly-food'),
        k.origin('center'),
        k.pos(maps[playerInfo.choosedLevel][1].enemyPosX, maps[playerInfo.choosedLevel][1].enemyPosY),
        k.scale(2.8),
        k.layer('food'),
        "food"
    ])

    const isOutOfMap = () => (player.pos.x >= mapBoundaries.x || player.pos.x <= 0 || player.pos.y >= mapBoundaries.y || player.pos.y <= 0)

    const rotate = (dir) => {
        player.angle = deg(dir);
    }

    const moveUp = () => {
        player.move(0, -playerSpeed);
        player.dir = k.vec2(0, -1);
    }

    const moveDown = () => {
        player.move(0, playerSpeed);
        player.dir = k.vec2(0, 1);
    }

    const moveRight = () => {
        player.move(playerSpeed, 0);
        player.dir = k.vec2(1, 0);
    }

    const moveLeft = () => {
        player.move(-playerSpeed, 0);
        player.dir = k.vec2(-1, 0);
    }

    const roundToNearest60 = x => 
        Math.round(x/60)*60

    const hasFloor = (x, y, angle) => {
        let xValue =x/60;
        let yValue = y/60;

        if (angle === 0) {
            yValue += 1;
        }
        if (angle === 270) {
            xValue += 1;
        }
        if (angle === 180) {
            yValue -= 1;
        }
        if (angle === 90) {
            xValue -= 1;
        }
        // console.log(`xValue: ${xValue}, yValue: ${yValue}, angle: ${angle}`)
        // console.log(maps[playerInfo.choosedLevel][yValue-1]?.split('').toString())
        // console.log('->', maps[0][yValue-1]?.split('')[xValue-1]);
        return maps[playerInfo.choosedLevel][0][yValue-1]?.split('')[xValue-1] === 'a';
    }

    const playerDie = async () => {
        console.log('2hasWonLevel', hasWonLevel)
        if (!hasWonLevel) {
            isDead = true;
            deaths += 1;
            attempts += 1;
            k.gravity(1000)
            k.destroy(enemy)
            rotate('faceUp')
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    failureModal('died')
                    resolve()
                }, 800)
            })
        }
    }

    const goRight = () => {
        didHitWall = false;
        console.log('player.angle', player.angle)
        return new Promise((resolve, reject) => {
            if (player.angle === 0) {
                console.log('r1')
                const target = player.pos.x + 60;
                const timer = setInterval(() => {                    
                    if (didHitWall) {
                        clearInterval(timer);
                        resolve();
                    } else if (player.pos.x > target || hasWonLevel) {
                        clearInterval(timer);
                        player.moveTo(roundToNearest60(player.pos.x+30) - 30, player.pos.y)
                        if (!hasFloor(player.pos.x+30, player.pos.y+30, player.angle)) playerDie()
                        resolve();
                    } else if (isOutOfMap()) {
                        playerDie();
                        resolve();
                    }
                    moveRight();
                }, 7)
            } else if (player.angle === 270) {
                console.log('r2')
                const target = player.pos.y - 60;
                const timer = setInterval(() => {
                    if (didHitWall || hasWonLevel) {
                        clearInterval(timer);
                        resolve();
                    } else if (player.pos.y < target) {
                        clearInterval(timer);
                        player.moveTo(player.pos.x, roundToNearest60(player.pos.y -30)+30);
                        if (!hasFloor(player.pos.x+30, player.pos.y+30, player.angle)) playerDie()
                        resolve();
                    } else if (isOutOfMap()) {
                        playerDie();
                        resolve();
                    }
                    moveUp();
                }, 7)
            } else if (player.angle === 90) {
                console.log('r3')
                const target = player.pos.y + 60;
                const timer = setInterval(() => {
                    if (didHitWall || hasWonLevel) {
                        clearInterval(timer);
                        resolve();
                    } else if (player.pos.y > target) {
                        clearInterval(timer);
                        player.moveTo(player.pos.x, roundToNearest60(player.pos.y +30)-30);
                        if (!hasFloor(player.pos.x+30, player.pos.y+30, player.angle)) playerDie()
                        resolve();
                    } else if (isOutOfMap()) {
                        playerDie();
                        resolve();
                    }
                    moveDown();
                }, 7)
            } else if (player.angle === 180) {
                console.log('r4')
                const target = player.pos.x - 60;
                const timer = setInterval(() => {
                    if (didHitWall || hasWonLevel) {
                        clearInterval(timer);
                        resolve();
                    } else if (player.pos.x < target) {
                        clearInterval(timer);
                        player.moveTo(roundToNearest60(player.pos.x -30) + 30, player.pos.y);
                        if (!hasFloor(player.pos.x+30, player.pos.y+30, player.angle)) playerDie()
                        resolve();
                    } else if (isOutOfMap()) {
                        playerDie();
                        resolve();
                    }
                    moveLeft()
                }, 7)
            }
        });
    }

    const goRightWall = () => {
        didHitWall = false;
        return new Promise((resolve, reject) => {
            checkPlayerFacingPos('right')
            if (!hasFloor(player.pos.x+30, player.pos.y+30, player.angle)) playerDie()
            resolve();
        })
    }
    
    const goLeft = () => {
        didHitWall = false;
        return new Promise((resolve, reject) => {
            if (player.angle === 0) {
                console.log('l1')
                const target = player.pos.x - 60;
                const timer = setInterval(() => {
                    if (didHitWall || hasWonLevel) {
                        clearInterval(timer);
                        resolve();
                    } else if (player.pos.x < target) {
                        clearInterval(timer);
                        player.moveTo(roundToNearest60(player.pos.x-30) + 30, player.pos.y);
                        if (!hasFloor(player.pos.x+30, player.pos.y+30, player.angle)) playerDie()
                        resolve()
                    } else if (isOutOfMap()) {
                        playerDie();
                        resolve();
                    };
                    moveLeft()
                }, 7)
            } else if (player.angle === 270) {
                console.log('l2')
                const target = player.pos.y + 60;
                const timer = setInterval(() => {
                    if (didHitWall || hasWonLevel) {
                        clearInterval(timer);
                        resolve();
                    } else if (player.pos.y > target) {
                        clearInterval(timer);
                        player.moveTo(player.pos.x, roundToNearest60(player.pos.y + 30) - 30)
                        if (!hasFloor(player.pos.x+30, player.pos.y+30, player.angle)) playerDie()
                        resolve()
                    } else if (isOutOfMap()) {
                        playerDie();
                        resolve();
                    }
                    moveDown()
                }, 7)
            } else if (player.angle === 90) {
                console.log('l3')
                const target = player.pos.y - 60;
                const timer = setInterval(() => {
                    if (didHitWall || hasWonLevel) {
                        clearInterval(timer);
                        resolve();
                    } else if (player.pos.y < target) {
                        clearInterval(timer);
                        player.moveTo(player.pos.x, roundToNearest60(player.pos.y - 30) + 30)
                        if (!hasFloor(player.pos.x+30, player.pos.y+30, player.angle)) playerDie()
                        resolve();
                    } else if (isOutOfMap()) {
                        playerDie();
                        resolve();
                    }
                    console.log('a')
                    moveUp();
                }, 7)
            } else if (player.angle === 180) {
                console.log('l4')
                const target = player.pos.x + 60;
                const timer = setInterval(() => {
                    if (didHitWall || hasWonLevel) {
                        clearInterval(timer);
                        resolve();
                    } else if (player.pos.x > target) {
                        clearInterval(timer);
                        player.moveTo(roundToNearest60(player.pos.x + 30) - 30, player.pos.y)
                        console.log('-->', !hasFloor(player.pos.x+30, player.pos.y+30, player.angle))
                        if (!hasFloor(player.pos.x+30, player.pos.y+30, player.angle)) playerDie()
                        resolve();
                    } else if (isOutOfMap()) {
                        playerDie();
                        resolve();
                    }
                    moveRight()
                }, 7)
            } 
        });
    }

    const goLeftWall = () => {
        didHitWall = false;
        return new Promise((resolve, reject) => {
            checkPlayerFacingPos('left')
            if (!hasFloor(player.pos.x+30, player.pos.y+30, player.angle)) playerDie()
            resolve();
        })
    }

    const jump = () => {
        return new Promise((resolve, reject) => {
            playerSpeed *= speedMutiplier;
            if (player.angle == 0) {
                // console.log('j1', didHitWall);
                const timer = setInterval(() => {
                    if (player.angle !== 0 || didHitWall) {
                        clearInterval(timer);
                        // didHitWall = false;
                        checkPlayerFacingPos('jump');
                        playerSpeed /= speedMutiplier;
                        resolve();
                    } else if (isOutOfMap()) {
                        playerDie();
                        resolve();
                    } else moveUp()
                }, 7)
            } else if (player.angle == 90) {
                // console.log('j2', didHitWall);
                const timer = setInterval(() => {
                    if (player.angle !== 90 || didHitWall) {
                        clearInterval(timer);
                        // didHitWall = false;
                        checkPlayerFacingPos('jump');
                        playerSpeed /= speedMutiplier;
                        resolve();
                    } else if (isOutOfMap()) {
                        playerDie();
                        resolve();
                    } else moveRight()
                }, 7)
            } else if (player.angle == 270) {
                // console.log('j3', didHitWall);
                const timer = setInterval((jum) => {
                    if (player.angle !== 270 || didHitWall) {
                        clearInterval(timer);
                        // didHitWall = false;
                        checkPlayerFacingPos('jump');
                        playerSpeed /= speedMutiplier;
                        resolve();
                    } else if (isOutOfMap()) {
                        playerDie();
                        resolve();
                    } else moveLeft()
                }, 7) 
            } else if (player.angle == 180) {
                // console.log('j4', didHitWall);
                const timer = setInterval(() => {
                    if (player.angle !== 180 || didHitWall) {
                        clearInterval(timer);
                        // didHitWall = false;
                        checkPlayerFacingPos('jump');
                        playerSpeed /= speedMutiplier;
                        resolve();
                    } else if (isOutOfMap()) {
                        playerDie();
                        resolve();
                    } else moveDown()
                }, 7)
            }
            if (didHitWall) {
                didHitWall = false;
                resolve()
            }
        })       
    }
    
    // const turnRight = () => {
    //     return new Promise(async (resolve, reject) => {
    //         if (player.angle === 0) {
    //             const target = player.pos.x + 60;
    //             const timer = setInterval(() => {
    //                 if (player.pos.x > target || player.angle !== 0) {
    //                     clearInterval(timer);
    //                     resolve();
    //                 }
    //                 moveRight()
    //             }, 7)
    //         } else if (player.angle === 270) {
    //             const target = player.pos.y - 60;
    //             const timer = setInterval(() => {
    //                 if (player.pos.y < target || player.angle !== 270) {
    //                     clearInterval(timer);
    //                     resolve();
    //                 }
    //                 moveUp()
    //             }, 7)
    //         } else if (player.angle === 90) { // OK
    //             await new Promise((resolve, reject) => {
    //                 const targetY = player.pos.y + 30;
    //                 const timer = setInterval(() => {
    //                     if (player.pos.y > targetY || player.angle !== 90) {
    //                         clearInterval(timer);
    //                         resolve();
    //                     }
    //                     moveDown()
    //                 }, 7)
    //             })
    //             player.moveTo(player.pos.x - 30, player.pos.y)
    //             rotate('faceUp')
    //             await new Promise((resolve, reject) => {
    //                 const targetX = player.pos.x - 30;
    //                 const timer = setInterval(() => {
    //                     if (player.pos.x < targetX || player.angle !== 180) {
    //                         clearInterval(timer);
    //                         resolve();
    //                     }
    //                     moveLeft()
    //                 }, 7)
    //             })
    //         } else if (player.angle === 180) {
    //             const target = player.pos.x - 60;
    //             const timer = setInterval(() => {
    //                 if (player.pos.x < target || player.angle !== 180) {
    //                     clearInterval(timer);
    //                     resolve();
    //                 }
    //                 moveLeft()
    //             }, 7)
    //         }
    //     });
    // }

    const checkPlayerFacingPos = (orientation) => {
        console.log('rotacionou');
        if (orientation === 'left') {
            if (player.angle === 0) rotate('faceRight');
            else if (player.angle === 90) rotate('faceUp');
            else if (player.angle === 180) rotate('faceLeft');
            else if (player.angle === 270) rotate('faceDown');
        } else if (orientation === 'right') {
            if (player.angle === 0) rotate('faceLeft');
            else if (player.angle === 90) rotate('faceDown');
            else if (player.angle === 180) rotate('faceRight');
            else if (player.angle === 270) rotate('faceUp');
        } else if (orientation === 'jump') {
            if (player.angle === 0) rotate('faceUp');
            else if (player.angle === 90) rotate('faceLeft');
            else if (player.angle === 180) rotate('faceDown');
            else if (player.angle === 270) rotate('faceRight');
        }
        // if (player.dir.x === 0 && player.dir.y === -1) rotate('faceUp');
        // if (player.dir.x === 1 && player.dir.y === 0) rotate('faceLeft');
        // if (player.dir.x === -1 && player.dir.y === 0) rotate('faceRight');
        // if (player.dir.x === 0 && player.dir.y === 1) rotate('faceDown');
    }

    k.onCollide("player", "wall1", () => {
        didHitWall = true;
    })

    player.onUpdate(() => {
        player.pushOutAll();
        if ((roundToNearest60(player.pos.x+30) === roundToNearest60(enemy.pos.x+30)) 
            && (roundToNearest60(player.pos.y+30) === roundToNearest60(enemy.pos.y+30))) canEat = true;
        else canEat = false;
    })

    // criar um algoritmo que gere um score baseado em uso de funcao
    const getScore = () => {
        const [r3, r2, r1] = maps[playerInfo.choosedLevel][1].scoreRule
        if (movements <= r3) return 3;
        else if (movements <= r2) return 2;
        else return 1;
    }

    const eatFly = async () => ( !canEat ??
        await new Promise((resolve, reject) => {
            timeEnd = new Date();
            setTimeout(() => {
                console.log('comeu')
                k.destroy(enemy)
                // tocar som q comeu
                hasWonLevel = true;
                console.log('1hasWonLevel', hasWonLevel)
                score = getScore();
                playerInfo.completedLevelsInfo[playerInfo.choosedLevel] = {
                    levelIndex: playerInfo.choosedLevel,
                    movements,
                    score,
                    attempts,
                    deaths,
                    timeStart,
                    timeEnd,
                }
                levelSuccessModal();
                resolve();
            }, 300)
        })
    )

    const executeMovements = async (actionList) => {
        movements = 0;
        for await (const action of actionList) {
            movements += 1;
            // console.log(`--iniciais-->\nx:${player.pos.x+30}, y:${player.pos.y+30}`)
            const btn = document.querySelector(`.btn-${action}-ui`)
            btn.style.backgroundColor = 'rgba(47, 199, 89, 0.7)';

            if (action === 'eat') await eatFly();
            if (action === 'right') await goRight();
            if (action === 'rightwall') await goRightWall();
            if (action === 'left') await goLeft();
            if (action === 'leftwall') await goLeftWall();
            if (action === 'jump') {
                didHitWall = false;
                await jump();
                didHitWall = false;
            } 
            player.moveTo(roundToNearest60(player.pos.x+30)-30, roundToNearest60(player.pos.y+30)-30)
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    btn.style.backgroundColor = 'white'
                    resolve();
                }, 200)
            })
        }
    }
    
    k.onKeyDown('up', () => moveUp())
    k.onKeyDown('right', () => moveRight())
    k.onKeyDown('down', () => moveDown())
    k.onKeyDown('left', () => moveLeft())

    // k.onCollide('player', 'laser', (p, f) => {
    //     console.log('bateu laser')
    //     // tocar som morte
    //     // 
    // })

    const retry = () => {
        console.log('retry')
        restartAction();
        playButton.removeAttribute('disabled')
        playButton.style.cursor = 'pointer'
        restartButton.removeAttribute('disabled')
        restartButton.style.cursor = 'pointer'
        configButton.removeAttribute('disabled')
        configButton.style.cursor = 'pointer'
        console.log('deaths1', deaths)
        playerInfo.completedLevelsInfo[playerInfo.choosedLevel] = {
            levelIndex: playerInfo.choosedLevel,
            movements,
            score,
            attempts,
            deaths,
            timeStart,
            timeEnd,
        }
        console.log('------------->', playerInfo.completedLevelsInfo[playerInfo.choosedLevel].deaths)
        console.log('deaths2', deaths)
        k.go('game', playerInfo); //add aq estatisticas de mortes e etc
    }

    const goNextLevel = () => {
        console.log('next level')
        console.log({...playerInfo, choosedLevel: playerInfo.choosedLevel+1})
        // fix
        k.go('game', {...playerInfo, choosedLevel: playerInfo.choosedLevel+1});
    }


    //* ACTION BUTTONS *//
    
    playButton.style.display = 'flex';
    playButton.onclick = () => {
        console.log('start game')
        playButton.setAttribute('disabled', 'disabled')
        playButton.style.cursor = 'not-allowed'
        restartButton.setAttribute('disabled', 'disabled')
        restartButton.style.cursor = 'not-allowed'
        configButton.setAttribute('disabled', 'disabled')
        configButton.style.cursor = 'not-allowed'
        let finalList = []
        Object.values(actionList).forEach((value) => {
            if (value == 'f2') finalList.push(...Object.values(function2Actions).filter((item) => item))
            else if (value == 'f1') finalList.push(...Object.values(function1Actions).filter((item) => item))
            else if (value) finalList.push(value)
        })
        console.log(finalList)
        setTimeout(async () => {
            await executeMovements(finalList);
            if (!hasWonLevel && !isDead) {
                setTimeout(() => {
                    attempts += 1;
                    failureModal('lost')
                }, 300);
            }
        }, 500);
        
    }

    restartButton.style.display = 'flex';

    configButton.onclick = () => {
        configModal(playerInfo, 'game')
    }

    const failureModal = (textModal) => {
        const bg1 = k.add([
            k.rect(300, 600),
            k.pos(300, 0),
            k.color(k.BLACK),
            k.opacity(0.35),
            k.z('modalBg'),
        ])
        const bg2 = k.add([
            k.rect(300, 600),
            k.pos(0, 0),
            k.color(k.BLACK),
            k.opacity(0.35),
            k.z('modalBg'),
        ])

        const modalBox = k.add([
            k.rect(400, 250),
            k.pos(k.width() * 0.5, k.height() * 0.5),
            // k.area(),
            k.origin('center'),
            k.color(k.WHITE),
            k.layer('modalBox'),
        ]);
        modalBox.radius = 15;
        
        const text = k.add([
            k.pos(k.width() * 0.5, 215),
            k.text(`You ${textModal}!`, {
                size: 32,
                font: 'sink',
            }),
            k.origin('center'),
            k.color(k.BLACK),
            k.layer('modalText'),
        ]);

        const skull = k.add([
            k.sprite('skull'),
            k.pos(k.width() * 0.5, k.height() * 0.5 - 5),
            k.origin('center'),
            k.layer('modalText'),
            k.scale(6),
            k.rotate(),
            k.area(),
            'skull'
        ]);

        const tryAgain = k.add([
            k.rect(170, 50),
            k.pos(k.width() * 0.5, 380),
            k.origin('center'),
            k.layer('modalBtn'),
            k.color(k.BLACK),
            k.area(),
            'btn-try-again'
        ])
        tryAgain.radius = 10;
        const tryAgainText = k.add([
            k.pos(tryAgain.pos.x, tryAgain.pos.y),
            k.origin('center'),
            k.text('Retry', {
                size: 24,
                font: 'sink',
            }),
            k.color(k.CYAN),
            k.area(),
            k.layer('modalText'),
            'text-try-again'
        ]);

        k.onUpdate(() => {
            k.every('btn-try-again', (o) => {
                const aux = o.isHovering();
                o.color = aux ? k.MAGENTA : k.BLACK;
                o.width = aux ? 180 : 170;
                o.height = aux ? 58 : 55;

                k.every('text-try-again', (o) => {
                    o.color = aux ? k.BLACK : k.CYAN;
                    // o.textSize = aux ? 27 : 24;
                });
                skull.angle += 0.25;
            });
        });
        k.onClick('btn-try-again', (b) => {
            k.destroy(bg1);
            k.destroy(bg2);
            k.destroy(modalBox);
            k.destroy(text);
            k.destroy(tryAgain);
            k.destroy(tryAgainText);
            retry()
        });
    }
    
    const levelSuccessModal = () => {
        const bg1 = k.add([
            k.rect(300, 600),
            k.pos(300, 0),
            k.color(k.BLACK),
            k.opacity(0.35),
            k.z('modalBg'),
        ])
        const bg2 = k.add([
            k.rect(300, 600),
            k.pos(0, 0),
            k.color(k.BLACK),
            k.opacity(0.35),
            k.z('modalBg'),
        ])

        const modalBox = k.add([
            k.rect(400, 350),
            k.pos(k.width() * 0.5, k.height() * 0.5),
            // k.area(),
            k.origin('center'),
            k.color(k.WHITE),
            k.layer('modalBox'),
        ]);
        modalBox.radius = 15;

        const modalText = k.add([
            k.pos(k.width() * 0.51, 170),
            k.text(`Level ${playerInfo.choosedLevel+1} completed!`, {
                size: 28,
                font: 'sink',
            }),
            k.origin('center'),
            k.color(k.BLACK),
            k.layer('modalText'),
        ]);

        const back = k.add([
            k.rect(120, 50),
            k.pos(k.width() * 0.5 - 160, k.height() * 0.5 + 105),
            k.layer('modalBtn'),
            k.color(k.BLACK),
            k.area(),
            k.opacity(0.9),
            'btn-back'
        ])
        back.radius = 10;
        const next = k.add([
            k.rect(120, 50),
            k.pos(k.width() * 0.5 + 40, k.height() * 0.5 + 105),
            k.layer('modalBtn'),
            k.color(k.BLACK),
            k.area(),
            k.opacity(0.9),
            'btn-next'
        ])
        next.radius = 10;
        const movementsText = k.add([
            k.pos(k.width() * 0.5, 235),
            k.text(`Movements: ${movements}`, {
                size: 24,
                font: 'sink',
            }),
            k.origin('center'),
            k.color(k.BLACK),
            k.layer('modalText'),
        ]);
        const deathsText = k.add([
            k.pos(k.width() * 0.5, 275),
            k.text(`Deaths: ${deaths}`, {
                size: 24,
                font: 'sink',
            }),
            k.origin('center'),
            k.color(k.BLACK),
            k.layer('modalText'),
        ]);
        let aux = new Date(timeEnd - timeStart);
        const timeText = k.add([
            k.pos(k.width() * 0.5, 315),
            k.text(`Time spent: ${aux.getMinutes()}:${aux.getSeconds().toString().length === 1 ? `0${aux.getSeconds()}` : aux.getSeconds()}:${aux.getMilliseconds()}`, {
                size: 24,
                font: 'sink',
            }),
            k.origin('center'),
            k.color(k.BLACK),
            k.layer('modalText'),
        ]);
        let starsNumber; // arrumar
        if (score == 1) starsNumber = "1stars"
        if (score == 2) starsNumber = "2stars"
        if (score == 3) starsNumber = "3stars"
        const stars = k.add([
            k.sprite(`${starsNumber}`),
            k.pos(k.width() * 0.5, 355),
            k.origin('center'),
            k.layer('modalText'),
            k.scale(1.2),
        ]);
        const backText = k.add([
            k.pos(back.pos.x + 25, back.pos.y + 13),
            k.text('Back', {
                size: 24,
                font: 'sink',
            }),
            k.color(k.CYAN),
            k.area(),
            k.layer('modalText'),
            'text-back'
        ]);
        const nextText = k.add([
            k.pos(next.pos.x + 25, next.pos.y + 13),
            k.text('Next', {
                size: 24,
                font: 'sink',
            }),
            k.color(k.CYAN),
            k.area(),
            k.layer('modalText'),
            'text-next'
        ]);
        k.onUpdate(() => {
            k.every('btn-back', (o) => {
                const aux = o.isHovering();
                o.color = aux ? k.MAGENTA : k.BLACK;
                // o.width = aux ? 130 : 120;
                // o.height = aux ? 53 : 50;

                k.every('text-back', (o) => {
                    o.color = aux ? k.BLACK : k.CYAN;
                });
            });
            k.every('btn-next', (o) => {
                const aux = o.isHovering();
                o.color = aux ? k.MAGENTA : k.BLACK;

                k.every('text-next', (o) => {
                    o.color = aux ? k.BLACK : k.CYAN;
                });
            });
        });
        k.onClick('btn-back', (b) => {
            k.destroy(bg1);
            k.destroy(bg2);
            k.destroy(modalBox);
            k.destroy(modalText);
            k.destroy(stars);
            k.destroy(back);
            k.destroy(next);
            k.destroy(backText);
            k.destroy(nextText);
            k.go('roadmap', playerInfo);
        });
        k.onClick('btn-next', (b) => {
            k.destroy(bg1);
            k.destroy(bg2);
            k.destroy(modalBox);
            k.destroy(modalText);
            k.destroy(stars);
            k.destroy(back);
            k.destroy(next);
            k.destroy(backText);
            k.destroy(nextText);
            goNextLevel();
        });
    }
}