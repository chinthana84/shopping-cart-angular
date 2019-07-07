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
  showDropDown: boolean;

  constructor(private _itemService: ItemService, private router: Router) { }

  ngOnInit() {
    this.showDropDown = true;
    this.queryField.valueChanges.subscribe(
      term => {
        if (term !== '') {
          this._itemService.itemSearchByName(term).subscribe(
            data => {
              this.results = data as Item[];
              this.showDropDown = true;
            });
        }
      });
  }

  loadSearchedItem(item: Item) {
    this.results = [];
    this.queryField.setValue('');
    this.router.navigate(['/item'], { queryParams: { i: item.ItemID } });
  }

  searchItems() {
    if (this.queryField.value !== '') {
    this.results = [];
      this.router.navigate(['/items'], { queryParams: { 'search': this.queryField.value } });
      this.queryField.setValue('');
    }
  }

  closeDropDown() {
    this.showDropDown = false;
  }

}


