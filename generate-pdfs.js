const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function convertHTMLtoPDF() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  // Get all HTML files in public directory that end with -print.html
  const publicDir = path.join(__dirname, 'public');
  const files = fs.readdirSync(publicDir).filter(file => file.endsWith('-print.html'));
  
  console.log(`Found ${files.length} HTML files to convert...`);
  
  for (const file of files) {
    const htmlPath = path.join(publicDir, file);
    const pdfName = file.replace('-print.html', '.pdf');
    const pdfPath = path.join(publicDir, pdfName);
    
    console.log(`Converting ${file} to ${pdfName}...`);
    
    try {
      // Load the HTML file
      await page.goto(`file://${htmlPath}`, {
        waitUntil: 'networkidle2'
      });
      
      // Generate PDF with print-friendly settings
      await page.pdf({
        path: pdfPath,
        format: 'A4',
        printBackground: true,
        margin: {
          top: '20mm',
          right: '20mm',
          bottom: '20mm',
          left: '20mm'
        }
      });
      
      console.log(`✓ Created ${pdfName}`);
    } catch (error) {
      console.error(`✗ Failed to convert ${file}: ${error.message}`);
    }
  }
  
  await browser.close();
  console.log('\nPDF generation complete!');
}

// Run the conversion
convertHTMLtoPDF().catch(console.error);