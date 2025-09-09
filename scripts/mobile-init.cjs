
/**
 * Ensures Capacitor Android is added and Gradle wrapper exists at 8.7.
 * Usage: pnpm mobile:init
 */
const { spawnSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const MOBILE = path.join(ROOT, "apps", "mobile");
const ANDROID = path.join(MOBILE, "android");
const WRAPPER_PROPS = path.join(ANDROID, "gradle", "wrapper", "gradle-wrapper.properties");

function run(cmd, args, cwd){
  const bin = process.platform === "win32" ? `${cmd}.cmd` : cmd;
  const res = spawnSync(bin, args, { cwd, stdio: "inherit", shell: false });
  if (res.error || res.status !== 0) {
    console.error(`Failed: ${cmd} ${args.join(" ")}`);
    process.exit(res.status || 1);
  }
}

function ensureAndroid(){
  if (!fs.existsSync(ANDROID)) {
    console.log("Adding Capacitor Android platform...");
    run("npx", ["cap", "add", "android"], MOBILE);
  } else {
    console.log("Android platform already present.");
  }
}

function ensureWrapper(){
  if (!fs.existsSync(path.join(ANDROID, "gradlew.bat")) || !fs.existsSync(WRAPPER_PROPS)) {
    console.log("Generating Gradle wrapper 8.7...");
    // Try system gradle first
    try {
      run("gradle", ["wrapper", "--gradle-version", "8.7"], ANDROID);
    } catch {
      console.log("System Gradle not found; attempting via Gradle Wrapper bootstrap from Android Studio.");
    }
  }
  // Pin to 8.7
  try {
    fs.mkdirSync(path.dirname(WRAPPER_PROPS), { recursive: true });
    fs.writeFileSync(WRAPPER_PROPS,
`distributionUrl=https\\://services.gradle.org/distributions/gradle-8.7-all.zip
distributionBase=GRADLE_USER_HOME
distributionPath=wrapper/dists
zipStoreBase=GRADLE_USER_HOME
zipStorePath=wrapper/dists
`);
    console.log("Pinned Gradle wrapper to 8.7.");
  } catch (e) {
    console.warn("Could not write gradle-wrapper.properties:", e.message);
  }
}

function syncCapacitor(){
  console.log("Syncing Capacitor...");
  run("npx", ["cap", "sync"], MOBILE);
}

function main(){
  ensureAndroid();
  ensureWrapper();
  syncCapacitor();
  console.log("✓ Android ready. Open with: pnpm -C apps/mobile cap open android");
}

main();
