import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { from } from 'rxjs';

import { AppComponent } from './app.component';
import { SearchFormComponent } from './component/search-form/search-form.component';
import { SearchResultsComponent } from './component/search-results/search-results.component';
import { HomePageComponent } from './component/home-page/home-page.component';

import { SearchService } from './services/search.service';

const routes: Routes = [
  { path: 'results', component: SearchResultsComponent },
  { path: '', component: HomePageComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    SearchFormComponent,
    SearchResultsComponent,
    HomePageComponent,
  ],
  imports: [
    MatTabsModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSelectModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' }),
  ],
  providers: [SearchService],
  bootstrap: [AppComponent],
})
export class AppModule {}
