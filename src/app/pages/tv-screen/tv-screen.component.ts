import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { TicketService } from 'src/app/service/module/ticket.service';
import { NotificationComponent } from './notification/notification.component';
import { SharedService } from 'src/app/service/module/shared.service';
import { ScreenService } from 'src/app/service/module/screen.service';

@Component({
  selector: 'app-tv-screen',
  templateUrl: './tv-screen.component.html',
  styleUrls: ['./tv-screen.component.scss'],
})
export class TvScreenComponent implements OnInit {
  listTicket: any;
  Text: any = [];
  receivedData: any;
  listData: any;
  subscription!: Subscription;

  private currentImage = 'default-background.jpg';
  listScreen: Array<any> = [];
  backgroundImage: any;

  constructor(
    private ticketService: TicketService,
    private sharedService: SharedService,
    private modalService: NgbModal,
    private screenService: ScreenService
  ) {}

  ngOnInit() {
    this.getScreen();
    this.getTicket();

    this.sharedService.speakNotification.subscribe((res) => {
      console.log(res);
    });
  }

  getDate() {
    const d = new Date();
    const month =
      d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1;
    const day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
    return d.getFullYear() + '-' + month + '-' + day;
  }

  getTime() {
    const d = new Date();
    const hours = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
    const minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
    // const seconds = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds();
    return hours + ':' + minutes;
  }

  getTicket() {
    const json = {
      date: this.getDate(),
    };

    this.ticketService.getTicketForTV(json).subscribe((res) => {
      if (res.errorCode === '0') {
        this.listTicket = res.data;
      }
    });
    setTimeout(() => this.getTicket(), 5000);
  }

  getScreen() {
    this.screenService.getScreen({}).subscribe((res) => {
      if (res.errorCode === '0') {
        this.listScreen = res.data;
        this.updateBackgroundImage();
      }
    });
  }

  updateBackgroundImage() {
    const currentTime: any = this.getTime();
    const currentDate: any = this.getDate();

    for (let item of this.listScreen) {
      if (item.startDate == null) {
        const startTime: any = item.startTime;
        const endTime: any = item.endTime;
        if (startTime <= currentTime && currentTime <= endTime) {
          this.currentImage = item.image;
          break; // Exit the loop once a suitable image is found
        }
      } else {
        const startDay: any = item.startDate;
        const endDay: any = item.endDate;

        if (startDay <= currentDate && currentDate <= endDay) {
          this.currentImage = item.image;
          break; // Exit the loop once a suitable image is found
        }
      }
    }

    this.backgroundImage = `url(\'${this.currentImage}\')`;
    setTimeout(() => this.getScreen(), 60000);
  }

  openModal(item: any) {
    const modalRef = this.modalService.open(NotificationComponent, {
      centered: true,
      size: 'lg',
      backdrop: 'static',
    });
    modalRef.componentInstance.data = item;

    modalRef.componentInstance.passEntry.subscribe((receive: any) => {
      this.modalService.dismissAll();
    });
  }
}
