import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { create } from "https://deno.land/x/djwt@v2.8/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Helper function to create JWT for Google API authentication
async function createGoogleJWT(serviceAccountEmail: string, privateKey: string): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const expiry = now + 3600; // 1 hour

  const header = {
    alg: "RS256" as const,
    typ: "JWT",
  };

  const payload = {
    iss: serviceAccountEmail,
    scope: "https://www.googleapis.com/auth/calendar.readonly",
    aud: "https://oauth2.googleapis.com/token",
    exp: expiry,
    iat: now,
  };

  // Import the private key
  const keyData = privateKey
    .replace(/-----BEGIN PRIVATE KEY-----/g, '')
    .replace(/-----END PRIVATE KEY-----/g, '')
    .replace(/\n/g, '');
  
  const binaryKey = Uint8Array.from(atob(keyData), c => c.charCodeAt(0));
  
  const cryptoKey = await crypto.subtle.importKey(
    "pkcs8",
    binaryKey,
    {
      name: "RSASSA-PKCS1-v1_5",
      hash: "SHA-256",
    },
    false,
    ["sign"]
  );

  return await create(header, payload, cryptoKey);
}

// Helper function to exchange JWT for access token
async function getAccessToken(jwt: string): Promise<string> {
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error("Failed to get access token:", error);
    throw new Error(`Failed to get access token: ${error}`);
  }

  const data = await response.json();
  return data.access_token;
}

// Helper function to fetch calendar events
async function fetchCalendarEvents(accessToken: string, calendarId: string = "primary") {
  const timeMin = new Date().toISOString();
  const timeMax = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(); // Next 30 days

  const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?` +
    `timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true&orderBy=startTime`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    console.error("Failed to fetch calendar events:", error);
    throw new Error(`Failed to fetch calendar events: ${error}`);
  }

  return await response.json();
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Starting Google Calendar sync...");

    // Get credentials from environment
    const serviceAccountEmail = Deno.env.get('GOOGLE_SERVICE_ACCOUNT_EMAIL');
    const privateKey = Deno.env.get('GOOGLE_PRIVATE_KEY');

    if (!serviceAccountEmail || !privateKey) {
      throw new Error('Missing Google Calendar credentials');
    }

    console.log("Creating JWT for Google authentication...");
    const jwt = await createGoogleJWT(serviceAccountEmail, privateKey);

    console.log("Exchanging JWT for access token...");
    const accessToken = await getAccessToken(jwt);

    console.log("Fetching calendar events...");
    const calendarData = await fetchCalendarEvents(accessToken);

    // Transform Google Calendar events to our format
    const eventos = calendarData.items?.map((event: any) => {
      const startDate = event.start.dateTime || event.start.date;
      const date = new Date(startDate);
      
      return {
        id: event.id,
        titulo: event.summary || 'Sem título',
        data: date.toLocaleDateString('pt-BR'),
        hora: event.start.dateTime ? date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : 'Dia inteiro',
        local: event.location || 'Não especificado',
        tipo: event.eventType || 'Evento',
        status: event.status === 'confirmed' ? 'Confirmado' : 'Pendente',
        descricao: event.description || '',
        link: event.htmlLink,
      };
    }) || [];

    console.log(`Successfully synced ${eventos.length} events`);

    return new Response(
      JSON.stringify({ eventos, success: true }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error syncing Google Calendar:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        success: false 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
