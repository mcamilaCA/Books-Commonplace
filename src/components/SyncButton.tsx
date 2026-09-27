"use client";

import { useActionState } from "react";
import { triggerSync, TriggerSyncState } from "@/lib/actions";
import { Button } from "@/components/ui/Button";

const initialState: TriggerSyncState = { status: "idle" };

export function SyncButton() {
  const [state, formAction, isPending] = useActionState(async () => {
    return triggerSync();
  }, initialState);

  return (
    <form action={formAction} className="flex flex-col items-start gap-2">
      <Button type="submit" variant="secondary" disabled={isPending}>
        {isPending ? "Consulting the shelves…" : "Sync from Goodreads"}
      </Button>
      {state.status !== "idle" && (
        <p
          className={`text-xs ${state.status === "error" ? "text-wine-bright" : "text-sage-bright"}`}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
