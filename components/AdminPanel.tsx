import React from 'react';
import { Event, EventStatus } from '../types';
import { eventApi } from '../services/eventApi';

interface AdminPanelProps {
  events: Event[];
  onAction: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ events, onAction }) => {

  const handleUpdateStatus = async (eventId: string, status: EventStatus) => {
    await eventApi.updateEvent(eventId, { status });
    onAction();
  };

  if (events.length === 0) {
    return null;
  }

  return (
    <div className="bg-blue-50 dark:bg-blue-900/40 border-l-4 border-blue-400 dark:border-blue-500 p-4 rounded-r-lg mb-8">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-blue-400 dark:text-blue-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3 flex-1">
          <h2 className="text-lg font-bold text-blue-800 dark:text-blue-200 mb-1">Admin Approval Required</h2>
          <p className="text-sm text-blue-700 dark:text-blue-300 mb-4">The following events are pending approval from an administrator.</p>
          <div className="space-y-3">
            {events.map(event => (
              <div key={event.id} className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-100">{event.title}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{new Date(event.date).toLocaleDateString()} at {event.venue}</p>
                </div>
                <div className="flex space-x-2 mt-2 sm:mt-0 flex-shrink-0">
                  <button onClick={() => handleUpdateStatus(event.id, EventStatus.APPROVED)} className="px-3 py-1 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition-all-ease">
                    Approve
                  </button>
                  <button onClick={() => handleUpdateStatus(event.id, EventStatus.REJECTED)} className="px-3 py-1 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-all-ease">
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;