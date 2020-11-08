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
            $('.Card').parent('li').eq(v).hide();
        }else{
            switch(checkLang()){
                case 0:
                    $('.CardTitle').eq(v).text(cardArr[i].title);
                    $('.CardImage').eq(v).attr({
                        "src": cardArr[i].imgSrc,
                        "alt": cardArr[i].imgAlt
                    });
                    $('.CardType').eq(v).text(cardArr[i].type);
                    $('.CardTime').eq(v).attr("datetime", cardArr[i].iDate).text(cardArr[i].eDate);
                    if($('title').text().substring(0,5) == "Clear"){
                        $('.Card').eq(v).attr("href", 'clear/'+cardArr[i].link);
                    }else{
                        $('.Card').eq(v).attr("href", cardArr[i].link);
                    }
                    break;
                case 1:
                    $('.CardTitle').eq(v).text(cardArr[i].estitle);
                    $('.CardImage').eq(v).attr({
                        "src": cardArr[i].imgSrc,
                        "alt": cardArr[i].esalt
                    });
                    $('.CardType').eq(v).text(cardArr[i].estype);
                    $('.CardTime').eq(v).attr("datetime", cardArr[i].iDate).text(cardArr[i].eDate);
                    $('.Card').eq(v).attr("href", cardArr[i].eslink);
                    break;
                
            }
            
        };
    };
    storedArr = cardArr;

};
//filter func
$("#submitGalleryFilters").click(function(){
    $('#gallerySearch').val('');
    var startDate = new Date($('#startDate').val());
    var endDate = new Date($('#endDate').val());
    var chosenType = $('#gallerySifterType').val();
    var opArray;
    $.getJSON(baseUrl + "data/galleryCards.json", function(data){
        opArray = data.cards;
        $(data.cards).each(function(){


            if(chosenType !== "" && chosenType !== "all"){
                switch(checkLang()){
                    case 0:
                        if(this.type.toLowerCase() !== chosenType){
                            opArray.splice($(opArray).index(this),1);
                        }
                        break;
                    case 1:
                        if(this.estype.toLowerCase() !== chosenType){
                            opArray.splice($(opArray).index(this),1);
                        }
                        break;

                }
                
            };
        });
        $(opArray).each(function(){
            var cD = new Date(this.iDate);
            if((cD < startDate) || (cD > endDate)){
                opArray.splice($(opArray).index(this),1);
            };
        });
        cPageNum = 1;
        $('#selPageNum').text(cPageNum);
        populateGallery(cPageNum, opArray);

    });
    return false;
});


//page functionality
$('#galleryPgBackBtn').click(function(){
    if(cPageNum > 1){
        cPageNum--;
        $('#selPagNum').text(cPageNum);
        populateGallery(cPageNum, storedArr);
    };
});
$('#galleryPgFwdBtn').click(function(){
    if(cPageNum < mPageNum){
        cPageNum++;
        $('#selPagNum').text(cPageNum);
        populateGallery(cPageNum, storedArr);
    };
});

//search func

$('#submitGallerySearch').click(function(){

    var searchStr = compareParse($("#gallerySearch").val());
    storedArr.sort(function(a,b){
        var aTi = compareParse(a.title);
        var bTi = compareParse(b.title);
        var aScr = stringSim(searchStr, aTi);
        var bScr = stringSim(searchStr, bTi);
        if(aScr < bScr){
            return 1;
        }else if(aScr > bScr){
            return -1;
        }else{
            return 0;
        };
        
    });
    cPageNum = 1;
    $('#selPageNum').text(cPageNum);
    populateGallery(cPageNum, storedArr);
    return false;
});