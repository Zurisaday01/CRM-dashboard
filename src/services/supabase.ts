import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://xrxtdpjjvgiypzmabttv.supabase.co';
const supabaseKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhyeHRkcGpqdmdpeXB6bWFidHR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMwOTMwNTQsImV4cCI6MjAyODY2OTA1NH0.u04avfGO5DUbskO0ugqiRbzQsmY7bUW3GG7jnMoBPso';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
