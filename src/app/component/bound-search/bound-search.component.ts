import { Component, OnInit } from '@angular/core';
import { QueryImage } from 'src/app/common/queryImage';
import { query } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from 'src/app/services/search.service';
import { Settings } from 'src/app/common/settings';

@Component({
  selector: 'app-bounded-search',
  templateUrl: './bound-search.component.html',
  styleUrls: ['./bound-search.component.css'],
})
export class BoundSearchComponent implements OnInit {
  queryImages: QueryImage[];
  queryName: string;
  queryUrl: string;
  hideSpinner = true;
  dataset: '';
  sessionId: '';
  error = '';
  ImageBaseUrl = Settings.baseUrl;

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.queryParams['session_id']) {
      this.sessionId = this.route.snapshot.queryParams['session_id'];
    }
    if (this.route.snapshot.queryParams['dataset']) {
      this.dataset = this.route.snapshot.queryParams['dataset'];
    }
    if (this.route.snapshot.queryParams['query_url']) {
      this.queryUrl = this.route.snapshot.queryParams['query_url'];
      this.queryName = this.queryUrl.split('/')[
        this.queryUrl.split('/').length - 1
      ];
    }
    this.loadQuerySet();
  }

  onQueryImageClick(imgName, imgUrl) {
    this.queryUrl = imgUrl;
    this.queryName = imgName;
  }

  loadQuerySet(): void {
    this.hideSpinner = false;
    if (this.route.snapshot.queryParams['session_id']) {
      this.searchService.getQuerySet(this.dataset, this.sessionId).subscribe(
        (data) => {
          this.queryImages = data;
          this.hideSpinner = true;
        },
        (err) => {
          this.error = err.message;

          this.hideSpinner = true;
          console.log(err);
        }
      );
    } else {
      //url is faulty
    }
  }
}
