import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from "@angular/material/dialog";
import Swal from 'sweetalert2';
import { FilesService } from 'src/app/services/files/files.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit{
  displayedColumns: string[] = ['id', 'nameOrganization', 'transactionType', 'description', 'actions'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('fileInput') fileInput!: ElementRef;
  constructor(
    private _filesService: FilesService,
    private _dialog: MatDialog,
  ) { }
  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this._filesService.inventories().subscribe({
      next:(res:any)=>{
        this.dataSource.data = res.data;
      }
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    if (file && fileExtension === 'xlsx') {
      this.readExcelFile(file);
    } else {
      Swal.fire({
        title: "Error",
        text: "Archivo incorrecto, por favor suba un formato de excel.",
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
  }

  readExcelFile(file: File) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      this.processExcelData(jsonData);
    };
    reader.readAsArrayBuffer(file);
  }

  processExcelData(jsonData: any[]) {
    const inventoryData = jsonData.map(row => ({
      idOrganization: row.idOrganization,
      transactionType: row.transactionType,
      quantity: row.quantity,
      unitPrice: row.unitPrice,
      address: row.address,
      description: row.description,
      mark: row.mark,
      transactionDate: this.excelDateToJSDate(row.transactionDate)
    }));
    this.addInventory(inventoryData);
  }

  excelDateToJSDate(excelDate: number): string {
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const excelEpoch = new Date(Date.UTC(1899, 11, 30));
    const jsDate = new Date(excelEpoch.getTime() + excelDate * millisecondsPerDay);
    const year = jsDate.getUTCFullYear();
    const month = String(jsDate.getUTCMonth() + 1).padStart(2, '0');
    const day = String(jsDate.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  addInventory(inventoryData: any[]) {
    console.log("data:",inventoryData)
    // this._filesService.createInventory(inventoryData).subscribe({
    //   next: (res: any) => {
    //     Swal.fire({
    //       title: "Inventario",
    //       text: "Se ha guardado exitosamente",
    //       icon: 'success',
    //       confirmButtonText: 'Ok',
    //       showConfirmButton: true,
    //       showDenyButton: false
    //     }).then((result) => {
    //       this.getData();
    //     });
    //   },
    //   error: (err) => {
    //     Swal.fire({
    //       title: "Error",
    //       text: "No se pudo guardar el inventario",
    //       icon: 'error',
    //       confirmButtonText: 'Ok'
    //     });
    //   }
    // });
  }

}
