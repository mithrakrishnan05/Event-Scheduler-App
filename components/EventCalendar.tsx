import React, { useState } from 'react';
import { Event } from '../types';
import { CATEGORY_COLORS } from '../constants';

interface EventCalendarProps {
  events: Event[];
  onEventClick: (event: Event) => void;
}

const EventCalendar: React.FC<EventCalendarProps> = ({ events, onEventClick }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const startDayOfWeek = startOfMonth.getDay(); 
  const daysInMonth = endOfMonth.getDate();

  const days = [];
  for (let i = 0; i < startDayOfWeek; i++) {
    days.push(<div key={`empty-${i}`} className="border-r border-b border-gray-200 dark:border-gray-700"></div>);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dateString = date.toISOString().split('T')[0];
    const todaysEvents = events.filter(e => e.date === dateString && e.status === 'approved');
    const isToday = new Date().toISOString().split('T')[0] === dateString;

    days.push(
      <div key={day} className="border-r border-b border-gray-200 dark:border-gray-700 p-2 min-h-[120px] flex flex-col transition-colors duration-300 hover:bg-gray-50 dark:hover:bg-gray-800/50">
        <div className={`text-sm font-semibold ${isToday ? 'bg-primary-600 text-white rounded-full w-7 h-7 flex items-center justify-center' : 'text-gray-700 dark:text-gray-300'}`}>
          {day}
        </div>
        <div className="flex-grow mt-1 space-y-1 overflow-y-auto">
          {todaysEvents.map(event => {
             const categoryColor = CATEGORY_COLORS[event.category] || { bg: 'bg-gray-100 dark:bg-gray-700', text: 'text-gray-800 dark:text-gray-200' };
             return (
                <div 
                    key={event.id}
                    onClick={() => onEventClick(event)}
                    title={event.title}
                    className={`p-1.5 rounded-md text-xs cursor-pointer ${categoryColor.bg} ${categoryColor.text} hover:opacity-80 transition-opacity truncate`}
                >
                   {event.title}
                </div>
             );
          })}
        </div>
      </div>
    );
  }

  const changeMonth = (offset: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => changeMonth(-1)} className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">&lt;</button>
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h2>
        <button onClick={() => changeMonth(1)} className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">&gt;</button>
      </div>
      <div className="grid grid-cols-7 text-center font-semibold text-gray-600 dark:text-gray-400">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => <div key={day} className="py-2 text-sm">{day}</div>)}
      </div>
      <div className="grid grid-cols-7 border-t border-l border-gray-200 dark:border-gray-700">
        {days}
      </div>
    </div>
  );
};

export default EventCalendar;