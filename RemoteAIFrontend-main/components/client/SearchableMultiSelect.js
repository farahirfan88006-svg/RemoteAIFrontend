"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./SearchableMultiSelect.module.css";

/**
 * Searchable, checkbox-style multi-select dropdown for open-ended,
 * dynamic option lists (category, country) that come from the API rather
 * than a fixed enum — see lib/api/taxonomy.js.
 *
 * Deliberately NOT a controlled `<select>`: it renders one hidden
 * `<input type="hidden" name={name} value={...}>` per selected option, so
 * it plugs directly into JobsFilterSidebar's existing native `<form>` +
 * `FormData.getAll(name)` submit flow (see JobsFilterSidebar.js) without
 * that form needing any special-casing for this control versus the
 * checkbox groups it already renders.
 *
 * Receives its `options` as a prop rather than fetching them itself —
 * the parent page loads categories/countries once (server-side, cached by
 * Next's fetch cache) and passes them down, so opening/closing/searching
 * within this dropdown never triggers a network request.
 *
 * @param {{
 *   id: string,
 *   name: string,
 *   label: string,
 *   placeholder: string,
 *   searchPlaceholder: string,
 *   options: Array<{ name: string, slug: string, count: number }>,
 *   defaultValues: string[],
 *   emptyMessage?: string,
 * }} props
 */
export default function SearchableMultiSelect({
  id,
  name,
  label,
  placeholder,
  searchPlaceholder = "Search…",
  options,
  defaultValues,
  emptyMessage = "No options available",
  // Which field of each option is used as this control's value (submitted
  // in the hidden inputs and matched against `defaultValues`). Category
  // filters match against Job.category, which is stored as a slug (see
  // backend utils/categoryTaxonomy.js) — but Job.country is stored as a
  // canonical display name, not a slug (see backend
  // utils/countryTaxonomy.js) — so country must use "name" here instead.
  valueKey = "slug",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  // Selection lives in React state (initialized once from the URL-derived
  // defaultValues) so checking/unchecking options re-renders the summary
  // label and the hidden inputs immediately, without needing to re-fetch
  // or re-derive `options` itself.
  const [selected, setSelected] = useState(() => new Set(defaultValues));
  const wrapperRef = useRef(null);

  // Keep selection in sync if the URL changes underneath this component
  // (e.g. "Clear all", browser back/forward) rather than only on mount.
  useEffect(() => {
    setSelected(new Set(defaultValues));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValues.join(",")]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event) {
      if (event.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const filteredOptions = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return options;
    return options.filter((option) => option.name.toLowerCase().includes(query));
  }, [options, search]);

  function toggleOption(value) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
  }

  function clearSelection(event) {
    event.stopPropagation();
    setSelected(new Set());
  }

  const selectedOptions = options.filter((option) => selected.has(option[valueKey]));
  const summaryLabel =
    selectedOptions.length === 0
      ? placeholder
      : selectedOptions.length === 1
        ? selectedOptions[0].name
        : `${selectedOptions.length} selected`;

  return (
    <div className={styles.field}>
      <label htmlFor={`${id}-trigger`}>{label}</label>

      <div className={styles.wrapper} ref={wrapperRef}>
        {[...selected].map((value) => (
          <input key={value} type="hidden" name={name} value={value} />
        ))}

        <button
          id={`${id}-trigger`}
          type="button"
          className={styles.trigger}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
        >
          <span className={selectedOptions.length ? styles.triggerValue : styles.triggerPlaceholder}>
            {summaryLabel}
          </span>
          {selectedOptions.length > 0 && (
            <span
              className={styles.clearIcon}
              role="button"
              tabIndex={0}
              aria-label={`Clear ${label}`}
              onClick={clearSelection}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") clearSelection(event);
              }}
            >
              ×
            </span>
          )}
          <span className={styles.chevron} aria-hidden="true">
            ▾
          </span>
        </button>

        {isOpen && (
          <div className={styles.panel} role="listbox" aria-multiselectable="true">
            <input
              type="text"
              className={styles.search}
              placeholder={searchPlaceholder}
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              autoFocus
            />

            <div className={styles.optionList}>
              {filteredOptions.length === 0 && <p className={styles.emptyMessage}>{emptyMessage}</p>}
              {filteredOptions.map((option) => (
                <label key={option.slug} className={styles.option}>
                  <input
                    type="checkbox"
                    checked={selected.has(option[valueKey])}
                    onChange={() => toggleOption(option[valueKey])}
                  />
                  <span className={styles.optionName}>{option.name}</span>
                  <span className={styles.optionCount}>{option.count.toLocaleString()}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
