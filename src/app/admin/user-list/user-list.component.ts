import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../_services';
import { User } from '../../_models';
import { first } from '../../../../node_modules/rxjs/operators';
import {
  MatTableDataSource,
  MatTableModule,
  MatTable
} from '../../../../node_modules/@angular/material';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  @ViewChild('table') table: MatTable<Element>;

  displayedColumns: string[] = ['username', 'firstName', 'lastName'];
  dataSource = new MatTableDataSource([]);

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService
      .getAll()
      .pipe(first())
      .subscribe(users => {
        this.users = users;
        this.dataSource = new MatTableDataSource(this.users);
        this.table.dataSource = this.dataSource;
        this.table.renderRows();
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
