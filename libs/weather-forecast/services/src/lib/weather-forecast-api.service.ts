import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { City, ParamsDto, WeatherInfo } from '@bp/interfaces';

const modes = ['current', 'minutely', 'hourly', 'daily', 'alerts'];

@Injectable({ providedIn: 'root' })
export class WeatherForecastApiService {
	private _apiKey = '010721642521f31b0fbc8c3831d45951';

	constructor(private readonly httpClient: HttpClient) {}

	getCityGeo(cityName: string): Observable<City[]> {
		return this.httpClient.get<City[]>('http://api.openweathermap.org/geo/1.0/direct', {
			params: new HttpParams({ fromObject: { q: cityName, appid: this._apiKey, limit: 1 } }),
		});
	}

	getWeatherData(params: ParamsDto): Observable<WeatherInfo> {
		const exclude = modes.filter(mode => mode !== params.mode).join(',');
		return this.httpClient.get<WeatherInfo>('https://api.openweathermap.org/data/2.5/onecall', {
			params: new HttpParams({
				fromObject: { ...params, appid: this._apiKey, exclude, units: 'metric' },
			}),
		});
	}
}
