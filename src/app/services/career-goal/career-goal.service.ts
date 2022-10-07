import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CareerGoal } from 'src/app/models/career-goal.model';

import { DatePipe } from '@angular/common';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': ['application/json'],
    Authorization: 'Bearer ' + localStorage.getItem('token')
  })
}

const APIURL = environment.APIURLHost;

@Injectable({
  providedIn: 'root'
})
export class CareerGoalService {

  constructor(private http: HttpClient, private datePipe: DatePipe) { }



  // Add New Career Goals
  createCareerGoal(data: CareerGoal): Observable<[boolean, CareerGoal]> {
    let career_data: CareerGoal = {
      id: data.id,
      name: data.name,
      desc: data.desc,
      reason: data.reason,
      target_date: data.target_date != '0000-00-00' ? this.datePipe.transform(data.target_date, 'Y-MM-dd') : data.target_date,
      date_completed: data.date_completed != '0000-00-00' ? this.datePipe.transform(data.date_completed, 'Y-MM-dd') : data.date_completed
    }
    return new Observable<[boolean, CareerGoal]>((observer) => {

      this.http.post(APIURL + '/goal/create-goal', data, httpOptions).subscribe(
        (response: any) => {
          
          let data = response;
          observer.next([true, data]);
          observer.complete();
        },
        (error) => {
          observer.next([false, error.error.message]);
          observer.complete();
        })
    });
  }

  // Get All Career Gaols
  getAllCareerGoals(): Observable<[boolean, any[]]> {
    return new Observable<[boolean, any[]]>((observer) => {
      let career_goals: CareerGoal[] = [];

      console.log(httpOptions)

      this.http
        .get<any>(APIURL + '/goal/career-list', httpOptions)
        .subscribe(
          (response) => {

            let results = response;
           
            if (results != null) {
              if (results.length > 0) {
                for (let i = 0; i <= results.length - 1; i++) {
                  career_goals.push({
                    id: results[i].id,
                    name: results[i].name,
                    desc: results[i].description,
                    reason: results[i].reason,
                    target_date: results[i].target_date != '0000-00-00' ? this.datePipe.transform(results[i].target_date, 'Y-MM-dd') : results[i].target_date,
                    date_completed: results[i].date_completed != '0000-00-00' ? this.datePipe.transform(results[i].date_completed, 'Y-MM-dd') : results[i].date_completed,
                  });
                }
              }
            }

            observer.next([true, career_goals]);
            observer.complete();
          },
          (error) => {
            observer.next([false, error.error.message]);
            observer.complete();
          }
        );
    });
  }


    // Updated Exsisting Career
    updateCareerGoals(
      data: CareerGoal
    ): Observable<[boolean, CareerGoal]> {
      let career_goal: CareerGoal = {
        id: data.id,
        name: data.name,
        reason: data.reason,
        desc: data.desc,
        target_date: data.target_date,
        date_completed: data.date_completed
      };
      return new Observable<[boolean, CareerGoal]>((observer) => {
        this.http
          .put<CareerGoal>(APIURL + '/goal/update-career',
          career_goal,
            httpOptions
          )
          .subscribe(
            (response) => {
              let data = response;
              observer.next([true, data]);
              observer.complete();
            },
            (error) => {
              observer.next([false, error.error.message]);
              observer.complete();
            }
          );
      });
    }
  
    // Delete 
    deleteCareerGoal(id: number): Observable<[boolean, any]> {
      let data = {
        id: id
      }
      return new Observable<[boolean, any]>((observer) => {
        this.http
          .post<any>(APIURL + '/goal/delete-career', data, httpOptions)
          .subscribe(
            (response) => {
              observer.next([true, response]);
              observer.complete();
            },
            (error) => {
              observer.next([false,error.status]);
              observer.complete();
            }
          );
      });
    }
}
