import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  loadObjectives: boolean = false;
  loadSeminars: boolean = false;
  loadSkills: boolean = false;

  @HostListener('window:scroll', ['$event']) // for window scroll events
    onScroll(e: any) {
      console.log(window.scrollY);
      if(window.scrollY > 175) {
        this.loadSeminars = true;
      }
      if (window.scrollY > 975) {
        this.loadSkills = true;
      }
    }


  constructor(private router: Router) { }

  goToCv() {
    this.router.navigate(['/software/cv-detail'])
  }

  goToCareerGoal() {
    this.router.navigate(['/software/career-goals'])
  }

  logout() {
    localStorage.clear();
    location.reload();
  }


  ngOnInit(): void {
  }

}
