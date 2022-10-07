import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';

import { GoalDetailComponent } from '../goal-detail/goal-detail.component';
import { CareerGoalService } from 'src/app/services/career-goal/career-goal.service';
import { CareerGoal } from 'src/app/models/career-goal.model';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss']
})
export class GoalsComponent implements OnInit {

  position: string = 'top';

  career_goals: CareerGoal[] = [];
  lastTableLazyLoadEvent!: LazyLoadEvent;
  loading: boolean = true;

  constructor(public dialogService: DialogService,
    private ref: DynamicDialogRef, private messageService: MessageService, private router: Router, private careerGoalService: CareerGoalService, private confirmationService: ConfirmationService) { }


  deleteCareerGoal(id: number) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this record ?',
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.careerGoalService.deleteCareerGoal(id).subscribe((response: any) => {
          if(response[0] == true) {
              this.messageService.add({
                severity: 'success',
                summary: '',
                detail: response[1].message,
              });
              
            this.getAllCareerGoals(this.lastTableLazyLoadEvent)
            }
        });
       },
      reject: () => {}
    });

 

  }

  editCareerGoal(data: CareerGoal) {
    this.ref = this.dialogService.open(GoalDetailComponent, {
      header: 'Career Goal',
      width: '620px',
      height: '720px',
      contentStyle: {
        'max-height': '800px',
        'min-width': '560px',
        overflow: 'auto',
        'border-radius': '0 0 6px 6px',
      },
      baseZIndex: 10000,
      data: data
    });

    this.ref.onClose.subscribe(
      (data: any) => {
        if (data.code == 200) {
          this.getAllCareerGoals(this.lastTableLazyLoadEvent)
          this.messageService.add({
            severity: 'success',
            summary: '',
            detail: data.message.message,
          });
        } else if(data.code == 500) {
          this.getAllCareerGoals(this.lastTableLazyLoadEvent)
          this.messageService.add({
            severity: 'error',
            summary: '',
            detail: data.message,
          });
        } else {
          return
        }
    });
    this.getAllCareerGoals(this.lastTableLazyLoadEvent)
  }

  createCareerGoal() {
    this.ref = this.dialogService.open(GoalDetailComponent, {
      header: 'Career Goal',
      width: '620px',
      height: '720px',
      contentStyle: {
        'max-height': '800px',
        'min-width': '560px',
        overflow: 'auto',
        'border-radius': '0 0 6px 6px',
      },
      baseZIndex: 10000
    });

    this.ref.onClose.subscribe(
      (data: any) => {
        if (data.code == 200) {
          this.getAllCareerGoals(this.lastTableLazyLoadEvent)
          this.messageService.add({
            severity: 'success',
            summary: '',
            detail: data.message.message,
          });
        } else {
          return
        }
    });
  }

  getAllCareerGoals(e: any) {
    this.loading = true;
    this.lastTableLazyLoadEvent = e;
    this.careerGoalService.getAllCareerGoals().subscribe((response: any) => {
      let data = response[1];
      console.log(response)
      if(response[0] == true) {
        this.career_goals = data;
        setTimeout(() => {
          this.loading = false;
        }, 500);
      } else {
        this.loading = false;
      }
    });
  }

  

  close() {
    this.router.navigate(['/software/home']);
  }

  ngOnInit(): void {
  }

}
