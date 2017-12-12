import { Component, OnInit, OnDestroy } from '@angular/core';

import { Zaal } from '../../models/zaal.model';
import { ZaalService } from '../../services/zaal.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-zaal',
  templateUrl: './zaal.component.html'
})
export class ZalenComponent implements OnInit, OnDestroy {
  zalen: Zaal[];
  private subscription : Subscription;
  constructor(private slService: ZaalService) { }

  ngOnInit() {
        this.slService.getZalen()
          .then((zalen) => {
            this.zalen = zalen
          }
        );
        this.subscription = this.slService.zalenChanged
        .subscribe(
          (zalen: Zaal[]) => {
            this.zalen = zalen;
          }
        );
      }

  onEditItem(id:number){
    console.log("dit id klik je aan : " + id);
    this.slService.startedEditing.next(id);
  }

  ngOnDestroy(){
   this.subscription.unsubscribe();
  }
}