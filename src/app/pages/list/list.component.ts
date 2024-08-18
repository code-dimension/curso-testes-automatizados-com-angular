import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from 'src/app/shared/interfaces/task.interface';
import { TasksService } from 'src/app/shared/services/tasks/tasks.service';
import { NoItemsComponent } from './no-items/no-items.component';
import { ListItemComponent } from './list-item/list-item.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, NoItemsComponent, ListItemComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {

  tasksService = inject(TasksService);

  tasks = signal<Task[]>([]);

  completedTasks = computed(() => this.tasks().filter(task => task.completed))
  
  pendingTasks = computed(() => this.tasks().filter(task => !task.completed))

  ngOnInit() {
    this.tasksService.getAll().subscribe(tasks => this.tasks.set(tasks));
  }

}
