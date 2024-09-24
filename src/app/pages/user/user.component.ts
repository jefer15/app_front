import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { NewUserComponent } from './new-user/new-user.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from "@angular/material/dialog";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit{
  displayedColumns: string[] = ['id', 'identification', 'name', 'lastName', 'email', 'actions'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _userService: UserService
  ){}

  ngOnInit(): void {
    this.getData()
  }

  getData(){
    this._userService.users().subscribe({
      next:(res:any)=>{
        this.dataSource.data = res.data;
      }
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  editUser(row:any){
    const dialogRef = this._dialog.open(NewUserComponent, {
      width: "80%",
      height: "85%",
      maxWidth: "80%",
      data: row
    });
    dialogRef.afterClosed().subscribe((data) => {
      this.getData();
    });
  }

  deleteUser(row:any){
    this._userService.deleteUser(row.id).subscribe({
      next: (res: any) => {
        Swal.fire({
          title: "Usuarios",
          text: "Se ha eliminado exitosamente el usuario",
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
          title: "Usuarios",
          text: "No se eliminó el usuario",
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
