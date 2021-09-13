const $ = require('jquery');

const ProductRatingListView = function(options) {
  this.options = options;
  this.el = options.el || $('#' + options.id);

  this.addRating = function(rating) {
    let row = `
      <div class="product-rating d-flex flex-row pt-2 pb-2">
        <div class="me-4">
          <div class="rating-stars"></div>
        </div>
        <div class="fw-bold me-2">${rating.rating}</div>
        <div class="text-secondary review">
          ${rating.text}
        </div>
      </div>
    `;
    this.el.append(row);
    this.el.find(".rating-stars").starRating({
      starSize: 20,
      totalStars: 5,
      initialRating: rating.rating,
      readOnly: true
    });
  }
};

module.exports = ProductRatingListView;