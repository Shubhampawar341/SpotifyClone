console.log("Welcome to Spotify")

// Initialize the variables
let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById('masterPlay');
let myProgressbar = document.getElementById('myProgressbar');
let gif = document.getElementById('gif');
let mastersongname = document.getElementById("mastersongname");
let songItem=Array.from(document.getElementsByClassName('songItem'));
let songs=[
    {songname: "Let Me Love You", filePath: 'songs/1.mp3',coverPath:'covers/1.jpg'},
    {songname: "Bones", filePath: 'songs/2.mp3',coverPath:'covers/2.jpg'},
    {songname: "Wajah", filePath: 'songs/3.mp3',coverPath:'covers/3.jpg'},
    {songname: "Dead Inside", filePath: 'songs/4.mp3',coverPath:'covers/4.jpg'},
    {songname: "Closer", filePath: 'songs/5.mp3',coverPath:'covers/5.jpg'},
    {songname: "Safe", filePath: 'songs/6.mp3',coverPath:'covers/6.jpg'},
    {songname: "SuperHero", filePath: 'songs/7.mp3',coverPath:'covers/7.jpg'},
]
songItem.forEach((element, i)=>{
    // console.log(element, i);
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songname')[0].innerText = songs[i].songname;
})
// audioElement.play();

//handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity=1;
    }

    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity=0;

    }
})

//handle previous and next song


// listen to events

audioElement.addEventListener('timeupdate', () =>{
    // console.log('timeupdate');
    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    // console.log(progress);
    myProgressbar.value = progress;

})

myProgressbar.addEventListener('change',()=>{
    audioElement.currentTime = (myProgressbar.value *audioElement.duration)/100;
})

const makeAllPlay= ()=>{
    Array.from(document.getElementsByClassName('smallplay')).forEach((element)=>{
        element.classList.add('fa-circle-play');
        element.classList.remove('fa-circle-pause');
    })
}
Array.from(document.getElementsByClassName('smallplay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        // console.log(e.target);
        makeAllPlay();
        songIndex = parseInt(e.target.id)
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        mastersongname.innerText=songs[songIndex].songname;
        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity=1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })

    
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=6){
        songIndex =0
    }
    else{
        songIndex +=1
    }
        audioElement.src = `songs/${songIndex+1}.mp3`;
        mastersongname.innerText=songs[songIndex].songname;
        audioElement.currentTime=0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
})
document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex =0
    }
    else{
        songIndex -=1
    }
        audioElement.src = `songs/${songIndex+1}.mp3`;
        mastersongname.innerText=songs[songIndex].songname;
        audioElement.currentTime=0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
})
