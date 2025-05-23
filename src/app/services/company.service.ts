import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { Company } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {


  private companiesSubject = new BehaviorSubject<Company[]>([]);
  public companiesList$: Observable<Company[]> = this.companiesSubject.asObservable();
  private subscription: Subscription;

  constructor() {
    this.subscription = this.getAllCompanies().subscribe(data => {
      this.companiesSubject.next(data);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getAllCompanies(): Observable<Company[]> {

    const companies: Company[] = [
      {
        type: 'Company',
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

    return of(companies);
  }
}
