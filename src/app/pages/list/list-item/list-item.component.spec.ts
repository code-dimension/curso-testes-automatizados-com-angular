import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListItemComponent } from './list-item.component';
import { By } from '@angular/platform-browser';
import { Task } from 'src/app/shared/interfaces/task.interface';
import { TestHelper } from '@testing/helpers/test-helper';
import { Component } from '@angular/core';

async function setup(fakeTask: Task) {
  @Component({
    standalone: true,
    imports: [ListItemComponent],
    template: `<app-list-item
      [task]="task"
      (complete)="onCompleteTask($event)"
      (notComplete)="onNotComplete($event)"
    ></app-list-item>`,
  })
  class HostComponent {
    task = fakeTask;

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onCompleteTask() {}

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onNotComplete() {}
  }

  await TestBed.configureTestingModule({
    imports: [HostComponent],
  }).compileComponents();

  const fixture = TestBed.createComponent(HostComponent);
  const testHelper = new TestHelper(fixture);

  return { fixture, testHelper };
}

describe('ListItemComponent', () => {
  it('deve renderizar o título da tarefa', async () => {
    const fakeTask: Task = {
      id: '1',
      title: 'Nome da Tarefa',
      completed: false,
    };

    const { fixture, testHelper } = await setup(fakeTask);

    fixture.detectChanges();

    const text = testHelper.getTextContentByTestId('list-item-task-title');

    expect(text).toBe(fakeTask.title);
  });

  describe('quando a tarefa não estiver concluída', () => {
    it('deve renderizar o botão de concluir tarefa', async () => {
      const fakeTask: Task = {
        id: '1',
        title: 'Nome da Tarefa',
        completed: false,
      };

      const { fixture, testHelper } = await setup(fakeTask);

      fixture.detectChanges();

      const completeBtnDebugEl = testHelper.queryByTestId(
        'list-item-complete-action'
      );

      expect(completeBtnDebugEl).toBeTruthy();

      const markAsPendingBtnDebugEl = testHelper.queryByTestId(
        'list-item-mark-as-pending-action'
      );

      expect(markAsPendingBtnDebugEl).toBeNull();
    });

    it('deve emitir um evento ao concluir a tarefa', async () => {
      const fakeTask: Task = {
        id: '1',
        title: 'Nome da Tarefa',
        completed: false,
      };

      const { fixture, testHelper } = await setup(fakeTask);

      const onCompleteTaskSpy = jest.spyOn(
        fixture.componentInstance,
        'onCompleteTask'
      );

      fixture.detectChanges();

      const completeBtnDebugEl = testHelper.queryByTestId(
        'list-item-complete-action'
      );

      completeBtnDebugEl.triggerEventHandler('click', null);

      expect(onCompleteTaskSpy).toHaveBeenCalled();
    });
  });

  describe('quando a tarefa estiver concluída', () => {
    it('deve renderizar o botão que marca a tarefa como pendente', async () => {
      const fakeTask: Task = {
        id: '1',
        title: 'Nome da Tarefa',
        completed: true,
      };

      const { fixture, testHelper } = await setup(fakeTask);

      fixture.detectChanges();

      const completeBtnDebugEl = testHelper.queryByTestId(
        'list-item-complete-action'
      );

      expect(completeBtnDebugEl).toBeNull();

      const markAsPendingBtnDebugEl = testHelper.queryByTestId(
        'list-item-mark-as-pending-action'
      );

      expect(markAsPendingBtnDebugEl).toBeTruthy();
    });

    it('deve emitir um evento que marque a tarefa como pendente', async () => {
      const fakeTask: Task = {
        id: '1',
        title: 'Nome da Tarefa',
        completed: true,
      };

      const { fixture, testHelper } = await setup(fakeTask);

      const onNotCompleteSpy = jest.spyOn(
        fixture.componentInstance,
        'onNotComplete'
      );

      fixture.detectChanges();

      const markAsPendingBtnDebugEl = testHelper.queryByTestId(
        'list-item-mark-as-pending-action'
      );

      markAsPendingBtnDebugEl.triggerEventHandler('click', null);

      expect(onNotCompleteSpy).toHaveBeenCalled();
    });
  });
});
