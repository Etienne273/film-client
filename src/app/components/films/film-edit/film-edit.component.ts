import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { FilmService } from '../../../services/film.service';

@Component({
  selector: 'app-film-edit',
  templateUrl: './film-edit.component.html'
})
export class FilmEditComponent implements OnInit {
  id: number;
  editMode = false;
  filmForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private filmService: FilmService,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      );
  }

  onSubmit() {
    if (this.editMode) {
      this.filmService.updateFilm(this.id, this.filmForm.value);
    } else {
      this.filmService.addFilm(this.filmForm.value);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    let filmName = '';
    let filmImagePath = '';
    let filmDescription = '';
    let currentfilm;

    if (this.editMode) {
      this.filmService.getFilm(this.id)
      .then(
        film => {
        currentfilm = film;
        filmName = currentfilm.name;
        filmImagePath = currentfilm.imagePath;
        filmDescription = currentfilm.description;
        //  if (currentfilm['ingredients']) {
        //    for (let ingredient of currentfilm.ingredients) {
        //      recipeIngredients.push(
        //        new FormGroup({
        //          'name': new FormControl(ingredient.name, Validators.required),
        //          'amount': new FormControl(ingredient.amount, [
        //            Validators.required,
        //            Validators.pattern(/^[1-9]+[0-9]*$/)
        //          ])
        //        })
        //      );
        //    }
        //  }
        }
      )
      .catch(error => console.log(error));
      
    }

    this.filmForm = new FormGroup({
      'name': new FormControl(filmName, Validators.required),
      'imagePath': new FormControl(filmImagePath, Validators.required),
      'description': new FormControl(filmDescription, Validators.required),
    });
  }

}
