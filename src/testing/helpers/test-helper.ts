import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

export class TestHelper<T> {
  constructor(private fixture: ComponentFixture<T>) {}
  
  getTextContentByTestId(testId: string) {
    return this.queryByTestId(testId).nativeElement.textContent.trim();
  }
  
  click(testId: string) {
    this.queryByTestId(testId).nativeElement.click();
  }
  
  queryByTestId(testId: string) {
    return this.fixture.debugElement.query(By.css(`[data-testid="${testId}"]`));
  }
}
