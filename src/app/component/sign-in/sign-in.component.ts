import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiRequestService } from '../../services/api-request.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  form: FormGroup;
  error: string;
  url: string;
  response = { status: '', message: '', guid: '' };
  datasets = [
    { Id: 'cifar', name: 'CIFAR 10' },
    { Id: 'pascal', name: 'PASCAL VOC' },
  ];
  hideSpinner: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private apiservice: ApiRequestService,
    private router: Router
  ) {
    this.hideSpinner = true;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      dataset: 'cifar',
    });
  }

  onSubmit() {
    this.hideSpinner = false;

    const formData = new FormData();
    let seleted = this.form.get('dataset').value;
    formData.append('dataset', seleted);
    this.apiservice.startSession(formData, '/upload/start').subscribe(
      (res) => {
        this.response = res;
        console.log(res);
        if (res._id) {
          //navigate to the results page
          this.hideSpinner = true;
          console.log(this.router.url);
          this.router.navigateByUrl(
            '/search?session_id=' + res._id + '&dataset=' + seleted
          );
        }
      },
      (err) => {
        this.error = err.message;

        this.hideSpinner = true;
        console.log(err);
        //show error message.
      }
    );
  }
}
