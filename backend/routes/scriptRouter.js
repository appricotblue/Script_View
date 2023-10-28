const router = require("express").Router();
const puppeteer = require("puppeteer");
const path = require("path");
const ScriptModel = require("../model/scriptModel");

router.get("/get-initial", async (req, res) => {
  try {
    const data = await ScriptModel.findOne({ "author.name": "Ajay" });
    if (data) return res.json({ author: data.author, data: data.state });
    return res.status(404).json({ message: "Data not found" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

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
      const pdfBuffer = await page.pdf({
        format: "A4",
        margin: { top: "10px", bottom: "10px", left: "10px", right: "10px" },
      });
      await browser.close();
      res.setHeader("Content-type", "application/pdf");
      res.send(pdfBuffer);
    } catch (err) {
      console.log("Error has occured: ", err);
    }
  }
});

module.exports = router;
