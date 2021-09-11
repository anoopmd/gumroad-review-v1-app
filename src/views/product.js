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
              <div class="me-2 rating-average">3.8</div>
              <div class="rating">
                <div class="rating-average-stars"></div>
              </div>
            </div>
            <div class="mt-4">
              <button type="button" class="btn btn-outline-dark">Add Review</button>
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
      starSize: 20,
      totalStars: 5,
      initialRating: 4
    });

    const productRatingListView = new Slick.ProductRatingListView({
      el: this.el.find('.product-rating-list')
    });
    productRatingListView.addRating({
      rating: 4,
      text: 'book was full of fluff'
    });
    productRatingListView.addRating({
      rating: 3,
      text: 'book was fluff'
    });
    productRatingListView.addRating({
      rating: 5,
      text: 'book was amazing'
    });
  }
};