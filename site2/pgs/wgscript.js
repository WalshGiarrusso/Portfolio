//init
$(document).ready(function () {

    determineTheme();
    cMQ();
    $('#mobileNavMenu').css('display', 'none');


    navPaddingTop($('#pageContent'));
    
});

var cTheme = 'light';   //current theme
var dMQ = window.matchMedia("(prefers-color-scheme: dark)");
var lMQ = window.matchMedia("(prefers-color-scheme: light)");

//FUNCTIONS COMMON REF
function navPaddingTop(elem){
    elem.css('padding-top', $('#navbar').outerHeight());
};

//Arrays
//dark/light
//makes browser light
//        theme     bg        border    txt         img extension
var rAL = ['light', 'white', 'gray', 'black',       'dark'];
//makes browser dark
var rAD = ['dark', '#35363A', '#C3C3C3', 'white',   'light'];
//Dark Switching
//Determine

function determineTheme() {

    if ((lMQ.matches) && (cTheme !== 'light')) {
        themeSwitch(rAL);
    } else if ((dMQ.matches) && (cTheme !== 'dark')) {
        themeSwitch(rAD);
    }
}
//det
dMQ.addListener(function () {
    if (cTheme !== 'dark') {
        determineTheme();
    }
});
lMQ.addListener(function () {
    if (cTheme !== 'light') {
        determineTheme();
    }

});

//execute
function themeSwitch(pRA) {
    cTheme = pRA[0];
    console.log(cTheme);
    $('body, #navbar').css('background-color', pRA[1]);
    $('.BRDR').css('border-bottom-color', pRA[2]);
    $('.F1, .F2').css('color', pRA[3]);
    $('.SWP').each(function () {
        var link = $(this).attr('src').split('-');
    
        $(this).attr('src', link[0] + '-' + pRA[4] + '.svg');
    });
}

//media queries for breakpoints
$(window).on('resize', function () {
    cMQ();
});
//vars
var cDSP;
            //name  tooltip dsp     navitemdsp  dropdsp     btn       ?hideMB   fnt          hgt
var sHR0 = ['sHR0',    'none',      'none',     'block',    'inline', false,    '1.8rem',    '1.8rem'];
var sHR1 = ['sHR1',    'none',      'none',     'block',    'inline', false,    '1.8rem',    '1.8rem'];
var sHR2 = ['sHR2',    'none',      'none',     'block',    'inline', false,    '1.8rem',    '1.8rem'];
var sHR3 = ['sHR3',    'none',      'none',     'block',    'inline', false,    '',          ''];
var sHR4 = ['sHR4',    'none',      'flex',     'none',      'none',  true,     '',          ''];
var sHR99 = ['sHR99',  'block',     'flex',     'none',      'none',  true,     '',          ''];
//cuts
            //sHR0  SHR1    SHR2    SHR3    SHR4 
var cSHR = [5,      20,     31.313,     48.375,     74.063]
//Check media queries
function cMQ() {
    switch (tMQ()) {
        case 0:
            mRC(sHR0);
            break;
        case 1:
            mRC(sHR1);
            break;
        case 2:
            mRC(sHR2);
            break;
        case 3:
            mRC(sHR3);
            break;
        case 4:
            mRC(sHR4);
            break;
        default:
            mRC(sHR99);
    };
};
//test queries
function tMQ() {
    for (i = 0; i < cSHR.length; i++) {
        if (window.matchMedia("(max-width:" + cSHR[i] + "em)").matches) {
            var ret = i;
            return ret;
        };
    };
};
//execute
function mRC(rEQ) {
    //check for expanded menu
    $('#mobileNavMenu').css('padding-top', parseInt($('#pageContent').css('padding-top')))
    if (cDSP !== rEQ[0]) {
        cDSP = rEQ[0];
        console.log(cDSP);
        
        //tooltip display
        $('.NavItem > p').css('display', rEQ[1]);
        //nav display
        $('#navigation').css('display', rEQ[2]);
        //dropdown display
        $('#dropDown').css('display', rEQ[3]);
        //open button display
        if(!$('#closeDrop').is(':visible'))
        $('#openDrop').css('display', rEQ[4]);
        //hide mobile
        if (rEQ[5]) {
            collapseMobileDrop('none');
        };
        //navbar font and image sizes
        $('.RDUS').not('p').css('height', rEQ[7]);
        $('.RDUS').not('img').css('font-size', rEQ[6]);


        
    };
};

//input handling
//click
//target array
var tRGRA = ['#openDrop', '#closeDrop'];
$(document).click(function (e) {
    console.log($('#mobileNavMenu').queue().length);
    var tar = $(e.target);
    //hits
    switch (clickReg(tar)) {
        case 0: //trg is opendrop
            $('#openDrop').css('display', 'none');
            $('#closeDrop').css('display', 'inline');
            navPaddingTop($('#mobileNavMenu'));
            $('#mobileNavMenu').slideDown(175);
            if ($('#mobileNavMenu').queue().length > 2) {
                $('#mobileNavMenu').clearQueue();
            };
            break;
        case 1: //trg is closedrop
            collapseMobileDrop('inline');
            break;

        default:
            //do nothing
    };
});
function collapseMobileDrop(opDsp) {
    $('#mobileNavMenu').slideUp(175);
    $('#closeDrop').css('display', 'none');
    $('#openDrop').css('display', opDsp);
    
};
function clickReg(tRG) {
    for (i = 0; i < tRGRA.length; i++) {
        if (tRG.is(tRGRA[i])) {
            return i;
        };
    };
};
//scroll
var dSCRL;
var oldTop = 0;
var minSCRL = 5;
var navbarHeight = $('#navbar').outerHeight();
$(window).scroll(function(event) {
    dSCRL = true;
});
setInterval(function () {
    if (dSCRL) {
        console.log($('#navbar').queue().length);    
        if ($('#navbar').queue().length > 2) {
            $('#navbar').clearQueue();
        };
        if (!$('#closeDrop').is(':visible')) {
            handleSCRL();
            dSCRL = false;
        }
       
       
    }
}, 250);
function handleSCRL() {
    var pos = $(this).scrollTop();
    if (Math.abs(oldTop - pos) <= minSCRL) {
        return;
    }
    if ((pos > oldTop) && (pos > navbarHeight)) {
        var shift = ((navbarHeight * -1) -1);
        $('#navbar').animate({ 'top': shift }, 175);
    } else if (pos + $(window).height() < $(document).height()){
        $('#navbar').animate({ 'top': 0 }, 175);  
    };
    oldTop = pos;
};
//fix padding issue

window.matchMedia('(orientation: portrait)').addListener(function () {
    $('#mobileNavMenu').css('padding-top', parseInt($('#pageContent').css('padding-top')))

});