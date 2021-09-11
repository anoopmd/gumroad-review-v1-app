window.Slick = window.Slick || {};

Slick.ProductAddRatingView = function(options) {
  this.options = options;
  this.model = new Slick.ProductModel()

  this.render = function() {
    const self = this;
    const formData = {
      rating: 0,
      review: ''
    };
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
    $('body').append($modal);
    $modal.css("display", "block");

    $errorMessage = $(".error-message");
    $submitBtn = $("button.submit-review");

    const onRatingUpdate = (rating) => {
      formData.rating = rating;
      updateSubmitButtonState();
    }

    const onReviewUpdate = (review) => {
      formData.review = review || '';
      formData.review = formData.review.trim();
      updateSubmitButtonState();
    }

    const updateSubmitButtonState = () => {
      if(formData.rating > 0 && formData.review.length) {
        $submitBtn.attr("disabled", false);
      } else {
        $submitBtn.attr("disabled", true);
      }
    }

    $modal.find(".rating-stars").starRating({
      starSize: 25,
      totalStars: 5,
      initialRating: 0,
      useFullStars: true,
      ratedColors: ['#ffa700', '#ffa700', '#ffa700', '#ffa700', '#ffa700'],
      callback: function(currentRating, $el){
        onRatingUpdate(currentRating);
      },
      disableAfterRate: false,
      onHover: function(currentIndex, currentRating, $el){
        $modal.find('.live-rating').text(currentIndex);
      },
      onLeave: function(currentIndex, currentRating, $el){
        $modal.find('.live-rating').text(currentIndex);
      }
    });

    $modal.find(".btn-close").click(function() {
      $modal.remove();
    });

    $modal.find("textarea").on('change keyup paste', function(e) {
      let review = $(this).val();
      onReviewUpdate(review);
    });

    $submitBtn.click(function() {
      $modal.find(".spinner-container").addClass("spinner");
      $submitBtn.attr("disabled", true);
      $submitBtn.text("Submiting");
      $errorMessage.hide();

      self.model
        .addRating(self.options.productId, formData.rating, formData.review)
        .then((data) => {
          self.options.onNewRating(data);
          $modal.remove();
        })
        .catch((err) => {
          console.log(err);
          $submitBtn.attr("disabled", false);
          $submitBtn.text("Submit Review");
          $errorMessage.show();
          $modal.find(".spinner-container").removeClass("spinner");
        });
    });
  }
};