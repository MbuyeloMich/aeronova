import { useState, useRef, useEffect, useMemo } from 'react';
import { useGameMethod } from '../../../hooks/useGameMethod';

export interface Location {
  id: string;
  name: string;
  country: string;
  longitude: number;
  latitude: number;
  altitude: number;
  heading?: number;
  emoji: string;
}

type LocationScope = 'domestic' | 'global';

const DOMESTIC_LOCATIONS: Location[] = [
  { id: 'za-union-buildings', name: 'Union Buildings', country: 'Pretoria, South Africa', longitude: 28.2110, latitude: -25.7402, altitude: 300, heading: 125, emoji: 'ðŸ‡¿ðŸ‡¦' },
  { id: 'za-voortrekker-monument', name: 'Voortrekker Monument', country: 'Pretoria, South Africa', longitude: 28.1754, latitude: -25.7766, altitude: 300, heading: 145, emoji: 'ðŸ‡¿ðŸ‡¦' },
  { id: 'za-constitution-hill', name: 'Constitution Hill', country: 'Johannesburg, South Africa', longitude: 28.0401, latitude: -26.1886, altitude: 300, heading: 250, emoji: 'ðŸ‡¿ðŸ‡¦' },
  { id: 'za-nelson-mandela-square', name: 'Nelson Mandela Square', country: 'Johannesburg, South Africa', longitude: 28.0530, latitude: -26.1075, altitude: 300, heading: 190, emoji: 'ðŸ‡¿ðŸ‡¦' },
  { id: 'za-apartheid-museum', name: 'Apartheid Museum', country: 'Johannesburg, South Africa', longitude: 28.0336, latitude: -26.2363, altitude: 300, heading: 210, emoji: 'ðŸ‡¿ðŸ‡¦' },
  { id: 'za-cradle-humankind', name: 'Cradle of Humankind', country: 'Gauteng, South Africa', longitude: 27.7410, latitude: -25.9948, altitude: 300, heading: 45, emoji: 'ðŸ‡¿ðŸ‡¦' },
  { id: 'za-hector-pieterson', name: 'Hector Pieterson Memorial', country: 'Soweto, South Africa', longitude: 27.9981, latitude: -26.2345, altitude: 300, heading: 135, emoji: 'ðŸ‡¿ðŸ‡¦' },
  { id: 'za-freedom-park', name: 'Freedom Park', country: 'Pretoria, South Africa', longitude: 28.2017, latitude: -25.7551, altitude: 300, heading: 95, emoji: 'ðŸ‡¿ðŸ‡¦' },
  { id: 'za-nkandla-homestead', name: 'Nkandla Homestead', country: 'KwaZulu-Natal, South Africa', longitude: 31.0998528, latitude: -28.8452028, altitude: 300, heading: 80, emoji: 'ðŸ‡¿ðŸ‡¦' },
  { id: 'za-moses-mabhida', name: 'Moses Mabhida Stadium', country: 'Durban, South Africa', longitude: 31.0304, latitude: -29.8268, altitude: 300, heading: 210, emoji: 'ðŸ‡¿ðŸ‡¦' },
  { id: 'za-robben-island', name: 'Robben Island', country: 'Cape Town, South Africa', longitude: 18.3662, latitude: -33.8067, altitude: 300, heading: 20, emoji: 'ðŸ‡¿ðŸ‡¦' },
  { id: 'za-table-mountain', name: 'Table Mountain', country: 'Cape Town, South Africa', longitude: 18.4098, latitude: -33.9628, altitude: 300, heading: 25, emoji: 'ðŸ‡¿ðŸ‡¦' },
  { id: 'za-va-waterfront', name: 'V&A Waterfront', country: 'Cape Town, South Africa', longitude: 18.4219, latitude: -33.9037, altitude: 300, heading: 300, emoji: 'ðŸ‡¿ðŸ‡¦' },
  { id: 'za-castle-good-hope', name: 'Castle of Good Hope', country: 'Cape Town, South Africa', longitude: 18.4296, latitude: -33.9259, altitude: 300, heading: 260, emoji: 'ðŸ‡¿ðŸ‡¦' },
  { id: 'za-cape-point', name: 'Cape Point', country: 'Cape Peninsula, South Africa', longitude: 18.4861, latitude: -34.3568, altitude: 300, heading: 40, emoji: 'ðŸ‡¿ðŸ‡¦' },
  { id: 'za-kirstenbosch', name: 'Kirstenbosch Gardens', country: 'Cape Town, South Africa', longitude: 18.4327, latitude: -33.9881, altitude: 300, heading: 85, emoji: 'ðŸ‡¿ðŸ‡¦' },
  { id: 'za-augraabies-falls', name: 'Augrabies Falls', country: 'Northern Cape, South Africa', longitude: 20.3408, latitude: -28.5969, altitude: 300, heading: 10, emoji: 'ðŸ‡¿ðŸ‡¦' },
  { id: 'za-addo-elephant', name: 'Addo Elephant National Park', country: 'Eastern Cape, South Africa', longitude: 25.7539, latitude: -33.4822, altitude: 300, heading: 320, emoji: 'ðŸ‡¿ðŸ‡¦' },
  { id: 'za-golden-gate-highlands', name: 'Golden Gate Highlands', country: 'Free State, South Africa', longitude: 28.6286, latitude: -28.5304, altitude: 300, heading: 290, emoji: 'ðŸ‡¿ðŸ‡¦' },
  { id: 'za-three-rondavels', name: 'Three Rondavels', country: 'Mpumalanga, South Africa', longitude: 30.8118, latitude: -24.5797, altitude: 300, heading: 30, emoji: 'ðŸ‡¿ðŸ‡¦' },
  { id: 'za-blyde-river-canyon', name: 'Blyde River Canyon', country: 'Mpumalanga, South Africa', longitude: 30.8246, latitude: -24.5906, altitude: 300, heading: 35, emoji: 'ðŸ‡¿ðŸ‡¦' },
  { id: 'za-isandlwana', name: 'Isandlwana Battlefield', country: 'KwaZulu-Natal, South Africa', longitude: 30.6512, latitude: -28.3559, altitude: 300, heading: 170, emoji: 'ðŸ‡¿ðŸ‡¦' },
  { id: 'za-isimangaliso', name: 'iSimangaliso Wetland Park', country: 'KwaZulu-Natal, South Africa', longitude: 32.4070, latitude: -28.3754, altitude: 300, heading: 205, emoji: 'ðŸ‡¿ðŸ‡¦' },
  { id: 'za-kruger-gate', name: 'Kruger National Park Gate', country: 'Mpumalanga, South Africa', longitude: 31.5858, latitude: -24.9923, altitude: 300, heading: 130, emoji: 'ðŸ‡¿ðŸ‡¦' },
  { id: 'za-national-assembly', name: 'National Assembly Parliament', country: 'Cape Town, South Africa', longitude: 18.4194, latitude: -33.9258, altitude: 300, heading: 120, emoji: 'ðŸ‡¿ðŸ‡¦' },
  { id: 'za-pilanesberg', name: 'Pilanesberg National Park', country: 'North West, South Africa', longitude: 27.2489, latitude: -25.2487, altitude: 300, heading: 220, emoji: 'Ã°Å¸â€¡Â¿Ã°Å¸â€¡Â¦' },
  { id: 'za-mapungubwe', name: 'Mapungubwe Hill', country: 'Limpopo, South Africa', longitude: 29.4096, latitude: -22.2232, altitude: 300, heading: 45, emoji: 'Ã°Å¸â€¡Â¿Ã°Å¸â€¡Â¦' },
  { id: 'za-cango-caves', name: 'Cango Caves', country: 'Oudtshoorn, South Africa', longitude: 22.2092, latitude: -33.3931, altitude: 300, heading: 310, emoji: 'Ã°Å¸â€¡Â¿Ã°Å¸â€¡Â¦' },
  { id: 'za-tsitsikamma', name: 'Tsitsikamma Bridge', country: 'Eastern Cape, South Africa', longitude: 23.8853, latitude: -33.9657, altitude: 300, heading: 175, emoji: 'Ã°Å¸â€¡Â¿Ã°Å¸â€¡Â¦' },
  { id: 'za-mandela-capture', name: 'Nelson Mandela Capture Site', country: 'KwaZulu-Natal, South Africa', longitude: 29.6201, latitude: -29.5362, altitude: 300, heading: 120, emoji: 'Ã°Å¸â€¡Â¿Ã°Å¸â€¡Â¦' },
  { id: 'za-howick-falls', name: 'Howick Falls', country: 'KwaZulu-Natal, South Africa', longitude: 30.2335, latitude: -29.4775, altitude: 300, heading: 260, emoji: 'Ã°Å¸â€¡Â¿Ã°Å¸â€¡Â¦' },
  { id: 'za-valley-desolation', name: 'Valley of Desolation', country: 'Graaff-Reinet, South Africa', longitude: 24.5584, latitude: -32.2524, altitude: 300, heading: 205, emoji: 'Ã°Å¸â€¡Â¿Ã°Å¸â€¡Â¦' },
  { id: 'za-gods-window', name: 'Gods Window', country: 'Mpumalanga, South Africa', longitude: 30.8867, latitude: -24.8728, altitude: 300, heading: 30, emoji: 'Ã°Å¸â€¡Â¿Ã°Å¸â€¡Â¦' },
  { id: 'za-skukuza', name: 'Skukuza Rest Camp', country: 'Kruger, South Africa', longitude: 31.5887, latitude: -24.9942, altitude: 300, heading: 140, emoji: 'Ã°Å¸â€¡Â¿Ã°Å¸â€¡Â¦' },
  { id: 'za-orlando-towers', name: 'Orlando Towers', country: 'Soweto, South Africa', longitude: 27.9048, latitude: -26.2674, altitude: 300, heading: 70, emoji: 'Ã°Å¸â€¡Â¿Ã°Å¸â€¡Â¦' },
  { id: 'za-big-hole', name: 'The Big Hole', country: 'Kimberley, South Africa', longitude: 24.7652, latitude: -28.7383, altitude: 300, heading: 255, emoji: 'Ã°Å¸â€¡Â¿Ã°Å¸â€¡Â¦' },
  { id: 'za-drakensberg-amphi', name: 'Drakensberg Amphitheatre', country: 'KwaZulu-Natal, South Africa', longitude: 29.2215, latitude: -28.7721, altitude: 300, heading: 25, emoji: 'Ã°Å¸â€¡Â¿Ã°Å¸â€¡Â¦' },
  { id: 'za-bloukrans', name: 'Bloukrans Bridge', country: 'Eastern Cape, South Africa', longitude: 23.6458, latitude: -33.9627, altitude: 300, heading: 300, emoji: 'Ã°Å¸â€¡Â¿Ã°Å¸â€¡Â¦' },
  { id: 'za-hluhluwe', name: 'Hluhluwe-iMfolozi Park', country: 'KwaZulu-Natal, South Africa', longitude: 31.9518, latitude: -28.2198, altitude: 300, heading: 185, emoji: 'Ã°Å¸â€¡Â¿Ã°Å¸â€¡Â¦' },
  { id: 'za-uniondale-prison', name: 'Old Uniondale Prison', country: 'Uniondale, South Africa', longitude: 23.1257, latitude: -33.6581, altitude: 300, heading: 95, emoji: 'Ã°Å¸â€¡Â¿Ã°Å¸â€¡Â¦' },
];

const GLOBAL_ICONIC_LOCATIONS: Location[] = [
  { id: 'global-eiffel', name: 'Eiffel Tower', country: 'France', longitude: 2.2945, latitude: 48.8584, altitude: 300, heading: 90, emoji: 'ðŸ‡«ðŸ‡·' },
  { id: 'global-colosseum', name: 'Colosseum', country: 'Italy', longitude: 12.4922, latitude: 41.8902, altitude: 300, heading: 160, emoji: 'ðŸ‡®ðŸ‡¹' },
  { id: 'global-acropolis', name: 'Acropolis of Athens', country: 'Greece', longitude: 23.7266, latitude: 37.9715, altitude: 300, heading: 140, emoji: 'ðŸ‡¬ðŸ‡·' },
  { id: 'global-big-ben', name: 'Big Ben', country: 'United Kingdom', longitude: -0.1246, latitude: 51.5007, altitude: 300, heading: 60, emoji: 'ðŸ‡¬ðŸ‡§' },
  { id: 'global-sagrada-familia', name: 'Sagrada Familia', country: 'Spain', longitude: 2.1744, latitude: 41.4036, altitude: 300, heading: 150, emoji: 'ðŸ‡ªðŸ‡¸' },
  { id: 'global-brandenburg', name: 'Brandenburg Gate', country: 'Germany', longitude: 13.3777, latitude: 52.5163, altitude: 300, heading: 260, emoji: 'ðŸ‡©ðŸ‡ª' },
  { id: 'global-charles-bridge', name: 'Charles Bridge', country: 'Czech Republic', longitude: 14.4114, latitude: 50.0865, altitude: 300, heading: 95, emoji: 'ðŸ‡¨ðŸ‡¿' },
  { id: 'global-anne-frank-house', name: 'Anne Frank House', country: 'Netherlands', longitude: 4.8839, latitude: 52.3752, altitude: 300, heading: 200, emoji: 'ðŸ‡³ðŸ‡±' },
  { id: 'global-neuschwanstein', name: 'Neuschwanstein Castle', country: 'Germany', longitude: 10.7498, latitude: 47.5576, altitude: 300, heading: 280, emoji: 'ðŸ‡©ðŸ‡ª' },
  { id: 'global-mont-saint-michel', name: 'Mont Saint-Michel', country: 'France', longitude: -1.5115, latitude: 48.6360, altitude: 300, heading: 210, emoji: 'ðŸ‡«ðŸ‡·' },
  { id: 'global-alhambra', name: 'Alhambra', country: 'Spain', longitude: -3.5881, latitude: 37.1761, altitude: 300, heading: 120, emoji: 'ðŸ‡ªðŸ‡¸' },
  { id: 'global-burj-khalifa', name: 'Burj Khalifa', country: 'UAE', longitude: 55.2744, latitude: 25.1972, altitude: 300, heading: 270, emoji: 'ðŸ‡¦ðŸ‡ª' },
  { id: 'global-petra', name: 'Petra', country: 'Jordan', longitude: 35.4444, latitude: 30.3285, altitude: 300, heading: 180, emoji: 'ðŸ‡¯ðŸ‡´' },
  { id: 'global-great-pyramid', name: 'Great Pyramid of Giza', country: 'Egypt', longitude: 31.1342, latitude: 29.9792, altitude: 300, heading: 40, emoji: 'ðŸ‡ªðŸ‡¬' },
  { id: 'global-taj-mahal', name: 'Taj Mahal', country: 'India', longitude: 78.0421, latitude: 27.1751, altitude: 300, heading: 140, emoji: 'ðŸ‡®ðŸ‡³' },
  { id: 'global-great-wall', name: 'Great Wall (Badaling)', country: 'China', longitude: 116.5704, latitude: 40.4319, altitude: 300, heading: 300, emoji: 'ðŸ‡¨ðŸ‡³' },
  { id: 'global-forbidden-city', name: 'Forbidden City', country: 'China', longitude: 116.3972, latitude: 39.9163, altitude: 300, heading: 220, emoji: 'ðŸ‡¨ðŸ‡³' },
  { id: 'global-angkor-wat', name: 'Angkor Wat', country: 'Cambodia', longitude: 103.8670, latitude: 13.4125, altitude: 300, heading: 115, emoji: 'ðŸ‡°ðŸ‡­' },
  { id: 'global-mount-fuji', name: 'Mount Fuji', country: 'Japan', longitude: 138.7274, latitude: 35.3606, altitude: 300, heading: 200, emoji: 'ðŸ‡¯ðŸ‡µ' },
  { id: 'global-fushimi-inari', name: 'Fushimi Inari Shrine', country: 'Japan', longitude: 135.7727, latitude: 34.9671, altitude: 300, heading: 35, emoji: 'ðŸ‡¯ðŸ‡µ' },
  { id: 'global-marina-bay-sands', name: 'Marina Bay Sands', country: 'Singapore', longitude: 103.8607, latitude: 1.2834, altitude: 300, heading: 250, emoji: 'ðŸ‡¸ðŸ‡¬' },
  { id: 'global-sydney-opera', name: 'Sydney Opera House', country: 'Australia', longitude: 151.2153, latitude: -33.8568, altitude: 300, heading: 200, emoji: 'ðŸ‡¦ðŸ‡º' },
  { id: 'global-uluru', name: 'Uluru', country: 'Australia', longitude: 131.0369, latitude: -25.3444, altitude: 300, heading: 70, emoji: 'ðŸ‡¦ðŸ‡º' },
  { id: 'global-sky-tower', name: 'Sky Tower', country: 'New Zealand', longitude: 174.7622, latitude: -36.8485, altitude: 300, heading: 110, emoji: 'ðŸ‡³ðŸ‡¿' },
  { id: 'global-christ-redeemer', name: 'Christ the Redeemer', country: 'Brazil', longitude: -43.2105, latitude: -22.9519, altitude: 300, heading: 100, emoji: 'ðŸ‡§ðŸ‡·' },
  { id: 'global-machu-picchu', name: 'Machu Picchu', country: 'Peru', longitude: -72.5450, latitude: -13.1631, altitude: 300, heading: 80, emoji: 'ðŸ‡µðŸ‡ª' },
  { id: 'global-moai', name: 'Moai Statues', country: 'Chile', longitude: -109.3497, latitude: -27.1212, altitude: 300, heading: 170, emoji: 'ðŸ‡¨ðŸ‡±' },
  { id: 'global-iguazu-falls', name: 'Iguazu Falls', country: 'Argentina', longitude: -54.4381, latitude: -25.6953, altitude: 300, heading: 45, emoji: 'ðŸ‡¦ðŸ‡·' },
  { id: 'global-chichen-itza', name: 'Chichen Itza', country: 'Mexico', longitude: -88.5678, latitude: 20.6843, altitude: 300, heading: 30, emoji: 'ðŸ‡²ðŸ‡½' },
  { id: 'global-golden-gate', name: 'Golden Gate Bridge', country: 'USA', longitude: -122.4783, latitude: 37.8199, altitude: 300, heading: 250, emoji: 'ðŸ‡ºðŸ‡¸' },
  { id: 'global-statue-liberty', name: 'Statue of Liberty', country: 'USA', longitude: -74.0445, latitude: 40.6892, altitude: 300, heading: 70, emoji: 'ðŸ‡ºðŸ‡¸' },
  { id: 'global-white-house', name: 'The White House', country: 'USA', longitude: -77.0365, latitude: 38.8977, altitude: 300, heading: 90, emoji: 'ðŸ‡ºðŸ‡¸' },
  { id: 'global-cn-tower', name: 'CN Tower', country: 'Canada', longitude: -79.3871, latitude: 43.6426, altitude: 300, heading: 120, emoji: 'ðŸ‡¨ðŸ‡¦' },
  { id: 'global-niagara-falls', name: 'Niagara Falls', country: 'Canada/USA', longitude: -79.0747, latitude: 43.0962, altitude: 300, heading: 210, emoji: 'ðŸ‡¨ðŸ‡¦' },
  { id: 'global-mount-rushmore', name: 'Mount Rushmore', country: 'USA', longitude: -103.4591, latitude: 43.8791, altitude: 300, heading: 180, emoji: 'ðŸ‡ºðŸ‡¸' },
  { id: 'global-empire-state', name: 'Empire State Building', country: 'USA', longitude: -73.9857, latitude: 40.7484, altitude: 300, heading: 155, emoji: 'ðŸ‡ºðŸ‡¸' },
  { id: 'global-grand-canyon', name: 'Grand Canyon South Rim', country: 'USA', longitude: -112.1401, latitude: 36.0544, altitude: 300, heading: 295, emoji: 'ðŸ‡ºðŸ‡¸' },
  { id: 'global-space-needle', name: 'Space Needle', country: 'USA', longitude: -122.3493, latitude: 47.6205, altitude: 300, heading: 245, emoji: 'ðŸ‡ºðŸ‡¸' },
  { id: 'global-teotihuacan', name: 'Teotihuacan Pyramid of the Sun', country: 'Mexico', longitude: -98.8430, latitude: 19.6925, altitude: 300, heading: 320, emoji: 'ðŸ‡²ðŸ‡½' },
  { id: 'global-kremlin', name: 'Moscow Kremlin', country: 'Russia', longitude: 37.6173, latitude: 55.7520, altitude: 300, heading: 100, emoji: 'ðŸ‡·ðŸ‡º' },
  { id: 'global-saint-basil', name: 'Saint Basil Cathedral', country: 'Russia', longitude: 37.6231, latitude: 55.7525, altitude: 300, heading: 145, emoji: 'ðŸ‡·ðŸ‡º' },
  { id: 'global-hagia-sophia', name: 'Hagia Sophia', country: 'Turkey', longitude: 28.9802, latitude: 41.0086, altitude: 300, heading: 105, emoji: 'ðŸ‡¹ðŸ‡·' },
  { id: 'global-blue-mosque', name: 'Blue Mosque', country: 'Turkey', longitude: 28.9769, latitude: 41.0054, altitude: 300, heading: 210, emoji: 'ðŸ‡¹ðŸ‡·' },
  { id: 'global-santorini-oia', name: 'Santorini Oia', country: 'Greece', longitude: 25.3786, latitude: 36.4618, altitude: 300, heading: 310, emoji: 'ðŸ‡¬ðŸ‡·' },
  { id: 'global-matterhorn', name: 'Matterhorn Viewpoint', country: 'Switzerland', longitude: 7.6586, latitude: 45.9763, altitude: 300, heading: 200, emoji: 'ðŸ‡¨ðŸ‡­' },
  { id: 'global-pisa', name: 'Leaning Tower of Pisa', country: 'Italy', longitude: 10.3966, latitude: 43.7229, altitude: 300, heading: 170, emoji: 'ðŸ‡®ðŸ‡¹' },
  { id: 'global-stonehenge', name: 'Stonehenge', country: 'United Kingdom', longitude: -1.8262, latitude: 51.1789, altitude: 300, heading: 35, emoji: 'ðŸ‡¬ðŸ‡§' },
  { id: 'global-edinburgh-castle', name: 'Edinburgh Castle', country: 'United Kingdom', longitude: -3.2003, latitude: 55.9486, altitude: 300, heading: 230, emoji: 'ðŸ‡¬ðŸ‡§' },
  { id: 'global-burj-al-arab', name: 'Burj Al Arab', country: 'UAE', longitude: 55.1853, latitude: 25.1412, altitude: 300, heading: 280, emoji: 'ðŸ‡¦ðŸ‡ª' },
  { id: 'global-sheikh-zayed', name: 'Sheikh Zayed Grand Mosque', country: 'UAE', longitude: 54.4744, latitude: 24.4128, altitude: 300, heading: 60, emoji: 'ðŸ‡¦ðŸ‡ª' },
  { id: 'global-bagan', name: 'Bagan Temples', country: 'Myanmar', longitude: 94.8605, latitude: 21.1717, altitude: 300, heading: 125, emoji: 'ðŸ‡²ðŸ‡²' },
  { id: 'global-ha-long-bay', name: 'Ha Long Bay', country: 'Vietnam', longitude: 107.0430, latitude: 20.9101, altitude: 300, heading: 320, emoji: 'ðŸ‡»ðŸ‡³' },
  { id: 'global-banaue', name: 'Banaue Rice Terraces', country: 'Philippines', longitude: 121.0606, latitude: 16.9237, altitude: 300, heading: 50, emoji: 'ðŸ‡µðŸ‡­' },
  { id: 'global-borobudur', name: 'Borobudur', country: 'Indonesia', longitude: 110.2038, latitude: -7.6079, altitude: 300, heading: 330, emoji: 'ðŸ‡®ðŸ‡©' },
  { id: 'global-kiyomizu-dera', name: 'Kiyomizu-dera', country: 'Japan', longitude: 135.7850, latitude: 34.9949, altitude: 300, heading: 265, emoji: 'ðŸ‡¯ðŸ‡µ' },
  { id: 'global-gyeongbokgung', name: 'Gyeongbokgung Palace', country: 'South Korea', longitude: 126.9770, latitude: 37.5796, altitude: 300, heading: 240, emoji: 'ðŸ‡°ðŸ‡·' },
  { id: 'global-taipei-101', name: 'Taipei 101', country: 'Taiwan', longitude: 121.5645, latitude: 25.0339, altitude: 300, heading: 185, emoji: 'ðŸ‡¹ðŸ‡¼' },
  { id: 'global-kilimanjaro', name: 'Mount Kilimanjaro', country: 'Tanzania', longitude: 37.3556, latitude: -3.0674, altitude: 300, heading: 220, emoji: 'ðŸ‡¹ðŸ‡¿' },
  { id: 'global-victoria-falls', name: 'Victoria Falls', country: 'Zimbabwe', longitude: 25.8572, latitude: -17.9243, altitude: 300, heading: 35, emoji: 'ðŸ‡¿ðŸ‡¼' },
  { id: 'global-table-mountain', name: 'Table Mountain', country: 'South Africa', longitude: 18.4098, latitude: -33.9628, altitude: 300, heading: 25, emoji: 'ðŸ‡¿ðŸ‡¦' },
  { id: 'global-sahara-merzouga', name: 'Sahara Dunes (Merzouga)', country: 'Morocco', longitude: -4.0111, latitude: 31.0994, altitude: 300, heading: 150, emoji: 'ðŸ‡²ðŸ‡¦' },
  { id: 'global-lalibela', name: 'Lalibela Rock Churches', country: 'Ethiopia', longitude: 39.0476, latitude: 12.0317, altitude: 300, heading: 200, emoji: 'ðŸ‡ªðŸ‡¹' },
  { id: 'global-serengeti', name: 'Serengeti Plains', country: 'Tanzania', longitude: 34.6857, latitude: -2.3333, altitude: 300, heading: 10, emoji: 'ðŸ‡¹ðŸ‡¿' },
  { id: 'global-western-wall', name: 'Western Wall', country: 'Israel', longitude: 35.2345, latitude: 31.7767, altitude: 300, heading: 90, emoji: 'ðŸ‡®ðŸ‡±' },
  { id: 'global-dead-sea', name: 'Dead Sea Overlook', country: 'Jordan', longitude: 35.4732, latitude: 31.5258, altitude: 300, heading: 185, emoji: 'ðŸ‡¯ðŸ‡´' },
  { id: 'global-lake-louise', name: 'Lake Louise', country: 'Canada', longitude: -116.1774, latitude: 51.4254, altitude: 300, heading: 320, emoji: 'ðŸ‡¨ðŸ‡¦' },
  { id: 'global-hallgrimskirkja', name: 'Hallgrimskirkja', country: 'Iceland', longitude: -21.9266, latitude: 64.1419, altitude: 300, heading: 230, emoji: 'ðŸ‡®ðŸ‡¸' },
  { id: 'global-blue-lagoon', name: 'Blue Lagoon', country: 'Iceland', longitude: -22.4472, latitude: 63.8804, altitude: 300, heading: 340, emoji: 'ðŸ‡®ðŸ‡¸' },
  { id: 'global-pamukkale', name: 'Pamukkale Travertines', country: 'Turkey', longitude: 29.1211, latitude: 37.9204, altitude: 300, heading: 55, emoji: 'ðŸ‡¹ðŸ‡·' },
  { id: 'global-cappadocia', name: 'Cappadocia Goreme', country: 'Turkey', longitude: 34.8456, latitude: 38.6431, altitude: 300, heading: 285, emoji: 'ðŸ‡¹ðŸ‡·' },
  { id: 'global-palm-jumeirah', name: 'Palm Jumeirah', country: 'UAE', longitude: 55.1387, latitude: 25.1120, altitude: 300, heading: 190, emoji: 'ðŸ‡¦ðŸ‡ª' },
  { id: 'global-times-square', name: 'Times Square', country: 'USA', longitude: -73.9855, latitude: 40.7580, altitude: 300, heading: 110, emoji: 'ðŸ‡ºðŸ‡¸' },
  { id: 'global-sugarloaf', name: 'Sugarloaf Mountain', country: 'Brazil', longitude: -43.1566, latitude: -22.9486, altitude: 300, heading: 40, emoji: 'ðŸ‡§ðŸ‡·' },
  { id: 'global-doha-mia', name: 'Museum of Islamic Art', country: 'Qatar', longitude: 51.5392, latitude: 25.2954, altitude: 300, heading: 265, emoji: 'ðŸ‡¶ðŸ‡¦' },
  { id: 'global-south-pole', name: 'Amundsen-Scott South Pole Station', country: 'Antarctica', longitude: -98.5795, latitude: -90.0, altitude: 300, heading: 0, emoji: 'ðŸ‡¦ðŸ‡¶' },
  { id: 'global-louvre', name: 'Louvre Museum', country: 'France', longitude: 2.3364, latitude: 48.8606, altitude: 300, heading: 145, emoji: 'Ã°Å¸â€¡Â«Ã°Å¸â€¡Â·' },
  { id: 'global-notre-dame', name: 'Notre-Dame Cathedral', country: 'France', longitude: 2.3499, latitude: 48.8529, altitude: 300, heading: 210, emoji: 'Ã°Å¸â€¡Â«Ã°Å¸â€¡Â·' },
  { id: 'global-atomium', name: 'Atomium', country: 'Belgium', longitude: 4.3417, latitude: 50.8949, altitude: 300, heading: 95, emoji: 'Ã°Å¸â€¡ÂªÃ°Å¸â€¡Âº' },
  { id: 'global-buda-castle', name: 'Buda Castle', country: 'Hungary', longitude: 19.0399, latitude: 47.4963, altitude: 300, heading: 275, emoji: 'Ã°Å¸â€¡Â­Ã°Å¸â€¡Âº' },
  { id: 'global-prague-castle', name: 'Prague Castle', country: 'Czech Republic', longitude: 14.4009, latitude: 50.0909, altitude: 300, heading: 175, emoji: 'Ã°Å¸â€¡Â¨Ã°Å¸â€¡Â¿' },
  { id: 'global-pena-palace', name: 'Pena Palace', country: 'Portugal', longitude: -9.3904, latitude: 38.7876, altitude: 300, heading: 330, emoji: 'Ã°Å¸â€¡ÂµÃ°Å¸â€¡Â¹' },
  { id: 'global-jeronimos', name: 'Jeronimos Monastery', country: 'Portugal', longitude: -9.2060, latitude: 38.6979, altitude: 300, heading: 60, emoji: 'Ã°Å¸â€¡ÂµÃ°Å¸â€¡Â¹' },
  { id: 'global-casa-batllo', name: 'Casa Batllo', country: 'Spain', longitude: 2.1649, latitude: 41.3917, altitude: 300, heading: 200, emoji: 'Ã°Å¸â€¡ÂªÃ°Å¸â€¡Â¸' },
  { id: 'global-dubrovnik-old-town', name: 'Dubrovnik Old Town', country: 'Croatia', longitude: 18.1084, latitude: 42.6407, altitude: 300, heading: 125, emoji: 'Ã°Å¸â€¡Â­Ã°Å¸â€¡Â·' },
  { id: 'global-lake-bled', name: 'Lake Bled Island', country: 'Slovenia', longitude: 14.1005, latitude: 46.3638, altitude: 300, heading: 35, emoji: 'Ã°Å¸â€¡Â¸Ã°Å¸â€¡Â®' },
  { id: 'global-st-peters', name: 'St. Peter\'s Basilica', country: 'Vatican City', longitude: 12.4534, latitude: 41.9022, altitude: 300, heading: 260, emoji: 'Ã°Å¸â€¡Â»Ã°Å¸â€¡Â¦' },
  { id: 'global-mecca-clock', name: 'Abraj Al Bait Clock Tower', country: 'Saudi Arabia', longitude: 39.8262, latitude: 21.4225, altitude: 300, heading: 150, emoji: 'Ã°Å¸â€¡Â¸Ã°Å¸â€¡Â¦' },
  { id: 'global-masjid-nabawi', name: 'Al-Masjid an-Nabawi', country: 'Saudi Arabia', longitude: 39.6111, latitude: 24.4672, altitude: 300, heading: 290, emoji: 'Ã°Å¸â€¡Â¸Ã°Å¸â€¡Â¦' },
  { id: 'global-lotus-temple', name: 'Lotus Temple', country: 'India', longitude: 77.2588, latitude: 28.5535, altitude: 300, heading: 85, emoji: 'Ã°Å¸â€¡Â®Ã°Å¸â€¡Â³' },
  { id: 'global-gateway-india', name: 'Gateway of India', country: 'India', longitude: 72.8347, latitude: 18.9220, altitude: 300, heading: 220, emoji: 'Ã°Å¸â€¡Â®Ã°Å¸â€¡Â³' },
  { id: 'global-petronas', name: 'Petronas Twin Towers', country: 'Malaysia', longitude: 101.7119, latitude: 3.1579, altitude: 300, heading: 145, emoji: 'Ã°Å¸â€¡Â²Ã°Å¸â€¡Â¾' },
  { id: 'global-terracotta-army', name: 'Terracotta Army', country: 'China', longitude: 109.2920, latitude: 34.3853, altitude: 300, heading: 335, emoji: 'Ã°Å¸â€¡Â¨Ã°Å¸â€¡Â³' },
  { id: 'global-n-seoul-tower', name: 'N Seoul Tower', country: 'South Korea', longitude: 126.9882, latitude: 37.5512, altitude: 300, heading: 240, emoji: 'Ã°Å¸â€¡Â°Ã°Å¸â€¡Â·' },
  { id: 'global-hoover-dam', name: 'Hoover Dam', country: 'USA', longitude: -114.7378, latitude: 36.0156, altitude: 300, heading: 105, emoji: 'Ã°Å¸â€¡ÂºÃ°Å¸â€¡Â¸' },
  { id: 'global-mount-royal', name: 'Mount Royal Lookout', country: 'Canada', longitude: -73.5873, latitude: 45.5048, altitude: 300, heading: 300, emoji: 'Ã°Å¸â€¡Â¨Ã°Å¸â€¡Â¦' },
  { id: 'global-copacabana-fort', name: 'Copacabana Fort', country: 'Brazil', longitude: -43.1869, latitude: -22.9872, altitude: 300, heading: 45, emoji: 'Ã°Å¸â€¡Â§Ã°Å¸â€¡Â·' },
  { id: 'global-obelisco', name: 'Obelisco de Buenos Aires', country: 'Argentina', longitude: -58.3816, latitude: -34.6037, altitude: 300, heading: 178, emoji: 'Ã°Å¸â€¡Â¦Ã°Å¸â€¡Â·' },
  { id: 'global-monserrate', name: 'Monserrate Sanctuary', country: 'Colombia', longitude: -74.0566, latitude: 4.6053, altitude: 300, heading: 15, emoji: 'Ã°Å¸â€¡Â¨Ã°Å¸â€¡Â´' },
  { id: 'global-canal-panama', name: 'Miraflores Locks', country: 'Panama', longitude: -79.5941, latitude: 8.9956, altitude: 300, heading: 255, emoji: 'Ã°Å¸â€¡ÂµÃ°Å¸â€¡Â¦' },
  { id: 'global-nairobi-park', name: 'Nairobi National Park Gate', country: 'Kenya', longitude: 36.8260, latitude: -1.3733, altitude: 300, heading: 125, emoji: 'Ã°Å¸â€¡Â°Ã°Å¸â€¡Âª' },
  { id: 'global-giza-sphinx', name: 'Great Sphinx of Giza', country: 'Egypt', longitude: 31.1376, latitude: 29.9753, altitude: 300, heading: 78, emoji: 'Ã°Å¸â€¡ÂªÃ°Å¸â€¡Â¬' },
  { id: 'global-rabat-kasbah', name: 'Kasbah of the Udayas', country: 'Morocco', longitude: -6.8380, latitude: 34.0269, altitude: 300, heading: 210, emoji: 'Ã°Å¸â€¡Â²Ã°Å¸â€¡Â¦' },
  { id: 'global-christuskirche', name: 'Christuskirche', country: 'Namibia', longitude: 17.0830, latitude: -22.5670, altitude: 300, heading: 287, emoji: 'Ã°Å¸â€¡Â³Ã°Å¸â€¡Â¦' },
  { id: 'global-harare-memory', name: 'Hall of Memory', country: 'Zimbabwe', longitude: 31.0530, latitude: -17.8200, altitude: 300, heading: 320, emoji: 'Ã°Å¸â€¡Â¿Ã°Å¸â€¡Â¼' },
  { id: 'global-auckland-harbour', name: 'Auckland Harbour Bridge', country: 'New Zealand', longitude: 174.7465, latitude: -36.8309, altitude: 300, heading: 200, emoji: 'Ã°Å¸â€¡Â³Ã°Å¸â€¡Â¿' },
];

const GLOBAL_STADIUM_LOCATIONS: Location[] = [
  { id: 'stadium-fnb', name: 'FNB Stadium', country: 'South Africa', longitude: 27.9826, latitude: -26.2347, altitude: 300, heading: 180, emoji: 'ðŸ‡¿ðŸ‡¦' },
  { id: 'stadium-cape-town', name: 'Cape Town Stadium', country: 'South Africa', longitude: 18.4115, latitude: -33.9036, altitude: 300, heading: 220, emoji: 'ðŸ‡¿ðŸ‡¦' },
  { id: 'stadium-wembley', name: 'Wembley Stadium', country: 'United Kingdom', longitude: -0.2795, latitude: 51.5560, altitude: 300, heading: 165, emoji: 'ðŸ‡¬ðŸ‡§' },
  { id: 'stadium-camp-nou', name: 'Camp Nou', country: 'Spain', longitude: 2.1228, latitude: 41.3809, altitude: 300, heading: 205, emoji: 'ðŸ‡ªðŸ‡¸' },
  { id: 'stadium-bernabeu', name: 'Santiago Bernabeu', country: 'Spain', longitude: -3.6883, latitude: 40.4530, altitude: 300, heading: 120, emoji: 'ðŸ‡ªðŸ‡¸' },
  { id: 'stadium-allianz-arena', name: 'Allianz Arena', country: 'Germany', longitude: 11.6247, latitude: 48.2188, altitude: 300, heading: 310, emoji: 'ðŸ‡©ðŸ‡ª' },
  { id: 'stadium-san-siro', name: 'San Siro', country: 'Italy', longitude: 9.1240, latitude: 45.4781, altitude: 300, heading: 145, emoji: 'ðŸ‡®ðŸ‡¹' },
  { id: 'stadium-stade-france', name: 'Stade de France', country: 'France', longitude: 2.3601, latitude: 48.9244, altitude: 300, heading: 100, emoji: 'ðŸ‡«ðŸ‡·' },
  { id: 'stadium-lusail', name: 'Lusail Stadium', country: 'Qatar', longitude: 51.4905, latitude: 25.4210, altitude: 300, heading: 240, emoji: 'ðŸ‡¶ðŸ‡¦' },
  { id: 'stadium-maracana', name: 'Maracana Stadium', country: 'Brazil', longitude: -43.2302, latitude: -22.9121, altitude: 300, heading: 75, emoji: 'ðŸ‡§ðŸ‡·' },
  { id: 'stadium-monumental', name: 'Estadio Monumental', country: 'Argentina', longitude: -58.4498, latitude: -34.5453, altitude: 300, heading: 185, emoji: 'ðŸ‡¦ðŸ‡·' },
  { id: 'stadium-azteca', name: 'Estadio Azteca', country: 'Mexico', longitude: -99.1506, latitude: 19.3029, altitude: 300, heading: 210, emoji: 'ðŸ‡²ðŸ‡½' },
  { id: 'stadium-sofi', name: 'SoFi Stadium', country: 'USA', longitude: -118.3392, latitude: 33.9535, altitude: 300, heading: 145, emoji: 'ðŸ‡ºðŸ‡¸' },
  { id: 'stadium-metlife', name: 'MetLife Stadium', country: 'USA', longitude: -74.0745, latitude: 40.8135, altitude: 300, heading: 330, emoji: 'ðŸ‡ºðŸ‡¸' },
  { id: 'stadium-att', name: 'AT&T Stadium', country: 'USA', longitude: -97.0945, latitude: 32.7473, altitude: 300, heading: 280, emoji: 'ðŸ‡ºðŸ‡¸' },
  { id: 'stadium-yankee', name: 'Yankee Stadium', country: 'USA', longitude: -73.9262, latitude: 40.8296, altitude: 300, heading: 230, emoji: 'ðŸ‡ºðŸ‡¸' },
  { id: 'stadium-tokyo-dome', name: 'Tokyo Dome', country: 'Japan', longitude: 139.7519, latitude: 35.7056, altitude: 300, heading: 260, emoji: 'ðŸ‡¯ðŸ‡µ' },
  { id: 'stadium-saitama', name: 'Saitama Stadium', country: 'Japan', longitude: 139.7172, latitude: 35.9032, altitude: 300, heading: 110, emoji: 'ðŸ‡¯ðŸ‡µ' },
  { id: 'stadium-mcg', name: 'Melbourne Cricket Ground', country: 'Australia', longitude: 144.9834, latitude: -37.8199, altitude: 300, heading: 295, emoji: 'ðŸ‡¦ðŸ‡º' },
  { id: 'stadium-scg', name: 'Sydney Cricket Ground', country: 'Australia', longitude: 151.2240, latitude: -33.8917, altitude: 300, heading: 205, emoji: 'ðŸ‡¦ðŸ‡º' },
  { id: 'stadium-eden-park', name: 'Eden Park', country: 'New Zealand', longitude: 174.7445, latitude: -36.8750, altitude: 300, heading: 130, emoji: 'ðŸ‡³ðŸ‡¿' },
  { id: 'stadium-narendra-modi', name: 'Narendra Modi Stadium', country: 'India', longitude: 72.6357, latitude: 23.0910, altitude: 300, heading: 185, emoji: 'ðŸ‡®ðŸ‡³' },
  { id: 'stadium-bukit-jalil', name: 'Bukit Jalil National Stadium', country: 'Malaysia', longitude: 101.6917, latitude: 3.0542, altitude: 300, heading: 175, emoji: 'ðŸ‡²ðŸ‡¾' },
  { id: 'stadium-olympiastadion', name: 'Olympiastadion Munich', country: 'Germany', longitude: 11.5486, latitude: 48.1736, altitude: 300, heading: 300, emoji: 'ðŸ‡©ðŸ‡ª' },
  { id: 'stadium-estadio-nacional', name: 'Estadio Nacional', country: 'Peru', longitude: -77.0420, latitude: -12.0676, altitude: 300, heading: 25, emoji: 'ðŸ‡µðŸ‡ª' },
  { id: 'stadium-old-trafford', name: 'Old Trafford', country: 'United Kingdom', longitude: -2.2913, latitude: 53.4631, altitude: 300, heading: 210, emoji: 'ðŸ‡¬ðŸ‡§' },
  { id: 'stadium-anfield', name: 'Anfield', country: 'United Kingdom', longitude: -2.9608, latitude: 53.4308, altitude: 300, heading: 160, emoji: 'ðŸ‡¬ðŸ‡§' },
  { id: 'stadium-tottenham', name: 'Tottenham Hotspur Stadium', country: 'United Kingdom', longitude: -0.0664, latitude: 51.6043, altitude: 300, heading: 315, emoji: 'ðŸ‡¬ðŸ‡§' },
  { id: 'stadium-emirates', name: 'Emirates Stadium', country: 'United Kingdom', longitude: -0.1084, latitude: 51.5549, altitude: 300, heading: 98, emoji: 'ðŸ‡¬ðŸ‡§' },
  { id: 'stadium-etihad', name: 'Etihad Stadium', country: 'United Kingdom', longitude: -2.2004, latitude: 53.4831, altitude: 300, heading: 180, emoji: 'ðŸ‡¬ðŸ‡§' },
  { id: 'stadium-signal-iduna', name: 'Signal Iduna Park', country: 'Germany', longitude: 7.4519, latitude: 51.4926, altitude: 300, heading: 270, emoji: 'ðŸ‡©ðŸ‡ª' },
  { id: 'stadium-allianz-arena-bayern', name: 'Allianz Arena (Bayern)', country: 'Germany', longitude: 11.6247, latitude: 48.2188, altitude: 300, heading: 295, emoji: 'ðŸ‡©ðŸ‡ª' },
  { id: 'stadium-red-bull-arena-leipzig', name: 'Red Bull Arena Leipzig', country: 'Germany', longitude: 12.3480, latitude: 51.3458, altitude: 300, heading: 130, emoji: 'ðŸ‡©ðŸ‡ª' },
  { id: 'stadium-johan-cruyff', name: 'Johan Cruyff Arena', country: 'Netherlands', longitude: 4.9396, latitude: 52.3143, altitude: 300, heading: 140, emoji: 'ðŸ‡³ðŸ‡±' },
  { id: 'stadium-de-kuip', name: 'De Kuip', country: 'Netherlands', longitude: 4.5231, latitude: 51.8939, altitude: 300, heading: 235, emoji: 'ðŸ‡³ðŸ‡±' },
  { id: 'stadium-da-luz', name: 'Estadio da Luz', country: 'Portugal', longitude: -9.1848, latitude: 38.7528, altitude: 300, heading: 230, emoji: 'ðŸ‡µðŸ‡¹' },
  { id: 'stadium-dragao', name: 'Estadio do Dragao', country: 'Portugal', longitude: -8.5836, latitude: 41.1619, altitude: 300, heading: 315, emoji: 'ðŸ‡µðŸ‡¹' },
  { id: 'stadium-turin-allianz', name: 'Allianz Stadium Turin', country: 'Italy', longitude: 7.6413, latitude: 45.1096, altitude: 300, heading: 125, emoji: 'ðŸ‡®ðŸ‡¹' },
  { id: 'stadium-diego-armando-maradona', name: 'Stadio Diego Armando Maradona', country: 'Italy', longitude: 14.1930, latitude: 40.8279, altitude: 300, heading: 250, emoji: 'ðŸ‡®ðŸ‡¹' },
  { id: 'stadium-parc-des-princes', name: 'Parc des Princes', country: 'France', longitude: 2.2530, latitude: 48.8414, altitude: 300, heading: 190, emoji: 'ðŸ‡«ðŸ‡·' },
  { id: 'stadium-stade-velodrome', name: 'Stade Velodrome', country: 'France', longitude: 5.3959, latitude: 43.2699, altitude: 300, heading: 45, emoji: 'ðŸ‡«ðŸ‡·' },
  { id: 'stadium-civitas-metropolitano', name: 'Civitas Metropolitano', country: 'Spain', longitude: -3.5995, latitude: 40.4362, altitude: 300, heading: 170, emoji: 'ðŸ‡ªðŸ‡¸' },
  { id: 'stadium-ramon-sanchez-pizjuan', name: 'Ramon Sanchez-Pizjuan', country: 'Spain', longitude: -5.9708, latitude: 37.3841, altitude: 300, heading: 208, emoji: 'ðŸ‡ªðŸ‡¸' },
  { id: 'stadium-stamford-bridge', name: 'Stamford Bridge', country: 'United Kingdom', longitude: -0.1910, latitude: 51.4817, altitude: 300, heading: 150, emoji: 'ðŸ‡¬ðŸ‡§' },
  { id: 'stadium-celtic-park', name: 'Celtic Park', country: 'United Kingdom', longitude: -4.2056, latitude: 55.8497, altitude: 300, heading: 255, emoji: 'ðŸ‡¬ðŸ‡§' },
];

const GLOBAL_LOCATIONS: Location[] = [...GLOBAL_ICONIC_LOCATIONS, ...GLOBAL_STADIUM_LOCATIONS];

const DEFAULT_TELEPORT_ALTITUDE = 1000;

const COUNTRY_CODE_RULES: Array<[string, string]> = [
  ['south africa', 'ZA'],
  ['france', 'FR'],
  ['italy', 'IT'],
  ['greece', 'GR'],
  ['united kingdom', 'GB'],
  ['spain', 'ES'],
  ['germany', 'DE'],
  ['czech republic', 'CZ'],
  ['netherlands', 'NL'],
  ['uae', 'AE'],
  ['jordan', 'JO'],
  ['egypt', 'EG'],
  ['india', 'IN'],
  ['china', 'CN'],
  ['cambodia', 'KH'],
  ['japan', 'JP'],
  ['singapore', 'SG'],
  ['australia', 'AU'],
  ['new zealand', 'NZ'],
  ['brazil', 'BR'],
  ['peru', 'PE'],
  ['chile', 'CL'],
  ['argentina', 'AR'],
  ['mexico', 'MX'],
  ['usa', 'US'],
  ['canada', 'CA'],
  ['russia', 'RU'],
  ['turkey', 'TR'],
  ['switzerland', 'CH'],
  ['vatican city', 'VA'],
  ['saudi arabia', 'SA'],
  ['malaysia', 'MY'],
  ['south korea', 'KR'],
  ['taiwan', 'TW'],
  ['tanzania', 'TZ'],
  ['zimbabwe', 'ZW'],
  ['morocco', 'MA'],
  ['ethiopia', 'ET'],
  ['israel', 'IL'],
  ['colombia', 'CO'],
  ['panama', 'PA'],
  ['kenya', 'KE'],
  ['namibia', 'NA'],
  ['antarctica', 'AQ'],
  ['qatar', 'QA'],
  ['portugal', 'PT'],
  ['hungary', 'HU'],
  ['croatia', 'HR'],
  ['slovenia', 'SI'],
  ['myanmar', 'MM'],
  ['vietnam', 'VN'],
  ['philippines', 'PH'],
  ['indonesia', 'ID'],
];

function resolveCountryCode(countryLabel: string): string {
  const normalized = countryLabel.toLowerCase();

  if (normalized.includes('/')) {
    return normalized
      .split('/')
      .map((part) => resolveCountryCode(part.trim()))
      .join('/');
  }

  for (const [needle, code] of COUNTRY_CODE_RULES) {
    if (normalized.includes(needle)) return code;
  }

  return 'GL';
}

function inferLocationType(location: Location): string {
  const id = location.id.toLowerCase();
  const text = `${location.name} ${location.country}`.toLowerCase();

  if (id.startsWith('stadium-') || /\b(stadium|arena|dome|cricket ground|ballpark)\b/.test(text)) {
    return 'Stadium';
  }

  if (/\b(parliament|assembly|white house|union buildings)\b/.test(text)) {
    return 'Government';
  }

  if (/\b(mountain|falls|canyon|wetland|river|island|bay|lake|dunes|plains|point|highlands|valley|park)\b/.test(text)) {
    return 'Nature';
  }

  if (/\b(monument|memorial|museum|castle|cathedral|church|mosque|temple|shrine|palace|fort|pyramid|sphinx|bridge|tower|gate|wall|site|prison)\b/.test(text)) {
    return 'Monument';
  }

  return 'Landmark';
}

function getScopeSlogan(scope: LocationScope): string {
  return scope === 'domestic' ? 'Local Discovery' : 'World Tour';
}

export function LocationSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [scope, setScope] = useState<LocationScope>('domestic');
  const [search, setSearch] = useState('');
  const { teleportTo } = useGameMethod();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeLocations = useMemo(
    () => (scope === 'domestic' ? DOMESTIC_LOCATIONS : GLOBAL_LOCATIONS),
    [scope]
  );

  const filteredLocations = activeLocations.filter(
    (loc) =>
      loc.name.toLowerCase().includes(search.toLowerCase()) ||
      loc.country.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (location: Location) => {
    teleportTo(location.longitude, location.latitude, DEFAULT_TELEPORT_ALTITUDE, location.heading);
    setIsOpen(false);
    setSearch('');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-slate-900/80 border border-cyan-400/80 
                   px-4 py-2.5 hover:bg-slate-800 hover:border-cyan-300 
                   transition-all duration-300 text-cyan-100 hover:text-white text-xs font-medium 
                   tracking-wide rounded-lg backdrop-blur-sm flex items-center gap-2 group shadow-lg"
        title="Teleport to Location (T)"
      >
        <svg className="w-4 h-4 text-cyan-300 group-hover:text-cyan-100 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span>Teleport</span>
      </button>

      {isOpen && (
        <div className="absolute top-14 -right-2 w-96 glass-panel animate-fade-in z-[60]">
          <div className="p-3 border-b border-white/5 space-y-2.5">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setScope('domestic');
                  setSearch('');
                }}
                className={`px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                  scope === 'domestic'
                    ? 'bg-white/20 text-white'
                    : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                Domestic (40)
              </button>
              <button
                onClick={() => {
                  setScope('global');
                  setSearch('');
                }}
                className={`px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                  scope === 'global'
                    ? 'bg-white/20 text-white'
                    : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                Global (150)
              </button>
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Search ${scope === 'domestic' ? 'domestic' : 'global'} locations...`}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-future-primary transition-colors"
              autoFocus
            />
          </div>

          <div className="max-h-96 overflow-y-auto">
            {filteredLocations.length > 0 ? (
              filteredLocations.map((location) => {
                return (
                  <button
                    key={location.id}
                    onClick={() => handleSelect(location)}
                    className="w-full px-4 py-3 text-left hover:bg-white/5 transition-colors border-b border-white/5 last:border-0 group"
                  >
                    <div className="flex items-start">
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-white">
                        {location.name}
                      </div>
                      <div className="text-xs text-white/50 mt-0.5">
                        {location.country}
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-white/70">
                          {resolveCountryCode(location.country)}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-white/70">
                          {inferLocationType(location)}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-white/60">
                          {getScopeSlogan(scope)}
                        </span>
                      </div>
                    </div>
                  </div>
                  </button>
                );
              })
            ) : (
              <div className="px-4 py-8 text-center text-sm text-white/40">
                No locations found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
