import { HttpEvent } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { Contact } from '../contact';
import { Provider } from '../provider';
import { DataService } from '../services/data.service';
import { ExportService } from '../services/export.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {

  public contacts!: Contact[];
  private paginatedContacts: Record<number, Contact[]>;
  public page = 1;
  private totalPages = 0
  private pagination: number = 10;
  public emailProviders: Provider[];
  public sort: string = 'date';
  private asc: boolean = true;
  private filter: string = '';
  public search: string = '';
  error = '';
  success = '';

  constructor(private dataService: DataService, public exportService: ExportService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    console.log(this);
    this.dataService.getAll(this.pagination, this.sort, this.asc, this.filter, this.search).subscribe(
      (res: Record<number, Contact[]>) => {
        this.paginatedContacts = res;
        this.totalPages = Object.keys(this.paginatedContacts).length;
        this.page = this.page > this.totalPages ? this.totalPages : this.page;
        this.contacts = res[this.page];
      },
      (err) => {
        this.error = err;
      }
    );
    this.dataService.getEmailProviders().subscribe(
      (res: Provider[]) => {
        this.emailProviders = res;
      },
      (err) => {
        this.error = err;
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
    console.log("Delete id: "+ id);
    this.dataService.deleteEmail(id).subscribe(
      (res => {
        this.getData();
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
    console.log("Data export for ID's: ");
    console.log(this.exportService.exportForm.value.checkboxes);
    this.exportService.exportData(this.exportService.exportForm.value.checkboxes).subscribe(
      (response) => {
        // @ts-ignore
        let myBlob = new Blob([response], {type: 'text/csv'});
        let downloadUrl = URL.createObjectURL(myBlob);
    
        let a = document.createElement('a');
        a.href = downloadUrl;
        a.download = 'report.csv';// you can take a custom name as well as provide by server
    
        // start download
        a.click();
    // after certain amount of time remove this object!!!
    setTimeout( ()=> {
            URL.revokeObjectURL(downloadUrl);
        }, 100);

        console.log("Finished export function");
        console.log(response);
        //console.log(response._body);
    });

    //   (
    //   (res) => {
   
    //     this.downloadFile(res);
    //   }
    // ));
  }

  downloadFile(response) {
    let header_content = response.headers.get('content-disposition');
    console.log("header content: ");
    console.log(header_content);
    let file = header_content.split('=')[1];
    file = file.substring(1, file.length - 1);
    let extension = file.split('.')[1].toLowerCase();
    // It is necessary to create a new blob object with mime-type explicitly set
    // otherwise only Chrome works like it should
    var newBlob = new Blob([response.body], { type: `text/csv` })

    // IE doesn't allow using a blob object directly as link href
    // instead it is necessary to use msSaveOrOpenBlob
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(newBlob);
      return;
    }

    // For other browsers: 
    // Create a link pointing to the ObjectURL containing the blob.
    const data = window.URL.createObjectURL(newBlob);
    var link = document.createElement('a');
    link.href = data;
    link.download = file;
    link.click();
    setTimeout(() => {
      // For Firefox it is necessary to delay revoking the ObjectURL
      window.URL.revokeObjectURL(data);
    }, 400)
  }

}
