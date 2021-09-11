window.Slick = window.Slick || {};

Slick.ProductRatingModel = function() {
  this.getProductById = function(id) {
    return new Promise((resolve, reject) => {
      const request = $.ajax({
        url: `api/slick/v1/products/${id}`,
        type: "GET",
        dataType: "json"
      });

      request.done(function(data) {
        resolve(data);
      });
      
      request.fail(function(jqXHR, textStatus) {
        reject(jqXHR);
      });
    });
  }
};