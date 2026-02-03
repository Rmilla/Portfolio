import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { Component } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ApplicationModule } from '@angular/core';

@Component({
  selector: 'app-caroussel',
  standalone: true,
  imports: [CarouselModule, ApplicationModule],
  templateUrl: './caroussel.component.html',
  styleUrls: ['./caroussel.component.css']
})
export class CarousselComponent {

  customOptions: any = {
    loop: true,
    margin: 10,
    nav: true,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 3
      },
      1000: {
        items: 5
      }
    }
  };

  animationsInitialized = false; // Flag pour activer les animations

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  onCarouselInitialized(): void {
    // Vérifiez que le code s'exécute dans un navigateur
    if (isPlatformBrowser(this.platformId)) {
      const carouselElement = document.querySelector('owl-carousel-o');
      if (carouselElement) {
        carouselElement.classList.add('fade-up', 'animated');
      }
    }
  }
}
