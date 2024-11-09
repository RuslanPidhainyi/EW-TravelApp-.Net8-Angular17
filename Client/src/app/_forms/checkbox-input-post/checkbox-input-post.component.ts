import { NgIf } from '@angular/common';
import { Component, input, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkbox-input-post',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './checkbox-input-post.component.html',
  styleUrl: './checkbox-input-post.component.scss',
})
export class CheckboxInputPostComponent implements ControlValueAccessor {
  label = input<string>('');
  type = input<string>('checkbox'); //type = <boolean>(false); //type = input<boolean>('checkbox');
  placeholder = input<string>('');

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
