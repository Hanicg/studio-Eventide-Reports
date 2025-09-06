import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Rocket } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="p-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-headline text-lg font-semibold">
          <Rocket className="w-6 h-6 text-primary" />
          <span>Eventide Reports</span>
        </Link>
      </header>
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="text-center space-y-8">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter font-headline bg-gradient-to-r from-primary via-blue-500 to-teal-400 text-transparent bg-clip-text">
              Smarter Event Insights
            </h1>
            <p className="text-muted-foreground md:text-xl max-w-2xl mx-auto">
              Welcome to Eventide Reports. Your all-in-one solution for event management, analysis, and intelligent alerting.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Card className="w-full sm:w-80 hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="font-headline">For Students</CardTitle>
                <CardDescription>Browse, register, and check-in to events.</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/login/student" legacyBehavior>
                  <Button className="w-full" variant="outline">
                    Student Portal <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
            <Card className="w-full sm:w-80 hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="font-headline">For Admins</CardTitle>
                <CardDescription>Manage events and access detailed reports.</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/login/admin" legacyBehavior>
                  <Button className="w-full">
                    Admin Portal <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <footer className="text-center p-4 md:px-6 text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Eventide Reports. All rights reserved.</p>
      </footer>
    </div>
  );
}
