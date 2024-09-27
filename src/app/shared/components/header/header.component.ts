import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoutComponent } from './logout/logout.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, LogoutComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {}
