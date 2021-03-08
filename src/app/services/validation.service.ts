import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  public email: string = "";
  public checkbox: boolean = true;
  public form: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    //Create form with validators
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(".*(?<!.co)$"), this.customValidator({'email':'invalid format'})]],
      checkbox: [true, Validators.requiredTrue]
    });
   }

   //Custom validator to better validate emails
   customValidator(error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      var regex: RegExp = new RegExp("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$");
      if (!control.value) {
        return null;
      }
      const valid = regex.test(control.value);
      return valid ? null : error;
    };
  }
}
