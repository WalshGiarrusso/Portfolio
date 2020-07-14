var base = $('head base').attr('href');
var curPageNum = 1;
var maxPageNum;

$(document).ready(function(){
    $.getJSON(base + "data/blogPosts.json", function(data){

        populateContent(curPageNum, data);
    });
});


function populateContent(pageNum, postArr){
    $('.ArticleWrapper').show();
    
    for(i = ((pageNum-1)*10), v = 0; v < 10; i++, v++){
        if(i > postArr.length){
            //make sure this works properly
            $('.ArticleWrapper').eq(v).hide();
        }else{
            $(".ArticleTitle").eq(v).text(postArr[i].title);
            $(".ArticleDesc").eq(v).text(postArr[i].desc);

            //do it for article link here
        };
       
    };

};

//page functionality


//search functionality


$.getJSON(base + "data/blogPosts.json", function(data){
    console.log(data.posts[1].title);
});

//testing purposes only
$(document).click(function(){

    $.getJSON(base + "data/blogPosts.json", function(data){
        
    });

});