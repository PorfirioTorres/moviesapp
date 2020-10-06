import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from '../../interfaces/listing-response';

@Component({
  selector: 'app-peliculas-poster-grid',
  templateUrl: './peliculas-poster-grid.component.html',
  styleUrls: ['./peliculas-poster-grid.component.css']
})
export class PeliculasPosterGridComponent implements OnInit {
  @Input() movies: Movie[];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public getMovie(movie: Movie): void{
    this.router.navigate(['/movie', movie.id]);
  }

}
