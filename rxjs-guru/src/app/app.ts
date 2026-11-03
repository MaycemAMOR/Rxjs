import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable, interval, Subscription } from 'rxjs';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit {
  private subscription: Subscription[] = [];

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
      (item) => console.log(`Une boite arrive ${item}`),
      (error) => console.log(`Oups il y a une erreur ${error}`),
      () => console.log('terminé ... plus rien'),
    );
    subscription.unsubscribe();
  }

  public start(): void {
    this.subscription.push(
      interval(1000).subscribe(
        (value) => console.log('ma valeur: ', value),
        (error) => console.error(error),
        () => console.log('terminé'),
      ),
    );

    this.subscription.push(
      interval(1000).subscribe(
        (value) => console.warn('=== ma valeur: === ', value),
        (error) => console.error(error),
        () => console.log('=== terminé ==='),
      ),
    );
  }

  public stop(): void {
    this.subscription.forEach(elem=>{
      elem.unsubscribe();
    });
  }
}
