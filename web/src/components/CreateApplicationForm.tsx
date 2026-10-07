import { STATUSES, statusConfig } from "./status";

export function CreateApplicationForm({ onClose }: { onClose: () => void }) {
  const inputClass =
    "w-full rounded-md border border-line bg-surface px-3 py-1.5 text-sm text-ink focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent";

  return (
    <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
      <input name="company" placeholder="Company" autoFocus className={inputClass} />
      <input name="role" placeholder="Role" className={inputClass} />
      <select name="status" defaultValue="applied" className={inputClass}>
        {STATUSES.map((status) => (
          <option key={status} value={status}>
            {statusConfig[status].label}
          </option>
        ))}
      </select>
      <input name="dateApplied" type="date" className={inputClass} />
      <input name="link" type="url" placeholder="Listing link" className={inputClass} />
      <input name="source" placeholder="Source" className={inputClass} />
      <textarea name="notes" rows={3} placeholder="Notes" className={inputClass} />

      <div className="flex justify-end gap-2 pt-1">
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
          Add application
        </button>
      </div>
    </form>
  );
}
