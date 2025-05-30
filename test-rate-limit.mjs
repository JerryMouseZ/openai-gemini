// Test script for rate limiting functionality
import fs from 'fs';

// Create a test .env file
const testEnvContent = `API_KEYS=test-key-1,test-key-2`;
fs.writeFileSync('.env', testEnvContent);

// Import the worker module
const { default: worker } = await import('./src/worker.mjs');

// Helper function to create a mock request
function createMockRequest(method = 'POST', url = 'https://example.com/chat/completions') {
  return {
    method,
    url,
    headers: new Map(),
    json: async () => ({ model: 'gemini-2.0-flash', messages: [{ role: 'user', content: 'test' }] })
  };
}

// Test function
async function testRateLimit() {
  console.log('Testing rate limit functionality...');
  
  const mockRequest = createMockRequest();
  mockRequest.headers.get = () => null; // No authorization header
  
  try {
    // Make 5 requests quickly (should succeed)
    for (let i = 1; i <= 20; i++) {
      console.log(`Making request ${i}...`);
      const response = await worker.fetch(mockRequest);
      console.log(`Request ${i} status:`, response.status || 'unknown');
    }
    
    // Make 6th request (should be rate limited)
    console.log('Making 6th request (should be rate limited)...');
    const response = await worker.fetch(mockRequest);
    console.log('6th request status:', response.status || 'unknown');
    
    if (response.status === 429) {
      console.log('✅ Rate limiting is working correctly!');
    } else {
      console.log('❌ Rate limiting may not be working as expected');
    }
    
  } catch (error) {
    console.log('Error during test:', error.message);
  }
  
  // Clean up
  fs.unlinkSync('.env');
}

testRateLimit().catch(console.error);
