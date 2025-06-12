import {Review as Comment} from '../../types/comment';
import {memo, useCallback, useMemo} from 'react';

type ReviewsListProps = {
  comments: Comment[];
};

const ReviewsList = memo(({comments}: ReviewsListProps): JSX.Element => {
  const formatDate = useCallback((dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    });
  }, []);

  const sortedAndLimitedComments = useMemo(() => [...comments]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10), [comments]);

  if (comments.length === 0) {
    return (
      <div className="reviews__container">
        <h2 className="reviews__title">
          Reviews · <span className="reviews__amount">0</span>
        </h2>
        <p className="reviews__empty">No reviews yet. Be the first to review!</p>
      </div>
    );
  }

  return (
    <div className="reviews__container">
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{comments.length}</span>
      </h2>
      <ul className="reviews__list">
        {sortedAndLimitedComments.map((comment) => (
          <li key={comment.id} className="reviews__item">
            <div className="reviews__user user">
              <div className="reviews__avatar-wrapper user__avatar-wrapper">
                <img
                  className="reviews__avatar user__avatar"
                  src={comment.user.avatarUrl}
                  width="54"
                  height="54"
                  alt="User avatar"
                />
              </div>
              <span className="reviews__user-name">{comment.user.name}</span>
              {comment.user.isPro && (
                <span className="reviews__user-status">Pro</span>
              )}
            </div>
            <div className="reviews__info">
              <div className="reviews__rating rating">
                <div className="reviews__stars rating__stars">
                  <span style={{width: `${comment.rating * 20}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
              </div>
              <p className="reviews__text">{comment.comment}</p>
              <time
                className="reviews__time"
                dateTime={new Date(comment.date).toISOString()}
              >
                {formatDate(comment.date)}
              </time>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
});

ReviewsList.displayName = 'ReviewsList';

export {ReviewsList};
