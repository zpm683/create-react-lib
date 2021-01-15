/**
 *  build scripts
 *  @todo FIXME https://github.com/developit/microbundle/issues/763
 */

const del = require("del");
const { renameSync } = require("fs");
const { execSync } = require("child_process");
const { series, dest, src } = require("gulp");

/**
 * dir config
 * @description
 * if you know which dir is not change,
 * you can set it in DO_NOT_BUILD[],
 * this option can skip them when building!
 */
const DIRS = {
  DO_BUILD: ["components", "hooks", "utils"],
  DO_NOT_BUILD: [],
};

const beforeBuild = (done) => {
  //clear dist dirname
  const clearList = ["dist/package.json", "dist/README.md"];
  for (let dirname of DIRS.DO_BUILD) {
    clearList.push(`dist/${dirname}/**`);
  }
  del.sync(clearList);
  done();
};

const building = (done) => {
  for (let dirname of DIRS.DO_BUILD) {
    console.log(`building ${dirname}...`);
    const cmdStr = `microbundle-crl src/${dirname}/index.ts --output dist/${dirname}.js --no-compress --sourcemap false --format cjs --tsconfig tsconfig.build.json"`;
    console.log(execSync(cmdStr).toString());
  }
  done();
};

const afterBuild = () => {
  // rename some files
  for (let dirname of DIRS.DO_BUILD) {
    renameSync(`dist/${dirname}.js`, `dist/${dirname}/index.js`);
  }
  // copy some files
  return src([".publish/*"]).pipe(dest("dist/"));
};

exports.build = series(beforeBuild, building, afterBuild);
