import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appStatusTask]',
    standalone: true
})
export class StatusTaskDirective {              // Este directiva se encarga de poner en rojo las tareas NO completadas

    constructor(private el: ElementRef, private renderer: Renderer2) { }

    @Input() set appStatusTask(completed: boolean) {        //El decorador @Input nos sirve para recibir datos, voy a setear un método que valida el estado de la tarea
        if(!completed) {
            this.renderer.setStyle(this.el.nativeElement, 'background-color', 'red');   // El método setStyle(de Renderer2) permite agregar estilos a un elemento HTML
        } else {
            this.renderer.setStyle(this.el.nativeElement, 'background-color', '');
        }
    }
}
