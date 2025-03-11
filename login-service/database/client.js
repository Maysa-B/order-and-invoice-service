const { createClient } = require('@supabase/supabase-js')

const supabase = createClient('https://kjceroeklvsqdeqtjlzi.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtqY2Vyb2VrbHZzcWRlcXRqbHppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA3NzA4OTMsImV4cCI6MjA1NjM0Njg5M30.8DF_QzXSSAuGNvpM1jE6iEhkphzTOyuaaBn-EWXdsLc')

module.exports = supabase