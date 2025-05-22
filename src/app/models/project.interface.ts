import { ContactPerson } from "./contact-person.interface";
import { Note } from "./note.interface";

export interface Project {
    name: string;
    startDateTimestamp: number;
    lastUpdateTimestamp?: number;
    description: string;
    contactPerson: ContactPerson[];
    notes?: Note[];
}
