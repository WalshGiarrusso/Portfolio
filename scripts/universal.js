// JavaScript source code

lclStorage = window.localStorage;

$(document).ready(function (){
    alert("This site is currently under construction. Visit http://walshgiarrusso.com/old-site/home for previous version of site.");

    checkHODO();

    targetColors();

    removeMotionClasses();

    checkFormStyling();

    
    
});

//Input Handling
    //Clicks

$(document).click(function(e){
    var trg = e.target;

    //passes event target through a function to figure out what to do
    switch(checkTarget(trg)){
        case 0:
            //hide the header options
            $('#optionsBar').slideUp(250, function(){
                $('#optionsBarWrapper').css('border-bottom-style', 'none');
            });
            
            break;
        case 1:
            //show the header options
        
            $('#optionsBar').slideDown(250);
            $('#optionsBarWrapper').css({"border-bottom-style": "solid", "border-bottom-width":"1px"});
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
           // console.log(targetsArr[i])
            return i;
        };
    };

};

//Check Header Options Draw On/Off
function checkHODO(){
    var dHO = lclStorage.getItem('drawHO'); 

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
        $('#mobileMenuButton > img').attr("src", "icons/open-"+lclStorage.getItem('icnColor')+".svg");
        $('#mobileMenuLabel').text('Open Menu');
        $('#mobileMenuButton').attr('title', 'Open Menu');


    }else{
        $('#mobileMenu ').show();
        $('#mobileMenuButton > img').attr("src", "icons/close-"+lclStorage.getItem('icnColor')+".svg");
        $('#mobileMenuLabel').text('Close Menu');
        $('#mobileMenuButton').attr('title', 'Close Menu');
    };
});
    

mqMM = window.matchMedia('(min-width:32.250em)');
mqMM.addListener(function(){
    $('#mobileMenuButton').attr('title', 'Open Menu');
    $('#mobileMenu').hide();
    $('#mobileMenuButton > img').attr("src", "icons/open-"+lclStorage.getItem('icnColor')+".svg");
    $('#mobileMenuLabel').text('Open Menu');
});


//colors
mqC1 = window.matchMedia('(prefers-color-scheme:dark)');
mqC2 = window.matchMedia('(prefers-color-scheme:light)');
mqC1.addListener(function(){
    targetColors();
});
mqC2.addListener(function(){
    targetColors(); 
});
function targetColors(){
    
    var colorSends = [];
  
    if( (lclStorage.getItem('icnColor') === null) || ((lclStorage.getItem('bkgColor') === null)) || ((lclStorage.getItem('txtColor') === null)) || ((lclStorage.getItem('bdrColor') === null))){
        if(window.matchMedia('(prefers-color-scheme:dark)').matches){
            colorSends = ['#121212', '#ffffff', '#ffffff', 'light'];
        }else{
            colorSends = ['#ffffff', '#000000', '#000000', 'dark'];

        };
    }else{
        colorSends = [lclStorage.getItem('bkgColor'), lclStorage.getItem('txtColor'), lclStorage.getItem('bdrColor'), lclStorage.getItem('icnColor')];

    };
    changeColors(colorSends);
};
function changeColors(targets){
    lclStorage.setItem('icnColor', targets[3]);

    $(document.body).not('.ContainsFormStyling').add('.ContainsFormStyling.FormStyling').css({ 
        //background color
        "background-color": targets[0],
        //text color
        "color": targets[1]
    });
    //border color
    $('.BottomBorder, .TopBorder, input[type=color], input[type=radio], input[type=checkbox]').css('border-color', targets[2])
    //button colors
    $('.TrueButton.FormStyling').css({
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
//Reduce Motion

function removeMotionClasses(){
    
    if(lclStorage.getItem('reduceMotion') === "true"){
     
        $('[class*="_hover"]').each(function(){
          
            var remElem = $(this); 
            var remCand= $(this).attr('class').split(/\s+/);
            for(i = 0; i < remCand.length ;i++){
               
                if(/\w*_hover/gm.test(remCand[i])){
                   $(remElem).removeClass(remCand[i]);
                
                  
                };
            };
        });
    };
};
//form styling
function checkFormStyling(){
    if(lclStorage.getItem('disableFormStyling') === "true"){
        $('.FormStyling').css({
            "background-color":"",
            "color":""
        });
        $('.ContainsFormStyling').removeClass('FormStyling');
        
    }else{
        $('.ContainsFormStyling').not('.FormStyling').addClass('FormStyling');
    };

};