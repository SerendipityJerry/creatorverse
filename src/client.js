import { createClient } from '@supabase/supabase-js';

const URL = 'https://lkamnjzqpffzhctfejwi.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxrYW1uanpxcGZmemhjdGZlandpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTMxMjQ5NjksImV4cCI6MjAwODcwMDk2OX0.y2VAhBf82pL6bvtipVtnl0godvIkJhI1h_txSc-7pl8';
export const supabase = createClient(URL, API_KEY);