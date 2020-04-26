// JavaScript source code

//Darkmode
var dMQ = window.matchMedia("(prefers-color-scheme: dark)"); 
var lMQ = window.matchMedia("(prefers-color-scheme: light)");
if (dMQ.matches) {
    themeSwitch('dark');
}
dMQ.addListener(function () {
    themeSwitch('dark');
});
lMQ.addListener(function () {
    themeSwitch('light');
});

function themeSwitch(theme) {
    if (theme == 'dark') {

    } else {

    }
};