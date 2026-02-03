import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, OnInit, Input, ElementRef, ViewChildren, QueryList, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css',
  animations: [
    trigger('autoHeight', [
      state('void', style({ height: '0' })),
      state('*', style({ height: '*' })),
      transition(':enter', animate('300ms ease-out')),
      transition(':leave', animate('300ms ease-in'))
    ])
  ]
})
export class ContentComponent implements AfterViewInit {
  @ViewChildren('fadeElement') fadeElements!: QueryList<ElementRef>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }
  
  ngAfterViewInit(): void {
    // Assurez-vous que le code ne s'exécute que dans le navigateur
    if (isPlatformBrowser(this.platformId)) {
      const observerOptions = {
        root: null, // Viewport
        threshold: 0.5 // 50% visible
      };

      // IntersectionObserver pour observer tous les éléments ayant la classe fade-up
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            observer.unobserve(entry.target); // Arrete d'observer l'élément déjà animé
          }
        });
      }, observerOptions);

      const checkCarouselAndObserve = () => {
        const carousel = document.querySelector('owl-carousel-o');
        if (carousel) {
          // Exclure le carrousel des éléments animés
          this.fadeElements.forEach((element) => {
            const nativeElement = element.nativeElement;
            if (!nativeElement.closest('owl-carousel-o')) {
              nativeElement.classList.add('fade-up');
              observer.observe(nativeElement);
            }
          });

          // Trouver tous les éléments ayant la classe fade-up
          const fadeElements = document.querySelectorAll('.fade-up');

          fadeElements.forEach((element) => {
            observer.observe(element); // Observer chaque élément
          });
        } else {
          // Si le carrousel n'est pas encore chargé, réessayer après un court délai
          setTimeout(checkCarouselAndObserve, 100);
        }

      };

      checkCarouselAndObserve();
    }
  }
}