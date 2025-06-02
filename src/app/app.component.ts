import { Component, OnInit } from '@angular/core'; // Importamos OnInit
import { CommonModule } from '@angular/common'; // Necesario para directivas como *ngIf y *ngFor
import { FormsModule } from '@angular/forms'; // <-- Importa FormsModule aquí
import { TodoService } from './todo.service'; // Asegúrate de que esta ruta sea correcta (sin carpeta 'todo' si no existe)
import { TodoItem } from './registro.interface'; // Importa la interfaz TodoItem
import { Observable } from 'rxjs'; // Importa Observable de RxJS para manejar el flujo de datos

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true, // Indica que es un componente standalone
  imports: [CommonModule, FormsModule] // <-- Añade CommonModule y FormsModule aquí
})
export class AppComponent implements OnInit { // Implementamos OnInit
  title = 'mi-app-registros'; // Este título lo puedes dejar o eliminar
  nuevaTareaDescripcion: string = ''; // Propiedad para el ngModel del input
  todos!: Observable<TodoItem[]>; // Un observable para la lista de tareas

  constructor(private todoService: TodoService) { // Inyectamos el TodoService
    // El constructor es el lugar para inyectar dependencias
  }

  ngOnInit(): void {
    // En ngOnInit, nos suscribimos al observable de tareas del servicio
    this.todos = this.todoService.todos$;
  }

  addTodo(): void {
    if (this.nuevaTareaDescripcion.trim()) { // Si la descripción no está vacía o solo espacios
      this.todoService.addTodo(this.nuevaTareaDescripcion.trim());
      this.nuevaTareaDescripcion = ''; // Limpiamos el input después de añadir
    }
  }

  toggleCompleted(id: string): void {
    this.todoService.toggleCompleted(id);
  }

  deleteTodo(id: string): void {
    this.todoService.deleteTodo(id);
  }

  clearAllTodos(): void {
    const confirmClear = confirm('¿Estás seguro de que quieres limpiar todas las tareas?');
    if (confirmClear) {
      this.todoService.clearAllTodos();
    }
  }
}