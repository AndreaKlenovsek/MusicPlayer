
// Variables
const songs = ["song-0.mp3", "song-1.mp3", "song-2.mp3", "song-3.mp3", "song-4.mp3", "song-5.mp3"];
const posters = ["poster-0.jpg", "poster-1.jpg", "poster-2.jpg", "poster-3.jpg", "poster-4.jpg", "poster-5.jpg"];
const songTitle = document.getElementById("singTitle");
const fillBar = document.querySelector("#seek-bar #fill");
const initbtn = document.getElementById("play");
const trackList = document.getElementById("trackList");
const vol = document.getElementById("volume");
const volUp = document.getElementById("volume-up");
let currentSong;

// Init audio
const song = new Audio();

// Play song
function playSong(currentSong) {
  song.src = `songs/${songs[currentSong]}`;
  songTitle.textContent = songs[currentSong];
  document.querySelector("#image img").setAttribute("src", `img/${posters[currentSong]}`);
  document.querySelector("#bg img").setAttribute("src", `img/${posters[currentSong]}`);
  song.setAttribute("allow", "autoplay");
  song.play();
  }


// Init playing beginig
function init() {
  currentSong = 0;
  playSong(currentSong);
}


// Play or Pause
function playOrPause() {
  if(song.paused) {
  song.play();
  document.querySelector("#play").innerHTML = '<i class="far fa-stop-circle"></i>';
  } else {
  song.pause();
  document.querySelector("#play").innerHTML = '<i class="far fa-play-circle"></i>';
  }
}


// Time bar update
song.addEventListener("timeupdate", function() {
var position = song.currentTime / song.duration;
fillBar.value = position * 100;
});

// Next Track
function next() {
currentSong ++
if(currentSong > 5) {
currentSong = 0;
}
playSong(currentSong);
document.querySelector("#image img").setAttribute("src", `img/${posters[currentSong]}`);
document.querySelector("#bg img").setAttribute("src", `img/${posters[currentSong]}`);
}

// Prev Track
function prev() {
  currentSong --
  if(currentSong < 0) {
  currentSong = 5;
  }
  playSong();
  document.querySelector("#image img").setAttribute("src", `img/${posters[currentSong]}`);
  document.querySelector("#bg img").setAttribute("src", `img/${posters[currentSong]}`);
}
  
// Track List
songs.forEach(song => {
  const start = song.indexOf("-");
  const end = song.indexOf(".");
  const id = song.slice(start + 1, end);
 
const html = `<li class="songNum" id="${id}">
<div style="background-image: url(./img/poster-${id}.jpg)">
<p>${song}</p>
</div>
</li>`;

trackList.insertAdjacentHTML("beforeend", html);
});

// Set volume
function setVolume() {  
song.volume = this.value;
}


// Volume or Mute
function volumeUp() {  
if(song.volume > 0) {
song.volume = 0;
this.className = "fas fa-volume-mute";
} else {
song.volume = vol.value;
this.className = "fas fa-volume-up";
}
}

// Change Track
function changeTrack() {
const id = this.id;
song.currentTime = 0;
document.querySelector("#play").innerHTML = '<i class="far fa-stop-circle"></i>';
playSong(id);
currentSong = id;
}

// Event Listeners
const tracks = document.querySelectorAll(".songNum");
if(tracks) {
tracks.forEach(track => {
track.addEventListener("click", changeTrack);
})
}


volUp.addEventListener("click", volumeUp);
vol.addEventListener("change", setVolume);
document.querySelector("#next").addEventListener("click", next);
document.querySelector("#prev").addEventListener("click", prev);
document.addEventListener("DOMContentLoaded", init);
initbtn.addEventListener("click", playOrPause);