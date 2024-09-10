import { ResolveFn } from '@angular/router';
import { Task } from '../../interfaces/task.interface';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { TasksService } from '../../services/tasks/tasks.service';

export const getTaskByIdResolver: ResolveFn<Observable<Task>> = (route, state) => {
  const tasksService = inject(TasksService);
  
  const id = route.params['id'];

  const observable = tasksService.getById(id);

  return observable;
};
