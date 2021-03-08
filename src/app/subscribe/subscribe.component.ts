import { Component, OnInit } from '@angular/core';
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
  public contacts: Contact[]  = [];
  public contact = new Contact('');
  public submitResponse: SubmitResponse = new SubmitResponse('', 0, false);

  constructor(public validationService: ValidationService, public dataService: DataService) { }

  ngOnInit(): void { }

  public submit(){
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
        if(this.submitResponse.responseCode != 1){
          this.submited = false;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  public validate(){ }

  public delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

}