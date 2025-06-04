.then(function() {
    showToast("Your message has been sent successfully!", "success");
    document.getElementById("contactForm").reset(); // <-- Add this line
})
