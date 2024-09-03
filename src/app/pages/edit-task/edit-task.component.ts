import { Component, effect, inject, input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Task, TaskWithoutId } from 'src/app/shared/interfaces/task.interface';
import { TasksService } from 'src/app/shared/services/tasks/tasks.service';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.scss',
})
export class EditTaskComponent {
  task = input<Task>();

  tasksService = inject(TasksService);
  router = inject(Router);

  form = new FormGroup({
    title: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    completed: new FormControl<boolean>(false, { nonNullable: true }),
  });

  effectRef = effect(() => {
    const task = this.task() as Task;

    this.form.setValue({
      title: task.title,
      completed: task.completed,
    });
  });

  onSubmit() {
    const payload: TaskWithoutId = {
      title: this.form.value.title as string,
      completed: this.form.value.completed as boolean,
    };

    const task = this.task() as Task;

    this.tasksService.put(task.id, payload).subscribe(() => {
      this.router.navigateByUrl('/');
    });
  }
}
