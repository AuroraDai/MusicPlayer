let musicIndex = 1;

//load the first song when window load
window.addEventListener('load', () => {
    loadMusic(musicIndex);
})

//load music
//index ~  musicIndex
function loadMusic(index) {
    //we set the musicIndex  = 1, but the arry index start at 0 . so to get to the first song , have to -1
    $('.mInfo .mName').html(allMusic[index - 1].name)
    $('.mInfo .artist').html(allMusic[index - 1].artist)
    $('.mImg img').attr('src', `img/${allMusic[index - 1].img}.jpeg`)
    $('#bd_img').attr('src', `img/${allMusic[index - 1].img}.jpeg`)
    $('#current_audio').attr('src', `mp3/${allMusic[index - 1].src}.mp3`)

}

//insert song list
let ul_list = document.querySelector('.ul_list');
for (var i = 0; i < allMusic.length; i++) {
    ul_list.innerHTML += `<li index=${i + 1}>
                          <span class="music_name">${allMusic[i].name} - ${allMusic[i].artist}</span>
                          </li>`;
}


//play/pause events
var current_audio = document.querySelector('#current_audio')
let isPlay = true;
function playMusic() {
    current_audio.play()
    isPlay = false;
    $('#play').html('pause_circle')

}
function pauseMusic() {
    current_audio.pause();
    isPlay = true;
    $('#play').html('play_circle')

}

//animation of img-roatae
function imgRotate() {
    isPlay ? $('.mImg img').addClass('imgRotate') : $('.mImg img').removeClass('imgRotate');
}
$('.play_pause').click(() => {
    imgRotate();
    isPlay ? playMusic() : pauseMusic();

})


//next/prev btn events
function nextMusic() {
    musicIndex++;
    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex
    //have to load the music funtion again in order to change music
    loadMusic(musicIndex);
    playMusic();
}

function prevMusic() {
    musicIndex--;
    //if music Index is less than 1 then go to the last song of the list
    musicIndex < 1 ? musicIndex = allMusic.length : musicIndex
    //have to load the music funtion again in order to change music
    loadMusic(musicIndex);
    playMusic();
}
$('#previous').click(() => {
    prevMusic()
})
$('#next').click(() => {
    nextMusic()
})



//progress bar && the progress timer
var current_audio = document.querySelector('#current_audio')
//The timeUpdate event is emitted when the audio/video playback position changes. 
// This property returns the audio/video playback position in seconds. 
current_audio.addEventListener('timeupdate', (e) => {

    //music current time of the song
    let currentTimes = e.target.currentTime;
    //music Total audio time of the song
    let duration = e.target.duration;
    //the width of the progress bar already process. 
    let progressWidth = (currentTimes / duration) * 100;
    $('#current_prograss').css('width', `${progressWidth}%`);

    //current song's progress timer
    let currentMin = Math.floor(currentTimes / 60);
    let currentSec = Math.floor(currentTimes % 60);
    if (currentSec < 10) {
        currentSec = '0' + currentSec;
    }
    $('.current').text(currentMin + ':' + currentSec)

    //loaded the duration time first while the song does not fully loaded yet
    // The loadedData event is triggered when the frame at the current playback position has finished loading, but there is not enough data to play the next frame of the specified audio;Usually the first frame.
    //make sure the song is still playing, before fully loading the page and data
    current_audio.addEventListener("loadeddata", () => {
        //current song's total duration timer
        let audioDuration = current_audio.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);
        if (totalSec < 10) {
            totalSec = '0' + totalSec;
        }
        $('.total_duration').html(totalMin + ':' + totalSec)


    })
    // if the song has finished, go next 
    if (current_audio.currentTime === current_audio.duration && $('#repeat').html('repeat')) {
        nextMusic();
    }

})
//progess bar click event

// currentTime       clickedOffSetX
// ------------  =   ---------------
// songDuration          barWidth

let bar = document.querySelector('.bar')
bar.addEventListener('click', (e) => {
    //get the progress bar width
    let progessWidthVal = bar.clientWidth;
    //get target offsetX value
    let clickedOffSetX = e.offsetX;
    //get song total duration
    let songDuration = current_audio.duration
    current_audio.currentTime = (clickedOffSetX / progessWidthVal) * songDuration

    playMusic();

})


// repeat click event
$('#repeat').click(() => {
    switch ($('#repeat').html()) {

        case 'repeat':
            $('#repeat').html('repeat_one')
            //when click repeat, current_audio will setAttribute loop
            current_audio.setAttribute('loop', 'loop');
            //when this music has reach the end, music will back to 0, replay
            current_audio.addEventListener('ended', () => {
                current_audio.currentTime = 0;
                loadMusic(musicIndex);
                playMusic();
            })
            break;

        case 'repeat_one':
            $('#repeat').html('repeat');
            //when click repeat again, current_audio will removeAttribute loop
            current_audio.removeAttribute('loop');
            //when this music has reach the end, music will play next song
            current_audio.addEventListener('ended', () => {
                nextMusic();
            })
            break;
    }

})

//volume on/off
$('#volume_up').click(() => {
    switch ($('#volume_up').html()) {
        case 'volume_up':
            $('#volume_up').html('volume_off')
            current_audio.muted = true
            break;
        case 'volume_off':
            $('#volume_up').html('volume_up')
            current_audio.muted = false;
    }
})



//expand more -- music list
let isExpand = true;
$('#expand_more').click(() => {
    if (isExpand) {
        $('#expand_more').html('close');
        $('.list_dropdown').slideToggle('.list_dropdown');
        isExpand = false;
    } else {
        $('#expand_more').html('expand_more');
        $('.list_dropdown').slideToggle('.list_dropdown');
        isExpand = true;
    }
})


// click song to play
let lis = ul_list.querySelectorAll('li');
for (let l = 0; l < lis.length; l++) {
    lis[l].addEventListener('click', function () {
        let index = lis[l].getAttribute('index');
        musicIndex = index
        loadMusic(musicIndex);
        playMusic();
        isPlay = true
        imgRotate();
        $('#expand_more').html('expand_more');
        $('.list_dropdown').slideToggle('.list_dropdown');
        isPlay = false;


    })
}




