import { Component, OnInit} from '@angular/core';

import { Film } from '../../../models/film.model';
import { FilmService } from '../../../services/film.service';
import { ActivatedRoute,Router, Params } from '@angular/router';

@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html'
})
export class FilmDetailComponent implements OnInit {
  film: Film;
  id: number;

  constructor(private filmService: FilmService,
              private route: ActivatedRoute,
              private router: Router
  ) {
    console.log('constructor');
   }

  ngOnInit() {
    console.log('init');
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.filmService.getFilm(this.id)
            .then(film => this.film = film)
            .catch(error => console.log(error));
        }
      );
  }


  onEditFilm(){
    this.router.navigate(['edit'],{relativeTo: this.route})
  }

  onDeleteFilm(){
    this.filmService.deleteFilm(this.id);
    this.router.navigate(['/films']);
  }
}