import { TestBed } from '@angular/core/testing';
import { ButtonDirective, ButtonXsDirective } from './button.directive';
import { Component, Type } from '@angular/core';
import { TestHelper } from '@testing/helpers/test-helper';

function createComponent(template: string, directive: Type<unknown>) {
  @Component({
    standalone: true,
    imports: [directive],
    template,
  })
  class HostComponent {}

  const fixture = TestBed.createComponent(HostComponent);
  const testHelper = new TestHelper(fixture);

  fixture.detectChanges();

  return {
    fixture,
    testHelper,
  };
}

describe('ButtonDirective', () => {
  function createComponentWithButtonDirective(template: string) {
    return createComponent(template, ButtonDirective);
  }

  it('deve aplicar as classes css corretamente', () => {
    const { testHelper } = createComponentWithButtonDirective(`
      <button appButton="primary" data-testid="primary"></button>
      <button appButton="secondary" data-testid="secondary"></button>
      <button appButton="accent" data-testid="accent"></button>
      <button appButton="ghost" data-testid="ghost"></button>
      <button appButton="link" data-testid="link"></button>
      <button appButton="neutral" data-testid="neutral"></button>
      <button appButton="error" data-testid="error"></button>
    `);

    expect(testHelper.queryByTestId('primary').nativeElement.className).toBe(
      'btn btn-primary'
    );
    expect(testHelper.queryByTestId('secondary').nativeElement.className).toBe(
      'btn btn-secondary'
    );
    expect(testHelper.queryByTestId('accent').nativeElement.className).toBe(
      'btn btn-accent'
    );
    expect(testHelper.queryByTestId('ghost').nativeElement.className).toBe(
      'btn btn-ghost'
    );
    expect(testHelper.queryByTestId('link').nativeElement.className).toBe(
      'btn btn-link'
    );
    expect(testHelper.queryByTestId('neutral').nativeElement.className).toBe(
      'btn btn-neutral'
    );
    expect(testHelper.queryByTestId('error').nativeElement.className).toBe(
      'btn btn-error'
    );
  });

  it('deve aplicar apenas a classe "btn" quando a cor for inválida', () => {
    const { testHelper } = createComponentWithButtonDirective(`
      <button appButton="wrong-color" data-testid="wrong-color"></button>
    `);

    expect(
      testHelper.queryByTestId('wrong-color').nativeElement.className
    ).toBe('btn');
  });
});

describe('ButtonXsDirective', () => {
  function createComponentWithButtonXsDirective(template: string) {
    return createComponent(template, ButtonXsDirective);
  }

  it('deve adicionar a classe "btn-xs" e as outras classes de cores corretamente', () => {
    const { testHelper } = createComponentWithButtonXsDirective(`
      <button appButtonXs="primary" data-testid="primary"></button>
      <button appButtonXs="secondary" data-testid="secondary"></button>
      <button appButtonXs="accent" data-testid="accent"></button>
      <button appButtonXs="ghost" data-testid="ghost"></button>
      <button appButtonXs="link" data-testid="link"></button>
      <button appButtonXs="neutral" data-testid="neutral"></button>
      <button appButtonXs="error" data-testid="error"></button>
    `);

    expect(testHelper.queryByTestId('primary').nativeElement.className).toBe(
      'btn btn-xs btn-primary'
    );
    expect(testHelper.queryByTestId('secondary').nativeElement.className).toBe(
      'btn btn-xs btn-secondary'
    );
    expect(testHelper.queryByTestId('accent').nativeElement.className).toBe(
      'btn btn-xs btn-accent'
    );
    expect(testHelper.queryByTestId('ghost').nativeElement.className).toBe(
      'btn btn-xs btn-ghost'
    );
    expect(testHelper.queryByTestId('link').nativeElement.className).toBe(
      'btn btn-xs btn-link'
    );
    expect(testHelper.queryByTestId('neutral').nativeElement.className).toBe(
      'btn btn-xs btn-neutral'
    );

    expect(testHelper.queryByTestId('error').nativeElement.className).toBe(
      'btn btn-xs btn-error'
    );
  });

  it('deve aplicar apenas a classe "btn" e "btn-xs" quando a cor for inválida', () => {
    const { testHelper } = createComponentWithButtonXsDirective(`
      <button appButtonXs="wrong-color" data-testid="wrong-color"></button>
    `);

    expect(
      testHelper.queryByTestId('wrong-color').nativeElement.className
    ).toBe('btn btn-xs');
  });
});
