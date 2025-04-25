import {CardProps} from './offer-card-data.ts';
import {convertStarsToPercent} from '../utils/card-utils.ts';
import {Link} from 'react-router-dom';


function OfferCard(card: CardProps): JSX.Element {
  const {id, img, isPremium, price, rating, cardTitle, cardType, onMouseEnter, onMouseLeave} = card;
  return (
    <Link to={`/offer/${id}`}>
      <article
        className="cities__card place-card"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {isPremium && (
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
        )}
        <div className="cities__image-wrapper place-card__image-wrapper">
          <a href="#">
            <img className="place-card__image" src={img} width="260" height="200" alt="Place image"/>
          </a>
        </div>
        <div className="place-card__info">
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">&euro;{price}</b>
              <span className="place-card__price-text">&#47;&nbsp;night</span>
            </div>
            <button className="place-card__bookmark-button button" type="button">
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
