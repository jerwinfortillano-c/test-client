import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user/user.service';
import { MessageService } from 'primeng/api';

import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  userModel: User = new User();

  constructor(private userService: UserService, public ref: DynamicDialogRef,
    public config: DynamicDialogConfig, private messageService: MessageService) { }

  signUp() {
    if(this.userModel.id == 0) {
      this.userService.createUser(this.userModel).subscribe((response: any) => {
        if(response[0] == true) {
          this.ref.close(response[1].code);
        } else {
          this.messageService.add({
            severity: 'error',
            summary: response[1],
            detail: '',
          });
        }
      })
    }
    
  }

  ngOnInit(): void {
  }

}
