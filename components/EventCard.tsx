import React, { useState } from 'react';
import { Event, Role } from '../types';
import { useAuth } from '../context/AuthContext';
import { eventApi } from '../services/eventApi';
import { CATEGORY_COLORS } from '../constants';

interface EventCardProps {
  event: Event;
  onEdit: (event: Event) => void;
  refreshEvents: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onEdit, refreshEvents }) => {
    const { user } = useAuth();
    const [isRegistering, setIsRegistering] = useState(false);

    const isUserRegistered = user ? event.participants.includes(user.id) : false;
    const canManage = user?.role === Role.ADMIN || user?.id === event.createdBy;

    const categoryColor = CATEGORY_COLORS[event.category] || { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-500' };

    const handleRegister = async () => {
        if (!user) return;
        setIsRegistering(true);
        if (isUserRegistered) {
            await eventApi.unregisterForEvent(event.id, user.id);
        } else {
            await eventApi.registerForEvent(event.id, user.id);
        }
        refreshEvents();
        setIsRegistering(false);
    };
    
    const handleDelete = async () => {
      if (!window.confirm(`Are you sure you want to delete "${event.title}"?`)) return;
      await eventApi.deleteEvent(event.id);
      refreshEvents();
    };

    const [month, day] = new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).split(' ');

    return (
        <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border-t-4 ${categoryColor.border} flex flex-col group hover:shadow-xl transition-all-ease`}>
            <div className="p-5 flex-grow">
                <div className="flex justify-between items-start mb-3">
                    <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${categoryColor.bg} ${categoryColor.text}`}>
                        {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                    </span>
                     {canManage && (
                         <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => onEdit(event)} className="text-gray-400 hover:text-blue-500 dark:hover:text-blue-400" aria-label="Edit event">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>
                            </button>
                            <button onClick={handleDelete} className="text-gray-400 hover:text-red-500 dark:hover:text-red-400" aria-label="Delete event">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" /></svg>
                            </button>
                        </div>
                    )}
                </div>
                <div className="flex items-start space-x-4">
                    <div className="text-center flex-shrink-0">
                        <p className="text-sm font-semibold text-primary-600 dark:text-primary-400">{month.toUpperCase()}</p>
                        <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">{day}</p>
                    </div>
                    <div className="flex-grow">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-1 leading-tight">{event.title}</h3>
                         <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                            <p className="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> {event.time}</p>
                            <p className="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg> {event.venue}</p>
                        </div>
                    </div>
                </div>
                 <p className="text-gray-600 dark:text-gray-300 text-sm mt-3">{event.description}</p>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-800/50 flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">{event.participants.length} registered</span>
                {user && (
                    <button
                        onClick={handleRegister}
                        disabled={isRegistering}
                        className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all-ease ${isUserRegistered ? 'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/50 dark:text-red-200 dark:hover:bg-red-900' : 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/50 dark:text-green-200 dark:hover:bg-green-900'} disabled:opacity-50`}
                    >
                        {isRegistering ? '...' : (isUserRegistered ? 'Unregister' : 'Register')}
                    </button>
                )}
            </div>
        </div>
    );
};

export default EventCard;