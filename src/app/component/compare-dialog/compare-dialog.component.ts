import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SearchResult } from 'src/app/common/searchResult';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { PieChartObject } from 'src/app/common/pieChartObject';

@Component({
  selector: 'app-compare-dialog',
  templateUrl: './compare-dialog.component.html',
  styleUrls: ['./compare-dialog.component.css'],
})
export class CompareDialogComponent implements OnInit {
  pieCharts: PieChartObject[];

  results: SearchResult[];
  features: string[];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data);
    this.results = data.results as SearchResult[];
    this.features = data.features as string[];
    this.doCompare();
  }

  ngOnInit(): void {}

  doCompare() {
    let similrities = this.results.map((x) => {
      return x.similarity_list;
    });
    let numberOfFeatures = this.features.length;
    let featureScores = new Array(numberOfFeatures);
    let numberOfInstances = similrities.length;
    const labels = this.results.map((x) => {
      return x.name;
    });

    for (let i = 0; i < numberOfFeatures; i++) {
      featureScores[i] = new Array(numberOfInstances);
    }
    for (let i = 0; i < numberOfFeatures; i++) {
      for (let j = 0; j < numberOfInstances; j++) {
        featureScores[i][j] = similrities[j][i];
      }
    }
    //console.log(featureScores);
    let normalizedScores = this.normalizeFeatures(featureScores);
    this.pieCharts = new Array(numberOfFeatures);
    for (let i = 0; i < numberOfFeatures; i++) {
      const p = new PieChartObject();
      p.pieChartData = normalizedScores[i];
      p.pieChartLabels = labels;
      this.pieCharts[i] = p;
    }

    console.log(this.pieCharts);
  }

  normalizeFeatures(_featureScores) {
    for (let i = 0; i < _featureScores.length; i++) {
      let element = _featureScores[i];
      const sum = element.reduce((partialSum, a) => partialSum + a, 0);
      _featureScores[i] = element.map((x) => {
        return x / sum;
      });
    }
    return _featureScores;
  }

  showPieChart(_scores, labels) {}
}
