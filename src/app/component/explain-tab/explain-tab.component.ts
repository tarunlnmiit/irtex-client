import { Component, OnInit, Input } from '@angular/core';
import { ExplainService } from 'src/app/services/explain.service.';

@Component({
  selector: 'app-explain-tab',
  inputs: ['query', 'result', 'dataset', 'sessionId'],
  templateUrl: './explain-tab.component.html',
  styleUrls: ['./explain-tab.component.css'],
})
export class ExplainTabComponent implements OnInit {
  @Input() query: string;
  @Input() result: string;
  @Input() dataset: string;
  @Input() sessionId: string;
  error: '';
  features: string[];
  constructor(private explainService: ExplainService) {}

  ngOnInit(): void {
    this.features = ['COLOR', 'SHAPE', 'Keypoints'];
    this.getExplnation();
  }

  getExplnation() {
    let p = {
      query: this.query,
      result: this.result,
      dataset: this.dataset,
      session_id: this.sessionId,
    };
    const parameters = new URLSearchParams(p).toString();
    this.explainService.getQueryImageDetails(parameters).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        this.error = err.message;

        //this.hideSpinner = true;
        console.log(err);
        //show error message.
      }
    );
  }
}
