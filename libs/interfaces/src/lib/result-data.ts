import { City } from './city';
import { WeatherInfo } from './weather-info';

export interface ResultData {
	city: City;
	data: WeatherInfo;
}
