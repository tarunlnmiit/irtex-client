import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiRequestService } from '../../services/api-request.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css'],
})
export class SearchFormComponent implements OnInit {
  form: FormGroup;
  error: string;
  url: string;
  response = { status: '', message: '', guid: '' };
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
      formData.append('url', 'n/a');
      formData.append('name', file.name);
      this.apiservice.upload(formData, '').subscribe(
        (res) => {
          this.response = res;
          console.log(res);
          if (res.id) {
            //navigate to the results page
            this.hideSpinner = true;
            const inHome = this.router.url === '/';
            console.log(this.router.url);
            this.router.navigateByUrl(
              '/results?id=' + res.id + '&inHome=' + inHome
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
        if (res.id) {
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
