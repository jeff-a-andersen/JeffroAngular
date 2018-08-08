import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../_services';
import { User } from '../../_models';
import { first } from '../../../../node_modules/rxjs/operators';
import {
  MatTableDataSource,
  MatTableModule,
  MatTable
} from '../../../../node_modules/@angular/material';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '../../../../node_modules/@angular/animations';
import {
  FormGroup,
  FormBuilder
} from '../../../../node_modules/@angular/forms';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state(
        'collapsed',
        style({ height: '0px', minHeight: '0', display: 'none' })
      ),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      )
    ])
  ]
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  userForm: FormGroup;
  // @ViewChild('table')
  @ViewChild(MatTable)
  table: MatTable<User>;
  loaded: Boolean = false;
  // table: MatTable<Element>;

  columnsToDisplay: string[] = ['username', 'firstName', 'lastName'];
  columnLabels = [
    { colName: 'username', colLabel: 'Username' },
    { colName: 'firstName', colLabel: 'First Name' },
    { colName: 'lastName', colLabel: 'Last Name' }
  ];
  // columnLabels: string[] = ['Username', 'First Name', 'Last Name'];
  // dataSource = new MatTableDataSource([]);
  dataSource = new MatTableDataSource(this.users);
  expandedElement: User;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userService
      .getAll()
      .pipe(first())
      .subscribe(users => {
        this.users = users;
        this.dataSource = new MatTableDataSource(this.users);
        this.table.dataSource = this.dataSource;
        this.table.renderRows();
        this.userForm = this.formBuilder.group(this.users);

        this.loaded = true;
      });
  }

  buildFormGroupItem(user, index) {}

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onSubmit() {}
}
