import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import type { RootState } from '../start';
import { IState } from './reducer';

type ReduxDispatch = ThunkDispatch<IState, any, Action>;

export const useAppDispatch = (): ReduxDispatch => useDispatch<ReduxDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
