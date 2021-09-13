const $ = require('jquery');
const ProductView = require('./views/product');

$(function() {
  const productView = new ProductView({
    id: 'product-container'
  });
  productView.fetchById(1);

  $('.navbar-toggler').click(function() {
    $('.navbar-collapse').toggleClass('collapse');
  });
});
