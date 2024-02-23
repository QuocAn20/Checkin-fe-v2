import { DecentralizationService } from './../../../../service/module/decentralization.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-decentralization',
  templateUrl: './decentralization.component.html',
  styleUrls: ['./decentralization.component.scss'],
})
export class DecentralizationComponent implements OnInit {
  listMenu: Array<any> = [];
  listDecentral: Array<any> = [];

  ngOnInit(): void {
    this.getMenuPer();
  }

  constructor(
    private toastService: ToastrService,
    private decentralService: DecentralizationService
  ) {}

  getMenuPer() {
    this.decentralService.getDecentral({}).subscribe((res) => {
      if (res.errorCode === '0') {
        this.listDecentral = res.data;
      }
    });
  }

  onChanged(item: any) {
    const json = {
      menuId: item?.menuId,
      menuName: item?.menuName,
      creator: item?.creator,
      // adminChecked: item?.adminChecked,
      emplChecked: item?.emplChecked,
    };
    this.decentralService.updateDecentral(json).subscribe((res) => {
      if (res.errorCode === '0') {
        this.toastService.success(res.errorDesc, 'Success');
      } else {
        this.toastService.error(res.errorDesc, 'Error');
      }
    });
  }
}
