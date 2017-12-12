
import { Component, OnInit,OnDestroy, ViewEncapsulation,Output,EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FilmService } from '../../../services/film.service';
import { Film } from '../../../models/film.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  encapsulation: ViewEncapsulation.None
})
export class FilmListComponent implements OnInit, OnDestroy {
  films: Film[];
  subscription: Subscription;

  constructor(private filmService: FilmService,
              private router: Router,
              private route: ActivatedRoute
  ) { }

  ngOnInit(){
      this.subscription = this.filmService.filmsChanged.subscribe(
          (films : Film[]) => {
              this.films = films;
          }
      );
    this.filmService.getFilms()
      .then(films => {
          this.films = films
    })
      .catch(error => console.log(error));
  }

  onNewFilm(){
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy() {
   this.subscription.unsubscribe();
  }
}