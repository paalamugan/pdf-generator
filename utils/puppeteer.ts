let chromium: typeof import("chrome-aws-lambda");
let puppeteer: typeof import("puppeteer");

if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
  // running on the Vercel platform.
  chromium = require("chrome-aws-lambda");
  puppeteer = require("puppeteer-core");
} else {
  // running locally.
  puppeteer = require("puppeteer");
}

interface PuppeteerOptions {
  args: Array<string>;
  defaultViewport?: typeof chromium.defaultViewport;
  executablePath?: string;
  headless?: typeof chromium.headless;
  ignoreHTTPSErrors?: boolean;
}

const pdfOptions = {
  width: "10in",
  height: "11.7in",
  // format: 'A4',
  printBackground: true,
};

export const generatePDFContent = async (payload: string) => {
  let options: PuppeteerOptions = {
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  };

  if (chromium) {
    options = {
      args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    };
  }
  const browser = await puppeteer.launch(options);
  const page = await browser.newPage();

  await page.addStyleTag({
    content: "@page { size: auto; }",
  });

  await page.emulateMediaType("screen");

  // We set the page content as the generated html by handlebars
  await page.setContent(payload);

  // We Use pdf function to generate the pdf in the same folder as this file.
  let content = await page.pdf(pdfOptions);

  await browser.close();

  return content;
};
