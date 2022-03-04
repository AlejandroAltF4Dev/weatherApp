import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WEATHER_FEATURE_KEY, State } from './weather.reducer';

// Lookup the 'Weather' feature state managed by NgRx
export const getWeatherState = createFeatureSelector<State>(WEATHER_FEATURE_KEY);
export const getLoading = createSelector(getWeatherState, (state: State) => state.loading);
export const getError = createSelector(getWeatherState, (state: State) => state.error);
export const getCitiesHourly = createSelector(getWeatherState, (state: State) => state.citiesHourly);
export const getCitiesDaily = createSelector(getWeatherState, (state: State) => state.citiesDaily);
