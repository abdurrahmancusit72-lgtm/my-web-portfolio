
console.log("Portfolio JavaScript connected successfully!");

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm && formStatus) {
    contactForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const name = document.getElementById("contact-name").value.trim();
        const email = document.getElementById("contact-email").value.trim();
        const message = document.getElementById("contact-message").value.trim();

        if (!name || !email || !message) {
            formStatus.textContent = "Please fill in all fields.";
            return;
        }

        formStatus.textContent = "Sending your message...";

        try {
            const response = await fetch("http://localhost:5000/api/messages", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, message })
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.message || "Message could not be sent.");
            }

            formStatus.textContent = "Message sent successfully! Thank you.";
            contactForm.reset();

        } catch (error) {
            console.error("Contact form error:", error);
            formStatus.textContent =
                "Message could not be sent. Please check the backend and try again.";
        }
    });
}
