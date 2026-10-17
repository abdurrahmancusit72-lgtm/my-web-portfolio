
const loginForm = document.getElementById("admin-login-form");
const loginStatus = document.getElementById("login-status");
const loginButton = document.getElementById("login-button");

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    loginStatus.textContent = "Checking login...";
    loginButton.disabled = true;

    try {
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
            throw new Error(result.message || "Login failed.");
        }

        // Keep the login token in this browser session.
        sessionStorage.setItem("adminToken", result.token);

        loginStatus.textContent = "Login successful! Opening dashboard...";

        window.location.href = "admin-dashboard.html";
    } catch (error) {
        console.error("Login error:", error);
        loginStatus.textContent =
            "Login failed. Check your credentials and ensure the backend is running.";
    } finally {
        loginButton.disabled = false;
    }
});
