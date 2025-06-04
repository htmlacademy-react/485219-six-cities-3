import { PayloadAction } from '@reduxjs/toolkit';
import { browserHistory } from '../../types/browser-history.ts';
import { Middleware } from 'redux';
import {AppState} from '../../types/app-state.ts';

export const redirect: Middleware<unknown, AppState> =
  () =>
    (next) =>
      (action: PayloadAction<string>) => {

        if (action.type === 'app/redirectToRoute') {
          browserHistory.push(action.payload);
        }

        return next(action);
      };
