function getImage(title) {
  var requestURI = "https://crossorigin.me/https://en.wikipedia.org/w/api.php?action=query&titles=" + title + "&prop=pageimages&format=json&pithumbsize=100";
  $.getJSON(requestURI, function(json) {
    return json.query.pages[0].thumbnail.source;
  });
}

function generateResults(searchURI) {
  $.ajax({
    url: searchURI,
    success: function(json) {
      document.getElementById("searchResults").innerHTML = "";
      var resultsDiv = document.getElementById("searchResults");
      var ul = document.createElement('ul'); // create an arbitrary ul element

      var searchTerm = json[0],
          titleArray = json[1],
          descriptionArray = json[2],
          linksArray = json[3];

      document.getElementById("searchHeader").innerHTML = "Search results for <strong>" + searchTerm + "</strong>";

      for(var key in titleArray) {
        var li = document.createElement('li'),
            itemDiv = document.createElement('div'),
            titleDiv = document.createElement('div'),
            descriptionDiv = document.createElement('div'),
            p = document.createElement('p'),
            title = document.createTextNode(titleArray[key]),
            description = document.createTextNode(descriptionArray[key]),
            itemLink = document.createElement('a');

        itemDiv.className = "item";
        titleDiv.className = "item-title";
        descriptionDiv.className = "item-description";
        itemLink.setAttribute("href", linksArray[key]);
        
        var imageURI = getImage(titleArray[key]);
        console.log(imageURI);
        
        li.appendChild(itemLink);
        itemLink.appendChild(itemDiv);
        itemDiv.appendChild(titleDiv);
        titleDiv.appendChild(title);
        itemDiv.appendChild(descriptionDiv);
        descriptionDiv.appendChild(p);
        p.appendChild(description);

        ul.appendChild(li); 
      }
      resultsDiv.appendChild(ul);
    }
  });
}


$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip(); 
  
    var endpointURI = "https://en.wikipedia.org/w/api.php";
  
    // $('#random-btn').on('click', function() {
    // window.open("https://en.wikipedia.org/wiki/Special:Random");
    //  });
  
    $('#search-btn').on('click', function() {
      var searchString = document.getElementById("searchField").value;
      var searchURI = "https://crossorigin.me/https://en.wikipedia.org/w/api.php?action=opensearch&search="+ encodeURI(searchString) + "&format=json";
      
      $(".search").animate({ 
        marginTop: '1%'
      }, function() {
        generateResults(searchURI);
      }); // animate
      
    }); // search-btn click
    
}); // document ready
