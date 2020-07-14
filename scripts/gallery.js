$('#showFiltersButton').click(function(){
    $('#gallerySifterFilter').show();
    $(this).hide();
    return false;
    
});
$("#hideFiltersButton").click(function(){
    $('#gallerySifterFilter').hide();
    $('#showFiltersButton').show();
    return false;
});

$("#submitGalleryFilters").click(function(){
    var startDate = new Date($('#startDate').val());
    var endDate = new Date($('#endDate').val());
    var chosenType = $('#gallerySifterType').val();
    filterOut(startDate, endDate, chosenType);
    return false;
});
function filterOut(sD, eD, cT){
    $('.Card').each(function(){
        $(this).show();
    });
    if(cT !== "" && cT !== "all"){
        $('.Card').each(function(){
            if($(this).children('p').children('span').text().trim().toLowerCase() !== cT){
                $(this).hide();
            };
        });
    };
    if(sD != "Invalid Date"){
        $('.Card').each(function(){
            if(new Date($(this).children('p').children('time').attr('datetime')) < sD){
                $(this).hide();
            };
        });
    };
    if(eD != "Invalid Date"){
        $('.Card').each(function(){
            if(new Date($(this).children('p').children('time').attr('datetime')) > eD){
                $(this).hide();
            };
        });
    };
};

$('#submitGallerySearch').click(function(){
    handleSearch();
    return false;
});
function handleSearch(){
    var searchString = compareParse($('#gallerySearch').val());
    
    var matchString;

    $('.Card').each(function(){
        var coms = 0;
        matchString = compareParse($(this).children('h2').text());
      
        coms = parseInt(stringSim(searchString, matchString)*-1000);
        $(this).parent('li').css('order', coms);
    
    });
    
};
