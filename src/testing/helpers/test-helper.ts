import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

export class TestHelper<T> {
  constructor(private fixture: ComponentFixture<T>) {}

  getTextContentByTestId(testId: string) {
    return this.queryByTestId(testId).nativeElement.textContent.trim();
  }

  click(testId: string, debugElement = this.fixture.debugElement) {
    this.queryByTestId(testId, debugElement).nativeElement.click();
  }

  getInputValue(testId: string) {
    return this.queryByTestId(testId).nativeElement.value;
  }

  isCheckboxChecked(testId: string) {
    return this.queryByTestId(testId).nativeElement.checked;
  }

  triggerInputEvent(testId: string, value: string) {
    this.queryByTestId(testId).triggerEventHandler('input', {
      target: {
        value,
      },
    });
  }

  changeCheckbox(testId: string, value: boolean) {
    this.queryByTestId(testId).triggerEventHandler('change', {
      target: {
        checked: value,
      },
    });
  }

  submitForm(testId: string) {
    this.queryByTestId(testId).triggerEventHandler('submit', null);
  }

  queryByTestId(testId: string, debugElement = this.fixture.debugElement) {
    return debugElement.query(By.css(`[data-testid="${testId}"]`));
  }

  queryAllByTestId(testId: string, debugElement = this.fixture.debugElement) {
    return debugElement.queryAll(By.css(`[data-testid="${testId}"]`));
  }
}
