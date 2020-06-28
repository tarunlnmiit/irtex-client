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
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { ChartsModule } from 'ng2-charts';

import { from } from 'rxjs';

import { AppComponent } from './app.component';
import { SearchFormComponent } from './component/search-form/search-form.component';
import { SearchResultsComponent } from './component/search-results/search-results.component';
import { HomePageComponent } from './component/home-page/home-page.component';
import { SignInComponent } from './component/sign-in/sign-in.component';
import { SearchService } from './services/search.service';
import { SearchPageComponent } from './component/search-page/search-page.component';
import { ExplainPageComponent } from './component/explain-page/explain-page.component';
import { ExplainDialogComponent } from './component/explain-dialog/explain-dialog.component';
import { ExplainTabComponent } from './component/explain-tab/explain-tab.component';
import { BoundSearchComponent } from './component/bound-search/bound-search.component';
import { CompareDialogComponent } from './component/compare-dialog/compare-dialog.component';

const routes: Routes = [
  { path: 'results', component: SearchResultsComponent },
  { path: 'search', component: BoundSearchComponent },
  { path: 'explain', component: ExplainPageComponent },
  { path: '', component: HomePageComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    SearchFormComponent,
    SearchResultsComponent,
    HomePageComponent,
    SignInComponent,
    SearchPageComponent,
    ExplainPageComponent,
    ExplainDialogComponent,
    ExplainTabComponent,
    BoundSearchComponent,
    CompareDialogComponent,
  ],
  imports: [
    ChartsModule,
    MatDialogModule,
    MatProgressBarModule,
    FormsModule,
    MatDividerModule,
    MatButtonModule,
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
