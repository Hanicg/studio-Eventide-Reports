import { EventDataTable } from "@/components/admin/EventDataTable";
import { IntelligentAlerting } from "@/components/admin/IntelligentAlerting";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { events } from "@/lib/data";
import { BarChart, Users, Calendar } from "lucide-react";

export default function AdminDashboardPage() {
  const totalEvents = events.length;
  const totalRegistrations = events.reduce((sum, event) => sum + event.registrations, 0);
  const totalCheckIns = events.reduce((sum, event) => sum + event.checkedIn, 0);
  const overallAttendance = totalRegistrations > 0 ? Math.round((totalCheckIns / totalRegistrations) * 100) : 0;
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEvents}</div>
            <p className="text-xs text-muted-foreground">All scheduled events</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Registrations</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRegistrations}</div>
            <p className="text-xs text-muted-foreground">Across all events</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Attendance</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallAttendance}%</div>
            <p className="text-xs text-muted-foreground">Average check-in rate</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
          <div className="lg:col-span-2">
            <EventDataTable />
          </div>
          <div className="lg:col-span-2">
            <IntelligentAlerting events={events} />
          </div>
      </div>
    </div>
  );
}
