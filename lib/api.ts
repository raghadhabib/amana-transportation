import { AmanaData } from "@/types/amana";

const API_URL = "https://www.amanabootcamp.org/api/fs-classwork-data/amana-transportation";

export async function getAmanaData(): Promise<AmanaData> {
  // We use the `no-store` cache option to ensure we always get fresh data 
  // since this is a "live" tracker application.
  const response = await fetch(API_URL, { cache: 'no-store' }); 
  
  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }
  
  const data = await response.json();
  // The API response has an outer "message" key, but we are only interested in the data structure defined in AmanaData.
  // We'll safely assume the data keys match the provided example.
  return data as AmanaData; 
}