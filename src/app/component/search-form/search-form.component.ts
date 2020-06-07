import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiRequestService } from '../../services/api-request.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css'],
})
export class SearchFormComponent implements OnInit {
  form: FormGroup;
  error: string;
  sessionId: string;
  dataset: string;
  url: string;
  response = { status: '', message: '', guid: '' };
  hideSpinner: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private apiservice: ApiRequestService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.hideSpinner = true;
  }

  ngOnInit(): void {
    if (this.route.snapshot.queryParams['session_id']) {
      this.sessionId = this.route.snapshot.queryParams['session_id'];
    }
    if (this.route.snapshot.queryParams['dataset']) {
      this.dataset = this.route.snapshot.queryParams['dataset'];
    }
    this.form = this.formBuilder.group({
      url: '',
      file: [''],
    });
  }
  onFileChange(event) {
    this.hideSpinner = false;
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      // formData.append('url', null);
      // formData.append('name', file.name);
      this.apiservice.upload(formData, '/upload/').subscribe(
        (res) => {
          this.response = res;
          console.log(res);
          if (res._id) {
            //navigate to the results page
            this.hideSpinner = true;
            const inHome = this.router.url === '/';
            console.log(this.router.url);
            this.router.navigateByUrl(
              `/results?id=${res._id}&inHome=${inHome}&dataset=${this.dataset}&session_id=${this.sessionId}`
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

  onSubmit() {
    const formData = new FormData();

    formData.append('file', this.form.get('file').value);
    formData.append('url', this.form.get('url').value);
    console.log(formData);
    this.apiservice.upload(formData, 'search-url').subscribe(
      (res) => {
        console.log(res);
        if (res._id) {
          this.response = res;
        }
        //navigate to the results page
      },
      (err) => {
        this.error = err;

        this.error = err.message;

        this.hideSpinner = true;
        //show error message.
      }
    );
  }
}
