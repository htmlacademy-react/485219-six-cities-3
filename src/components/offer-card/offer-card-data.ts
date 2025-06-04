type CardProps = {
  id: string;
  img: string;
  isPremium?: boolean;
  isFavorite?: boolean;
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
  bedrooms: number;
  maxAdults: number;
  goods: string[];
  host: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
  description: string;
  images: string[];
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export type { CardProps };
