import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { StarRating } from "@/components/common/StarRating";
import { events } from "@/lib/data";
import { cn } from "@/lib/utils";
import { format } from 'date-fns';

function getAttendancePercentage(checkedIn: number, registrations: number) {
  if (registrations === 0) return 0;
  return Math.round((checkedIn / registrations) * 100);
}

function getAverageFeedback(feedback: number[]) {
  if (feedback.length === 0) return 0;
  return feedback.reduce((a, b) => a + b, 0) / feedback.length;
}

function getStatus(deadline: string, target: number, current: number) {
    const deadlineDate = new Date(deadline);
    const now = new Date();
    const percentage = current / target;

    if (now > deadlineDate) {
        return { text: 'Closed', color: 'bg-gray-500' };
    }
    if (percentage >= 1) {
        return { text: 'Full', color: 'bg-green-500' };
    }
    if (percentage >= 0.75) {
        return { text: 'On Track', color: 'bg-blue-500' };
    }
    if (now < deadlineDate) {
        return { text: 'At Risk', color: 'bg-red-500' };
    }
    return { text: 'Open', color: 'bg-yellow-500' };
}

export function EventDataTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Event Performance</CardTitle>
        <CardDescription>A summary of all ongoing and past events.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event</TableHead>
                <TableHead>College</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">Registrations</TableHead>
                <TableHead className="text-right">Attendance</TableHead>
                <TableHead className="text-right">Feedback</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((event) => {
                const attendance = getAttendancePercentage(event.checkedIn, event.registrations);
                const feedback = getAverageFeedback(event.feedback);
                const status = getStatus(event.deadline, event.targetRegistrations, event.registrations);

                return (
                  <TableRow key={event.id}>
                    <TableCell className="font-medium">{event.name}</TableCell>
                    <TableCell>{event.collegeName}</TableCell>
                    <TableCell>{format(new Date(event.date), 'MMM dd, yyyy')}</TableCell>
                    <TableCell className="text-center">
                        <Badge variant="outline" className="flex items-center justify-center gap-2 w-24">
                            <span className={cn("h-2 w-2 rounded-full", status.color)}></span>
                            {status.text}
                        </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {event.registrations} / {event.targetRegistrations}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <span>{attendance}%</span>
                        <Progress value={attendance} className="w-20" />
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <span>{feedback.toFixed(1)}</span>
                        <StarRating score={feedback} />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
