import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Contact } from '../contact';
import { DataService } from '../services/data.service';
import { ValidationService } from '../services/validation.service';
import { SubmitResponse } from '../submit-response';


@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent implements OnInit {
  public submited: boolean = false;
  contacts: Contact[]  = [];
  contact = new Contact('');
  submitResponse: SubmitResponse = new SubmitResponse('', 0, false);
  
  error = '';
  success = '';


  constructor(public validationService: ValidationService, public dataService: DataService) { 
  }

  ngOnInit(): void {
  }

  public submit(){
    console.log(this.validationService.form);
    if(this.validationService.form){
      this.submited = true;
      this.submitData(this.validationService.form.value.email, this.validationService.form.value.checkbox);
    }  
  }

  private submitData(email: string, checkbox: boolean){
    this.dataService.addContact(email, checkbox)
    .subscribe(
      (reply: SubmitResponse) => {
        this.submitResponse = reply;
        console.log("inside");
        console.log(this.submitResponse);
        if(this.submitResponse.responseCode == 1){
          console.log("Success!");
          console.log(this.submitResponse);
          console.log("End of message!");
        }else{
          this.submited = false;
          console.log("Lets forword problem Nr. " + this.submitResponse.responseCode);
          //console.log("Submited value: " + this.submited);
        }

      },
      (err) => {
        this.error = err;
      }
    );
    console.log("This is outer SubmitResponse:");
    console.log(this.submitResponse);
  }

  public validate(){
    
  }

  public delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

}