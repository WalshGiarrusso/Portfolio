// JavaScript source code

lclStorage = window.localStorage;

$(document).ready(function (){
    alert("This site is currently under construction. Visit http://walshgiarrusso.com/old-site/home for previous version of site.");

    checkHODO();


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
        default:
            //
            break;
    };
});
//array list of targets for checktarget function
var targetsArr = ["#hideHeaderOptions", "#showHeaderOptions", "#hideHOByDefault", "#showHOByDefault"]

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