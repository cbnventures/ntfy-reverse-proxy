/**
 * Lib - npm Pack Report - Get npm Pack File Paths.
 *
 * Accepts npm 11's array and npm 12's package-keyed object so package
 * verification inspects the same file list in local and CI builds.
 *
 * @param {unknown} packReports - Pack reports.
 * @param {string}  packageName - Package name.
 *
 * @returns {string[]}
 *
 * @since UNRELEASED
 */
export function getNpmPackFilePaths(packReports, packageName) {
  if (typeof packReports !== 'object' || packReports === null) {
    throw new Error('npm package inspection did not return a package report.');
  }

  const packReport = (Array.isArray(packReports) === true) ? packReports[0] : Reflect.get(packReports, packageName);

  if (typeof packReport !== 'object' || packReport === null) {
    throw new Error('npm package inspection did not return a package report.');
  }

  const packFiles = Reflect.get(packReport, 'files');

  if (Array.isArray(packFiles) === false) {
    throw new Error('npm package inspection did not return a file list.');
  }

  return packFiles.map((packFile) => {
    if (typeof packFile !== 'object' || packFile === null) {
      throw new Error('npm package inspection returned an invalid file entry.');
    }

    const packFilePath = Reflect.get(packFile, 'path');

    if (typeof packFilePath !== 'string') {
      throw new Error('npm package inspection returned a file without a path.');
    }

    return packFilePath;
  });
}
