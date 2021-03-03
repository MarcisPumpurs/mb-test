import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  public email: string = "";
  public checkbox: boolean = true;
  public form!: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern(".*(?<!.co)$")]],
      checkbox: [true, Validators.requiredTrue]
    });
        
   }
}
