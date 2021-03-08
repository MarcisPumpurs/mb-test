import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Contact }  from '../contact';
import { SubmitResponse } from '../submit-response';
import { Provider } from '../provider';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public baseUrl = 'http://localhost/mb'; //Location of PHP files
  public paginatedContacts: Contact[][];  //All contacts
  public validationCode: number;  //Validation code from saving contact
  public submitResponse: SubmitResponse; //Response from saving contact
  public contact = new Contact('');
                  
  constructor(private http: HttpClient) { }
  
  //Get data from server using filters
  getAll(pagination: number, sort: string, asc: boolean, filter: string, search: string): Observable<Record<number, Contact[]>> {
    return this.http.get<Record<number, Contact[]>>(`${this.baseUrl}/list.php?pag=${pagination}&sort=${sort}&asc=${asc}&filter=${filter}&search=${search}`).pipe(
      map(res => {
        this.paginatedContacts = res['dataset'];
        return this.paginatedContacts;
    }),
    catchError(this.handleError));
  }

  //Error handling
  private handleError(error: HttpErrorResponse) {
    console.log(error);
    return throwError('Could not fullfill request!');
  }

  //Add new contact request to server
  addContact(email: string, checkbox: boolean): Observable<SubmitResponse> {
    return this.http.post<SubmitResponse>(`${this.baseUrl}/add`, { email: email, checkbox: checkbox})
      .pipe(
        map(
          reply =>{
            this.submitResponse = reply['dataset'];
          return this.submitResponse;
        }
        ),
        catchError(this.handleError));
  }
//Get email providers request to server
  getEmailProviders(): Observable<Provider[]>{
    return this.http.get<Provider[]>(`${this.baseUrl}/providers`).pipe(
      map(
        res => {
          return res['dataset'];
        }
      ),
      catchError(this.handleError));
  }
//Delete contact request to server
  deleteEmail(id: number): Observable<object>{
    return this.http.delete(`${this.baseUrl}/del.php?id=${id}`).pipe(
      catchError(this.handleError));
  }

}
