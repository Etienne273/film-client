import { Component, OnInit, OnDestroy } from '@angular/core';

import { Hall } from '../../models/hall.model';
import { HallService } from '../../services/hall.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-hall',
  templateUrl: './hall.component.html'
})
export class HallsComponent implements OnInit, OnDestroy {
  halls: Hall[];
  private subscription : Subscription;
  constructor(private slService: HallService) { }

  ngOnInit() {
        this.slService.getHalls()
          .then((halls) => {
            this.halls = halls
          }
        );
        this.subscription = this.slService.hallsChanged
        .subscribe(
          (halls: Hall[]) => {
            this.halls = halls;
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