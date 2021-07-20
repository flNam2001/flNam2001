const musicContainer = document.querySelector(".music-container")
const playBtn = document.querySelector("#play")
const nextBtn = document.querySelector("#next")
const prevBtn = document.querySelector("#prev")
const audio = document.getElementById('audio');
const progress = document.querySelector(".progress")
const progressContainer = document.querySelector(".progress-container")
const title = document.getElementById('title')
const cover = document.getElementById('cover')
const titleMain = document.getElementById('title-main')
// tên bài hát
//song name

const songs = [
    "used to know (Orfeo. Remix)", 
    "take me to church - hozier (s l o w e d)", 
    "Astronaut"
]

// keep track of songs

let songIndex = 2
//Initially load song from DOM

loadSong(songs[songIndex])
// update song details

function loadSong(song) {
    title.innerHTML = song
    audio.src = `audio/${song}.mp3`
    cover.src = `img/${song}.jpg`
}

function playSong() {
    musicContainer.classList.add('play')
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')
    titleMain.style.opacity = 0
    titleMain.style.transition = 'opacity 0s ease-out'

    audio.play()
}

function pauseSong() {
    musicContainer.classList.remove('play')
    playBtn.querySelector('i.fas').classList.remove('fa-pause')
    playBtn.querySelector('i.fas').classList.add('fa-play')
    titleMain.style.opacity = 1
    titleMain.style.transition = 'opacity 0.75s ease-in'

    audio.pause()
}

function prevSong() {
    songIndex--
    if(songIndex < 0) {
        songIndex = songs.length - 1
    }

    loadSong(songs[songIndex])

    playSong()
}

function nextSong() {
    songIndex++
    if(songIndex > songs.length - 1) {
        songIndex = 0
    }

    loadSong(songs[songIndex])

    playSong()
}

function updateProgress(e) {
    const {duration, currentTime} = e.srcElement
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`
}

function setProgress(e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration

    audio.currentTime = (clickX / width) * duration
}

// event listener
playBtn.addEventListener("click", () => {
    const isPlaying = musicContainer.classList.contains("play")
    
    if(isPlaying) {
        pauseSong()
    } else {
        playSong()
    }
})

// change song cover event
prevBtn.addEventListener("click", prevSong)
nextBtn.addEventListener("click", nextSong)

audio.addEventListener('timeupdate', updateProgress)

progressContainer.addEventListener('click', setProgress)

audio.addEventListener('ended', nextSong)