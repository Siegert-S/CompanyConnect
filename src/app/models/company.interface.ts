import { Address } from "./address.interface";
import { ContactPerson } from "./contact-person.interface";
import { Project } from "./project.interface";
import { SuppliedCustomer } from "./supplied-customer.interface";

export interface Company {
    type: 'company';
    name: string;
    address: Address;
    contactPersons: ContactPerson[];
    projects?: Project[];
    materials: string[];
    procedure: string[];
    suppliedCustomers?: SuppliedCustomer[];
    companyWebsite: string;
}
