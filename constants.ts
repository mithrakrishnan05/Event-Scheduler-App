import { Role, EventCategory } from './types';

export const ROLES_CAN_CREATE_EVENTS = [Role.ADMIN, Role.ORGANIZER];

export const CATEGORY_COLORS: Record<EventCategory, { bg: string; text: string; border: string }> = {
    [EventCategory.ACADEMIC]: { 
        bg: 'bg-blue-100 dark:bg-blue-900/50', 
        text: 'text-blue-800 dark:text-blue-200', 
        border: 'border-blue-500' 
    },
    [EventCategory.CULTURAL]: { 
        bg: 'bg-purple-100 dark:bg-purple-900/50', 
        text: 'text-purple-800 dark:text-purple-200', 
        border: 'border-purple-500' 
    },
    [EventCategory.WORKSHOP]: { 
        bg: 'bg-amber-100 dark:bg-amber-900/50', 
        text: 'text-amber-800 dark:text-amber-200', 
        border: 'border-amber-500' 
    },
    [EventCategory.SPORTS]: { 
        bg: 'bg-green-100 dark:bg-green-900/50', 
        text: 'text-green-800 dark:text-green-200', 
        border: 'border-green-500' 
    },
};