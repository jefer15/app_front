import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from "@angular/material/dialog";
import Swal from 'sweetalert2';
import { OrganizationsService } from 'src/app/services/organizations/organizations.service';
import { NeOrganizationComponent } from './ne-organization/ne-organization.component';

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.scss']
})
export class OrganizationsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'contactPerson', 'contactEmail', 'phone', 'address', 'type', 'actions'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _organizationService: OrganizationsService,
    private _dialog: MatDialog,
  ) { }
  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this._organizationService.organizations().subscribe({
      next: (res: any) => {
        this.dataSource.data = res.data;
      }
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  addOrganization() {
    const dialogRef = this._dialog.open(NeOrganizationComponent, {
      width: "80%",
      height: "85%",
      maxWidth: "80%",
    });
    dialogRef.afterClosed().subscribe((data) => {
      this.getData();
    });
  }
  editOrganization(row: any) {
    const dialogRef = this._dialog.open(NeOrganizationComponent, {
      width: "80%",
      height: "85%",
      maxWidth: "80%",
      data: row
    });
    dialogRef.afterClosed().subscribe((data) => {
      this.getData();
    });
  }

  deleteOrganization(row: any) {
    this._organizationService.deleteOrganization(row.id).subscribe({
      next: (res: any) => {
        Swal.fire({
          title: "Organizaciones",
          text: "Se ha eliminado exitosamente la organización",
          icon: 'success',
          confirmButtonText: 'Ok',
          showConfirmButton: true,
          showDenyButton: false
        }).then((result) => {
          this.getData();
        });
      },
      error: (err: any) => {
        Swal.fire({
          title: "Organizaciones",
          text: "No se eliminó la organización",
          icon: 'error',
          confirmButtonText: 'Ok',
          showConfirmButton: true,
          showDenyButton: false
        }).then((result) => {
          this.getData();
        });
      },
    });
  }
}
