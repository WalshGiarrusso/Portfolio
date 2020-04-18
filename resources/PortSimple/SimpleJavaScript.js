//design-only vars
var cSHR0 = 1050;
var cSHR1 = 800;
var cSHR2 = 640;
                                //Init
var sbGT = 15;
var cDSP;
$(document).ready(function () {
    //init
    cMQ();
});

//Change Request Arrays
var sHR0A = ['sHR0', 15, 3, 2.2, 1.8];
var sHR1A = ['sHR1', 25, 5, 3.67, 3];
var sHR2A = ['sHR2', 35, 7, 5.13, 4.2];

function cMQ() {
    $('body').css('background', 'rgb(255,255,255)');
   
    if (!(window.matchMedia('(max-width:' + cSHR0 + 'px)').matches)) {
        mRC(sHR0A);
        console.log('toSHR0');
    } else if (!(window.matchMedia('(max-width:' + cSHR1 + 'px)').matches)) {
        mRC(sHR1A);
        console.log('toSHR1');
    } else if (!(window.matchMedia('(max-width:' + cSHR2 + 'px)').matches)) {
        mRC(sHR2A);
        console.log('toSHR2');
    } else {
        console.log('?? toNano');
        $('body').css('background', 'rgb(255,183,183)');

    };
};
function mRC(rEQ){
    if (cDSP !== rEQ[0]) {
        cDSP = rEQ[0];
        //sidebar
        sbGT = rEQ[1];
        if ($('.SidebarOverlay').is(':visible')) {
            $('.Sidebar').css('width', sbGT + '%');
        };
        //font sizes
            //sidebar
        $('.Icon').css('fontSize', rEQ[2] + 'vw');
        $('#sidebarHeader').css('fontSize', rEQ[3] + 'vw');
        $('.SidebarNavLink').css('fontSize', rEQ[4] + 'vw');
    };
};




                                //check MQ

                            //InputHandler
//resize
$(window).on('resize', function () {
    //check Mq
    cMQ();
});
//click
$(document).click(function (e) {
    var trg = $(e.target);
    //trigger sidebar collapse
    if ($('.SidebarOverlay').is(':visible') && (trg.parent().is('#closeSidebar') || trg.is('.SidebarOverlay'))){
        colSB();
    };
});
//keyup
$(document).keyup(function (e) {
    var key = event.key;
    //trigger sidebar collapse
    if ( $('.SidebarOverlay').is(':visible') && (key === 'Escape') ) {
        colSB();
    };
});

                            //Sidebar
//Open
$('#openSidebar').click(function () {
    $('.Sidebar').css('width', sbGT + '%');
    $('.SidebarOverlay').fadeTo(500, 1);
    
});
//Collapse
function colSB() {
    if ($('.Sidebar, .SidebarOverlay').is(':animated')) {
        $('.Sidebar, .SidebarOverlay').stop(true, false);
    };

    $('.Sidebar').css('width', '0');
    $('.SidebarOverlay').fadeTo(500, 0).promise().done(function () {
        $(this).hide();
    });
};

