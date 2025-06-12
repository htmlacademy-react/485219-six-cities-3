import { FormEvent, useState } from 'react';
import { useAppDispatch } from '../../store';
import { loginAction } from '../../store/api-actions';
import { Header } from '../../components/header/header.tsx';
import { AppRoute} from '../../components/utils/routes.ts';
import { useNavigate } from 'react-router-dom';
import {AuthData} from '../../types/auth-data.ts';

function Login(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const isPasswordValid = /[A-Za-z]/.test(password) && /\d/.test(password);

    if (!isPasswordValid) {
      setPasswordError('Пароль должен содержать хотя бы одну букву и одну цифру.');
      return;
    }

    setPasswordError('');

    const authData: AuthData = {
      email,
      password
    };

    dispatch(loginAction(authData))
      .unwrap()
      .then(() => {
        navigate(AppRoute.Main);
      });
  };

  return (
    <div className="page page--gray page--login">
      <Header />
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className={`login__input form__input ${passwordError ? 'form__input--error' : ''}`}
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (passwordError) {
                      setPasswordError('');
                    }
                  }}
                />
                {passwordError && (
                  <p className="form__error-text" style={{ color: 'red', marginTop: '4px' }}>
                    {passwordError}
                  </p>
                )}
              </div>

              <button className="login__submit form__submit button" type="submit">
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export { Login };
