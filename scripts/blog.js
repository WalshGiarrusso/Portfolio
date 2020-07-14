var base = $('head base').attr('href');


$.getJSON(base + "data/blogPosts.json", function(data){

    
    console.log(data.posts[1].example);
});






//testing purposes only
$(document).click(function(){

    $.getJSON(base + "data/blogPosts.json", function(data){
        
    });

});