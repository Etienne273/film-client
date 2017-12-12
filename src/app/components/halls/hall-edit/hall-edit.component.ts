import {
    Component,
    OnInit,
    ElementRef,
    ViewChild,
    OnDestroy
  } from '@angular/core';
  
  import { Hall } from '../../../models/hall.model';
  import { HallService } from '../../../services/hall.service';
  import { NgForm } from '@angular/forms';
  import { Subscription } from 'rxjs';
  
  @Component({
    selector: 'app-hall-edit',
    templateUrl: './hall-edit.component.html'
 })
  export class HallEditComponent implements OnInit, OnDestroy {
    @ViewChild("f") slForm: NgForm;
    subscription: Subscription;
    editMode: boolean = false;
    editedItemId: number;
    editedItem: Hall;
  
    constructor(private slService: HallService) { }
  
    ngOnInit() {
  
      this.subscription = this.slService.startedEditing
        .subscribe(
          (id:number) => {
  
            this.editedItemId = id;
  
            this.editMode = true;
  
            this.slService.getHall(id)
              .then( hall => {
                this.editedItem = hall
                this.slForm.setValue({
                  name : this.editedItem.name, 
                  description: this.editedItem.description
                })
              })
              .catch( error => console.log(error) );
            });
          };
    
  
    onSubmit(form: NgForm) {
      const value = form.value;
      const newHall = new Hall(value.name, value.description);
      if (this.editMode) {
        this.slService.updateHall(this.editedItemId, newHall);
      } else {
        this.slService.addHall(newHall);
      }
      this.editMode = false;
      form.reset();
    }
  
    onDelete() {
      this.slService.deleteHall(this.editedItemId);
      this.onClear();
    }
  
    onClear(){
      this.slForm.reset();
      this.editMode = false;
    }
  
    ngOnDestroy(){
      this.subscription.unsubscribe();
    }
    
  }