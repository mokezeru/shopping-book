import { Component, OnInit} from '@angular/core';
import { DataStorageSrvice } from '../shared/data-storage.service';
import { Response } from '@angular/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private dataStorageService: DataStorageSrvice) { }

  ngOnInit() {
  }

  onSaveData() {
      this.dataStorageService.storeRecipe()
        .subscribe((res: Response) => {
          console.log(res);
        });
  }
  onFetchData() {
    this.dataStorageService.getRecipes();
  }
}
