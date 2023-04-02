import k from './kaboom.js';
import { HomeScreen } from './scenes/HomeScreen.js';
import { Roadmap } from './scenes/Roadmap.js';
import Game from './scenes/Game.js';
import  { Tutorial1, Tutorial2, Tutorial3, Tutorial4, Tutorial5, Tutorial6, Tutorial7, Tutorial8, Tutorial9, Tutorial10 } from './scenes/Tutorial.js';

k.scene('home-screen', HomeScreen)
k.scene('tutorial1', Tutorial1)
k.scene('tutorial2', Tutorial2)
k.scene('tutorial3', Tutorial3)
k.scene('tutorial4', Tutorial4)
k.scene('tutorial5', Tutorial5)
k.scene('tutorial6', Tutorial6)
k.scene('tutorial7', Tutorial7)
k.scene('tutorial8', Tutorial8)
k.scene('tutorial9', Tutorial9)
k.scene('tutorial10', Tutorial10)

k.scene('roadmap', Roadmap)
k.scene('game', Game)


// verificar se tem no cache, se n tiver manda esse resetado msm
let playerInfo = {
    // email: '',
    choosedLevel: 0,
    completedLevelsInfo: [
        [
            {
                levelIndex: 0,
                movements: 0,
                score: 0,
                attempts: 0,
                timeStart: null,
                timeEnd: null
            },
            {
                levelIndex: 0,
                movements: 0,
                score: 0,
                attempts: 0,
                timeStart: null,
                timeEnd: null
            }
        ],
        [
            {
                levelIndex: 1,
                movements: 0,
                score: 0,
                attempts: 0,
                timeStart: null,
                timeEnd: null
            },
            {
                levelIndex: 1,
                movements: 0,
                score: 0,
                attempts: 0,
                timeStart: null,
                timeEnd: null
            }
        ],
        [
            {
                levelIndex: 2,
                movements: 0,
                score: 0,
                attempts: 0,
                timeStart: null,
                timeEnd: null
            },
            {
                levelIndex: 2,
                movements: 0,
                score: 0,
                attempts: 0,
                timeStart: null,
                timeEnd: null
            }
        ],
        [
            {
                levelIndex: 3,
                movements: 0,
                score: 0,
                attempts: 0,
                timeStart: null,
                timeEnd: null
            },
            {
                levelIndex: 3,
                movements: 0,
                score: 0,
                attempts: 0,
                timeStart: null,
                timeEnd: null
            }
        ],
        [
            {
                levelIndex: 4,
                movements: 0,
                score: 0,
                attempts: 0,
                timeStart: null,
                timeEnd: null
            },
            {
                levelIndex: 4,
                movements: 0,
                score: 0,
                attempts: 0,
                timeStart: null,
                timeEnd: null
            }
        ]
    ]
}

k.go('home-screen', playerInfo)
// k.go('roadmap')
// k.go('game', playerInfo)]
// k.go('game')