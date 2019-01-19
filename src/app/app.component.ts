import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadFeature = 'recipe';
  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyBxtHfU2nSlooOsxHkxeUVzAXP_5V7VqWU',
      authDomain: 'ng-recipe-book-a694e.firebaseapp.com'
    });
  }
  onNavigate(feature: string) {
    this.loadFeature = feature;
  }
}
