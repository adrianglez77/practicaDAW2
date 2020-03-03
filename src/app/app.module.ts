import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import { PrioridadComponent } from './prioridad/prioridad.component';
import { FiltroDonePipe } from './filtro-done.pipe';
import { CallbackHellComponent } from './callback-hell/callback-hell.component';
import { PhotoFlickComponent } from './photo-flick/photo-flick.component';
import { ReactiveComponent } from './reactive/reactive.component';
import {TodoService} from './todo.service';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    PrioridadComponent,
    FiltroDonePipe,
    CallbackHellComponent,
    PhotoFlickComponent,
    ReactiveComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    TodoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
