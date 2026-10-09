/* ==========================================================================
   LUMORA – js/dashboard.js
   Logika halaman Dashboard: menjaga akses (guard) dan proses Sign Out.
   ========================================================================== */

(function () {
  "use strict";

  const STORAGE_KEY_REMEMBER = "lumora.rememberedIdentifier";
  const SESSION_KEY_AUTH     = "lumora.isAuthenticated";
  const SESSION_KEY_NAME     = "lumora.authIdentifier";

  document.addEventListener("DOMContentLoaded", function () {
    // Guard: halaman ini hanya boleh dibuka setelah Sign In berhasil.
    const isAuthenticated = sessionStorage.getItem(SESSION_KEY_AUTH) === "true";
    if (!isAuthenticated) {
      window.location.replace("index.html");
      return;
    }

    const nameEl = document.getElementById("dashboardName");
    const identifier = sessionStorage.getItem(SESSION_KEY_NAME);
    if (nameEl && identifier) {
      nameEl.textContent = ", " + identifier;
    }

    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", function () {
        sessionStorage.removeItem(SESSION_KEY_AUTH);
        sessionStorage.removeItem(SESSION_KEY_NAME);
        localStorage.removeItem(STORAGE_KEY_REMEMBER);
        window.location.href = "index.html";
      });
    }
  });
})();
