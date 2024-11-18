import { Component, inject  } from '@angular/core';
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
  httpClient = inject(HttpClient);
  about = "";
  public data: Array<any> = [];
  create() {
    console.log("ASD",this.about);
    this.httpClient.post('http://localhost:3000/board', {name: this.about})
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.data = data;
        }, error: (err) => console.log(err)
      });
  }
}
