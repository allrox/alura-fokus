const html = document.querySelector('html')
const btFoco = document.querySelector('.app__card-button--foco')
const btCurto = document.querySelector('.app__card-button--curto')
const btLongo = document.querySelector('.app__card-button--longo')
const img = document.querySelector('.app__image')
const title = document.querySelector('.app__title')
const menu = document.querySelectorAll('.app__card-button')
const player = document.querySelector('#alternar-musica')
const audio = new Audio('/sons/luna-rise-part-one.mp3')
audio.loop = true
const play = new Audio('/sons/play.wav')
const audioPause = new Audio('/sons/pause.mp3')
const finish = new Audio('/sons/beep.mp3')
const timer = document.querySelector('#timer')

const startPause = document.querySelector('#start-pause span')

let tempoEmSegundos = 1500
let intervaloID = null

btFoco.addEventListener('click',() => {
    tempoEmSegundos = 1500;
    setImage('foco');
    btFoco.classList.add('active');
})

btCurto.addEventListener('click',() => {
    tempoEmSegundos = 300;
    setImage('descanso-curto');
    btCurto.classList.add('active');
})

btLongo.addEventListener('click',() => {
    tempoEmSegundos = 900;
    setImage('descanso-longo');
    btLongo.classList.add('active');
})

player.addEventListener('change', () => {
    if(audio.paused){
        audio.play();
    } else {
        audio.pause();
    }
})

function setImage(contexto){
    showTime();
    menu.forEach(function (contexto){
        contexto.classList.remove('active')
    }) 
    html.setAttribute('data-contexto', contexto);
    img.setAttribute('src',`/imagens/${contexto}.png`);
    switch (contexto) {
        case "foco":
            title.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
        break;
        case "descanso-curto":
            title.innerHTML = `
            Que tal dar uma respirada,<br>
            <strong class="app__title-strong">Faça uma pausa curta.</strong>
            `
        break;
        case "descanso-longo":
            title.innerHTML = `
            Hora de voltar à superfície,<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `
        break;
    default:
        break;
    }
}

const contagemRegressiva = () => {
    if (tempoEmSegundos <=0) {
        finish.play();
        alert('Tempo Encerrado!');
        reset();
        return
    }
    tempoEmSegundos -= 1;
    showTime();
}

startPause.addEventListener('click', btStartPause)

function btStartPause() {
    if (intervaloID){
        audioPause.play();
        reset();
        return
    }
    play.play();
    intervaloID = setInterval(contagemRegressiva, 1000);
    startPause.textContent = "Pausar";
    document.querySelector('.app__card-primary-butto-icon').setAttribute('src','/imagens/pause.png');
}

function reset(){
    clearInterval(intervaloID);
    startPause.textContent = "Começar"
    document.querySelector('.app__card-primary-butto-icon').setAttribute('src','/imagens/play_arrow.png');
    intervaloID = null;
}

function showTime(){
    const time = new Date(tempoEmSegundos * 1000);
    const tempoFormatado = time.toLocaleString('pt-br',{minute:'2-digit',second:'2-digit'});
    timer.innerHTML = `${tempoFormatado}`
}

showTime()