import React, { useState, useEffect, useCallback } from 'react';
import { Event, Role } from '../types';
import { eventApi } from '../services/eventApi';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import EventCard from '../components/EventCard';
import EventCalendar from '../components/EventCalendar';
import Modal from '../components/Modal';
import EventForm from '../components/EventForm';
import AdminPanel from '../components/AdminPanel';
import { ROLES_CAN_CREATE_EVENTS } from '../constants';

type View = 'list' | 'calendar';

const DashboardPage: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [view, setView] = useState<View>('list');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

    const { user } = useAuth();

    const fetchEvents = useCallback(async () => {
        setLoading(true);
        const fetchedEvents = await eventApi.getEvents();
        setEvents(fetchedEvents);
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchEvents();
    }, [fetchEvents]);
    
    const handleCreateEventClick = () => {
        setSelectedEvent(null);
        setIsModalOpen(true);
    };

    const handleEditEvent = (event: Event) => {
        setSelectedEvent(event);
        setIsModalOpen(true);
    };

    const handleFormSuccess = () => {
        setIsModalOpen(false);
        fetchEvents();
    };

    const upcomingEvents = events
      .filter(e => new Date(e.date) >= new Date() && e.status === 'approved')
      .sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-all-ease">
            <Header />
            <main className="p-4 sm:p-6 lg:p-8 max-w-8xl mx-auto">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
                        <p className="mt-1 text-gray-600 dark:text-gray-400">Welcome back, {user?.name.split(' ')[0]}! Here are the upcoming events.</p>
                    </div>
                    {user && ROLES_CAN_CREATE_EVENTS.includes(user.role) && (
                        <button
                            onClick={handleCreateEventClick}
                            className="mt-4 sm:mt-0 px-5 py-2.5 text-sm font-medium text-white bg-primary-600 rounded-lg shadow-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-900 transition-all-ease"
                        >
                            + Create Event
                        </button>
                    )}
                </div>
                
                {user?.role === Role.ADMIN && <AdminPanel events={events.filter(e => e.status === 'pending')} onAction={fetchEvents}/>}

                <div className="mb-6">
                    <div className="border-b border-gray-200 dark:border-gray-700">
                        <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                            <button
                                onClick={() => setView('list')}
                                className={`${view === 'list'
                                    ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-600'
                                } whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-all-ease`}
                            >
                                List View
                            </button>
                            <button
                                onClick={() => setView('calendar')}
                                className={`${view === 'calendar'
                                    ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-600'
                                } whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-all-ease`}
                            >
                                Calendar View
                            </button>
                        </nav>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-20 text-gray-500 dark:text-gray-400">Loading events...</div>
                ) : (
                    <>
                        {view === 'list' && (
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {upcomingEvents.length > 0 ? (
                                  upcomingEvents.map(event => (
                                      <EventCard key={event.id} event={event} onEdit={handleEditEvent} refreshEvents={fetchEvents}/>
                                  ))
                                ) : (
                                  <p className="md:col-span-2 lg:col-span-3 xl:col-span-4 text-center text-gray-500 dark:text-gray-400 py-20">No upcoming events found.</p>
                                )}
                            </div>
                        )}
                        {view === 'calendar' && <EventCalendar events={events} onEventClick={handleEditEvent} />}
                    </>
                )}
            </main>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <EventForm event={selectedEvent} onSuccess={handleFormSuccess} />
            </Modal>
        </div>
    );
};

export default DashboardPage;