import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-prioridad',
  template: `
    <div class="prioridad m-0 p-0 mx-auto font-weight-light text-center">
      <i class="oi oi-chevron-top"
         [class.resaltada]="prioridad<10"
         [class.fueralimites]="prioridad >9"
         (click)="voto(1)"></i>
      <span class="align-middle">{{prioridad}}</span>
      <i class="oi oi-chevron-bottom"
         [ngClass]="{'resaltada':prioridad>0, 'fueralimites':prioridad<1}"
         (click)="voto(-1)"></i>
    </div>
  `,
  styleUrls:['prioridad.component.scss']

})
export class PrioridadComponent {
  @Input() prioridad=0;
  @Output() nuevaPrioridad = new EventEmitter();

  voto(number: number) {
    this.prioridad+=number;
    this.nuevaPrioridad.emit(this.prioridad);
  }
}
