import { AbstractControl, ValidationErrors } from '@angular/forms';

export function noNumbersValidator(control: AbstractControl): ValidationErrors | null {
  const hasNumber = /\d/.test(control.value);
  return hasNumber ? { hasNumber: true } : null;
}
