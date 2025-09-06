export interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  description: string;
  imageUrl: string;
  dataAiHint: string;
  registrations: number;
  targetRegistrations: number;
  checkedIn: number;
  feedback: number[]; // Array of scores from 1 to 5
  deadline: string; // ISO date string
  collegeId: string;
  collegeName: string;
}
