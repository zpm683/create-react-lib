const del = require("del");
const { exec } = require("child_process");
const { series, dest, src } = require("gulp");

/**
 * CAN_IMPORT_FROM_ROOT
 * @var false: import {xx} from "react-common/xx"
 * @var true: import {xx} from "react-common"
 */
const CAN_IMPORT_FROM_ROOT = false;

const beforeBuild = (done) => {
  del(["dist/*"]);
  done();
};

const building = (done) => {
  exec("microbundle-crl --no-compress --format cjs", (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    done(err);
  });
};

const afterBuild = () => {
  if (!CAN_IMPORT_FROM_ROOT) del(["dist/index.d.ts"]);
  return src([".publish/package.json", ".publish/README.md"]).pipe(
    dest("dist/"),
  );
};

exports.build = series(beforeBuild, building, afterBuild);
