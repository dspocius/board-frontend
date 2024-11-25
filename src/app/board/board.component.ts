import { Component, inject  } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { EntriesComponent } from './../entries/entries.component';
import { CreateBoardComponent } from './../create-board/create-board.component';
import { ConfirmComponent } from './../helpers/confirm/confirm.component';
import { EditBoardComponent } from './../helpers/edit-board/edit-board.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [HttpClientModule,FormsModule,EntriesComponent,CreateBoardComponent,ConfirmComponent,EditBoardComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {
  httpClient = inject(HttpClient);
  about = "";
  public data: Array<any> = [];
  ngOnInit(): void {
    this.get();
  }
  itemCreated(item:any) {
    this.data.push(item);
  }
  get() {
    this.httpClient.get('http://localhost:3000/board')
      .subscribe({
        next: (data: any) => {
          this.data = data;
        }, error: (err) => console.log(err)
      });
  }
  
  confirmEdit(data: {id: number, name: string}) {
console.log("ASD",data)
    this.httpClient.put('http://localhost:3000/board/'+data.id, {name:data.name})
    .subscribe({
      next: (data: any) => {
        this.get();
      }, error: (err) => console.log(err)
    }); 
  }

  confirmDelete(board_id: number) {
  this.deleteBoardEntries(board_id);
   this.httpClient.delete('http://localhost:3000/board/'+board_id)
    .subscribe({
      next: (data: any) => {
        this.get();
      }, error: (err) => console.log(err)
    });
  }
  deleteBoardEntries(entry_id: number) {
    this.httpClient.delete('http://localhost:3000/entries/board/'+entry_id)
    .subscribe({
      next: (data: any) => {
        this.get();
      }, error: (err) => console.log(err)
    });
  }
}
