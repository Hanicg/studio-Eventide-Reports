"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Building, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const profileSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  collegeName: z.string().min(2, { message: "College name must be at least 2 characters." }),
  collegeId: z.string().min(1, { message: "College ID is required." }),
  studentId: z.string().min(1, { message: "Student ID is required." }),
});

export function ProfileForm() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "Alex Doe",
      email: "student@example.com",
      collegeName: "Stanford University",
      collegeId: "C001",
      studentId: "STU12345",
    },
  });

  function onSubmit(values: z.infer<typeof profileSchema>) {
    console.log(values);
    toast({
      title: "Profile Updated!",
      description: "Your information has been successfully saved.",
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <User />
          Personal Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20">
                    <AvatarImage src="https://picsum.photos/200" alt="Student Avatar" data-ai-hint="student avatar" />
                    <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div className="grid gap-6 md:grid-cols-2 flex-1">
                    <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="flex items-center gap-2"><User className="h-4 w-4"/> Full Name</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g. Alex Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="flex items-center gap-2"><Mail className="h-4 w-4"/> Email Address</FormLabel>
                        <FormControl>
                            <Input type="email" placeholder="e.g. student@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
            </div>
             <div className="grid gap-6 md:grid-cols-3">
                <FormField
                    control={form.control}
                    name="collegeName"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="flex items-center gap-2"><Building className="h-4 w-4"/> College Name</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g. Stanford University" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="collegeId"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>College ID</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g. C001" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="studentId"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Student ID</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g. STU12345" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            
            <Button type="submit">Save Changes</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
