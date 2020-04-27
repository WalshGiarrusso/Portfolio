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
    $('#logo').attr('src', 'https://walshgiarrusso.com/site2/ic/logo-'+pRA[3]+'.svg')
    $('.NavItem').children('img').each(function () {
        var link = $(this).attr('src').split('-');
        $(this).attr('src', link[0]+'-'+pRA[3]+'.svg');
        
    });
};
//Navbar

//Breakpoints
var testMQ = window.matchMedia("(max-width:78.250em)");
var testMQ2 = window.matchMedia("(max-width:56.25em)");
var testMQ3 = window.matchMedia("(max-width:31.25em)");
$(window).on('resize', function () {
    testQueries();
    
});
$(document).ready(function() {
    testQueries();
});
function testQueries() {
    if (testMQ.matches) {
        $('.NavItem').children('p').css('display', 'none');
    } else {
        $('.NavItem').children('p').css('display', 'block');
    };
    if (testMQ2.matches) {
        $('#navbar').css({
            'justify-content': 'center',
            'paddingBottom': '0.4rem',
        });

    } else {
        $('#navbar').css({
            'justify-content': '',
            'paddingBottom': '',
        });
    };
    if (testMQ3.matches) {
        $('#title > br').css('display', 'block');
        $('#title').css('font-size', '20vw');
        $('#logo').css({
            'height': '20vw',
            'marginRight': '-.5vw'
        });
        $('.NavItem > img').css({
            'padding': '0 2vw',
            'height': '14vw'
        });

    } else {
        $('#title > br').css('display', 'none');
        $('#title').css('font-size', '');
        $('#logo').css({
            'height': '',
            'marginRight': ''
        });
        $('.NavItem > img').css({
            'padding': '',
            'height': ''
        });
    };
};