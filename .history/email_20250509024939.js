function validateForm() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  // Email regex pattern
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name) {
    showToast("Please enter your name", "error");
    return false;
  }

  if (!email || !emailPattern.test(email)) {
    showToast("Please enter a valid email address", "error");
    return false;
  }

  if (!subject) {
    showToast("Please enter a subject", "error");
    return false;
  }

  if (!message) {
    showToast("Please enter your message", "error");
    return false;
  }

  return true;
}

function showToast(message, type = "success") {
  // Remove existing toast if any
  const existingToast = document.querySelector(".toast-notification");
  if (existingToast) {
    existingToast.remove();
  }

  // Create toast element
  const toast = document.createElement("div");
  toast.className = `toast-notification ${type}`;
  toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 16px 24px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        opacity: 0;
        transform: translateY(100%);
        transition: all 0.3s ease;
        z-index: 1000;
    `;

  // Set background color based on type
  if (type === "error") {
    toast.style.backgroundColor = "#f87171";
    toast.style.color = "#fff";
  } else {
    toast.style.backgroundColor = "#34d399";
    toast.style.color = "#fff";
  }

  toast.textContent = message;
  document.body.appendChild(toast);

  // Show toast
  setTimeout(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translateY(0)";
  }, 100);

  // Hide toast after 3 seconds
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(100%)";
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
}

function sendemail() {
  if (!validateForm()) return;

  const templateParams = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    subject: document.getElementById("subject").value.trim(),
    message: document.getElementById("message").value.trim(),
  };

  // Add loading state to button
  const submitButton = document.querySelector('button[type="submit"]');
  const originalText = submitButton.innerHTML;
  submitButton.disabled = true;
  submitButton.innerHTML =
    '<i class="ri-loader-4-line animate-spin"></i> Sending...';

  emailjs
    .send("service_nvabkad", "template_h6fg9eq", templateParams)
    .then(() => {
      showToast("Email sent successfully!", "success");
      // Clear form fields after successful send
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("subject").value = "";
      document.getElementById("message").value = "";
    })
    .catch((error) => {
      console.error("Email sending failed:", error);
      showToast("Failed to send email. Please try again later.", "error");
    })
    .finally(() => {
      submitButton.disabled = false;
      submitButton.innerHTML = originalText;
    });
}
