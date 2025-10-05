
import { mockUsers, mockEvents } from '../data/mockData';
import { User, Event, EventStatus } from '../types';

// Simulate API latency
const apiCall = <T,>(data: T): Promise<T> => {
    return new Promise(resolve => setTimeout(() => resolve(data), 500));
};

let users = [...mockUsers];
let events = [...mockEvents];

export const authApi = {
    login: async (email: string): Promise<User | null> => {
        const user = users.find(u => u.email === email);
        return apiCall(user || null);
    },
    getUsers: async (): Promise<User[]> => {
        return apiCall(users);
    },
};

export const eventApi = {
    getEvents: async (): Promise<Event[]> => {
        return apiCall(events);
    },
    createEvent: async (eventData: Omit<Event, 'id' | 'participants'>): Promise<Event> => {
        const newEvent: Event = {
            ...eventData,
            id: `e${Date.now()}`,
            participants: [],
        };
        events.push(newEvent);
        return apiCall(newEvent);
    },
    updateEvent: async (eventId: string, updates: Partial<Event>): Promise<Event | null> => {
        const eventIndex = events.findIndex(e => e.id === eventId);
        if (eventIndex === -1) return apiCall(null);
        events[eventIndex] = { ...events[eventIndex], ...updates };
        return apiCall(events[eventIndex]);
    },
    deleteEvent: async (eventId: string): Promise<boolean> => {
        const initialLength = events.length;
        events = events.filter(e => e.id !== eventId);
        return apiCall(events.length < initialLength);
    },
    registerForEvent: async(eventId: string, userId: string): Promise<Event | null> => {
        const eventIndex = events.findIndex(e => e.id === eventId);
        if (eventIndex === -1) return apiCall(null);
        const event = events[eventIndex];
        if (!event.participants.includes(userId)) {
            event.participants.push(userId);
        }
        return apiCall(event);
    },
    unregisterForEvent: async(eventId: string, userId: string): Promise<Event | null> => {
        const eventIndex = events.findIndex(e => e.id === eventId);
        if (eventIndex === -1) return apiCall(null);
        const event = events[eventIndex];
        event.participants = event.participants.filter(pId => pId !== userId);
        return apiCall(event);
    }
};
