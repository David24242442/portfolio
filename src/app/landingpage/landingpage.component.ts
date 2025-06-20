import { Component, ViewChild, ElementRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from '../app.routes';

@Component({
  selector: 'app-landingpage',
  imports: [RouterModule],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.css'
})
export class LandingpageComponent {
  @ViewChild('about') aboutSection!: ElementRef;
  @ViewChild('experience') experienceSection!: ElementRef;
  @ViewChild('projects') projectsSection!:ElementRef
  @ViewChild('contact') contactSection!: ElementRef;

  isMenuOpen = false;

  scrollToAbout() {
    this.aboutSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
  scrollToexperience() {
    this.experienceSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
  scrollToContact() {
    this.contactSection.nativeElement.scrollIntoView({ behavior:'smooth' });
  }
  scrollToProjects() {
    this.projectsSection.nativeElement.scrollIntoView({ behavior:'smooth' });
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  toggleIcon() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
