import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../../interfaces/listing-response';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public titleSearch: string;
  public movies: Movie[];

  constructor(private activatedRoute: ActivatedRoute, private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params => {
        this.titleSearch = params.criterion;
        this.moviesService.searchFormText(params.criterion).subscribe(
          movies => {
            this.movies = movies;
          }
        );
      }
    );
  }

}
