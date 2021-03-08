import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExportService {
  baseUrl = 'http://localhost/mb'; //Location of PHP files
  public exportForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.exportForm = this.formBuilder.group({
        checkboxes: this.formBuilder.array([], [Validators.required])
    });
   }

   //Collect selected checkbox input of contacts to process them
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

 //Receive blob from server and pass to export as csv
  exportData(ids: number[]): Observable<Blob>{
    return this.http.post(`${this.baseUrl}/export`,{ ids : ids}, { responseType: 'blob'});
  }

}