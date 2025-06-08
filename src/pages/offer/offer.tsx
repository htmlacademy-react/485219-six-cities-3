import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { convertStarsToPercent } from '../../components/utils/card-utils.ts';
import { Reviews } from '../../components/Review/review.tsx';
import { AuthorizationStatus } from '../../components/utils/auth-statuses.ts';
import { Map } from '../../components/map/map.tsx';
import { OfferCard } from '../../components/offer-card/offer-card.tsx';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchOfferById, fetchNearbyOffers, clearCurrentOffer } from '../../store/offers-slice';
import {Header} from '../../components/header/header.tsx';

type OfferProps = {
  authorizationStatus: AuthorizationStatus;
};

function Offer({ authorizationStatus }: OfferProps): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { currentOffer, offers, isCurrentOfferLoading } = useAppSelector((state) => ({
    currentOffer: state.offers.currentOffer,
    offers: state.offers.offers,
    isCurrentOfferLoading: state.offers.isCurrentOfferLoading
  }));

  useEffect(() => {
    if (id) {
      dispatch(fetchOfferById(id));
      dispatch(fetchNearbyOffers(id));
    }

    return () => {
      dispatch(clearCurrentOffer());
    };
  }, [dispatch, id]);

  if (isCurrentOfferLoading) {
    return <div>Loading...</div>;
  }

  if (!currentOffer) {
    return <p>Offer not found</p>;
  }

  const nearOffersCards = offers.filter((offer) =>
    offer.city.name === currentOffer.city.name &&
    offer.id !== currentOffer.id
  ).slice(0, 3);

  const nearOffersWithCurrent = [currentOffer, ...nearOffersCards];

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {currentOffer.images.map((image, index) => (
                <div key={currentOffer.id} className="offer__image-wrapper">
                  <img className="offer__image" src={image} alt={`Photo ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {currentOffer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>)}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {currentOffer.cardTitle}
                </h1>
                <button className="offer__bookmark-button button" type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: convertStarsToPercent(currentOffer.rating)}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{currentOffer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {currentOffer.cardType}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {currentOffer.bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {currentOffer.maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{currentOffer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {currentOffer.goods.map((good) => (
                    <li key={good} className="offer__inside-item">
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className={`offer__avatar-wrapper ${currentOffer.host.isPro ? 'offer__avatar-wrapper--pro' : ''} user__avatar-wrapper`}>
                    <img className="offer__avatar user__avatar" src={currentOffer.host.avatarUrl} width="74" height="74" alt="Host avatar"/>
                  </div>
                  <span className="offer__user-name">
                    {currentOffer.host.name}
                  </span>
                  {currentOffer.host.isPro && (
                    <span className="offer__user-status">
                      Pro
                    </span>
                  )}
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {currentOffer.description}
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <Reviews isAuth={authorizationStatus === AuthorizationStatus.Auth}/>
              </section>
            </div>
          </div>
          <Map
            className="offer__map"
            selectedCity={currentOffer}
            cardsData={nearOffersWithCurrent}
            activeOfferId={currentOffer.id}
          />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {nearOffersCards.map((card) => (
                <OfferCard
                  key={card.id}
                  card={card}
                  block="near-places"
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export { Offer };
