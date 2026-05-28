import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  statSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function projectPath(relativePath) {
  return path.join(root, relativePath);
}

function readRequired(relativePath) {
  const filePath = projectPath(relativePath);
  assert.ok(existsSync(filePath), `${relativePath} should exist`);
  return readFileSync(filePath, "utf8");
}

test("source page contains required Robin Clinic microsclerotherapy copy and supplied image", () => {
  const html = readRequired("src/index.html");

  assert.match(html, /Robin Clinic/);
  assert.match(html, /Microsclerotherapy/);
  assert.match(
    html,
    /Microsclerotherapy is a minimally invasive procedure used to eliminate thread\/spider veins on the legs and lower body\./,
  );
  assert.match(
    html,
    /This procedure is carried out by a Registered Nurse with more than 25 years of experience\./,
  );
  assert.match(html, /Book your free consultation today\./);
  assert.match(html, /000 000/);
  assert.match(html, /assets\/clinic-room\.png/);
});

test("source page has three individual icon-backed feature sections", () => {
  const html = readRequired("src/index.html");
  const featureCards = [
    ...html.matchAll(
      /<article class="feature-card" data-feature="([^"]+)">([\s\S]*?)<\/article>/g,
    ),
  ];

  assert.deepEqual(
    featureCards.map((match) => match[1]),
    ["registered-nurse", "experience", "minimally-invasive"],
  );

  for (const [, feature, body] of featureCards) {
    assert.match(body, /<svg\b[\s\S]*?aria-hidden="true"/, `${feature} has an inline icon`);
  }

  assert.match(html, /Registered Nurse/);
  assert.match(html, /More than 25 years of experience/);
  assert.match(html, /Minimally invasive procedure/);
});

test("styles define a calm responsive clinic layout", () => {
  const css = readRequired("src/styles.css");

  assert.match(css, /--sage:/);
  assert.match(css, /\.hero\b/);
  assert.match(css, /\.feature-grid\b/);
  assert.match(css, /@media\s*\(max-width:\s*720px\)/);
  assert.match(css, /grid-template-columns/);
});

test("package scripts use built-in test, build, and Python dev server without dependencies", () => {
  const pkg = JSON.parse(readRequired("package.json"));

  assert.equal(pkg.scripts.test, "node --test test/*.test.mjs");
  assert.equal(pkg.scripts.build, "node tools/build.mjs");
  assert.equal(pkg.scripts.dev, "python3 -m http.server 5173 --directory src");
  assert.deepEqual(pkg.dependencies ?? {}, {});
  assert.deepEqual(pkg.devDependencies ?? {}, {});
});

test("build writes dist with CNAME and static assets", () => {
  const cname = readRequired("CNAME").trim();
  assert.equal(cname, "robinclinic.co.uk");

  rmSync(projectPath("dist"), { force: true, recursive: true });
  mkdirSync(projectPath(".agent-runs"), { recursive: true });

  const result = spawnSync(process.execPath, ["tools/build.mjs"], {
    cwd: root,
    encoding: "utf8",
  });

  assert.equal(result.status, 0, result.stderr || result.stdout);
  assert.ok(existsSync(projectPath("dist/index.html")), "dist/index.html exists");
  assert.ok(existsSync(projectPath("dist/styles.css")), "dist/styles.css exists");
  assert.equal(readRequired("dist/CNAME").trim(), "robinclinic.co.uk");
  assert.ok(statSync(projectPath("dist/assets/clinic-room.png")).size > 0);
});

test("GitHub Pages workflow tests and builds dist before main-branch deployment", () => {
  const workflow = readRequired(".github/workflows/pages.yml");

  assert.match(workflow, /branches:\s*\[\s*["']main["']\s*\]/);
  assert.match(workflow, /npm test/);
  assert.match(workflow, /npm run build/);
  assert.match(workflow, /actions\/upload-pages-artifact@/);
  assert.match(workflow, /path:\s*dist/);
  assert.match(workflow, /actions\/deploy-pages@/);
});
