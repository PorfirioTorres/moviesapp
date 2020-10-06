import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieDetails } from '../../interfaces/movie-response';
import { MoviesService } from '../../services/movies.service';
import { Cast } from '../../interfaces/credits-response';
import { combineLatest } from 'rxjs';


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  public movie: MovieDetails;
  public cast: Cast[];

  constructor(private activatedRoute: ActivatedRoute, private movieService: MoviesService,
              private location: Location, private router: Router) { }

  ngOnInit(): void {
    // con desestructuracion se pueden obtener de la url todos los parametros que vengan
    // const { id, texto, va1, val2, ... } = this.activatedRoute.snapshot.params;
    const { id } = this.activatedRoute.snapshot.params;

    combineLatest([
      this.movieService.getMovieDetails(id),
      this.movieService.getMovieCredits(id)
    ]).subscribe(
      ([movie, cast]) => {
        if (!movie) {
          this.router.navigateByUrl('/home');
          return;
        } else {
          this.movie = movie;
        }

        this.cast = cast.filter(actor => actor.profile_path !== null);
      }
    );
  }

  public back(): void {
    this.location.back();
  }

}
