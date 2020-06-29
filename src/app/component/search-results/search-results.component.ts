import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { SearchService } from 'src/app/services/search.service';
import { ActivatedRoute } from '@angular/router';
import { SearchResult } from 'src/app/common/searchResult';
import { QueryImage } from 'src/app/common/queryImage';
import { environment } from '../../../environments/environment';
import { ResultResponse } from 'src/app/common/resultResponse';
import { MatSelectChange } from '@angular/material/select';
import { MatOptionSelectionChange } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { ExplainDialogComponent } from '../explain-dialog/explain-dialog.component';
import { Router } from '@angular/router';
import { CompareDialogComponent } from '../compare-dialog/compare-dialog.component';
import { Settings } from 'src/app/common/settings';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
})
export class SearchResultsComponent implements OnInit {
  resultResponse: ResultResponse;
  results: SearchResult[];
  renderedResults: SearchResult[];
  imageId: string;
  query: QueryImage;
  features = [];
  endpoints = [];
  hideSpinner = true;
  hideExplanationSpinner = true;
  error: string;
  explainError: string;
  selectedFeature: string;
  globalExplanation: string;
  @Input() hideSearchForm: boolean;
  @Input() boundedQuery: string;
  @Input() boundedQueryUrl: string;
  @Input() sessionId: string;
  @Input() dataset: string;

  // ImageBaseUrl = 'https://irtex-engine.herokuapp.com';
  ImageBaseUrl = Settings.baseUrl;
  // MatPaginator Inputs
  length: number;
  pageSize: number;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent;

  selectedImages: string[];

  constructor(
    private searchService: SearchService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.error = '';
    this.results = [];
    this.selectedImages = [];
  }

  ngOnChanges(changes) {
    console.log(changes);
    if (this.boundedQuery != '') {
      this.query = { name: this.boundedQuery, url: this.boundedQueryUrl };
      this.renderedResults = [];
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { query_url: this.boundedQueryUrl },
        queryParamsHandling: 'merge',
      });
      this.initializePage();
    }
  }

  ngOnInit(): void {
    // if (this.route.snapshot.queryParams['session_id']) {
    //   this.sessionId = this.route.snapshot.queryParams['session_id'];
    // }
    // if (this.route.snapshot.queryParams['dataset']) {
    //   this.dataset = this.route.snapshot.queryParams['dataset'];
    // }
    // this.initializePage();
    // this.route.paramMap.subscribe(() => {
    //   if (this.hideSpinner) {
    //     this.initializePage();
    //   }
    // });
  }
  initializePage() {
    //this.query = new QueryImage();
    //this.getQueryImage();

    if (this.boundedQueryUrl != null) {
      this.imageId = this.query.url;
      this.loadResults(true);
    }
  }

  loadResults(isUrlSearch: boolean): void {
    this.hideSpinner = false;
    this.searchService
      .getSearchResults(this.imageId, this.dataset, isUrlSearch, this.sessionId)
      .subscribe(
        (data) => {
          console.log(data);
          this.hideSpinner = true;
          this.resultResponse = data;
          this.showResults();
        },
        (err) => {
          this.error = err.message;
          this.hideSpinner = true;
          console.log(err);
        }
      );

    //get global explanation
    this.getGloblaExplanation();
  }

  showResults(): void {
    if (this.resultResponse.features != null) {
      this.features = this.resultResponse.features;
      this.endpoints = this.resultResponse.endpoints;
      this.selectedFeature = this.features[0];
      this.results = this.resultResponse.result;
      this.length = this.results.length;
      this.pageSize = 10;
      this.renderPagination();
    }
  }

  renderPagination(): void {
    this.renderedResults =
      this.results.length > 10
        ? this.results.slice(0, this.pageSize)
        : this.results;
  }

  onRankByChanged(event: MatOptionSelectionChange): MatOptionSelectionChange {
    if (event.isUserInput) {
      this.hideSpinner = false;
      this.renderedResults = [];
      switch (event.source.value) {
        case this.features[0]:
          this.results = this.resultResponse.result;
          break;

        case this.features[1]:
          this.results = this.resultResponse.cld;
          break;
        case this.features[2]:
          this.results = this.resultResponse.rbsd;
          break;

        default:
          this.results = this.resultResponse.result;
          break;
      }
      console.log(event);
      this.selectedFeature = event.source.value;
      this.renderPagination();
      this.hideSpinner = true;
    }

    return event;
  }

  paginateResult(event: PageEvent): PageEvent {
    this.renderedResults = this.results.slice(
      event.pageIndex * event.pageSize,
      event.pageIndex * event.pageSize + event.pageSize
    );

    return event;
  }

  logUserClick(index): void {
    //Todo: send event to log file
    console.log(index + ' was clicked');
  }

  toFloatPercentage(val) {
    try {
      return (parseFloat(val) * 100).toFixed(2);
    } catch (error) {}
  }

  openDialog(resultItem) {
    const dialogRef = this.dialog.open(ExplainDialogComponent, {
      width: '600',
      height: '600',
      data: {
        query: this.imageId,
        result: resultItem,
        sessionId: this.sessionId,
        dataset: this.dataset,
        features: this.features,
        endpoints: this.endpoints,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onImageselect(imgName) {
    if (this.selectedImages.indexOf(imgName) >= 0) {
      this.selectedImages.splice(this.selectedImages.indexOf(imgName), 1);
    } else {
      this.selectedImages.push(imgName);
    }
    console.log(this.selectedImages);
  }

  onCompareButtonClicked() {
    //send data of the selected item
    let selected = this.results.filter((x) => {
      return this.selectedImages.indexOf(x.name) >= 0;
    });
    const dialogRef = this.dialog.open(CompareDialogComponent, {
      width: '1000',
      height: '800',
      data: {
        query: this.imageId,
        results: selected,
        sessionId: this.sessionId,
        dataset: this.dataset,
        features: this.features,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  getGloblaExplanation() {
    this.hideExplanationSpinner = false;
    this.searchService
      .getSearchGlobalExplanation(this.imageId, this.dataset, this.sessionId)
      .subscribe(
        (data) => {
          console.log(data);
          this.hideExplanationSpinner = true;
          this.globalExplanation = data.explanation;
        },
        (err) => {
          this.explainError = err.message;

          this.hideExplanationSpinner = true;
          console.log(err);
          //show error message.
        }
      );
  }
}
