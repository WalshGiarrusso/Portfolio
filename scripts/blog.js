 var base = $('head base').attr('href');


$.getJSON(base + "data/blogPosts.json", function(data){
    console.log(data);
});