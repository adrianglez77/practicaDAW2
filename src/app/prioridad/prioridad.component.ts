import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-prioridad',
  templateUrl: './prioridad.component.html',
  styleUrls: ['./prioridad.component.scss']
})
export class PrioridadComponent implements OnInit {

  @Input() prioridad: number;
  @Output() newPrioridadEmitter = new EventEmitter();
  MAXPRIORIDAD:number = 10;
  MINPRIORIDAD:number = 0;


  constructor() {

  }

  ngOnInit() {

  }

  addPrioridad(){
    this.prioridad = Math.min(this.MAXPRIORIDAD, ++this.prioridad);
    this.newPrioridadEmitter.emit(this.prioridad);
  }

  decreasePrioridad(){
    this.prioridad = Math.max(this.MINPRIORIDAD, --this.prioridad);
    this.newPrioridadEmitter.emit(this.prioridad);
  }


}
