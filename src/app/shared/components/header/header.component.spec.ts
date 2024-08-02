import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HeaderComponent],
    })

    await TestBed.compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
  });

  it('deve renderizar o título corretamente', () => {
   const h1DebugEl = fixture.debugElement.query(By.css('h1'));
   expect(h1DebugEl.nativeElement.textContent).toBe('Gerenciador de Tarefas');
  });
});
