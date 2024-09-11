import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from 'src/app/shared/interfaces/task.interface';
import { ButtonXsDirective } from 'src/app/shared/directives/button/button.directive';

@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [CommonModule, ButtonXsDirective],
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.scss',
})
export class ListItemComponent {
  task = input.required<Task>();

  complete = output<Task>();

  notComplete = output<Task>();

  remove = output<Task>();

  edit = output<Task>();

  onComplete() {
    this.complete.emit(this.task());
  }

  onMarkAsPending() {
    this.notComplete.emit(this.task());
  }

  onRemove() {
    this.remove.emit(this.task());
  }

  onEdit() {
    this.edit.emit(this.task());
  }
}
