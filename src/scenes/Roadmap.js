import k from '../kaboom.js';
import { configModal } from './HomeScreen.js';

k.loadSprite('roadmapBg', 'assets/sprites/roadmap.png');


export function Roadmap (playerInfo) {    
    console.log('roadmap->', playerInfo)
    if (k.audioCtx.state === 'suspended') {
        const bgSong = k.play("bgSong", {
            volume: 0.2,
            loop: true,
        })
    }

    const playButton = document.querySelector('.btn-action-play-play');
    playButton.style.display = 'none';
    const restartButton = document.querySelector('.btn-action-play-restart');
    restartButton.style.display = 'none';

    const background = k.add([
        k.sprite("roadmapBg"),
    ]);

    const roadMapText = k.add([
        k.pos(k.width() * 0.5, k.height() * 0.15),
        k.text('Roadmap', {
            size: 48,
            font: 'sink',
            color: '(255, 255, 255)'
        }),
        k.origin('center'),
        k.color(k.WHITE),
        k.z(4),
    ]);

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
            o.scale = o.isHovering() ? 0.38 : 0.35;
        });
    });
    k.onClick('backBtnIcon', (b) => {
        k.go('home-screen', playerInfo)
    });


    const levelBadge1 = k.add([
        k.rect(60, 60),
        k.pos(110, 170),
        k.color(k.WHITE),
        k.z(1),
        k.area(),
        'levelBadge',
        'hover',
        'radius',
        'goLevel1',
    ]);
    const levelBadgeInner1 = k.add([
        k.rect(52, 52),
        k.pos(levelBadge1.pos.x + 4, levelBadge1.pos.y + 4),
        k.color(k.WHITE),
        k.z(2),
        k.area(),
        'radius',
    ]);
    const levelText1 = k.add([
        k.pos(levelBadge1.pos.x+17, levelBadge1.pos.y+10),
        k.text('1', {
            size: 42,
            font: 'sink',
            color: '(0, 0, 0)'
        }),
        k.color(k.BLACK),
        k.area(),
        k.z(3),
        'startText',
    ]);
    const level1aux = playerInfo.completedLevelsInfo[0][1].timeEnd ? 1 : 0;
    if (playerInfo.completedLevelsInfo && playerInfo.completedLevelsInfo[0][level1aux] && playerInfo.completedLevelsInfo[0][level1aux].score !== 0) {
        let starsNumber = "1stars";
        if (playerInfo.completedLevelsInfo[0][level1aux].score == 1) starsNumber = "1stars"
        if (playerInfo.completedLevelsInfo[0][level1aux].score == 2) starsNumber = "2stars"
        if (playerInfo.completedLevelsInfo[0][level1aux].score == 3) starsNumber = "3stars"
        k.add([
            k.sprite(`${starsNumber}`),
            k.pos(levelBadge1.pos.x - 25, levelBadge1.pos.y + 65),
            k.z(3),
        ]);
    }
    k.onClick('goLevel1', (b) => {
        // playerInfo.completedLevelsInfo[0][level1aux] = {...playerInfo.completedLevelsInfo[0][level1aux], deaths: 0}
        k.go('game', {...playerInfo, choosedLevel: 0});
    });
    

    const levelBadge2 = k.add([
        k.rect(60, 60),
        k.pos(270, 170),
        k.color(k.WHITE),
        k.z(1),
        k.area(),
        'levelBadge',
        'hover',
        'radius',
        'goLevel2'
    ]);
    const levelBadgeInner2 = k.add([
        k.rect(52, 52),
        k.pos(levelBadge2.pos.x + 4, levelBadge2.pos.y + 4),
        k.color(k.WHITE),
        k.z(2),
        k.area(),
        'radius',
    ]);
    const levelText2 = k.add([
        k.pos(levelBadge2.pos.x+17, levelBadge2.pos.y+10),
        k.text('2', {
            size: 42,
            font: 'sink',
            color: '(0, 0, 0)'
        }),
        k.color(k.BLACK),
        k.area(),
        k.z(3),
        'startText'
    ]);
    const level2aux = playerInfo.completedLevelsInfo[1][1].timeEnd ? 1 : 0;
    if (playerInfo.completedLevelsInfo && playerInfo.completedLevelsInfo[1][level2aux] && playerInfo.completedLevelsInfo[1][level2aux].score !== 0) {
        let starsNumber = "1stars";
        if (playerInfo.completedLevelsInfo[1][level2aux].score == 1) starsNumber = "1stars"
        if (playerInfo.completedLevelsInfo[1][level2aux].score == 2) starsNumber = "2stars"
        if (playerInfo.completedLevelsInfo[1][level2aux].score == 3) starsNumber = "3stars"
        k.add([
            k.sprite(`${starsNumber}`),
            k.pos(levelBadge2.pos.x - 25, levelBadge2.pos.y + 65),
            k.z(3),
        ]);
        k.onClick('goLevel2', (b) => {
            // playerInfo.completedLevelsInfo[1][level2aux] = {...playerInfo.completedLevelsInfo[1][level2aux], deaths: 0}
            k.go('game', {...playerInfo, choosedLevel: 1});
        });
    }
    if (!(playerInfo.completedLevelsInfo && playerInfo.completedLevelsInfo[0][0] && playerInfo.completedLevelsInfo[0][0].score !== 0)) {
        const levelBadge2Bg = k.add([
            k.rect(60, 60),
            k.pos(270, 170),
            k.color(k.BLACK),
            k.z(4),
            k.opacity(0.7),
            k.area(),
            'levelBadge',
            'hover',
            'radius',
            'goLevel2'
        ]);
    } else {
        k.onClick('goLevel2', (b) => {
            // playerInfo.completedLevelsInfo[1][level2aux] = {...playerInfo.completedLevelsInfo[1][level2aux], deaths: 0}
            k.go('game', {...playerInfo, choosedLevel: 1});
        });
    }

    const levelBadge3 = k.add([
        k.rect(60, 60),
        k.pos(430, 170),
        k.color(k.WHITE),
        k.z(1),
        k.area(),
        'levelBadge',
        'hover',
        'radius',
        'goLevel3'
    ]);
    const levelBadgeInner3 = k.add([
        k.rect(52, 52),
        k.pos(levelBadge3.pos.x + 4, levelBadge3.pos.y + 4),
        k.color(k.WHITE),
        k.z(2),
        k.area(),
        'radius',
    ]);
    const levelText3 = k.add([
        k.pos(levelBadge3.pos.x+17, levelBadge3.pos.y+10),
        k.text('3', {
            size: 42,
            font: 'sink',
            color: '(0, 0, 0)'
        }),
        k.color(k.BLACK),
        k.area(),
        k.z(3),
        'startText'
    ]);
    const level3aux = playerInfo.completedLevelsInfo[2][1].timeEnd ? 1 : 0;
    if (playerInfo.completedLevelsInfo && playerInfo.completedLevelsInfo[2][level3aux] && playerInfo.completedLevelsInfo[2][level3aux].score !== 0) {
        let starsNumber = "1stars";
        if (playerInfo.completedLevelsInfo[2][level3aux].score == 1) starsNumber = "1stars"
        if (playerInfo.completedLevelsInfo[2][level3aux].score == 2) starsNumber = "2stars"
        if (playerInfo.completedLevelsInfo[2][level3aux].score == 3) starsNumber = "3stars"
        k.add([
            k.sprite(`${starsNumber}`),
            k.pos(levelBadge3.pos.x - 25, levelBadge3.pos.y + 65),
            k.z(3),
        ]);
        k.onClick('goLevel3', (b) => {
            // playerInfo.completedLevelsInfo[2][level3aux] = {...playerInfo.completedLevelsInfo[2], deaths: 0}
            k.go('game', {...playerInfo, choosedLevel: 2});
        });
    } 
    if (!(playerInfo.completedLevelsInfo && playerInfo.completedLevelsInfo[1][0] && playerInfo.completedLevelsInfo[1][0].score !== 0)) {
        const levelBadge3Bg = k.add([
            k.rect(60, 60),
            k.pos(430, 170),
            k.color(k.BLACK),
            k.z(4),
            k.opacity(0.7),
            k.area(),
            'levelBadge',
            'hover',
            'radius',
            'goLevel3'
        ]);
    } else {
        k.onClick('goLevel3', (b) => {
            // playerInfo.completedLevelsInfo[2][level3aux] = {...playerInfo.completedLevelsInfo[2][level3aux], deaths: 0}
            k.go('game', {...playerInfo, choosedLevel: 2});
        });
    }


    const levelBadge4 = k.add([
        k.rect(60, 60),
        k.pos(360, 295),
        k.color(k.WHITE),
        k.z(1),
        k.area(),
        'levelBadge',
        'hover',
        'radius',
        'goLevel4'
    ]);
    const levelBadgeInner4 = k.add([
        k.rect(52, 52),
        k.pos(levelBadge4.pos.x + 4, levelBadge4.pos.y + 4),
        k.color(k.WHITE),
        k.z(2),
        k.area(),
        'radius',
    ]);
    const levelText4 = k.add([
        k.pos(levelBadge4.pos.x+17, levelBadge4.pos.y+10),
        k.text('4', {
            size: 42,
            font: 'sink',
            color: '(0, 0, 0)'
        }),
        k.color(k.BLACK),
        k.area(),
        k.z(3),
        'startText'
    ]);
    const level4aux = playerInfo.completedLevelsInfo[3][1].timeEnd ? 1 : 0;
    if (playerInfo.completedLevelsInfo && playerInfo.completedLevelsInfo[3][level4aux] && playerInfo.completedLevelsInfo[3][level4aux].score !== 0) {
        let starsNumber = "1stars";
        if (playerInfo.completedLevelsInfo[3][level4aux].score == 1) starsNumber = "1stars"
        if (playerInfo.completedLevelsInfo[3][level4aux].score == 2) starsNumber = "2stars"
        if (playerInfo.completedLevelsInfo[3][level4aux].score == 3) starsNumber = "3stars"
        k.add([
            k.sprite(`${starsNumber}`),
            k.pos(levelBadge4.pos.x - 25, levelBadge4.pos.y + 65),
            k.z(3),
        ]);
        k.onClick('goLevel4', (b) => {
            // playerInfo.completedLevelsInfo[3] = {...playerInfo.completedLevelsInfo[3], deaths: 0}
            k.go('game', {...playerInfo, choosedLevel: 3});
        });
    } 
    if (!(playerInfo.completedLevelsInfo && playerInfo.completedLevelsInfo[2][0] && playerInfo.completedLevelsInfo[2][0].score !== 0))     {
        const levelBadge4Bg = k.add([
            k.rect(60, 60),
            k.pos(360, 295),
            k.color(k.BLACK),
            k.z(4),
            k.opacity(0.7),
            k.area(),
            'levelBadge',
            'hover',
            'radius',
            'goLevel4'
        ]);
    } else {
        k.onClick('goLevel4', (b) => {
            // playerInfo.completedLevelsInfo[3] = {...playerInfo.completedLevelsInfo[3], deaths: 0}
            k.go('game', {...playerInfo, choosedLevel: 3});
        });
    }
    
    const levelBadge5 = k.add([
        k.rect(60, 60),
        k.pos(190, 295),
        k.color(k.WHITE),
        k.z(1),
        k.area(),
        'levelBadge',
        'hover',
        'radius',
        'goLevel5'
    ]);
    const levelBadgeInner5 = k.add([
        k.rect(52, 52),
        k.pos(levelBadge2.pos.x + 4, levelBadge2.pos.y + 4),
        k.color(k.WHITE),
        k.z(2),
        k.area(),
        'radius',
    ]);
    const levelText5 = k.add([
        k.pos(levelBadge5.pos.x+17, levelBadge5.pos.y+10),
        k.text('5', {
            size: 42,
            font: 'sink',
            color: '(0, 0, 0)'
        }),
        k.color(k.BLACK),
        k.area(),
        k.z(3),
        'startText'
    ]);
    const level5aux = playerInfo.completedLevelsInfo[4][1].timeEnd ? 1 : 0;
    if (playerInfo.completedLevelsInfo && playerInfo.completedLevelsInfo[4][level5aux] && playerInfo.completedLevelsInfo[4][level5aux].score !== 0) {
        let starsNumber = "1stars";
        if (playerInfo.completedLevelsInfo[4][level5aux].score == 1) starsNumber = "1stars"
        if (playerInfo.completedLevelsInfo[4][level5aux].score == 2) starsNumber = "2stars"
        if (playerInfo.completedLevelsInfo[4][level5aux].score == 3) starsNumber = "3stars"
        k.add([
            k.sprite(`${starsNumber}`),
            k.pos(levelBadge5.pos.x - 25, levelBadge5.pos.y + 65),
            k.z(3),
        ]);
        k.onClick('goLevel5', (b) => {
            // playerInfo.completedLevelsInfo[4] = {...playerInfo.completedLevelsInfo[4], deaths: 0}
            k.go('game', {...playerInfo, choosedLevel: 4});
        });
    }
    if (!(playerInfo.completedLevelsInfo && playerInfo.completedLevelsInfo[3][0] && playerInfo.completedLevelsInfo[3][0].score !== 0)) {
        const levelBadge5Bg = k.add([
            k.rect(60, 60),
            k.pos(190, 295),
            k.color(k.BLACK),
            k.z(4),
            k.opacity(0.7),
            k.area(),
            'levelBadge',
            'hover',
            'radius',
            'goLevel5'
        ]);
    } else {
        k.onClick('goLevel5', (b) => {
            // playerInfo.completedLevelsInfo[4] = {...playerInfo.completedLevelsInfo[4], deaths: 0}
            k.go('game', {...playerInfo, choosedLevel: 4});
        });
    }

    // const levelBadge6 = k.add([
    //     k.rect(60, 60),
    //     k.pos(110, 425),
    //     k.color(k.WHITE),
    //     k.z(1),
    //     k.area(),
    //     'levelBadge',
    //     'hover',
    //     'radius',
    //     'goLevel6'
    // ]);
    // const levelBadgeInner6 = k.add([
    //     k.rect(52, 52),
    //     k.pos(levelBadge6.pos.x + 4, levelBadge6.pos.y + 4),
    //     k.color(k.WHITE),
    //     k.z(2),
    //     k.area(),
    //     'radius',
    // ]);
    // const levelText6 = k.add([
    //     k.pos(levelBadge6.pos.x+17, levelBadge6.pos.y+10),
    //     k.text('6', {
    //         size: 42,
    //         font: 'sink',
    //         color: '(0, 0, 0)'
    //     }),
    //     k.color(k.BLACK),
    //     k.area(),
    //     k.z(3),
    //     'startText'
    // ]);
    // if (playerInfo.completedLevelsInfo && playerInfo.completedLevelsInfo[5] && playerInfo.completedLevelsInfo[5].score !== 0) {
    //     let starsNumber = "1stars";
    //     if (playerInfo.completedLevelsInfo[5].score == 1) starsNumber = "1stars"
    //     if (playerInfo.completedLevelsInfo[5].score == 2) starsNumber = "2stars"
    //     if (playerInfo.completedLevelsInfo[5].score == 3) starsNumber = "3stars"
    //     console.log(playerInfo.completedLevelsInfo[5].score)
    //     k.add([
    //         k.sprite(`${starsNumber}`),
    //         k.pos(levelBadge6.pos.x - 25, levelBadge6.pos.y + 65),
    //         k.z(3),
    //     ]);
    //     k.onClick('goLevel6', (b) => {
    //         playerInfo.completedLevelsInfo[5] = {...playerInfo.completedLevelsInfo[5], deaths: 0}
    //         k.go('game', {...playerInfo, choosedLevel: 5});
    //     });
    // } 
    // if (!(playerInfo.completedLevelsInfo && playerInfo.completedLevelsInfo[4] && playerInfo.completedLevelsInfo[4].score !== 0)) {
    //     const levelBadge3Bg = k.add([
    //         k.rect(60, 60),
    //         k.pos(110, 425),
    //         k.color(k.BLACK),
    //         k.z(4),
    //         k.opacity(0.7),
    //         k.area(),
    //         'levelBadge',
    //         'hover',
    //         'radius',
    //         'goLevel6'
    //     ]);
    // } else {
    //     k.onClick('goLevel6', (b) => {
    //         playerInfo.completedLevelsInfo[5] = {...playerInfo.completedLevelsInfo[5], deaths: 0}
    //         k.go('game', {...playerInfo, choosedLevel: 5});
    //     });
    // }

    k.every('radius', (r) => {
        r.radius = 5;
    });

    k.onUpdate(() => {
        k.every('levelBadge', (o) => {
            const aux = o.isHovering();
            o.color = aux ? k.MAGENTA : k.WHITE;

            // k.every('startText', (o) => {
            //     o.color = aux ? k.WHITE : k.BLACK;
            // });
        });
    });

    const configButton = document.querySelector('.btn-action-play-settings')
    configButton.onclick = () => {
        configModal(playerInfo, 'roadmap')
    }
}

export default {Roadmap}