export interface ExtractedPDFContent {
  text: string;
  numpages: number;
  info: any;
}

/**
 * Extracts raw textual content from an uploaded PDF file buffer.
 * Compatible with modern pdf-parse class and Uint8Array binary format.
 */
export async function parsePDFBuffer(buffer: Buffer): Promise<ExtractedPDFContent> {
  try {
    const pdfModule = require('pdf-parse');

    // Modern pdf-parse class export
    if (pdfModule.PDFParse) {
      const uint8 = new Uint8Array(buffer);
      const parser = new pdfModule.PDFParse(uint8);
      const res = await parser.getText();
      return {
        text: res.text || '',
        numpages: res.total || 1,
        info: {},
      };
    }

    // Legacy function export
    if (typeof pdfModule === 'function') {
      const res = await pdfModule(buffer);
      return {
        text: res.text || '',
        numpages: res.numpages || 1,
        info: res.info || {},
      };
    }

    // Fallback if exported as default
    if (typeof pdfModule.default === 'function') {
      const res = await pdfModule.default(buffer);
      return {
        text: res.text || '',
        numpages: res.numpages || 1,
        info: res.info || {},
      };
    }

    throw new Error('Unsupported pdf-parse module format');
  } catch (error: any) {
    console.error('PDF text parsing failed:', error);
    throw new Error(`Failed to extract text from PDF: ${error.message || 'Corrupted or unreadable format'}`);
  }
}
