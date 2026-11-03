import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';

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

    const stream = new Observable((myObserver) => {
      myObserver.next('Boite 1');
      myObserver.error(new Error());
      myObserver.next('Boite 2');
      myObserver.complete();
      myObserver.next('Boite 3');
    });

    console.log('first way to subscribe to an observable');
    stream.subscribe(observer);

    console.log('Second way to subscribe to an observable.');
    const subscription = stream.subscribe(
      item => console.log(`Une boite arrive ${item}`),
      error => console.log(`Oups il y a une erreur ${error}`),
      ()=>console.log('terminé ... plus rien')
    );
  }
}
