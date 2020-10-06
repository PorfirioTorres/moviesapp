import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/listing-response';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  public moviesListing: Movie[];
  public moviesSlide: Movie[];

  constructor(private moviesService: MoviesService) {
    this.moviesListing = [];
    this.moviesSlide = [];
  }

  @HostListener('window:scroll', ['$event'])
  public onScroll(): void {
    // obtiene la posicion del scroll cada que se mueve la barra
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + 1000;

    // maximo valor que puede tomar pos, es el height actual de la pagina
    const maxPos = (document.documentElement.scrollHeight || document.body.scrollHeight);

    if (pos >= maxPos) {
      if (this.moviesService.loadingPage) {
        return;
      }
      this.moviesService.getListingMovies().subscribe(
        movies => {
          this.moviesListing.push(...movies);
        }
      );
    }
  }

  ngOnInit(): void {
    this.moviesService.getListingMovies().subscribe(
      movies => {
        this.moviesSlide = movies;
        this.moviesListing = movies;
      }
    );
  }

  ngOnDestroy(): void {
    this.moviesService.resetPage();
  }

}
