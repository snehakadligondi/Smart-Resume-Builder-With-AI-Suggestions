import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function ResumePreview({ resume }) {
  if (!resume) return <div>No resume saved yet.</div>;

  const downloadPDF = async () => {
    const element = document.getElementById("resume-preview");
    const canvas = await html2canvas(element);
    const img = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    pdf.addImage(img, "PNG", 0, 0, 210, 297);
    pdf.save("resume.pdf");
  };

  return (
    <div>
      <div id="resume-preview" style={{ background: "#fff", padding: 20 }}>
        <h2>{resume.name}</h2>
        <p>{resume.email}</p>
        <h3>Summary</h3><p>{resume.summary}</p>
        <h3>Experience</h3><p>{resume.experience}</p>
        <h3>Education</h3><p>{resume.education}</p>
        <h3>Skills</h3><p>{resume.skills}</p>
      </div>
      <button onClick={downloadPDF}>📄 Download PDF</button>
    </div>
  );
}
