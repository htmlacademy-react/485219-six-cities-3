import {MainPage} from '../../pages/main-page/main-page.tsx';
import {CardProps} from '../offer-card/offer-card-data.ts';

type AppProps = {
  cardsData: CardProps[];
}

function App({ cardsData }: AppProps): JSX.Element {
  return (
    <MainPage cardsData={cardsData} />
  );
}

export {App};
