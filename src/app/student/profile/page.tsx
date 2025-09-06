import { ProfileForm } from "@/components/student/ProfileForm";

export default function StudentProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">My Profile</h1>
        <p className="text-muted-foreground">Update your personal and college information.</p>
      </div>
      <ProfileForm />
    </div>
  );
}
