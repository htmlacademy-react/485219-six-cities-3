import { useAppSelector } from '../../store';
import { ReviewsList } from '../ReviewsList/reviews-list.tsx';
import { ReviewForm } from '../ReviewForm/review-form.tsx';

type ReviewsProps = {
  offerId: string;
};

function Reviews({ offerId }: ReviewsProps): JSX.Element {
  const { comments } = useAppSelector((state) => state.comments);

  return (
    <section className="reviews">
      <ReviewsList comments={comments} />
      <ReviewForm offerId={offerId} />
    </section>
  );
}

export { Reviews };
