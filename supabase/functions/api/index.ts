import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Assessment } from './types.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
};

// Mock data for demonstration
const mockAssessments: Assessment[] = [
  {
    id: '1',
    name: 'General Ability',
    url: 'https://www.shl.com/solutions/products/product-catalog/general-ability/',
    remoteTestingSupport: true,
    adaptiveSupport: true,
    duration: '30 minutes',
    testType: 'Cognitive',
    description: 'Assesses verbal, numerical, and abstract reasoning abilities.',
    suitability: 95
  },
  // ... other assessments
];

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders
    });
  }

  const url = new URL(req.url);
  const path = url.pathname.replace('/api', '');

  try {
    // Health Check Endpoint
    if (path === '/health' && req.method === 'GET') {
      return new Response(
        JSON.stringify({
          status: 'healthy',
          timestamp: new Date().toISOString()
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders
          }
        }
      );
    }

    // Assessment Recommendation Endpoint
    if (path === '/recommendations' && req.method === 'POST') {
      const { query, type } = await req.json();

      if (!query) {
        return new Response(
          JSON.stringify({
            error: 'Query parameter is required'
          }),
          {
            status: 400,
            headers: {
              'Content-Type': 'application/json',
              ...corsHeaders
            }
          }
        );
      }

      // Simple keyword matching for demonstration
      let recommendations = [...mockAssessments];
      const keywords = query.toLowerCase().split(/\s+/);

      // Filter based on keywords
      recommendations = recommendations.filter(assessment => {
        const text = `${assessment.name} ${assessment.description} ${assessment.testType}`.toLowerCase();
        return keywords.some(keyword => text.includes(keyword));
      });

      // Sort by suitability and limit to 10 results
      recommendations = recommendations
        .sort((a, b) => (b.suitability || 0) - (a.suitability || 0))
        .slice(0, 10);

      return new Response(
        JSON.stringify({
          query,
          recommendations,
          timestamp: new Date().toISOString()
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders
          }
        }
      );
    }

    // Handle 404 for unknown endpoints
    return new Response(
      JSON.stringify({
        error: 'Not Found'
      }),
      {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({
        error: 'Internal Server Error',
        message: error.message
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      }
    );
  }
});