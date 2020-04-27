// JavaScript source code
//init
$(document).ready(function () {
    $('#dropDownMenu').slideUp(0);
});

//Darkmode
var dMQ = window.matchMedia("(prefers-color-scheme: dark)"); 
var lMQ = window.matchMedia("(prefers-color-scheme: light)");
var rAL = ['white', 'black', 'gray', 'dark']
var rAD = ['#35363A', 'white', '#C3C3C3', 'light'];
var cTheme;
if (dMQ.matches) {
    themeSwitch(rAD);
};
dMQ.addListener(function () {
    themeSwitch(rAD);
});
lMQ.addListener(function () {
    themeSwitch(rAL);
});
//detect mobile re-entrance
$(document).ready(function () {
    if (dMQ.matches) {
        themeSwitch(rAD);
    } else if (lMQ.matches) {
        themeSwitch(rAL);
    };
});
$(document).on("pageshow", function () {
    if (dMQ.matches) {
        themeSwitch(rAD);
    } else if (lMQ.matches) {
        themeSwitch(rAL);
    };
});
//swap
function themeSwitch(pRA) {
    
    $('body').css({
        'backgroundColor': pRA[0],
        'color': pRA[1]
    });
    $('#navbar').css({
        'border-bottom-color': pRA[2],
        'backgroundColor': pRA[0]
    });
    $('.CSwap').each(function() {
        var link = $(this).attr('src').split('-');
        $(this).attr('src', link[0] + '-' + pRA[3] + '.svg');
    });
    cTheme = pRA[3];
};
//Breakpoints
//Vars in EM

var sHR0 = ['sHR0',     'none', true,   true, 0.25, 2.3];
var sHR1 = ['sHR1',     'none', true,   true, 0.25, 2];
var sHR2 = ['sHR2',     'none', true,   true, 0.25, 2.3];
var sHR3 = ['sHR3',     'none', true,   false, NaN, NaN];
var sHR4 = ['sHR4',     'none', false,  false, NaN, NaN];
var sHR99 = ['sHR99',   'block',false,  false, NaN, NaN];
var cSHR = [15, 20.63, 27.750, 49.875, 72];
                
var cDSP;
//init
$(document).ready(function () {
    cMQ();
});

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
            mRC(sHR99)
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
//make requested changes
function mRC(rEQ) {
    console.log(rEQ[0]);
    if (cDSP !== rEQ[0]) {
        cDSP = rEQ[0]
        //hide icon labels
        $('.NavItem > p').css('display', rEQ[1])
        //collapse to dropdown
        if (rEQ[2]) {
            $('#navigation').css('display', 'none');
            $('#dropDown').css('display', 'block');
            if (!$('#closeDrop').is(':visible')) {
                $('#openDrop').css('display', 'block');
                $('#closeDrop').css('display', 'none');
            };
            
        } else {
            $('#navigation').css('display', 'flex');
            $('#dropDown').css('display', 'none');
            $('#openDrop').css('display', 'none');
            $('#closeDrop').css('display', 'none');
            $('#dropDownMenu').slideUp();
        };
        //Adjust sizing
        if (rEQ[3]) {
            $('#navbarName').css('padding-left', rEQ[4] + 'rem');
            $('#title').css('font-size', rEQ[5] + 'rem');
            $('#logo').css('height', rEQ[5] + 'rem');
            $('#dropDown > img').css('height', rEQ[5]+'rem');
            $('#dropDown').css('padding-right', rEQ[4]+'rem');
            
        } else {
            $('#navbarName').css('padding-left', '');
            $('#title').css('font-size', '');
            $('#logo').css('height', '');
            $('#dropDown > img').css('height', '');
            $('#dropDown').css('padding-right', '');
        };
        

        
    };
    
};

//input handler
//resize
$(window).on('resize', function () {
    //Check mq
    cMQ();
});
//click
$(document).click(function (e) {
    trg = $(e.target);
    //openDrop
    if (trg.is('#openDrop')) {
        $('#openDrop').css('display', 'none');
        $('#closeDrop').css('display', 'block');
        $('#dropDownMenu').css('margin-top', $('#navbar').height());
        $('#dropDownMenu').slideDown();
  
    };
    if (trg.is('#closeDrop')) {
        $('#closeDrop').css('display', 'none');
        $('#openDrop').css('display', 'block');
        $('#dropDownMenu').slideUp();
    };
});