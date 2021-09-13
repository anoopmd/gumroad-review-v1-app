const React = require('react');
const ProductRating = require('../ProductRating');

const ProductRatingList = ({
  ratings
}) => {
  return (
    <div className="product-rating-list">
      {ratings && ratings.length && ratings.map((rating) => {
        return <ProductRating key={rating.id} rating={rating.rating} review={rating.review}></ProductRating>
      })}
    </div>
  );
};

module.exports = ProductRatingList;
