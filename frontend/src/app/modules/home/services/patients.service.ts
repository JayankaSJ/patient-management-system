import { Injectable } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Patient } from '../models/Patient';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  private endpoint = 'patients'; // Define the base endpoint for patients

  constructor(private apiService: ApiService) {}

  // Get all patients
  getAllPatients(): Observable<Patient[]> {
    return this.apiService.get<Patient[]>(this.endpoint);
  }

  // Get a patient by ID
  getPatientById(id: number): Observable<Patient> {
    return this.apiService.get<Patient>(`${this.endpoint}/${id}`);
  }

  // Create a new patient
  createPatient(patient: Patient): Observable<Patient> {
    return this.apiService.post<Patient>(this.endpoint, patient);
  }

  // Update an existing patient
  updatePatient(id: number, patient: Patient): Observable<Patient> {
    return this.apiService.put<Patient>(`${this.endpoint}/${id}`, patient);
  }

  // Delete a patient
  deletePatient(id: number): Observable<void> {
    return this.apiService.delete<void>(`${this.endpoint}/${id}`);
  }
}
