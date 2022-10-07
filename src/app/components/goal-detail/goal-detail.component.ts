import { Component, OnInit } from '@angular/core';
import { CareerGoal } from 'src/app/models/career-goal.model';
import { CareerGoalService } from 'src/app/services/career-goal/career-goal.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-goal-detail',
  templateUrl: './goal-detail.component.html',
  styleUrls: ['./goal-detail.component.scss']
})
export class GoalDetailComponent implements OnInit {

  careerGoalModel: CareerGoal = new CareerGoal();

  constructor(private careerGoalService: CareerGoalService,  public ref: DynamicDialogRef,
    public config: DynamicDialogConfig, private messageService: MessageService, private datePipe: DatePipe) { }

  save() {
    if(this.careerGoalModel.id == 0){
      this.careerGoalService.createCareerGoal(this.careerGoalModel).subscribe((response: any) => {
        if(response[0] == true) {
          this.ref.close({message: response[1], code: 200});
        } else {
          this.messageService.add({
            severity: 'error',
            summary: '',
            detail: response[1]
          })
        }
      });
    } else {
      this.careerGoalModel.target_date = this.careerGoalModel.target_date == '0000-00-00' ? this.careerGoalModel.target_date : this.datePipe.transform(this.careerGoalModel.target_date, 'Y-MM-dd');
      this.careerGoalModel.date_completed = this.careerGoalModel.date_completed == '0000-00-00' ? this.careerGoalModel.date_completed : this.datePipe.transform(this.careerGoalModel.date_completed, 'Y-MM-dd');

      this.careerGoalService.updateCareerGoals(this.careerGoalModel).subscribe((response: any) => {

        if(response[0] == true) {
          this.ref.close({message: response[1], code: 200});
        } else {
          this.ref.close({message: response[1], code: 500});
        }

      });
      
    }
  }

  loadData() {
    if(this.config.data) {
      this.careerGoalModel = this.config.data;
    }
  }

  ngOnInit(): void {
    this.loadData();
  }

}
