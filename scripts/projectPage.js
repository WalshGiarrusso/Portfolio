var languageRet;
lclProjStorage = window.localStorage;
$('#submitVariantSelection').click(function(){
    var val = $('#variantSelector').val();
    $('.HrefTarget').attr('href', (val !== "" ? val : $(this).attr('href')));
    $('.SrcTarget').attr('src', (val !== "" ? val : $(this).attr('src')));
});
function setDims(){
    rt = parseInt($(":root").css('font-size').replace(/\D/g, ''));
    ht = ((0.9 * $(window).height()) / rt)
    wt = ((0.9 * $(window).width()) / rt)
    $('#contentImage').css({
        "max-height": (ht + "rem"),
        "max-width": (wt + "rem")
    });
};
$('#fitPageButton').click(function(){
    setDims();
});
$(document).ready(function(){
    setDims();
    initAudio();
   languageRet = checkLang();
    
});

//Audio Controls
function initAudio(){
    $('.AudioTarget').prop("volume", lclProjStorage.getItem('audioVolume') ? lclProjStorage.getItem('audioVolume') : 0.4)
    $('#audioVolSlider').val(lclProjStorage.getItem('audioVolume') ? lclProjStorage.getItem('audioVolume') : 0.4)
    $('.AudioTarget').autoplay = lclProjStorage.getItem('audioAutoplay') ? lclProjStorage.getItem('audioAutoplay') : false
    
};

var audScrubInterrupt = false;
const audioPlayer = $('audio')
const audPlayPause = $('.AudioPlayPause')
const audStop = $('.AudioStop')
const audRwd = $('.AudioRewind')
const audFF = $('.AudioFF')
const audVol = $('#audioVolSlider')
const audTime = $('#audioTimeSlider') 

audPlayPause.click(function(){

    if(audioPlayer[0].paused){
        audioPlayer[0].play();
        audPlayPause.text(languageRet == 1 ? 'Pausa' : 'Pause')
    }else{
        audioPlayer[0].pause();
        audPlayPause.text(languageRet == 1 ? 'Play' : 'Play')
    }
});
audStop.click(function(){
    audioPlayer[0].pause();
    audioPlayer[0].currentTime = 0;
    audPlayPause.text(languageRet == 1 ? 'Play' : 'Play')
});
audRwd.click(function(){
    audioPlayer[0].currentTime -= 10;
})
audFF.click(function(){
    audioPlayer[0].currentTime += 10;
})

audioPlayer[0].ontimeupdate = function(){
   $('.AudCurLength').text(toMinutes(audioPlayer[0].currentTime))
   if(audScrubInterrupt == false){
    audTime.val(audioPlayer[0].currentTime);
   };
   
};

audTime.on('input', function(){
    audScrubInterrupt = true;
    
});
audTime.change(function(){
    audScrubInterrupt = false;
    audioPlayer[0].currentTime = $(this).val()
});
audVol.change(function(){
    audioPlayer[0].volume = $(this).val()
});

audioPlayer.removeAttr('controls')

function toMinutes(sec){
    cSec = Math.ceil(sec)
    outMin =  Math.floor(cSec/60)
    outSec = String(cSec % 60).length > 1  ? cSec % 60 : "0"+String(cSec % 60)
    outString = String(outMin) + ":" + String(outSec)
    return outString
}

$(window).on('load',function(){
    $('.AudTotLength').text(toMinutes(audioPlayer[0].duration))
    $('#audioTimeSlider').prop("max",audioPlayer[0].duration).val(0)
});