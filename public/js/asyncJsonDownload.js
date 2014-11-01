/*JSON*/
/*XMLHTTPrequest
This function makes a SYNCRONOUS XHMLHTTPRequest 
*/
// Create the XHR object.
function createCORSRequestSync(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    /*
    false: Syncronous call
    */
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}
var response;
// Make the actual CORS request.
function makeCorsRequest(url) {
  // All HTML5 Rocks properties support CORS.
  //var url = "https://dl.dropboxusercontent.com/s/aj9f9i7qdc30buf/Recipes.json?dl=0"
  var xhr = createCORSRequestSync('POST', url);
  if (!xhr) {
    alert('CORS not supported');
    return;
  }

  // Response handlers.
  xhr.onload = function() {
    var text = xhr.responseText;
    //var title = getTitle(text);
    //console.log(text);
    //getTitle(text);
  };
  xhr.onreadystatechange = function(){
  	var response=xhr.responseText;
    console.log(response)
  }
  //console.log(xhr.responseText)
  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };

  xhr.send();
  //Return the response once the request was made
  return xhr.responseText;
}