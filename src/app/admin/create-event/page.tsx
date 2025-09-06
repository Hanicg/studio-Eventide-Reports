
import { AddEventForm } from "@/components/admin/AddEventForm";

export default function CreateEventPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Create a New Event</h1>
        <p className="text-muted-foreground">Fill out the details below to add a new event to the system.</p>
      </div>
      <AddEventForm />
    </div>
  );
}
