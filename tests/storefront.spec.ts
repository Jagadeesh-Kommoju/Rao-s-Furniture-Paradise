import { test, expect } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const SCREENSHOT_DIR = path.join(process.cwd(), "artifacts", "local", "playwright-verify");
fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

const REQUIRED_ROUTES = [
  "/",
  "/furniture-in-visakhapatnam",
  "/collections",
  "/collections/sofas",
  "/collections/beds",
  "/collections/dining-tables",
  "/collections/office-chairs",
  "/products/aurora-3-seater-sofa",
  "/search?q=sofa",
  "/wishlist",
  "/cart",
  "/customize",
  "/shop-the-look",
  "/about",
  "/showroom",
  "/contact",
  "/faq",
  "/privacy-policy",
  "/terms-and-conditions",
];

const VIEWPORTS = [
  { name: "1920x1080", width: 1920, height: 1080 },
  { name: "1440x900", width: 1440, height: 900 },
  { name: "1366x768", width: 1366, height: 768 },
  { name: "1280x800", width: 1280, height: 800 },
  { name: "1024x768", width: 1024, height: 768 },
  { name: "768x1024", width: 768, height: 1024 },
  { name: "430x932", width: 430, height: 932 },
  { name: "390x844", width: 390, height: 844 },
  { name: "375x812", width: 375, height: 812 },
  { name: "360x800", width: 360, height: 800 },
];

test("all required routes render with zero errors and all images load", async ({
  page,
}) => {
  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];
  const failedUrls: string[] = [];

  page.on("response", (res) => {
    if (res.status() >= 400 && !res.url().includes("google.com/maps")) {
      failedUrls.push(`${res.status()} ${res.url()}`);
    }
  });
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });
  page.on("pageerror", (err) => pageErrors.push(err.message));

  for (const route of REQUIRED_ROUTES) {
    const res = await page.goto(route, { waitUntil: "networkidle" });
    expect(res?.status(), `HTTP status for ${route}`).toBeLessThan(400);

    // Trigger lazy images by scrolling down and back up
    await page.evaluate(async () => {
      window.scrollTo(0, document.body.scrollHeight / 2);
      await new Promise((r) => setTimeout(r, 150));
      window.scrollTo(0, document.body.scrollHeight);
      await new Promise((r) => setTimeout(r, 150));
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(250);

    const imgIssues = await page.evaluate(() => {
      return Array.from(document.querySelectorAll("img"))
        .filter((img) => {
          const src = img.getAttribute("src") || "";
          // Only validate visible images that have loaded or eager images
          return src && img.complete && img.naturalWidth === 0;
        })
        .map((img) => img.getAttribute("src"));
    });
    expect(imgIssues, `Broken images on ${route}`).toEqual([]);
  }

  expect(failedUrls, "HTTP >= 400 asset/route failures").toEqual([]);
  expect(pageErrors, "Uncaught page errors").toEqual([]);
  expect(consoleErrors, "Console errors").toEqual([]);
});

test("no fabricated claims or unverified tel/whatsapp links exist", async ({
  page,
}) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const bodyText = await page.evaluate(() => document.body.innerText);

  expect(bodyText).not.toContain("20 Lakh+");
  expect(bodyText).not.toContain("UPTO 50% OFF");
  expect(bodyText).not.toContain("Sale Ends In");
  expect(bodyText).not.toContain("Established in 1990");

  const unverifiedLinks = await page.evaluate(() => {
    return Array.from(document.querySelectorAll("a"))
      .map((a) => a.getAttribute("href") || "")
      .filter((href) => href.startsWith("tel:") || href.includes("wa.me"));
  });
  expect(unverifiedLinks).toEqual([]);
});

test("10-viewport responsive check has zero horizontal overflow and captures screenshots", async ({
  page,
}) => {
  for (const vp of VIEWPORTS) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto("/furniture-in-visakhapatnam", {
      waitUntil: "networkidle",
    });
    await page.waitForTimeout(400);

    const overflow = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
    }));

    expect(
      overflow.scrollWidth,
      `Horizontal overflow at ${vp.name}`
    ).toBeLessThanOrEqual(overflow.innerWidth);

    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `local-${vp.name}-fold.png`),
    });
    if (vp.name === "1440x900" || vp.name === "390x844" || vp.name === "768x1024") {
      await page.screenshot({
        path: path.join(SCREENSHOT_DIR, `local-${vp.name}-full.png`),
        fullPage: true,
      });
    }
  }
});

test("interactive flows: tabs, mega-menu, sticky header, carousels, search Escape, wishlist, enquiry basket, customization, FAQ, showroom directions, mobile drawer", async ({
  page,
}) => {
  // 1. Desktop interactions at 1440x900
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/", { waitUntil: "networkidle" });

  // Read More toggle (visually shows "More", accessible label "Read More")
  const readMore = page.getByRole("button", { name: "Read More" });
  await readMore.click();
  await expect(page.getByRole("button", { name: "Read Less" })).toBeVisible();

  // Category tab filtering
  await page.getByRole("tab", { name: "Bedroom", exact: true }).click();
  await expect(
    page.getByRole("tabpanel").getByText("Dressing Tables")
  ).toBeVisible();
  await page.getByRole("tab", { name: "All", exact: true }).click();

  // Sticky category navigation remains visible after scrolling down
  await page.evaluate(() => window.scrollTo(0, 700));
  await page.waitForTimeout(150);
  const navBox = await page
    .locator("nav[aria-label='Main furniture categories']")
    .boundingBox();
  expect(navBox?.y ?? 999).toBeLessThanOrEqual(20);
  await page.evaluate(() => window.scrollTo(0, 0));

  // Product carousel navigation
  const nextLivingBtn = page.getByRole("button", {
    name: /Scroll Featured Living Room Products right/i,
  });
  await expect(nextLivingBtn).toBeVisible();
  await nextLivingBtn.click();

  // Showroom Google Maps directions verification
  const mapsLinks = await page
    .locator('a[href*="17.7143612,83.3009386"]')
    .count();
  expect(mapsLinks).toBeGreaterThanOrEqual(1);

  // Mega-menu hover
  await page.locator("nav[aria-label='Main furniture categories'] a", { hasText: "Sofas" }).first().hover();
  await expect(
    page.getByRole("region", { name: "Sofas category menu" })
  ).toBeVisible();

  // Search suggestions + Escape dismiss + Enter submit
  const searchInput = page.getByLabel("Search furniture catalogue", { exact: true });
  await searchInput.click();
  await expect(page.locator("#header-search-suggestions")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator("#header-search-suggestions")).toBeHidden();

  await searchInput.click();
  await searchInput.fill("sofa");
  await expect(page.getByText("Aurora 3-Seater Sofa").first()).toBeVisible();
  await searchInput.press("Enter");
  await expect(page).toHaveURL(/\/search\?q=sofa/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("sofa");

  // Wishlist + Enquiry Basket persistence across reload on PDP
  await page.goto("/products/aurora-3-seater-sofa", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Wishlist", exact: true }).click();
  await page.getByRole("button", { name: "Add to Enquiry Basket", exact: true }).click();

  await page.reload({ waitUntil: "networkidle" });
  await expect(page.getByRole("button", { name: "Wishlisted", exact: true })).toBeVisible();

  // Verify on /wishlist and /cart
  await page.goto("/wishlist", { waitUntil: "networkidle" });
  await expect(page.getByText("Aurora 3-Seater Sofa").first()).toBeVisible();

  await page.goto("/cart", { waitUntil: "networkidle" });
  await expect(page.getByText("Aurora 3-Seater Sofa").first()).toBeVisible();
  await page.getByRole("button", { name: /Increase quantity/i }).click();
  await expect(page.getByText("Total Pieces").locator("..")).toContainText("2");

  // Customization summary generation
  await page.goto("/customize", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Generate Enquiry Summary" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");

  // FAQ accordion on /faq
  await page.goto("/faq", { waitUntil: "networkidle" });
  const faqBtn = page.getByRole("button", {
    name: "Can I visit the showroom before purchasing?",
  });
  await faqBtn.click();
  await expect(faqBtn).toHaveAttribute("aria-expanded", "true");

  // 2. Mobile drawer at 390x844
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Open navigation menu" }).click();
  await expect(page.getByRole("dialog", { name: "Mobile Navigation" })).toBeVisible();
  await page.getByRole("button", { name: "Close navigation menu" }).click();
});
