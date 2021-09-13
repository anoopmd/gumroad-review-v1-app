const $ = require('jquery');
const ProductModel = require('../models/product');

const ProductAddRatingView = function(options) {
  this.options = options;
  this.model = new ProductModel()
  this.$modal = null;
  this.formData = {
    rating: 0,
    review: ''
  };

  this.render = function() {
    const self = this;
    const modalHtml = `
      <div class="modal add-product-review-modal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">What's your rating ?</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="mt-1 mb-2 fw-bold">Rating</div>
              <div class="rating">
                <div class="rating-stars"></div>
              </div>

              <div class="mt-4 mb-2 fw-bold">Review</div>
              <textarea rows="5" placeholder="Start typing..."></textarea>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-dark submit-review" disabled="true">Submit Review</button>
              <span class="spinner-container"></span>
              <div class="error-message text-danger">Oops! An error occured while submitting the review</div>
            </div>
          </div>
        </div>
      </div>
    `;
    let $modal = $(modalHtml);
    this.$modal = $modal;
    $('body').append($modal);
    $modal.css("display", "block");

    $modal.find(".rating-stars").starRating({
      starSize: 25,
      totalStars: 5,
      initialRating: 0,
      useFullStars: true,
      ratedColors: ['#ffa700', '#ffa700', '#ffa700', '#ffa700', '#ffa700'],
      callback: function(currentRating){
        self.onRatingFieldChange(currentRating);
      },
      disableAfterRate: false,
      onHover: function(currentIndex){
        $modal.find('.live-rating').text(currentIndex);
      },
      onLeave: function(currentIndex){
        $modal.find('.live-rating').text(currentIndex);
      }
    });

    this.attachEvents();
  }

  this.attachEvents = function() {
    const self = this;
    $submitBtn = $("button.submit-review");
    $errorMessage = $(".error-message");

    this.$modal.find(".btn-close").click(function() {
      self.$modal.remove();
    });

    this.$modal.find("textarea").on('change keyup paste', function(e) {
      let review = $(this).val();
      self.onReviewFieldChange(review);
    });

    $submitBtn.click(function() {
      self.$modal.find(".spinner-container").addClass("spinner");
      $submitBtn.attr("disabled", true);
      $submitBtn.text("Submiting");
      $errorMessage.hide();

      self.model
        .addRating(self.options.productId, self.formData.rating, self.formData.review)
        .then((data) => {
          self.options.onNewRating(data);
          self.$modal.remove();
        })
        .catch((err) => {
          console.log(err);
          $submitBtn.attr("disabled", false);
          $submitBtn.text("Submit Review");
          $errorMessage.show();
          self.$modal.find(".spinner-container").removeClass("spinner");
        });
    });
  }

  this.onRatingFieldChange = function(rating) {
    this.formData.rating = rating;
    this.updateSubmitButtonState();
  }

  this.onReviewFieldChange = function(review) {
    this.formData.review = review || '';
    this.formData.review = this.formData.review.trim();
    this.updateSubmitButtonState();
  }

  this.updateSubmitButtonState = function() {
    $submitBtn = $("button.submit-review");
    if(this.formData.rating > 0 && this.formData.review.length) {
      $submitBtn.attr("disabled", false);
    } else {
      $submitBtn.attr("disabled", true);
    }
  }
};

module.exports = ProductAddRatingView;