import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Todo List';
  arriba: boolean;
  ordenar:boolean;
  model = {
    user: "Adrian",
    items: [
      {id: "aa", action:"Estudiar daw", done: false, prioridad : 3} ,
      {id: "ab", action:"Ver la tv", done: true, prioridad : 2} ,
      {id: "ac", action:"Entrenar", done: false, prioridad : 6} ,
      {id: "ad", action:"Cocinar", done: false, prioridad : 1},
    ]
  };

  mostrarTodas=true;

  constructor(){
    this.ordenaTareas();
  }


  TareasIncompletas(){
    let count=0;
    if(this.model.items)
        this.model.items.forEach((item )=>!item.done? count ++:true);
    return count;
  }

  eliminarTarea(id: string) {
    this.model.items = this.model.items.filter( item => {
      return item.id != id;
    })
  }

  addItem (action){
    let nuevoId=Math.random().toString(36).substr(2,10);
    this.model.items.push({action: action.value, done: false, prioridad : 1, id: nuevoId});
    this.ordenaTareas();

  }

  nuevaPrioridad($event: any,id) {
    //console.log(i);
    let i= this.model.items.findIndex((item:any)=>item.id==id, id);
    this.model.items[i].prioridad=$event;
  }

  ordenaTareas(arriba: boolean = true){
    this.model.items = this.model.items.sort( (a, b) => {
      if(a.action.toLocaleLowerCase() < b.action.toLocaleLowerCase() && arriba) return -1;
      if(a.action.toLocaleLowerCase() < b.action.toLocaleLowerCase() && !arriba) return 1;

      if (a.action.toLocaleLowerCase() > b.action.toLocaleLowerCase() && arriba) return 1;
      if (a.action.toLocaleLowerCase() > b.action.toLocaleLowerCase() && !arriba) return -1;
      else return 0
    });
    this.arriba = arriba;
    this.ordenar = true;
    //console.log(this.model.items);
  }

  ordenaTareasPrioridad(ascendent: boolean = true){
    if (ascendent) {
      this.model.items = this.model.items.sort( (a, b) => (b.prioridad - a.prioridad));
    }
    if(!ascendent){
      this.model.items = this.model.items.sort( (a, b) => (a.prioridad - b.prioridad));
    }
    this.arriba = ascendent;
    this.ordenar = false;
  }

}
