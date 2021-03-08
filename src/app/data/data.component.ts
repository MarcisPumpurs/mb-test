import { Component, OnInit } from '@angular/core';
import { count } from 'rxjs/operators';
import { Contact } from '../contact';
import { Provider } from '../provider';
import { DataService } from '../services/data.service';
import { ExportService } from '../services/export.service';
import { StateService } from '../services/state.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {

  public contacts: Contact[];
  private paginatedContacts: Record<number, Contact[]>;
  public page = 1;
  private totalPages = 0
  private pagination: number = 10;
  public emailProviders: Provider[];
  public sort: string = 'date';
  private asc: boolean = true;
  private filter: string = '';
  public search: string = '';

  constructor(private dataService: DataService, 
              public exportService: ExportService, 
              public stateService: StateService) { }

  ngOnInit(): void {
    this.getData();
    this.stateService.data = true;
  }

  getData(): void {
    this.dataService.getAll(this.pagination, this.sort, this.asc, this.filter, this.search).subscribe(
      (res: Record<number, Contact[]>) => {
        this.paginatedContacts = res;
        this.totalPages = Object.keys(this.paginatedContacts).length;
        this.page = this.page > this.totalPages ? this.totalPages : this.page;
        this.contacts = res[this.page];
      },
      (err) => {
        this.resetFilters();
        console.log(err);
      }
    );
    this.dataService.getEmailProviders().subscribe(
      (res: Provider[]) => {
        this.emailProviders = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  searchData(): void{
    this.getData();
  }

  resetFilters(){
    this.asc = true;
    this.sort = 'date';
    this.filter = '';
    this.search = '';
    this.getData();
    this.totalPages = Object.keys(this.paginatedContacts).length;
  }

  filterData(needle: string): void{
    this.filter = needle;
    this.getData();
  }

  sortByAttr(sort: string): void{
    this.sort = sort;
    this.getData();
  }

  sortOrder(): void{
    this.asc = this.asc ? false : true;
    this.getData();
  }

  getSort(): string{
    return this.sort;
  }

  getAsc(): boolean{
    return this.asc;
  }

  deleteFromList(id: number): void{
    this.dataService.deleteEmail(id).subscribe(
      (res => {
        this.getData();
        if(this.contacts.length < 1){
          this.resetFilters();
        }
      }
      )
    );
  }

  nextPage(){
    this.page += this.page < this.totalPages ? 1 : 0;
    this.contacts = this.paginatedContacts[this.page];
  }

  prevPage(){
    this.page -= this.page > 1 ? 1 : 0;
    this.contacts = this.paginatedContacts[this.page];
  }

  getPage(): number{
    return this.page;
  }

  getTotalPages(): number{
    return this.totalPages;
  }

  export(){
    this.exportService.exportData(this.exportService.exportForm.value.checkboxes).subscribe(
      (response) => {
        let blob = new Blob([response], {type: 'text/csv'});
        let downloadUrl = URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = downloadUrl;
        a.download = 'email_export.csv';
        a.click();
        setTimeout( ()=> {
            URL.revokeObjectURL(downloadUrl);
        }, 100);
    });
  }

}
