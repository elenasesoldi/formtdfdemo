import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from './user';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/enroll';
  }

  public enroll(user: User): Observable<any> {
    return this.http.post<any>(this.url, user)
      .pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: HttpErrorResponse): Observable<any> {
    return throwError(error);
  }
}
