import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { By } from '@angular/platform-browser';
import { LogoutComponent } from './logout/logout.component';
import { MockComponent } from 'ng-mocks';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HeaderComponent],
    });

    await TestBed.compileComponents();

    TestBed.overrideComponent(HeaderComponent, {
      remove: {
        imports: [LogoutComponent],
      },
      add: {
        imports: [MockComponent(LogoutComponent)],
      },
    });

    fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
  });

  it('deve renderizar o título corretamente', () => {
    const h1DebugEl = fixture.debugElement.query(By.css('h1'));
    expect(h1DebugEl.nativeElement.textContent).toBe('Gerenciador de Tarefas');
  });

  it('deve renderizar o componente de logout', () => {
    expect(fixture.debugElement.query(By.css('app-logout'))).toBeTruthy();
  });
});
