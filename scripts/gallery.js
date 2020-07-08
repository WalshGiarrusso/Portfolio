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
    var searchString = $('#gallerySearch').val().trim().toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '');
    var searchWords = searchString.split(' ');
    var matchString;
    var matchWords;
    $('.Card').each(function(){
        var coms = 0;
        matchString = $(this).children('h2').text().trim().toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '');
        matchWords = matchString.split(" ");
        coms = parseInt(((findCommons(searchWords, matchWords).length * stringSim(searchString, matchString)))*-1000);
        $(this).parent('li').css('order', coms);
    
    });
    
};
function findCommons(arr1, arr2) {
    var ret = [];
    ret = arr1.filter(value => arr2.includes(value));
    return ret;
};
function stringSim(s1, s2) {
    var lon = s1;
    var sho = s2;
    if (s1.length < s2.length) {
      lon = s2;
      sho = s1;
    }
    var lonLen = lon.length;
    if (lonLen == 0) {
      return 1.0;
    }
    return (lonLen - editDistance(lon, sho)) / parseFloat(lonLen);
  };
  function editDistance(s1, s2) {
    var costs = new Array();
    for (var i = 0; i <= s1.length; i++) {
      var lastValue = i;
      for (var j = 0; j <= s2.length; j++) {
        if (i == 0)
          costs[j] = j;
        else {
          if (j > 0) {
            var newValue = costs[j - 1];
            if (s1.charAt(i - 1) != s2.charAt(j - 1))
              newValue = Math.min(Math.min(newValue, lastValue),
                costs[j]) + 1;
            costs[j - 1] = lastValue;
            lastValue = newValue;
          }
        }
      }
      if (i > 0)
        costs[s2.length] = lastValue;
    }
    return costs[s2.length];
  }