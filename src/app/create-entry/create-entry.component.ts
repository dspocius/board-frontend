import { Component, inject,Input,Output,EventEmitter  } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-create-entry',
  standalone: true,
  imports: [HttpClientModule,FormsModule],
  templateUrl: './create-entry.component.html',
  styleUrl: './create-entry.component.scss'
})
export class CreateEntryComponent {
  @Input({ required: true }) board_id!: string;
  @Output() newItemEvent = new EventEmitter<any>();

  addNewItem(data: any) {
    this.newItemEvent.emit(data);
  }

  httpClient = inject(HttpClient);
  name = "";
  public data: Array<any> = [];
  create() {
    this.httpClient.post('http://localhost:3000/entries', {name: this.name, email:"anonymous", 
      board_id: parseInt(this.board_id), is_project:0, description: ""})
      .subscribe({
        next: (data: any) => {
          this.addNewItem(data);
        }, error: (err) => console.log(err)
      });
  }
}
