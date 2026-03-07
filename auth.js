function loginDiscord() {
  window.location.href = "https://api.nic.baloony.xyz/auth/discord";
}

function logoutDiscord() {
  window.location.href = "https://api.nic.baloony.xyz/logout";
}

async function checkLogin() {
  const userEl = document.getElementById("user");
  const authButton = document.getElementById("authButton");

  if (!userEl || !authButton) return;

  try {
    const res = await fetch("https://api.nic.baloony.xyz/api/me", {
      credentials: "include"
    });

    const data = await res.json();

    if (data.loggedIn) {
      userEl.innerText = "Logged in as " + data.user.username;
      authButton.innerText = "Log out";
      authButton.className = "logout-btn";
      authButton.onclick = logoutDiscord;
    } else {
      userEl.innerText = "Not logged in";
      authButton.innerText = "Login with Discord";
      authButton.className = "portal-btn";
      authButton.onclick = loginDiscord;
    }
  } catch (err) {
    console.error("Login check failed", err);
    userEl.innerText = "Not logged in";
    authButton.innerText = "Login with Discord";
    authButton.className = "portal-btn";
    authButton.onclick = loginDiscord;
  }
}

document.addEventListener("DOMContentLoaded", checkLogin);
