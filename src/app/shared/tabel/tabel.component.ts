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
  // filterFunction: FilterFunction;
  path: string;
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
    startsWith: { value: '', path: 'name' },
    name: { value: '', path: 'name' },
    street: { value: '', path: 'address.street' },
    postelcode: { value: '', path: 'address.postalCode' },
    city: { value: '', path: 'address.city' },
    materials: { value: '', path: 'materials' },
  }

  tableConfig: TableConfig = {
    company: {
      filters: ['name', 'postelcode', 'city', 'materials'],
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

  resetFilter() {
    Object.entries(this.filterValues).forEach(([key, value]) => {
      value.value = '';
    });
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

  setSort(data: Data, target: string, descending: Boolean): Data {
    const sorted = [...data].sort((a, b) => {
      const aVal = this.getValueByPath(a, target);
      const bVal = this.getValueByPath(b, target);

      if (typeof (aVal) == 'string' && typeof (bVal) == 'string') {
        return aVal.localeCompare(bVal);
      }
      return 0;
    });

    return descending ? sorted.reverse() : sorted;
  }

  getValueByPath(obj: any, path: string): string {
    let target = path.split('.').reduce((acc, part) => acc?.[part], obj) ?? '#';
    return target;
  }

  applyFilter() {
    this.dataFiltered = this.data;
    Object.entries(this.filterValues).forEach(([key, value]) => {

      if (value.value) {
        this.dataFiltered = this.filterByKey(this.dataFiltered, value.path, value.value);
      }

    });
    this.dataFiltered = this.setSort(this.dataFiltered, this.sortValue.target, this.sortValue.descending);

    this.loadTablePart();
    this.paginator.firstPage();
  }

  filterByKey(dataToFilter: Data, key: string, filter: string): Data {
    if (!filter && filter.trim() == '') {
      return dataToFilter;
    }
    const lowerFilter = filter.toLowerCase();

    return dataToFilter.filter(data => {
      const target = this.getValueByPath(data, key);
      if (typeof target == 'string') {
        return target.toLowerCase().startsWith(lowerFilter);
      }

      if (Array.isArray(target)) {
        return (target as string[]).some((item: string) => item.toLowerCase().startsWith(lowerFilter));
      }
      return false;
    });
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
