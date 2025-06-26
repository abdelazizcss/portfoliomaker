/**
 * Helper functions for validating and formatting URLs
 */

/**
 * Validates and formats a URL, ensuring it has a proper protocol
 * 
 * @param url The URL to validate and format
 * @returns The formatted URL or undefined if invalid
 */
export function validateAndFormatUrl(url?: string): string | undefined {
  if (!url) return undefined;
  
  try {
    // Trim any whitespace
    url = url.trim();
    
    // If the URL doesn't start with a protocol, add https://
    if (!url.match(/^https?:\/\//i)) {
      url = 'https://' + url;
    }
    
    // Create a URL object to validate it (will throw if invalid)
    const urlObj = new URL(url);
    
    // Return the properly formatted URL
    return urlObj.toString();
  } catch (error) {
    console.error('Invalid URL:', url, error);
    return undefined;
  }
}
