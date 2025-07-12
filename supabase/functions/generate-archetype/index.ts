
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

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

    // Get all archetype templates from the database
    const { data: archetypes, error: archetypesError } = await supabaseClient
      .from('archetype_templates')
      .select('name, motto, description')

    if (archetypesError || !archetypes || archetypes.length === 0) {
      console.error('Failed to fetch archetypes:', archetypesError)
      throw new Error('Failed to fetch archetype templates')
    }

    // Randomly select an archetype
    const selectedArchetype = archetypes[Math.floor(Math.random() * archetypes.length)]

    // Save to user profile
    const { error: updateError } = await supabaseClient
      .from('profiles')
      .upsert({
        id: user.id,
        Name: selectedArchetype.name,
        Motto: selectedArchetype.motto,
        Description: selectedArchetype.description,
        archetype_generated_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })

    if (updateError) {
      console.error('Failed to save archetype:', updateError)
      throw new Error('Failed to save archetype')
    }

    return new Response(
      JSON.stringify({ 
        name: selectedArchetype.name,
        motto: selectedArchetype.motto,
        description: selectedArchetype.description
      }),
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
