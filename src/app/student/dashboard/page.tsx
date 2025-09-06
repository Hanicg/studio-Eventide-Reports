import { EventList } from "@/components/student/EventList";

export default function StudentDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Browse Events</h1>
        <p className="text-muted-foreground">Find and register for upcoming events.</p>
      </div>
      <EventList />
    </div>
  );
}
