import { Component, inject, Input  } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CreateEntryComponent } from './../create-entry/create-entry.component';
import { ConfirmComponent } from './../helpers/confirm/confirm.component';
import { EditEntryComponent } from './../helpers/edit-entry/edit-entry.component';

@Component({
  selector: 'app-entries',
  standalone: true,
  imports: [CreateEntryComponent,ConfirmComponent,EditEntryComponent],
  templateUrl: './entries.component.html',
  styleUrl: './entries.component.scss'
})
export class EntriesComponent {
  @Input({ required: true }) board_id!: string;

  httpClient = inject(HttpClient);
  about = "";
  public entries: Array<any> = [];
  ngOnInit(): void {
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
        }, error: (err) => console.log(err)
      });
  }
  confirmEdit(data: {id: number, name: string, description: string}) {
      this.httpClient.put('http://localhost:3000/entries/'+data.id, { name: data.name, description: data.description  })
      .subscribe({
        next: (data: any) => {
          this.get();
        }, error: (err) => console.log(err)
      });
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
