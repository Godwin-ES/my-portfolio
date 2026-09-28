import { readFileSync } from "node:fs";
import { join } from "node:path";
import { site } from "@/content/site";

it("publishes the configured résumé URL as a real PDF asset", () => {
  expect(site.resumeUrl).toBe("/resume/Ekanem_Godwin_Resume.pdf");
  const resumePath = join(process.cwd(), "public", site.resumeUrl);
  const bytes = readFileSync(resumePath);
  expect(bytes.subarray(0, 5).toString("ascii")).toBe("%PDF-");
});
