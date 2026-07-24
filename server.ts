import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialize Gemini Client
let genAIClient: GoogleGenAI | null = null;
function getGenAI() {
  if (!genAIClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      genAIClient = new GoogleGenAI({ apiKey });
    }
  }
  return genAIClient;
}

// Helper function to add days to ISO date string
function addDays(dateStr: string, days: number): string {
  if (!dateStr) return dateStr;
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  d.setDate(d.getDate() + days);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// API Route: AI Travel Planner Generator
app.post('/api/generate-plan', async (req, res) => {
  try {
    const { destination, country, startDate, endDate, durationText, nights, days, preferences } = req.body;
    const reqStart = startDate || '2026-08-21';
    const reqDays = days || 4;
    const computedEnd = endDate || addDays(reqStart, reqDays);

    const ai = getGenAI();
    if (!ai) {
      // Fallback response if API key is not configured or in offline mode
      return res.json({
        success: true,
        source: 'fallback',
        message: 'AI API Key가 설정되지 않아 스마트 알고리즘으로 기본 일정을 생성했습니다.',
        plan: {
          destination: destination || '도쿄',
          country: country || '일본',
          durationText: durationText || `${nights || 3}박 ${reqDays}일`,
          startDate: reqStart,
          endDate: computedEnd
        }
      });
    }

    const prompt = `You are an expert travel planner. Create a highly detailed, curated ${nights || 3} Nights ${reqDays} Days travel itinerary for ${destination}, ${country || ''}.
Start Date: ${reqStart}, End Date: ${computedEnd}.
Target Preferences: Include high Google Maps rated restaurants (>=4.5), aesthetic cafes, and top landmark attractions.
Output strict JSON with format:
{
  "title": "${durationText || '3박 4일'} ${destination} 여행",
  "daysItinerary": [
    {
      "dayNumber": 1,
      "date": "${reqStart}",
      "title": "Day 1 Theme Title",
      "items": [
        {
          "id": "generated-1-1",
          "category": "CAFE",
          "time": "10:00 AM",
          "title": "Place Name",
          "rating": 4.7,
          "reviewCount": 3200,
          "description": "Short description in Korean",
          "address": "Full address",
          "mapCoords": { "lat": 35.6762, "lng": 139.6503 }
        }
      ]
    }
  ]
}
Language: Korean for descriptions and titles. Return raw JSON without markdown backticks. Ensure date for Day N is incremented sequentially from ${reqStart}.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const responseText = response.text || '';
    let parsedData = null;
    try {
      const cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      parsedData = JSON.parse(cleanJson);
    } catch {
      console.warn('Failed to parse Gemini JSON output directly');
    }

    return res.json({
      success: true,
      source: 'gemini',
      data: parsedData
    });
  } catch (err: any) {
    console.error('Error generating plan:', err);
    res.status(500).json({ error: 'Failed to generate plan', details: err.message });
  }
});

// API Route: Live Flight Cancellation Ticket Refresh Simulation
app.get('/api/flights/cancellations', (req, res) => {
  const randomSeatDrop = Math.floor(Math.random() * 3) + 1;
  const randomDiscount = Math.floor(Math.random() * 15) + 25; // 25% ~ 40% discount
  
  res.json({
    updatedAt: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    hasNewCancellation: Math.random() > 0.3,
    newTicket: {
      id: `cancel-${Date.now()}`,
      airline: '대한항공 (Korean Air)',
      flightNumber: `KE${Math.floor(Math.random() * 800) + 100}`,
      origin: 'SEOUL (ICN)',
      originCity: 'Seoul',
      destination: 'TOKYO (NRT)',
      destinationCity: 'Tokyo',
      departureTime: '10:25',
      arrivalTime: '12:50',
      duration: '2시간 25분',
      price: Math.floor(220000 + Math.random() * 40000),
      originalPrice: 380000,
      isCancellationTicket: true,
      remainingSeats: randomSeatDrop,
      isDirect: true,
      status: 'On-time',
      badgeText: `🔥 취소표 발생! 잔여 ${randomSeatDrop}석 (${randomDiscount}% 할인)`
    }
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
