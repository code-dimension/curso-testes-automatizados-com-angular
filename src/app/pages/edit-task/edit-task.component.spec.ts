import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditTaskComponent } from './edit-task.component';
import { Task, TaskWithoutId } from 'src/app/shared/interfaces/task.interface';
import { TestHelper } from '@testing/helpers/test-helper';
import { MockProvider, MockProviders } from 'ng-mocks';
import { TasksService } from 'src/app/shared/services/tasks/tasks.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('EditTaskComponent', () => {
  let fixture: ComponentFixture<EditTaskComponent>;
  let testHelper: TestHelper<EditTaskComponent>;
  let tasksService: TasksService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [MockProviders(TasksService, Router)],
      imports: [EditTaskComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditTaskComponent);
    testHelper = new TestHelper(fixture);

    tasksService = TestBed.inject(TasksService);
    router = TestBed.inject(Router);
  });

  it('deve editar uma tarefa', () => {
    const fakeTask: Task = {
      id: '1',
      title: 'Tarefa',
      completed: false,
    };

    fixture.componentRef.setInput('task', fakeTask);

    fixture.detectChanges();

    const titleInputValue = testHelper.getInputValue('edit-task-title');
    expect(titleInputValue).toBe(fakeTask.title);

    const isCompletedCheckboxChecked = testHelper.isCheckboxChecked(
      'edit-task-completed'
    );
    expect(isCompletedCheckboxChecked).toBe(fakeTask.completed);

    const fakeEditedTask: TaskWithoutId = {
      title: 'Tarefa - editada',
      completed: true,
    };

    testHelper.triggerInputEvent('edit-task-title', fakeEditedTask.title);
    testHelper.changeCheckbox('edit-task-completed', fakeEditedTask.completed);

    fixture.detectChanges();

    const fakeEditedTaskResponse = {
      ...fakeTask,
      ...fakeEditedTask,
    };

    (tasksService.put as jest.Mock).mockReturnValue(of(fakeEditedTaskResponse));

    testHelper.submitForm('edit-task-form');

    expect(tasksService.put).toHaveBeenCalledWith(fakeTask.id, fakeEditedTask);

    expect(router.navigateByUrl).toHaveBeenCalledWith('/');
  });
});
