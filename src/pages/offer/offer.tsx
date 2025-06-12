import {useEffect, useState, useMemo} from 'react';
import {useParams, Navigate} from 'react-router-dom';
import {AppRoute} from '../../components/utils/routes.ts';
import {convertStarsToPercent} from '../../components/utils/card-utils.ts';
import {Reviews} from '../../components/reviews/reviews.tsx';
import {AuthorizationStatus} from '../../components/utils/auth-statuses.ts';
import {Map} from '../../components/map/map.tsx';
import {OfferCard} from '../../components/offer-card/offer-card.tsx';
import {useAppDispatch, useAppSelector} from '../../store';
import {fetchOfferById, fetchNearbyOffers, clearCurrentOffer} from '../../store/offers-slice';
import {Header} from '../../components/header/header.tsx';
import {fetchComments} from '../../store/api-actions.ts';

const START_INDEX = 0;
const MAX_NEARBY_OFFERS = 3;

function Offer(): JSX.Element {
  const {id} = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const authorizationStatus = useAppSelector((state) => state.user.authorizationStatus);
  const currentOffer = useAppSelector((state) => state.offers.currentOffer);
  const offers = useAppSelector((state) => state.offers.offers);
  const isCurrentOfferLoading = useAppSelector((state) => state.offers.isCurrentOfferLoading);
  const currentOfferError = useAppSelector((state) => state.offers.currentOfferError);

  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchOfferById(id));
      dispatch(fetchNearbyOffers(id));
      dispatch(fetchComments(id));
    }

    return () => {
      dispatch(clearCurrentOffer());
    };
  }, [dispatch, id]);

  useEffect(() => {
    let isMounted = true;
    let timer: NodeJS.Timeout;

    if (!isCurrentOfferLoading && !currentOffer && !currentOfferError) {
      timer = setTimeout(() => {
        if (isMounted) {
          setShouldRedirect(true);
        }
      }, 100);
    } else {
      setShouldRedirect(false);
    }

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [isCurrentOfferLoading, currentOffer, currentOfferError]);

  const {nearOffersCards, nearOffersWithCurrent} = useMemo(() => {
    if (!currentOffer) {
      return {nearOffersCards: [], nearOffersWithCurrent: []};
    }

    const filtered = offers.filter((offer) =>
      offer.city.name === currentOffer.city.name &&
      offer.id !== currentOffer.id
    ).slice(START_INDEX, MAX_NEARBY_OFFERS);

    return {
      nearOffersCards: filtered,
      nearOffersWithCurrent: [currentOffer, ...filtered]
    };
  }, [currentOffer, offers]);

  if (shouldRedirect || currentOfferError) {
    return <Navigate to={AppRoute.NotFound}/>;
  }

  if (isCurrentOfferLoading || !currentOffer) {
    return <div>Loading...</div>;
  }

  return (
    <div className="page">
      <Header/>

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {currentOffer.images.map((image) => (
                <div key={image} className="offer__image-wrapper">
                  <img className="offer__image" src={image} alt={'Photo studio'} />
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
                {authorizationStatus === AuthorizationStatus.Auth && (
                  <Reviews offerId={id || ''} />
                )}
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

export {Offer};
