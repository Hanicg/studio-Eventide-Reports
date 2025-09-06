import { RegisteredEventList } from "@/components/student/RegisteredEventList";

export default function MyRegistrationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">My Registrations</h1>
        <p className="text-muted-foreground">
          Here are the events you've signed up for.
        </p>
      </div>
      <RegisteredEventList />
    </div>
  );
}
