import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private _location: Location,
    public router: Router
  ) { }

  ngOnInit() {

  }
  backClicked() {
    this._location.back();
  }
  ngOnDestroy() {
    localStorage.clear();
  }
}
