import { Component, inject, TemplateRef, Input, Output, EventEmitter,  } from '@angular/core';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {AbstractControl, FormBuilder, Validators, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-edit-board',
  standalone: true,
  imports: [NgbDatepickerModule, FormsModule, ReactiveFormsModule,CommonModule],
  templateUrl: './edit-board.component.html',
  styleUrl: './edit-board.component.scss'
})
export class EditBoardComponent {
  @Input() title:string = "";
  @Input() data:{id: number, name: string} = {
    id: 0,
    name: ''
  };
  @Input() button:string = "";
  @Output() confirm = new EventEmitter<{id: number, name: string}>();

  loginForm = this.formBuilder.group({
    name: ['', [Validators.required]]
  })
  constructor(private formBuilder: FormBuilder) {}
  onSubmit(modal: any) {
    if (this.loginForm.invalid) {
      return;
    }
    const data = this.loginForm.value;
    this.confirm.emit({id: this.data.id, name: this.loginForm.value.name ? this.loginForm.value.name : "" });
    modal.dismiss('Cross click');
  }
  get controls(): { [p: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  private modalService = inject(NgbModal);
  closeResult = '';
  
  open(content: TemplateRef<any>) {
    this.loginForm.setValue({ name: this.data.name});
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }
  
  private getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }
}
