// JavaScript source code

lclStorage = window.localStorage;

$(document).ready(function (){
    alert("This site is currently under construction. Visit http://walshgiarrusso.com/old-site/home for previous version of site.");

    checkHODO();

    checkFormStyling();

    targetColors();

    checkMotionClasses();

    setTextSpacing();

    checkTargetSizing();
   

    
    
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

    $(document.body).css({ 
        //background color
        "background-color": targets[0],
        //text color
        "color": targets[1]
    });
    //border color
    $('.BottomBorder, .TopBorder, .TB.FS, input.FS, select.FS').css('border-color', targets[2])
    
    //button colors
    $('.TB.FS, .CardDesc, .CardTitle').css({
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

    //special
    



    $(".TB.CFS:not(.FS)").css({
        "border-color":"rgb(132, 132, 132)",
        "background-color":"rgb(239, 239, 239)",
        "color":"black"
    });
};
//Reduce Motion

function checkMotionClasses(){
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
function checkFormStyling(){
    
    if(lclStorage.getItem('disableFS') === 'true'){
        $('.CFS').removeClass("FS");
        $(".TB.CFS:not(.FS)").css({
            "border-width":"1px",
            "border-color":"rgb(132, 132, 132)",
            "background-color":"rgb(239, 239, 239)",
            "color":"black"
        });
       
    }else{
        $('.CFS').addClass("FS");
        targetColors();
    };
};
//text spacing
function setTextSpacing(){
    $('*:not(kbd)').css({
        "letter-spacing":lclStorage.getItem('letterSpacing'),
        "word-spacing":lclStorage.getItem('wordSpacing')
    });
    $('p, a, h1, h2, h3, h4, h5, h6, .FB').css('line-height', lclStorage.getItem('lineSpacing'));
    $('main p, main h1, main h2, main h3, main h4, main h5, main h6, main .FB').css({
        "margin-bottom": (lclStorage.getItem('paragraphSpacing')*.5),
        "margin-top": (lclStorage.getItem('paragraphSpacing')*.5),
    });
};
//target sizing
function checkTargetSizing(){
    lclStorage.getItem('targetSizing') ? $('a, button, input, select').css({"min-width": lclStorage.getItem('targetSizing'),"min-height":  lclStorage.getItem('targetSizing')}) : $('a, button, input, select').css({"min-width":"2.75rem","min-height":"2.75rem"}); 
};

//Compare strings
function stringSim(s1, s2) {
    var lon = s1;
    var sho = s2;
    if (s1.length < s2.length) {
      lon = s2;
      sho = s1;
    }
    var lonLen = lon.length;
    if (lonLen == 0) {
      return 1.0;
    }
    return (lonLen - editDistance(lon, sho)) / parseFloat(lonLen);
};
function editDistance(s1, s2) {
    var costs = new Array();
    for (var i = 0; i <= s1.length; i++) {
      var lastValue = i;
      for (var j = 0; j <= s2.length; j++) {
        if (i == 0)
          costs[j] = j;
        else {
          if (j > 0) {
            var newValue = costs[j - 1];
            if (s1.charAt(i - 1) != s2.charAt(j - 1)){
              newValue = Math.min(Math.min(newValue, lastValue),
                costs[j]) + 1;
            };
            costs[j - 1] = lastValue;
            lastValue = newValue;
          };
        };
      };
      if (i > 0)
        costs[s2.length] = lastValue;
    };
    return costs[s2.length];
  };