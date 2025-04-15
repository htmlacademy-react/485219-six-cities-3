import apartment01 from '../offer-card/assets/images/apartment-01.jpg';
import apartment02 from '../offer-card/assets/images/apartment-02.jpg';
import apartment03 from '../offer-card/assets/images/apartment-03.jpg';

type CardProps = {
  img: string;
  isPremium?: boolean;
  price: number;
  rating: number;
  cardTitle: string;
  cardType: string;
  id?: string;
}

const cardsData: CardProps[] = [
  {
    img: apartment01,
    isPremium: true,
    price: 220,
    rating: 3.7,
    cardTitle: 'Penthouse, 4-5 rooms + 5 balconies',
    cardType: 'room',
    id: 'fb172ed3-7b51-4f66-9333-7aae5baa3952'
  },
  {
    img: apartment02,
    price: 134,
    rating: 2.8,
    cardTitle: 'The Joshua Tree House',
    cardType: 'house',
    id: 'd29daf4c-bcd9-4601-8165-5942dfe79c97'
  },
  {
    img: apartment03,
    price: 216,
    rating: 4.6,
    cardTitle: 'Waterfront with extraordinary view',
    cardType: 'hotel',
    id: 'cb400c15-1663-48a4-bef0-bd5f4205fdf8'
  },
  {
    img: apartment01,
    isPremium: true,
    price: 234,
    rating: 4.7,
    cardTitle: 'House in countryside',
    cardType: 'apartment',
    id: '9d001b69-1d4a-4413-bdc5-bcb415d62c7e'
  },
  {
    img: apartment03,
    price: 130,
    rating: 3,
    cardTitle: 'Perfectly located Castro',
    cardType: 'house',
    id: 'c66e382e-d4d4-454d-ae55-a0e81e34d4a8'
  },
];

export { cardsData };
export type { CardProps };
