import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreateBoardComponent } from './create-board/create-board.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CreateBoardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'board-frontend';
}
