import { Component, OnInit, ViewEncapsulation, Input,Output,EventEmitter } from '@angular/core';
import { Film } from '../../../../models/film.model';
import { FilmService } from '../../../../services/film.service';
@Component({
  selector: 'app-film-item',
  templateUrl: './film-item.component.html',
  encapsulation: ViewEncapsulation.None
})
export class FilmItemComponent implements OnInit {
  @Input() film: Film;
  @Input() index: number;
  

  constructor(private filmService: FilmService) { }

  ngOnInit() {
      console.dir(this.film);
  }



}