var base = $('head base').attr('href');
var curPageNum = 1;
var maxPageNum;
var stored;

$(document).ready(function(){
    $.getJSON(base + "data/blogPosts.json", function(data){
        maxPageNum = Math.ceil((data.posts.length/10));
        populateContent(curPageNum, data.posts);
    });
});


function populateContent(pageNum, postArr){
    $('.ArticleWrapper').show();
            
    for(i = ((pageNum-1)*10), v = 0; v < 10; i++, v++){
    
        if(i >= postArr.length){
            $('.ArticleWrapper').eq(v).hide();
        }else{
            switch(checkLang()){
                case 0:
                    $(".ArticleTitle").eq(v).text(postArr[i].title);
                    $(".ArticleDesc").eq(v).text(postArr[i].desc);
                    if($('title').text().substring(0,5) == "Clear"){
                        $(".ArticleLink").eq(v).attr("href", 'clear/'+postArr[i].link);
                    }else{
                        $(".ArticleLink").eq(v).attr("href", postArr[i].link);
                    }
                    break;
                case 1:
                    $(".ArticleTitle").eq(v).text(postArr[i].estitle);
                    $(".ArticleDesc").eq(v).text(postArr[i].esdesc);
                    $(".ArticleLink").eq(v).attr("href", postArr[i].eslink);
                    break;
                default:
                    $(".ArticleTitle").eq(v).text(postArr[i].title);
                    $(".ArticleDesc").eq(v).text(postArr[i].desc);
                    if($('title').text().substring(0,5) == "Clear"){
                        $(".ArticleLink").eq(v).attr("href", 'clear/'+postArr[i].link);
                    }else{
                        $(".ArticleLink").eq(v).attr("href", postArr[i].link);
                    }
            }           
        };
    };
    stored = postArr;
};

//page functionality
$('#articlePgBackBtn').click(function(){
    if(curPageNum > 1){
        curPageNum--;
        $('#articlePageNumber').text(curPageNum);
        populateContent(curPageNum, stored);
    };
});
$('#articlePgFwdBtn').click(function(){
    if(curPageNum < maxPageNum){
        curPageNum++;
        $('#articlePageNumber').text(curPageNum);
        populateContent(curPageNum, stored);
    };
});
//search functionality

$('#submitArticleSearch').click(function(){

    var searchString = compareParse($("#articleSearch").val());
    

    $.getJSON(base + "data/blogPosts.json", function(data){
        data.posts.sort(function(a,b){

            var aTitle
            var bTitle

            switch(checkLang()){
                case 0:
                    aTitle = compareParse(a.title);
                    bTitle = compareParse(b.title);
                    break;
                case 1:
                    aTitle = compareParse(a.estitle);
                    bTitle = compareParse(b.estitle);
                    break;
            };
            var aScore = stringSim(searchString, aTitle);
            var bScore = stringSim(searchString, bTitle);
          
            if(aScore < bScore){
                return 1;
            }else if(aScore > bScore){
                return -1;
            }else{
                return 0;
            };
        });
        curPageNum = 1;
        $('#articlePageNumber').text(curPageNum);
        populateContent(curPageNum, data.posts);
    });
    return false;
});

