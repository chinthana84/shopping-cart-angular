import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '@app/_models/user';
import { ItemService } from '@app/_services/item.service';
import { DataService } from '@app/_services/data.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  item: Item = {};
  constructor(private activatedRoute: ActivatedRoute,
    private router: Router, private _itemSer: ItemService,
    private dataSer: DataService) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this._itemSer.getItem(params['i']).subscribe((data: any) => {
        this.item = data;
      });
    });
  }

  addShoppingCartItem(item) {
    this.dataSer.addShoppingCartItem(item);
    this.dataSer.currentSPCartCount();
    this.router.navigate(['/shoppinCart']);
  }

}

