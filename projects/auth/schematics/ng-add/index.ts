import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';

export function ngAdd(_options: any): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.addTask(
      new NodePackageInstallTask({
        packageName: 'ngx-toastr',
      })
    );

    return tree;
  };
}
