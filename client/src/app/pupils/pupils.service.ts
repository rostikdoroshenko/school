import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreatePupilDto } from '../../../../src/pupils/create-pupil-dto';

@Injectable({
  providedIn: 'root',
})
export class PupilsService {
  pupilUrl = 'http://localhost:3000/api/pupils';

  constructor(private http: HttpClient) {}

  addPupil(pupil: CreatePupilDto) {
    return this.http.post(this.pupilUrl, pupil);
  }
}
