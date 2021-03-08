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

  public baseUrl = 'http://localhost/mb';
  public paginatedContacts: Contact[][];
  public validationCode: number;
  public submitResponse: SubmitResponse;
  public contact = new Contact('');
                  
  constructor(private http: HttpClient) { }

  getValidationCode(): number{
    return this.validationCode;
  }
    
  setValidationCode(validationCode: number): void{
    this.validationCode  = validationCode;
  }
         
  getAll(pagination: number, sort: string, asc: boolean, filter: string, search: string): Observable<Record<number, Contact[]>> {
    return this.http.get<Record<number, Contact[]>>(`${this.baseUrl}/list.php?pag=${pagination}&sort=${sort}&asc=${asc}&filter=${filter}&search=${search}`).pipe(
      map(res => {
        this.paginatedContacts = res['dataset'];
        return this.paginatedContacts;
    }),
    catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    return throwError('Could not fullfill request!');
  }

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

  getEmailProviders(): Observable<Provider[]>{
    return this.http.get<Provider[]>(`${this.baseUrl}/providers`).pipe(
      map(
        res => {
          return res['dataset'];
        }
      ),
      catchError(this.handleError));
  }

  deleteEmail(id: number): Observable<object>{
    return this.http.delete(`${this.baseUrl}/del.php?id=${id}`).pipe(
      catchError(this.handleError));
  }

}
