import { Component, OnInit } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-file-upload-dialog',
  templateUrl: './file-upload-dialog.component.html',
  styleUrls: ['./file-upload-dialog.component.scss']
})
export class FileUploadDialogComponent extends BaseDialog<FileUploadDialogComponent>{

  constructor(dialogRef: MatDialogRef<FileUploadDialogComponent>) {
    super(dialogRef);
  }

}

export enum FileUploadState {
  Yes,
}
