import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getCitiesDaily, getCitiesHourly, getError, getLoading, loadCityGeo } from '@bp/weather-forecast/services';
import { Store } from '@ngrx/store';
import {ActivatedRoute, Router} from "@angular/router";

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

	constructor(private fb: FormBuilder, private store: Store, private route: ActivatedRoute, private router: Router) {}

	ngOnInit(): void {
		const {q, mode} = this.route.snapshot.queryParams;
		this.searchForm = this.fb.group({
			q: [q || '', [Validators.required]],
			mode: [mode || 'hourly', []],
		});
		this.searchForm.valueChanges.subscribe((values)=> {
		})
	}

	search() {
		if (this.searchForm.invalid) {
			return;
		}
		const formValues = this.searchForm.value;
		this.router.navigate([], {queryParams: formValues, queryParamsHandling: 'merge'})
		const { q: cityName } = formValues;
		this.store.dispatch(loadCityGeo({ cityName, mode: this.searchForm.value.mode }));
		this.searchForm.patchValue({ q: '' }, { emitEvent: false });
	}
}
