const React = require('react');
const ReactStars = require('react-stars').default;

const ProductRating = ({
  rating,
  review
}) => {
  return (
    <div className="product-rating d-flex flex-row pt-1 pb-1 align-items-center">
      <div className="me-4">
        <ReactStars
          count={5}
          value={rating}
          size={24}
          color1={'#D3D3D3'}
          color2={'#ffa700'}
          edit={false}
        />
      </div>
      <div className="fw-bold me-2">{rating}</div>
      <div className="text-secondary review">
        {review}
      </div>
    </div>
  );
};

module.exports = ProductRating;
