import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { Book } from './book';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  //Set the NodeJS API link here 
  REST_API:string = "http://localhost:8000/api";
  //Set the HTTP headers here 
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json'); //When this is passed as a parameter in the methods below, it allows the data returned to be parsed as JSON

  constructor(private httpClient:HttpClient) { 
  }

  AddBook(data:Book):Observable<any> { //what is the need for Observable
    let REST_URL = `${this.REST_API}/add-book`;
    return this.httpClient.post(REST_URL, data).pipe(catchError(this.handleError));
  }

  //Get all books
  GetAllBooks() {
    return this.httpClient.get(`${this.REST_API}`);
  }

  //Get a single book 
  //To catch errors, you pipe the Observable result from HTTP get through the RxJS catchError operator
  //Some APIs may bury the data that you want within the Observable returned. You can dig that data out by processing the Observable result with the RxJS map operator
  GetBookById(id: any):Observable<any> {
    let REST_URL = `${this.REST_API}/read-book/${id}`;
    return this.httpClient.get(REST_URL, {headers: this.httpHeaders}).pipe(map((res:any) => {
      return res || {}
    }), 
    catchError(this.handleError)
    );
  }

  //Update a book 
  UpdateBook(id: any, data: any):Observable<any> {
    console.log(data);
    let REST_URL = `${this.REST_API}/update-book/${id}`;
    return this.httpClient.put(REST_URL, data, {headers: this.httpHeaders}).pipe(catchError(this.handleError));
  }

  //Delete a book 
  DeleteBook(id: any):Observable<any> {
    let REST_URL = `${this.REST_API}/delete-book/${id}`;
    return this.httpClient.delete(REST_URL, {headers: this.httpHeaders}).pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = "";
    if(error.error instanceof ErrorEvent) {
      //client error
      errorMessage = error.error.message;
    }
    else {
      errorMessage = `Error code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(error.message);
    return throwError(errorMessage);
  }
}

