import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  NgxScannerQrcodeService,
  ScannerQRCodeConfig,
  ScannerQRCodeSelectedFiles,
} from 'ngx-scanner-qrcode';
import { ToastrService } from 'ngx-toastr';
import { ScreenService } from 'src/app/service/module/screen.service';
import { ServiceBankingService } from 'src/app/service/module/service-banking.service';
import { TicketService } from 'src/app/service/module/ticket.service';
import { BookingModalComponent } from './booking-modal/booking-modal.component';
import { QrcodeGenerationComponent } from './qrcode-generation/qrcode-generation.component';
import { CommentModalComponent } from './comment-modal/comment-modal.component';
import { BookingConfirmComponent } from './booking-confirm/booking-confirm.component';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit {
  listService: any;
  listEmployee: any;

  listScreen: any;
  backgroundImage: any;
  private currentImage = 'default-background.jpg';

  public qrCodeResult: ScannerQRCodeSelectedFiles[] = [];
  public qrCodeConfirm: ScannerQRCodeSelectedFiles[] = [];
  public config: ScannerQRCodeConfig = {
    constraints: {
      video: {
        width: window.innerWidth,
      },
    },
  };

  constructor(
    private serviceBankingService: ServiceBankingService,
    private modalService: NgbModal,
    private qrcode: NgxScannerQrcodeService,
    private screenService: ScreenService,
    private ticketSerrvice: TicketService,
    private toastService: ToastrService
  ) {}

  ngOnInit() {
    this.getScreen();
    this.getService();
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
    // Construct the background image URL
    this.backgroundImage = `url('${this.currentImage}')`;

    // Set a timeout to call getScreen after the determined timeDifferenceInMillis
    setTimeout(() => this.getScreen(), 10000);
  }

  getService() {
    this.serviceBankingService.getService({}).subscribe((res) => {
      if (res.errorCode === '0') {
        this.listService = res.data;
      }
    });
  }

  getScreen() {
    this.screenService.getScreen({}).subscribe((res) => {
      if (res.errorCode === '0') {
        this.listScreen = res.data;
        this.updateBackgroundImage();
      }
    });
  }

  getTime() {
    const d = new Date();
    const hours = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
    const minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
    // const seconds = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds();
    return hours + ':' + minutes;
  }

  getDate() {
    const d = new Date();
    const month =
      d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1;
    const day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
    return d.getFullYear() + '-' + month + '-' + day;
  }

  openModal(item: any) {
    console.log(item);
    const modalRef = this.modalService.open(BookingModalComponent, {
      centered: true,
      size: 'lg',
      backdrop: 'static',
    });

    modalRef.componentInstance.item = item;
    modalRef.componentInstance.listService = this.listService;
    modalRef.componentInstance.passEntry.subscribe((receive: any) => {
      this.modalService.dismissAll();

      const modalQrCode = this.modalService.open(QrcodeGenerationComponent, {
        centered: true,
        size: 'lg',
        backdrop: 'static',
      });
      modalQrCode.componentInstance.data = receive;
      modalQrCode.componentInstance.passEntry.subscribe(
        (receivedEntry: any) => {
          this.modalService.dismissAll();
        }
      );
    });
  }

  public onSelectToComment(files: any) {
    this.qrcode
      .loadFiles(files)
      .subscribe((res: ScannerQRCodeSelectedFiles[]) => {
        this.qrCodeResult = res;
      });
  }

  public onSelectToConfirm(files: any) {
    this.qrcode
      .loadFiles(files)
      .subscribe((res: ScannerQRCodeSelectedFiles[]) => {
        this.qrCodeConfirm = res;
      });
  }

  show(event: any) {
    const json = {
      code: JSON.parse(event[0].value).code,
      name: JSON.parse(event[0].value).name,
      phone: JSON.parse(event[0].value).phone,
    };
    this.ticketSerrvice.getTicket(json).subscribe((res) => {
      if (res.errorCode === '0') {
        if (res.data[0]) {
          if (res.data[0].status === 2) {
            const modalRef = this.modalService.open(CommentModalComponent, {
              centered: true,
              size: 'lg',
              backdrop: 'static',
            });
            modalRef.componentInstance.item = res.data[0];
            modalRef.componentInstance.passEntry.subscribe(
              (receivedEntry: any) => {
                this.modalService.dismissAll();
              }
            );
          } else {
            this.toastService.error(
              "Your transaction's status has not been done"
            );
          }
        } else {
          this.toastService.error('QR code is invalid');
        }
      }
    });
  }

  confirm(event: any) {
    const modalRef = this.modalService.open(BookingConfirmComponent, {
      centered: true,
      size: 'lg',
      backdrop: 'static',
    });
    modalRef.componentInstance.item = JSON.parse(event[0].value);
    modalRef.componentInstance.listService = this.listService;
    modalRef.componentInstance.passEntry.subscribe((receivedEntry: any) => {
      this.modalService.dismissAll();
    });
  }
}
