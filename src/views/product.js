window.Slick = window.Slick || {};

Slick.ProductView = function(options) {
  this.options = options;

  this.el = $('#' + options.id);
  this.model = new Slick.ProductRatingModel();

  this.fetchById = function(id) {
    let self = this;

    this.model
      .getProductById(id)
      .then(function(product) {
        self.render(product)
      })
      .catch((err) => console.log(err));
  }

  this.render = function(product) {
    const productRatings = _.map(product.ratings, (r) => r.rating);
    const productAverageRating = _.sum(productRatings) / productRatings.length;
    let productView = `
      <div class="product">
        <div class="d-flex pb-4">
          <div>
            <img src="assets/images/${product.image_url}" width="200px"/>
          </div>
          <div class="flex-fill ms-4">
            <h2 class="title">${product.name}</h2>
            <div class="text-muted">${product.description}</div>
            <h4 class="mt-4">$${product.price.toFixed(2)}</h4>
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
      readOnly: true
    });

    if(product.ratings && product.ratings.length) {
      const productRatingListView = new Slick.ProductRatingListView({
        el: this.el.find('.product-rating-list')
      });
      product.ratings.forEach((rating) => {
        productRatingListView.addRating({
          rating: rating.rating,
          text: rating.comment
        });
      });
    } else {
      this.el.find('.product-rating-list').html('No ratings were found');
    }

    this.el.find("button.add-review").click(function() {
      const productAddRatingView = new Slick.ProductAddRatingView();
      console.log('Clicked');
      productAddRatingView.render();
      // $(modalHtml).appendTo('body').modal();
    });
  }
};