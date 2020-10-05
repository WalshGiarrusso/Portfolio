$('#submitVariantSelection').click(function(){
    var val = $('#variantSelector').val();
    $('.HrefTarget').attr('href', (val !== "" ? val : $(this).attr('href')));
    $('.SrcTarget').attr('src', (val !== "" ? val : $(this).attr('src')));
});
$('#fitPageButton').click(function(){
    $('#contentImage').css({
        "max-height":"100vh",
        "max-width":"100%"
    });
    $(this).hide();
    $('#realSizeButton').show();
});
$('#realSizeButton').click(function(){
    $('#contentImage').css({
        "max-height":"",
        "max-width":"80%"
    });
    $(this).hide();
    $('#fitPageButton').show();
});