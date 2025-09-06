# Eventide Reports

Welcome to Eventide Reports, a modern platform designed to streamline event management for educational institutions. This application provides distinct portals for students and administrators, ensuring that everyone has the right tools to manage their event-related activities efficiently.

From browsing and registering for events to analyzing attendance trends and generating intelligent alerts, Eventide Reports is built to make event coordination seamless and insightful.

## Key Features

Eventide Reports is split into two main user experiences: one for students and one for administrators.

### Student Portal

- **Browse Events**: Students can explore a visually rich list of all upcoming events, complete with descriptions, dates, and locations.
- **Simple Registration**: A one-click registration system allows students to sign up for events effortlessly.
- **My Registrations**: A dedicated page where students can view all the events they have registered for.
- **Profile Management**: Students can view and update their personal and college information on their own profile page.

### Admin Portal

- **Comprehensive Dashboard**: The admin dashboard offers a high-level overview of key metrics, including total events, total registrations, and overall attendance rates.
- **Detailed Event Performance**: A data table provides a granular look at each event's performance, showing registration numbers against targets, attendance percentages, and average feedback scores.
- **Create & Manage Events**: Administrators have the ability to add new events to the system through an intuitive form, including details like event name, date, location, description, and target registration numbers.
- **Intelligent Alerting Tool**: Leveraging AI, this tool analyzes registration trends for any event. If an event is at risk of undersubscription, the system automatically drafts an alert email for the administrator, suggesting actionable steps to boost participation.

## Tech Stack

This project is built with a modern, performant, and scalable technology stack:

- **Framework**: [Next.js](https://nextjs.org/) (using the App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI**: [React](https://reactjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Component Library**: [ShadCN UI](https://ui.shadcn.com/)
- **AI Integration**: [Genkit](https://firebase.google.com/docs/genkit) for the intelligent alerting features.
- **Icons**: [Lucide React](https://lucide.dev/guide/packages/lucide-react)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have Node.js and npm (or yarn) installed on your machine.

- Node.js (v18 or later recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```sh
   git clone <your-repository-url>
   ```
2. Navigate to the project directory:
   ```sh
   cd eventide-reports
   ```
3. Install the dependencies:
   ```sh
   npm install
   ```

### Running the Application

Once the installation is complete, you can run the development server:

```sh
npm run dev
```

This will start the application on `http://localhost:9002`.

You can start exploring the application by visiting the homepage, which provides links to both the student and admin login portals. For quick access, sample login credentials are provided on each login form.
