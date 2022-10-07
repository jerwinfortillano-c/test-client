import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanActivate } from "@angular/router";

@Injectable()
export class SecurityActivateRoute implements CanActivate {
    constructor(
        private router: Router
    ) { }

    canActivate() {
        if (localStorage.getItem("token") == null) {
            return true;
        } else {
            this.router.navigate(["/software/home"]);
            return false;
        }
    }
}