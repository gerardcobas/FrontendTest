var controller = new Controller;

window.addEventListener("submit",function(event) {
  event.preventDefault();
  var searchText = document.getElementById('text').value;
  controller.findUser(searchText);
})
