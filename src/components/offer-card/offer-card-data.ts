import apartment01 from '../offer-card/assets/images/apartment-01.jpg';
import apartment02 from '../offer-card/assets/images/apartment-02.jpg';
import apartment03 from '../offer-card/assets/images/apartment-03.jpg';

type CardProps = {
  id: string;
  img: string;
  isPremium?: boolean;
  price: number;
  rating: number;
  cardTitle: string;
  cardType: string;
  city: {
    name: string;
    location: {
      latitude: number;
      longitude: number;
      zoom: number;
    };
  };
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const cardsData: CardProps[] = [
  {
    img: apartment01,
    isPremium: true,
    price: 220,
    rating: 3.7,
    cardTitle: 'Penthouse, 4-5 rooms + 5 balconies',
    cardType: 'room',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13
      },
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 16
    },
    id: 'fb172ed3-7b51-4f66-9333-7aae5baa3952'
  },
  {
    img: apartment02,
    price: 134,
    rating: 2.8,
    cardTitle: 'The Joshua Tree House',
    cardType: 'house',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13
      },
    },
    location: {
      latitude: 52.3609553943508,
      longitude: 4.85309666406198,
      zoom: 16
    },
    id: 'd29daf4c-bcd9-4601-8165-5942dfe79c97'
  },
  {
    img: apartment03,
    price: 216,
    rating: 4.6,
    cardTitle: 'Waterfront with extraordinary view',
    cardType: 'hotel',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13
      },
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198,
      zoom: 16
    },
    id: 'cb400c15-1663-48a4-bef0-bd5f4205fdf8'
  },
  {
    img: apartment01,
    isPremium: true,
    price: 234,
    rating: 4.7,
    cardTitle: 'House in countryside',
    cardType: 'apartment',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13
      },
    },
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 16
    },
    id: '9d001b69-1d4a-4413-bdc5-bcb415d62c7e'
  },
  {
    img: apartment03,
    price: 130,
    rating: 3,
    cardTitle: 'Perfectly located Castro',
    cardType: 'house',
    city: {
      name: 'Cologne',
      location: {
        latitude: 50.938361,
        longitude: 6.959974,
        zoom: 13
      },
    },
    location: {
      latitude: 50.932361,
      longitude: 6.937974,
      zoom: 16
    },
    id: 'c66e382e-d4d4-454d-ae55-a0e81e34d4a8'
  },
  {
    img: apartment03,
    price: 130,
    rating: 3,
    cardTitle: 'Perfectly located Castro',
    cardType: 'house',
    city: {
      name: 'Cologne',
      location: {
        latitude: 50.938361,
        longitude: 6.959974,
        zoom: 13
      },
    },
    location: {
      latitude: 50.934361,
      longitude: 6.943974,
      zoom: 16
    },
    id: '1d7b64c6-4d25-497c-9c47-f45bbe87d3c1'
  },
  {
    img: apartment03,
    price: 130,
    rating: 3,
    cardTitle: 'Perfectly located Castro',
    cardType: 'house',
    city: {
      name: 'Cologne',
      location: {
        latitude: 50.938361,
        longitude: 6.959974,
        zoom: 13
      },
    },
    location: {
      latitude: 50.947361,
      longitude: 6.9799739999999995,
      zoom: 16
    },
    id: 'e2a587cd-f6b5-4bb7-b0db-682853b861ca'
  },
  {
    img: apartment03,
    price: 130,
    rating: 3,
    cardTitle: 'Perfectly located Castro',
    cardType: 'house',
    city: {
      name: 'Cologne',
      location: {
        latitude: 50.938361,
        longitude: 6.959974,
        zoom: 13
      },
    },
    location: {
      latitude: 50.960361,
      longitude: 6.967974,
      zoom: 16
    },
    id: '2722cec4-8253-4bd1-b86d-0e8adf56b0c3'
  },
  {
    img: apartment03,
    price: 130,
    rating: 3,
    cardTitle: 'Perfectly located Castro',
    cardType: 'house',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 12
      },
    },
    location: {
      latitude: 48.868610000000004,
      longitude: 2.342499,
      zoom: 16
    },
    id: 'c66e382e-d4d4-454d-ae55-a0e81e34d4a8'
  },
  {
    img: apartment03,
    price: 130,
    rating: 3,
    cardTitle: 'Perfectly located Castro',
    cardType: 'house',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 12
      },
    },
    location: {
      latitude: 48.858610000000006,
      longitude: 2.330499,
      zoom: 16
    },
    id: 'f59fec72-4621-4ad3-a941-ed8c7df0cf54'
  },
  {
    img: apartment03,
    price: 130,
    rating: 3,
    cardTitle: 'Perfectly located Castro',
    cardType: 'house',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 12
      },
    },
    location: {
      latitude: 48.834610000000005,
      longitude: 2.335499,
      zoom: 16
    },
    id: 'f0a615f3-44c2-433c-a369-844577508ac8'
  },
  {
    img: apartment03,
    price: 130,
    rating: 3,
    cardTitle: 'Perfectly located Castro',
    cardType: 'house',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 12
      },
    },
    location: {
      latitude: 48.85761,
      longitude: 2.358499,
      zoom: 16
    },
    id: '15b71a50-3782-4682-a221-ac60d3f82507'
  },
  {
    img: apartment03,
    price: 130,
    rating: 3,
    cardTitle: 'Perfectly located Castro',
    cardType: 'house',
    city: {
      name: 'Brussels',
      location: {
        latitude: 50.846557,
        longitude: 4.351697,
        zoom: 13
      },
    },
    location: {
      latitude: 50.833557,
      longitude: 4.374696999999999,
      zoom: 16
    },
    id: 'c66e382e-d4d4-454d-ae55-a0e81e34d4a8'
  },
  {
    img: apartment03,
    price: 130,
    rating: 3,
    cardTitle: 'Perfectly located Castro',
    cardType: 'house',
    city: {
      name: 'Brussels',
      location: {
        latitude: 50.846557,
        longitude: 4.351697,
        zoom: 13
      },
    },
    location: {
      latitude: 50.860557,
      longitude: 4.376697,
      zoom: 16
    },
    id: '6dff835d-3fae-40c1-9587-7e77f24a4006'
  },
  {
    img: apartment03,
    price: 130,
    rating: 3,
    cardTitle: 'Perfectly located Castro',
    cardType: 'house',
    city: {
      name: 'Brussels',
      location: {
        latitude: 50.846557,
        longitude: 4.351697,
        zoom: 13
      },
    },
    location: {
      latitude: 50.862556999999995,
      longitude: 4.375697,
      zoom: 16
    },
    id: 'a571e466-2aee-4d05-91f5-3db039c2821f'
  },
  {
    img: apartment03,
    price: 130,
    rating: 3,
    cardTitle: 'Perfectly located Castro',
    cardType: 'house',
    city: {
      name: 'Brussels',
      location: {
        latitude: 50.846557,
        longitude: 4.351697,
        zoom: 13
      },
    },
    location: {
      latitude: 50.842557,
      longitude: 4.3536969999999995,
      zoom: 16
    },
    id: '00f56396-9d7b-4067-9188-226b5b098336'
  },
  {
    img: apartment03,
    price: 130,
    rating: 3,
    cardTitle: 'Perfectly located Castro',
    cardType: 'house',
    city: {
      name: 'Hamburg',
      location: {
        latitude: 53.550341,
        longitude: 10.000654,
        zoom: 13
      },
    },
    location: {
      latitude: 53.528341000000005,
      longitude: 10.018654000000002,
      zoom: 16
    },
    id: 'c66e382e-d4d4-454d-ae55-a0e81e34d4a8'
  },
  {
    img: apartment03,
    price: 130,
    rating: 3,
    cardTitle: 'Perfectly located Castro',
    cardType: 'house',
    city: {
      name: 'Dusseldorf',
      location: {
        latitude: 51.225402,
        longitude: 6.776314,
        zoom: 13
      },
    },
    location: {
      latitude: 51.210402,
      longitude: 6.798314,
      zoom: 16
    },
    id: 'c66e382e-d4d4-454d-ae55-a0e81e34d4a8'
  },
];

export { cardsData };
export type { CardProps };
