import { NgIf } from '@angular/common';
import { Component, input, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-number-input-post',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './number-input-post.component.html',
  styleUrl: './number-input-post.component.scss',
})
export class NumberInputPostComponent implements ControlValueAccessor {
  label = input<string>('');
  // placeholder = input<string>('');
  type = input<string>('number'); //type = input<number>('number');

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }

  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}

  get control(): FormControl {
    return this.ngControl.control as FormControl;
  }
}