const { default: puppeteer } = require("puppeteer");
const {
  findScriptById,
  createScriptFromId,
  getRecentDocList,
} = require("../helpers/scriptHelpers");
const { validateHTML } = require("../utils/validationUtils");

/**
 * Controller functions for script router
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns {import("express").Response}
 */

module.exports = {
  getInitial: async (req, res) => {
    try {
      const data = await findScriptById(req.params.id);
      if (data) {
        return res.json({ author: data.author, data: data.editorState });
      }
      return res.status(404).json({ message: "Data not found" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  createScript: async (req, res) => {
    const { id } = req.params;
    try {
      const docData = await createScriptFromId(id);
      res.json({ author: docData.author, id: docData._id });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: err.message });
    }
  },
  listRecent: async (req, res) => {
    try {
      const list = await getRecentDocList();
      res.json({ data: list });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: err.message });
    }
  },
  exportFile: async (req, res) => {
    const { docFormat, css, html, margin, format, width, height } = req.body;
    const docFormatValidator = {
      pdf: docFormat === "pdf",
      docx: docFormat === "docx",
    };
    if (!docFormat || !docFormatValidator[docFormat]) {
      return res.status(400).json({ message: "invalid docFormat type" });
    }

    if (!validateHTML(html)) {
      return res.status(400).json({ message: "invalid html content" });
    }

    if (!css) {
      return res.status(400).json({ message: "invalid css content" });
    }

    if (docFormatValidator.pdf) {
      try {
        const browser = await puppeteer.launch({
          headless: "new",
          args: ["--no-sandbox"],
        });
        const page = await browser.newPage();
        await page.setContent(
          `<div style="word-wrap:break-word;">${html}</div>`,
        );
        await page.addStyleTag({
          content: `body{display:flex;justify-content:center;}${css}`,
        });
        await page.setViewport({
          height: 1080,
          width: 1920,
        });

        const pdfBuffer = await page.pdf({
          format: format || "A4",
          printBackground: true,
          margin: {
            top: margin?.top || `${3 * 16}px`,
            bottom: margin?.bottom || `${3 * 16}px`,
            left: margin?.left || `${3 * 16}px`,
            right: margin?.right || `${3 * 16}px`,
          },
          scale: 1.02,
          height: height || undefined,
          width: width || undefined,
          preferCSSPageSize: true,
        });
        await browser.close();
        res.setHeader("Content-type", "application/pdf");
        res.send(pdfBuffer);
      } catch (err) {
        console.error(err);
        res
          .status(500)
          .json({ error: "Internal server error", message: err.message });
      }
    }
  },
};
