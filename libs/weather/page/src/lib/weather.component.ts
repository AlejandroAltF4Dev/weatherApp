import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getCitiesDaily, getCitiesHourly, getError, getLoading, loadCityGeo } from '@bp/weather-forecast/services';
import { Store } from '@ngrx/store';

@Component({
	selector: 'bp-weather',
	templateUrl: './weather.component.html',
	styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {
	searchForm!: FormGroup;
	loading$ = this.store.select(getLoading);
	error$ = this.store.select(getError);
	citiesHourly$ = this.store.select(getCitiesHourly);
	citiesDaily$ = this.store.select(getCitiesDaily);

	constructor(private fb: FormBuilder, private store: Store) {}

	ngOnInit(): void {
		this.searchForm = this.fb.group({
			q: ['', [Validators.required]],
			mode: ['hourly', []],
		});
	}

	search() {
		if (this.searchForm.invalid) {
			return;
		}
		const { q: cityName } = this.searchForm.value;
		this.store.dispatch(loadCityGeo({ cityName, mode: this.searchForm.value.mode }));
		this.searchForm.patchValue({ q: '' }, { emitEvent: false });
	}
}
