import { Note } from "./note.interface";

export interface ContactPerson {
    name: string;
    email: string;
    phone: number;
    position: string;
    note?: Note;
}
