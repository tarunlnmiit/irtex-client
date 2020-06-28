import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ExplainDialogComponent } from '../explain-dialog/explain-dialog.component';

@Component({
  selector: 'app-explain-page',
  templateUrl: './explain-page.component.html',
  styleUrls: ['./explain-page.component.css'],
})
export class ExplainPageComponent implements OnInit {
  search: {
    sessionId: string;
    dataset: string;
    query: string;
    result: string;
  };
  error = '';

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {
    this.search = { sessionId: null, query: null, result: null, dataset: null };
  }

  ngOnInit(): void {
    if (this.route.snapshot.queryParams['session_id']) {
      this.search.sessionId = this.route.snapshot.queryParams['session_id'];
    }
    if (this.route.snapshot.queryParams['dataset']) {
      this.search.dataset = this.route.snapshot.queryParams['dataset'];
    }
    if (this.route.snapshot.queryParams['query']) {
      this.search.query = this.route.snapshot.queryParams['query'];
    }
    if (this.route.snapshot.queryParams['result']) {
      this.search.result = this.route.snapshot.queryParams['result'];
    }

    console.log(this.search);
    //this.openDialog();
  }
}
