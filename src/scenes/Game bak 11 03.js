import k from '../kaboom.js';
import { actionList, function1Actions, function2Actions } from './../layout.js'


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
    // console.log('---__--->', playerInfo.choosedLevel)
    // k.layers(['bg', 'obj', 'ui', 'modalBg', 'modalBox', 'modalBtn', 'modalText'], 'obj');
    const layers = ['bg', 'obj', 'ui', 'modalBg', 'modalBox', 'modalBtn', 'modalText'];
    console.log(layers.indexOf('obj'))
    k.setGravity(0)
    const maps = [
        [
            'a  aaaa aa',
            '      a   ',
            'a        a',
            'a        a',
            'a        a',
            'a        a',
            '   a     a',
            'a  aaaa   ',
            '          ',
            'aaaaaaaaaa',
        ],
        [
            'a  aaaa aa',
            '          ',
            'a        a',
            'a        a',
            'a        a',
            'a        a',
            '         a',
            'a  aaaa   ',
            '          ',
            'aaaaaaaaaa',
        ],
        [
            'aa aaaaaaa',
            'a    aa  a',
            'a    a   a',
            '     a   a',
            'a        a',
            'ejjg aaa a',
            'a      a  ',
            '       a  ',
            ' a  aa a  ',
            'aaaaaaaaaa',
        ],
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
        ]
    ];

    const levelCfg = {
        tileWidth: 60,
        tileHeight: 60,
        tiles: {
            'a': () => [k.sprite('wall-steel', {frame: 0}), 'wall-steel1', k.body({ isStatic: true }), 'wall1', k.area(), k.scale(3.75)],
            'b': () => [k.sprite('wall-steel', {frame: 1}), 'wall-steel2', k.body({ isStatic: true }), 'wall2', k.area(), k.scale(3.75)],
            'c': () => [k.sprite('wall-steel', {frame: 2}), 'wall-steel3', k.body({ isStatic: true }), 'wall3', k.area(), k.scale(3.75)],
            'd': () => [k.sprite('wall-steel', {frame: 3}), 'wall-steel4', k.body({ isStatic: true }), 'wall4', k.area(), k.scale(3.75)],
            'e': () => [k.sprite('laser-headers', {frame: 0}), 'laser-headers1', k.body({ isStatic: true }), 'laser-headers1', k.area(), k.scale(3.75)],
            'f': () => [k.sprite('laser-headers', {frame: 1}), 'laser-headers2', k.body({ isStatic: true }), 'laser-headers2', k.area(), k.scale(3.75)],
            'g': () => [k.sprite('laser-headers', {frame: 2}), 'laser-headers3', k.body({ isStatic: true }), 'laser-headers3', k.area(), k.scale(3.75)],
            'h': () => [k.sprite('laser-headers', {frame: 3}), 'laser-headers4', k.body({ isStatic: true }), 'laser-headers4', k.area(), k.scale(3.75)],
            'i': () => [k.sprite('laser-headers', {frame: 4}), 'laser-headers5', k.body({ isStatic: true }), 'laser-headers5', k.area(), k.scale(3.75)],
            'j': () => [k.sprite('laser-horizontal', {frame: 0}), 'dangerous', k.body({ isStatic: true }), 'laser', k.area(),  k.scale(3.75)],
            'k': () => [k.sprite('laser-vertical', {frame: 0}), 'dangerous', k.body({ isStatic: true }), 'laser', k.area(),  k.scale(3.75)],
        }
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
    const gameLevel = k.addLevel(maps[0], levelCfg);  //playerInfo.choosedLevel

    // const background = k.add([
    //     k.sprite("map-bg"),
    //     k.layer('bg'),
    // ]);

    function deg(dir) {
        if (dir === 'faceLeft') return 270;
        if (dir === 'faceRight') return 90;
        if (dir === 'faceUp') return 180;
        if (dir === 'faceDown') return 0;
    };
    
    let playerSpeed = 200;
    let speedMutiplier = 2.5;
    const player = k.add([
        k.sprite('robot', {
            animeSpeed: 0.1,
            frame: 0
        }),
        k.anchor('center'),
        // k.pos(480 + 30, 240 + 30),
        // k.rotate(deg('faceLeft')),
        // k.pos(300 + 30, 360 + 30),
        // k.rotate(deg('faceDown')),
        k.pos(240 + 30, 60 + 30),
        k.rotate(deg('faceUp')),
        // k.pos(60 + 30, 300 + 30),
        // k.rotate(deg('faceRight')),
        k.scale(3.75),
        k.area(),
        k.body({ isStatic: true }),
        k.body(),
        // k.layer('obj'),
        "player"
    ])

    // const enemy = k.add([
    //     k.sprite('fly-food'),
    //     k.anchor('center'),
    //     k.pos(360 + 30, 480 + 30), // teste right 1
    //     // k.pos(60 + 30, 60 + 30), // teste left 1
    //     // k.pos(240 + 30, 60 + 30), // teste left 2
    //     // k.pos(60 + 30, 60 + 30), // teste left 3
    //     k.scale(2.8),
    //     k.area(),
    //     k.body({ isStatic: true }),
    //     k.body(),
    //     k.layer('obj'),
    //     "food"
    // ])

    k.loop((0.2), () => {
        if (player.pos.x >= mapBoundaries.x || player.pos.x <= 0
            || player.pos.y >= mapBoundaries.y || player.pos.y <= 0){
                console.log('SAIU DO MAPA')
            }
    })

    function rotate (dir) {
        player.angle = deg(dir);
    }

    function moveUp () {
        player.move(0, -playerSpeed);
        player.dir = k.vec2(0, -1);
    }

    function moveDown () {
        player.move(0, playerSpeed);
        player.dir = k.vec2(0, 1);
    }

    function moveRight () {
        player.move(playerSpeed, 0);
        player.dir = k.vec2(1, 0);
    }

    function moveLeft () {
        player.move(-playerSpeed, 0);
        player.dir = k.vec2(-1, 0);
    }

    const roundToNearest60 = x => 
        Math.round(x/60)*60

    let didHitWall = false;

    function floorTest (x, y, angle, orientation) {
        let xValue = x/60;
        let yValue = y/60;
        if (angle === 0) {
            if (orientation === 'right') xValue -= 1;
        }
        if (angle === 270) {
            if (orientation === 'left') yValue -= 1;
        }
        if (angle === 180) {
            if (orientation === 'left') xValue -= 1;
            yValue -=2;
        }
        if (angle === 90) {
            xValue -= 2;
            if (orientation === 'right') yValue -= 1;
        }
        // console.log(x, y)
        // console.log(xValue, yValue)
        // console.log(maps[0][yValue]?.split('').toString())
        // console.log('->', maps[0][yValue]?.split('')[xValue]);
        // console.log('-----------------------------------')
        // if (maps[0][yValue]?.split('')[xValue] === 'a') {
        //     k.setGravity(1000)
        //     rotate('faceUp')
        // }
        return maps[0][yValue]?.split('')[xValue] !== 'a';
    }
    // rotate('faceUp')
    // floorTest(8*60, 1*60, 180);
    async function playerDie () {
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                k.setGravity(1000)
                rotate('faceUp')
                resolve()
            }, 100)
        })
    }
    // k.onUpdate(() => console.log(player.pos.x))
    playerSpeed = 200;
    function goRight () {
        return new Promise((resolve, reject) => {
            if (player.angle === 0) {
                // console.log('r1')
                const timer = setInterval(() => {
                    const end = floorTest(roundToNearest60(player.pos.x), player.pos.y+30, 0, 'right');
                    if (end) {
                        clearInterval(timer);
                        player.moveTo(roundToNearest60(player.pos.x) - 30, player.pos.y)
                        playerDie()
                        resolve()
                    };
                    if (didHitWall) {
                        clearInterval(timer);
                        // checkPlayerFacingPos('right');
                        resolve();
                    } 
                    moveRight();
                }, 7)
            } else if (player.angle === 270) {
                // console.log('r2')
                const timer = setInterval(() => {
                    const end = floorTest(player.pos.x+30, roundToNearest60(player.pos.y-1), 270, 'right');
                    if (end) {
                        clearInterval(timer);
                        player.moveTo(player.pos.x, roundToNearest60(player.pos.y)-30)
                        playerDie()
                        resolve()
                    }
                    if (didHitWall) {
                        clearInterval(timer);
                        // checkPlayerFacingPos('right');
                        resolve();
                    }
                    moveUp();
                }, 7)
            } else if (player.angle === 90) {
                console.log('r3')
                const timer = setInterval(() => {
                    const end = floorTest(player.pos.x+30, roundToNearest60(player.pos.y-1), 90, 'right')
                    if (end) {
                        clearInterval(timer);
                        player.moveTo(player.pos.x, roundToNearest60(player.pos.y)-30)
                        playerDie()
                        resolve()
                    }
                    if (didHitWall) {
                        clearInterval(timer);
                        // checkPlayerFacingPos('right');
                        resolve();
                    } 
                    moveDown();
                }, 7)
            } else if (player.angle === 180) {
                // console.log('r4')
                const timer = setInterval(() => {
                    const end = floorTest(roundToNearest60(player.pos.x-1), player.pos.y+30, 180, 'right')
                    if (end) {
                        playerDie()
                        clearInterval(timer);
                        resolve();
                    }
                    if (didHitWall) {
                        clearInterval(timer);
                        // checkPlayerFacingPos('right');
                        resolve();
                    }
                    moveLeft()
                }, 7)
            }
        });
    }
    
    function goLeft () {
        return new Promise((resolve, reject) => {
            if (player.angle === 0) {
                console.log('l1')
                const timer = setInterval(() => {
                    const end = floorTest(roundToNearest60(player.pos.x), player.pos.y+30, 0, 'left');
                    if (end) {
                        clearInterval(timer);
                        // player.moveTo(roundToNearest60(player.pos.x) - 30, player.pos.y)
                        playerDie()
                        resolve()
                    };
                    if (didHitWall) {
                        clearInterval(timer);
                        // checkPlayerFacingPos('left');
                        resolve();
                    } 
                    moveLeft()
                }, 7)
            } else if (player.angle === 270) {
                console.log('l2')
                const timer = setInterval(() => {
                    const end = floorTest(player.pos.x+30, roundToNearest60(player.pos.y-1), 270, 'left');
                    if (end) {
                        clearInterval(timer);
                        // player.moveTo(player.pos.x, roundToNearest60(player.pos.y)-30)
                        playerDie()
                        resolve()
                    }
                    if (didHitWall) {
                        clearInterval(timer);
                        // checkPlayerFacingPos('left');
                        resolve();
                    }
                    moveDown()
                }, 7)
            } else if (player.angle === 90) {
                console.log('l3')
                const timer = setInterval(() => {
                    const end = floorTest(player.pos.x+30, roundToNearest60(player.pos.y-1), 90, 'left')
                    if (end) {
                        clearInterval(timer);
                        // player.moveTo(player.pos.x, roundToNearest60(player.pos.y)-30)
                        playerDie()
                        resolve()
                    }
                    if (didHitWall) {
                        clearInterval(timer);
                        // checkPlayerFacingPos('left');
                        resolve();
                    } 
                    moveUp();
                }, 7)
            } else if (player.angle === 180) {
                console.log('l4')
                const timer = setInterval(() => {
                    const end = floorTest(roundToNearest60(player.pos.x), player.pos.y+30, 180, 'left')
                    if (end) {
                        playerDie()
                        clearInterval(timer);
                        resolve();
                    }
                    if (didHitWall) {
                        clearInterval(timer);
                        // checkPlayerFacingPos('right');
                        resolve();
                    }
                    moveRight()
                }, 7)
            } 
        });
    }

    function jump () {
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
                    } else moveDown()
                }, 7)
            }
            if (didHitWall) {
                didHitWall = false;
                resolve()
            }
        })       
    }
    
    // function turnRight () {
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

    function checkPlayerFacingPos (orientation) {
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

    async function checkEmptyFloor () {
        let auxRectY;
        let noCollision = true;

        if (player.angle == 0) {
            // console.log('c1')
            auxRectY = k.add([
                k.pos((player.pos.x), (player.pos.y + 45)),
                k.rect(1, 30),
                k.area(),
                k.color(255, 255, 255),
                // k.opacity(0),
                'auxRectY'
            ])

            k.onCollide("wall1", "auxRectY", () => {
                // k.destroy(auxRectY)
                noCollision = false
            })
    
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve();
                }, 20)
            })
            
            if (noCollision) {
                // k.destroy(auxRectY)
                k.setGravity(1000)
                rotate('faceUp')
                return true;
            }  
            return false;
        } else if (player.angle == 90) {
            // console.log('c2')
            auxRectY = k.add([
                k.pos((player.pos.x - 60), (player.pos.y - 15)),
                k.rect(1, 30),
                k.area(),
                k.color(255, 255, 255),
                // k.opacity(0),
                'auxRectY'
            ])

            k.onCollide("wall1", "auxRectY", () => {
                // k.destroy(auxRectY)
                noCollision = false
            })
    
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve();
                }, 20)
            })
            
            if (noCollision) {
                // k.destroy(auxRectY)
                k.setGravity(1000)
                rotate('faceUp')
                return true;
            }  
            return false;
        } else if (player.angle == 180) {
            // console.log('c3');
            auxRectY = k.add([
                k.pos((player.pos.x), (player.pos.y - 75)),
                k.rect(1, 30),
                k.area(),
                k.color(255, 255, 255),
                // k.opacity(0),
                'auxRectY'
            ])

            k.onCollide("wall1", "auxRectY", () => {
                // k.destroy(auxRectY)
                noCollision = false
            })
    
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve();
                }, 20)
            })
            
            if (noCollision) {
                // k.destroy(auxRectY);
                k.setGravity(1000)
                rotate('faceUp')
                return true;
            }  
            return false;
        }else if (player.angle == 270) {
            // console.log('c4')
            auxRectY = k.add([
                k.pos((player.pos.x + 60), (player.pos.y - 15)),
                k.rect(1, 30),
                k.area(),
                k.color(255, 255, 255),
                // k.opacity(0),
                'auxRectY'
            ])

            k.onCollide("wall1", "auxRectY", () => {
                // k.destroy(auxRectY)
                noCollision = false
            })
    
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve();
                }, 20)
            })
            
            if (noCollision) {
                // k.destroy(auxRectY)
                k.setGravity(1000)
                rotate('faceUp')
                return true;
            }     
            return false;
        }

          
    }

    // test right
    // const actionList1 = [
    //     "jump",
    //     "left",
    //     "left",
    //     "jump",
    //     "right",
    //     "right",
    //     "right",
    //     "jump",
    //     "right",
    //     "right",
    //     "right",
    //     "jump",
    //     "left",
    //     "jump",
    //     "right",
    //     "right",
    // ]

    // test left
    // const actionList1 = [
    //     "left",
    //     "jump",
    //     "right",
    //     // "right",
    //     // "left",
    //     // "right",
    //     // "right",
    //     // "right",
    //     // "right",
    //     // "right",
    //     // "right",
    //     // "right",
    //     // "right",
    //     // "right",
    // ]

    // const actionList = [
    //     "left",
    //     "left",
    //     "left",
    //     "left",
    //     "left",
    //     "left",
    //     "left",
    //     "left",
    //     // "right",
    //     // "right",
    //     // "left",
    //     // "left",
    //     // "left",
    //     // "left",
    //     // "left",
    // ]


    async function executeMovements (actionList) {
        let aux = 0;
        let teste = false;
        for await (const action of actionList) {
            // console.log(`--iniciais-->\nx:${player.pos.x+30}, y:${player.pos.y+30}`)
            if (action === 'right') await goRight();
            if (action === 'left') await goLeft();
            if (action === 'jump') {
                didHitWall = false;
                await jump();
                didHitWall = false;
            } 
            // else {
            //     shouldStop = await checkEmptyFloor();
            //     if (shouldStop) break;
            // }
            // console.log(`--finais-->\nx:${player.pos.x}, y:${player.pos.y}`)
        }
    }

    // player.onUpdate(() => {
    //     player.pushOutAll()
    // })
    
    k.onKeyDown('up', () => moveUp())
    k.onKeyDown('right', () => moveRight())
    k.onKeyDown('down', () => moveDown())
    k.onKeyDown('left', () => moveLeft())

    // k.onCollide('player', 'food', (p, f) => {
    //     console.log('comeu')
    //     k.destroy(f)
    //     // tocar som q comeu
    //     levelSuccessModal()
    // })

    // k.onCollide('player', 'laser', (p, f) => {
    //     console.log('bateu laser')
    //     // tocar som morte
    //     // 
    // })

    //* ACTION BUTTONS *//
    const playButton = document.querySelector('.btn-action-play-play');
    playButton.addEventListener('click', () => {
        console.log('start game')
        let finalList = []
        Object.values(actionList).forEach((value) => {
            if (value == 'f2') finalList.push(...Object.values(function2Actions).filter((item) => item))
            else if (value == 'f1') finalList.push(...Object.values(function1Actions).filter((item) => item))
            else if (value) finalList.push(value)
        })
        console.log(finalList)
        setTimeout(() => executeMovements(finalList), 500);
    })


    function levelSuccessModal () {
        k.add([
            k.rect(300, 600),
            k.pos(300, 0),
            k.color(k.BLACK),
            k.opacity(0.35),
            k.z('modalBg'),
        ])
        k.add([
            k.rect(300, 600),
            k.pos(0, 0),
            k.color(k.BLACK),
            k.opacity(0.35),
            k.z('modalBg'),
        ])

        const modalBox = k.add([
            k.rect(400, 250),
            k.pos(k.width() * 0.5, k.height() * 0.5),
            k.area(),
            k.anchor('center'),
            k.color(k.WHITE),
            // k.layer('modalBox'),
        ]);
        modalBox.radius = 15;

        k.add([
            k.pos(k.width() * 0.5, 215),
            k.text(`Level ${playerInfo.choosedLevel}`, {
                size: 32,
                font: 'sink',
            }),
            k.anchor('center'),
            k.color(k.BLACK),
            // k.layer('modalText'),
        ]);

        let starsNumber; // arrumar
        if (playerInfo.completedLevelsInfo[0].score == 1) starsNumber = "1stars"
        if (playerInfo.completedLevelsInfo[0].score == 2) starsNumber = "2stars"
        if (playerInfo.completedLevelsInfo[0].score == 3) starsNumber = "3stars"
        k.add([
            k.sprite('1stars'),
            k.pos(k.width() * 0.5, k.height() * 0.5 - 10),
            k.anchor('center'),
            // k.layer('modalText'),
            k.scale(1.2),
        ]);

        const back = k.add([
            k.rect(120, 50),
            k.pos(k.width() * 0.5 - 160, k.height() * 0.5 + 55),
            // k.layer('modalBtn'),
            k.color(k.BLACK),
            k.area(),
            k.opacity(0.9),
            'btn-back'
        ])
        back.radius = 10;
        const next = k.add([
            k.rect(120, 50),
            k.pos(k.width() * 0.5 + 40, k.height() * 0.5 + 55),
            // k.layer('modalBtn'),
            k.color(k.BLACK),
            k.area(),
            k.opacity(0.9),
            'btn-next'
        ])
        next.radius = 10;
        k.add([
            k.pos(back.pos.x + 25, back.pos.y + 13),
            k.text('Back', {
                size: 24,
                font: 'sink',
            }),
            k.color(k.CYAN),
            // k.layer('modalText'),
        ]);
        k.add([
            k.pos(next.pos.x + 25, next.pos.y + 13),
            k.text('Next', {
                size: 24,
                font: 'sink',
            }),
            k.color(k.CYAN),
            // k.layer('modalText'),
        ]);
        k.onUpdate(() => {
            k.every('btn-back', (o) => {
                o.color = o.isHovering() ? k.MAGENTA : k.BLACK;
            });
            k.every('btn-next', (o) => {
                o.color = o.isHovering() ? k.MAGENTA : k.BLACK;
            });
        });
        k.onClick('btn-back', (b) => {
            k.go('roadmap');
        });
        k.onClick('btn-next', (b) => {
            console.log({...playerInfo, choosedLevel: playerInfo.choosedLevel+1})
            // fix
            // k.go('game', {...playerInfo, choosedLevel: playerInfo.choosedLevel+1});
        });
    }
}