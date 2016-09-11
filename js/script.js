function getImage(title, imageDiv) {
  $.getJSON("http://en.wikipedia.org/w/api.php?action=query&format=json&callback=?", {
      titles: title,
      prop: "pageimages",
      pithumbsize: 150
    },
    function(data) {
      var source = "";
      var imageUrl = GetAttributeValue(data.query.pages);
      if (imageUrl == "") {
        $(imageDiv).append("<img src=\"https://placehold.it/150x150.jpg>\">");
      } else {
        var img = "<img src=\"" + imageUrl + "\">"
        $(imageDiv).append(img);
      }
    }
  );

 function GetAttributeValue(data) {
    var urli = "";
      for (var key in data) {
        if (data[key].thumbnail != undefined) {
          if (data[key].thumbnail.source != undefined) {
            urli = data[key].thumbnail.source;
            break;
          }
        }
      }
    return urli;
  }
  
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
            imageDiv = document.createElement('div'),
            titleDiv = document.createElement('div'),
            descriptionDiv = document.createElement('div'),
            p = document.createElement('p'),
            title = document.createTextNode(titleArray[key]),
            description = document.createTextNode(descriptionArray[key]),
            itemLink = document.createElement('a');

        imageDiv.id = "wiki";
        itemDiv.className = "item row";
        titleDiv.className = "item-title";
        descriptionDiv.className = "item-description";
        itemLink.setAttribute("href", linksArray[key]);
        
        
        li.appendChild(itemLink);
        itemLink.appendChild(itemDiv);
        itemDiv.appendChild(titleDiv);
        titleDiv.appendChild(title);
        itemDiv.appendChild(imageDiv);
        getImage(titleArray[key], imageDiv);
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
    var endpointURI = "https://en.wikipedia.org/w/api.php";
  
    $('#random-btn').on('click', function() {
      window.open("https://en.wikipedia.org/wiki/Special:Random");
    });
  
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
