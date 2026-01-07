(function () {
  const CONSENT_KEY = "cookieConsent";

  function getConsent() {
    return localStorage.getItem(CONSENT_KEY);
  }

  function setConsent(value) {
    localStorage.setItem(CONSENT_KEY, value);
  }

  function hideBanner() {
    const banner = document.getElementById("cookie-banner");
    if (banner) banner.style.display = "none";
  }

  function showBanner() {
    const banner = document.getElementById("cookie-banner");
    if (banner) banner.style.display = "block";
  }

  function loadFirebaseAnalytics() {
    // Prevent double loading
    if (window.__firebaseLoaded) return;
    window.__firebaseLoaded = true;

    const script = document.createElement("script");
    script.type = "module";
    script.innerHTML = `
      import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
      import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-analytics.js";

      const firebaseConfig = {
        apiKey: "AIzaSyC6NoywIa0IOrDji1truVivCkl_Yx_nVag",
        authDomain: "log-in-tracker.firebaseapp.com",
        projectId: "log-in-tracker",
        storageBucket: "log-in-tracker.firebasestorage.app",
        messagingSenderId: "924712629483",
        appId: "1:924712629483:web:18a2a08cddd35014647aae",
        measurementId: "G-KZL2EGKP6S"
      };

      const app = initializeApp(firebaseConfig);
      getAnalytics(app);
    `;
    document.body.appendChild(script);
  }

  document.addEventListener("DOMContentLoaded", function () {
    const acceptBtn = document.getElementById("accept-cookies");
    const rejectBtn = document.getElementById("reject-cookies");

    const consent = getConsent();

    if (!consent) {
      showBanner();
    } else {
      hideBanner();
      if (consent === "accepted") {
        loadFirebaseAnalytics();
      }
    }

    if (acceptBtn) {
      acceptBtn.addEventListener("click", function () {
        setConsent("accepted");
        hideBanner();
        loadFirebaseAnalytics();
      });
    }

    if (rejectBtn) {
      rejectBtn.addEventListener("click", function () {
        setConsent("rejected");
        hideBanner();
      });
    }
  });
})();
