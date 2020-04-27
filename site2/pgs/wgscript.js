// JavaScript source code

//Darkmode
var dMQ = window.matchMedia("(prefers-color-scheme: dark)"); 
var lMQ = window.matchMedia("(prefers-color-scheme: light)");
var rAL = ['white', 'black', 'gray', 'dark']
var rAD = ['#35363A', 'white', '#C3C3C3', 'light'];
if (dMQ.matches) {
    themeSwitch(rAD);
}
dMQ.addListener(function () {
    themeSwitch(rAD);
});
lMQ.addListener(function () {
    themeSwitch(rAL);
});
function themeSwitch(pRA) {
    
    $('body').css({
        'backgroundColor': pRA[0],
        'color': pRA[1]
    });
    $('#navbar').css('border-bottom-color', pRA[2]);
    $('.CSwap').each(function() {
        var link = $(this).attr('src').split('-');
        $(this).attr('src', link[0] + '-' + pRA[3] + '.svg');
    });
};
//Breakpoints
//Vars in EM

var sHR0 = ['sHR0',     'none', true,   true, 0.25, 2.3];
var sHR1 = ['sHR1',     'none', true,   true, 0.25, 2.3];
var sHR2 = ['sHR2',     'none', true,   true, 0.25, 2.3];
var sHR3 = ['sHR3',     'none', true,   false, NaN, NaN];
var sHR4 = ['sHR4',     'none', false,  false, NaN, NaN];
var sHR99 = ['sHR99',   'block',false,  false, NaN, NaN];
var cSHR = [15, 20, 26.125, 49.875, 72];
                
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
        } else {
            $('#navigation').css('display', 'flex');
            $('#dropDown').css('display', 'none');
        };
        //Adjust sizing
        if (rEQ[3]) {
            $('#navbar').css('padding', '0 ' + rEQ[4] + 'rem');
            $('#title').css('font-size', rEQ[5] + 'rem');
            $('#logo').css('height', rEQ[5] + 'rem');
            $('#openDrop').css('height', rEQ[5] + 'rem');
        } else {
            $('#navbar').css('padding', '');
            $('#title').css('font-size', '');
            $('#logo').css('height', '');
            $('#openDrop').css('height', '');
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
        //do the drop
    };
});