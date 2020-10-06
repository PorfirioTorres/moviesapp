import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Swiper } from 'swiper';
import { Movie } from '../../interfaces/listing-response';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit, AfterViewInit {
  @Input() movies: Movie[];
  mySwiper: Swiper;

  constructor() { }

  ngAfterViewInit(): void {
    this.mySwiper = new Swiper('.swiper-container', {
      // Optional parameters
      loop: true,
    });
  }

  ngOnInit(): void {
    // console.log(this.movies);
  }

  public onSlidePrev(): void {
    this.mySwiper.slidePrev();
  }

  public onSlideNext(): void {
    this.mySwiper.slideNext();
  }


}
