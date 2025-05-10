import { mockRides, transitSuggestions } from '@/context/AppContext';
import DatabaseService from '@/lib/database';

console.log('Initializing database with mock data...');

// Initialize database with mock rides and transit suggestions
DatabaseService.initializeWithMockData(mockRides, transitSuggestions);

console.log('Database initialization complete!');
console.log(`Added ${mockRides.length} rides and ${transitSuggestions.length} transit suggestions.`); 