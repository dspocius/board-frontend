import { Component, inject, Input, Output, EventEmitter  } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CreateEntryComponent } from './../create-entry/create-entry.component';
import { ConfirmComponent } from './../helpers/confirm/confirm.component';
import { EditEntryComponent } from './../helpers/edit-entry/edit-entry.component';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-entries',
  standalone: true,
  imports: [CdkDropListGroup, CdkDropList, CdkDrag, CreateEntryComponent,ConfirmComponent,EditEntryComponent],
  templateUrl: './entries.component.html',
  styleUrl: './entries.component.scss'
})
export class EntriesComponent {
  @Input({ required: true }) board_id!: string;
  @Input() boards: Array<{ id: number; name: string; }> = [];
  @Output() reloadBoard = new EventEmitter<any>();
  entry_data: { board_id: string, entries: Array<any> } = {board_id: '-1', entries: []};
  httpClient = inject(HttpClient);
  about = "";
  public entries: Array<any> = [];
  ngOnInit(): void {
    this.entry_data = { board_id: this.board_id, entries: [] };
    this.get();
  }
  itemCreated(item:any) {
    this.entries.push(item);
  }
  get() {
    this.httpClient.get('http://localhost:3000/entries/'+this.board_id)
      .subscribe({
        next: (data: any) => {
          this.entries = data;
          this.entry_data.entries = this.entries;
        }, error: (err) => console.log(err)
      });
  }
  drop(event: any) {
    if (event.previousContainer.data.board_id !== event.container.data.board_id) {
      this.entries.push(event.item.data);
      event.item.element.nativeElement.remove();

      this.confirmEdit({ id: event.item.data.id, board_id: parseInt(event.container.data.board_id.toString()), 
        name: event.item.data.name, description: event.item.data.description },true);
    }
  }
  confirmEdit(data: {id: number, board_id: number, name: string, description: string}, force:boolean) {
      this.httpClient.put('http://localhost:3000/entries/'+data.id, { name: data.name, description: data.description, board_id: parseInt(data.board_id.toString())  })
      .subscribe({
        next: (datag: any) => {
          if (data.board_id.toString() != this.board_id.toString() || force) {
            this.boardCreated();
          } else {
            this.get();
          }
        }, error: (err) => console.log(err)
      });
  }
  boardCreated() {
    this.reloadBoard.emit();
  }
  delete(entry_id: number) {
    this.httpClient.delete('http://localhost:3000/entries/'+entry_id)
    .subscribe({
      next: (data: any) => {
        this.get();
      }, error: (err) => console.log(err)
    });
  }
}
