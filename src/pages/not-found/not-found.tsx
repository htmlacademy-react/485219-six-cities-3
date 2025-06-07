import {Header} from '../../components/header/header.tsx';

function NotFound(): JSX.Element {
  return (
    <div className="page page--gray page--not-found">
      <Header />

      <main className="page__main page__main--not-found">
        <div className="page__not-found-container container">
          <section className="not-found">
            <h1 className="not-found__title">404</h1>
            <p className="not-found__paragraph">page not found</p>
          </section>
        </div>
      </main>
    </div>
  );
}

export {NotFound};
