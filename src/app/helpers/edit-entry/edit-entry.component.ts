import { Component, inject, TemplateRef, Input, Output, EventEmitter,  } from '@angular/core';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {AbstractControl, FormBuilder, Validators, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-edit-entry',
  standalone: true,
  imports: [NgbDatepickerModule, FormsModule, ReactiveFormsModule,CommonModule],
  templateUrl: './edit-entry.component.html',
  styleUrl: './edit-entry.component.scss'
})
export class EditEntryComponent {
  @Input() title:string = "";
  @Input() boards:Array<{id: number, name: string}> = [];
  @Input() data:{id: number, position: number, board_id: number, name: string, description: string} = {
    id: 0,
    name: '',
    description: '',
    position: 0,
    board_id: 0
  };
  @Input() button:string = "";
  @Output() confirm = new EventEmitter<{id: number, position: number, board_id: number, name: string, description: string}>();

  loginForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    description: [''],
    board_id: [0]
  })
  constructor(private formBuilder: FormBuilder) {}
  onSubmit(modal: any) {
    if (this.loginForm.invalid) {
      return;
    }
    this.confirm.emit({id: this.data.id, position: this.data.position, board_id: this.loginForm.value.board_id ? this.loginForm.value.board_id : -1, name: this.loginForm.value.name ? this.loginForm.value.name : "", description: this.loginForm.value.description ? this.loginForm.value.description : "" });
    modal.dismiss('Cross click');
  }
  get controls(): { [p: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  private modalService = inject(NgbModal);
  closeResult = '';
  
  open(content: TemplateRef<any>) {
    this.loginForm.setValue({ name: this.data.name, board_id: this.data.board_id, description: this.data.description});
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
