import Experience from './Experience/Experience.js';

const experience = new Experience(document.querySelector('canvas.webgl'))
const btn = document.querySelector('.start_btn')
const board = document.querySelector('.black_board')
console.log(btn);

setTimeout(() => {
    const dom = document.querySelector('.process_bar')
    dom.classList.add('hidden')
    btn.style.opacity = 1
}, 1000)

btn.addEventListener('click', () => {
    btn.style.opacity = 0
    board.style.opacity = 0
    if (experience.world) {
        experience.world.start()
    }
})

