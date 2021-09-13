window.Slick = window.Slick || {};

Slick.ProductView = function(options) {
  this.options = options;

  this.el = $('#' + options.id);
  this.productRatingListView = null;
  this.model = new Slick.ProductModel();
  this.product = {};

  this.fetchById = function(id) {
    let self = this;

    this.model
      .getProductById(id)
      .then(function(product) {
        self.product = product;
        self.render(product)
      })
      .catch((err) => console.log(err));
  }

  this.render = function(product) {
    const self = this;
    let productAverageRating = this.getAverageRating();
    let productView = `
      <div class="product">
        <div class="d-flex flex-column flex-sm-row">
          <div class="me-4 pb-4">
            <img src="assets/images/${product.image_url}" width="200px"/>
          </div>
          <div class="flex-fill pb-4">
            <h2 class="title">${product.name}</h2>
            <div class="text-muted description">${product.description}</div>
            <h4 class="mt-4 price">$${product.price.toFixed(2)}</h4>
            <div class="product-info d-flex flex-row mt-5 pb-2">
              <div class="me-2 rating-average">${productAverageRating.toFixed(1)}</div>
              <div class="rating">
                <div class="rating-average-stars"></div>
              </div>
            </div>
            <div class="mt-4">
              <button type="button" class="btn btn-outline-dark add-review">Add Review</button>
            </div>
          </div>
        </div>
        <hr/>

        <h6 class="mt-4 fw-bold">Reviews</h6>
        <div class="product-rating-list"></div>
      </div>
    `;
    this.el.append(productView);

    this.el.find(".rating-average-stars").starRating({
      starSize: 25,
      totalStars: 5,
      initialRating: productAverageRating,
      ratedColors: ['#ffa700', '#ffa700', '#ffa700', '#ffa700', '#ffa700'],
      readOnly: true
    });

    this.renderRatings();
    this.attachEvents();
  }

  this.renderRatings = function() {
    if(this.product.ratings && this.product.ratings.length) {
      this.productRatingListView = new Slick.ProductRatingListView({
        el: this.el.find('.product-rating-list')
      });
      this.product.ratings.forEach((rating) => {
        this.productRatingListView.addRating({
          rating: rating.rating,
          text: rating.review
        });
      });
    } else {
      this.el.find('.product-rating-list').html('No ratings were found');
    }
  }

  this.attachEvents = function() {
    const self = this;
    this.el.find("button.add-review").click(function() {
      const productAddRatingView = new Slick.ProductAddRatingView({
        productId: self.product.id,
        onNewRating: self.updateRatings.bind(self)
      });
      productAddRatingView.render();
    });
  }

  this.updateRatings = function(newRating) {
    this.product.ratings.push(newRating);
    let productAverageRating = this.getAverageRating();
    this.el.find(".rating-average").text(productAverageRating.toFixed(1));
    this.el.find(".rating-average-stars").starRating('setRating', productAverageRating);
    this.productRatingListView.addRating({
      rating: newRating.rating,
      text: newRating.review
    });
  }

  this.getAverageRating = function() {
    const productRatings = _.map(this.product.ratings, (r) => r.rating);
  
    return _.sum(productRatings) / productRatings.length;
  }
};