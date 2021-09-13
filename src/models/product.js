const $ = require('jquery');

const ProductModel = function() {
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

  this.addRating = function(productId, rating, review) {
    return new Promise((resolve, reject) => {
      const request = $.ajax({
        url: `api/slick/v1/products/${productId}/rating`,
        type: "POST",
        contentType: "application/json",
        dataType: 'json',
        data : JSON.stringify({
          rating: rating,
          review: review
        })
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

module.exports = ProductModel;