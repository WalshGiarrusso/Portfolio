lclStorage = window.localStorage;

$(document).ready(function(){
    //Initialize Site Colors
    if((lclStorage.getItem('bkgColor')) && (lclStorage.getItem('txtColor')) && (lclStorage.getItem('bdrColor')) && (lclStorage.getItem('icnColor'))){
            $('#backgroundColorInput').val(lclStorage.getItem('bkgColor'));
            $('#textColorInput').val(lclStorage.getItem('txtColor'));
            $('#borderColorInput').val(lclStorage.getItem('bdrColor'));
            if(lclStorage.getItem('icnColor') === 'dark'){
                $('#lightIconsCheckbox').prop("checked", false);
            }else{
                $('#darkIconsCheckbox').prop("checked", true);
            };
    }else if(window.matchMedia('(prefers-color-scheme:dark)').matches){
        $('#backgroundColorInput').val('#121212');
        $('#textColorInput').val('#ffffff');
        $('#borderColorInput').val('#ffffff');
        $('#lightIconsCheckbox').prop("checked", true);
        $('#darkIconsCheckbox').prop("checked", false);
       
    }else{
        $('#backgroundColorInput').val('#ffffff');
        $('#textColorInput').val('#000000');
        $('#borderColorInput').val('#000000');
        $('#lightIconsCheckbox').prop("checked", false);
        $('#darkIconsCheckbox').prop("checked", true);
    };
    //Initialize interactivity checkboxes
    if(lclStorage.getItem('reduceMotion') === 'true'){
        $('#reduceMotionCheckbox').prop('checked', true);
    }else{
        $('#reduceMotionCheckbox').prop('checked', false);
    };
        //Formstyling
    if(lclStorage.getItem('disableFS') === 'true'){
        $('#fSCheckbox').prop('checked', true);
    }else{
        $('#fSCheckbox').prop('checked', false);
    };
      

});
$('#maxContrastButton').click(function(){
    
    lclStorage.removeItem('bkgColor');
    lclStorage.removeItem('txtColor');
    lclStorage.removeItem('bdrColor');
    lclStorage.removeItem('icnColor');
    targetColors();
});
//handle site colors submission
$('#submitSiteColors').click(function(){
    //retrieve colors
    var bkgColor = $('#backgroundColorInput').val();
    var txtColor = $('#textColorInput').val();
    var bdrColor = $('#borderColorInput').val();
    if($('#lightIconsCheckbox').is(':checked')){
        var icnColor = 'light';
    }else{
        var icnColor = 'dark';
    };

    //check for errors
    if(checkErrors(bkgColor, txtColor, bdrColor, icnColor)){
        storeColors(bkgColor, txtColor, bdrColor, icnColor);
    };
    return false;
    
});
function checkErrors(bKC, tXC, bDC, iCC){
    $('#errorBox').empty();
    var bkgQtxt = checkContrast(bKC, tXC);
    var bkgQbdr = checkContrast(bKC, bDC);
    var tIC;
    if (iCC == 'light'){
        tIC = '#ffffff';
    }else{
        tIC = '#000000';
    }
    var bkgQicn = checkContrast(bKC, tIC);

    
    if((bkgQtxt >= 7 )&&(bkgQbdr >= 7)&&(bkgQicn >= 3)){
        return true;
    }else{
        $('#errorOverride').show();
        if (bkgQtxt < 7){
            $('#errorBox').append("<strong class='MarginIndent' >Warning: the text color and the background color have a low contrast ratio ("+bkgQtxt.toFixed(3)+") </strong>");
     
        };
        if(bkgQbdr < 7){
            $('#errorBox').append("<strong class='MarginIndent'>Warning: the border color and the background color have a low contrast ratio ("+bkgQbdr.toFixed(3)+")</strong>");
            
        };
        if(bkgQicn < 3){
            $('#errorBox').append("<strong class='MarginIndent'>Warning: the icon color and the background color have a low contrast ratio ("+bkgQicn.toFixed(3)+")</strong>");
         
        };
        $('#errorBox').append("<strong class='MarginIndent'>Try making one color brighter and the other color darker.</strong>");
        return false;
    };
};
$('#errorOverride').click(function(){
    var bkgColor = $('#backgroundColorInput').val();
    var txtColor = $('#textColorInput').val();
    var bdrColor = $('#borderColorInput').val();
    if($('#lightIconsCheckbox').is(':checked')){
        var icnColor = 'light';
    }else{
        var icnColor = 'dark';
    };
    storeColors(bkgColor, txtColor, bdrColor, icnColor);
    return false;

});
function storeColors(bKC, tXC, bDC, iCC){
  
    
    $('#errorOverride').hide();
    $('#errorBox').empty();
    lclStorage.setItem('bkgColor', bKC);
    lclStorage.setItem('txtColor', tXC);
    lclStorage.setItem('bdrColor', bDC);
    lclStorage.setItem('icnColor', iCC);
   
    targetColors();
};

//calculate contrasts
function checkContrast(c1, c2){

    

    var r81 = parseInt(c1.substr(1,2), 16);
    var g81 = parseInt(c1.substr(3,2), 16);
    var b81 = parseInt(c1.substr(5,2), 16);



    var r82 = parseInt(c2.substr(1,2), 16);
    var g82 = parseInt(c2.substr(3,2), 16);
    var b82 = parseInt(c2.substr(5,2), 16);

    var rs1 = (r81/255)
    var gs1 = (g81/255)
    var bs1 = (b81/255)

    var rs2 = (r82/255)
    var gs2 = (g82/255)
    var bs2 = (b82/255)

    var r1 = clRGB(rs1);
    var g1 = clRGB(gs1);
    var b1 = clRGB(bs1);

    var r2 = clRGB(rs2);
    var g2 = clRGB(gs2);
    var b2 = clRGB(bs2);

    //luminosity
    var lum1 = clLum(r1,g1,b1);
    var lum2 = clLum(r2,g2,b2);
    var l1;
    var l2;
    //calc contrast
    if(lum1 > lum2){
        l1 = lum1;
        l2 = lum2;

    }else{
        l1 = lum2;
        l2 = lum1;
    }
    var cr = ( l1 + 0.05 ) / ( l2 + 0.05 );
    return cr;
};
function clRGB(s) {
    var ret;
    if (s <= 0.03928){
        ret = s / 12.92;
        return ret;
    }else{
        ret = Math.pow( (( s + 0.055 )/1.055), 2.4 );
        return ret;
    };
};
function clLum(a, b, c){
    return (0.2126 * a) + (0.7152 * b) + (0.0722 * c);
};
//handle submit site interactivity
$('#submitSiteInteractivity').click(function(){
    //Reduce Motion
    if($('#reduceMotionCheckbox').is(':checked')){
        lclStorage.setItem('reduceMotion', 'true');
    
        checkMotionClasses();
       
    }else{
        lclStorage.setItem('reduceMotion', 'false');
    };
    if($('#fSCheckbox').is(':checked')){
        lclStorage.setItem('disableFS', 'true');
        checkFormStyling();
    }else{
        lclStorage.setItem('disableFS', 'false');
        checkFormStyling();
    };
    
});
//color input focus



