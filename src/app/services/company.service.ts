import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor() { }

  getAllCompanies(): Observable<Company[]> {

    const companies: Company[] = [
      {
        name: 'Iguss',
        address: {
          street: 'Beispielstraße',
          houseNumber: 12,
          postalCode: 12345,
          city: 'Musterstadt',
          state: 'Bayern',
          country: 'Deutschland'
        },
        contactPersons: [{
          name: 'Lisa Müller',
          email: 'lisa.mueller@example.com',
          phone: '0987654321',
          position: 'Projektleiterin'
        }
        ],
        materials: ['ABS', 'PP', 'PVC'],
        procedure: ['Spritzguss'],
        companyWebsite: 'www.firma.de',
      }
    ];

    return companies;
  }
}
