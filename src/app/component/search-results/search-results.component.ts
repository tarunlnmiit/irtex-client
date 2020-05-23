import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { SearchService } from 'src/app/services/search.service';
import { ActivatedRoute } from '@angular/router';
import { SearchResult } from 'src/app/common/searchResult';
import { QueryImage } from 'src/app/common/queryImage';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
})
export class SearchResultsComponent implements OnInit {
  results: SearchResult[];
  renderedResults: SearchResult[];
  imageId: string;
  query: QueryImage;
  features = ['CLD', 'RBD', 'ORB'];
  hideSpinner = true;
  error: string;

  ImageBaseUrl = environment.backEndUrl;
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
  }

  ngOnInit(): void {
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
      this.searchService.getSearchResults(this.imageId).subscribe(
        (data) => {
          console.log(data);
          this.hideSpinner = true;
          this.results = data;
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
    this.length = this.results.length;
    this.pageSize = 10;
    this.renderedResults =
      this.results.length > 10
        ? this.results.slice(0, this.pageSize)
        : this.results;
  }

  paginateResult(event: PageEvent): PageEvent {
    this.renderedResults = this.results.slice(
      event.pageIndex * event.pageSize,
      event.pageIndex * event.pageSize + event.pageSize
    );

    return event;
  }
}
