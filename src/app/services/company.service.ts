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
          houseNumber: '12',
          postalCode: '12345',
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
      },
      {
        type: 'Company',
        name: 'TechPlast',
        address: {
          street: 'Industriestraße',
          houseNumber: '7a',
          postalCode: '54321',
          city: 'Technikstadt',
          state: 'NRW',
          country: 'Deutschland'
        },
        contactPersons: [{
          name: 'Max Mustermann',
          email: 'max.mustermann@techplast.de',
          phone: '015123456789',
          position: 'Vertriebsleiter'
        }],
        materials: ['PA', 'PC', 'TPE'],
        procedure: ['Spritzguss', 'Extrusion'],
        companyWebsite: 'www.techplast.de',
      },
      {
        type: 'Company',
        name: 'Kunststoff Werke',
        address: {
          street: 'Werkstraße',
          houseNumber: '10',
          postalCode: '67890',
          city: 'Werkhausen',
          state: 'Sachsen',
          country: 'Deutschland'
        },
        contactPersons: [{
          name: 'Sabine Schmitt',
          email: 'sabine.schmitt@kunststoffwerke.de',
          phone: '01701234567',
          position: 'Einkaufsleiterin'
        }],
        materials: ['PE', 'PP'],
        procedure: ['Blasformen'],
        companyWebsite: 'www.kunststoffwerke.de',
      },
      {
        type: 'Company',
        name: 'Formex GmbH',
        address: {
          street: 'Formstraße',
          houseNumber: '5',
          postalCode: '11223',
          city: 'Formstadt',
          state: 'Hessen',
          country: 'Deutschland'
        },
        contactPersons: [{
          name: 'Thomas Becker',
          email: 'thomas.becker@formex.de',
          phone: '01604561234',
          position: 'Produktionsleiter'
        }],
        materials: ['ABS', 'PS'],
        procedure: ['Spritzguss'],
        companyWebsite: 'www.formex.de',
      },
      {
        type: 'Company',
        name: 'Plastec AG',
        address: {
          street: 'AG-Allee',
          houseNumber: '22',
          postalCode: '44556',
          city: 'Plastecity',
          state: 'Baden-Württemberg',
          country: 'Deutschland'
        },
        contactPersons: [{
          name: 'Julia Koch',
          email: 'julia.koch@plastec.de',
          phone: '01799887766',
          position: 'Qualitätsmanagement'
        }],
        materials: ['PVC', 'PET'],
        procedure: ['Extrusion', 'Tiefziehen'],
        companyWebsite: 'www.plastec.de',
      },
      {
        type: 'Company',
        name: 'Polymer Solutions',
        address: {
          street: 'Lösungsweg',
          houseNumber: '9',
          postalCode: '99887',
          city: 'Polymerstadt',
          state: 'Berlin',
          country: 'Deutschland'
        },
        contactPersons: [{
          name: 'Daniel Fischer',
          email: 'daniel.fischer@polymer-solutions.de',
          phone: '01523232323',
          position: 'CTO'
        }],
        materials: ['PA', 'PC'],
        procedure: ['Spritzguss'],
        companyWebsite: 'www.polymer-solutions.de',
      },
      {
        type: 'Company',
        name: 'Musterform GmbH',
        address: {
          street: 'Musterweg',
          houseNumber: '14',
          postalCode: '55667',
          city: 'Musterhausen',
          state: 'Thüringen',
          country: 'Deutschland'
        },
        contactPersons: [{
          name: 'Erika Schulte',
          email: 'erika.schulte@musterform.de',
          phone: '0171112233',
          position: 'Geschäftsführerin'
        }],
        materials: ['PP', 'PE'],
        procedure: ['Tiefziehen'],
        companyWebsite: 'www.musterform.de',
      },
      {
        type: 'Company',
        name: 'FlexoPlast',
        address: {
          street: 'Flexstraße',
          houseNumber: '3b',
          postalCode: '22334',
          city: 'Flexingen',
          state: 'Hamburg',
          country: 'Deutschland'
        },
        contactPersons: [{
          name: 'Andreas Lang',
          email: 'andreas.lang@flexoplast.de',
          phone: '01605556666',
          position: 'Entwicklung'
        }],
        materials: ['TPE', 'PET'],
        procedure: ['Extrusion'],
        companyWebsite: 'www.flexoplast.de',
      },
      {
        type: 'Company',
        name: 'InjectionX',
        address: {
          street: 'X-Weg',
          houseNumber: '88',
          postalCode: '70707',
          city: 'Spritzstadt',
          state: 'Bayern',
          country: 'Deutschland'
        },
        contactPersons: [{
          name: 'Nadine Sommer',
          email: 'nadine.sommer@injectionx.de',
          phone: '01770001122',
          position: 'Projektmanagement'
        }],
        materials: ['ABS', 'PC'],
        procedure: ['Spritzguss'],
        companyWebsite: 'www.injectionx.de',
      },
      {
        type: 'Company',
        name: 'ThermoPlastik',
        address: {
          street: 'Thermoweg',
          houseNumber: '12c',
          postalCode: '32345',
          city: 'Heißlingen',
          state: 'NRW',
          country: 'Deutschland'
        },
        contactPersons: [{
          name: 'Oliver Stein',
          email: 'oliver.stein@thermoplastik.de',
          phone: '01784561200',
          position: 'Betriebsleiter'
        }],
        materials: ['PVC', 'PA'],
        procedure: ['Tiefziehen', 'Spritzguss'],
        companyWebsite: 'www.thermoplastik.de',
      },
      {
        type: 'Company',
        name: 'MoldExperts',
        address: {
          street: 'Expertstraße',
          houseNumber: '45',
          postalCode: '90210',
          city: 'Formingen',
          state: 'Saarland',
          country: 'Deutschland'
        },
        contactPersons: [{
          name: 'Petra Klein',
          email: 'petra.klein@moldexperts.de',
          phone: '01609871234',
          position: 'Key Account'
        }],
        materials: ['PE', 'PP', 'PA'],
        procedure: ['Spritzguss'],
        companyWebsite: 'www.moldexperts.de',
      },
      {
        type: 'Company',
        name: 'PlastForm',
        address: {
          street: 'Formallee',
          houseNumber: '1a',
          postalCode: '55566',
          city: 'Formstadt',
          state: 'Sachsen',
          country: 'Deutschland'
        },
        contactPersons: [{
          name: 'Martin Weiß',
          email: 'martin.weiss@plastform.de',
          phone: '01733334444',
          position: 'Produktmanager'
        }],
        materials: ['ABS', 'PET'],
        procedure: ['Blasformen'],
        companyWebsite: 'www.plastform.de',
      },
      {
        type: 'Company',
        name: 'ProtoPlastik',
        address: {
          street: 'Prototypweg',
          houseNumber: '99',
          postalCode: '10101',
          city: 'Neuhausen',
          state: 'Berlin',
          country: 'Deutschland'
        },
        contactPersons: [{
          name: 'Karsten Jung',
          email: 'karsten.jung@protoplastik.de',
          phone: '01700009999',
          position: 'F&E'
        }],
        materials: ['PA', 'TPE'],
        procedure: ['Spritzguss'],
        companyWebsite: 'www.protoplastik.de',
      },
      {
        type: 'Company',
        name: 'EcoPlast',
        address: {
          street: 'Ökoweg',
          houseNumber: '3',
          postalCode: '76543',
          city: 'Grünhausen',
          state: 'Baden-Württemberg',
          country: 'Deutschland'
        },
        contactPersons: [{
          name: 'Anne Braun',
          email: 'anne.braun@ecoplast.de',
          phone: '01550998877',
          position: 'CSR Managerin'
        }],
        materials: ['PLA', 'PET'],
        procedure: ['Extrusion'],
        companyWebsite: 'www.ecoplast.de',
      },
      {
        type: 'Company',
        name: 'DuroForm',
        address: {
          street: 'Hartenstraße',
          houseNumber: '27',
          postalCode: '30303',
          city: 'Hartenhausen',
          state: 'Hessen',
          country: 'Deutschland'
        },
        contactPersons: [{
          name: 'Sören Adler',
          email: 'soeren.adler@duroform.de',
          phone: '01601112233',
          position: 'Betriebsleiter'
        }],
        materials: ['Duroplast', 'ABS'],
        procedure: ['Spritzguss'],
        companyWebsite: 'www.duroform.de',
      },
      {
        type: 'Company',
        name: 'Plast-InnoTech',
        address: {
          street: 'Innovationsweg',
          houseNumber: '18',
          postalCode: '21212',
          city: 'Neustadt',
          state: 'Niedersachsen',
          country: 'Deutschland'
        },
        contactPersons: [{
          name: 'Lena Winter',
          email: 'lena.winter@plast-innotech.de',
          phone: '01523456789',
          position: 'Fertigungsplanung'
        }],
        materials: ['PC', 'PET'],
        procedure: ['Tiefziehen'],
        companyWebsite: 'www.plast-innotech.de',
      }


    ];

    return of(companies);
  }
}
