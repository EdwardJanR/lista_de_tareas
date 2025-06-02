import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ltareas', // <-- ¡Importante! El selector para tu componente 'ltareas'
  templateUrl: './l-tareas.component.html',
  styleUrls: ['./l-tareas.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class LtareasComponent { // <-- ¡Importante! El nombre de la clase es LtareasComponent
  nuevaTareaDescripcion: string = '';

  @Output() tareaAgregada = new EventEmitter<string>();

  constructor() { }

  addTodo(): void {
    if (this.nuevaTareaDescripcion.trim()) {
      this.tareaAgregada.emit(this.nuevaTareaDescripcion.trim());
      this.nuevaTareaDescripcion = '';
    }
  }
}
