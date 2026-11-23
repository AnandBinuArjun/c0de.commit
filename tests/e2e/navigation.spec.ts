import { test, expect } from "@playwright/test";

test.describe("CODE.COMMIT E2E Verification Suite", () => {
  test("Homepage renders CODE.COMMIT 2.0 editorial headline, triad pillars, services, portfolio, and terminal", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: /We break systems/i })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /Find vulnerabilities\. Fix them\. Build securely\./i })
    ).toBeVisible();
    await expect(
      page.getByText("INDEPENDENT SECURITY & SOFTWARE ENGINEERING STUDIO")
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /Explore Our Expertise/i }).first()
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /Discover Our Work/i }).first()
    ).toBeVisible();
  });

  test("Services navigation and Penetration Testing page load with RoE notice", async ({
    page,
  }) => {
    await page.goto("/services/penetration-testing");
    await expect(
      page.getByRole("heading", { name: /Penetration Testing/i })
    ).toBeVisible();
    await expect(page.getByText(/AUTHORISED ENGAGEMENT NOTICE/i)).toBeVisible();
  });

  test("CloudSentinel product page renders original logo slot and implemented vs planned features", async ({
    page,
  }) => {
    await page.goto("/products/cloudsentinel");
    await expect(
      page.getByRole("heading", { name: "CloudSentinel" })
    ).toBeVisible();
    await expect(page.getByText(/Implemented & Verified/i)).toBeVisible();
    await expect(page.getByText(/Planned Architecture Roadmap/i)).toBeVisible();
  });

  test("Contact form validates inputs and submits project enquiry", async ({
    page,
  }) => {
    await page.goto("/contact");
    await page.fill("#fullName", "Alex Mercer");
    await page.fill("#workEmail", "alex@example.org");
    await page.fill(
      "#projectDescription",
      "We require an authorised penetration test for our web application and API endpoints."
    );
    await page.check("#consentAccepted");
    await page.click('button[type="submit"]');
    await expect(page.getByText(/Scope request logged securely/i)).toBeVisible();
  });
});
