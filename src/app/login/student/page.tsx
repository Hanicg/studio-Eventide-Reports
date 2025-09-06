import { LoginForm } from "@/components/auth/LoginForm";
import { User } from "lucide-react";

export default function StudentLoginPage() {
  return (
    <LoginForm
      title="Student Portal"
      description="Log in to browse and register for events."
      icon={<User className="h-6 w-6" />}
      dashboardPath="/student/dashboard"
    />
  );
}
