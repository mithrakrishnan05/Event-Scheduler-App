import React, { useState, useEffect } from 'react';
import { Event, EventCategory, EventStatus } from '../types';
import { useAuth } from '../context/AuthContext';
import { eventApi } from '../services/eventApi';

interface EventFormProps {
  event?: Event | null;
  onSuccess: () => void;
}

const EventForm: React.FC<EventFormProps> = ({ event, onSuccess }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    venue: '',
    category: EventCategory.ACADEMIC,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const inputClass = "mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm text-gray-900 dark:text-gray-200";

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title,
        description: event.description,
        date: event.date,
        time: event.time,
        venue: event.venue,
        category: event.category,
      });
    } else {
        setFormData({
            title: '', description: '', date: '', time: '', venue: '', category: EventCategory.ACADEMIC,
        });
    }
  }, [event]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
        setError('You must be logged in to create an event.');
        return;
    }

    for (const key in formData) {
        if (!formData[key as keyof typeof formData]) {
            setError(`Please fill out the ${key} field.`);
            return;
        }
    }

    setLoading(true);
    setError('');

    try {
        if (event) {
            await eventApi.updateEvent(event.id, formData);
        } else {
            const newEventData = {
                ...formData,
                createdBy: user.id,
                status: EventStatus.PENDING,
            };
            await eventApi.createEvent(newEventData);
        }
        onSuccess();
    } catch (err) {
        setError('An error occurred. Please try again.');
    } finally {
        setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{event ? 'Edit Event' : 'Create New Event'}</h2>
      
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
        <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} className={inputClass} required/>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
        <textarea name="description" id="description" value={formData.description} onChange={handleChange} rows={3} className={inputClass} required></textarea>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date</label>
            <input type="date" name="date" id="date" value={formData.date} onChange={handleChange} className={inputClass} required/>
        </div>
        <div>
            <label htmlFor="time" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Time</label>
            <input type="time" name="time" id="time" value={formData.time} onChange={handleChange} className={inputClass} required/>
        </div>
      </div>

      <div>
        <label htmlFor="venue" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Venue</label>
        <input type="text" name="venue" id="venue" value={formData.venue} onChange={handleChange} className={inputClass} required/>
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
        <select name="category" id="category" value={formData.category} onChange={handleChange} className={inputClass} required>
            {Object.values(EventCategory).map(cat => (
                <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
            ))}
        </select>
      </div>
      
      {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}

      <div className="flex justify-end pt-2">
        <button type="submit" disabled={loading} className="inline-flex justify-center rounded-md border border-transparent bg-primary-600 py-2 px-6 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:bg-primary-400 transition-all-ease">
          {loading ? 'Saving...' : (event ? 'Update Event' : 'Create Event')}
        </button>
      </div>
    </form>
  );
};

export default EventForm;