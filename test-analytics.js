
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ommjkzghytqlboeyrgko.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9tbWpremdoeXRxbGJvZXlyZ2tvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0ODQwMjEsImV4cCI6MjA4MDA2MDAyMX0.huhdlxhZ-51n0kDwsgXJp9boex1yDUZjG4RR6KI2tRM';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testAnalytics() {
    console.log('Testing insert into user_activity...');
    const { data, error } = await supabase
        .from('user_activity')
        .insert([
            {
                action_type: 'test_event',
                details: { message: 'This is a test event from script' }
            }
        ]);

    if (error) {
        console.error('Error inserting into user_activity:', error);
    } else {
        console.log('Success inserting into user_activity:', data);
    }
}

testAnalytics();
