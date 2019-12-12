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

  constructor(private enrollmentService: EnrollmentService) {

    this.topics = ['Angular', 'React', 'Vue'];
    this.topicHasError = true;

    this.userModel = new User('Elena',
                              '',
                              '3896979707',
                              '',
                              'morning',
                              true);

    this.submitted = false;
    this.errorMsg = '';
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
    this.enrollmentService.enroll(this.userModel)
    .subscribe(
      data => console.log('Success!', data),
      error => this.errorMsg = error.statusText
    );
  }
}
