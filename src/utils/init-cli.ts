import welcome from 'cli-welcome';
import { readFileSync } from 'node:fs';

function readPackageJson() {
  let url: URL;
  try {
    // local dev
    url = new URL('../../../package.json', import.meta.url);
  } catch {
    // NPM
    url = new URL('../../package.json', import.meta.url);
  }

  return JSON.parse(readFileSync(url, 'utf-8'));
}

export async function initCLI() {
  const pkgJSON = readPackageJson();

  const { default: updateNotifier } = await import('update-notifier');

  welcome({
    title: 'React Native Styled System CLI',
    tagLine: 'by MJStudio',
    bgColor: '#319795',
    color: '#FFFFFF',
    bold: true,
    clear: false,
  });

  updateNotifier({
    pkg: pkgJSON,
    shouldNotifyInNpmScript: true,
    updateCheckInterval: 1000 * 60 * 60 * 24 * 3, // 3 days
  }).notify({ isGlobal: true, message: 'New version of CLI available' });
}
