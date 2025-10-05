
export enum Role {
  STUDENT = 'student',
  ORGANIZER = 'organizer',
  ADMIN = 'admin',
}

export enum EventStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export enum EventCategory {
    WORKSHOP = 'workshop',
    CULTURAL = 'cultural',
    ACADEMIC = 'academic',
    SPORTS = 'sports',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string; // ISO string format: 'YYYY-MM-DD'
  time: string; // 'HH:MM'
  venue: string;
  category: EventCategory;
  createdBy: string; // UserId
  status: EventStatus;
  participants: string[]; // Array of UserIds
}
