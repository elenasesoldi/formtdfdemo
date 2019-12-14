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
    this.url = 'http://localhost:3000/';
  }

  public addUser(user: User): Observable<any> {
    return this.http.post<User>(this.url + 'users/add_user', user)
      .pipe(catchError(this.errorHandler));
  }

  public get(): Observable<any> {
    return this.http.get<any>(this.url).pipe(catchError(this.errorHandler));
  }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url + 'users/').pipe(catchError(this.errorHandler));
  }

  public getUser(id: number): Observable<User> {
    return this.http.get<User>(this.url + 'users/' + id).pipe(catchError(this.errorHandler));
  }

  public updateUser(user: User): Observable<any> {
    return this.http.put<User>(this.url + 'users/update_user', user)
      .pipe(catchError(this.errorHandler));
  }

  public deleteUser(user: User): Observable<any> {
    return this.http.delete(this.url + 'users/delete_user/' + user.id)
    .pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: HttpErrorResponse): Observable<any> {
    return throwError(error);
  }
}
