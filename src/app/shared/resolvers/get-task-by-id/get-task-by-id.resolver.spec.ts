import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  provideRouter,
  ResolveFn,
  Router,
  RouterStateSnapshot,
  withComponentInputBinding,
} from '@angular/router';

import { RouterTestingHarness } from '@angular/router/testing';

import { getTaskByIdResolver } from './get-task-by-id.resolver';
import { MockProvider } from 'ng-mocks';
import { TasksService } from '../../services/tasks/tasks.service';
import { Task } from '../../interfaces/task.interface';
import { Observable, of } from 'rxjs';
import { Component, input } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'app-test',
  template: '',
})
class FakeComponent {
  task = input();
}

describe('getTaskByIdResolver', () => {
  const executeResolver: ResolveFn<Observable<Task>> = (
    ...resolverParameters
  ) =>
    TestBed.runInInjectionContext(() =>
      getTaskByIdResolver(...resolverParameters)
    );

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockProvider(TasksService),
        provideRouter(
          [
            {
              path: 'test/:id',
              resolve: { task: getTaskByIdResolver },
              component: FakeComponent
            },
          ],
          withComponentInputBinding()
        ),
      ],
    });
  });

  it('deve retornar uma tarefa', async () => {
    const tasksService = TestBed.inject(TasksService);

    const fakeTask: Task = { id: '1', title: 'Item 1', completed: false };

    (tasksService.getById as jest.Mock).mockReturnValue(of(fakeTask));

    const harness =  await RouterTestingHarness.create(`test/${fakeTask.id}`);

    const fakeComponentDebugEl = harness.fixture.debugElement.query(By.directive(FakeComponent));

    expect(tasksService.getById).toHaveBeenCalledWith(fakeTask.id);

    expect(fakeComponentDebugEl.componentInstance.task()).toBe(fakeTask);
  });
});
