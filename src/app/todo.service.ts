import { Injectable } from '@angular/core';
import { TodoItem } from './registro.interface'; // Esta ruta es vital, asegúrate que es correcta.
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private readonly LOCAL_STORAGE_KEY = 'todoItems';
  private _todos: BehaviorSubject<TodoItem[]> = new BehaviorSubject<TodoItem[]>(this.loadTodos());
  public todos$: Observable<TodoItem[]> = this._todos.asObservable();

  constructor() { }

  private loadTodos(): TodoItem[] {
    const storedTodos = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    if (storedTodos) {
      return JSON.parse(storedTodos).map((item: TodoItem) => ({
        ...item,
        fechaCreacion: new Date(item.fechaCreacion)
      }));
    }
    return [];
  }

  private saveTodos(): void {
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(this._todos.value));
  }

  addTodo(descripcion: string): void {
    const currentTodos = this._todos.value;
    const newTodo: TodoItem = {
      id: Date.now().toString(),
      descripcion: descripcion,
      completada: false,
      fechaCreacion: new Date()
    };
    const updatedTodos = [...currentTodos, newTodo];
    this._todos.next(updatedTodos);
    this.saveTodos();
  }

  toggleCompleted(id: string): void {
    const currentTodos = this._todos.value;
    const updatedTodos = currentTodos.map(todo =>
      todo.id === id ? { ...todo, completada: !todo.completada } : todo
    );
    this._todos.next(updatedTodos);
    this.saveTodos();
  }

  deleteTodo(id: string): void {
    const currentTodos = this._todos.value;
    const updatedTodos = currentTodos.filter(todo => todo.id !== id);
    this._todos.next(updatedTodos);
    this.saveTodos();
  }

  clearAllTodos(): void {
    localStorage.removeItem(this.LOCAL_STORAGE_KEY);
    this._todos.next([]);
  }
}