import {ReviewsList} from '../ReviewsList/reviews-list.tsx';
import {ReviewForm} from '../ReviewForm/review-form.tsx';

type ReviewProps = {
  isAuth: boolean;
}

function Reviews(isAuth: ReviewProps) {
  return (
    <>
      <ReviewsList />
      {isAuth && (<ReviewForm/>)}
    </>
  );
}

export { Reviews };
