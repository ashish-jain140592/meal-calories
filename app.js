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

const GOALS = { cal: 2000, protein: 150, carbs: 200, fat: 65, fiber: 25 };

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
};

// ── DOM REFS ──────────────────────────────────────────────────────────────────
const $ = id => document.getElementById(id);

const authScreen   = $("auth-screen");
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
  el.style.strokeDashoffset = CIRCUMFERENCE * (1 - pct);
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

  updateRing("ring-cal",     s.cal,     GOALS.cal);
  updateRing("ring-protein", s.protein, GOALS.protein);
  updateBar("bar-carbs", "val-carbs", s.carbs, GOALS.carbs, "g");
  updateBar("bar-fat",   "val-fat",   s.fat,   GOALS.fat,   "g");
  updateBar("bar-fiber", "val-fiber", s.fiber, GOALS.fiber, "g");
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
    state.user = null;
    state.data = {};
    appEl.classList.add("hidden");
    authScreen.classList.remove("hidden");
  }
});

function startApp() {
  authScreen.classList.add("hidden");
  appEl.classList.remove("hidden");
  state.data        = {};
  state.currentDate = new Date();
  greeting.textContent = `Hi, ${state.user.name}`;
  renderToday();
  renderFoodCatalog();
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
  if (!qtyOverlay.classList.contains("hidden")) {
    if (e.key === "Escape") closeQtyModal();
    if (e.key === "Enter" && !confirmAdd.disabled) confirmAdd.click();
  }
});
