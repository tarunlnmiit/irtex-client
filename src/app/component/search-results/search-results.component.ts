import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { SearchService } from 'src/app/services/search.service';
import { ActivatedRoute } from '@angular/router';
import { SearchResult } from 'src/app/common/searchResult';
import { QueryImage } from 'src/app/common/queryImage';
import { environment } from '../../../environments/environment';
import { ResultResponse } from 'src/app/common/resultResponse';
import { MatSelectChange } from '@angular/material/select';
import { MatOptionSelectionChange } from '@angular/material/core';

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
  hideSpinner = true;
  error: string;
  selectedFeature: string;
  dataset: string;
  sessionId: string;

  // ImageBaseUrl = 'https://irtex-engine.herokuapp.com';
  ImageBaseUrl = 'http://localhost:8000';
  // MatPaginator Inputs
  length: number;
  pageSize: number;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent;

  constructor(
    private searchService: SearchService,
    private route: ActivatedRoute
  ) {
    this.error = '';
    this.results = [];
  }

  ngOnInit(): void {
    if (this.route.snapshot.queryParams['session_id']) {
      this.sessionId = this.route.snapshot.queryParams['session_id'];
    }
    if (this.route.snapshot.queryParams['dataset']) {
      this.dataset = this.route.snapshot.queryParams['dataset'];
    }
    this.route.url.subscribe((url) => {
      if (this.route.snapshot.queryParams['inHome']) {
        const inHome = this.route.snapshot.queryParams['inHome'];
        console.log(inHome);
        if (inHome == 'false') {
          this.initializePage();
        }
      }
    });
    this.route.paramMap.subscribe(() => {
      if (this.hideSpinner) {
        this.initializePage();
      }
    });
  }
  initializePage() {
    this.query = new QueryImage();
    this.getQueryImage();
    this.loadResults();
  }
  getQueryImage(): void {
    if (this.route.snapshot.queryParams['id']) {
      this.imageId = this.route.snapshot.queryParams['id'];
      this.searchService.getQueryImageDetails(this.imageId).subscribe(
        (data) => {
          this.query = data;
          this.renderedResults = [];
        },
        (err) => {
          this.error = err.message;

          this.hideSpinner = true;
          console.log(err);
          //show error message.
        }
      );
    } else {
      //url is faulty
    }
  }

  loadResults(): void {
    if (this.route.snapshot.queryParams['id']) {
      this.hideSpinner = false;
      this.imageId = this.route.snapshot.queryParams['id'];
      this.searchService.getSearchResults(this.imageId, this.dataset).subscribe(
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
          //show error message.
        }
      );
    } else {
      //url is faulty
    }
  }

  showResults(): void {
    this.features = this.resultResponse.features;
    this.selectedFeature = this.features[0];
    this.results = this.resultResponse.result;
    this.length = this.results.length;
    this.pageSize = 10;
    this.renderPagination();
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
      return parseFloat(val) * 100;
    } catch (error) {}
  }
}
