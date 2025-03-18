require('dotenv').config()

const { createClient } = require('@supabase/supabase-js')
const { SUPABASE_KEY, SUPABASE_URL } = process.env

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
module.exports = supabase