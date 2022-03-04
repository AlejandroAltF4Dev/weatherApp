import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{ path: '', loadChildren: () => import('@bp/weather/page').then(m => m.WeatherPageModule) },
	{ path: '**', redirectTo: '/' },
];

@NgModule({
	declarations: [],
	imports: [CommonModule, RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
