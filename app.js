// ── SUPABASE ──────────────────────────────────────────────────────────────────
const SUPABASE_URL = "https://vnxwxipqzvpedtkxxyvb.supabase.co";
const SUPABASE_KEY = "sb_publishable__fuv5f1PmBl2oFIEf37i7g_sK47WBCV";
const db = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

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

const GOAL_DEFAULTS = { cal: 2000, protein: 150, carbs: 200, fat: 65, fiber: 25 };

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

// Convert Supabase row → UI entry object
function mapRow(row) {
  return {
    id:       row.id,
    foodName: row.food_name,
    icon:     row.icon,
    metric:   row.metric,
    mealType: row.meal_type,
    qty:      row.quantity,
    cal:      row.calories,
    protein:  row.protein,
    carbs:    row.carbs,
    fat:      row.fat,
    fiber:    row.fibre,
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

// ── STATE ─────────────────────────────────────────────────────────────────────
let state = {
  user:         null,
  data:         {},
  currentDate:  new Date(),
  selectedFood: null,
  selectedMeal: defaultMealType(),
  view:         "today",
  goals:        { ...GOAL_DEFAULTS },
  toastsFired:  {},   // { "YYYY-MM-DD": Set{...} }
};

// ── DOM REFS ──────────────────────────────────────────────────────────────────
const $ = id => document.getElementById(id);

const authScreen        = $("auth-screen");
const onboardingScreen  = $("onboarding-screen");
const ogCal             = $("og-cal");
const ogProtein         = $("og-protein");
const ogCarbs           = $("og-carbs");
const ogFat             = $("og-fat");
const ogFiber           = $("og-fiber");
const ogError           = $("og-error");
const ogSave            = $("og-save");
const btnGoals          = $("btn-goals");
const authForm     = $("auth-form");
const authTabs     = document.querySelectorAll(".auth-tab");
const nameGroup    = $("name-group");
const authName     = $("auth-name");
const authEmail    = $("auth-email");
const authPassword = $("auth-password");
const authError    = $("auth-error");
const btnAuth      = $("btn-auth");
const togglePwd    = $("toggle-password");

const appEl        = $("app");
const greeting     = $("greeting");
const btnLogout    = $("btn-logout");
const navBtns      = document.querySelectorAll(".nav-btn");
const views        = { today: $("view-today"), week: $("view-week") };

const dateLabel    = $("date-label");
const prevDayBtn   = $("prev-day");
const nextDayBtn   = $("next-day");
const logContainer = $("log-container");
const foodSearch   = $("food-search");
const foodCatalog  = $("food-catalog");

const newFoodOverlay  = $("new-food-overlay");
const closeNewFoodBtn = $("close-new-food");
const nfName          = $("nf-name");
const nfIcon          = $("nf-icon");
const nfMetric        = $("nf-metric");
const nfCal           = $("nf-cal");
const nfProtein       = $("nf-protein");
const nfCarbs         = $("nf-carbs");
const nfFat           = $("nf-fat");
const nfFiber         = $("nf-fiber");
const nfError         = $("nf-error");
const nfSubmit        = $("nf-submit");
const nfUnitHint      = $("nf-unit-hint");
const btnNewFood      = $("btn-new-food");

const qtyOverlay   = $("qty-overlay");
const closeQtyBtn  = $("close-qty");
const qtyItemName  = $("qty-item-name");
const qtyInfo      = $("qty-info");
const qtyInput     = $("qty-input");
const qtyUnit      = $("qty-unit");
const qtyPreview   = $("qty-preview");
const confirmAdd   = $("confirm-add");
const mealBtns     = document.querySelectorAll(".meal-btn");

const weekRange    = $("week-range");

let chartCalories = null;
let chartMealType = null;
let chartMacros   = null;
let chartProtein  = null;

// ── PROGRESS RINGS & BARS ─────────────────────────────────────────────────────
const CIRCUMFERENCE = 289.03; // 2 * π * 46

function updateRing(id, value, goal) {
  const el = $(id);
  if (!el) return;
  const pct = Math.min(value / goal, 1);
  const wasComplete = parseFloat(el.style.strokeDashoffset || CIRCUMFERENCE) <= 0.5;
  el.style.strokeDashoffset = CIRCUMFERENCE * (1 - pct);
  if (pct >= 1 && !wasComplete) {
    el.classList.remove("ring-pulse");
    void el.offsetWidth; // force reflow to restart animation
    el.classList.add("ring-pulse");
    setTimeout(() => el.classList.remove("ring-pulse"), 1200);
  }
}

function updateBar(barId, valId, value, goal, unit) {
  const bar = $(barId);
  const val = $(valId);
  if (bar) bar.style.width = Math.min((value / goal) * 100, 100) + "%";
  if (val) val.textContent = `${fmt(value)} / ${goal}${unit}`;
}

function setTotals(s) {
  const calEl      = $("total-cal");
  const proteinEl  = $("total-protein");
  if (calEl)     calEl.textContent     = fmt(s.cal);
  if (proteinEl) proteinEl.textContent = fmt(s.protein) + "g";

  updateRing("ring-cal",     s.cal,     state.goals.cal);
  updateRing("ring-protein", s.protein, state.goals.protein);
  updateBar("bar-carbs", "val-carbs", s.carbs, state.goals.carbs, "g");
  updateBar("bar-fat",   "val-fat",   s.fat,   state.goals.fat,   "g");
  updateBar("bar-fiber", "val-fiber", s.fiber, state.goals.fiber, "g");
  renderAchievements(s);
}

// ── ACHIEVEMENTS ──────────────────────────────────────────────────────────────
function computeAchievements(s) {
  return [
    { key: "cal",     label: "Cal",     unit: "kcal", logged: s.cal,     goal: state.goals.cal,     under: true  },
    { key: "protein", label: "Protein", unit: "g",    logged: s.protein, goal: state.goals.protein, under: false },
    { key: "carbs",   label: "Carbs",   unit: "g",    logged: s.carbs,   goal: state.goals.carbs,   under: true  },
    { key: "fat",     label: "Fat",     unit: "g",    logged: s.fat,     goal: state.goals.fat,     under: true  },
    { key: "fiber",   label: "Fiber",   unit: "g",    logged: s.fiber,   goal: state.goals.fiber,   under: false },
  ].map(a => ({ ...a, met: a.under ? a.logged <= a.goal : a.logged >= a.goal }));
}

function renderAchievements(s) {
  const banner = $("achievement-banner");
  if (!banner) return;

  // Hide if nothing logged yet
  if (s.cal === 0) { banner.classList.add("hidden"); return; }

  const achievements = computeAchievements(s);
  const allMet       = achievements.every(a => a.met);
  const dateStr      = dateKey(state.currentDate);
  const isToday      = dateStr === dateKey(new Date());

  banner.classList.remove("hidden");

  if (allMet) {
    banner.innerHTML = `
      <div class="bg-gradient-to-r from-violet-500/20 via-emerald-500/15 to-sky-500/20 border border-violet-400/30 rounded-2xl px-5 py-5 text-center">
        <div class="text-3xl mb-2">🏆</div>
        <p class="shimmer-text text-base font-bold mb-0.5">All Goals Achieved!</p>
        <p class="text-xs text-slate-400">You crushed it today — every goal met</p>
      </div>`;

    if (isToday) {
      const fired = state.toastsFired[dateStr] || new Set();
      if (!fired.has("confetti")) {
        fired.add("confetti");
        state.toastsFired[dateStr] = fired;
        fireConfetti();
        showToast("🏆 All goals achieved! Amazing work!");
      }
    }
    return;
  }

  const ICONS = { met: "✅", over: "⚠️", under: "🔵" };
  const badgesHtml = achievements.map((a, i) => {
    const icon  = a.met ? ICONS.met : (a.under && a.logged > a.goal ? ICONS.over : ICONS.under);
    const style = a.met
      ? "bg-emerald-500/10 border-emerald-500/25 text-emerald-400"
      : (a.under && a.logged > a.goal
          ? "bg-rose-500/10 border-rose-500/25 text-rose-400"
          : "bg-slate-800 border-slate-700 text-slate-400");
    const delay = `animation-delay:${i * 55}ms`;
    return `
      <div class="badge-pop flex flex-col items-center gap-1 ${style} border rounded-xl py-2.5 px-1" style="${delay}">
        <span class="text-sm leading-none">${icon}</span>
        <span class="text-[11px] font-semibold">${a.label}</span>
        <span class="text-[10px] text-slate-500">${Math.round(a.logged)}/${a.goal}</span>
      </div>`;
  }).join("");

  banner.innerHTML = `
    <div class="bg-slate-800/60 rounded-2xl px-4 py-3.5">
      <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Today's Progress</p>
      <div class="grid grid-cols-5 gap-2">${badgesHtml}</div>
    </div>`;

  // Toasts for newly-met "reach" goals (protein, fiber) — today only
  if (isToday) {
    const fired = state.toastsFired[dateStr] || new Set();
    achievements.filter(a => !a.under && a.met && !fired.has(a.key)).forEach(a => {
      fired.add(a.key);
      showToast(`✅ ${a.label} goal reached!`);
    });
    // Toast for cal going over
    const cal = achievements.find(a => a.key === "cal");
    if (cal && !cal.met && !fired.has("cal-over")) {
      fired.add("cal-over");
      showToast(`⚠️ Calorie goal exceeded`);
    }
    state.toastsFired[dateStr] = fired;
  }
}

function showToast(message) {
  const container = $("toast-container");
  if (!container) return;
  const toast = document.createElement("div");
  toast.className = "toast bg-slate-800 border border-slate-600/80 text-white text-sm font-medium px-5 py-3 rounded-2xl shadow-2xl";
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add("removing");
    setTimeout(() => toast.remove(), 250);
  }, 3000);
}

function fireConfetti() {
  const colors = ["#a78bfa", "#34d399", "#38bdf8", "#fb923c", "#f472b6", "#facc15", "#e879f9"];
  for (let i = 0; i < 70; i++) {
    const el = document.createElement("div");
    el.className = "confetti-piece";
    el.style.cssText = `
      left:${Math.random() * 100}vw;
      background:${colors[Math.floor(Math.random() * colors.length)]};
      width:${5 + Math.random() * 7}px;
      height:${8 + Math.random() * 8}px;
      animation-duration:${2.2 + Math.random() * 1.8}s;
      animation-delay:${Math.random() * 0.6}s;
      transform:rotate(${Math.random() * 360}deg);
      border-radius:${Math.random() > 0.5 ? "50%" : "2px"};
    `;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 4500);
  }
}

// ── PASSWORD TOGGLE ───────────────────────────────────────────────────────────
const EYE_OPEN = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/></svg>`;
const EYE_CLOSED = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"/></svg>`;

togglePwd.innerHTML = EYE_CLOSED;
togglePwd.addEventListener("click", () => {
  const isPassword = authPassword.type === "password";
  authPassword.type = isPassword ? "text" : "password";
  togglePwd.innerHTML = isPassword ? EYE_OPEN : EYE_CLOSED;
});

// ── AUTH UI ───────────────────────────────────────────────────────────────────
let authMode = "login";

function setAuthTab(mode) {
  authMode = mode;
  authTabs.forEach(t => {
    const isActive = t.dataset.tab === mode;
    t.classList.toggle("bg-slate-700", isActive);
    t.classList.toggle("text-white",   isActive);
    t.classList.toggle("shadow",       isActive);
    t.classList.toggle("font-semibold",isActive);
    t.classList.toggle("text-slate-400", !isActive);
    t.classList.toggle("font-medium",    !isActive);
  });
  nameGroup.classList.toggle("hidden", mode === "login");
  btnAuth.textContent = mode === "login" ? "Sign In" : "Create Account";
  authError.textContent = "";
  authForm.reset();
}

authTabs.forEach(tab => tab.addEventListener("click", () => {
  setAuthTab(tab.dataset.tab);
}));

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
      if (!name) { authError.textContent = "Name is required."; return; }
      if (password.length < 6) { authError.textContent = "Password must be at least 6 characters."; return; }
      const { error } = await db.auth.signUp({ email, password, options: { data: { name } } });
      if (error) { authError.textContent = error.message; return; }
    } else {
      const { error } = await db.auth.signInWithPassword({ email, password });
      if (error) { authError.textContent = error.message; return; }
    }
    // onAuthStateChange will call startApp()
  } finally {
    btnAuth.disabled = false;
    btnAuth.textContent = authMode === "login" ? "Sign In" : "Create Account";
  }
});

// ── SESSION MANAGEMENT ────────────────────────────────────────────────────────
db.auth.onAuthStateChange((event, session) => {
  if (session?.user && !state.user) {
    const user = session.user;
    state.user = {
      id:    user.id,
      email: user.email,
      name:  user.user_metadata?.name || user.email.split("@")[0],
    };
    startApp();
  }

  if (event === "SIGNED_OUT") {
    state.user        = null;
    state.data        = {};
    state.goals       = { ...GOAL_DEFAULTS };
    state.toastsFired = {};
    appEl.classList.add("hidden");
    onboardingScreen.classList.add("hidden");
    authScreen.classList.remove("hidden");
  }
});

// ── PROFILE & GOALS ───────────────────────────────────────────────────────────
async function fetchProfile() {
  const { data, error } = await db
    .from("profiles")
    .select("goal_cal, goal_protein, goal_carbs, goal_fat, goal_fiber, goals_set")
    .eq("id", state.user.id)
    .single();
  if (error) { console.error("fetchProfile:", error); return null; }
  return data;
}

function updateGoalLabels() {
  const calLabel     = $("goal-label-cal");
  const proteinLabel = $("goal-label-protein");
  if (calLabel)     calLabel.textContent     = `/ ${state.goals.cal} goal`;
  if (proteinLabel) proteinLabel.textContent = `/ ${state.goals.protein}g goal`;
}

function showOnboarding() {
  const g = state.goals;
  ogCal.value     = g.cal;
  ogProtein.value = g.protein;
  ogCarbs.value   = g.carbs;
  ogFat.value     = g.fat;
  ogFiber.value   = g.fiber;
  ogError.textContent = "";
  const isUpdate = !appEl.classList.contains("hidden");
  ogSave.textContent = isUpdate ? "Update Goals" : "Save & Start Tracking";
  onboardingScreen.classList.remove("hidden");
}

ogSave.addEventListener("click", async () => {
  const cal     = parseInt(ogCal.value);
  const protein = parseInt(ogProtein.value);
  const carbs   = parseInt(ogCarbs.value);
  const fat     = parseInt(ogFat.value);
  const fiber   = parseInt(ogFiber.value);

  if ([cal, protein, carbs, fat, fiber].some(v => !v || v <= 0)) {
    ogError.textContent = "All goals must be greater than 0."; return;
  }

  ogSave.disabled = true;

  try {
    const { error } = await db
      .from("profiles")
      .update({
        goal_cal: cal, goal_protein: protein, goal_carbs: carbs,
        goal_fat: fat, goal_fiber: fiber, goals_set: true,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      })
      .eq("id", state.user.id);

    if (error) { ogError.textContent = "Failed to save. Please try again."; console.error(error); return; }

    state.goals = { cal, protein, carbs, fat, fiber };
    onboardingScreen.classList.add("hidden");
    updateGoalLabels();

    if (appEl.classList.contains("hidden")) {
      // First-time setup — now launch the app
      appEl.classList.remove("hidden");
      await loadCustomFoods();
      renderToday();
      renderFoodCatalog();
    } else {
      // Updating existing goals — re-render today's totals with new goals
      const dateStr = dateKey(state.currentDate);
      setTotals(sumLog(state.data[dateStr] || []));
    }
  } finally {
    ogSave.disabled = false;
  }
});

btnGoals.addEventListener("click", showOnboarding);

async function startApp() {
  authScreen.classList.add("hidden");
  state.data        = {};
  state.currentDate = new Date();
  greeting.textContent = `Hi, ${state.user.name}`;

  const profile = await fetchProfile();
  if (profile && profile.goals_set) {
    state.goals = {
      cal:     profile.goal_cal,
      protein: profile.goal_protein,
      carbs:   profile.goal_carbs,
      fat:     profile.goal_fat,
      fiber:   profile.goal_fiber,
    };
    appEl.classList.remove("hidden");
    updateGoalLabels();
    await loadCustomFoods();
    renderToday();
    renderFoodCatalog();
  } else {
    // New user or goals not yet set — show onboarding first
    showOnboarding();
  }
}

btnLogout.addEventListener("click", async () => {
  await db.auth.signOut();
  authForm.reset();
  setAuthTab("login");
});

// ── SUPABASE DATA ─────────────────────────────────────────────────────────────
async function fetchDayLog(dateStr) {
  if (state.data[dateStr] !== undefined) return state.data[dateStr];

  const { data, error } = await db
    .from("food_log")
    .select("*")
    .eq("user_id", state.user.id)
    .eq("date", dateStr)
    .order("created_at", { ascending: true });

  if (error) { console.error(error); return []; }
  state.data[dateStr] = (data || []).map(mapRow);
  return state.data[dateStr];
}

async function fetchWeekLogs(startDate, endDate) {
  const { data, error } = await db
    .from("food_log")
    .select("*")
    .eq("user_id", state.user.id)
    .gte("date", startDate)
    .lte("date", endDate)
    .order("created_at", { ascending: true });

  if (error) { console.error(error); return {}; }

  const grouped = {};
  (data || []).forEach(row => {
    if (!grouped[row.date]) grouped[row.date] = [];
    grouped[row.date].push(mapRow(row));
  });
  return grouped;
}

async function insertEntry(food, qty, mealType, dateStr) {
  const { data, error } = await db
    .from("food_log")
    .insert({
      user_id:   state.user.id,
      date:      dateStr,
      food_name: food.name,
      icon:      food.icon,
      metric:    food.metric,
      meal_type: mealType,
      quantity:  qty,
      calories:  Math.round(food.cal     * qty * 10) / 10,
      protein:   Math.round(food.protein * qty * 10) / 10,
      carbs:     Math.round(food.carbs   * qty * 10) / 10,
      fat:       Math.round(food.fat     * qty * 10) / 10,
      fibre:     Math.round(food.fiber   * qty * 10) / 10,
    })
    .select()
    .single();

  if (error) throw error;
  return mapRow(data);
}

async function loadCustomFoods() {
  const { data, error } = await db
    .from("custom_foods")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) { console.error("Failed to load custom foods:", error); return; }

  (data || []).forEach(row => {
    const exists = FOODS.some(f => f.name.toLowerCase() === row.name.toLowerCase());
    if (!exists) {
      FOODS.push({
        name:    row.name,
        icon:    row.icon,
        metric:  row.metric,
        cal:     parseFloat(row.cal),
        protein: parseFloat(row.protein),
        carbs:   parseFloat(row.carbs),
        fat:     parseFloat(row.fat),
        fiber:   parseFloat(row.fiber),
      });
    }
  });
}

async function deleteEntry(id, dateStr) {
  const { error } = await db.from("food_log").delete().eq("id", id);
  if (error) throw error;
  state.data[dateStr] = state.data[dateStr].filter(e => e.id !== id);
}

// ── RENDER: TODAY ─────────────────────────────────────────────────────────────
async function renderToday() {
  const targetDate = dateKey(state.currentDate);

  dateLabel.textContent = fmtDate(state.currentDate);
  const today = new Date();
  nextDayBtn.disabled = targetDate >= dateKey(today);
  nextDayBtn.style.opacity = nextDayBtn.disabled ? "0.35" : "";

  if (state.data[targetDate] === undefined) {
    logContainer.innerHTML = `<div class="text-center py-8 text-slate-500 text-sm">Loading…</div>`;
    setTotals({ cal: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 });
  }

  const log = await fetchDayLog(targetDate);
  if (dateKey(state.currentDate) !== targetDate) return;

  setTotals(sumLog(log));
  renderLogContainer(log, targetDate);
}

function renderLogContainer(log, dateStr) {
  logContainer.innerHTML = "";

  if (log.length === 0) {
    logContainer.innerHTML = `
      <div class="text-center py-10">
        <div class="text-4xl mb-3">🍽️</div>
        <p class="text-sm text-slate-500">Nothing logged yet.<br/>Choose a food below to add it.</p>
      </div>`;
    return;
  }

  MEAL_TYPES.forEach(meal => {
    const entries = log.filter(e => (e.mealType || "lunch") === meal.id);
    if (entries.length === 0) return;

    const mealCal = Math.round(entries.reduce((s, e) => s + e.cal, 0));
    const group   = document.createElement("div");
    group.className = "mb-5";

    const header = document.createElement("div");
    header.className = "flex items-center gap-2 mb-2 px-1";
    header.innerHTML = `
      <span class="text-base">${meal.icon}</span>
      <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">${meal.label}</span>
      <span class="ml-auto text-xs text-slate-500">${mealCal} kcal</span>
    `;
    group.appendChild(header);

    const list = document.createElement("div");
    list.className = "space-y-2";

    entries.forEach(entry => {
      const item = document.createElement("div");
      item.className = "log-item flex items-center gap-3 bg-slate-800 border border-slate-700/80 rounded-xl px-3 py-2.5";
      item.innerHTML = `
        <span class="text-xl w-7 text-center shrink-0">${entry.icon || "🍽️"}</span>
        <div class="flex-1 min-w-0">
          <div class="text-sm font-medium text-white truncate">${entry.foodName}</div>
          <div class="text-xs text-slate-500 mt-0.5">${entry.qty} ${entry.metric}</div>
        </div>
        <div class="flex flex-wrap justify-end gap-1 shrink-0">
          <span class="text-xs px-1.5 py-0.5 rounded-md bg-sky-500/15 text-sky-400">${fmt(entry.cal)} kcal</span>
          <span class="text-xs px-1.5 py-0.5 rounded-md bg-emerald-500/15 text-emerald-400">${fmt(entry.protein)}g P</span>
          <span class="text-xs px-1.5 py-0.5 rounded-md bg-amber-500/15 text-amber-400">${fmt(entry.carbs)}g C</span>
          <span class="text-xs px-1.5 py-0.5 rounded-md bg-rose-500/15 text-rose-400">${fmt(entry.fat)}g F</span>
        </div>
        <button class="log-delete ml-1 shrink-0 w-6 h-6 flex items-center justify-center text-slate-600 hover:text-rose-400 transition-colors rounded-md text-sm" data-id="${entry.id}" title="Remove">&#10005;</button>
      `;

      item.querySelector(".log-delete").addEventListener("click", async btn => {
        const id = btn.currentTarget.dataset.id;
        btn.currentTarget.disabled = true;
        item.classList.add("removing");
        setTimeout(async () => {
          try {
            await deleteEntry(id, dateStr);
            renderLogContainer(state.data[dateStr], dateStr);
            setTotals(sumLog(state.data[dateStr]));
          } catch (err) {
            console.error(err);
            item.classList.remove("removing");
            btn.currentTarget.disabled = false;
          }
        }, 220);
      });

      list.appendChild(item);
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
    foodCatalog.innerHTML = `
      <div class="col-span-2 sm:col-span-3 text-center py-6 text-sm text-slate-500">
        No items found for "<strong class="text-slate-300">${query}</strong>"
      </div>`;
    return;
  }

  filtered.forEach(food => {
    const card     = document.createElement("div");
    card.className = "relative bg-slate-800 border border-slate-700 rounded-xl p-3 cursor-pointer hover:border-violet-500/60 hover:bg-slate-700/70 transition-all active:scale-95 select-none";
    const calPer   = food.metric === "unit" ? food.cal : food.cal * 100;
    const perLabel = food.metric === "unit" ? "/unit"  : `/100${food.metric}`;
    card.innerHTML = `
      <span class="absolute top-2 right-2 text-[10px] font-semibold text-slate-500 bg-slate-700/80 rounded-md px-1.5 py-0.5">${food.metric}</span>
      <div class="text-2xl mb-1.5">${food.icon}</div>
      <div class="text-xs font-semibold text-white leading-tight mb-1 pr-8">${food.name}</div>
      <div class="text-xs text-slate-400">${Math.round(calPer * 10) / 10} kcal ${perLabel}</div>
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
    <strong class="text-white">${Math.round(calPer * 10) / 10} kcal</strong> ${label}
    &nbsp;|&nbsp; P: ${Math.round(pPer * 10) / 10}g
    &nbsp; C: ${Math.round(cPer * 10) / 10}g
    &nbsp; F: ${Math.round(fPer * 10) / 10}g
  `;

  qtyInput.value = "";
  qtyPreview.textContent = "";
  confirmAdd.disabled = true;
  qtyOverlay.classList.remove("hidden");
  setTimeout(() => qtyInput.focus(), 200);
}

function closeQtyModal() {
  qtyOverlay.classList.add("hidden");
  state.selectedFood = null;
}

function setActiveMeal(mealId) {
  state.selectedMeal = mealId;
  mealBtns.forEach(b => {
    const isActive = b.dataset.meal === mealId;
    b.style.borderColor = isActive ? "#8b5cf6" : "";
    b.style.color       = isActive ? "#c4b5fd" : "";
    b.style.background  = isActive ? "rgba(139,92,246,0.12)" : "";
  });
}

mealBtns.forEach(btn => btn.addEventListener("click", () => setActiveMeal(btn.dataset.meal)));

qtyInput.addEventListener("input", () => {
  const qty  = parseFloat(qtyInput.value);
  const food = state.selectedFood;
  if (!food || !qty || qty <= 0) {
    qtyPreview.textContent = "";
    confirmAdd.disabled = true;
    return;
  }
  const cal     = Math.round(food.cal     * qty * 10) / 10;
  const protein = Math.round(food.protein * qty * 10) / 10;
  const carbs   = Math.round(food.carbs   * qty * 10) / 10;
  const fat     = Math.round(food.fat     * qty * 10) / 10;
  qtyPreview.textContent =
    `${fmt(cal)} kcal  ·  P ${fmt(protein)}g  ·  C ${fmt(carbs)}g  ·  F ${fmt(fat)}g`;
  confirmAdd.disabled = false;
});

confirmAdd.addEventListener("click", async () => {
  const qty  = parseFloat(qtyInput.value);
  const food = state.selectedFood;
  if (!food || !qty || qty <= 0) return;

  confirmAdd.disabled = true;
  confirmAdd.textContent = "Saving…";

  const dateStr = dateKey(state.currentDate);
  try {
    const entry = await insertEntry(food, qty, state.selectedMeal, dateStr);
    if (!state.data[dateStr]) state.data[dateStr] = [];
    state.data[dateStr].push(entry);
    closeQtyModal();
    renderLogContainer(state.data[dateStr], dateStr);
    setTotals(sumLog(state.data[dateStr]));
  } catch (err) {
    console.error(err);
    qtyPreview.textContent = "Failed to save. Please try again.";
  } finally {
    confirmAdd.disabled = false;
    confirmAdd.textContent = "Add to Log";
  }
});

closeQtyBtn.addEventListener("click", closeQtyModal);
qtyOverlay.addEventListener("click", e => { if (e.target === qtyOverlay) closeQtyModal(); });

// ── NEW FOOD MODAL ────────────────────────────────────────────────────────────
function openNewFoodModal() {
  nfName.value    = "";
  nfIcon.value    = "";
  nfMetric.value  = "";
  nfCal.value     = "";
  nfProtein.value = "";
  nfCarbs.value   = "";
  nfFat.value     = "";
  nfFiber.value   = "";
  nfError.textContent  = "";
  nfUnitHint.textContent = "";
  newFoodOverlay.classList.remove("hidden");
  setTimeout(() => nfName.focus(), 200);
}

function closeNewFoodModal() {
  newFoodOverlay.classList.add("hidden");
}

nfMetric.addEventListener("change", () => {
  const labels = { g: "— per 1g", ml: "— per 1ml", unit: "— per 1 unit" };
  nfUnitHint.textContent = labels[nfMetric.value] || "";
});

btnNewFood.addEventListener("click", openNewFoodModal);
closeNewFoodBtn.addEventListener("click", closeNewFoodModal);
newFoodOverlay.addEventListener("click", e => { if (e.target === newFoodOverlay) closeNewFoodModal(); });

nfSubmit.addEventListener("click", async () => {
  nfError.textContent = "";

  const name    = nfName.value.trim();
  const icon    = nfIcon.value.trim() || "🍽️";
  const metric  = nfMetric.value;
  const cal     = parseFloat(nfCal.value);
  const protein = parseFloat(nfProtein.value) || 0;
  const carbs   = parseFloat(nfCarbs.value)   || 0;
  const fat     = parseFloat(nfFat.value)     || 0;
  const fiber   = parseFloat(nfFiber.value)   || 0;

  // ── Validation ──────────────────────────────────────────
  if (!name) {
    nfError.textContent = "Food name is required."; return;
  }
  if (!metric) {
    nfError.textContent = "Please select a measurement unit."; return;
  }
  if (isNaN(cal) || cal <= 0 || cal > 2000) {
    nfError.textContent = "Calories must be between 0 and 2000."; return;
  }
  if (protein < 0 || carbs < 0 || fat < 0 || fiber < 0) {
    nfError.textContent = "Macro values cannot be negative."; return;
  }
  const duplicate = FOODS.find(f => f.name.toLowerCase() === name.toLowerCase());
  if (duplicate) {
    nfError.textContent = `"${duplicate.name}" already exists in the food list.`; return;
  }

  // ── Submit ───────────────────────────────────────────────
  nfSubmit.disabled = true;
  nfSubmit.textContent = "Saving…";

  try {
    const { error } = await db
      .from("custom_foods")
      .insert({
        submitted_by: state.user.id,
        name, icon, metric, cal, protein, carbs, fat,
        fiber: fiber,
      });

    if (error) {
      if (error.code === "23505") {
        nfError.textContent = `"${name}" already exists in the food list.`;
      } else {
        nfError.textContent = "Failed to save. Please try again.";
        console.error(error);
      }
      return;
    }

    // Merge into local FOODS array immediately
    FOODS.push({ name, icon, metric, cal, protein, carbs, fat, fiber });
    closeNewFoodModal();
    renderFoodCatalog(foodSearch.value);

  } finally {
    nfSubmit.disabled = false;
    nfSubmit.textContent = "Submit Food";
  }
});

// ── VIEW SWITCHING ────────────────────────────────────────────────────────────
function switchView(v) {
  state.view = v;
  Object.entries(views).forEach(([key, el]) => {
    el.classList.toggle("hidden", key !== v);
  });
  navBtns.forEach(btn => {
    btn.style.color = btn.dataset.view === v ? "#a78bfa" : "#6b7280";
  });
  if (v === "week") renderWeek();
}

navBtns.forEach(btn => btn.addEventListener("click", () => switchView(btn.dataset.view)));

// ── RENDER: WEEK ──────────────────────────────────────────────────────────────
function getWeekDates() {
  const today = new Date();
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (6 - i));
    return d;
  });
}

async function renderWeek() {
  const days      = getWeekDates();
  const labels    = days.map(d => d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric" }));
  const startDate = dateKey(days[0]);
  const endDate   = dateKey(days[6]);

  weekRange.textContent =
    days[0].toLocaleDateString("en-IN", { day: "numeric", month: "short" }) +
    " – " +
    days[6].toLocaleDateString("en-IN", { day: "numeric", month: "short" });

  const weekData = await fetchWeekLogs(startDate, endDate);
  days.forEach(d => {
    const k = dateKey(d);
    if (weekData[k]) state.data[k] = weekData[k];
    else if (!state.data[k]) state.data[k] = [];
  });

  const logs = days.map(d => state.data[dateKey(d)] || []);
  const sums = logs.map(sumLog);

  const calData     = sums.map(s => Math.round(s.cal));
  const proteinData = sums.map(s => Math.round(s.protein * 10) / 10);
  const carbsData   = sums.map(s => Math.round(s.carbs   * 10) / 10);
  const fatData     = sums.map(s => Math.round(s.fat     * 10) / 10);
  const fiberData   = sums.map(s => Math.round(s.fiber   * 10) / 10);

  const mealCalData = MEAL_TYPES.map(meal =>
    logs.map(log => Math.round(
      log.filter(e => (e.mealType || "lunch") === meal.id).reduce((s, e) => s + e.cal, 0)
    ))
  );

  const gridColor   = "rgba(255,255,255,0.04)";
  const tickColor   = "#6b7280";
  const legendColor = "#94a3b8";

  const baseOpts = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#1e293b",
        titleFont: { family: "Inter", size: 12 },
        bodyFont:  { family: "Inter", size: 12 },
        padding: 10,
        cornerRadius: 8,
        borderColor: "rgba(255,255,255,0.08)",
        borderWidth: 1,
      },
    },
    scales: {
      x: { grid: { display: false }, ticks: { font: { family: "Inter", size: 11 }, color: tickColor } },
      y: { grid: { color: gridColor }, ticks: { font: { family: "Inter", size: 11 }, color: tickColor }, beginAtZero: true },
    },
  };

  if (chartCalories) chartCalories.destroy();
  chartCalories = new Chart($("chart-calories"), {
    type: "bar",
    data: {
      labels,
      datasets: [{ label: "Calories", data: calData, backgroundColor: "rgba(56,189,248,0.7)", borderColor: "#38bdf8", borderWidth: 2, borderRadius: 6, borderSkipped: false }],
    },
    options: { ...baseOpts, plugins: { ...baseOpts.plugins, tooltip: { ...baseOpts.plugins.tooltip, callbacks: { label: ctx => ` ${ctx.parsed.y} kcal` } } } },
  });

  if (chartMealType) chartMealType.destroy();
  chartMealType = new Chart($("chart-meal-type"), {
    type: "bar",
    data: {
      labels,
      datasets: [
        { label: "Breakfast", data: mealCalData[0], backgroundColor: "rgba(245,158,11,0.8)",  stack: "m", borderRadius: 4 },
        { label: "Lunch",     data: mealCalData[1], backgroundColor: "rgba(56,189,248,0.8)",  stack: "m", borderRadius: 4 },
        { label: "Dinner",    data: mealCalData[2], backgroundColor: "rgba(139,92,246,0.8)",  stack: "m", borderRadius: 4 },
      ],
    },
    options: {
      ...baseOpts,
      plugins: {
        ...baseOpts.plugins,
        legend: { display: true, position: "bottom", labels: { font: { family: "Inter", size: 11 }, color: legendColor, boxWidth: 12, padding: 12 } },
        tooltip: { ...baseOpts.plugins.tooltip, callbacks: { label: ctx => ` ${ctx.dataset.label}: ${ctx.parsed.y} kcal` } },
      },
      scales: { x: { ...baseOpts.scales.x, stacked: true }, y: { ...baseOpts.scales.y, stacked: true } },
    },
  });

  if (chartMacros) chartMacros.destroy();
  chartMacros = new Chart($("chart-macros"), {
    type: "bar",
    data: {
      labels,
      datasets: [
        { label: "Protein", data: proteinData, backgroundColor: "rgba(52,211,153,0.8)",  stack: "m", borderRadius: 4 },
        { label: "Carbs",   data: carbsData,   backgroundColor: "rgba(245,158,11,0.8)",  stack: "m", borderRadius: 4 },
        { label: "Fat",     data: fatData,     backgroundColor: "rgba(251,113,133,0.8)", stack: "m", borderRadius: 4 },
        { label: "Fiber",   data: fiberData,   backgroundColor: "rgba(167,139,250,0.8)", stack: "m", borderRadius: 4 },
      ],
    },
    options: {
      ...baseOpts,
      plugins: {
        ...baseOpts.plugins,
        legend: { display: true, position: "bottom", labels: { font: { family: "Inter", size: 11 }, color: legendColor, boxWidth: 12, padding: 12 } },
        tooltip: { ...baseOpts.plugins.tooltip, callbacks: { label: ctx => ` ${ctx.dataset.label}: ${ctx.parsed.y}g` } },
      },
      scales: { x: { ...baseOpts.scales.x, stacked: true }, y: { ...baseOpts.scales.y, stacked: true } },
    },
  });

  if (chartProtein) chartProtein.destroy();
  chartProtein = new Chart($("chart-protein"), {
    type: "line",
    data: {
      labels,
      datasets: [{ label: "Protein (g)", data: proteinData, borderColor: "#34d399", backgroundColor: "rgba(52,211,153,0.08)", borderWidth: 2.5, pointBackgroundColor: "#34d399", pointRadius: 5, pointHoverRadius: 7, fill: true, tension: 0.35 }],
    },
    options: { ...baseOpts, plugins: { ...baseOpts.plugins, tooltip: { ...baseOpts.plugins.tooltip, callbacks: { label: ctx => ` ${ctx.parsed.y}g protein` } } } },
  });
}

// ── DATE NAV ──────────────────────────────────────────────────────────────────
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

document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    if (!qtyOverlay.classList.contains("hidden")) closeQtyModal();
    if (!newFoodOverlay.classList.contains("hidden")) closeNewFoodModal();
  }
  if (e.key === "Enter" && !qtyOverlay.classList.contains("hidden") && !confirmAdd.disabled) {
    confirmAdd.click();
  }
});
