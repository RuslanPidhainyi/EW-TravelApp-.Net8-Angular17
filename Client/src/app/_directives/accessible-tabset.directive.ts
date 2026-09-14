import { AfterViewChecked, Directive, ElementRef, inject } from '@angular/core';

// ngx-bootstrap's tabset renders <ul role="tablist"><li><a role="tab">, so the <li> sits between
// the tablist and its tabs. role="presentation" restores the tablist > tab structure for screen readers.
@Directive({
  selector: 'tabset',
  standalone: true,
})
export class AccessibleTabsetDirective implements AfterViewChecked {
  private host = inject<ElementRef<HTMLElement>>(ElementRef);

  ngAfterViewChecked(): void {
    this.host.nativeElement
      .querySelectorAll('[role="tablist"] > li:not([role])')
      .forEach((item) => item.setAttribute('role', 'presentation'));
  }
}
