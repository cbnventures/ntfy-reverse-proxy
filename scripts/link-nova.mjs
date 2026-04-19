import { execSync } from 'child_process';
import { existsSync, lstatSync } from 'fs';
import { join } from 'path';

const PACKAGES = [
  '@cbnventures/nova',
  '@cbnventures/docusaurus-preset-nova',
];

/**
 * Scripts - Link Nova.
 *
 * @since 2.0.0
 */
function linkNova() {
  const globalPrefix = execSync('npm prefix -g', { encoding: 'utf-8' }).trim();
  const globalModules = join(globalPrefix, 'lib', 'node_modules');
  const missingLinks = [];

  for (const packageName of PACKAGES) {
    const globalPath = join(globalModules, packageName);
    const isLinked = existsSync(globalPath) && lstatSync(globalPath).isSymbolicLink();

    if (!isLinked) {
      missingLinks.push(packageName);
    }
  }

  if (missingLinks.length > 0) {
    console.log(`link-nova: Global links not found for ${missingLinks.join(', ')}. Skipping.`);

    return;
  }

  for (const packageName of PACKAGES) {
    console.log(`link-nova: Linking ${packageName} ...`);
    execSync(`npm link ${packageName}`, { stdio: 'inherit' });
  }

  console.log('link-nova: Done.');
}

linkNova();
