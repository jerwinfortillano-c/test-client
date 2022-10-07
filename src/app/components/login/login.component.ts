import { Component, OnInit } from '@angular/core';

import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';


import { RegisterComponent } from '../register/register.component';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/user.model';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userModel: User = new User();

  constructor(public dialogService: DialogService,
    private ref: DynamicDialogRef, private messageService: MessageService, private userService: UserService, private router: Router) { }

  register() {
    this.ref = this.dialogService.open(RegisterComponent, {
      header: 'Create Account',
      width: '425px',
      height: '480px',
      contentStyle: {
        'max-height': '800px',
        overflow: 'auto',
        'border-radius': '0 0 6px 6px',
      },
      baseZIndex: 10000
    });

    this.ref.onClose.subscribe(
      (data: any) => {
        console.log(data)
        if (data == 200) {
          this.messageService.add({
            severity: 'success',
            summary: 'Register Success',
            detail: '',
          });
        } else {
          return
        }
    });
  }


  signIn() {
    if(this.userModel.email !== '' && this.userModel.password != '') {
      this.userService.userlogin(this.userModel).subscribe((response: any) => {

        if(response[0] == true) {
          localStorage.setItem('token', response[1].token);
          this.messageService.add({
            severity: 'success',
            summary: '',
            detail: response[1].message
          })
          setTimeout(() => {
            location.reload();
          }, 800);
        } else {
          this.messageService.add({
            severity: 'error',
            summary: '',
            detail: response[1]
          })
        }
      });
    }
  }

  ngOnInit(): void {
  }

}
