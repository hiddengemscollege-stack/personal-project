import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ommjkzghytqlboeyrgko.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9tbWpremdoeXRxbGJvZXlyZ2tvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0ODQwMjEsImV4cCI6MjA4MDA2MDAyMX0.huhdlxhZ-51n0kDwsgXJp9boex1yDUZjG4RR6KI2tRM';

export const supabase = createClient(supabaseUrl, supabaseKey);
