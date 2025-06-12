import {CardProps} from './offer-card-data.ts';
import {convertStarsToPercent} from '../utils/card-utils.ts';
import {Link, useNavigate} from 'react-router-dom';
import {AppRoute} from '../utils/routes.ts';
import {useAppDispatch, useAppSelector} from '../../store';
import {AuthorizationStatus} from '../utils/auth-statuses.ts';
import {toggleFavoriteAction} from '../../store/api-actions';

type OfferCardProps = {
  card: CardProps;
  block: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

function OfferCard({card, block, onMouseEnter, onMouseLeave}: OfferCardProps): JSX.Element {
  const {id, img, isPremium, price, rating, cardTitle, cardType, isFavorite} = card;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector((state) => state.user.authorizationStatus);

  const handleFavoriteClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    evt.stopPropagation();

    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
      return;
    }

    dispatch(toggleFavoriteAction({
      offerId: id,
      status: isFavorite ? 0 : 1
    }));
  };

  return (
    <Link to={AppRoute.Offer.replace(':id', id)}>
      <article
        className={`${block}__card place-card`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {isPremium && (
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
        )}
        <div className="cities__image-wrapper place-card__image-wrapper">
          <img className="place-card__image" src={img} width="260" height="200" alt="Place image"/>
        </div>
        <div className="place-card__info">
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">&euro;{price}</b>
              <span className="place-card__price-text">&#47;&nbsp;night</span>
            </div>
            <button
              className={`place-card__bookmark-button button ${isFavorite ? 'place-card__bookmark-button--active' : ''}`}
              type="button"
              onClick={handleFavoriteClick}
            >
              <svg className="place-card__bookmark-icon" width="18" height="19">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">To bookmarks</span>
            </button>
          </div>
          <div className="place-card__rating rating">
            <div className="place-card__stars rating__stars">
              <span style={{width: convertStarsToPercent(rating)}}></span>
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2 className="place-card__name">
            {cardTitle}
          </h2>
          <p className="place-card__type">{cardType}</p>
        </div>
      </article>
    </Link>
  );
}

export {OfferCard};

