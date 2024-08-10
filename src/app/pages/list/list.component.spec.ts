import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListComponent } from './list.component';
import { By } from '@angular/platform-browser';
import { TasksService } from 'src/app/shared/services/tasks/tasks.service';
import { of } from 'rxjs';

class FakeTasksService implements TasksService {
  getAll = jest.fn();
}

describe('ListComponent', () => {
  let fixture: ComponentFixture<ListComponent>;
  let tasksService: TasksService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [ListComponent],
      providers: [
        {
          provide: TasksService,
          useClass: FakeTasksService
        }
      ]
    })

    await TestBed.compileComponents();

    tasksService = TestBed.inject(TasksService);
  });

  it('deve listar as tarefas', () => {
    (tasksService.getAll as jest.Mock).mockReturnValue(of([
      { title: 'Item 1', completed: false },
      { title: 'Item 2', completed: false },
      { title: 'Item 3', completed: false },
      { title: 'Item 4', completed: true },
      { title: 'Item 5', completed: true },
      { title: 'Item 6', completed: true },
    ]))

    fixture = TestBed.createComponent(ListComponent);
    fixture.detectChanges();
    
    const todoSection = fixture.debugElement.query(By.css('[data-testid="todo-list"]'));

    expect(todoSection).toBeTruthy();

    const todoItems = todoSection.queryAll(By.css('[data-testid="todo-list-item"]'))

    expect(todoItems.length).toBe(3);

    const completedSection = fixture.debugElement.query(By.css('[data-testid="completed-list"]'));

    expect(completedSection).toBeTruthy();

    const completedItems = completedSection.queryAll(By.css('[data-testid="completed-list-item"]'))

    expect(completedItems.length).toBe(3);
  });
});
