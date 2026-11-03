import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable, interval, Subscription, of, from, map, tap, take } from 'rxjs';
@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  ngOnInit() {
    from([1, 2, 12, 13, 14, 0, 15])
      .pipe(
        tap((ele) => console.log(ele)),
        map((ele: number) => {
          if (ele === 0) {
            throw new Error('zero erreur');
          }
          return ele * 2;
        }),
        map((ele: number) => ele - 2),
        take(2),
      )
      .subscribe(
        (item: number) => console.log(`ma valeur ${item}`),
        (error: unknown) => console.error(error),
        () => console.log('Terminé'),
      );

    // of(2, 4, 6)
    //   .pipe(
    //     tap((elem) => console.log(elem)),
    //     map((elem) => elem * 2),
    //     take(2),
    //     map((elem) => elem - 3),
    //     tap((elem) => console.log(elem)),
    //   )
    //   .subscribe(console.log);
  }

  public start(): void {
    this.subscription.add(
      interval(1000).subscribe(
        (value) => console.log('ma valeur: ', value),
        (error) => console.error(error),
        () => console.log('terminé'),
      ),
    );

    this.subscription.add(
      interval(1000).subscribe(
        (value) => console.warn('=== ma valeur: === ', value),
        (error) => console.error(error),
        () => console.log('=== terminé ==='),
      ),
    );
  }

  public stop(): void {
    this.subscription.unsubscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe(); // tres important pour eviter des fuite de memoir
  }
}
