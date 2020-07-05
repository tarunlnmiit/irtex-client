import { Component, OnInit } from '@angular/core';
import { HowToPageComponent } from '../how-to-page/how-to-page.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openHelpDialog() {
    const dialogRef = this.dialog.open(HowToPageComponent, {
      width: '1000',
      height: '600',
    });
  }
}
