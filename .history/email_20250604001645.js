function showToast(message, type = "success") {
    // Remove any existing toast
    document.querySelectorAll('.custom-toast').forEach(t => t.remove());

    // Create toast element
    const toast = document.createElement('div');
    toast.className = `custom-toast ${type}`;
    toast.innerHTML = `
        <div style="
            display: flex;
            align-items: center;
            gap: 0.75rem;
        ">
            <span style="font-size:1.5rem;">${
                type === "success" ? "✅" : "⚠️"
            }</span>
            <span style="font-weight: 500;">${message}</span>
        </div>
    `;
    // Glassmorphism + primary color
    toast.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        z-index: 9999;
        min-width: 240px;
        max-width: 90vw;
        padding: 1rem 1.5rem;
        border-radius: 16px;
        background: rgba(26, 128, 224, 0.35);
        color: #fff;
        backdrop-filter: blur(12px) saturate(180%);
        box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
        border: 1px solid rgba(26, 128, 224, 0.25);
        font-family: 'Inter', 'Poppins', sans-serif;
        font-size: 1rem;
        transition: opacity 0.3s;
        opacity: 1;
    `;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function validateEmail(email) {
    // Simple email regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sendMail() {
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let subject = document.getElementById("subject").value.trim();
    let message = document.getElementById("message").value.trim();

    if (!name || !email || !subject || !message) {
        showToast("Please fill in all fields.", "error");
        return;
    }
    if (!validateEmail(email)) {
        showToast("Please enter a valid email address.", "error");
        return;
    }

    let params = { name, email, subject, message };

    emailjs.send("service_hhc6ycw", "template_pi9h0sh", params)
        .then(function() {
            showToast("Your message has been sent successfully!", "success");
        })
        .catch(function() {
            showToast("Failed to send message. Please try again.", "error");
        });
}