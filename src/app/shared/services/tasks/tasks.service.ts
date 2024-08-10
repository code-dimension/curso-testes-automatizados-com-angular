import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from '../../interfaces/task.interface';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  getAll(): Observable<Task[]> {
    return of([
      { title: 'Item 1', completed: false },
      { title: 'Item 2', completed: false },
      { title: 'Item 3', completed: false },
      { title: 'Item 4', completed: true },
      { title: 'Item 5', completed: true },
      { title: 'Item 6', completed: true },
    ]);
  }
}
