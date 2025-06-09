import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { getToken } from './token';
import { StatusCodes } from 'http-status-codes';
import { processErrorHandle } from './process-error-handle';
import {store} from '../store';
import {AuthorizationStatus} from '../components/utils/auth-statuses.ts';
import {redirectToRoute} from '../store/actions.ts';
import {AppRoute} from '../components/utils/routes.ts';
import {setAuthorizationStatus} from '../store/user-slice.ts';

const BACKEND_URL = 'https://15.design.htmlacademy.pro/six-cities';
const REQUEST_TIMEOUT = 5000;

type DetailMessageType = {
  type: string;
  message: string;
}

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true
};

const shouldDisplayError = (response: AxiosResponse) => StatusCodeMapping[response.status];

export const api = axios.create({
  baseURL: BACKEND_URL,
  timeout: REQUEST_TIMEOUT,
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken();

    if (token && config.headers) {
      config.headers['x-token'] = token;
    }

    return config;
  }
);

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<DetailMessageType>) => {
    if (error.response && shouldDisplayError(error.response)) {
      const detailMessage = (error.response.data);
      processErrorHandle(detailMessage.message);
    }
    throw error;
  }
);

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<DetailMessageType>) => {
    if (error.response?.status === StatusCodes.UNAUTHORIZED) {
      store.dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
      store.dispatch(redirectToRoute(AppRoute.Login));
    }

    if (error.response && shouldDisplayError(error.response)) {
      const detailMessage = error.response.data;
      processErrorHandle(detailMessage.message);
    }

    return Promise.reject(error);
  }
);

export const createAPI = (): AxiosInstance => api;
