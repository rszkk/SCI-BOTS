import k from '../kaboom.js';


export function Tutorial1 (playerInfo, backPage) {    
    console.log('roadmap->', playerInfo)
    console.log("backPage", backPage)
    const background = k.add([
        k.sprite('tutorial1')
    ]);

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
        k.go(`${backPage}`, playerInfo)
    });
    
    const nextButton = k.add([
        k.sprite('navBtnRight'),
        k.origin('center'),
        k.pos(540, 60),
        k.scale(0.35),
        k.area(),
        'nextButtonIcon'
    ]);

    k.onUpdate(() => {
        k.every('nextButtonIcon', (o) => {
            o.scale = o.isHovering() ? 0.38 : 0.35;
        });
    });
    k.onClick('nextButtonIcon', (b) => {
        k.go('tutorial2', playerInfo, backPage)
    });
}

export function Tutorial2 (playerInfo, backPage) {    
    const background = k.add([
        k.sprite('tutorial2')
    ]);

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
        k.go('tutorial1', playerInfo, backPage)
    });
    
    const nextButton = k.add([
        k.sprite('navBtnRight'),
        k.origin('center'),
        k.pos(540, 60),
        k.scale(0.35),
        k.area(),
        'nextButtonIcon'
    ]);

    k.onUpdate(() => {
        k.every('nextButtonIcon', (o) => {
            o.scale = o.isHovering() ? 0.38 : 0.35;
        });
    });
    k.onClick('nextButtonIcon', (b) => {
        k.go('tutorial3', playerInfo, backPage)
    });
}

export function Tutorial3 (playerInfo, backPage) {    
    const background = k.add([
        k.sprite('tutorial3')
    ]);

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
        k.go('tutorial2', playerInfo, backPage)
    });
    
    const nextButton = k.add([
        k.sprite('navBtnRight'),
        k.origin('center'),
        k.pos(540, 60),
        k.scale(0.35),
        k.area(),
        'nextButtonIcon'
    ]);

    k.onUpdate(() => {
        k.every('nextButtonIcon', (o) => {
            o.scale = o.isHovering() ? 0.38 : 0.35;
        });
    });
    k.onClick('nextButtonIcon', (b) => {
        k.go('tutorial4', playerInfo, backPage)
    });
}

export function Tutorial4 (playerInfo, backPage) {    
    const background = k.add([
        k.sprite('tutorial4')
    ]);

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
        k.go('tutorial3', playerInfo, backPage)
    });
    
    const nextButton = k.add([
        k.sprite('navBtnRight'),
        k.origin('center'),
        k.pos(540, 60),
        k.scale(0.35),
        k.area(),
        'nextButtonIcon'
    ]);

    k.onUpdate(() => {
        k.every('nextButtonIcon', (o) => {
            o.scale = o.isHovering() ? 0.38 : 0.35;
        });
    });
    k.onClick('nextButtonIcon', (b) => {
        k.go('tutorial5', playerInfo, backPage)
    });
}

export function Tutorial5 (playerInfo, backPage) {    
    const background = k.add([
        k.sprite('tutorial5')
    ]);

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
        k.go('tutorial4', playerInfo, backPage)
    });
    
    const nextButton = k.add([
        k.sprite('navBtnRight'),
        k.origin('center'),
        k.pos(540, 60),
        k.scale(0.35),
        k.area(),
        'nextButtonIcon'
    ]);

    k.onUpdate(() => {
        k.every('nextButtonIcon', (o) => {
            o.scale = o.isHovering() ? 0.38 : 0.35;
        });
    });
    k.onClick('nextButtonIcon', (b) => {
        k.go('tutorial6', playerInfo, backPage)
    });
}

export function Tutorial6 (playerInfo, backPage) {    
    const background = k.add([
        k.sprite('tutorial6')
    ]);

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
        k.go('tutorial5', playerInfo, backPage)
    });
    
    const nextButton = k.add([
        k.sprite('navBtnRight'),
        k.origin('center'),
        k.pos(540, 60),
        k.scale(0.35),
        k.area(),
        'nextButtonIcon'
    ]);

    k.onUpdate(() => {
        k.every('nextButtonIcon', (o) => {
            o.scale = o.isHovering() ? 0.38 : 0.35;
        });
    });
    k.onClick('nextButtonIcon', (b) => {
        k.go('tutorial7', playerInfo, backPage)
    });
}

export function Tutorial7 (playerInfo, backPage) {    
    const background = k.add([
        k.sprite('tutorial7')
    ]);

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
        k.go('tutorial6', playerInfo, backPage)
    });
    
    const nextButton = k.add([
        k.sprite('navBtnRight'),
        k.origin('center'),
        k.pos(540, 60),
        k.scale(0.35),
        k.area(),
        'nextButtonIcon'
    ]);

    k.onUpdate(() => {
        k.every('nextButtonIcon', (o) => {
            o.scale = o.isHovering() ? 0.38 : 0.35;
        });
    });
    k.onClick('nextButtonIcon', (b) => {
        k.go('tutorial8', playerInfo, backPage)
    });
}

export function Tutorial8 (playerInfo, backPage) {    
    const background = k.add([
        k.sprite('tutorial8')
    ]);

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
        k.go('tutorial7', playerInfo, backPage)
    });
    
    const nextButton = k.add([
        k.sprite('navBtnRight'),
        k.origin('center'),
        k.pos(540, 60),
        k.scale(0.35),
        k.area(),
        'nextButtonIcon'
    ]);

    k.onUpdate(() => {
        k.every('nextButtonIcon', (o) => {
            o.scale = o.isHovering() ? 0.38 : 0.35;
        });
    });
    k.onClick('nextButtonIcon', (b) => {
        k.go('tutorial9', playerInfo, backPage)
    });
}

export function Tutorial9 (playerInfo, backPage) {    
    const background = k.add([
        k.sprite('tutorial9')
    ]);

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
        k.go('tutorial8', playerInfo, backPage)
    });
    
    const nextButton = k.add([
        k.sprite('navBtnRight'),
        k.origin('center'),
        k.pos(540, 60),
        k.scale(0.35),
        k.area(),
        'nextButtonIcon'
    ]);

    k.onUpdate(() => {
        k.every('nextButtonIcon', (o) => {
            o.scale = o.isHovering() ? 0.38 : 0.35;
        });
    });
    k.onClick('nextButtonIcon', (b) => {
        k.go('tutorial10', playerInfo, backPage)
    });
}

export function Tutorial10 (playerInfo, backPage) {    
    const background = k.add([
        k.sprite('tutorial10')
    ]);

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
        k.go('tutorial9', playerInfo, backPage)
    });
    
    const nextButton = k.add([
        k.sprite('closeBtn'),
        k.origin('center'),
        k.pos(540, 60),
        k.scale(0.3),
        k.area(),
        'nextButtonIcon'
    ]);

    k.onUpdate(() => {
        k.every('nextButtonIcon', (o) => {
            o.scale = o.isHovering() ? 0.38 : 0.35;
        });
    });
    console.log(backPage)
    k.onClick('nextButtonIcon', (b) => {
        k.go(`${backPage}`, playerInfo)
    });
}

export default {Tutorial1, Tutorial2, Tutorial3, Tutorial4, Tutorial5, Tutorial6, Tutorial7, Tutorial8, Tutorial9, Tutorial10};