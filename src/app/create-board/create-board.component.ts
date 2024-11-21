import { Component, inject, Output, EventEmitter  } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'create-board',
  standalone: true,
  imports: [HttpClientModule,FormsModule],
  templateUrl: './create-board.component.html',
  styleUrl: './create-board.component.scss'
})
export class CreateBoardComponent {
  @Output() newItemEvent = new EventEmitter<any>();

  boardCreated(data: any) {
    this.newItemEvent.emit(data);
  }
  httpClient = inject(HttpClient);
  about = "";
  public data: Array<any> = [];
  create() {
    this.httpClient.post('http://localhost:3000/board', {name: this.about})
      .subscribe({
        next: (data: any) => {
          this.boardCreated(data);
        }, error: (err) => console.log(err)
      });
  }
}
