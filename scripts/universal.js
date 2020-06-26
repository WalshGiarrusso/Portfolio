// JavaScript source code

lclStorage = window.localStorage;

$(document).ready(function (){
    alert("This site is currently under construction. Visit http://walshgiarrusso.com/old-site/home for previous version of site.");

    checkHODO();

    checkColors();

    
    
});

//Input Handling
    //Clicks

$(document).click(function(e){
    var trg = e.target;

    //passes event target through a function to figure out what to do
    switch(checkTarget(trg)){
        case 0:
            //hide the header options
            $('#optionsBar').slideUp(250);
            $('#optionsBarWrapper').css('border-bottom', 'none');
            break;
        case 1:
            //show the header options
        
            $('#optionsBar').slideDown(250);
            $('#optionsBarWrapper').css('border-bottom', '1px solid black');
            break;
        case 2:
            //hide the header options by default
            $('#optionsBarWrapper').css('border-bottom', 'none');
            $('#optionsBar').slideUp(250, function(){
                lclStorage.setItem('drawHO', 'false');
                checkHODO();
            });
            break;
        case 3:
            //show the header options by default
            lclStorage.setItem('drawHO', 'true');
            checkHODO();
            break;
        case 4:
            //
            break;
        default:
            //
            break;
    };
});
//array list of targets for checktarget function
var targetsArr = ["#hideHeaderOptions", "#showHeaderOptions", "#hideHOByDefault", "#showHOByDefault", "#mobileMenuButton"]

function checkTarget(target){
    for(i = 0 ; i < targetsArr.length; i++){
        //check target, and return if a match
        if($(target).is(targetsArr[i])){
            console.log(targetsArr[i])
            return i;
        };
    };

};

//Check Header Options Draw On/Off
function checkHODO(){
    var dHO = lclStorage.getItem('drawHO'); 
    console.log(dHO);
    if(dHO == 'false'){
        $('#hideHOList').addClass("Hidden");
        $('#showHOList').removeClass("Hidden");
        $('#optionsBar').hide();
        $('#optionsBarWrapper').css('border-bottom', 'none');
    }else{
        $('#showHOList').addClass("Hidden");
        $('#hideHOList').removeClass("Hidden");
    }
};


//Hide MobileMenu

$('#mobileMenuButton').click(function(){
    if($('#mobileMenu').is(':visible')){
        $('#mobileMenu').hide();
        $('#mobileMenuButton > img').attr("src", "icons/open-dark.svg");
        $('#mobileMenuButton > span').text('Open Menu');
        $('#mobileMenuButton').attr('title', 'Open Menu');


    }else{
        $('#mobileMenu ').show();
        $('#mobileMenuButton > img').attr("src", "icons/close-dark.svg");
        $('#mobileMenuButton > span').text('Close Menu');
        $('#mobileMenuButton').attr('title', 'Close Menu');
    };
});
    

mqMM = window.matchMedia('(min-width:30em)');
mqMM.addListener(function(){
    $('#mobileMenuButton').attr('title', 'Open Menu');
    $('#mobileMenu').hide();
    $('#mobileMenuButton > img').attr("src", "icons/open-dark.svg");
    $('#mobileMenuButton > span').text('Open Menu');
});


//colors
mqC1 = window.matchMedia('(prefers-color-scheme:dark)');
mqC2 = window.matchMedia('(prefers-color-scheme:light)');
mqC1.addListener(function(){
    targetColors(false);
});
mqC2.addListener(function(){
    targetColors(false); 
});
function checkColors(){
    console.log('has prefs:' + lclStorage.getItem('hasPrefs') );
    if(lclStorage.getItem('hasPrefs') == true){
        targetColors(true);

    }else{ 
        targetColors(false);
    };
};
function targetColors(useCustoms){
    console.log('usecustoms: '+useCustoms)
    var colorSends = [];
    if(useCustoms){
        colorSends = [lclStorage.getItem('bkgColor'), lclStorage.getItem('txtColor'), lclStorage.getItem('bdrColor'), lclStorage.getItem('icnColor')];
        changeColors(colorSends);
        return;
    };
    
    if(window.matchMedia('(prefers-color-scheme:dark)').matches){
        //colorSends = ['#121212', '#ffffff', '#ffffff', 'light'];
    }else{
        console.log('1');
        //colorSends = ['#ffffff', '#000000', '#000000', 'dark'];
    };
    changeColors(colorSends);
};
function changeColors(targets){
    console.log(targets);

    $(document.body).css({ 
        //background color
        "background-color": targets[0],
        //text color
        "color": targets[1]
    });
    //border color
    $('.BottomBorder, .TopBorder, input[type=color], input[type=radio]').css('border-color', targets[2])
    //button colors
    $('.TrueButton').css({
        "background-color": targets[1],
        "color": targets[0]
    });
    //icon colors
    $('.Swap').each(function(){
        var link = $(this).attr('src').split('-');
        $(this).attr('src', link[0] + '-'+ targets[3] +'.svg');
    });
    //focus indicator
    $('*:focus, *').css('outline-color', targets[2]);
}