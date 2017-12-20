module.exports = {

  connection: function(url) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function() {
        if (xhr.status === 200 && xhr.readyState === 4) {
            return'connected';
        }
        else {
            return'conenction failed';
        }
    };
    xhr.send();
  }
}
