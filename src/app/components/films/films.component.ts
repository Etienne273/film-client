import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FilmService } from '../../services/film.service';
@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  encapsulation: ViewEncapsulation.None,
  providers:[FilmService]
})
export class FilmsComponent implements OnInit {

  constructor(private FilmService: FilmService) {
  }

  ngOnInit() {
  }

}
