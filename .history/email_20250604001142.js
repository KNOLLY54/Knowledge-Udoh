.toast {
    position: fixed;
    bottom: 40px;
    right: 40px;
    min-width: 280px;
        message: document.getElementById("message").value
    };

    emailjs.send("service_hhc6ycw", "template_pi9h0sh", params)
        .then(function() {
            alert("Your message has been sent successfully!");
        })
        .catch(function(error) {
            alert("Failed to send message. Please try again later.");
            console.error("EmailJS error:", error);
        });
}