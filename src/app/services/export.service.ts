import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExportService {
  baseUrl = 'http://localhost/mb';
  public exportForm: FormGroup;
  //public checkboxes: boolean;
  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.exportForm = this.formBuilder.group({
      //checkboxes : this.formBuilder.array(this.checkboxes.map(x => false))
            checkboxes: this.formBuilder.array([], [Validators.required])
    });
   }

   check(event) {
    const checkboxes: FormArray = this.exportForm.get('checkboxes') as FormArray;

    if (event.target.checked) {
      checkboxes.push(new FormControl(event.target.value));
    } else {
      let i: number = 0;
      checkboxes.controls.forEach((checkbox: FormControl) => {
        if (checkbox.value == event.target.value) {
          checkboxes.removeAt(i);
          return;
        }
        i++;
      });
    }
 }

 exportData(ids: number[]): Observable<Blob>{
  return this.http.post(`${this.baseUrl}/export`,{ ids : ids}, { responseType: 'blob'});
// .pipe(
//   map(
//     reply =>{
//       console.log("Inner function returned");
//       return reply;
//   }
//   ),
//   catchError(this.handleError)
}

private handleError(error: HttpErrorResponse) {
  console.log(error);
  return throwError('Error encountered!');
}

}