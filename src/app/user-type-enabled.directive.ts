import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appUserTypeEnabled]'
})
export class UserTypeEnabledDirective {
 user:any
  @Input() appUserTypeEnabled: any[] | undefined;

  constructor( private el: ElementRef) { }

  ngOnInit(): void {
   this.user= localStorage.getItem('userType');
    if (this.user == 1) {
      this.el.nativeElement.style.display = 'none';
    }
  }

}
