import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import { PrioridadComponent } from './prioridad/prioridad.component';
import {OrdenaTareasPipe} from './OrdenaTareas.pipe';
import { FiltroDonePipe } from './filtro-done.pipe';
import {CallbackHell} from './CallbackHell';

@NgModule({
  declarations: [
    AppComponent,
    PrioridadComponent,
    OrdenaTareasPipe,
    FiltroDonePipe,
    CallbackHell
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
