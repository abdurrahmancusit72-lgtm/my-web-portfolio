
const token = sessionStorage.getItem("adminToken");

const statusElement = document.getElementById("status");
const messageList = document.getElementById("message-list");
const totalMessages = document.getElementById("total-messages");
const logoutButton = document.getElementById("logout-button");

// Redirect if the admin has not logged in
if (!token) {
    window.location.replace("admin.html");
} else {
    loadMessages();
}

logoutButton.addEventListener("click", () => {
    sessionStorage.removeItem("adminToken");
    window.location.replace("admin.html");
});

async function loadMessages() {
    statusElement.textContent = "Loading messages...";

    try {
        const response = await fetch(
            "http://localhost:5000/api/admin/messages",
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const result = await response.json();

        if (response.status === 401 || response.status === 403) {
            sessionStorage.removeItem("adminToken");
            window.location.replace("admin.html");
            return;
        }

        if (!response.ok || !result.success) {
            throw new Error(result.message || "Could not load messages.");
        }

        totalMessages.textContent = result.count;
        messageList.replaceChildren();

        if (result.messages.length === 0) {
            statusElement.textContent = "No contact messages yet.";
            return;
        }

        statusElement.textContent = "Messages loaded successfully.";

        result.messages.forEach((message) => {
            const card = document.createElement("article");
            card.className = "message-card";

            const name = document.createElement("h3");
            name.textContent = message.name;

            const email = document.createElement("p");
            email.className = "email";
            email.textContent = message.email;

            const content = document.createElement("p");
            content.textContent = message.message;

            const date = document.createElement("p");
            date.className = "date";
            date.textContent = message.createdAt
                ? new Date(message.createdAt).toLocaleString()
                : "Date unavailable";

            card.append(name, email, content, date);
            messageList.appendChild(card);
        });
    } catch (error) {
        console.error("Dashboard error:", error);
        statusElement.textContent =
            "Could not load messages. Check that the backend is running.";
    }
}
