import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { Cast, CreditsResponse } from '../interfaces/credits-response';
import { ListingResponse, Movie } from '../interfaces/listing-response';
import { MovieDetails } from '../interfaces/movie-response';
// import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private baseUrl: string;
  private page = 1;
  public loadingPage = false;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'https://api.themoviedb.org/3';
   }

   public resetPage() {
     this.page = 1;
   }

   private get params(): any {
     return {
      api_key: '10589dd32cd9dc1c43ca24b5367a46f3',
      languaje: 'es-ES',
      page: this.page
     };
   }

  public getListingMovies(): Observable<Movie[]> {

    if (this.loadingPage) {
      return of([]);
    }
    console.log('Cargando datos');
    this.loadingPage = true;
    return this.httpClient.get<ListingResponse>(`${this.baseUrl}/movie/now_playing`, {params: this.params})
    .pipe(
      map( resp => resp.results),
      tap(() => {
        this.page++;
        this.loadingPage = false;
      })
    );
  }

  public searchFormText(param: string): Observable<Movie[]> {
    const params = {... this.params, page: 1, query: param};

    return this.httpClient.get<ListingResponse>(`${this.baseUrl}/search/movie`, { params })
    .pipe(
      map(result => result.results)
    );
  }

  public getMovieDetails(id: string): Observable<MovieDetails> {
    return this.httpClient.get<MovieDetails>(`${this.baseUrl}/movie/${id}`, { params: this.params })
    .pipe(
      catchError(err => of(null))
    );
  }

  public getMovieCredits(id: string): Observable<Cast[]> {
    return this.httpClient.get<CreditsResponse>(`${this.baseUrl}/movie/${id}/credits`, { params: this.params })
    .pipe(
      map( resp => resp.cast),
      catchError(err => of([]))
    );
  }
}
