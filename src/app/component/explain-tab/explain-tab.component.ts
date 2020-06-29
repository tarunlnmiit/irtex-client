import { Component, OnInit, Input } from '@angular/core';
import { ExplainService } from 'src/app/services/explain.service.';
import { Explanation } from 'src/app/common/explanation';

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
  @Input() features: string[];
  error: '';
  explanations: Explanation[];
  hideSpinners: boolean[];
  errors: string[];
  constructor(private explainService: ExplainService) {}

  ngOnInit(): void {
    this.getExplnation();
  }

  getExplnation() {
    this.explanations = new Array(this.features.length);
    this.hideSpinners = new Array(this.features.length);
    this.errors = new Array(this.features.length);

    for (let i = 0; i < this.explanations.length; i++) {
      this.hideSpinners[i] = false;
      let p = {
        query: this.query,
        result: this.result,
        dataset: this.dataset,
        session_id: this.sessionId,
        feature: this.features[i],
      };
      const parameters = new URLSearchParams(p).toString();
      this.explainService.getQueryImageDetails(parameters).subscribe(
        (data) => {
          console.log(data);
          this.explanations[i] = data.explanations as Explanation;
        },
        (err) => {
          this.error = err.message;

          this.hideSpinners[i] = true;
          console.log(err);
          this.errors[i] = err;
        }
      );
    }
  }
}
