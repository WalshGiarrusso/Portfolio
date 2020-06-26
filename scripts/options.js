lclStorage = window.localStorage;
$('#submitSiteColors').click(function(e){
    
    var bkgColor = $('#backgroundColorInput').val();
    var txtColor = $('#textColorInput').val();
    var bdrColor = $('#borderColorInput').val();
    if($('#lightIconsCheckbox').is(':checked')){
        var icnColor = 'light';
    }else{
        var icnColor = 'dark';
    };
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
            $('#errorBox').append("<p>Warning: text and background have a low contrast ratio ("+bkgQtxt+") </p>")
        };
        if(bkgQbdr < 7){
            $('#errorBox').append("<p>Warning: borders and background have a low contrast ratio ("+bkgQbdr+") </p>")
        };
        if(bkgQicn < 3){
            $('#errorBox').append("<p>Warning: icons and background have a low contrast ratio ("+bkgQicn+") </p>")
        };
        return false;
    };
};
$('#errorOverride').click(function{
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
    lclStorage.setItem('hasPrefs', 'true');
    $('#errorOverride').hide();
    $('#errorBox').empty();
    lclStorage.setItem('bkgColor', bKC);
    lclStorage.setItem('txtColor', tXC);
    lclStorage.setItem('bdrColor', bDC);
    lclStorage.setItem('iCNColor', iCC);
    checkColors();
};
function checkContrast(c1, c2){

    var r1 = clRGB((parseInt(c1.substr(0,2), 16))/255);
    var g1 = clRGB((parseInt(c1.substr(2,2), 16))/255);
    var b1 = clRGB((parseInt(c1.substr(4,2), 16))/255);

    var r2 = clRGB((parseInt(c2.substr(0,2), 16))/255);
    var g2 = clRGB((parseInt(c2.substr(2,2), 16))/255);
    var b2 = clRGB((parseInt(c2.substr(4,2), 16))/255);

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
    var cr = ( L1 + 0.05 ) / ( L2 + 0.05 );
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
}

