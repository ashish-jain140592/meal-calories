// ── FOOD DATA ─────────────────────────────────────────────────────────────────
const FOODS = [
  { name: "Milk",                      icon: "🥛", metric: "ml",   cal: 0.500,  protein: 0.0360, carbs: 0.0550, fat: 0.0150, fiber: 0.000 },
  { name: "Oats",                      icon: "🌾", metric: "g",    cal: 4.100,  protein: 0.1200, carbs: 0.6830, fat: 0.1000, fiber: 0.095 },
  { name: "Protein Powder",            icon: "💪", metric: "g",    cal: 3.690,  protein: 0.7270, carbs: 0.0800, fat: 0.0520, fiber: 0.016 },
  { name: "Basil Seeds",               icon: "🌿", metric: "unit", cal: 14.000, protein: 0.6920, carbs: 1.9200, fat: 0.1640, fiber: 1.120 },
  { name: "Sweet Potato",              icon: "🍠", metric: "g",    cal: 0.900,  protein: 0.0100, carbs: 0.2000, fat: 0.0030, fiber: 0.030 },
  { name: "Oats / Daliya / Cheela",    icon: "🥣", metric: "unit", cal: 230.00, protein: 5.0000, carbs: 30.000, fat: 1.0000, fiber: 4.000 },
  { name: "Tea",                       icon: "☕", metric: "ml",   cal: 75.000, protein: 5.4000, carbs: 8.2500, fat: 2.2500, fiber: 0.000 },
  { name: "Vegetable",                 icon: "🥦", metric: "g",    cal: 0.700,  protein: 0.0200, carbs: 0.0700, fat: 0.0250, fiber: 0.020 },
  { name: "Rotis (w/ ghee)",           icon: "🫓", metric: "unit", cal: 120.00, protein: 3.0000, carbs: 16.000, fat: 5.0000, fiber: 2.000 },
  { name: "Curd",                      icon: "🍶", metric: "ml",   cal: 0.790,  protein: 0.0400, carbs: 0.0620, fat: 0.0450, fiber: 0.000 },
  { name: "Pumpkin Seeds",             icon: "🎃", metric: "unit", cal: 22.800, protein: 0.9500, carbs: 2.6150, fat: 0.9500, fiber: 0.000 },
  { name: "Flax Seeds",                icon: "🌱", metric: "unit", cal: 13.475, protein: 0.5500, carbs: 0.8250, fat: 0.8750, fiber: 0.000 },
  { name: "Chia Seeds",                icon: "🫘", metric: "unit", cal: 25.400, protein: 0.8500, carbs: 1.9500, fat: 1.5750, fiber: 1.700 },
  { name: "Fruit",                     icon: "🍑", metric: "g",    cal: 0.800,  protein: 0.0060, carbs: 0.1400, fat: 0.0020, fiber: 0.024 },
  { name: "Dal",                       icon: "🍲", metric: "g",    cal: 1.200,  protein: 0.0700, carbs: 0.1800, fat: 0.0050, fiber: 0.050 },
  { name: "Paneer",                    icon: "🧀", metric: "g",    cal: 2.700,  protein: 0.1800, carbs: 0.0250, fat: 0.2100, fiber: 0.000 },
  { name: "Sesame Seeds",              icon: "🌰", metric: "unit", cal: 24.480, protein: 0.9200, carbs: 0.8800, fat: 1.9200, fiber: 0.000 },
  { name: "Sunflower Seeds",           icon: "🌻", metric: "unit", cal: 31.450, protein: 1.1500, carbs: 1.1500, fat: 2.4000, fiber: 0.000 },
  { name: "Cucumber / Beetroot Salad", icon: "🥗", metric: "unit", cal: 40.000, protein: 1.0000, carbs: 4.0000, fat: 0.3000, fiber: 1.000 },
  { name: "Walnuts",                   icon: "🌰", metric: "unit", cal: 13.000, protein: 0.3000, carbs: 0.3000, fat: 1.3000, fiber: 0.100 },
  { name: "Almonds",                   icon: "🥜", metric: "unit", cal: 7.0000, protein: 0.3000, carbs: 0.2000, fat: 0.6000, fiber: 0.100 },
  { name: "Apple",                     icon: "🍎", metric: "g",    cal: 0.520,  protein: 0.0025, carbs: 0.1400, fat: 0.0015, fiber: 0.024 },
  { name: "Banana",                    icon: "🍌", metric: "g",    cal: 0.900,  protein: 0.0110, carbs: 0.2300, fat: 0.0030, fiber: 0.026 },
  { name: "Berries",                   icon: "🫐", metric: "unit", cal: 2.0000, protein: 0.0500, carbs: 0.7000, fat: 0.0200, fiber: 0.200 },
  { name: "Foxnuts",                   icon: "🪷", metric: "unit", cal: 0.0350, protein: 0.0010, carbs: 0.0077, fat: 0.0000, fiber: 0.001 },
  { name: "Soup",                      icon: "🍵", metric: "ml",   cal: 0.3333, protein: 0.0133, carbs: 0.0467, fat: 0.0067, fiber: 0.010 },
];

const MEAL_TYPES = [
  { id: "breakfast", label: "Breakfast", icon: "🌅" },
  { id: "lunch",     label: "Lunch",     icon: "☀️" },
  { id: "dinner",    label: "Dinner",    icon: "🌙" },
];

// ── HELPERS ───────────────────────────────────────────────────────────────────
function dateKey(d) { return d.toISOString().slice(0, 10); }

function fmt(n) {
  return Number.isFinite(n) ? (n < 10 ? n.toFixed(1) : Math.round(n)).toString() : "0";
}

function fmtDate(d) {
  const today = new Date();
  const yesterday = new Date(today); yesterday.setDate(today.getDate() - 1);
  if (dateKey(d) === dateKey(today)) return "Today";
  if (dateKey(d) === dateKey(yesterday)) return "Yesterday";
  return d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });
}

function defaultMealType() {
  const h = new Date().getHours();
  if (h < 11) return "breakfast";
  if (h < 16) return "lunch";
  return "dinner";
}

function calcEntry(food, qty, mealType) {
  return {
    id: Date.now() + Math.random(),
    foodName: food.name,
    icon: food.icon,
    metric: food.metric,
    mealType,
    qty,
    cal:     Math.round(food.cal     * qty * 10) / 10,
    protein: Math.round(food.protein * qty * 10) / 10,
    carbs:   Math.round(food.carbs   * qty * 10) / 10,
    fat:     Math.round(food.fat     * qty * 10) / 10,
    fiber:   Math.round(food.fiber   * qty * 10) / 10,
  };
}

function sumLog(log) {
  return log.reduce(
    (acc, e) => ({
      cal:     acc.cal     + e.cal,
      protein: acc.protein + e.protein,
      carbs:   acc.carbs   + e.carbs,
      fat:     acc.fat     + e.fat,
      fiber:   acc.fiber   + e.fiber,
    }),
    { cal: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 }
  );
}

// ── AUTH ──────────────────────────────────────────────────────────────────────
async function hashPassword(pw) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(pw));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
}

function getUsers() {
  try { return JSON.parse(localStorage.getItem("ct_users") || "{}"); } catch { return {}; }
}

function saveUsers(u) { localStorage.setItem("ct_users", JSON.stringify(u)); }

function getSession() {
  try { return JSON.parse(localStorage.getItem("ct_session") || "null"); } catch { return null; }
}

function saveSession(s) { localStorage.setItem("ct_session", JSON.stringify(s)); }
function clearSession()  { localStorage.removeItem("ct_session"); }

async function register(name, email, password) {
  if (!name.trim()) return "Name is required.";
  if (!email.includes("@")) return "Enter a valid email.";
  if (password.length < 6) return "Password must be at least 6 characters.";
  const users = getUsers();
  if (users[email.toLowerCase()]) return "An account with this email already exists.";
  const hash = await hashPassword(password);
  users[email.toLowerCase()] = { name: name.trim(), passwordHash: hash };
  saveUsers(users);
  return null;
}

async function login(email, password) {
  const users = getUsers();
  const user = users[email.toLowerCase()];
  if (!user) return "No account found with this email.";
  const hash = await hashPassword(password);
  if (hash !== user.passwordHash) return "Incorrect password.";
  return null;
}

// ── STORAGE (per-user) ────────────────────────────────────────────────────────
function storageKey(email) { return `mealLog_${email.toLowerCase()}`; }

function loadData(email) {
  try { return JSON.parse(localStorage.getItem(storageKey(email)) || "{}"); } catch { return {}; }
}

function saveData(email, data) {
  localStorage.setItem(storageKey(email), JSON.stringify(data));
}

function getLog(data, key) { return data[key] || []; }

// ── STATE ─────────────────────────────────────────────────────────────────────
let state = {
  session: null,           // { email, name }
  data: {},
  currentDate: new Date(),
  selectedFood: null,
  selectedMeal: defaultMealType(),
  view: "today",
};

// ── DOM REFS ──────────────────────────────────────────────────────────────────
const $ = id => document.getElementById(id);

// Auth
const authScreen   = $("auth-screen");
const authForm     = $("auth-form");
const authTabs     = document.querySelectorAll(".auth-tab");
const nameGroup    = $("name-group");
const authName     = $("auth-name");
const authEmail    = $("auth-email");
const authPassword = $("auth-password");
const authError    = $("auth-error");
const btnAuth      = $("btn-auth");

// App
const appEl        = $("app");
const greeting     = $("greeting");
const btnLogout    = $("btn-logout");
const navBtns      = document.querySelectorAll(".nav-btn");
const views        = { today: $("view-today"), week: $("view-week") };

// Today
const dateLabel    = $("date-label");
const prevDayBtn   = $("prev-day");
const nextDayBtn   = $("next-day");
const totals       = {
  cal:     $("total-cal"),
  protein: $("total-protein"),
  carbs:   $("total-carbs"),
  fat:     $("total-fat"),
  fiber:   $("total-fiber"),
};
const logContainer  = $("log-container");
const foodSearch    = $("food-search");
const foodCatalog   = $("food-catalog");

// Qty modal
const qtyOverlay   = $("qty-overlay");
const closeQtyBtn  = $("close-qty");
const qtyItemName  = $("qty-item-name");
const qtyInfo      = $("qty-info");
const qtyInput     = $("qty-input");
const qtyUnit      = $("qty-unit");
const qtyPreview   = $("qty-preview");
const confirmAdd   = $("confirm-add");
const mealBtns     = document.querySelectorAll(".meal-btn");

// Week
const weekRange    = $("week-range");

let chartCalories = null;
let chartMealType = null;
let chartMacros   = null;
let chartProtein  = null;

// ── AUTH UI ───────────────────────────────────────────────────────────────────
let authMode = "login"; // "login" | "signup"

authTabs.forEach(tab => {
  tab.addEventListener("click", () => {
    authMode = tab.dataset.tab;
    authTabs.forEach(t => t.classList.toggle("active", t === tab));
    nameGroup.classList.toggle("hidden", authMode === "login");
    btnAuth.textContent = authMode === "login" ? "Sign In" : "Create Account";
    authError.textContent = "";
    authForm.reset();
  });
});

// Start with name field hidden (login mode)
nameGroup.classList.add("hidden");

authForm.addEventListener("submit", async e => {
  e.preventDefault();
  authError.textContent = "";
  btnAuth.disabled = true;
  btnAuth.textContent = "Please wait…";

  const email    = authEmail.value.trim();
  const password = authPassword.value;
  const name     = authName.value.trim();

  try {
    if (authMode === "signup") {
      const err = await register(name, email, password);
      if (err) { authError.textContent = err; return; }
    }

    const err = await login(email, password);
    if (err) { authError.textContent = err; return; }

    const users = getUsers();
    const user  = users[email.toLowerCase()];
    state.session = { email: email.toLowerCase(), name: user.name };
    saveSession(state.session);
    startApp();
  } finally {
    btnAuth.disabled = false;
    btnAuth.textContent = authMode === "login" ? "Sign In" : "Create Account";
  }
});

function startApp() {
  authScreen.classList.add("hidden");
  appEl.classList.remove("app-hidden");

  state.data        = loadData(state.session.email);
  state.currentDate = new Date();

  greeting.textContent = `Hi, ${state.session.name}`;
  renderToday();
  renderFoodCatalog();
}

btnLogout.addEventListener("click", () => {
  clearSession();
  state.session = null;
  state.data    = {};
  appEl.classList.add("app-hidden");
  authScreen.classList.remove("hidden");
  authForm.reset();
  authMode = "login";
  nameGroup.classList.add("hidden");
  btnAuth.textContent = "Sign In";
  authTabs.forEach(t => t.classList.toggle("active", t.dataset.tab === "login"));
});

// ── RENDER: TODAY ─────────────────────────────────────────────────────────────
function renderToday() {
  const key = dateKey(state.currentDate);
  const log = getLog(state.data, key);

  dateLabel.textContent = fmtDate(state.currentDate);
  const today = new Date();
  nextDayBtn.disabled = dateKey(state.currentDate) >= dateKey(today);
  nextDayBtn.style.opacity = nextDayBtn.disabled ? "0.35" : "";

  const s = sumLog(log);
  totals.cal.textContent     = fmt(s.cal);
  totals.protein.textContent = fmt(s.protein) + "g";
  totals.carbs.textContent   = fmt(s.carbs)   + "g";
  totals.fat.textContent     = fmt(s.fat)      + "g";
  totals.fiber.textContent   = fmt(s.fiber)   + "g";

  renderLogContainer(log, key);
}

function renderLogContainer(log, key) {
  logContainer.innerHTML = "";

  if (log.length === 0) {
    logContainer.innerHTML = `
      <div class="log-empty">
        <div class="log-empty-icon">🍽️</div>
        <p>Nothing logged yet.<br/>Choose a food below to add it.</p>
      </div>
    `;
    return;
  }

  MEAL_TYPES.forEach(meal => {
    const entries = log.filter(e => (e.mealType || "lunch") === meal.id);
    if (entries.length === 0) return;

    const mealCal = Math.round(entries.reduce((s, e) => s + e.cal, 0));
    const group = document.createElement("div");
    group.className = "meal-group";
    group.dataset.meal = meal.id;

    const header = document.createElement("div");
    header.className = "meal-group-header";
    header.innerHTML = `
      <span class="meal-group-icon">${meal.icon}</span>
      <span class="meal-group-label">${meal.label}</span>
      <span class="meal-group-cal">${mealCal} kcal</span>
    `;
    group.appendChild(header);

    const list = document.createElement("div");
    list.className = "log-list";

    entries.forEach(entry => {
      const item = document.createElement("div");
      item.className = "log-item";
      item.innerHTML = `
        <div class="log-item-icon">${entry.icon || "🍽️"}</div>
        <div class="log-item-info">
          <div class="log-item-name">${entry.foodName}</div>
          <div class="log-item-qty">${entry.qty} ${entry.metric}</div>
        </div>
        <div class="log-item-macros">
          <span class="log-macro-pill pill-cal">${fmt(entry.cal)} kcal</span>
          <span class="log-macro-pill pill-p">${fmt(entry.protein)}g P</span>
          <span class="log-macro-pill pill-c">${fmt(entry.carbs)}g C</span>
          <span class="log-macro-pill pill-f">${fmt(entry.fat)}g F</span>
        </div>
        <button class="log-item-delete" data-id="${entry.id}" title="Remove">&#10005;</button>
      `;
      list.appendChild(item);
    });

    list.querySelectorAll(".log-item-delete").forEach(btn => {
      btn.addEventListener("click", () => {
        state.data[key] = state.data[key].filter(e => e.id !== parseFloat(btn.dataset.id));
        saveData(state.session.email, state.data);
        renderToday();
      });
    });

    group.appendChild(list);
    logContainer.appendChild(group);
  });
}

// ── RENDER: FOOD CATALOG ──────────────────────────────────────────────────────
function renderFoodCatalog(query = "") {
  const q = query.trim().toLowerCase();
  const filtered = q ? FOODS.filter(f => f.name.toLowerCase().includes(q)) : FOODS;

  foodCatalog.innerHTML = "";

  if (filtered.length === 0) {
    foodCatalog.innerHTML = `<div class="catalog-no-results">No items found for "<strong>${query}</strong>"</div>`;
    return;
  }

  filtered.forEach(food => {
    const card = document.createElement("div");
    card.className = "catalog-card";
    const calPer   = food.metric === "unit" ? food.cal : food.cal * 100;
    const perLabel = food.metric === "unit" ? "/unit"  : `/100${food.metric}`;

    card.innerHTML = `
      <span class="catalog-metric">${food.metric}</span>
      <div class="catalog-icon">${food.icon}</div>
      <div class="catalog-name">${food.name}</div>
      <div class="catalog-cal">${Math.round(calPer * 10) / 10} kcal ${perLabel}</div>
      <button class="catalog-add" title="Add to log">+</button>
    `;

    card.addEventListener("click", () => openQtyModal(food));
    foodCatalog.appendChild(card);
  });
}

// ── QTY MODAL ─────────────────────────────────────────────────────────────────
function openQtyModal(food) {
  state.selectedFood = food;
  setActiveMeal(state.selectedMeal);

  qtyItemName.textContent = `${food.icon}  ${food.name}`;
  qtyUnit.textContent = food.metric;

  const calPer = food.metric === "unit" ? food.cal     : food.cal     * 100;
  const pPer   = food.metric === "unit" ? food.protein : food.protein * 100;
  const cPer   = food.metric === "unit" ? food.carbs   : food.carbs   * 100;
  const fPer   = food.metric === "unit" ? food.fat     : food.fat     * 100;
  const label  = food.metric === "unit" ? "per unit"  : `per 100${food.metric}`;

  qtyInfo.innerHTML = `
    <strong>${Math.round(calPer * 10) / 10} kcal</strong> ${label} &nbsp;|&nbsp;
    P: ${Math.round(pPer * 10) / 10}g &nbsp;
    C: ${Math.round(cPer * 10) / 10}g &nbsp;
    F: ${Math.round(fPer * 10) / 10}g
  `;

  qtyInput.value = "";
  qtyPreview.textContent = "";
  confirmAdd.disabled = true;
  qtyOverlay.classList.add("open");
  setTimeout(() => qtyInput.focus(), 200);
}

function closeQtyModal() {
  qtyOverlay.classList.remove("open");
  state.selectedFood = null;
}

function setActiveMeal(mealId) {
  state.selectedMeal = mealId;
  mealBtns.forEach(b => b.classList.toggle("active", b.dataset.meal === mealId));
}

mealBtns.forEach(btn => {
  btn.addEventListener("click", () => setActiveMeal(btn.dataset.meal));
});

// ── RENDER: WEEK ──────────────────────────────────────────────────────────────
function getWeekDates() {
  const today = new Date();
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (6 - i));
    return d;
  });
}

function renderWeek() {
  const days  = getWeekDates();
  const labels = days.map(d =>
    d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric" })
  );

  weekRange.textContent =
    days[0].toLocaleDateString("en-IN", { day: "numeric", month: "short" }) +
    " – " +
    days[6].toLocaleDateString("en-IN", { day: "numeric", month: "short" });

  const logs = days.map(d => getLog(state.data, dateKey(d)));
  const sums = logs.map(sumLog);

  const calData     = sums.map(s => Math.round(s.cal));
  const proteinData = sums.map(s => Math.round(s.protein * 10) / 10);
  const carbsData   = sums.map(s => Math.round(s.carbs   * 10) / 10);
  const fatData     = sums.map(s => Math.round(s.fat     * 10) / 10);
  const fiberData   = sums.map(s => Math.round(s.fiber   * 10) / 10);

  // Meal-type breakdown per day
  const mealCalData = MEAL_TYPES.map(meal =>
    logs.map(log => {
      const entries = log.filter(e => (e.mealType || "lunch") === meal.id);
      return Math.round(entries.reduce((s, e) => s + e.cal, 0));
    })
  );

  const baseOpts = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#111827",
        titleFont: { family: "Inter", size: 12 },
        bodyFont:  { family: "Inter", size: 12 },
        padding: 10,
        cornerRadius: 8,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { family: "Inter", size: 11 }, color: "#6b7280" },
      },
      y: {
        grid: { color: "#f1f3f5" },
        ticks: { font: { family: "Inter", size: 11 }, color: "#6b7280" },
        beginAtZero: true,
      },
    },
  };

  // 1. Daily calories bar
  if (chartCalories) chartCalories.destroy();
  chartCalories = new Chart($("chart-calories"), {
    type: "bar",
    data: {
      labels,
      datasets: [{
        label: "Calories",
        data: calData,
        backgroundColor: "rgba(14,165,233,0.75)",
        borderColor: "#0ea5e9",
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      }],
    },
    options: {
      ...baseOpts,
      plugins: {
        ...baseOpts.plugins,
        tooltip: { ...baseOpts.plugins.tooltip, callbacks: { label: ctx => ` ${ctx.parsed.y} kcal` } },
      },
    },
  });

  // 2. Calories by meal type stacked
  if (chartMealType) chartMealType.destroy();
  chartMealType = new Chart($("chart-meal-type"), {
    type: "bar",
    data: {
      labels,
      datasets: [
        { label: "Breakfast", data: mealCalData[0], backgroundColor: "rgba(245,158,11,0.85)",  stack: "m" },
        { label: "Lunch",     data: mealCalData[1], backgroundColor: "rgba(14,165,233,0.85)",  stack: "m" },
        { label: "Dinner",    data: mealCalData[2], backgroundColor: "rgba(139,92,246,0.85)",  stack: "m" },
      ],
    },
    options: {
      ...baseOpts,
      plugins: {
        ...baseOpts.plugins,
        legend: {
          display: true,
          position: "bottom",
          labels: { font: { family: "Inter", size: 11 }, color: "#6b7280", boxWidth: 12, padding: 12 },
        },
        tooltip: { ...baseOpts.plugins.tooltip, callbacks: { label: ctx => ` ${ctx.dataset.label}: ${ctx.parsed.y} kcal` } },
      },
      scales: {
        x: { ...baseOpts.scales.x, stacked: true },
        y: { ...baseOpts.scales.y, stacked: true },
      },
    },
  });

  // 3. Macros stacked
  if (chartMacros) chartMacros.destroy();
  chartMacros = new Chart($("chart-macros"), {
    type: "bar",
    data: {
      labels,
      datasets: [
        { label: "Protein", data: proteinData, backgroundColor: "rgba(16,185,129,0.85)",  stack: "m" },
        { label: "Carbs",   data: carbsData,   backgroundColor: "rgba(245,158,11,0.85)",  stack: "m" },
        { label: "Fat",     data: fatData,     backgroundColor: "rgba(239,68,68,0.85)",   stack: "m" },
        { label: "Fiber",   data: fiberData,   backgroundColor: "rgba(139,92,246,0.85)",  stack: "m" },
      ],
    },
    options: {
      ...baseOpts,
      plugins: {
        ...baseOpts.plugins,
        legend: {
          display: true,
          position: "bottom",
          labels: { font: { family: "Inter", size: 11 }, color: "#6b7280", boxWidth: 12, padding: 12 },
        },
        tooltip: { ...baseOpts.plugins.tooltip, callbacks: { label: ctx => ` ${ctx.dataset.label}: ${ctx.parsed.y}g` } },
      },
      scales: {
        x: { ...baseOpts.scales.x, stacked: true },
        y: { ...baseOpts.scales.y, stacked: true },
      },
    },
  });

  // 4. Protein trend line
  if (chartProtein) chartProtein.destroy();
  chartProtein = new Chart($("chart-protein"), {
    type: "line",
    data: {
      labels,
      datasets: [{
        label: "Protein (g)",
        data: proteinData,
        borderColor: "#10b981",
        backgroundColor: "rgba(16,185,129,0.1)",
        borderWidth: 2.5,
        pointBackgroundColor: "#10b981",
        pointRadius: 5,
        pointHoverRadius: 7,
        fill: true,
        tension: 0.35,
      }],
    },
    options: {
      ...baseOpts,
      plugins: {
        ...baseOpts.plugins,
        tooltip: { ...baseOpts.plugins.tooltip, callbacks: { label: ctx => ` ${ctx.parsed.y}g protein` } },
      },
    },
  });
}

// ── VIEW SWITCHING ────────────────────────────────────────────────────────────
function switchView(v) {
  state.view = v;
  Object.values(views).forEach(el => el.classList.remove("active"));
  views[v].classList.add("active");
  navBtns.forEach(btn => btn.classList.toggle("active", btn.dataset.view === v));
  if (v === "week") renderWeek();
}

// ── EVENTS ────────────────────────────────────────────────────────────────────
navBtns.forEach(btn => btn.addEventListener("click", () => switchView(btn.dataset.view)));

prevDayBtn.addEventListener("click", () => {
  state.currentDate.setDate(state.currentDate.getDate() - 1);
  renderToday();
});

nextDayBtn.addEventListener("click", () => {
  if (dateKey(state.currentDate) < dateKey(new Date())) {
    state.currentDate.setDate(state.currentDate.getDate() + 1);
    renderToday();
  }
});

foodSearch.addEventListener("input", () => renderFoodCatalog(foodSearch.value));
closeQtyBtn.addEventListener("click", closeQtyModal);
qtyOverlay.addEventListener("click", e => { if (e.target === qtyOverlay) closeQtyModal(); });

qtyInput.addEventListener("input", () => {
  const qty  = parseFloat(qtyInput.value);
  const food = state.selectedFood;
  if (!food || !qty || qty <= 0) {
    qtyPreview.textContent = "";
    confirmAdd.disabled = true;
    return;
  }
  const e = calcEntry(food, qty, state.selectedMeal);
  qtyPreview.textContent =
    `${fmt(e.cal)} kcal  ·  P ${fmt(e.protein)}g  ·  C ${fmt(e.carbs)}g  ·  F ${fmt(e.fat)}g`;
  confirmAdd.disabled = false;
});

confirmAdd.addEventListener("click", () => {
  const qty  = parseFloat(qtyInput.value);
  const food = state.selectedFood;
  if (!food || !qty || qty <= 0) return;

  const entry = calcEntry(food, qty, state.selectedMeal);
  const key   = dateKey(state.currentDate);
  if (!state.data[key]) state.data[key] = [];
  state.data[key].push(entry);
  saveData(state.session.email, state.data);

  closeQtyModal();
  renderToday();
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape" && qtyOverlay.classList.contains("open")) closeQtyModal();
  if (e.key === "Enter"  && qtyOverlay.classList.contains("open") && !confirmAdd.disabled) confirmAdd.click();
});

// ── INIT ──────────────────────────────────────────────────────────────────────
const existingSession = getSession();
if (existingSession) {
  state.session = existingSession;
  startApp();
}
