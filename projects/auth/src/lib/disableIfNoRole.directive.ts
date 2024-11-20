import { Directive, Input, Renderer2, ElementRef, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Directive({
  selector: '[disableIfNoRole]',
  standalone: true,
})
export class DisableIfNoRoleDirective implements OnInit {
  @Input('disableIfNoRole') roles: string[] = [];

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const userRoles = this.authService.getRoles();
    const hasRole = this.roles.some((role) => userRoles.includes(role));

    if (!hasRole) {
      this.disableButton();
      this.addLockIcon();
    }
  }

  private disableButton() {
    this.renderer.setAttribute(this.el.nativeElement, 'disabled', 'true');
    this.renderer.addClass(this.el.nativeElement, 'disabled'); // Optional styling
  }

  private addLockIcon() {
    const lockIcon = this.renderer.createElement('span');
    this.renderer.addClass(lockIcon, 'lock-icon');
    this.renderer.setStyle(lockIcon, 'margin-left', '0.2rem'); // Optional: Add spacing

    // Add a Unicode lock symbol or font-awesome lock icon
    const textNode = this.renderer.createText('🔒'); // Unicode lock icon
    this.renderer.appendChild(lockIcon, textNode);

    // Append the lock icon to the button
    this.renderer.appendChild(this.el.nativeElement, lockIcon);
  }
}
