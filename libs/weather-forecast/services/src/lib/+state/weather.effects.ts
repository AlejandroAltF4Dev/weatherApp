import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as WeatherActions from './weather.actions';
import { WeatherForecastApiService } from '@bp/weather-forecast/services';
import { map, switchMap, throwError } from 'rxjs';

@Injectable()
export class WeatherEffects {
	loadCityGeo$ = createEffect(() =>
		this.actions$.pipe(
			ofType(WeatherActions.loadCityGeo),
			fetch({
				run: ({ cityName, mode }) => {
					return this.weatherForecastApiService.getCityGeo(cityName).pipe(
						switchMap(cities => {
							if (!cities.length) {
								return throwError(new Error('City not found'));
							}
							const [city] = cities;
							const params = {
								lat: city.lat,
								lon: city.lon,
								mode,
							};
							return this.weatherForecastApiService.getWeatherData(params).pipe(
								map(data => {
									if (mode === 'hourly') {
										data = {
											...data,
											hourly: data.hourly
												?.filter((hour, index) => (index + 3) % 3 === 0)
												.slice(0, 8),
										};
									}
									return WeatherActions.loadWeatherSuccess({ resultData: { city, data }, mode });
								})
							);
						})
					);
				},
				onError: (action, error) => {
					return WeatherActions.loadWeatherFailure({ error });
				},
			})
		)
	);

	constructor(private readonly actions$: Actions, private weatherForecastApiService: WeatherForecastApiService) {}
}
