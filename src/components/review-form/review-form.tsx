import {Fragment, useState, FormEvent, ChangeEvent} from 'react';
import {useAppDispatch, useAppSelector} from '../../store';
import {postComment} from '../../store/api-actions';

const MIN_LENGTH = 50;
const MAX_LENGTH = 300;

const RATING = [
  {value: 5, label: 'perfect'},
  {value: 4, label: 'good'},
  {value: 3, label: 'not bad'},
  {value: 2, label: 'badly'},
  {value: 1, label: 'terrible'},
];

type ReviewFormProps = {
  offerId: string;
};

function ReviewForm({offerId}: ReviewFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const {isSending} = useAppSelector((state) => state.comments);
  const [formData, setFormData] = useState({
    comment: '',
    rating: 0,
  });
  const [error, setError] = useState<string | null>(null);

  const handleReviewFormChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: name === 'rating' ? Number(value) : value
    });
    if (error) {
      setError(null);
    }
  };

  const handleReviewFormSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    setError(null);

    if (formData.comment.length < MIN_LENGTH) {
      setError(`Comment must be at least ${MIN_LENGTH} characters`);
      return;
    }

    if (formData.comment.length > MAX_LENGTH) {
      setError(`Comment cannot exceed ${MAX_LENGTH} characters`);
      return;
    }

    if (formData.rating === 0) {
      setError('Please select a rating');
      return;
    }

    dispatch(postComment({offerId, commentData: formData}))
      .unwrap()
      .then(() => {
        setFormData({comment: '', rating: 0});
      })
      .catch(() => {
        setError('Failed to post comment. Please try again.');
      });
  };

  const isFormDisabled = isSending ||
    formData.comment.length < MIN_LENGTH ||
    formData.comment.length > MAX_LENGTH ||
    formData.rating === 0;

  return (
    <form
      className="reviews__form form"
      onSubmit={handleReviewFormSubmit}
      aria-busy={isSending}
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>

      {error && <div className="reviews__error" style={{color: 'red', marginBottom: '10px'}}>{error}</div>}

      <div className="reviews__rating-form form__rating">
        {RATING.map(({value, label}) => (
          <Fragment key={value}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={value}
              id={`${value}-stars`}
              type="radio"
              checked={formData.rating === value}
              onChange={handleReviewFormChange}
              disabled={isSending}
            />
            <label
              htmlFor={`${value}-stars`}
              className="reviews__rating-label form__rating-label"
              title={label}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="comment"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formData.comment}
        onChange={handleReviewFormChange}
        disabled={isSending}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your
          stay with at least{' '}
          <b className="reviews__text-amount">{MIN_LENGTH} characters</b> and maximum of {MAX_LENGTH} characters.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isFormDisabled}
        >
          {isSending ? 'Sending...' : 'Submit'}
        </button>
      </div>
    </form>
  );
}

export {ReviewForm};
