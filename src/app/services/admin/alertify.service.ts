import { Injectable } from '@angular/core';
declare var alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { 
    alertify.set('notifier', 'position', 'bottom-center');
  }

  message(message: string, type: MessageType) {
    const msg = alertify[type](message);
  }
}

export enum MessageType {
  Success = 'success',
  Error = 'error',
  Notify = 'notify',
  Warning = 'warning',
  Message = 'message'
}
