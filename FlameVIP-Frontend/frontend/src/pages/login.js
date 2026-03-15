const API = "https://flamevip-backend.onrender.com";

async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();

  if (!res.ok) {
    document.getElementById("error").innerText = data.error || "Login failed";
    return;
  }

  // Save token
  localStorage.setItem("token", data.token);

  // Redirect to feed
  window.location.href = "feed.html";
}
