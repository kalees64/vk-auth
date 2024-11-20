import {
  Directive,
  Input,
  Renderer2,
  ElementRef,
  HostListener,
  OnInit,
} from '@angular/core';
import { AuthService } from './auth.service';

@Directive({
  selector: '[disableLinkIfNoRole]',
  standalone: true,
})
export class DisableLinkIfNoRoleDirective implements OnInit {
  @Input('disableLinkIfNoRole') roles: string[] = [];

  private hasAccess = false;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const userRoles = this.authService.getRoles();
    this.hasAccess = this.roles.some((role) => userRoles.includes(role));

    if (!this.hasAccess) {
      this.renderer.addClass(this.el.nativeElement, 'disabled-link');
      this.renderer.setStyle(this.el.nativeElement, 'pointer-events', 'none');
      this.renderer.setStyle(this.el.nativeElement, 'opacity', '0.6');
    }
  }

  @HostListener('click', ['$event'])
  handleClick(event: Event) {
    if (!this.hasAccess) {
      event.preventDefault();
    }
  }
}
