import { test, expect } from "@playwright/test";
import course from "../src/data/course.json" with { type: "json" };
test("public routes, assets, navigation and responsive layouts", async ({
  page,
  request,
}) => {
  test.setTimeout(240000);
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  for (const route of [
    "/",
    "/cursos",
    "/cursos/os10-guardia-seguridad",
    "/empresas",
    "/nosotros",
    "/contacto",
    "/acceso",
    "/aula-virtual",
  ]) {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toBeVisible();
    if (route === "/aula-virtual")
      await expect(page.locator(".react-pdf__Page canvas")).toBeVisible();
    await page.evaluate(async () => {
      await Promise.all(
        Array.from(document.images).map((image) => {
          image.loading = "eager";
          return image.decode().catch(() => {});
        }),
      );
    });
    expect(
      await page
        .locator("img")
        .evaluateAll((images) =>
          images.every((image) => (image as HTMLImageElement).naturalWidth > 0),
        ),
    ).toBeTruthy();
    await page.screenshot({
      path: `artifacts/desktop-${route.replaceAll("/", "_") || "home"}.png`,
      fullPage: true,
    });
  }
  for (const item of course.modules) {
    const response = await request.get(item.content[0].src);
    expect(response.status()).toBe(200);
    expect((await response.body()).subarray(0, 4).toString()).toBe("%PDF");
  }
  for (const image of [
    "logo",
    "monitor",
    "access",
    "team",
    "classroom",
    "field",
  ])
    expect((await request.get(`/images/${image}.webp`)).status()).toBe(200);
  for (const width of [375, 430, 768, 1024, 1366, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ["/", "/cursos", "/empresas", "/aula-virtual"]) {
      await page.goto(route);
      await expect(page.locator("h1")).toBeVisible();
      if (route === "/aula-virtual")
        await expect(page.locator(".react-pdf__Page canvas")).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
        `${route} overflow at ${width}`,
      ).toBeTruthy();
      if (width === 375)
        await page.screenshot({
          path: `artifacts/mobile-${route.replaceAll("/", "_") || "home"}.png`,
          fullPage: true,
        });
    }
  }
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  await page.getByRole("button", { name: "Abrir menú", exact: true }).click();
  await page
    .getByRole("navigation", { name: "Navegación principal" })
    .getByRole("link", { name: "Cursos", exact: true })
    .click();
  await expect(page).toHaveURL(/\/cursos$/);
  expect(errors).toEqual([]);
});
test("catalog filters and validated demo forms", async ({ page }) => {
  await page.goto("/cursos");
  await page.getByRole("textbox", { name: "Buscar cursos" }).fill("OS10");
  await expect(page.locator(".course-card")).toHaveCount(1);
  await page
    .getByRole("textbox", { name: "Buscar cursos" })
    .fill("inexistente");
  await expect(page.getByText("No encontramos ese programa")).toBeVisible();
  await page.getByRole("button", { name: "Ver todos los programas" }).click();
  await expect(page.locator(".course-card")).toHaveCount(6);
  await page.getByRole("button", { name: "Tecnología", exact: true }).click();
  await expect(page.locator(".course-card")).toHaveCount(1);
  for (const route of ["/contacto", "/empresas"]) {
    await page.goto(route);
    const form = page.locator("form");
    await form
      .getByRole("button", { name: /Enviar consulta|Solicitar propuesta/ })
      .click();
    await expect(page.getByText("Tu solicitud está preparada")).toHaveCount(0);
    if (route === "/empresas") {
      await page.getByLabel("Nombre de empresa").fill("Empresa Demo");
      await page.getByLabel("Cantidad aproximada").selectOption("11 a 30");
      await page.getByLabel("Teléfono", { exact: true }).fill("+56912345678");
    }
    await page.getByLabel("Nombre de contacto").fill("Contacto Demo");
    await page.getByLabel("Correo", { exact: true }).fill("demo@example.com");
    await form
      .locator("select[name=need]")
      .selectOption("Curso OS10 Guardia de Seguridad");
    await page
      .getByLabel("Mensaje", { exact: true })
      .fill("Consulta de prueba de la plataforma de demostración.");
    await form
      .getByRole("button", { name: /Enviar consulta|Solicitar propuesta/ })
      .click();
    await expect(page.getByText("Tu solicitud está preparada")).toBeVisible();
    await expect(
      page.getByText(/los datos no se envían ni se almacenan/),
    ).toBeVisible();
  }
});
test("all 12 modules render, enforce completion, persist and reset", async ({
  page,
}) => {
  test.setTimeout(300000);
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  await page.goto("/aula-virtual");
  await expect(page.locator(".react-pdf__Page canvas")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Marcar módulo como completado" }),
  ).toBeDisabled();
  await expect(page.locator(".module-item").nth(1)).toHaveAttribute(
    "aria-disabled",
    "true",
  );
  await page.locator(".module-item").nth(1).dispatchEvent("click");
  await expect(page.getByRole("status")).toContainText(
    "Completa el módulo anterior",
  );
  for (const m of course.modules) {
    await expect(page.locator(".lesson-header h2")).toHaveText(m.title);
    for (let p = 1; p <= m.content[0].pages; p++) {
      await page
        .getByRole("button", { name: `Ir a página ${p}`, exact: true })
        .click();
      await expect
        .poll(() =>
          page.evaluate(
            ({ id, p }) =>
              JSON.parse(
                localStorage.getItem("protexxion-demo-progress-v1") || "{}",
              ).visited?.[id]?.includes(p),
            { id: m.id, p },
          ),
        )
        .toBeTruthy();
    }
    await expect(
      page.getByRole("button", { name: "Marcar módulo como completado" }),
    ).toBeEnabled();
    await page
      .getByRole("button", { name: "Marcar módulo como completado" })
      .click();
    await expect(page.locator(".overview-info p")).toContainText(
      `${m.id} de 12`,
    );
    if (m.id === 1) {
      await page.reload();
      await expect(page.locator(".overview-info p")).toContainText("1 de 12");
      await expect(page.locator(".page-count")).toContainText("8");
    }
    if (m.id < 12) {
      await page
        .getByRole("button", { name: "Siguiente módulo", exact: true })
        .click();
      await expect(page.locator(".react-pdf__Page canvas")).toBeVisible();
    }
  }
  await expect(page.locator(".progress-line strong")).toHaveText("100%");
  await expect(
    page.getByRole("heading", { name: "Curso completado", exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Ver mi logro" }).click();
  await expect(page.locator(".certificate-preview")).toContainText(
    "12 de 12 módulos completados",
  );
  await page.reload();
  await expect(page.locator(".progress-line strong")).toHaveText("100%");
  await page
    .getByRole("button", { name: "Reiniciar demo", exact: true })
    .click();
  await page.getByRole("button", { name: "Conservar progreso" }).click();
  await expect(page.locator(".progress-line strong")).toHaveText("100%");
  await page
    .getByRole("button", { name: "Reiniciar demo", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Reiniciar progreso", exact: true })
    .click();
  await expect(page.locator(".progress-line strong")).toHaveText("0%");
  await expect(page.locator(".module-item").nth(1)).toHaveAttribute(
    "aria-disabled",
    "true",
  );
  await page.reload();
  await expect(page.locator(".progress-line strong")).toHaveText("0%");
  expect(errors).toEqual([]);
});
