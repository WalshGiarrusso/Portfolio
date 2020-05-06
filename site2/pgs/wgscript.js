//init
$(document).ready(function () {
    $(this).scrollTop(0);
    determineTheme(false);
   
    
    cMQ();
   
    $('#mobileNavMenu, #closeDrop').css('display', 'none');
    handleSCRL();
    
});

var cORY;
var oRYP = window.matchMedia('(orientation: portrait)');
var oRYL = window.matchMedia('(orientation: landscape)');

var cTheme = 'light';   //current theme
var dMQ = window.matchMedia("(prefers-color-scheme: dark)");
var lMQ = window.matchMedia("(prefers-color-scheme: light)");

var RD = $('.RDUS');

//FUNCTIONS COMMON REF


//Arrays
//dark/light
//makes browser light
//        theme     bg        border    txt         imgext  OptionsBG
var rAL = ['light', 'white',  'gray',    'black',   'dark', '#99c2ff'];
//makes browser dark
var rAD = ['dark', '#35363A', '#C3C3C3', 'white',   'light','#0047B3'];
//Dark Switching
//Determine

function determineTheme(DMC) {
    
    if ((lMQ.matches)) {
        if (!DMC || (DMC && (cTheme !== 'light'))) {
            themeSwitch(rAL);
        };
    } else if ((dMQ.matches)) {
        if (!DMC || (DMC && (cTheme !== 'dark'))) {
            themeSwitch(rAD);
        };
    };
};
//det
dMQ.addListener(function () {
    //if (cTheme !== 'dark') {
        determineTheme(true);
    //}
});
lMQ.addListener(function () {
    //if (cTheme !== 'light') {
        determineTheme(true);
    //}

});

//execute
function themeSwitch(pRA) {
    cTheme = pRA[0];
    console.log(cTheme);
    $('.BG').css('background-color', pRA[1]);
    $('.BRDR, .LIBRD').css('border-color', pRA[2]);
 

    $('.F2, .FA').css('color', pRA[3]);

    $('.SWP').each(function () {
        var link = $(this).attr('src').split('-');
    
        $(this).attr('src', link[0] + '-' + pRA[4] + '.svg');
    });
    $('#accessOptions').css('background-color', pRA[5]);
}

//media queries for breakpoints
$(window).on('resize', function () {
    cMQ();
});
//vars
var cDSP;
            //name  tooltip dsp     navitemdsp  dropdsp     btn       ?hideMB   fntF2        hgt        navMH       FMT FA
var sHR0 = ['sHR0',    'none',      'none',     'block',    'inline', false,    '1.8rem',    '1.8rem',  '0rem',     '.7rem'];
var sHR1 = ['sHR1',    'none',      'none',     'block',    'inline', false,    '1.8rem',    '1.8rem',  '0rem',     '.7rem'];
var sHR2 = ['sHR2',    'none',      'none',     'block',    'inline', false,    '1.8rem',    '1.8rem',  '0rem',     '.7rem'];
var sHR3 = ['sHR3',    'none',      'none',     'block',    'inline', false,    '',          '',        '3.375rem', ''];
var sHR4 = ['sHR4',    'none',      'flex',     'none',      'none',  true,     '',          '',        '3.375rem', ''];
var sHR99 = ['sHR99',  'block',     'flex',     'none',      'none',  true,     '',          '',        '3.375rem', ''];
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
        if (!$('#closeDrop').is(':visible')) {
            $('#openDrop').css('display', rEQ[4]);
        };
        //hide mobile
        if (rEQ[5]) {
            collapseMobileDrop('none');
        };
        //navbar font and image sizes
        RD.filter('.F2').css('font-size', rEQ[6]);
        RD.filter('.FA').css('font-size', rEQ[9]);

        RD.filter('.I2').css('height', rEQ[7]);
        //nav minheight
        $('.MinHeight').css('min-height', rEQ[8]);
        
    };
    //change padding
    determineOrientation(true);
};

//input handling
//click
//target array
var tRGRA = ['#openDrop', '#closeDrop'];
$(document).click(function (e) {
   
    var tar = $(e.target);
    //hits
    switch (clickReg(tar)) {
        case 0: //trg is opendrop
            $('#navbar').animate({"marginTop":0}, 175);
            $('#openDrop').css('display', 'none');
            $('#closeDrop').css('display', 'inline');



            
            $('#mobileNavMenu').slideDown(175);
            determineOrientation(true);
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
    if ($(window).scrollTop() == 0) {
        $('#navbar').animate({ "marginTop": $('#accessOptions').outerHeight() }, 175);
    };
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
$(window).scroll(function (event) {
    dSCRL = true;
});
setInterval(function () {
    if (dSCRL && !$('#closeDrop').is(':visible')) {
        handleSCRL();
    };
}, 400);
function handleSCRL() {
    if ($('#navbar').queue().length > 2) {
        $('#navbar').clearQueue();
    };
    var pos = $(this).scrollTop();
    if (pos <= 100) {
        if ($('#navbar').is(':visible')) {

            $('#accessOptions').show(0);
            $('#navbar').animate({
                "marginTop": $('#accessOptions').outerHeight(),
            }, 175)
        } else {
            $('#navbar').animate({ "marginTop": $('#accessOptions').outerHeight() }, 0, function () {

                $('#accessOptions, #navbar').slideDown(175);
            });
        };
    };
    if (pos > oldTop) {

        $('#accessOptions, #navbar').slideUp(175, function () {
            $('#navbar').css('margin-top', 0);
        });
    } else if (pos > 100) {

        $('#navbar').slideDown(175);
    };
    oldTop = pos;
    console.log(pos - oldTop);
    dSCRL = false;
};
//orientation
oRYP.addListener(function () {
    if (oRYP.matches) {
        determineOrientation(true);

    };
});
oRYL.addListener(function () {
    if (oRYL.matches) {
        determineOrientation(true);
    };
});
//mobile handler
function determineOrientation(proceed) {
    if (oRYP.matches) {
        cORY = 'Portrait'
    } else {
        cORY = 'Landscape'
    };
    if (proceed) {
        handleOrientation(cORY);
    };
};
function handleOrientation(oRYDATA) {
    if (oRYDATA == 'Portrait') {
        console.log('proc');
        setTimeout(function () {
            $('#mobileNavMenu').css('padding-top', $('#navbar').outerHeight());
            $('#mobileNavMenu').css('height', $(window).height() - $('#navbar').height());
        }, 10);
        
    } else {
        $('#mobileNavMenu').css('padding-top', 0);
        $('#mobileNavMenu').css('height', '100%');
    };
};
