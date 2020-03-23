import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private _http: HttpClient) { }

  getStudents(){
    return this._http.get('assets/input.csv', {responseType: 'text'});
  }
}
