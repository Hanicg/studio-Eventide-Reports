export default function MyRegistrationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">My Registrations</h1>
        <p className="text-muted-foreground">
          Here are the events you've signed up for.
        </p>
      </div>
      <div className="flex items-center justify-center text-center py-20">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Coming Soon!</h2>
          <p className="text-muted-foreground max-w-md">
            The ability to see your registered events is under construction. Please check back later!
          </p>
        </div>
      </div>
    </div>
  );
}
