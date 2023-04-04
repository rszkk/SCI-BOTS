import k from '../kaboom.js';

let tutorial1ScreenIndex = 0
export let initialAudioState = true;

export const bgAudio = document.querySelector('#bgAudio')

export function HomeScreen (playerInfo) {
   
    console.log('HomeScreen->', playerInfo)

    const titleText = k.add([
        k.pos(k.width() * 0.5, k.height() * 0.5),
        k.text('SCI-BOTS', {
            size: 48,
            font: 'sink'
        }),
        k.origin('center'),
        'titleText'
    ]);

    const startText = k.add([
        k.pos(k.width() * 0.5, k.height() * 0.65),
        k.text('Start', {
            size: 28,
            font: 'sink',
            color: '(255, 0, 0)'
        }),
        k.origin('center'),
        k.color(k.BLACK),
        k.area(),
        k.z(2),
        'startText'
    ]);

    const startButton = k.add([
        k.rect(130, 50),
        k.pos(startText.pos),
        k.origin('center'),
        k.color(k.WHITE),
        k.z(1),
        k.area(),
        'button',
        'clickable',
    ]);

    k.every('button', (r) => {
        r.radius = 25;
    });

    k.onUpdate(() => {
        k.every('button', (o) => {
            const aux = o.isHovering();
            o.color = aux ? k.MAGENTA : k.WHITE;

            k.every('startText', (o) => {
                o.color = aux ? k.WHITE : k.BLACK;
            });
        });
    });

    k.onClick('clickable', (b) => {
        // colocar um fade out
        k.go('roadmap', playerInfo);
    });

    const configButton = document.querySelector('.btn-action-play-settings')
    configButton.onclick = () => {
        configModal(playerInfo, 'home-screen')
    }
}

export const configModal = (playerInfo, goBackScreen) => {
    const bg1 = k.add([
        k.rect(300, 600),
        k.pos(300, 0),
        k.color(k.BLACK),
        k.opacity(0.35),
        k.z(10),
    ])
    const bg2 = k.add([
        k.rect(300, 600),
        k.pos(0, 0),
        k.color(k.BLACK),
        k.opacity(0.35),
        k.z(10),
    ])
    const modalBox = k.add([
        k.rect(315, 350),
        k.pos(k.width() * 0.5, k.height() * 0.5),
        // k.area(),
        k.origin('center'),
        k.color(k.WHITE),
        k.z(20),
    ]);
    modalBox.radius = 15;
    const modalText = k.add([
        k.pos(k.width() * 0.5, 170),
        k.text(`Settings`, {
            size: 28,
            font: 'sink',
        }),
        k.origin('center'),
        k.color(k.BLACK),
        k.area(),
        k.z(30)
    ]);

    const AudioText = k.add([
        k.pos(k.width() * 0.5, 240),
        k.text(`Audio`, {
            size: 24,
            font: 'sink',
        }),
        k.origin('center'),
        k.color(k.BLACK),
        k.area(),
        k.z(30),
        'option',
        'audio'
    ]);
    const ControlsText = k.add([
        k.pos(k.width() * 0.5, 280),
        k.text(`Controls`, {
            size: 24,
            font: 'sink',
        }),
        k.origin('center'),
        k.color(k.BLACK),
        k.area(),
        k.z(30),
        'option',
        'Controls'
    ]);
    const HelpText = k.add([
        k.pos(k.width() * 0.5, 320),
        k.text(`Tutorial`, {
            size: 24,
            font: 'sink',
        }),
        k.origin('center'),
        k.color(k.BLACK),
        k.area(),
        k.z(30),
        'option',
        'tutorial'
    ]);
    const downloadResults = k.add([
        k.pos(k.width() * 0.5, 360),
        k.text(`Download results`, {
            size: 24,
            font: 'sink',
        }),
        k.origin('center'),
        k.color(k.BLACK),
        k.area(),
        k.z(30),
        'option',
        'download'
    ]);

    const back = k.add([
        k.rect(120, 50),
        k.pos(k.width() * 0.5 - 60, k.height() * 0.5 + 105),
        // k.layer('modalBtn'),
        k.color(k.BLACK),
        k.area(),
        k.opacity(0.9),
        k.z(30),
        'btn-back'
    ])
    back.radius = 10;
    const backText = k.add([
        k.pos(back.pos.x + 16, back.pos.y + 13),
        k.text('Close', {
            size: 24,
            font: 'sink',
        }),
        k.color(k.CYAN),
        k.area(),
        k.z(40),
        'text-back'
    ]);
    k.onUpdate(() => {
        k.every('btn-back', (o) => {
            const aux = o.isHovering();
            o.color = aux ? k.MAGENTA : k.BLACK;

            k.every('text-back', (o) => {
                o.color = aux ? k.BLACK : k.CYAN;
            });
        });
        k.every('option', (o) => {
            const aux = o.isHovering();
            o.color = aux ? k.MAGENTA : k.BLACK;
            o.scale = aux ? 1.05 : 1 ;
        });
        k.every('audio', (a) => {
            a.opacity = bgAudio.paused ? 0.5 : 1;
        })
    })
    k.onClick('audio', (a) => {
        if (bgAudio.paused) {
            bgAudio.loop = true;
            bgAudio.volume = 0.2;
            bgAudio.load();
            bgAudio.play();
        } else {
            bgAudio.pause();
            initialAudioState = false;
        }
    })
    k.onClick('tutorial', () => {
        const a = document.getElementById('youtubeTutorial');
        a.setAttribute("href", "https://youtu.be/HrCd2f0bveo");
        a.click();
    })
    k.onClick('download', () => {
        const dlAnchorElem = document.getElementById('downloadAnchorElem');
        dlAnchorElem.setAttribute("href", "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(playerInfo)));
        dlAnchorElem.setAttribute("download", "results.json");
        dlAnchorElem.click();
    })
    k.onClick('Controls', () => {
        k.go('tutorial1', playerInfo, goBackScreen)
    });
    k.onClick('btn-back', (b) => {
        k.destroy(bg1);
        k.destroy(bg2);
        k.destroy(modalBox);
        k.destroy(modalText);
        k.destroy(back);
        k.destroy(backText);
        k.go(`${goBackScreen}`, playerInfo)
    });
}

export const tutorialModal = (playerInfo, goBackScreen) => {
    const tutorialScreens = ['tutorial1', 'tutorial2']
    const background = k.add([
        k.sprite(`${tutorialScreens[tutorial1ScreenIndex]}`),
        k.z(100)
    ]);
    console.log(background)
    const backButton = k.add([
        k.sprite('navBtnLeft'),
        k.origin('center'),
        k.pos(60, 60),
        k.scale(0.35),
        k.area(),
        k.z(150),
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
    
    const nextButton = k.add([
        k.sprite('navBtnRight'),
        k.origin('center'),
        k.pos(540, 60),
        k.scale(0.35),
        k.area(),
        k.z(150),
        'nextButtonIcon'
    ]);

    k.onUpdate(() => {
        k.every('nextButtonIcon', (o) => {
            o.scale = o.isHovering() ? 0.38 : 0.35;
        });
    });
    k.onClick('nextButtonIcon', (b) => {
        tutorial1ScreenIndex += 1;
        // k.go('home-screen', playerInfo)
    });
}

export default {HomeScreen, configModal, bgAudio, initialAudioState};