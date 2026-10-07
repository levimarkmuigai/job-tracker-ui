import { useMemo, useState } from "react";
import { fakeApplications, type Application } from "../hooks/useFakeData";
import { STATUSES, statusConfig, type Status } from "./status";
import { Modal } from "./Modal";
import { ApplicationsTable } from "./ApplicationsTable";
import { ApplicationsBoard } from "./ApplicationsBoard";
import { CreateApplicationForm } from "./CreateApplicationForm";
import { UpdateApplicationForm } from "./UpdateApplicationForm";

type View = "table" | "board";

export function ApplicationsView() {
  const applications = fakeApplications;
  const [view, setView] = useState<View>("table");
  const [statusFilter, setStatusFilter] = useState<Status | "all">("all");
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState<Application | null>(null);

  const filtered = useMemo(
    () =>
      statusFilter === "all" ? applications : applications.filter((a) => a.status === statusFilter),
    [applications, statusFilter],
  );

  return (
    <div className="min-h-screen px-6 py-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-ink">Applications</h1>
          <div className="flex items-center gap-3">
            <div className="flex rounded-md border border-line bg-surface p-0.5 text-sm">
              <button
                onClick={() => setView("table")}
                className={`rounded px-3 py-1 ${view === "table" ? "bg-accent text-white" : "text-muted"}`}
              >
                Table
              </button>
              <button
                onClick={() => setView("board")}
                className={`rounded px-3 py-1 ${view === "board" ? "bg-accent text-white" : "text-muted"}`}
              >
                Board
              </button>
            </div>
            <button
              onClick={() => setCreating(true)}
              className="rounded-md bg-accent px-3 py-1.5 text-sm font-medium text-white hover:bg-accent-hover"
            >
              Add application
            </button>
          </div>
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as Status | "all")}
          className="mb-4 rounded-md border border-line bg-surface px-2 py-1 text-sm text-ink"
        >
          <option value="all">All statuses</option>
          {STATUSES.map((status) => (
            <option key={status} value={status}>
              {statusConfig[status].label}
            </option>
          ))}
        </select>

        {view === "table" && <ApplicationsTable applications={filtered} onSelect={setEditing} />}
        {view === "board" && <ApplicationsBoard applications={filtered} onSelect={setEditing} />}
      </div>

      {creating && (
        <Modal title="Add application" onClose={() => setCreating(false)}>
          <CreateApplicationForm onClose={() => setCreating(false)} />
        </Modal>
      )}

      {editing && (
        <Modal title="Edit application" onClose={() => setEditing(null)}>
          <UpdateApplicationForm application={editing} onClose={() => setEditing(null)} />
        </Modal>
      )}
    </div>
  );
}
