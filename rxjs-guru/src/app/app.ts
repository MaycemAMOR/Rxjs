import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit {
  ngOnInit() {
    const observer = {
      next: (item: unknown) => {
        console.log(`une boite arrive ${item}`);
      },
      error: (error: unknown) => {
        console.log(`oups il y a une erreur ${error}`);
      },
      complete: () => {
        console.log(`terminé ... plus rien`);
      },
    };
  }
}
