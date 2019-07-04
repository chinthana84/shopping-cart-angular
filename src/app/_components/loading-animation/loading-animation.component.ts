import { Component, OnInit } from '@angular/core';
import { HTTPStatus } from '@app/_helpers/HTTPStatus';

@Component({
  selector: 'app-loading-animation',
  templateUrl: './loading-animation.component.html',
  styleUrls: ['./loading-animation.component.css']
})
export class LoadingAnimationComponent implements OnInit {
  HTTPActivity: boolean;
  constructor(private _httpStatus: HTTPStatus) { }

  ngOnInit() {
     this._httpStatus.getHttpStatus()
     .subscribe((status: boolean) => {this.HTTPActivity = status;   });

  }

}
