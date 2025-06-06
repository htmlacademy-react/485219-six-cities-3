import {store} from '../store';
import {setError} from '../store/actions';
import {clearErrorAction} from '../store/api-actions';

const processErrorHandle = (message: string): void => {
  store.dispatch(setError(message));
  store.dispatch(clearErrorAction());
};

export {processErrorHandle};
