
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
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY')
    if (!OPENAI_API_KEY) {
      throw new Error('OpenAI API key not configured')
    }

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

    // Generate archetype using OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'user',
            content: "Generate a poetic, symbolic title for a human zine-writer. It should feel slightly magical or surreal — as if naming a dream job in another dimension. Take into account the current world mood, season, or symbolic atmosphere. Format it like a professional title. Avoid clichés. Examples: 'Cartographer of Unspoken Codes', 'Moth-Collector of Broadcast Moons', 'Bureaucrat of Quiet Revolutions'. Return only the title, nothing else."
          }
        ],
        max_tokens: 50,
        temperature: 0.9,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to generate archetype')
    }

    const data = await response.json()
    const archetypeTitle = data.choices[0]?.message?.content?.trim()

    if (!archetypeTitle) {
      throw new Error('No archetype generated')
    }

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
