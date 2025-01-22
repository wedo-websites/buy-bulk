import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-image-slider',
  imports: [NgFor],
  templateUrl: './image-slider.component.html',
  styleUrl: './image-slider.component.scss'
})
export class ImageSliderComponent {

  images = [
    {
      src: 'images/banner-images/banner-01.jpg',
      alt: 'Dal',
      title: 'Dal, ',
      quote: 'Premium Quality',
      description: 'Hurry! <br> Get Items At Unbeatable Prices'
    },
    {
      src: 'images/banner-images/banner-02.jpg',
      alt: 'Grams',
      title: 'Grams, ',
      quote: 'Best in Market',
      description: 'Be Quick! <br>Grab The Deal'
    },
    {
      src: 'images/banner-images/banner-03.png',
      alt: 'spiece',
      title: 'Good Quality, ',
      quote: 'Less Price',
      description: 'Act Now! <br>Don\'t Miss Out On Great Prices'
    }
  ];
  currentIndex = 0;
  autoSlideInterval: any;

  ngOnInit() {
    this.startAutoSlide();
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  goToSlide(index: number) {
    this.currentIndex = index;
  }

  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  stopAutoSlide() {
    clearInterval(this.autoSlideInterval);
  }
}
