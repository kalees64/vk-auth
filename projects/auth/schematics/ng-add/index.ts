import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';

export function ngAdd(_options: any): Rule {
  return (tree: Tree, context: SchematicContext) => {
    // Add ngx-toastr and @angular/animations dependencies
    // context.logger.info('Adding ngx-toastr and @angular/animations...');
    // const packageJson = JSON.parse(
    //   tree.read('package.json')!.toString('utf-8')
    // );
    // packageJson.dependencies['ngx-toastr'] = '^17.0.0';
    // packageJson.dependencies['@angular/animations'] = '^16.0.0';
    // tree.overwrite('package.json', JSON.stringify(packageJson, null, 2));

    // Add toastr styles to angular.json
    context.logger.info('Configuring styles...');
    const angularJson = JSON.parse(
      tree.read('angular.json')!.toString('utf-8')
    );
    const projectName = Object.keys(angularJson.projects)[0]; // Assume default project
    const project = angularJson.projects[projectName];

    project.architect.build.options.styles.push(
      'node_modules/ngx-toastr/toastr.css'
    );
    tree.overwrite('angular.json', JSON.stringify(angularJson, null, 2));

    // Modify app.config.ts to include provideAnimations and provideToastr
    const appConfigPath = '/src/app/app.config.ts';
    const appConfigContent = tree.read(appConfigPath)?.toString('utf-8');
    if (appConfigContent) {
      const updatedConfig = appConfigContent
        .replace(
          `providers: [`,
          `providers: [\n    provideAnimations(), // required animations providers\n    provideToastr(), // Toastr providers\n`
        )
        .replace(
          `import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';`,
          `import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';\nimport { provideAnimations } from '@angular/platform-browser/animations';\nimport { provideToastr } from 'ngx-toastr';`
        );

      tree.overwrite(appConfigPath, updatedConfig);
    } else {
      context.logger.warn(
        'app.config.ts file not found. Ensure provideAnimations and provideToastr are manually added.'
      );
    }

    // Schedule npm install task
    // Add npm packages installation task
    context.addTask(
      new NodePackageInstallTask({
        packageName: 'ngx-toastr @angular/animations',
      })
    );

    context.logger.info('Setup complete! Run the project to use ngx-toastr.');
    return tree;
  };
}
