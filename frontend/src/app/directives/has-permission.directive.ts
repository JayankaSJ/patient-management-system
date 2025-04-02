import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { IdentityService } from '../services/identity.service';

@Directive({
  selector: '[appHasPermission]',
})
export class HasPermissionDirective {
  private hasView = false;

  @Input() set appHasPermission(permissions: string | string[]) {
    const perms = Array.isArray(permissions) ? permissions : [permissions];
    if (this.identityService.hasPermissions(perms)) {
      if (!this.hasView) {
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.hasView = true;
      }
    } else {
      if (this.hasView) {
        this.viewContainer.clear();
        this.hasView = false;
      }
    }
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private identityService: IdentityService
  ) {}
}
