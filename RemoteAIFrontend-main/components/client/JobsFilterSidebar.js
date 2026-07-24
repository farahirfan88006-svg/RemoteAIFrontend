"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import SearchableMultiSelect from "./SearchableMultiSelect";
import { STATIC_FILTER_GROUPS } from "@/lib/jobs/constants";
import { buildJobsHref, hasActiveJobFilters } from "@/lib/jobs/searchParams";
import styles from "./JobsFilterSidebar.module.css";

/**
 * Filter sidebar for /jobs: category, country, job type, experience,
 * location, remote type, and salary range — all URL-driven.
 *
 * Renders as a real GET <form> (functions with no JS: submitting navigates
 * to `/jobs?...` with every field serialized as a native query string). The
 * client-only enhancement is intercepting submit so filter changes don't
 * clobber the current sort. On small screens the form is collapsible,
 * mirroring the Navbar's mobile-toggle pattern.
 *
 * Category and country are rendered as searchable dropdowns
 * (SearchableMultiSelect) sourced from real, currently-active data —
 * `categories`/`countries` are fetched once server-side (see
 * app/jobs/page.js and lib/api/taxonomy.js) and passed in as props, so
 * this component never fetches them itself. Location stays a free-text
 * input: unlike category/country, it's not backed by a bounded taxonomy
 * endpoint, so a fixed dropdown would drift from what jobs actually have.
 *
 * @param {{ filters: object, categories: Array<{name:string,slug:string,count:number}>, countries: Array<{name:string,slug:string,count:number}> }} props
 */
export default function JobsFilterSidebar({ filters, categories = [], countries = [] }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const activeCount = countActiveFilters(filters);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    router.push(
      buildJobsHref(filters, {
        category: formData.getAll("category"),
        country: formData.getAll("country"),
        type: formData.getAll("type"),
        experience: formData.getAll("experience"),
        remoteType: formData.getAll("remoteType"),
        location: String(formData.get("location") || "").trim(),
        salaryMin: formData.get("salaryMin") || undefined,
        salaryMax: formData.get("salaryMax") || undefined,
        sort: filters.sort,
      }),
    );
    setIsOpen(false);
  }

  function handleClear() {
    router.push("/jobs");
    setIsOpen(false);
  }

  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        className={styles.mobileToggle}
        aria-expanded={isOpen}
        aria-controls="jobs-filter-form"
        onClick={() => setIsOpen((open) => !open)}
      >
        Filters {activeCount > 0 ? `(${activeCount})` : ""}
      </button>

      <form
        id="jobs-filter-form"
        className={styles.form}
        data-open={isOpen}
        action="/jobs"
        method="GET"
        onSubmit={handleSubmit}
      >
        <SearchableMultiSelect
          id="filter-category"
          name="category"
          label="Category"
          placeholder="All categories"
          searchPlaceholder="Search categories…"
          options={categories}
          defaultValues={filters.category}
          emptyMessage="No categories available"
        />

        <SearchableMultiSelect
          id="filter-country"
          name="country"
          label="Country"
          placeholder="All countries"
          searchPlaceholder="Search countries…"
          options={countries}
          defaultValues={filters.country}
          emptyMessage="No countries available"
          valueKey="name"
        />

        <div className={styles.field}>
          <label htmlFor="filter-location">Location</label>
          <input
            id="filter-location"
            name="location"
            type="text"
            placeholder="City, country, or timezone"
            defaultValue={filters.location}
          />
        </div>

        {STATIC_FILTER_GROUPS.map((group) => (
          <fieldset key={group.key} className={styles.field}>
            <legend>{group.label}</legend>
            <div className={styles.checkboxGroup}>
              {group.options.map((option) => (
                <label key={option.value} className={styles.checkboxOption}>
                  <input
                    type="checkbox"
                    name={group.key}
                    value={option.value}
                    defaultChecked={filters[group.key].includes(option.value)}
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </fieldset>
        ))}

        <fieldset className={styles.field}>
          <legend>Salary range (USD/yr)</legend>
          <div className={styles.salaryRow}>
            <input
              type="number"
              inputMode="numeric"
              name="salaryMin"
              min="0"
              step="1000"
              placeholder="Min"
              defaultValue={filters.salaryMin ?? ""}
              aria-label="Minimum salary"
            />
            <span aria-hidden="true">–</span>
            <input
              type="number"
              inputMode="numeric"
              name="salaryMax"
              min="0"
              step="1000"
              placeholder="Max"
              defaultValue={filters.salaryMax ?? ""}
              aria-label="Maximum salary"
            />
          </div>
        </fieldset>

        <div className={styles.actions}>
          <Button type="submit" variant="primary" className={styles.applyButton}>
            Apply filters
          </Button>
          {hasActiveJobFilters(filters) && (
            <Button type="button" variant="ghost" onClick={handleClear}>
              Clear all
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

function countActiveFilters(filters) {
  return (
    filters.category.length +
    filters.country.length +
    filters.type.length +
    filters.experience.length +
    filters.remoteType.length +
    (filters.location ? 1 : 0) +
    (filters.salaryMin ? 1 : 0) +
    (filters.salaryMax ? 1 : 0)
  );
}
