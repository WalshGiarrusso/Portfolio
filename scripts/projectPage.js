$('#submitVariantSelection').click(function(){
    var val = $('#variantSelector').val();
    $('.HrefTarget').attr('href', (val !== "" ? val : $(this).attr('href')));
    $('.SrcTarget').attr('src', (val !== "" ? val : $(this).attr('src')));
});
function setDims(){
    rt = parseInt($(":root").css('font-size').replace(/\D/g, ''));
    ht = ((0.9 * $(window).height()) / rt)
    wt = ((0.9 * $(window).width()) / rt)
    $('#contentImage').css({
        "max-height": (ht + "rem"),
        "max-width": (wt + "rem")
    });
};
$('#fitPageButton').click(function(){
    setDims();
});
$(document).ready(function(){

    setDims();
});


