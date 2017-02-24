(function() {
  describe("Controller", function() {
    var controller;

    beforeEach(function() {
      controller = new Controller;
    });

    it("has a searchView", function() {
      expect(controller.searchView.constructor.name).toEqual("SearchView");
    });

    it("has an APIClient", function() {
      expect(controller.apiClient.constructor.name).toEqual("APIClient");
    });

    it("updates the html contents", function() {

      function SearchViewDouble() {
      }

      SearchViewDouble.prototype = {
        returnHTMLSuccess: function(user) {
          return "<ul><h1>fullname</h1></ul>";
        }
      }

      var searchViewDouble = new SearchViewDouble;
      controller.searchView = searchViewDouble;
      controller.updateHTML();
      var element = document.getElementById('display');
      expect(element.innerHTML).toEqual(searchViewDouble.returnHTMLSuccess());
    })
  });
})();
