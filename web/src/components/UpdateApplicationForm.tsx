// src/components/UpdateApplicationForm.tsx
import { type Application } from "../hooks/useFakeData";
import { STATUSES, statusConfig, toDateInputValue } from "./status";

export function UpdateApplicationForm({
  application,
  onClose,
}: {
  application: Application;
  onClose: () => void;
}) {
  const inputClass =
    "w-full rounded-md border border-line bg-surface px-3 py-1.5 text-sm text-ink focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent";

  return (
    <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
      <input
        name="company"
        placeholder="Company"
        defaultValue={application.company}
        autoFocus
        className={inputClass}
      />
      <input
        name="role"
        placeholder="Role"
        defaultValue={application.role}
        className={inputClass}
      />
      <select name="status" defaultValue={application.status} className={inputClass}>
        {STATUSES.map((status) => (
          <option key={status} value={status}>
            {statusConfig[status].label}
          </option>
        ))}
      </select>
      <input
        name="dateApplied"
        type="date"
        defaultValue={toDateInputValue(application.dateApplied)}
        className={inputClass}
      />
      <input
        name="link"
        type="url"
        placeholder="Listing link"
        defaultValue={application.link ?? ""}
        className={inputClass}
      />
      <input
        name="source"
        placeholder="Source"
        defaultValue={application.source ?? ""}
        className={inputClass}
      />
      <input
        name="nextAction"
        placeholder="Next action"
        defaultValue={application.nextAction ?? ""}
        className={inputClass}
      />
      <input
        name="nextActionDate"
        type="date"
        defaultValue={toDateInputValue(application.nextActionDate)}
        className={inputClass}
      />
      <textarea
        name="notes"
        rows={3}
        placeholder="Notes"
        defaultValue={application.notes ?? ""}
        className={inputClass}
      />

      <div className="flex items-center justify-between pt-1">
        <button type="button" className="text-sm font-medium text-danger hover:underline">
          Delete
        </button>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-line px-3 py-1.5 text-sm font-medium text-ink hover:bg-paper"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-accent px-3 py-1.5 text-sm font-medium text-white hover:bg-accent-hover"
          >
            Save changes
          </button>
        </div>
      </div>
    </form>
  );
}
