import { LoginForm } from "@/components/auth/LoginForm";
import { Shield } from "lucide-react";

export default function AdminLoginPage() {
  return (
    <LoginForm
      title="Admin Portal"
      description="Access the event management dashboard."
      icon={<Shield className="h-6 w-6" />}
      dashboardPath="/admin/dashboard"
    />
  );
}
