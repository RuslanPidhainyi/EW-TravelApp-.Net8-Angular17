import { NgIf } from '@angular/common';
import { Component, input, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-textarea-post',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './text-textarea-post.component.html',
  styleUrl: './text-textarea-post.component.scss',
})
export class TextTextareaPostComponent implements ControlValueAccessor {
  label = input<string>('');
  placeholder = input<string>('');
  rows = input<number>();

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
