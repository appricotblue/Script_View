const router = require("express").Router();
const puppeteer = require("puppeteer");
router.post("/export", async (req, res) => {
  let { format, css, html } = req.body;
  console.log({ format, css, html });
  
  const formatValidator = {
    pdf: format === "pdf",
    docx: format === "docx",
  };
  const htmlRegex = new RegExp(/<(\"[^\"]*\"|'[^']*'|[^'\">])*>/);
  if (!format || !formatValidator[format]) {
    return res.status(400).json({ message: "invalid format type" });
  }
  if (!html || !htmlRegex.test(html)) {
    return res.status(400).json({ message: "invalid html content" });
  }
  if (!css) {
    return res.status(400).json({ message: "invalid css content" });
  }

  if (formatValidator["pdf"]) {
    try {
      const browser = await puppeteer.launch({ headless: "new" });
      const page = await browser.newPage();

      await page.setContent(`<style>${css}</style>${html}`);

      const pdfBuffer = await page.pdf({ format: "A4" });
      await browser.close();

      res.setHeader("Content-type", "application/pdf");
      res.send(pdfBuffer);
    } catch (err) {
      console.log("Error has occured: ", err);
    }
  }
});

module.exports = router;
