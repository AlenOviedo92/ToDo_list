import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appStatusTask]',
    standalone: true
})
export class StatusTaskDirective {                                                          // Este directiva se encarga de poner en rojo las tareas NO completadas

    constructor(private el: ElementRef, private renderer: Renderer2) {}

    @Input() set appStatusTask(completed: boolean) {
        if(!completed) {
            this.renderer.setStyle(this.el.nativeElement, 'background-color', '#ffbd00');   // El método setStyle(de Renderer2) permite agregar estilos a un elemento HTML
            this.renderer.setStyle(this.el.nativeElement, 'border-radius', '3px');
        } else {
            this.renderer.setStyle(this.el.nativeElement, 'background-color', '');
            this.renderer.setStyle(this.el.nativeElement, 'border-radius', '');
        }
    }
}
