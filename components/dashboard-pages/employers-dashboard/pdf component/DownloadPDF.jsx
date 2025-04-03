import React, { useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import PDFContent from "./PDFContent";

const DownloadPDF = () => {
  const pdfRef = useRef();

  const generatePDF = async () => {
    const input = pdfRef.current;

    // Convert component to an image
    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    // Add the image (scaled content)
    pdf.addImage(imgData, "PNG", 10, 10, 190, 0);

    // Save the PDF
    pdf.save("User_Report.pdf");
  };

  return (
    <div>
      {/* Hidden Component for PDF Capture */}
      <div style={{ position: "absolute", left: "-9999px" }}>
        <div ref={pdfRef}>
          <PDFContent />
        </div>
      </div>

      {/* Button to Download PDF */}
      <button className="btn btn-primary" onClick={generatePDF}>
        Download PDF
      </button>
    </div>
  );
};

export default DownloadPDF;
