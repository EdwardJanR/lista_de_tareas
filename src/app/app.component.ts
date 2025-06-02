import { Component, OnInit } from '@angular/core'; 
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 
import { TodoService } from './todo.service'; 
import { TodoItem } from './registro.interface'; 
import { Observable } from 'rxjs'; 
import { LtareasComponent } from './l-tareas/l-tareas.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, LtareasComponent]
})
export class AppComponent implements OnInit {
  title = 'lista_de_tareas';
  nuevaTareaDescripcion: string = '';
  todos!: Observable<TodoItem[]>;

  constructor(private todoService: TodoService) {
  }

  ngOnInit(): void {
    this.todos = this.todoService.todos$;
  }

  addTodo(descripcion: string): void {
    this.todoService.addTodo(descripcion); // Llama al servicio con la descripción recibida
  }

  toggleCompleted(id: string): void {
    this.todoService.toggleCompleted(id);
  }

  deleteTodo(id: string): void {
    this.todoService.deleteTodo(id);
  }

  clearAllTodos(): void {
    const confirmClear = confirm('¿Estás seguro de que quieres borrar las tareas?');
    if (confirmClear) {
      this.todoService.clearAllTodos();
    }
  }
}