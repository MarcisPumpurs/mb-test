import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact';
import { DataService } from '../services/data.service';
import { StateService } from '../services/state.service';
import { ValidationService } from '../services/validation.service';
import { SubmitResponse } from '../submit-response';


@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent implements OnInit {
  public contacts: Contact[]  = [];
  public contact = new Contact('');
  public submitResponse: SubmitResponse = new SubmitResponse('', 0, false);

  constructor(public validationService: ValidationService, 
              public dataService: DataService,
              public stateService: StateService) { }

  ngOnInit(): void { }

  //Form submission and validation
  public submit(){
    if(this.validationService.form){
      this.stateService.submited = true;
      this.submitData(this.validationService.form.value.email, this.validationService.form.value.checkbox);
    }  
  }

  //Data submit for saving in DB
  private submitData(email: string, checkbox: boolean){
    this.dataService.addContact(email, checkbox)
    .subscribe(
      (reply: SubmitResponse) => {
        this.submitResponse = reply;
        if(this.submitResponse.responseCode != 1){
          this.stateService.submited = false;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  public validate(){ }

}