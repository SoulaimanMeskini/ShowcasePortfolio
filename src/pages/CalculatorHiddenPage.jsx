import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const STORAGE_KEY = "showcase_calculator_v1";
const MAX_HISTORY = 12;

const modeTitles = {
  duration: "Add/Subtract Duration",
  difference: "Time Difference",
  convert: "Convert HH:MM / Decimal",
  numpad: "Keypad Calculator",
  special: "Element Class",
};

const modeInstructions = {
  duration: "Add or subtract durations in hours and minutes.",
  difference: "Enter start and end times. Accepted formats: 14, 14:30, 1200, 2:00 pm, 2:00 p, 2.30.",
  convert: "Convert between HH:MM and decimal hours.",
  numpad: "Type with keypad or keyboard: +, -, *, /, Enter, Backspace.",
  special: "Enter a name to detect its element class.",
};

const todayIso = new Date().toISOString().slice(0, 10);
const baseState = {
  mode: "duration",
  durationHours: "2",
  durationMinutes: "30",
  deltaHours: "0",
  deltaMinutes: "45",
  durationOp: "add",
  startTime: "09:00",
  endTime: "17:30",
  startDate: todayIso,
  endDate: todayIso,
  numpadExpression: "",
  numpadUnit: "minutes",
  specialName: "",
  hhmmInput: "01:30",
  decimalInput: "1.5",
  history: [],
};

const classMap = {
  Ether: { icon: "✨", color: "text-violet-300" },
  Air: { icon: "🌬️", color: "text-sky-300" },
  Fire: { icon: "🔥", color: "text-rose-300" },
  Water: { icon: "💧", color: "text-blue-300" },
  Earth: { icon: "🌍", color: "text-emerald-300" },
};

const keyPadKeys = ["7", "8", "9", "+", "4", "5", "6", "-", "1", "2", "3", "*", "0", ".", "=", "/"];

function parseFlexibleTimeToSeconds(value) {
  const trimmed = value.trim().toLowerCase().replace(/\s*([ap])$/, " $1m");
  const hourPeriod = trimmed.match(/^(\d{1,2})\s*(am|pm)$/i);
  if (hourPeriod) return parseFlexibleTimeToSeconds(`${hourPeriod[1]}:00 ${hourPeriod[2]}`);
  const compact = trimmed.match(/^(\d{3,4})(?:\s*(am|pm))?$/i);
  if (compact) {
    const digits = compact[1];
    const period = compact[2];
    const h = digits.length === 3 ? digits.slice(0, 1) : digits.slice(0, 2);
    const m = digits.length === 3 ? digits.slice(1) : digits.slice(2);
    return parseFlexibleTimeToSeconds(`${h}:${m}${period ? ` ${period}` : ""}`);
  }
  const match = trimmed.match(/^(\d{1,2})[:;./](\d{1,2})(?:[:;./](\d{1,2}))?\s*(am|pm)?$/i);
  if (!match) return null;
  let hours = Number(match[1]);
  const minutes = Number(match[2]);
  const seconds = match[3] ? Number(match[3]) : 0;
  let period = match[4];
  if (period === "a") period = "am";
  if (period === "p") period = "pm";
  if ([hours, minutes, seconds].some(Number.isNaN)) return null;
  if (minutes < 0 || minutes > 59 || seconds < 0 || seconds > 59) return null;
  if (period) {
    if (hours < 1 || hours > 12) return null;
    if (period === "am") hours = hours === 12 ? 0 : hours;
    if (period === "pm") hours = hours === 12 ? 12 : hours + 12;
  } else if (hours < 0 || hours > 23) return null;
  return hours * 3600 + minutes * 60 + seconds;
}

function parseDateTime(date, time) {
  const secs = parseFlexibleTimeToSeconds(time);
  if (secs === null) return null;
  const [y, m, d] = date.split("-").map(Number);
  if (![y, m, d].every((n) => !Number.isNaN(n))) return null;
  const h = Math.floor(secs / 3600);
  const mm = Math.floor((secs % 3600) / 60);
  const ss = secs % 60;
  return new Date(y, m - 1, d, h, mm, ss);
}

function normalizeLooseTimeInput(value) {
  const t = value.trim();
  if (!t) return t;
  const compact = t.match(/^(\d{3,4})$/);
  if (compact) {
    const d = compact[1];
    const h = Number(d.length === 3 ? d.slice(0, 1) : d.slice(0, 2));
    const m = Number(d.length === 3 ? d.slice(1) : d.slice(2));
    if (h >= 0 && h <= 23 && m >= 0 && m <= 59) return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  }
  const hOnly = t.match(/^(\d{1,2})$/);
  if (hOnly) {
    const h = Number(hOnly[1]);
    if (h >= 0 && h <= 23) return `${String(h).padStart(2, "0")}:00`;
  }
  const hSep = t.match(/^(\d{1,2})[:;./]$/);
  if (hSep) {
    const h = Number(hSep[1]);
    if (h >= 0 && h <= 23) return `${String(h).padStart(2, "0")}:00`;
  }
  const hm = t.match(/^(\d{1,2})[:;./](\d{1,2})$/);
  if (hm) {
    const h = Number(hm[1]);
    const m = Number(hm[2]);
    if (h >= 0 && h <= 23 && m >= 0 && m <= 59) return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  }
  const hmsTrail = t.match(/^(\d{1,2})[:;./](\d{1,2})[:;./]$/);
  if (hmsTrail) {
    const h = Number(hmsTrail[1]);
    const m = Number(hmsTrail[2]);
    if (h >= 0 && h <= 23 && m >= 0 && m <= 59) return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:00`;
  }
  return t;
}

const formatDurationMinutes = (mins) => {
  const sign = mins < 0 ? "-" : "";
  const abs = Math.abs(mins);
  return `${sign}${Math.floor(abs / 60)}h ${String(abs % 60).padStart(2, "0")}m`;
};
const formatDurationMinutesWithDays = (mins) => {
  const base = formatDurationMinutes(mins);
  const abs = Math.abs(mins);
  if (abs < 1440) return `${base} (${mins}m)`;
  const d = Math.floor(abs / 1440);
  const rem = abs % 1440;
  const h = Math.floor(rem / 60);
  const m = rem % 60;
  const sign = mins < 0 ? "-" : "";
  return `${base} (${mins}m, ${sign}${d}d ${h}h ${String(m).padStart(2, "0")}m)`;
};
const formatDurationSeconds = (secs) => {
  const sign = secs < 0 ? "-" : "";
  const abs = Math.abs(secs);
  const h = Math.floor(abs / 3600);
  const m = Math.floor((abs % 3600) / 60);
  const s = abs % 60;
  return `${sign}${h}h ${String(m).padStart(2, "0")}m ${String(s).padStart(2, "0")}s`;
};
const minutesToHHMM = (mins) => {
  const v = ((mins % 1440) + 1440) % 1440;
  return `${String(Math.floor(v / 60)).padStart(2, "0")}:${String(v % 60).padStart(2, "0")}`;
};
const toMeridiem = (value) => {
  if (!value.trim()) return "";
  const s = parseFlexibleTimeToSeconds(value);
  if (s === null) return "invalid";
  const h24 = Math.floor(s / 3600) % 24;
  const m = Math.floor((s % 3600) / 60);
  const suffix = h24 >= 12 ? "PM" : "AM";
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${suffix}`;
};

const evaluateSimpleExpression = (expr) => {
  const m = expr.trim().match(/^(-?\d*\.?\d+)\s*([+\-*/])\s*(-?\d*\.?\d+)$/);
  if (!m) return null;
  const left = Number(m[1]);
  const right = Number(m[3]);
  if ([left, right].some(Number.isNaN)) return null;
  if (m[2] === "+") return left + right;
  if (m[2] === "-") return left - right;
  if (m[2] === "*") return left * right;
  if (m[2] === "/") return right === 0 ? null : left / right;
  return null;
};

const detectSpecialClass = (input) => {
  const name = input.toLowerCase().replace(/[^a-z]/g, "");
  if (!name) return "";
  const sum = [...name].reduce((acc, ch) => acc + (ch.charCodeAt(0) - 96), 0);
  const mod = sum % 5;
  if (mod === 1) return "Ether";
  if (mod === 2) return "Air";
  if (mod === 3) return "Fire";
  if (mod === 4) return "Water";
  return "Earth";
};

export default function CalculatorHiddenPage() {
  const [state, setState] = useState(baseState);
  const hasLoadedStorage = useRef(false);
  const [result, setResult] = useState("Tap calculate");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const now = new Date();
      const defaults = { startDate: now.toISOString().slice(0, 10), startTime: now.toTimeString().slice(0, 5) };
      if (!raw) setState((prev) => ({ ...prev, ...defaults }));
      else {
        const parsed = JSON.parse(raw);
        setState({ ...baseState, ...parsed, ...defaults, history: Array.isArray(parsed.history) ? parsed.history.slice(0, MAX_HISTORY) : [] });
      }
    } finally {
      hasLoadedStorage.current = true;
    }
  }, []);

  useEffect(() => {
    if (!hasLoadedStorage.current) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const historyPreview = useMemo(() => state.history.slice(0, 5), [state.history]);
  const normalizedStartTime = useMemo(() => normalizeLooseTimeInput(state.startTime), [state.startTime]);
  const normalizedEndTime = useMemo(() => normalizeLooseTimeInput(state.endTime), [state.endTime]);
  const showSeconds = useMemo(() => /[:;./]\d{1,2}[:;./]\d{1,2}/.test(state.startTime) || /[:;./]\d{1,2}[:;./]\d{1,2}/.test(state.endTime), [state.startTime, state.endTime]);

  const liveDifference = useMemo(() => {
    if (!normalizedStartTime.trim() || !normalizedEndTime.trim()) return { valid: false, text: "", label: "" };
    const start = parseDateTime(state.startDate, normalizedStartTime);
    const end = parseDateTime(state.endDate, normalizedEndTime);
    if (!start || !end) return { valid: false, text: "Invalid format", label: "" };
    const diffSec = Math.round((end.getTime() - start.getTime()) / 1000);
    const diffMin = Math.round(diffSec / 60);
    return { valid: true, text: showSeconds ? formatDurationSeconds(diffSec) : formatDurationMinutesWithDays(diffMin), label: `${state.startDate} ${normalizedStartTime} -> ${state.endDate} ${normalizedEndTime}` };
  }, [normalizedStartTime, normalizedEndTime, showSeconds, state.startDate, state.endDate]);

  const liveNumpadResult = useMemo(() => {
    if (!state.numpadExpression.trim()) return "";
    const val = evaluateSimpleExpression(state.numpadExpression);
    if (val === null) return "Use expression like 45+76";
    const n = Number.isInteger(val) ? `${val}` : val.toFixed(2);
    if (state.numpadUnit === "seconds") return `${n}s (${(val / 60).toFixed(2)}m, ${(val / 3600).toFixed(2)}h)`;
    if (state.numpadUnit === "hours") return `${n}h (${Math.round(val * 60)}m)`;
    return `${n}m (${(val / 60).toFixed(2)}h)`;
  }, [state.numpadExpression, state.numpadUnit]);

  const specialClass = useMemo(() => detectSpecialClass(state.specialName), [state.specialName]);
  const specialResult = useMemo(() => (specialClass ? `${classMap[specialClass]?.icon ?? ""} ${specialClass}` : ""), [specialClass]);

  const displayResult = state.mode === "difference" ? liveDifference.text : state.mode === "numpad" ? liveNumpadResult : state.mode === "special" ? specialResult : result;
  const startPreview = useMemo(() => toMeridiem(normalizedStartTime), [normalizedStartTime]);
  const endPreview = useMemo(() => toMeridiem(normalizedEndTime), [normalizedEndTime]);

  const pushHistory = useCallback((label, computedResult) => {
    const entry = { id: crypto.randomUUID(), mode: state.mode, label, result: computedResult, timestamp: new Date().toLocaleString() };
    setState((prev) => ({ ...prev, history: [entry, ...prev.history].slice(0, MAX_HISTORY) }));
  }, [state.mode]);

  const runNumpad = useCallback(() => {
    if (!liveNumpadResult || liveNumpadResult.startsWith("Use expression")) return;
    setResult(liveNumpadResult);
    pushHistory(`${state.numpadExpression} (${state.numpadUnit})`, liveNumpadResult);
  }, [liveNumpadResult, pushHistory, state.numpadExpression, state.numpadUnit]);

  const handleNumpadKey = useCallback((key) => {
    if (key === "CLEAR") return setState((prev) => ({ ...prev, numpadExpression: "" }));
    if (key === "BACK") return setState((prev) => ({ ...prev, numpadExpression: prev.numpadExpression.slice(0, -1) }));
    if (key === "=") return runNumpad();
    setState((prev) => ({ ...prev, numpadExpression: `${prev.numpadExpression}${key}` }));
  }, [runNumpad]);

  useEffect(() => {
    if (state.mode !== "numpad") return;
    const onKey = (e) => {
      const key = e.key;
      if (/^[0-9]$/.test(key) || ["+", "-", "*", "/", "."].includes(key)) { e.preventDefault(); handleNumpadKey(key); }
      else if (key === "Enter" || key === "=") { e.preventDefault(); handleNumpadKey("="); }
      else if (key === "Backspace") { e.preventDefault(); handleNumpadKey("BACK"); }
      else if (key === "Escape") { e.preventDefault(); handleNumpadKey("CLEAR"); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [state.mode, handleNumpadKey]);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100">
      <main className="mx-auto w-full max-w-md px-4 py-6 sm:py-10">
        <section className="rounded-3xl border border-white/10 bg-slate-900 p-4 shadow-2xl">
          <div className="mb-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Calculator</p>
            <h1 className="text-2xl font-semibold">{modeTitles[state.mode]}</h1>
            <p className="mt-1 text-sm text-slate-400">{modeInstructions[state.mode]}</p>
          </div>

          <div className="mb-4 grid grid-cols-5 gap-2 rounded-2xl bg-slate-800 p-1">
            {["duration", "difference", "convert", "numpad", "special"].map((item) => (
              <button
                key={item}
                onClick={() => setState((prev) => ({ ...prev, mode: item }))}
                className={`rounded-xl py-2 text-xs font-medium capitalize ${state.mode === item ? "bg-slate-600 text-slate-100" : "text-slate-300 hover:bg-slate-700"}`}
              >
                {item}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={state.mode} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="space-y-3">
              {state.mode === "duration" && (
                <>
                  <div className="grid grid-cols-2 gap-2">
                    <input value={state.durationHours} onChange={(e) => setState((p) => ({ ...p, durationHours: e.target.value }))} className="rounded-xl border border-white/10 bg-slate-800 p-3" placeholder="Hours" />
                    <input value={state.durationMinutes} onChange={(e) => setState((p) => ({ ...p, durationMinutes: e.target.value }))} className="rounded-xl border border-white/10 bg-slate-800 p-3" placeholder="Minutes" />
                  </div>
                  <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] gap-2">
                    <input value={state.deltaHours} onChange={(e) => setState((p) => ({ ...p, deltaHours: e.target.value }))} className="rounded-xl border border-white/10 bg-slate-800 p-3" placeholder="Delta h" />
                    <button onClick={() => setState((p) => ({ ...p, durationOp: p.durationOp === "add" ? "subtract" : "add" }))} className="rounded-xl bg-slate-700 px-4 font-bold">{state.durationOp === "add" ? "+" : "-"}</button>
                    <input value={state.deltaMinutes} onChange={(e) => setState((p) => ({ ...p, deltaMinutes: e.target.value }))} className="rounded-xl border border-white/10 bg-slate-800 p-3" placeholder="Delta m" />
                  </div>
                  <button onClick={() => {
                    const first = Math.max(0, (Number(state.durationHours) || 0) * 60 + (Number(state.durationMinutes) || 0));
                    const second = Math.max(0, (Number(state.deltaHours) || 0) * 60 + (Number(state.deltaMinutes) || 0));
                    const total = state.durationOp === "add" ? first + second : first - second;
                    const computed = formatDurationMinutes(total);
                    setResult(computed);
                    pushHistory(`${formatDurationMinutes(first)} ${state.durationOp === "add" ? "+" : "-"} ${formatDurationMinutes(second)}`, computed);
                  }} className="w-full rounded-xl bg-slate-600 py-3 font-semibold">Calculate</button>
                </>
              )}

              {state.mode === "difference" && (
                <>
                  <div className="grid grid-cols-2 gap-2">
                    <input type="date" value={state.startDate} onChange={(e) => setState((p) => ({ ...p, startDate: e.target.value }))} className="rounded-xl border border-white/10 bg-slate-800 p-3 text-sm" />
                    <input type="date" value={state.endDate} onChange={(e) => setState((p) => ({ ...p, endDate: e.target.value }))} className="rounded-xl border border-white/10 bg-slate-800 p-3 text-sm" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="relative">
                      <input value={state.startTime} onChange={(e) => setState((p) => ({ ...p, startTime: e.target.value }))} onBlur={() => setState((p) => ({ ...p, startTime: normalizeLooseTimeInput(p.startTime) }))} className="w-full rounded-xl border border-white/10 bg-slate-800 p-3 pr-24 text-sm" placeholder="Start" />
                      {startPreview && <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">( {startPreview} )</span>}
                    </div>
                    <div className="relative">
                      <input value={state.endTime} onChange={(e) => setState((p) => ({ ...p, endTime: e.target.value }))} onBlur={() => setState((p) => ({ ...p, endTime: normalizeLooseTimeInput(p.endTime) }))} className="w-full rounded-xl border border-white/10 bg-slate-800 p-3 pr-24 text-sm" placeholder="End" />
                      {endPreview && <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">( {endPreview} )</span>}
                    </div>
                  </div>
                </>
              )}

              {state.mode === "convert" && (
                <>
                  <div className="space-y-2 rounded-xl border border-white/10 bg-slate-800 p-3">
                    <p className="text-xs text-slate-400">HH:MM to decimal</p>
                    <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-2">
                      <input value={state.hhmmInput} onChange={(e) => setState((p) => ({ ...p, hhmmInput: e.target.value }))} className="rounded-xl border border-white/10 bg-slate-900 p-3 text-sm" />
                      <button onClick={() => {
                        const s = parseFlexibleTimeToSeconds(state.hhmmInput);
                        if (s === null) return setResult("Use HH:MM format");
                        const computed = `${(Math.round(s / 60) / 60).toFixed(2)} hours`;
                        setResult(computed);
                        pushHistory(`${state.hhmmInput} -> decimal`, computed);
                      }} className="rounded-xl bg-slate-600 px-4 font-semibold">Go</button>
                    </div>
                  </div>
                  <div className="space-y-2 rounded-xl border border-white/10 bg-slate-800 p-3">
                    <p className="text-xs text-slate-400">Decimal to HH:MM</p>
                    <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-2">
                      <input value={state.decimalInput} onChange={(e) => setState((p) => ({ ...p, decimalInput: e.target.value }))} className="rounded-xl border border-white/10 bg-slate-900 p-3 text-sm" />
                      <button onClick={() => {
                        const d = Number(state.decimalInput);
                        if (Number.isNaN(d)) return setResult("Enter a valid decimal");
                        const computed = minutesToHHMM(Math.round(d * 60));
                        setResult(computed);
                        pushHistory(`${state.decimalInput}h -> HH:MM`, computed);
                      }} className="rounded-xl bg-slate-600 px-4 font-semibold">Go</button>
                    </div>
                  </div>
                </>
              )}

              {state.mode === "numpad" && (
                <>
                  <div className="grid grid-cols-3 gap-2">
                    {["seconds", "minutes", "hours"].map((u) => (
                      <button key={u} onClick={() => setState((p) => ({ ...p, numpadUnit: u }))} className={`rounded-xl border p-3 text-sm font-semibold ${state.numpadUnit === u ? "border-slate-500 bg-slate-600" : "border-white/10 bg-slate-800"}`}>{u[0].toUpperCase() + u.slice(1)}</button>
                    ))}
                  </div>
                  <div className="rounded-xl border border-white/10 bg-slate-800 p-3">
                    <p className="text-xs text-slate-400">Expression</p>
                    <p className="mt-1 min-h-6 font-mono text-lg">{state.numpadExpression || "0"}</p>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {keyPadKeys.map((k) => <button key={k} onClick={() => handleNumpadKey(k)} className="rounded-xl border border-white/10 bg-slate-800 py-3 font-semibold">{k}</button>)}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => handleNumpadKey("BACK")} className="rounded-xl border border-white/10 bg-slate-800 py-3 font-semibold">Backspace</button>
                    <button onClick={() => handleNumpadKey("CLEAR")} className="rounded-xl border border-white/10 bg-slate-800 py-3 font-semibold">Clear</button>
                  </div>
                  <button onClick={runNumpad} className="w-full rounded-xl bg-slate-600 py-3 font-semibold">Save to history</button>
                </>
              )}

              {state.mode === "special" && (
                <>
                  <input value={state.specialName} onChange={(e) => setState((p) => ({ ...p, specialName: e.target.value }))} className="w-full rounded-xl border border-white/10 bg-slate-800 p-3 text-sm" placeholder="Enter your name" />
                  <div className="rounded-xl border border-white/10 bg-slate-800 p-3">
                    <p className="text-xs text-slate-400">Detected class</p>
                    <p className={`mt-1 text-lg font-semibold ${specialClass ? classMap[specialClass]?.color : ""}`}>{specialResult || "Type a name to detect class"}</p>
                  </div>
                  <button onClick={() => {
                    if (!specialResult) return;
                    setResult(specialResult);
                    pushHistory(`${state.specialName} class`, specialResult);
                  }} className="w-full rounded-xl bg-slate-600 py-3 font-semibold">Save to history</button>
                </>
              )}
            </motion.div>
          </AnimatePresence>

          <motion.div key={displayResult} initial={{ opacity: 0.5, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.2 }} className="mt-4 rounded-2xl border border-white/10 bg-slate-800 p-4">
            <p className="text-xs uppercase tracking-wider text-slate-400">Result</p>
            <p className={`mt-1 text-xl font-semibold ${state.mode === "special" ? classMap[specialClass]?.color || "" : ""}`}>{displayResult}</p>
          </motion.div>
          {state.mode === "difference" && (
            <button onClick={() => {
              if (!liveDifference.valid) return;
              setResult(liveDifference.text);
              pushHistory(liveDifference.label, liveDifference.text);
            }} className="mt-3 w-full rounded-xl bg-slate-600 py-3 font-semibold">Save time to history</button>
          )}
        </section>

        <section className="mt-4 rounded-3xl border border-white/10 bg-slate-900 p-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-medium">History (stored)</h2>
            <button onClick={() => setState((p) => ({ ...p, history: [] }))} className="text-xs text-slate-400 hover:text-white">Clear</button>
          </div>
          <div className="space-y-2">
            {historyPreview.length === 0 && <p className="text-sm text-slate-400">No calculations yet.</p>}
            {historyPreview.map((item) => (
              <div key={item.id} className="rounded-xl border border-white/10 bg-slate-800 p-3">
                <p className="text-xs text-slate-400">{item.timestamp}</p>
                <p className="text-sm">{item.label}</p>
                <p className="font-semibold text-slate-200">{item.result}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
