"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

interface LoginFormProps {
  title: string;
  description: string;
  icon: ReactNode;
  dashboardPath: string;
}

export function LoginForm({ title, description, icon, dashboardPath }: LoginFormProps) {
  const isAdmin = title.toLowerCase().includes('admin');

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-sm mx-4">
        <CardHeader className="text-center">
          <div className="mx-auto bg-primary text-primary-foreground rounded-full p-3 w-fit mb-4">
            {icon}
          </div>
          <CardTitle className="font-headline text-2xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
            <Link href={dashboardPath} legacyBehavior>
              <Button type="submit" className="w-full">
                Login <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </form>
          {!isAdmin && (
             <div className="mt-4 text-center text-sm">
              Don't have an account?{" "}
              <Link href="/signup/student" className="underline">
                Sign up
              </Link>
            </div>
          )}
          <Alert className="mt-4">
            <Info className="h-4 w-4" />
            <AlertDescription className="text-xs">
              <strong>Sample credentials:</strong><br />
              Email: {isAdmin ? 'admin@example.com' : 'student@example.com'}<br />
              Password: {isAdmin ? 'admin123' : 'student123'}
            </AlertDescription>
          </Alert>
          <div className="mt-4 text-center text-sm">
            <Link href="/" className="underline">
              Back to Home
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
