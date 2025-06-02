import { Component, Input, AfterViewInit, ViewChild } from '@angular/core';
import { Company } from '../../models/company.interface';
import { Observable, Subscription } from 'rxjs';

import { MatPaginatorModule, PageEvent, MatPaginator } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { NestedPipe } from '../pipes/nested.pipe';
import { MatIconModule } from '@angular/material/icon';

type FilterFunction = (data: Data, filter: string) => Data;

interface FilterEntry {
  value: string;
  filterFunction: FilterFunction;
}

interface TableSectionConfig {
  filters: string[];
  columns: string[];
  columnName: string[];
}
type TableConfig = Record<string, TableSectionConfig>;

type Data = Company[];
type Type = 'company' | '';

@Component({
  selector: 'app-tabel',
  standalone: true,
  imports: [MatPaginatorModule, CommonModule, MatFormFieldModule, MatInputModule, FormsModule, NestedPipe, MatIconModule],
  templateUrl: './tabel.component.html',
  styleUrl: './tabel.component.scss'
})
export class TabelComponent {

  @Input() data$!: Observable<Data>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private subscription!: Subscription;
  data: Data = [];
  dataType: Type = '';
  dataFiltered: Data = [];
  dataShow: Data = [];
  filter: string = '';

  sortValue = {
    target: 'name',
    descending: false,
  }

  filterValues: { [key: string]: FilterEntry } = {
    startsWith: { value: '', filterFunction: (data: Data, filter: string): Data => { return this.filterByName(data, filter); } },
    name: { value: '', filterFunction: (data: Data, filter: string): Data => { return this.filterByName(data, filter); } },
    street: { value: '', filterFunction: (data: Data, filter: string): Data => { return this.filterByName(data, filter); } },
    postelcode: { value: '', filterFunction: (data: Data, filter: string): Data => { return this.filterByPostalcode(data, filter); } },
    city: { value: '', filterFunction: (data: Data, filter: string): Data => { return this.filterByName(data, filter); } },
  }

  tableConfig: TableConfig = {
    company: {
      filters: ['name', 'street', 'postelcode', 'city'],
      columns: ['name', 'address.street', 'address.postalCode', 'address.city', 'materials'],
      columnName: ['name', 'street', 'postalCode', 'city', 'materials'],
    },
    material: {
      filters: ['name',],
      columns: ['name',],
      columnName: ['name',],
    }
  }

  alphabet: string[] = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
    'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
    'U', 'V', 'W', 'X', 'Y', 'Z',
    'Ä', 'Ö', 'Ü'
  ];
  constructor() {
  }

  ngOnInit() {
    this.subscription = this.data$.subscribe(data => { this.data = data; });
    this.dataType = this.data[0].type;
    this.dataFiltered = this.data;

    this.loadTablePart();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  setFilter(filter: string) {
    if (filter != this.filterValues['startsWith'].value) {
      this.filterValues['startsWith'].value = filter;
    } else {
      this.filterValues['startsWith'].value = '';
    }
    this.applyFilter();
  }

  setSortValue(target: string) {
    if (this.sortValue.target == target) {
      this.sortValue.descending = !this.sortValue.descending;
    } else {
      this.sortValue.target = target;
      this.sortValue.descending = false;
    }

    this.applyFilter();
  }

  getValueByPath(obj: any, path: string): string {
    return path.split('.').reduce((acc, part) => acc?.[part], obj) ?? '#';
  }

  setSort(data: Data, target: string, descending: Boolean): Data {
    const sorted = [...data].sort((a, b) => {
      return this.getValueByPath(a, target).localeCompare(this.getValueByPath(b, target));
    });

    return descending ? sorted.reverse() : sorted;
  }

  applyFilter() {
    this.dataFiltered = this.data;
    Object.entries(this.filterValues).forEach(([key, value]) => {
      if (value.value) {
        this.dataFiltered = value.filterFunction(this.dataFiltered, value.value);
      }

    });
    this.dataFiltered = this.setSort(this.dataFiltered, this.sortValue.target, this.sortValue.descending);

    this.loadTablePart();
    this.paginator.firstPage();
  }

  filterByName(dataToFilter: Company[], filter?: string,): Data {
    console.log('filterByName wird aufgerufen');
    let filtered = [];

    if (filter && filter.trim() !== '') {
      filtered = dataToFilter.filter(data => data.name.toLowerCase().startsWith(filter.toLowerCase()));
    } else {
      filtered = dataToFilter
    }

    return filtered;
  }

  filterByPostalcode(dataToFilter: Company[], filter?: string,): Data {
    console.log('filterByPostalcode wird aufgerufen');
    let filtered = [];

    if (filter && filter.trim() !== '') {
      filtered = dataToFilter.filter(data => data.address.postalCode.toLowerCase().startsWith(filter.toLowerCase()));
    } else {
      filtered = dataToFilter
    }

    return filtered;
  }

  onPageChange(event: PageEvent) {
    this.loadTablePart(event.pageIndex, event.pageSize);
  }

  loadTablePart(pageIndex: number = 0, pageSize: number = 25) {
    const start = pageIndex * pageSize;
    const end = start + pageSize;

    this.dataShow = this.dataFiltered.slice(start, end);
  }
}
