import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoItemsComponent } from './no-items.component';
import { By } from '@angular/platform-browser';

describe('NoItemsComponent', () => {
  let fixture: ComponentFixture<NoItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoItemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoItemsComponent);
    fixture.detectChanges();
  });

  it('deve renderizar uma mensagem', () => {
    const messageDebugEl = fixture.debugElement.query(By.css('[data-testid="no-items-message"]'));

    const messageTextContent = messageDebugEl.nativeElement.textContent;

    expect(messageTextContent).toBe('Nenhuma tarefa encontrada');
  });

});
