import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import * as fromWeather from './+state/weather.reducer';
import { WeatherEffects } from './+state/weather.effects';
import { environment } from '../../../../../apps/weather-forecast/src/environments/environment';

@NgModule({
	imports: [
		CommonModule,
		HttpClientModule,
		!environment.production ? StoreDevtoolsModule.instrument() : [],
		StoreModule.forFeature(fromWeather.WEATHER_FEATURE_KEY, fromWeather.reducer),
		EffectsModule.forFeature([WeatherEffects]),
	],
})
export class WeatherForecastServicesModule {}
