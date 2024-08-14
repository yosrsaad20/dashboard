"use client";
import navbarStyles from "./navbar.module.css";
import sidebarStyles from "@/app/ui/dashboard/sidebar/sidebar.module.css";
import { MdSearch } from "react-icons/md";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Navbar = () => {
  const handleDownload = () => {
    // Hide the navbar
    const navbar = document.querySelector(`.${navbarStyles.container}`);
    if (navbar) {
      navbar.style.display = "none";
    } else {
      console.warn("Navbar element not found");
    }

    // Hide the sidebar and adjust layout
    const sidebar = document.querySelector(`.${sidebarStyles.sidebarContainer}`);
    if (sidebar) {
      sidebar.style.position = "absolute";
      sidebar.style.left = "-9999px"; // Move the sidebar out of view
      sidebar.style.width = "0"; // Remove width to avoid space
      sidebar.style.display = "none";
    } else {
      console.warn("Sidebar element not found");
    }

    // Add a slight delay to ensure layout adjustments are applied
    setTimeout(() => {
      // Capture the content
      html2canvas(document.body, {
        scrollX: 0,
        scrollY: -window.scrollY, // Adjust for any vertical scroll position
        useCORS: true, // Handle CORS for external images
        scale: 2, // Increase resolution for better quality
      }).then(canvas => {
        const imgData = canvas.toDataURL("image/png");

        // Create a new jsPDF instance
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "px",
          format: [canvas.width, canvas.height], // Use canvas dimensions
        });

        // PDF dimensions
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        // Calculate image size and position
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        let position = 0;

        // Add image to PDF and handle multi-page content
        while (position < imgHeight) {
          pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
          position += pdfHeight;
          if (position < imgHeight) pdf.addPage();
        }

        pdf.save("Report.pdf");

        // Restore the navbar and sidebar
        if (navbar) navbar.style.display = "";
        if (sidebar) {
          sidebar.style.position = "";
          sidebar.style.left = "";
          sidebar.style.width = "";
          sidebar.style.display = "";
        }
      }).catch(error => {
        console.error("Failed to generate PDF:", error);

        // Restore the navbar and sidebar in case of an error
        if (navbar) navbar.style.display = "";
        if (sidebar) {
          sidebar.style.position = "";
          sidebar.style.left = "";
          sidebar.style.width = "";
          sidebar.style.display = "";
        }
      });
    }, 500); // Adjust delay as needed
  };

  return (
    <div className={navbarStyles.container}>
      <button onClick={handleDownload} className={navbarStyles.button}>
        Download Report
      </button>
      <div className={navbarStyles.menu}>
        <div className={navbarStyles.search}>
          <MdSearch />
          <input type="text" placeholder="Search..." className={navbarStyles.input} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
