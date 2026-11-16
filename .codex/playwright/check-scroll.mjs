import assert from "node:assert/strict";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { chromium } from "playwright";

const baseUrl = process.env.CHURCH_DEV_URL ?? "http://127.0.0.1:8080/";
const browser = await chromium.launch({ channel: "msedge", headless: true });
const errors = [];

async function openHome(reducedMotion) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion,
  });
  const page = await context.newPage();
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
  const skip = page.getByRole("button", { name: "Skip intro" });
  if (await skip.isVisible().catch(() => false)) await skip.click();
  await page.locator(".page-ready").waitFor({ timeout: 12000 });
  return { context, page };
}

try {
  const reduced = await openHome("reduce");
  const reducedSection = reduced.page.locator(".film-section").first();
  const reducedSectionTop = await reducedSection.evaluate(
    (element) => element.getBoundingClientRect().top + scrollY,
  );
  await reduced.page.evaluate((y) => {
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, y);
  }, reducedSectionTop);
  const still = reducedSection.locator("img.film-canvas");
  await still.waitFor({ state: "visible" });
  await reduced.page.waitForFunction(() => {
    const image = document.querySelector(".film-section img.film-canvas");
    return image instanceof HTMLImageElement && image.complete && image.naturalWidth > 0;
  });
  const staticResult = await still.evaluate((image) => ({
    src: image.getAttribute("src"),
    width: image.naturalWidth,
    height: image.naturalHeight,
    box: image.getBoundingClientRect().toJSON(),
  }));
  assert.ok(staticResult.width > 0 && staticResult.height > 0, "reduced-motion still should load");
  await reduced.page.screenshot({ path: join(tmpdir(), "church-scroll-reduced-motion.png") });
  await reduced.context.close();

  const animated = await openHome("no-preference");
  const section = animated.page.locator(".film-section").first();
  await section.scrollIntoViewIfNeeded();
  const canvas = section.locator("canvas.film-canvas");
  await canvas.waitFor({ state: "visible" });
  const sectionTop = await section.evaluate(
    (element) => element.getBoundingClientRect().top + scrollY,
  );
  await animated.page.evaluate((y) => {
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, y);
  }, sectionTop + 180);
  const firstFrame = await canvas.evaluate((element) => element.toDataURL());
  await animated.page.evaluate((y) => window.scrollTo(0, y), sectionTop + 1500);
  await animated.page.waitForFunction(
    (initial) => {
      const current = document.querySelector(".film-section canvas.film-canvas");
      return current instanceof HTMLCanvasElement && current.toDataURL() !== initial;
    },
    firstFrame,
    { timeout: 15000 },
  );
  const animatedResult = await canvas.evaluate((element) => ({
    width: element.width,
    height: element.height,
    alpha: element.getContext("2d")?.getImageData(element.width / 2, element.height / 2, 1, 1)
      .data[3],
  }));
  assert.ok(
    animatedResult.width > 0 && animatedResult.height > 0,
    "animation canvas should have dimensions",
  );
  assert.equal(errors.length, 0, `browser errors: ${errors.join("; ")}`);
  await animated.context.close();

  console.log(
    JSON.stringify({ reducedMotionStill: staticResult, scrollScrub: animatedResult, errors }),
  );
} finally {
  await browser.close();
}
