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

           // console.log("i: "+i);
           // console.log("length: "+postArr.length);
           // console.log("truth: "+(i > postArr.length));
    
        if(i >= postArr.length){
            //make sure this works properly
            $('.ArticleWrapper').eq(v).hide();
        }else{
            $(".ArticleTitle").eq(v).text(postArr[i].title);
            $(".ArticleDesc").eq(v).text(postArr[i].desc);

            //do it for article link here
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
    var searchString = $('#submitArticleSearch').val().trim().toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '');
    $.getJSON(base + "data/blogPosts.json", function(data){
        data.sort(function(a,b){
            var aScore = stringSim(searchString, a.title.trim().toLowerCase().replace(/[^a-zA-Z0-9 ]/g, ''));
            var bScore = stringSim(searchString, b.title.trim().toLowerCase().replace(/[^a-zA-Z0-9 ]/g, ''));
            if(aScore < bScore){
                return -1;
            }else if(aScore > bScore){
                return 1;
            }else{
                return 0;
            };
        });
        populateContent(curPageNum, data.posts);
    });
    return false;
});


//.trim().toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '');

//testing purposes only
$(document).click(function(){

    $.getJSON(base + "data/blogPosts.json", function(data){
        
    });

});