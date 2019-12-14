import { Component } from '@angular/core';
import { User } from './user';
import { EnrollmentService } from './enrollment.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public topics: string[];
  public topicHasError: boolean;
  public userModel: User;
  public submitted: boolean;
  public errorMsg: string;

  public users: User[];
  public showusers: boolean;

  public gettedUser: User;

  constructor(private enrollmentService: EnrollmentService) {

    this.enrollmentService.get().subscribe(data => console.log(data));
    this.showusers = false;
    this.getUsers();

    this.topics = ['Angular', 'React', 'Vue'];
    this.topicHasError = true;

    this.userModel = new User(null, 'Elena', 'elenasesoldi@gmail.com', '3896979707', 'Angular', 'evening', false);
    this.newUser();
  }

  public validateTopic(value: string): void {
    if (value === 'default') {
      this.topicHasError = true;
    } else {
      this.topicHasError = false;
    }
  }

  public onSubmit(): void {

    this.submitted = true;

    for (const user of this.users) {
      if (user.email === this.userModel.email) {
        this.userModel.id = user.id;
        this.enrollmentService.updateUser(this.userModel).subscribe(
          data => this.getUsers(),
          error => this.errorMsg = error.statusText + ': ' + error.error.message
        );
      }
    }

    this.enrollmentService.addUser(this.userModel)
    .subscribe(
      data => this.getUsers(),
      error => this.errorMsg = error.statusText + ': ' + error.error.message
    );
  }

  private getUsers(): void {
    this.enrollmentService.getUsers().subscribe(
      data => this.users = data,
      error => console.error(error)
    );
  }

  public newUser(): void {
    this.submitted = false;
    this.errorMsg = '';
  }

  public deleteUsers(): void {
    const checkboxes = document.getElementsByClassName('user_checkbox');
    const ids = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < checkboxes.length; i++) {
      if ((checkboxes[i] as HTMLInputElement).checked) {
        ids.push(this.users[i].id);
      }
    }
    for (const id of ids) {
      const user = this.findUser(id);
      this.enrollmentService.deleteUser(user).subscribe(
        data => this.getUsers(),
        error => this.errorMsg = error.statusText + ': ' + error.error.message
      );
    }
  }

  public getUser(id: number): void {
    this.errorMsg = '';
    this.enrollmentService.getUser(id).subscribe(
      user => this.gettedUser = user,
      error => this.errorMsg = error.statusText + ': ' + error.error.message
    );
  }

  private findUser(id: number): User {
    return this.users.filter( u => u.id === id)[0];
  }
}
