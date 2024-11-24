

document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
  
    document.getElementById("full-name-preview").textContent = urlParams.get("full-name");
    document.getElementById("email-preview").textContent = urlParams.get("email");
    document.getElementById("mobile-preview").textContent = urlParams.get("mobile");
    document.getElementById("dob-preview").textContent = urlParams.get("dob");
    document.getElementById("gender-preview").textContent = urlParams.get("gender");
  
    const photo = urlParams.get("photo");
    if (photo) {
      document.getElementById("photo-preview").src = photo;
    }
  });
  