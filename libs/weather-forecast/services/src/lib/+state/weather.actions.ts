import { createAction, props } from '@ngrx/store';
import { ResultData } from '@bp/interfaces';

export const init = createAction('[Weather Page] Init');

export const loadCityGeo = createAction(
	'[Weather/API] Load City Geo',
	props<{ cityName: string; mode: 'hourly' | 'daily' }>()
);
export const loadWeatherSuccess = createAction(
	'[Weather/API] Load Weather Success',
	props<{ resultData: ResultData; mode: string }>()
);

export const loadWeatherFailure = createAction('[Weather/API] Load Weather Failure', props<{ error: any }>());
