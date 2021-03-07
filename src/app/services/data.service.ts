import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Contact }  from '../contact';
import { ThrowStmt } from '@angular/compiler';
import { SubmitResponse } from '../submit-response';
import { Provider } from '../provider';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};


@Injectable({
  providedIn: 'root'
})
export class DataService {

  baseUrl = 'http://localhost/mb';
  public paginatedContacts: Contact[][];
  public validationCode: number;
  submitResponse: SubmitResponse;
  contact = new Contact('');
  msgError: string;
  msgSuccess: string;
                  
  constructor(private http: HttpClient) { }

  public getValidationCode(): number{
    return this.validationCode;
  }
    
  public setValidationCode(validationCode: number){
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
    return throwError('Error encountered!');
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
  // const params = new HttpParams()
  //     .set('id', id.toString());
  //     console.log("Delete 2 id: "+ id);
  return this.http.delete(`${this.baseUrl}/del.php?id=${id}`).pipe(
    catchError(this.handleError));
}

// addHero(hero: Hero): Observable<Hero> {
//   return this.http.post<Hero>(this.heroesUrl, hero, httpOptions)
//     .pipe(
//       catchError(this.handleError('addHero', hero))
//     );
// }

}
