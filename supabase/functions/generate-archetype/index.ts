
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Archetype dataset - copied from src/data/archetypeDataset.ts
const archetypeDataset = [
  // Absurd
  "Chief Negotiator of Mismatched Socks",
  "Professional Whisperer to Abandoned Shopping Carts",
  "Senior Analyst of Forgotten Wi-Fi Networks",
  "Director of Unfinished Text Messages",
  "Curator of Things That Fall Behind Radiators",
  "Ambassador to the Republic of Lost Pens",
  
  // Cute
  "Keeper of First Smiles",
  "Archivist of Sleepy Cat Photos",
  "Guardian of Birthday Wishes",
  "Collector of Grandmother's Recipes",
  "Shepherd of Paper Airplane Dreams",
  "Librarian of Bedtime Stories",
  
  // Mundane
  "Assistant Manager of Monday Morning Sighs",
  "Coordinator of Elevator Small Talk",
  "Specialist in Grocery List Archaeology",
  "Supervisor of Laundry Procrastination",
  "Analyst of Microwave Beeping Patterns",
  "Administrator of Coffee Shop Queue Psychology",
  
  // Tragic
  "Chronicler of Almost-Loves",
  "Keeper of Last Words Unsaid",
  "Archivist of Empty Photo Frames",
  "Guardian of Childhood Homes Now Demolished",
  "Collector of Unreturned Phone Calls",
  "Historian of Dreams That Didn't Survive Morning",
  
  // Mixed emotions
  "Cartographer of 3AM Thoughts",
  "Curator of Songs That Make You Cry in Supermarkets",
  "Interpreter of Rain Against Windows",
  "Documentarian of Strangers' Laughter",
  "Keeper of Messages Never Sent",
  "Ambassador to the Land of What-Ifs"
];

const getRandomArchetype = (): string => {
  return archetypeDataset[Math.floor(Math.random() * archetypeDataset.length)];
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    // Get current user
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser()
    if (userError || !user) {
      throw new Error('User not authenticated')
    }

    // Generate archetype from local dataset
    const archetypeTitle = getRandomArchetype()

    // Save to user profile
    const { error: updateError } = await supabaseClient
      .from('profiles')
      .upsert({
        id: user.id,
        archetype_title: archetypeTitle,
        archetype_generated_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })

    if (updateError) {
      console.error('Failed to save archetype:', updateError)
      throw new Error('Failed to save archetype')
    }

    return new Response(
      JSON.stringify({ archetype_title: archetypeTitle }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
