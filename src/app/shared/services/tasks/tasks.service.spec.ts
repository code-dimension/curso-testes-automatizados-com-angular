import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { TasksService } from './tasks.service';
import { Task } from '../../interfaces/task.interface';

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TasksService);
  });

  it('getAll() deve retornar uma lista de tarefas', fakeAsync(() => {
    let result: Task[] | null = null;

    service.getAll().subscribe((tasks) => {
      result = tasks;
    });

    tick();

    expect(result).toEqual([
      { title: 'Item 1', completed: false },
      { title: 'Item 2', completed: false },
      { title: 'Item 3', completed: false },
      { title: 'Item 4', completed: true },
      { title: 'Item 5', completed: true },
      { title: 'Item 6', completed: true },
    ]);
  }));
});
