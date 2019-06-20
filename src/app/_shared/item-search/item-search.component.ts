import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ItemService } from '@app/_services/item.service';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { Item } from '@app/_models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-search',
  templateUrl: './item-search.component.html'
})
export class ItemSearchComponent implements OnInit {
  results: any[] = [];
  queryField: FormControl = new FormControl();
  constructor(private _itemService: ItemService, private router: Router) { }

  ngOnInit() {
    this.queryField.valueChanges
      .distinctUntilChanged()
      .switchMap((query) => this._itemService.itemSearchByName(query))
      .subscribe((r: any[]) => {
        debugger
        this.results = r;
      });
  }
  loadSearchedItem(item: Item) {
    debugger
    this.results = [];

    this.router.navigate(['/item'], { queryParams: { i: item.itemId } });
  }
}


