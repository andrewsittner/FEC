import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ReviewsList from './ReviewsList.jsx';
import RatingBreakdown from './RatingBreakdown.jsx';
import ProductBreakdown from './ProductBreakdown.jsx';

const RateAndReview = ({ product_id }) => {
  const [productReviews, setReviews] = useState([]);
  const [reviewsShown, setShownReviews] = useState([]);
  const [productRating, setRating] = useState({});
  const [recommendPercentage, setPercentage] = useState(0);
  const [productChar, setChar] = useState([])
  const [reviewCount, setReviewCount] = useState(2);

  useEffect(() => {
    axios.get(`getReviews/?product_id=${product_id}`)
    .then(data => {
      setReviews(data.data.results);
      setShownReviews(data.data.results.slice(0, reviewCount))
    });

    axios.get(`getReviewsMeta/?product_id=${product_id}`)
    .then(data => {
      let meta = data.data

      // star rating breakdown
      let totalRatings = 0;
      let ratings = meta.ratings;
      for (let rate in ratings) {
        totalRatings += JSON.parse(ratings[rate]);
      }
      let ratingObj = {};
      for (let rate in ratings) {
        ratingObj[rate] = (ratings[rate] / totalRatings) * 100;
      }
      setRating(ratingObj);

      //recommended percentage
      let totalTrue = JSON.parse(meta.recommended.true);
      let totalFalse = JSON.parse(meta.recommended.false);
      let total = totalTrue + totalFalse;
      let percent = Number.parseInt((totalTrue / total) * 100);
      setPercentage(percent);

      //characteristics info
      let characteristics = meta.characteristics;
      let charArr = [];
      for (let key in characteristics) {
        let rating = characteristics[key].value
        let percentRating = (rating / 5) * 100;

        charArr.push({
          'name': key,
          'percent': percentRating,
          'value': characteristics[key].value,
          'id': characteristics[key].id
        });
      }
      setChar(charArr);
    })
  }, []);

  useEffect(() => {
    setShownReviews(productReviews.slice(0, reviewCount))
  },[reviewCount])

  const markHelpful = (reviewId) => {
    axios.put(`markReviewHelpful/?review_id=${reviewId}`)
      .then(() => console.log('marked!'))
      .catch(err => console.log(err));
  }

  const showMoreReviews = () => {
    return setReviewCount(reviewCount + 2);
  }


  return (
    <div data-testid="rating-main">
      <h2>Ratings And Reviews</h2>
      <div>
      <RatingBreakdown productRating={productRating} recommendPercentage={recommendPercentage}/>
      <ProductBreakdown productChar={productChar}/>
      <ReviewsList reviewsShown={reviewsShown}
      showMoreReviews={showMoreReviews}
      markHelpful={markHelpful}/>
      </div>
    </div>
  )
}

export default RateAndReview;