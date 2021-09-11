window.Slick = window.Slick || {};

Slick.ProductAddRatingView = function(options) {
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
            </div>
          </div>
        </div>
      </div>
    `;
    let $modal = $(modalHtml);
    $('body').append($modal);
    $modal.css("display", "block");

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
        $modal.find(".submit-review").attr("disabled", false);
      } else {
        $modal.find(".submit-review").attr("disabled", true);
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
  }
};