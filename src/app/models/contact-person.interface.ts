import { Note } from "./note.interface";

export interface ContactPerson {
    name: string;
    email: string;
    phone: string;
    position: string;
    note?: Note;
}
