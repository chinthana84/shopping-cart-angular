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

  searchTerm: FormControl = new FormControl();
  myBooks = <any>[];
  constructor(private _itemService: ItemService, private router: Router) { }

  ngOnInit() {

    this.searchTerm.valueChanges.subscribe(
      term => {
        if (term !== '') {
          this._itemService.itemSearchByName(term).subscribe(
            data => {
              this.myBooks = data as any[];
            });
        }
      });
  }
  loadSearchedItem(item: Item) {
    this.results = [];
    this.searchTerm.setValue('');
    this.router.navigate(['/item'], { queryParams: { i: item.itemId } });
  }
  searchItems() {
    if (this.searchTerm.value !== '') {
      this.myBooks = [];
      this.router.navigate(['/items'], { queryParams: { 'search': this.searchTerm.value } });
      this.searchTerm.setValue('');
    }
  }
}


