import { Component, Input } from '@angular/core';
import { ResultData } from '@bp/interfaces';

interface ColumnType {
	columnDef: string;
	header: string;
	cell: (element: ResultData) => string;
}

@Component({
	selector: 'bp-weather-table',
	templateUrl: './weather-table.component.html',
	styleUrls: ['./weather-table.component.scss'],
})
export class WeatherTableComponent {
	displayedColumns!: string[];
	_data!: ResultData[];
	columns!: ColumnType[];
	@Input() mode!: string;

	@Input() set data(results: ResultData[]) {
		this._data = results;
		this.buildColumns(results);
	}

	private buildColumns(results: ResultData[]) {
		const [result] = results;
		if (result.data.daily) {
			this.columns = [
				{
					columnDef: 'city',
					header: 'City',
					cell: (element: ResultData) => `${element.city.name}, ${element.city.country}`,
				},
				...result.data.daily.map((day, index) => ({
					columnDef: day.dt.toString(),
					header: (day.dt * 1000).toString(),
					cell: (element: ResultData) =>
						`${element.data.daily?.find((dayItem, i) => i === index)?.temp?.day}`,
				})),
			];
		} else if (result.data.hourly) {
			this.columns = [
				{
					columnDef: 'city',
					header: 'City',
					cell: (element: ResultData) => `${element.city.name}, ${element.city.country}`,
				},
				...result.data.hourly.map(hour => ({
					columnDef: hour.dt.toString(),
					header: (hour.dt * 1000).toString(),
					cell: (element: ResultData) =>
						`${element.data.hourly?.find(hourItem => hour.dt === hourItem.dt)?.temp}`,
				})),
			];
		}
		this.displayedColumns = this.columns.map(column => column.columnDef);
	}
}
