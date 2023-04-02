/* LAYOUT  */
// const movButtonsInnerHtml = {
//     'btn-left': '<div class="btn-left btn-action-movement btn-cloned" draggable="true"><i class="fa fa-arrow-left"></i></div>',
//     'btn-right': '<div class="btn-right btn-action-movement btn-cloned" draggable="true"><i class="fa fa-arrow-right icon-btn-right"></i></div>',
//     'btn-jump': '<div class="btn-jump btn-action-movement btn-cloned" draggable="true"><i class="fa fa-arrow-up"></i></div>',
//     // 'btn-down': '<div class="btn-down btn-action-movement btn-cloned" draggable="true"><i class="fa fa-arrow-down"></i></div>',
//     'btn-eat': '<div class="btn-eat btn-action-movement btn-cloned" draggable="true"><i class="fa fa-cutlery"></i></i></div>',
//     'btn-f1': '<div class="btn-f1 btn-action-movement btn-cloned" draggable="true"><span>F1</span></i></div>',
//     'btn-f2': '<div class="btn-f2 btn-action-movement btn-cloned" draggable="true"><span>F2</span></i></div>'
// }

const movButtonsInnerHtml = {
    'btn-left': '<div class="btn-left btn-action-movement btn-cloned" draggable="true"><i class="material-icons" style="font-size:30px">arrow_back</i></div>',
    'btn-leftwall': '<div class="btn-leftwall btn-action-movement btn-cloned" draggable="true"><i class="material-icons" style="font-size:30px; transform: rotateX(180deg)">subdirectory_arrow_left</i></div>',
    'btn-right': '<div class="btn-right btn-action-movement btn-cloned" draggable="true"><i class="material-icons" style="font-size:30px">arrow_forward</i></i></div>',
    'btn-rightwall': '<div class="btn-rightwall btn-action-movement btn-cloned" draggable="true"><i class="material-icons" style="font-size:30px; transform: rotateX(180deg)">subdirectory_arrow_right</i></div>',
    'btn-jump': '<div class="btn-jump btn-action-movement btn-cloned" draggable="true"><i class="material-icons" style="font-size:30px">arrow_upward</i></div>',
    'btn-f1': '<div class="btn-f1 btn-action-movement btn-cloned" draggable="true"><span>F1</span></div>',
    'btn-f2': '<div class="btn-f2 btn-action-movement btn-cloned" draggable="true"><span>F2</span></div>',
    'btn-eat': '<div class="btn-eat btn-action-movement btn-cloned" draggable="true"><i class="material-icons" style="font-size:22px">restaurant</i></div>'
}

const actionsDefault = {
    'p1': null,
    'p2': null,
    'p3': null,
    'p4': null,
    'p5': null,
    'p6': null,
    'p7': null,
    'p8': null,
    'p9': null,
    'p10': null,
};

// const defaultActionPlaceholders = Array(10).fill(null).map((_, index) => {
//     let div = document.createElement('div');
//     div.classList.add('p' + index+1)
//     div.classList.add('btn-action-movement-placeholder')
//     return div;
// })

// console.log(defaultActionPlaceholders)

export let actionList = {
    'p1': null,
    'p2': null,
    'p3': null,
    'p4': null,
    'p5': null,
    'p6': null,
    'p7': null,
    'p8': null,
    'p9': null,
    'p10': null,
};

export let function1Actions = {
    'p1': null,
    'p2': null,
    'p3': null,
    'p4': null,
    'p5': null,
    'p6': null,
    'p7': null,
    'p8': null,
    'p9': null,
    'p10': null,
};

export let function2Actions = {
    'p1': null,
    'p2': null,
    'p3': null,
    'p4': null,
    'p5': null,
    'p6': null,
    'p7': null,
    'p8': null,
    'p9': null,
    'p10': null,
};

let clonedDataElementMoving = null;
let clonedIconElementMoving = null;

const playButton = document.querySelector('.btn-action-play-play');

const resetActions = list => {
    let aux = {}
    Object.keys(list).forEach((item) => (aux = {...aux, [item]: null}))
    return aux;
};

const restartButton = document.querySelector('.btn-action-play-restart');
export const restartAction = () => {
    actionList = resetActions(actionList);
    function1Actions = resetActions(function1Actions);
    function2Actions = resetActions(function2Actions);

    document.querySelectorAll('.btn-action-movement-placeholder').forEach((item) => item.innerHTML = null)

    playButton.setAttribute('disabled', 'disabled')
    playButton.style.cursor = 'not-allowed'
    playButton.classList.add('disabled')
    restartButton.setAttribute('disabled', 'disabled')
    restartButton.style.cursor = 'not-allowed'
    restartButton.classList.add('disabled')

    // console.log('f1', function1Actions)
    // console.log('f2', function2Actions)
    // console.log('al', actionList)
    // console.log('-'.repeat(50))
}
restartButton.addEventListener('click', () => {
    restartAction();
})

const dragStart = (e) => {
    e.currentTarget.classList.add('dragging');
}

const dragEnd = (e) => {
    e.currentTarget.classList.remove('dragging');
}

document.querySelectorAll('.btn-action-movement').forEach(item => {
    item.addEventListener('dragstart', dragStart);
    item.addEventListener('dragend', dragEnd);
});

const dragOver = (e) => {
    if(e.currentTarget.querySelector('.btn-action-movement') === null) {
        e.preventDefault();
        e.currentTarget.classList.add('hover');
    }
}

const dragLeave = (e) => {
    e.currentTarget.classList.remove('hover');
}

// melhorar cod
const drop = (e) => {
    if(e.currentTarget.querySelector('.btn-action-movement') === null) {
        e.currentTarget.classList.remove('hover');

        let location = e.currentTarget.parentElement.classList.value.split(' ')[0];
        let data;
        let position = e.currentTarget.classList.value.split(' ')[0];

        let clonedItem = document.querySelector('.btn-action-movement.dragging-cloned');
        if (clonedItem) {
            data = document.querySelector('.btn-action-movement.dragging-cloned').classList[0];
            if ((location === 'function-1' && (data === 'btn-f1' || data === 'btn-f2')) || (location === 'function-2' && (data === 'btn-f1' || data === 'btn-f2'))) return
            if (e.ctrlKey) {
                const newMovBtn = document.createElement('div');
                newMovBtn.innerHTML = movButtonsInnerHtml[data]

                newMovBtn.addEventListener('dragstart', dragStartCloned);
                newMovBtn.addEventListener('dragend', dragEndCloned);

                e.currentTarget.appendChild(newMovBtn);

                updateAreas(location, position, data, true);
            } else {
                data = document.querySelector('.btn-action-movement.dragging-cloned').classList[0];
                if ((location === 'function-1' && (data === 'btn-f1' || data === 'btn-f2')) || (location === 'function-2' && (data === 'btn-f1' || data === 'btn-f2'))) return
                e.currentTarget.appendChild(clonedItem.parentElement)
            }
        } else {
            data = document.querySelector('.btn-action-movement.dragging').classList[0];
            if ((location === 'function-1' && (data === 'btn-f1' || data === 'btn-f2')) || (location === 'function-2' && (data === 'btn-f1' || data === 'btn-f2'))) return
            const newMovBtn = document.createElement('div');
            newMovBtn.innerHTML = movButtonsInnerHtml[data]
    
            newMovBtn.addEventListener('dragstart', dragStartCloned);
            newMovBtn.addEventListener('dragend', dragEndCloned);

            e.currentTarget.appendChild(newMovBtn);
        }
        // console.log(`${location}; ${position}; ${data}`)
        updateAreas(location, position, data);
    }
}

document.querySelectorAll('.btn-action-movement-placeholder').forEach(area => {
    area.addEventListener('dragover', dragOver);
    area.addEventListener('dragleave', dragLeave);
    area.addEventListener('drop', drop);
});

const dragStartCloned = (e) => {
    e.currentTarget.firstChild.classList.add('dragging-cloned');
    clonedIconElementMoving = e.currentTarget.firstChild;

    clonedDataElementMoving = {
        oldLoacation: e.currentTarget.parentElement.parentElement.classList.value.split(' ')[0],
        oldPosition: e.currentTarget.parentElement.classList.value.split(' ')[0]
    }
}

const dragEndCloned = (e) => {
    e.currentTarget.firstChild.classList.remove('dragging-cloned');
    clonedIconElementMoving.classList.remove('delete')
}

const dragoverDelete = (e) => {
    e.preventDefault()
    if(clonedIconElementMoving && clonedDataElementMoving) {
        if (e.currentTarget.querySelector('.placeholders')?.classList.value.split(' ')[0] 
            !== clonedDataElementMoving.oldLoacation
            && e.target.classList.value.split(' ')[1] !== 'btn-action-movement-placeholder') {
                clonedIconElementMoving.classList.add('delete')
        } else {
            clonedIconElementMoving.classList.remove('delete')
        }
    }
}

const dragLeaveDelete = (e) => {
    // ...
}

const dropDelete = (e) => {
    // console.log(e.target.classList.value.split(' ')[1] === 'btn-action-movement-placeholder')
    if (clonedDataElementMoving?.oldLoacation !== 
        e.currentTarget.querySelector('.placeholders')?.classList.value.split(' ')[0]
        && e.target.classList.value.split(' ')[1] !== 'btn-action-movement-placeholder') {
        if (clonedIconElementMoving) {
            clonedIconElementMoving.parentElement.remove(clonedIconElementMoving)
            updateAreas('', '', '')
        }
    }
}

document.querySelectorAll('.box').forEach(droppableArea => {
    droppableArea.addEventListener('dragover', dragoverDelete)
    droppableArea.addEventListener('dragleave', dragLeaveDelete);
    droppableArea.addEventListener('drop', dropDelete);
})

const updateAreas = (location, position, data, isCopying = false) => {
    // add actions
    if (location === 'function-1') function1Actions[position] = data.split('-')[1];
    if (location === 'function-2') function2Actions[position] = data.split('-')[1];
    if (location === 'action-list') actionList[position] = data.split('-')[1];


    if (clonedDataElementMoving) {
        if (clonedDataElementMoving.oldLoacation === 'function-1' && !isCopying) function1Actions[clonedDataElementMoving.oldPosition] = null;
        if (clonedDataElementMoving.oldLoacation === 'function-2' && !isCopying) function2Actions[clonedDataElementMoving.oldPosition] = null;
        if (clonedDataElementMoving.oldLoacation === 'action-list' && !isCopying) actionList[clonedDataElementMoving.oldPosition] = null;
    }
    clonedDataElementMoving = null;

    // manage tb btns states
    if (Object.values(actionList).some((item) => item !== null)) {
        playButton.removeAttribute('disabled')
        playButton.style.cursor = 'pointer'
        playButton.classList.remove('disabled')
    } else {
        playButton.setAttribute('disabled', 'disabled')
        playButton.style.cursor = 'not-allowed'
        playButton.classList.add('disabled')
        restartButton.setAttribute('disabled', 'disabled')
        restartButton.style.cursor = 'not-allowed'
        restartButton.classList.add('disabled')
    }

    if (Object.values(actionList).some((item) => item !== null)
        || Object.values(function1Actions).some((item) => item !== null)
        || Object.values(function2Actions).some((item) => item !== null)) {
        restartButton.removeAttribute('disabled')
        restartButton.style.cursor = 'pointer'
        restartButton.classList.remove('disabled')
    }
    
    // console.log(clonedDataElementMoving)
    // console.log('f1', function1Actions)
    // console.log('f2', function2Actions)
    // console.log('al', actionList)
    // console.log('-'.repeat(50))
}

export default {actionList, function1Actions, function2Actions, restartAction};
