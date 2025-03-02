import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CustomToastrService {

  constructor(private toastr: ToastrService) {
    toastr.toastrConfig.positionClass = 'toast-bottom-center';
   }

  message(message:string, title:string, messageType: ToastrMessageType) {
    this.toastr[messageType](message, title);
  }
}

export enum ToastrMessageType {
  Success = 'success',
  Error = 'error',
  Warning = 'warning',
  Info = 'info'
}
