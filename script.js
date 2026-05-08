let heroIndex = 0;
let heroData = [];
const providerColors = ["#667eea", "#4caf50", "#f97316", "#2563eb"];

document.addEventListener("DOMContentLoaded", () => {
  // Fetch configuration schema from data.json
  fetch("data.json")
    .then((response) => response.json())
    .then((jsonData) => {
      heroData = jsonData.heroContent;
      startHeroLoop();
      renderUserStats(jsonData.userStats);
      renderAboutSection(jsonData.aboutUs);
    });

  // Page Tab Navigation
  document
    .querySelectorAll(".nav-links button, .bottom-tabs button")
    .forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = btn.dataset.target;
        if (target) {
          showSection(target);
          setActiveNav(target);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      });
    });

  // Form Interceptor & Automated WhatsApp Engine
  const enquiryForm = document.getElementById("enquiryForm");
  if (enquiryForm) {
    enquiryForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Fetch Form Inputs
      const name = document.getElementById("enqName").value.trim();
      const mobile = document.getElementById("enqMobile").value.trim();
      const email = document.getElementById("enqEmail").value.trim();
      const message = document.getElementById("enqMessage").value.trim();

      // Construct Whatsapp String
      const payload =
        `*New AdvisorOne Enquiry*\n` +
        `---------------------------\n` +
        `*👤 Name:* ${name}\n` +
        `*📞 Mobile:* ${mobile}\n` +
        `*✉️ Email:* ${email}\n` +
        `*💬 Message:* ${message}\n` +
        `---------------------------\n` +
        `_Submitted via AdvisorOne portal._`;

      // Configured support phone line matching floating button default (1234567890)
      const targetWhatsAppNumber = "1234567890";
      const formattedURL = `https://wa.me/${targetWhatsAppNumber}?text=${encodeURIComponent(payload)}`;

      // Launch redirect to WhatsApp
      window.open(formattedURL, "_blank");
      enquiryForm.reset();
    });
  }

  showSection("home");
  setActiveNav("home");
});

// Cycles hero statements and assets
function startHeroLoop() {
  if (!heroData || heroData.length === 0) return;

  function updateDisplay() {
    const current = heroData[heroIndex];
    const heroContent = document.querySelector(".hero-content");
    const heroImage = document.querySelector(".hero-image");

    if (heroContent) {
      heroContent.querySelector(".hero-tag").textContent = current.tag;
      // Highlight structure
      heroContent.querySelector(".hero-title").innerHTML =
        current.title.replace("Is", "<br>Is");
      heroContent.querySelector(".hero-description").textContent =
        current.description;
    }

    if (heroImage) {
      heroImage.style.opacity = "0";
      setTimeout(() => {
        heroImage.innerHTML = `<img src="${current.mainImage}" alt="${current.title}">`;
        heroImage.style.opacity = "1";
      }, 300);
    }

    heroIndex = (heroIndex + 1) % heroData.length;
  }

  updateDisplay();
  setInterval(updateDisplay, 5000); // 5 second cycle loop
}

function showSection(sectionId) {
  const sections = ["home", "about", "contact", "products"];
  sections.forEach((id) => {
    const section = document.getElementById(id);
    if (section) {
      section.style.display = id === sectionId ? "block" : "none";
    }
  });
}

function setActiveNav(sectionId) {
  document
    .querySelectorAll(".nav-links button, .bottom-tabs button")
    .forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.target === sectionId);
    });
}

function renderUserStats(stats) {
  const grid = document.getElementById("statsGrid");
  if (!grid) return;

  grid.innerHTML = stats
    .map(
      (item) => `
        <div class="stat-card">
            <span class="stat-icon">${item.icon}</span>
            <div class="stat-count">${item.count}</div>
            <div class="stat-label">${item.label}</div>
        </div>
    `,
    )
    .join("");
}

function renderAboutSection(data) {
  // Advisor Identity & Qualification
  const imgElement = document.getElementById("aboutAdvisorImg");
  const fallbackSvg = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cdefs%3E%3ClinearGradient id='pGrad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23667eea;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23764ba2;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Ccircle cx='100' cy='100' r='100' fill='url(%23pGrad)' /%3E%3Ctext x='100' y='125' text-anchor='middle' fill='white' font-family='Arial' font-size='90'%3E👤%3C/text%3E%3C/svg%3E`;
  // Set Image or Placeholder
  imgElement.src = data.advisor.image || fallbackSvg;
  document.getElementById("aboutAdvisorName").textContent = data.advisor.name;
  document.getElementById("aboutAdvisorRole").textContent = data.advisor.role;
  document.getElementById("aboutQualification").textContent =
    data.advisor.qualifications;

  // Company & Portfolio Details
  document.getElementById("aboutTitle").textContent = data.title;
  document.getElementById("aboutDescription").textContent = data.description;
  document.getElementById("aboutPartnerExp").textContent =
    data.advisor.partnerExperience;
  document.getElementById("aboutPortfolio").textContent =
    data.advisor.portfolio;
  document.getElementById("aboutMission").textContent = data.mission;

  const certContainer = document.getElementById("aboutCertifications");
  certContainer.innerHTML = data.advisor.certifications
    .map(
      (cert) => `
        <li>${cert}</li>
    `,
    )
    .join("");

  // Stats Grid
  const statsContainer = document.getElementById("aboutStatsGrid");
  statsContainer.innerHTML = data.stats
    .map(
      (stat) => `
        <div class="stat-item">
            <h3 style="margin:0; color:#667eea;">${stat.value}</h3>
            <p style="margin:0; font-size:0.85rem; font-weight:600;">${stat.label}</p>
        </div>
    `,
    )
    .join("");
}

document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactEnquiryForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("conName").value;
      const email = document.getElementById("conEmail").value;
      const subject = document.getElementById("conSubject").value;
      const message = document.getElementById("conMessage").value;

      // Use the same target number defined in your global config or hardcode here
      const phoneNumber = "911234567890";

      const whatsappMessage =
        `*Contact Page Enquiry*%0A%0A` +
        `*Name:* ${encodeURIComponent(name)}%0A` +
        `*Email:* ${encodeURIComponent(email)}%0A` +
        `*Interest:* ${encodeURIComponent(subject)}%0A` +
        `*Message:* ${encodeURIComponent(message)}`;

      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;
      window.open(whatsappUrl, "_blank");
      contactForm.reset();
    });
  }
});
