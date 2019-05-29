import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridService } from './grid-service/grid.service';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';
import { PagerComponent } from './pager/pager.component';

@NgModule({
  declarations: [SearchComponent,PagerComponent ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[SearchComponent,PagerComponent],
  providers:[GridService]
})
export class ChiGridModule { }
