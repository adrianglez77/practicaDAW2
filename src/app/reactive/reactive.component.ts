import {Component, OnDestroy, OnInit} from '@angular/core';
import {fromEvent, Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map, switchMap} from 'rxjs/operators';
import {fromPromise} from 'rxjs/internal-compatibility';
declare var $ :any;

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.scss']
})

export class ReactiveComponent implements OnInit, OnDestroy {
  items:any;
  private keyups: any;
  private flickApi: string;
  private subscription: Subscription;

  constructor() {
    this.flickApi = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?"
  }

  ngOnInit() {
    this.keyups = fromEvent( $('#search'), 'keyup' ).pipe(
      map( (e:any) => e.target.value ),
      filter((data:string) => data.length > 3),
      debounceTime(400),
      distinctUntilChanged(), //Mientras el texto no cambie, no pasa nada.
      switchMap((data:string) => {
         return fromPromise($.getJSON(this.flickApi,{ tags: data, tagmode: "all", format: "json" }));
      })
    );


    this.subscription = this.keyups.subscribe(
      (data:any) => { //When we received the data
          this.items=data.items;
          console.log(data);
        },
        (error:any) => { //Error
          console.log("Error");
        }, () => {  // Task finished
          console.log("Completado");
        }
      );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
