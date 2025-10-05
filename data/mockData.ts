
import { User, Event, Role, EventStatus, EventCategory } from '../types';

export const mockUsers: User[] = [
  { id: '1', name: 'Alice Johnson (Admin)', email: 'admin@example.com', role: Role.ADMIN },
  { id: '2', name: 'Bob Williams (Organizer)', email: 'organizer@example.com', role: Role.ORGANIZER },
  { id: '3', name: 'Charlie Brown (Student)', email: 'student@example.com', role: Role.STUDENT },
  { id: '4', name: 'Diana Miller (Student)', email: 'student2@example.com', role: Role.STUDENT },
];

const today = new Date();
const getFutureDate = (days: number) => {
    const future = new Date(today);
    future.setDate(today.getDate() + days);
    return future.toISOString().split('T')[0];
}

export const mockEvents: Event[] = [
  {
    id: 'e1',
    title: 'Annual Tech Summit 2024',
    description: 'A gathering of the brightest minds in technology. Join us for keynotes, workshops, and networking.',
    date: getFutureDate(5),
    time: '09:00',
    venue: 'Main Auditorium',
    category: EventCategory.ACADEMIC,
    createdBy: '2',
    status: EventStatus.APPROVED,
    participants: ['3', '4'],
  },
  {
    id: 'e2',
    title: 'React Hooks Workshop',
    description: 'Deep dive into React Hooks and advanced patterns. Prerequesites: Basic React knowledge.',
    date: getFutureDate(12),
    time: '14:00',
    venue: 'Computer Lab 3',
    category: EventCategory.WORKSHOP,
    createdBy: '2',
    status: EventStatus.APPROVED,
    participants: [],
  },
  {
    id: 'e3',
    title: 'Spring Music Fest',
    description: 'An evening of live music from various student bands. Come and enjoy!',
    date: getFutureDate(20),
    time: '18:30',
    venue: 'University Lawn',
    category: EventCategory.CULTURAL,
    createdBy: '2',
    status: EventStatus.PENDING,
    participants: ['3'],
  },
  {
    id: 'e4',
    title: 'Inter-Departmental Football Match',
    description: 'Cheer for your department in the final match of the tournament.',
    date: getFutureDate(8),
    time: '16:00',
    venue: 'Sports Ground',
    category: EventCategory.SPORTS,
    createdBy: '2',
    status: EventStatus.APPROVED,
    participants: [],
  },
  {
    id: 'e5',
    title: 'Guest Lecture on AI Ethics',
    description: 'A talk by Dr. Evelyn Reed on the ethical implications of artificial intelligence.',
    date: getFutureDate(2),
    time: '11:00',
    venue: 'Lecture Hall C',
    category: EventCategory.ACADEMIC,
    createdBy: '1',
    status: EventStatus.APPROVED,
    participants: ['4'],
  },
];
