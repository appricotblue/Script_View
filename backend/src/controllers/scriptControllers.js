const { default: puppeteer } = require("puppeteer");
const {
  findScriptById,
  createNewScript,
  getRecentDocList,
} = require("../helpers/scriptHelpers");
const { validateHTML } = require("../utils/validationUtils");
const OneLineSchema = require("../model/oneLineModel");

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
        return res.json({
          author: data.author,
          state: data.editorState,
          title: data.title,
          characters: data.characters || [],
        });
      }
      return res.status(404).json({ message: "Data not found" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  createScript: async (req, res) => {
    try {
      const docData = await createNewScript();
      res.json({
        author: docData.author,
        id: docData._id,
        title: docData.title,
      });
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
          scale: 1,
          height: height || undefined,
          width: width || undefined,
          preferCSSPageSize: true,
          displayHeaderFooter: true,
          headerTemplate: `<div style="display:none;"></div>`,
          footerTemplate: `<div style="font-size:10px; text-align:center; width:100%;"><span class="pageNumber"></span>/<span class="totalPages"></span></div>`,
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
  deleteDoc: async (req, res) => {
    const docId = req.params.id;
    try {
      const data = await findScriptById(docId);
      if (data) {
        await data.deleteOne();
        const list = await getRecentDocList();
        return res.json({ data: list });
      }
      return res.status(404);
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Internal server error", message: err.message });
    }
  },
  addOneLine: async (req, res) => {
    try {
      const { title, oneLiners } = req.body;

      if (title === undefined || !oneLiners) {
        return res.status(400).json({ message: "Invalid add request" });
      }

      let oneLineData = await OneLineSchema.findOne({ title: title });

      if (!oneLineData) {
        oneLineData = new OneLineSchema({
          title,
          oneLiners,
        });
      } else {
        oneLineData.oneLiners = oneLiners;
      }

      await oneLineData.save();

      return res.json({
        message: "One-line data added successfully",
        oneLiners: oneLineData,
      });
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: "Runtime error", message: err.message });
    }
  },
};
