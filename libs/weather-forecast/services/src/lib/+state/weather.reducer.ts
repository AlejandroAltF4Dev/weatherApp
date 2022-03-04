import { createReducer, on, Action } from '@ngrx/store';

import * as WeatherActions from './weather.actions';
import { ResultData } from '@bp/interfaces';

export const WEATHER_FEATURE_KEY = 'weather';

export interface State {
	citiesHourly: ResultData[];
	citiesDaily: ResultData[];
	loading: boolean; // has the Weather list been loaded
	error?: string | null; // last known error (if any)
}

export interface WeatherPartialState {
	readonly [WEATHER_FEATURE_KEY]: State;
}

export const initialState: State = {
	citiesHourly: [],
	citiesDaily: [],
	loading: false,
	error: null,
};

const weatherReducer = createReducer(
	initialState,
	on(WeatherActions.init, state => ({ ...state, loading: false, error: null })),
	on(WeatherActions.loadCityGeo, state => ({ ...state, loading: true, error: null })),
	on(WeatherActions.loadWeatherSuccess, (state, { resultData, mode }) => ({
		...state,
		loading: false,
		...(mode === 'daily'
			? { citiesDaily: [...state.citiesDaily, resultData] }
			: { citiesHourly: [...state.citiesHourly, resultData] }),
	})),
	on(WeatherActions.loadWeatherFailure, (state, { error }) => ({ ...state, error, loading: false }))
);

export function reducer(state: State | undefined, action: Action) {
	return weatherReducer(state, action);
}
