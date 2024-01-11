import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-layouts',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  isCondensed = false;
  currentUser: any;
  name: any;
  listMenu: any;
  listPermission: any;
  listParentMenu: any;

  constructor(
  ) { }

  ngOnInit() {
  }

}