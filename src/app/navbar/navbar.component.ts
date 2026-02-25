import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
    @ViewChild('navbarSupportedContent') navbarCollapse!: ElementRef;

    toggleNavbar() {
        if (this.navbarCollapse) {
            const element = this.navbarCollapse.nativeElement;
            element.classList.toggle('show');
        }
    }
}
