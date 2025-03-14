import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { ProductService } from 'src/app/services/common/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerTypes } from 'src/app/base/base.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent, DeleteState } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { AlertifyService, MessageType } from 'src/app/services/admin/alertify.service';
import { error } from 'console';
declare var $: any;

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {
  @Input() id: string;
  @Input() controller: string;
 
  constructor(
    private element: ElementRef,
    private httpClientService: HttpClientService,
    private renderer: Renderer2,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog,
    private alertify: AlertifyService
  ) {

    const img = this.renderer.createElement('img');
    this.renderer.setAttribute(img, 'src', '../../../../../assets/delete.png');
    this.renderer.setStyle(img, 'cursor', 'pointer');
    this.renderer.setStyle(img, 'transition', 'transform 0.2s ease, filter 0.2s ease');

    this.renderer.listen(img, 'mouseenter', () => {
      this.renderer.setStyle(img, 'transform', 'scale(1.2)');
      this.renderer.setStyle(img, 'filter', 'brightness(1.2)');
    });

    this.renderer.listen(img, 'mouseleave', () => {
      this.renderer.setStyle(img, 'transform', 'scale(1)');
      this.renderer.setStyle(img, 'filter', 'brightness(1)');
    });

    this.renderer.listen(img, 'mousedown', () => {
      this.renderer.setStyle(img, 'transform', 'scale(0.9)');
    });

    this.renderer.listen(img, 'mouseup', () => {
      this.renderer.setStyle(img, 'transform', 'scale(1.2)');
    });

    this.renderer.appendChild(this.element.nativeElement, img);
  }

  @Output() callback: EventEmitter<any> = new EventEmitter();

  @HostListener('click')
  async onClick() {
    this.openDialog(async () => {
      this.spinner.show(SpinnerTypes.BallAtom);
      const td: HTMLTableCellElement = this.element.nativeElement;
       this.httpClientService.delete({controller: this.controller}, this.id).subscribe(data =>{
          $(td.parentElement).animate({
            opacity:0,
            left: "+=50",
            height: "toggle"
          }, 700, () => {
            this.callback.emit();
            this.alertify.message('Product deleted successfully', MessageType.Success);
          });
        },(errorResponse: HttpErrorResponse) => {
          this.spinner.hide(SpinnerTypes.BallAtom);
          this.alertify.message(errorResponse.error, MessageType.Error);
        });
    });
  }

  openDialog(afterClosed: any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: DeleteState.Yes,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === DeleteState.Yes) {
        afterClosed();
      }
    });
  }
}
