import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  ClassDto,
  NewClassDto,
} from '../../../../src/classes/classes.interface';

@Injectable({
  providedIn: 'root',
})
export class ClassesService {
  classUrl = 'http://localhost:3000/api/classes';
  constructor(private http: HttpClient) {}

  getClasses(): Observable<ClassDto[]> {
    return this.http.get<ClassDto[]>(this.classUrl);
  }

  getClass(id: string): Observable<ClassDto> {
    return this.http.get<ClassDto>(`${this.classUrl}/${id}`);
  }

  addClass(clas: NewClassDto) {
    const newClass: NewClassDto = {
      name: clas.name,
    };
    return this.http.post<ClassDto>(this.classUrl, newClass);
  }

  updateClass(id: string, updatedClass: NewClassDto) {
    return this.http.put(`${this.classUrl}/${id}`, updatedClass);
  }
  removeClass(id: string) {
    return this.http.delete(`${this.classUrl}/${id}`);
  }
}
