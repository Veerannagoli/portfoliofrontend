const API_BASE_URL = (window.API_BASE_URL || "").replace(/\/$/, "");

const menu = document.getElementById("menu");
menu?.addEventListener("click", () => document.body.classList.toggle("nav-open"));
document.querySelectorAll("nav a").forEach(a => a.addEventListener("click", () => document.body.classList.remove("nav-open")));

const io = new IntersectionObserver(
  es => es.forEach(e => e.isIntersecting && e.target.classList.add("show")),
  { threshold: .12 }
);
document.querySelectorAll(".reveal").forEach(x => io.observe(x));

async function stats() {
  try {
    const r = await fetch(`${API_BASE_URL}/api/stats`, { cache: "no-store" });
    const d = await r.json();
    document.getElementById("views").textContent = Number(d.views || 0).toLocaleString();
    document.getElementById("enquiries").textContent = Number(d.enquiries || 0).toLocaleString();
  } catch (e) {
    // Frontend remains usable if the backend is sleeping/unavailable.
  }
}

async function view() {
  if (!sessionStorage.getItem("gvc_view")) {
    sessionStorage.setItem("gvc_view", "1");
    try {
      await fetch(`${API_BASE_URL}/api/view`, { method: "POST" });
    } catch (e) {}
  }
  stats();
}
view();

const form = document.getElementById("form");
form?.addEventListener("submit", async e => {
  e.preventDefault();
  const msg = document.getElementById("msg");
  const btn = form.querySelector("button");
  btn.disabled = true;
  btn.textContent = "Sending…";

  try {
    const data = Object.fromEntries(new FormData(form).entries());
    const r = await fetch(`${API_BASE_URL}/api/enquiry`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    const d = await r.json();
    msg.textContent = d.message || "Your enquiry has been received.";
    if (d.ok) {
      form.reset();
      stats();
    }
  } catch (err) {
    msg.textContent = "Unable to send right now. Please use WhatsApp or email.";
  }

  btn.disabled = false;
  btn.innerHTML = "Send Enquiry ↗";
});

const modal = document.getElementById("resumeModal");
document.getElementById("resumeBtn")?.addEventListener("click", () => {
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
});
document.getElementById("closeModal")?.addEventListener("click", () => {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
});
modal?.addEventListener("click", e => {
  if (e.target === modal) modal.classList.remove("open");
});
