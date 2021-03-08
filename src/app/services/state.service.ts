import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  constructor() { }
  public submited: boolean = false;
  public data: boolean = false;
}
