import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  constructor() { }
  //Flags to change view specifics
  public submited: boolean = false;
  public data: boolean = false;
}
