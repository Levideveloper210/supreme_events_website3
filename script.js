(() => {
  "use strict";

  const yearElements = document.querySelectorAll("[data-year]");
  const currentYear = String(new Date().getFullYear());
  yearElements.forEach(element => { element.textContent = currentYear; });

  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  if (toggle && nav) {
    const closeMenu = () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open navigation");
      toggle.innerHTML = "<span></span><span></span>";
    };
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
      toggle.innerHTML = isOpen ? "<span></span><span></span>" : "<span></span><span></span>";
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
    document.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        closeMenu();
        toggle.focus();
      }
    });
    document.addEventListener("click", event => {
      if (!nav.contains(event.target) && !toggle.contains(event.target)) closeMenu();
    });
  }

  const form = document.getElementById("feedbackForm");
  if (form) {
    form.addEventListener("submit", event => {
      event.preventDefault();
      const note = document.getElementById("formNote");
      if (!form.reportValidity()) {
        if (note) {
          note.textContent = "Please complete the required fields before continuing.";
          note.classList.add("error");
        }
        return;
      }
      const data = new FormData(form);
      const getValue = key => String(data.get(key) || "").trim();
      const message = [
        "Hello Supreme Events,",
        "",
        "Website message: " + getValue("feedbackType"),
        "Name: " + getValue("visitorName"),
        "Contact: " + (getValue("visitorContact") || "Not provided"),
        "",
        "Message:",
        getValue("visitorMessage")
      ].join("\n");
      const whatsappUrl = "https://wa.me/2348063440543?text=" + encodeURIComponent(message);
      const openedWindow = window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      if (note) {
        note.classList.remove("error");
        note.textContent = openedWindow
          ? "WhatsApp has opened with your message prepared. Review it and press Send to deliver it."
          : "Your browser blocked the new tab. Please allow pop-ups or use the WhatsApp button to contact us directly.";
      }
    });
  }
})();