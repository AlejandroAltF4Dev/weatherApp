import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherComponent } from './weather.component';
import { WeatherTableComponent } from './components/weather-table/weather-table.component';
import { WeatherRoutingModule } from './weather-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { WeatherForecastServicesModule } from '@bp/weather-forecast/services';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
	declarations: [WeatherComponent, WeatherTableComponent],
	imports: [
		CommonModule,
		WeatherRoutingModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonToggleModule,
		MatIconModule,
		MatButtonModule,
		MatTableModule,
		MatSnackBarModule,
		MatCardModule,
		WeatherForecastServicesModule,
		MatProgressBarModule,
	],
})
export class WeatherPageModule {}
