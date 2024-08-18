import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListItemComponent } from './list-item.component';
import { By } from '@angular/platform-browser';
import { Task } from 'src/app/shared/interfaces/task.interface';
import { TestHelper } from "@testing/helpers/test-helper";

describe('ListItemComponent', () => {
  let fixture: ComponentFixture<ListItemComponent>;
  let testHelper: TestHelper<ListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListItemComponent);
    testHelper = new TestHelper(fixture);
  });
  
  it('deve renderizar o título da tarefa', () => {
    const fakeTask: Task = {
      title: 'Nome da Tarefa',
      completed: false
    }

    fixture.componentRef.setInput('task', fakeTask);

    fixture.detectChanges();
    
    const text = testHelper.getTextContentByTestId('list-item-task-title');

    expect(text).toBe(fakeTask.title);
  });
});
