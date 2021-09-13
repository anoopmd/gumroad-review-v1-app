const $ = require('jquery');
const ProductView = require('./views/product');
const App = require('./components/App');
const React = require('react');
const ReactDOM = require('react-dom');

$(function() {
  let reactNode = document.getElementById('react-node');
  ReactDOM.render(<App/>, reactNode);
  console.log('load 5');
  const productView = new ProductView({
    id: 'product-container'
  });
  productView.fetchById(1);

  $('.navbar-toggler').click(function() {
    $('.navbar-collapse').toggleClass('collapse');
  });
});
