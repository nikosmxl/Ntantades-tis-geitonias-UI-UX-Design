export const getAverageRating = (babysitter) => {
  const totalSum = (babysitter?.ratings ?? []).reduce((accumulator, rating) => {
    return accumulator + rating.rating;
  }, 0);
  const numRatings = (babysitter?.ratings ?? []).length;
  return numRatings !== 0 ? totalSum / numRatings : 0;
};