import {Component, OnDestroy, OnInit} from '@angular/core';
import * as uuid from 'uuid';
import {Task} from './model/task';
import {TodoService} from './todo.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnDestroy{
  title = 'Lista de';
  arriba: boolean;
  ordenar:boolean;

  model = {
    user:   "Adrian",
    items: []
  };

  private subscription: Subscription;

  constructor(private todoService:TodoService) {
    this.subscription = this.todoService.getItems().subscribe((items) => {
      this.model.items = items;
      this.ordenaTareas();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Sort
   */

  ordenaTareas(arriba: boolean = true){
    this.model.items = this.model.items.sort( (a, b) => {
      if(a.action.toLocaleLowerCase() < b.action.toLocaleLowerCase()) {
        if (arriba) {
          return -1;
        } else {
          return 1
        }
      }
      else if (a.action.toLocaleLowerCase() > b.action.toLocaleLowerCase()){
        if (arriba) {
          return 1;
        } else {
          return -1
        }
      }
      else return 0
    });
    this.ordenar = true;
    this.arriba = arriba;
  }

  ordenaTareasPrioridad(arriba: boolean = true){
    if (arriba) {
      this.model.items = this.model.items.sort( (a, b) => (b.prioridad - a.prioridad));
    } else {
      this.model.items = this.model.items.sort( (a, b) => (a.prioridad - b.prioridad));
    }
    this.ordenar = false;
    this.arriba = arriba;
  }

  /**
   * Add / Remove / Complete
   */

  addItem (action){
    this.model.items.push({action: action.value, done: false, id: uuid.v4(), prioridad: 0});
    if(this.ordenar){
      this.ordenaTareas(this.arriba);
    }else {
      this.ordenaTareasPrioridad(this.arriba);
    }
  }

  eliminarTarea(id: number) {
    this.model.items = this.model.items.filter( item => {
      return item.id != id;
    })
  }

  TareasIncompletas(){
    let count=0;
    if(this.model.items)
      this.model.items.forEach((item )=>!item.done? count ++:true);
    return count;
  }

  nuevaPrioridad($event: any, id: number) {
    const index = this.model.items.findIndex(item => item.id == id, id)
    this.model.items[index].prioridad = $event;
    if(!this.arriba){
      this.ordenaTareasPrioridad(this.arriba);
    }
  }
}
