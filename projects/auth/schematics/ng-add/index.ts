import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';

export function ngAdd(_options: any): Rule {
  return (tree: Tree, context: SchematicContext) => {
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

    // Set up Tailwind configuration
    context.logger.info('Adding Tailwind CSS configuration...');
    const tailwindConfigPath = '/tailwind.config.js';
    const tailwindConfigContent = `
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
`;
    if (!tree.exists(tailwindConfigPath)) {
      tree.create(tailwindConfigPath, tailwindConfigContent);
    }

    // Update styles.css with Tailwind directives
    const stylesPath = '/src/styles.css';
    const stylesContent = `
@tailwind base;
@tailwind components;
@tailwind utilities;
`;
    if (tree.exists(stylesPath)) {
      const existingStyles = tree.read(stylesPath)!.toString('utf-8');
      tree.overwrite(stylesPath, existingStyles + '\n' + stylesContent);
    } else {
      tree.create(stylesPath, stylesContent);
    }

    // Schedule npm install task
    // Add npm packages installation task
    context.addTask(
      new NodePackageInstallTask({
        packageName:
          'ngx-toastr @angular/animations tailwindcss postcss autoprefixer',
      })
    );

    context.logger.info('Setup complete! Run the project to use ngx-toastr.');
    return tree;
  };
}
