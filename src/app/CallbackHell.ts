import {Component} from '@angular/core';
declare var $:any;

@Component({
  selector: 'callback-hell',
  template:`
    <input type="text" placeholder="search ..." class="form-control"
           (keyup)="tecla($event)"
    >
  `
})
export class CallbackHell{
  private text:string='';
  t:any;
  flickerApi="https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
  debounce(){
    if (this.t) window.clearTimeout(this.t);
    this.t=window.setTimeout(()=>{this.liveSearch();},1000)
  }

  tecla($event: any) {
    this.text= $event.target.value;
    if (this.text.length<4) return;
    this.debounce();
  }

  liveSearch(){
    console.log(this.text);
    $.getJSON(this.flickerApi,{
      tags: this.text,
      tagmode: "all",
      format: "json"
    }, this.respuesta)
  }
  respuesta(datos){
    console.log(datos);
  }
}
