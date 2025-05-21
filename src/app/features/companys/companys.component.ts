import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginatorModule, PageEvent, MatPaginator } from '@angular/material/paginator';


interface Item {
  name: string;
  number: number;
}

@Component({
  selector: 'app-companys',
  standalone: true,
  imports: [MatPaginatorModule, CommonModule],
  templateUrl: './companys.component.html',
  styleUrl: './companys.component.scss'
})

export class CompanysComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  alphabet: string[] = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
    'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
    'U', 'V', 'W', 'X', 'Y', 'Z',
    'Ä', 'Ö', 'Ü'
  ];

  list: Item[] = [
    { name: 'Äpfel', number: 1 },
    { name: 'Auto', number: 2 },
    { name: 'Anker', number: 3 },
    { name: 'Ball', number: 4 },
    { name: 'Buch', number: 5 },
    { name: 'Berg', number: 6 },
    { name: 'Clown', number: 7 },
    { name: 'Code', number: 8 },
    { name: 'Café', number: 9 },
    { name: 'Dorf', number: 10 },
    { name: 'Dose', number: 11 },
    { name: 'Drache', number: 12 },
    { name: 'Esel', number: 13 },
    { name: 'Eis', number: 14 },
    { name: 'Echo', number: 15 },
    { name: 'Fisch', number: 16 },
    { name: 'Feuer', number: 17 },
    { name: 'Fluss', number: 18 },
    { name: 'Gans', number: 19 },
    { name: 'Gabel', number: 20 },
    { name: 'Garten', number: 21 },
    { name: 'Haus', number: 22 },
    { name: 'Hafen', number: 23 },
    { name: 'Hund', number: 24 },
    { name: 'Igel', number: 25 },
    { name: 'Insel', number: 26 },
    { name: 'Jacke', number: 27 },
    { name: 'Jagd', number: 28 },
    { name: 'Joker', number: 29 },
    { name: 'Karte', number: 30 },
    { name: 'Kegel', number: 31 },
    { name: 'Kiste', number: 32 },
    { name: 'Lampe', number: 33 },
    { name: 'Licht', number: 34 },
    { name: 'Löwe', number: 35 },
    { name: 'Maus', number: 36 },
    { name: 'Mond', number: 37 },
    { name: 'Milch', number: 38 },
    { name: 'Nase', number: 39 },
    { name: 'Netz', number: 40 },
    { name: 'Nacht', number: 41 },
    { name: 'Obst', number: 42 },
    { name: 'Ohr', number: 43 },
    { name: 'Ofen', number: 44 },
    { name: 'Pferd', number: 45 },
    { name: 'Pilz', number: 46 },
    { name: 'Punkt', number: 47 },
    { name: 'Qualle', number: 48 },
    { name: 'Quelle', number: 49 },
    { name: 'Quiz', number: 50 },
    { name: 'Radio', number: 51 },
    { name: 'Regen', number: 52 },
    { name: 'Ring', number: 53 },
    { name: 'Sonne', number: 54 },
    { name: 'Stuhl', number: 55 },
    { name: 'Suppe', number: 56 },
    { name: 'Tiger', number: 57 },
    { name: 'Tisch', number: 58 },
    { name: 'Tonne', number: 59 },
    { name: 'Uhr', number: 60 },
    { name: 'Ufer', number: 61 },
    { name: 'Umhang', number: 62 },
    { name: 'Vogel', number: 63 },
    { name: 'Vase', number: 64 },
    { name: 'Vulkan', number: 65 },
    { name: 'Wolke', number: 66 },
    { name: 'Wasser', number: 67 },
    { name: 'Wald', number: 68 },
    { name: 'Xylophon', number: 69 },
    { name: 'Xenon', number: 70 },
    { name: 'Yacht', number: 71 },
    { name: 'Yeti', number: 72 },
    { name: 'Ypsilon', number: 73 },
    { name: 'Zebra', number: 74 },
    { name: 'Zeitung', number: 75 },
    { name: 'Zug', number: 76 },
    { name: 'Alpha', number: 77 },
    { name: 'Beta', number: 78 },
    { name: 'Gamma', number: 79 },
    { name: 'Delta', number: 80 },
  ]
  filteredList: Item[] = [];
  showList: Item[] = [];
  filter: string = '';

  ngOnInit() {
    this.filteredList = this.list;
    this.loadTablePart(0, 25);

  }

  ngAfterViewInit() {
    console.log(this.paginator.pageSize); // Zugriff auf aktuelle Seitengröße
    this.paginator.page.subscribe(event => {
      this.onPageChange(event);
    });
    // console.log(this.paginator);
  }

  setFilter(filter: string) {
    if (filter != this.filter) {
      this.filter = filter;
    } else {
      this.filter = '';
    }

    this.filterName(this.filter);
  }

  filterName(filter?: string) {
    console.log('filter wird aufgerufen');

    if (filter && filter.trim() !== '') {
      this.filteredList = this.list.filter(data => data.name.toLowerCase().startsWith(filter.toLowerCase()));
    } else {
      this.filteredList = this.list
    }
    this.loadTablePart();
    this.paginator.firstPage();
    // console.log(this.showList);
  }

  onPageChange(event: PageEvent) {
    console.log('Change wird aufgerufen');
    this.loadTablePart(event.pageIndex, event.pageSize);
  }

  loadTablePart(pageIndex: number = 0, pageSize: number = 25) {
    const start = pageIndex * pageSize;
    const end = start + pageSize;

    this.showList = this.filteredList.slice(start, end);
    // console.log(this.showList);
  }

}
