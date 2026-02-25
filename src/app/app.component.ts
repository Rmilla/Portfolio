import { Component, ViewChild, AfterViewInit, Inject, PLATFORM_ID, HostListener, OnInit} from '@angular/core';
import { CommonModule, isPlatformBrowser} from '@angular/common';
import { CarousselComponent } from './caroussel/caroussel.component';
import { ContentComponent } from "./content/content.component";
import { ContactFormComponent } from './contact-form/contact-form.component';
import { NavbarComponent } from './navbar/navbar.component';
import { state, trigger, style, animate, transition, query, stagger } from '@angular/animations';
import { ApplicationModule } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CarousselComponent, 
    ContentComponent, 
    CommonModule, 
    ContactFormComponent,
    NavbarComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',

})
export class AppComponent {

}