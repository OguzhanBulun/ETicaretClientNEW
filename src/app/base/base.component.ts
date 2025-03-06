import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

export class BaseComponent{
constructor(private spinner: NgxSpinnerService) { }

  showSpinner( spinnerType: SpinnerTypes) {
    this.spinner.show(spinnerType);
  }

  hideSpinner(spinnerType: SpinnerTypes) {
    this.spinner.hide(spinnerType);
  }
}

export enum SpinnerTypes {
  BallAtom = "spinner1",
  BallScaleMultiple = "spinner2",
  BallSpinClockwiseFadeRotating = "spinner3"
}

