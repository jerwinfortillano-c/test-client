import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cv-detail',
  templateUrl: './cv-detail.component.html',
  styleUrls: ['./cv-detail.component.scss']
})
export class CvDetailComponent implements OnInit {

  constructor(private router: Router) { }

  goToCareer() {
    this.router.navigate(['/software/career-goals']);
  }

  goToHome() {
    this.router.navigate(['/software/home']);
  }

  ngOnInit(): void {
  }

}
