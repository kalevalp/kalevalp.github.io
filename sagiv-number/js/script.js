function runSearch() {
  var searchTerm = document.getElementById("search").value;
  if (searchTerm === '') {
    document.getElementById("results-section").innerHTML = ''
  } else {
    var endpoint = `https://f3mr3xryxj.execute-api.eu-west-2.amazonaws.com/dev/snum?q=${searchTerm.split(' ').join('+')}`;
    console.log(endpoint);
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
          document.getElementById("results-section").innerHTML = '';

          for (result of JSON.parse(xmlHttp.responseText).results) {
            document.getElementById("results-section").innerHTML += `<p class="search-result">${result.name}: <b>${result.snum}</b> via ${result.pred}</p>`;
          }

          if (JSON.parse(xmlHttp.responseText).maxedSearchResults) {
            document.getElementById("results-section").innerHTML += `<p class="more-results">More results exist. Please refine your search.</p>`;
          }
        }
    }
    xmlHttp.open("GET", endpoint, true); // true for asynchronous 
    xmlHttp.send(null);
  }
}
