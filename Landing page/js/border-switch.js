function updateBorder() {
    const border = document.getElementById("border");
    if (!border) return; 

    if (window.innerWidth <= 768) {
      border.src = "svg/Mobile border.svg";
    } else {
      border.src = "svg/Desktop border.svg";
    }
  }

  window.addEventListener("load", updateBorder);
  window.addEventListener("resize", updateBorder);