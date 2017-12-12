import {
    Component,
    OnInit,
    ElementRef,
    ViewChild,
    OnDestroy
  } from '@angular/core';
  
  import { Zaal } from '../../../models/zaal.model';
  import { ZaalService } from '../../../services/zaal.service';
  import { NgForm } from '@angular/forms';
  import { Subscription } from 'rxjs';
  
  @Component({
    selector: 'app-zaal-edit',
    templateUrl: './zaal-edit.component.html'
 })
  export class ZaalEditComponent implements OnInit, OnDestroy {
    @ViewChild("f") slForm: NgForm;
    subscription: Subscription;
    editMode: boolean = false;
    editedItemId: number;
    editedItem: Zaal;
  
    constructor(private slService: ZaalService) { }
  
    ngOnInit() {
  
      this.subscription = this.slService.startedEditing
        .subscribe(
          (id:number) => {
  
            this.editedItemId = id;
  
            this.editMode = true;
  
            this.slService.getZaal(id)
              .then( zaal => {
                this.editedItem = zaal
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
      const newZaal = new Zaal(value.name, value.description);
      if (this.editMode) {
        this.slService.updateZaal(this.editedItemId, newZaal);
      } else {
        this.slService.addZaal(newZaal);
      }
      this.editMode = false;
      form.reset();
    }
  
    onDelete() {
      this.slService.deleteZaal(this.editedItemId);
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