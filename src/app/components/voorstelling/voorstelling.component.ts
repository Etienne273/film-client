import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { VoorstellingService } from '../../services/voorstelling.service';
import { Voorstelling } from '../../models/voorstelling.model';

@Component({
  selector: 'app-voorstelling',
  templateUrl: './voorstelling.component.html'
})
export class VoorstellingComponent implements OnInit {

  title = 'Voorstelling';
  voorstellingen: Voorstelling[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private voorstellingService: VoorstellingService
  ) { }

  ngOnInit(): void {
    this.voorstellingService.getVoorstellingen()
      .then(voorstellingen => this.voorstellingen = voorstellingen)
      .catch(error => console.log(error));
  }


}