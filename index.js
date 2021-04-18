import { findSolutions } from './solution.js'

function convertToObject(solution) {
    const object = {bunches : solution.length}
    for (const item of solution) {
        object[item] = object[item] ? object[item] + 1 : 1
    }
    return object
}

let total = 0, bunchSizes = []

const displayTotal = document.getElementById('display-total'),
    displayBunchSizes = document.getElementById('display-bunch-sizes'),
    bunchSizeInput = document.getElementById('bunch-size-input'),
    bunchSizeAdd = document.getElementById('bunch-size-add'),
    calculate = document.getElementById('calculate'),
    reset = document.getElementById('reset'),
    totalInput = document.getElementById('total-input'),
    totalSet = document.getElementById('total-set'),
    result = document.getElementById('result')

bunchSizeAdd.addEventListener('click', e => {
    const bunchSizeInputValue = parseInt(bunchSizeInput.value)
    bunchSizeInput.value = null
    if (!bunchSizeInputValue || bunchSizeInputValue < 1 || bunchSizes.includes(bunchSizeInputValue)) {
        return
    }
    bunchSizes.push(bunchSizeInputValue)
    setDisplayBunchSizes()
    e.preventDefault()
})

totalSet.addEventListener('click', e => {
    total = parseInt(totalInput.value)
    setDisplayTotal()
    e.preventDefault()
})

reset.addEventListener('click', e => {
    total = 0
    bunchSizes = []
    setDisplayTotal()
    setDisplayBunchSizes()
    calculate.disabled = true
    result.innerHTML = ''
})

calculate.addEventListener('click', e => {
    let solutions = findSolutions(total, bunchSizes)
    if (solutions.length === 0) {
        const p = document.createElement('p')
        p.innerText = 'No solutions.'
        result.appendChild(p)
        return
    }
    solutions = solutions.map(solution => convertToObject(solution))
    for (const solution of solutions) {
        const p = document.createElement('p')
        let text = `${solution.bunches} bunches: `
        for (const bunchSize of Object.keys(solution).filter(x => x !== 'bunches')) {
            for (let i = 0; i < solution[bunchSize]; i ++)
            text += `${bunchSize} `
        }
        p.innerText = text
        result.appendChild(p)
    }
})

function setDisplayTotal() {
    totalInput.value = null
    if (!total) {
        reset.disabled = true
        displayTotal.innerText = ''
        return
    }
    displayTotal.innerText = `You are buying ${total} flowers.`
    reset.disabled = false
    if (bunchSizes.length > 0) {
        calculate.disabled = false
    }
    result.innerHTML = ''
}

function setDisplayBunchSizes() {
    const bunchSizesLength = bunchSizes.length
    if (bunchSizesLength === 0) {
        displayBunchSizes.innerText = ''
        return
    }
    let text = 'Available bunch sizes:'
    for (let i = 0; i < bunchSizesLength; i++) {
        text += ` ${bunchSizes[i]}${i === bunchSizesLength - 1 ? '.' : ','}`
    }
    displayBunchSizes.innerText = text
    reset.disabled = false
    if (total) {
        calculate.disabled = false
    }
    result.innerHTML = ''
}