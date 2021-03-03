/**
 *  build scripts
 *  @todo FIXME https://github.com/developit/microbundle/issues/763
 *  @todo FIXME https://github.com/developit/microbundle/pull/799
 */

const del = require("del");
const path = require("path");
const { execSync } = require("child_process");
const { series, dest, src } = require("gulp");
const editJsonFile = require("edit-json-file");
const { renameSync, readdirSync } = require("fs");

const getNeedToBuildDirs = () => {
  const DO_NOT_BUILD = ["setupTests.ts", "react-app-env.d.ts", "typings.d.ts"];
  const all = readdirSync("./src");
  return [...all].filter((x) => [...DO_NOT_BUILD].every((y) => y !== x));
};

const autoSetPublishConfig = (keysToMerge, autoUpgrade = false) => {
  const packageJson = require("./package.json");
  const publishConfigPath = path.resolve(__dirname, "./.publish/package.json");
  const publishConfig = editJsonFile(publishConfigPath);
  // merge package.json
  for (let key of keysToMerge) {
    const value = packageJson[key];
    if (value !== undefined) {
      publishConfig.set(key, value);
    }
  }
  // upgrade version
  if (autoUpgrade) {
    const [hV, mV, lV] = publishConfig.get("version").split(".");
    if (!hV | !mV | !lV) {
      console.error("bad version in .publish/package.json");
    } else {
      const nextVer = `${hV}.${Number(mV) + 1}.${lV}`;
      publishConfig.set("version", nextVer);
    }
  }
  // save in file
  publishConfig.save();
};

const DO_BUILD_DIRS = getNeedToBuildDirs();

const beforeBuild = (done) => {
  //clear dist dirname
  const clearList = ["dist/package.json", "dist/README.md"];
  for (let dirname of DO_BUILD_DIRS) {
    clearList.push(`dist/${dirname}/**`);
  }
  del.sync(clearList);
  done();
};

const building = (done) => {
  for (let dirname of DO_BUILD_DIRS) {
    console.log(`building ${dirname}...`);
    const cmdStr = `microbundle-crl src/${dirname}/index.ts --output dist/${dirname}.js --jsx React.createElement --no-compress --sourcemap false --format cjs --tsconfig tsconfig.build.json"`;
    console.log(execSync(cmdStr).toString());
  }
  done();
};

const afterBuild = () => {
  // rename some files
  for (let dirname of DO_BUILD_DIRS) {
    renameSync(`dist/${dirname}.js`, `dist/${dirname}/index.js`);
     // FIXBUG https://github.com/developit/microbundle/pull/799/files
    del.sync(`dist/${dirname}.js.map`);
  }
  // auto merge package.json
  const MERGE_KEYS = ["peerDependencies", "dependencies"];
  autoSetPublishConfig(MERGE_KEYS, true);
  // copy some files
  return src([".publish/*"]).pipe(dest("dist/"));
};

exports.build = series(beforeBuild, building, afterBuild);
