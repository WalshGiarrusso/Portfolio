var cPageNum = 1;
var mPageNum;
var storedArr;
var baseUrl = $('head base').attr('href');

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

//$("#submitGalleryFilters").click(function(){
//    var startDate = new Date($('#startDate').val());
//    var endDate = new Date($('#endDate').val());
//    var chosenType = $('#gallerySifterType').val();
//    filterOut(startDate, endDate, chosenType);
//    return false;
//});
//function filterOut(sD, eD, cT){
//    $('.Card').each(function(){
//        $(this).show();
//    });
//    if(cT !== "" && cT !== "all"){
//        $('.Card').each(function(){
//            if($(this).children('p').children('span').text().trim().toLowerCase() !== cT){
//                $(this).hide();
//            };
//        });
//    };
//    if(sD != "Invalid Date"){
//        $('.Card').each(function(){
//            if(new Date($(this).children('p').children('time').attr('datetime')) < sD){
//                $(this).hide();
//            };
//        });
//    };
//    if(eD != "Invalid Date"){
//        $('.Card').each(function(){
//            if(new Date($(this).children('p').children('time').attr('datetime')) > eD){
//                $(this).hide();
//            };
//        });
//    };
//};

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


//shift

$(document).ready(function(){
    $.getJSON(baseUrl + "data/galleryCards.json", function(data){
        
        populateGallery(cPageNum, data.cards);
    });
});

function populateGallery(pageNumber, cardArr){
    
    $('.Card').parent('li').show();

    mPageNum = Math.ceil((cardArr.length/6));
    
    for(i = ((pageNumber-1)*6), v = 0; v < 6; i++, v++){
        if(i >= cardArr.length){

            
            
            console.log('go');



            $('.Card').parent('li').eq(v).hide();
        }else{

            console.log('i:' +i +' '+cardArr[i].title+' '+cardArr[i].type);


            $('.CardTitle').eq(v).text(cardArr[i].title);
            $('.CardImage').eq(v).attr({
                "src": cardArr[i].imgSrc,
                "alt": cardArr[i].imgAlt
            });
            $('.CardType').eq(v).text(cardArr[i].type);
            $('.CardTime').eq(v).attr("datetime", cardArr[i].iDate).text(cardArr[i].eDate);
            $('.Card').eq(v).attr("href", cardArr[i].link);
        };
    };
    storedArr = cardArr;

};
//filter func
$("#submitGalleryFilters").click(function(){
    var startDate = new Date($('#startDate').val());
    var endDate = new Date($('#endDate').val());
    var chosenType = $('#gallerySifterType').val();
    var opArray;
    $.getJSON(baseUrl + "data/galleryCards.json", function(data){
        opArray = data.cards;
       
        $(data.cards).each(function(){
            if(chosenType !== "" && chosenType !== "all" && this.type.toLowerCase() !== chosenType){
                opArray.splice($(opArray).index(this),1);
            };
        });
        
        $(opArray).each(function(){
            var cD = new Date(this.iDate);
            if((cD < startDate) || (cD > endDate)){
                opArray.splice($(opArray).index(this),1);
            };
        });

        populateGallery(1, opArray);

    });
    return false;
});