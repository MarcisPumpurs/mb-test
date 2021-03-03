import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ValidationService } from '../services/validation.service';


@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent implements OnInit {
  public submited: boolean = false;


  constructor(public validationService: ValidationService) { 
  }

  ngOnInit(): void {
  }

  public submit(){
    console.log(this.validationService.form);
    if(this.validationService.form){
      this.submited = true;
    }
  }

  public validate(){
    
  }

}