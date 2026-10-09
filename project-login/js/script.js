/* ==========================================================================
   LUMORA – js/script.js
   Logika halaman Sign In (tanpa framework, tanpa backend).

   Catatan penting:
   Ini adalah simulasi autentikasi di sisi klien (client-side only) memakai
   localStorage/sessionStorage sebagai "database" sementara, murni untuk
   keperluan latihan/demo. Jangan dipakai untuk menyimpan password sungguhan
   di proyek produksi — autentikasi asli wajib divalidasi di server.

   DAFTAR ISI
   1. Akun demo (seed data)
   2. Util: tampilkan pesan feedback
   3. Toggle tampil/sembunyi password
   4. Tombol "Sign in with Google" (placeholder, belum ada OAuth backend)
   5. Validasi & proses submit form sign in
   6. Isi ulang "Remember Me" saat halaman dibuka
   ========================================================================== */

(function () {
  "use strict";

  const STORAGE_KEY_USER     = "lumora.demoUser";
  const STORAGE_KEY_REMEMBER = "lumora.rememberedIdentifier";
  const SESSION_KEY_AUTH     = "lumora.isAuthenticated";
  const SESSION_KEY_NAME     = "lumora.authIdentifier";

  /* ------------------------------------------------------------------
     1. AKUN DEMO
     Dibuat otomatis sekali saja agar form sign in punya kredensial yang
     bisa dicoba tanpa perlu halaman daftar (Sign Up) terlebih dahulu.
  ------------------------------------------------------------------ */
  function seedDemoAccount() {
    if (localStorage.getItem(STORAGE_KEY_USER)) return;

    const demoAccount = {
      email: "demo@lumora.com",
      username: "demo",
      password: "Lumora123", // >= 8 karakter, sesuai minlength di HTML
    };
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(demoAccount));
  }

  /* ------------------------------------------------------------------
     2. UTIL: PESAN FEEDBACK
     Satu area pesan dipakai ulang untuk error, sukses, maupun info,
     dibedakan lewat class agar tetap satu sumber gaya (CSS eksternal).
  ------------------------------------------------------------------ */
  function showFeedback(el, message, type) {
    el.textContent = message;
    el.hidden = false;
    el.classList.remove("is-success", "is-info");
    if (type === "success") el.classList.add("is-success");
    if (type === "info") el.classList.add("is-info");
  }

  function clearFeedback(el) {
    el.hidden = true;
    el.textContent = "";
    el.classList.remove("is-success", "is-info");
  }

  /* ------------------------------------------------------------------
     MAIN: jalankan setelah DOM siap
  ------------------------------------------------------------------ */
  document.addEventListener("DOMContentLoaded", function () {
    seedDemoAccount();

    const form            = document.getElementById("loginForm");
    if (!form) return; // script ini hanya relevan di index.html

    const feedbackEl       = document.getElementById("formFeedback");
    const identifierInput  = document.getElementById("identifier");
    const passwordInput    = document.getElementById("password");
    const rememberInput    = document.getElementById("remember");
    const submitBtn        = document.getElementById("submitBtn");
    const togglePasswordBtn = document.getElementById("togglePassword");
    const googleBtn        = document.getElementById("googleSignIn");

    /* ----------------------------------------------------------------
       3. TOGGLE TAMPIL / SEMBUNYI PASSWORD
    ---------------------------------------------------------------- */
    if (togglePasswordBtn && passwordInput) {
      togglePasswordBtn.addEventListener("click", function () {
        const isHidden = passwordInput.type === "password";
        passwordInput.type = isHidden ? "text" : "password";
        togglePasswordBtn.textContent = isHidden ? "Hide" : "Show";
        togglePasswordBtn.setAttribute("aria-pressed", String(isHidden));
        togglePasswordBtn.setAttribute(
          "aria-label",
          isHidden ? "Hide password" : "Show password"
        );
      });
    }

    /* ----------------------------------------------------------------
       4. TOMBOL GOOGLE (placeholder)
       Sign-in Google asli butuh OAuth client ID + backend untuk menukar
       token, sehingga di luar cakupan proyek statis ini.
    ---------------------------------------------------------------- */
    if (googleBtn) {
      googleBtn.addEventListener("click", function () {
        showFeedback(
          feedbackEl,
          "Sign in with Google belum tersedia pada versi demo ini. Silakan gunakan form email/username di bawah.",
          "info"
        );
      });
    }

    /* ----------------------------------------------------------------
       6. ISI ULANG "REMEMBER ME" SAAT HALAMAN DIBUKA
    ---------------------------------------------------------------- */
    const rememberedIdentifier = localStorage.getItem(STORAGE_KEY_REMEMBER);
    if (rememberedIdentifier && identifierInput && rememberInput) {
      identifierInput.value = rememberedIdentifier;
      rememberInput.checked = true;
    }

    /* ----------------------------------------------------------------
       5. VALIDASI & PROSES SUBMIT
    ---------------------------------------------------------------- */
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      clearFeedback(feedbackEl);

      const identifier = identifierInput.value.trim();
      const password   = passwordInput.value;

      // Validasi dasar (form juga punya "required"/"minlength" sebagai lapis HTML)
      if (!identifier || !password) {
        showFeedback(feedbackEl, "Email/username dan password wajib diisi.", "error");
        (identifier ? passwordInput : identifierInput).focus();
        return;
      }

      if (password.length < 8) {
        showFeedback(feedbackEl, "Password minimal 8 karakter.", "error");
        passwordInput.focus();
        return;
      }

      // Cocokkan dengan akun demo yang tersimpan
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY_USER) || "null");
      const identifierLower = identifier.toLowerCase();
      const isMatch =
        stored &&
        password === stored.password &&
        (identifierLower === stored.email.toLowerCase() ||
          identifierLower === stored.username.toLowerCase());

      if (!isMatch) {
        showFeedback(
          feedbackEl,
          "Email/username atau password salah. Coba akun demo: demo@lumora.com / Lumora123",
          "error"
        );
        passwordInput.value = "";
        passwordInput.focus();
        return;
      }

      // Simpan preferensi "Remember Me"
      if (rememberInput && rememberInput.checked) {
        localStorage.setItem(STORAGE_KEY_REMEMBER, identifier);
      } else {
        localStorage.removeItem(STORAGE_KEY_REMEMBER);
      }

      // Tandai sesi berhasil login, lalu arahkan ke dashboard
      sessionStorage.setItem(SESSION_KEY_AUTH, "true");
      sessionStorage.setItem(SESSION_KEY_NAME, identifier);

      showFeedback(feedbackEl, "Berhasil masuk! Mengarahkan ke dashboard\u2026", "success");
      submitBtn.disabled = true;
      submitBtn.textContent = "Signing in\u2026";

      window.setTimeout(function () {
        window.location.href = "dashboard.html";
      }, 700);
    });
  });
})();
