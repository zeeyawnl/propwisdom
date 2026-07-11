"use client";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  KeyboardEvent,
  useId,
} from "react";
import type { Project } from "@/lib/projects";

// ─── Props ────────────────────────────────────────────────────────────────────

interface ProjectAutocompleteProps {
  /** Full project list — passed in so the component stays data-agnostic. */
  projects: Project[];
  /** Currently selected project name (exact string) or empty string. */
  value: string;
  /** Called with the exact project name when a project is selected,
   *  or with "" when the field is cleared. */
  onChange: (value: string) => void;
  /** Input placeholder text. */
  placeholder?: string;
  /** Whether the input should be disabled. */
  disabled?: boolean;
  /** Visual variant — mirrors the LeadForm variants. */
  variant?: "light" | "dark" | "minimal";
}

// ─── Constants ────────────────────────────────────────────────────────────────

const INITIAL_COUNT = 8; // how many suggestions to show before typing

// ─── Filtering ────────────────────────────────────────────────────────────────

function filterProjects(projects: Project[], query: string): Project[] {
  const q = query.trim().toLowerCase();
  if (!q) return projects.slice(0, INITIAL_COUNT);

  return projects.filter((p) => {
    const name = p.name.toLowerCase();
    const loc  = p.location.toLowerCase();
    return (
      name.startsWith(q) ||
      name.includes(q) ||
      loc.startsWith(q) ||
      loc.includes(q)
    );
  });
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ProjectAutocomplete({
  projects,
  value,
  onChange,
  placeholder = "Search Project",
  disabled = false,
  variant = "light",
}: ProjectAutocompleteProps) {
  const uid            = useId();
  const comboboxId     = `project-autocomplete-${uid}`;
  const listboxId      = `project-listbox-${uid}`;

  const [inputValue,   setInputValue]   = useState(value);
  const [open,         setOpen]         = useState(false);
  const [activeIndex,  setActiveIndex]  = useState(-1);

  const inputRef      = useRef<HTMLInputElement>(null);
  const listRef       = useRef<HTMLUListElement>(null);
  const containerRef  = useRef<HTMLDivElement>(null);

  // Keep local input in sync when the parent clears the value externally
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // Memoised suggestions so we don't re-filter on every render
  const suggestions = useMemo(
    () => filterProjects(projects, inputValue),
    [projects, inputValue]
  );

  // Reset active index whenever suggestions list changes
  useEffect(() => {
    setActiveIndex(-1);
  }, [suggestions]);

  // Scroll the highlighted item into view
  useEffect(() => {
    if (activeIndex >= 0 && listRef.current) {
      const item = listRef.current.children[activeIndex] as HTMLElement | undefined;
      item?.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ── Handlers ────────────────────────────────────────────────────────────────

  function handleFocus() {
    setOpen(true);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value;
    setInputValue(v);
    onChange("");    // clear confirmed selection while typing
    setOpen(true);
  }

  const selectProject = useCallback(
    (project: Project) => {
      setInputValue(project.name);
      onChange(project.name);
      setOpen(false);
      inputRef.current?.blur();
    },
    [onChange]
  );

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (!open) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        setOpen(true);
        return;
      }
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, -1));
        break;
      case "Enter":
        e.preventDefault();
        if (activeIndex >= 0 && suggestions[activeIndex]) {
          selectProject(suggestions[activeIndex]);
        }
        break;
      case "Escape":
        setOpen(false);
        setActiveIndex(-1);
        break;
      case "Tab":
        // Close on Tab; do NOT prevent default so focus moves naturally
        setOpen(false);
        setActiveIndex(-1);
        break;
    }
  }

  // ── Variant-specific styles ──────────────────────────────────────────────────

  const inputClassName: string = (() => {
    const base = "w-full outline-none transition-all duration-300 font-light";

    if (variant === "minimal") {
      return `${base} bg-transparent border-b py-3 text-slate-900 focus:outline-none peer placeholder-transparent border-slate-300 focus:border-teal-forest`;
    }
    if (variant === "dark") {
      return `${base} bg-white/5 border border-white/10 px-4 py-3.5 text-sm text-white rounded-xl placeholder:text-white/30 hover:border-white/20 focus:border-vanilla-latte focus:bg-white/10 focus:ring-2 focus:ring-vanilla-latte/10`;
    }
    // light (default)
    return `${base} bg-slate-50/50 border border-slate-200 px-4 py-3.5 text-sm text-slate-900 rounded-xl placeholder:text-slate-400 hover:border-slate-300 focus:bg-white focus:border-teal-forest focus:ring-2 focus:ring-teal-forest/10`;
  })();

  const labelClassName: string = (() => {
    if (variant === "minimal") {
      return "absolute left-0 -top-5 text-[11px] uppercase tracking-widest text-slate-400 font-bold transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:font-light peer-placeholder-shown:tracking-normal peer-focus:-top-5 peer-focus:text-[11px] peer-focus:tracking-widest peer-focus:font-bold peer-focus:text-teal-forest";
    }
    if (variant === "dark") {
      return "text-[10px] uppercase tracking-widest font-bold text-white/40";
    }
    // light
    return "text-[10px] uppercase tracking-widest text-slate-400 font-bold";
  })();

  // ── Render ───────────────────────────────────────────────────────────────────

  const isMinimal = variant === "minimal";
  const isDark    = variant === "dark";

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${isMinimal ? "group" : "flex flex-col gap-1.5"}`}
    >
      {/* Label — rendered before input for minimal (absolute), after for others */}
      {!isMinimal && (
        <label htmlFor={comboboxId} className={labelClassName}>
          Project
        </label>
      )}

      {/* Combobox input wrapper */}
      <div className="relative">
        <input
          ref={inputRef}
          id={comboboxId}
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-activedescendant={
            activeIndex >= 0 ? `${listboxId}-option-${activeIndex}` : undefined
          }
          type="text"
          value={inputValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          placeholder={isMinimal ? placeholder : placeholder}
          disabled={disabled}
          autoComplete="off"
          suppressHydrationWarning
          className={inputClassName}
        />

        {/* Clear button — shown only when there is a confirmed selection */}
        {value && !disabled && (
          <button
            type="button"
            aria-label="Clear project selection"
            onClick={() => {
              setInputValue("");
              onChange("");
              inputRef.current?.focus();
            }}
            className={`absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-5 h-5 rounded-full transition-opacity hover:opacity-100 opacity-50 ${
              isDark ? "text-white/60 hover:text-white" : "text-slate-400 hover:text-slate-700"
            }`}
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        )}
      </div>

      {/* Floating label for minimal variant */}
      {isMinimal && (
        <label htmlFor={comboboxId} className={labelClassName}>
          Project
        </label>
      )}

      {/* Suggestion panel */}
      {open && suggestions.length > 0 && (
        <ul
          ref={listRef}
          id={listboxId}
          role="listbox"
          aria-label="Projects"
          className={`absolute z-50 mt-1 w-full bg-white rounded-2xl shadow-xl border border-slate-100 overflow-y-auto max-h-64 py-1 ${
            isMinimal ? "top-[calc(100%+4px)]" : "top-[calc(100%+4px)]"
          }`}
          style={{ top: "calc(100% + 4px)" }}
        >
          {suggestions.map((project, index) => {
            const isActive = index === activeIndex;
            return (
              <li
                key={project.name}
                id={`${listboxId}-option-${index}`}
                role="option"
                aria-selected={project.name === value}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseDown={(e) => {
                  // Prevent blur before click registers
                  e.preventDefault();
                  selectProject(project);
                }}
                className={`flex flex-col px-4 py-3 cursor-pointer select-none transition-colors ${
                  isActive
                    ? "bg-teal-50"
                    : project.name === value
                    ? "bg-teal-50/60"
                    : "hover:bg-slate-50"
                }`}
              >
                <span
                  className={`text-sm font-light leading-tight ${
                    isActive || project.name === value
                      ? "text-teal-800"
                      : "text-slate-900"
                  }`}
                >
                  {project.name}
                </span>
                <span className="text-xs text-slate-400 font-light mt-0.5">
                  {project.location}
                </span>
              </li>
            );
          })}
        </ul>
      )}

      {/* No results */}
      {open && inputValue.trim() && suggestions.length === 0 && (
        <div
          className="absolute z-50 mt-1 w-full bg-white rounded-2xl shadow-xl border border-slate-100 px-4 py-3"
          style={{ top: "calc(100% + 4px)" }}
        >
          <span className="text-sm text-slate-400 font-light">No projects found</span>
        </div>
      )}
    </div>
  );
}
