#!/usr/bin/env node

/**
 * Test API Connections - HubSpot & Contentful
 *
 * Vérifie la connectivité et l'authenticité des clés API
 */

require('dotenv').config({ path: '.env.local' });

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
};

console.log(`${colors.cyan}${colors.bold}╔═══════════════════════════════════════╗${colors.reset}`);
console.log(`${colors.cyan}${colors.bold}║   API Connection Test - E2I VoIP     ║${colors.reset}`);
console.log(`${colors.cyan}${colors.bold}╚═══════════════════════════════════════╝${colors.reset}\n`);

async function testHubSpotAPI() {
  console.log(`${colors.cyan}→ Testing HubSpot API...${colors.reset}`);

  const apiKey = process.env.HUBSPOT_API_KEY;
  const accessToken = process.env.HUBSPOT_ACCESS_TOKEN;
  const portalId = process.env.HUBSPOT_PORTAL_ID;

  if (!apiKey && !accessToken) {
    console.log(`${colors.red}✗ No HubSpot credentials found${colors.reset}`);
    console.log(`  Missing: HUBSPOT_API_KEY or HUBSPOT_ACCESS_TOKEN\n`);
    return false;
  }

  console.log(`  Portal ID: ${portalId || 'Not set'}`);
  console.log(`  API Key: ${apiKey ? '✓ Set' : '✗ Not set'}`);
  console.log(`  Access Token: ${accessToken ? '✓ Set' : '✗ Not set'}\n`);

  // Test avec l'API HubSpot - endpoint forms
  try {
    const headers = accessToken
      ? { 'Authorization': `Bearer ${accessToken}` }
      : { 'Authorization': `Bearer ${apiKey}` };

    const response = await fetch(
      `https://api.hubapi.com/forms/v2/forms?portalId=${portalId}`,
      { headers }
    );

    if (response.ok) {
      const data = await response.json();
      console.log(`${colors.green}✓ HubSpot API: Connected successfully${colors.reset}`);
      console.log(`  Forms found: ${data.length || 0}`);

      if (data.length > 0) {
        console.log(`\n  Sample forms:`);
        data.slice(0, 3).forEach(form => {
          console.log(`    - ${form.name} (ID: ${form.guid})`);
        });
      }
      console.log();
      return true;
    } else {
      const error = await response.text();
      console.log(`${colors.red}✗ HubSpot API: Failed${colors.reset}`);
      console.log(`  Status: ${response.status} ${response.statusText}`);
      console.log(`  Error: ${error.substring(0, 200)}...\n`);
      return false;
    }
  } catch (error) {
    console.log(`${colors.red}✗ HubSpot API: Error${colors.reset}`);
    console.log(`  ${error.message}\n`);
    return false;
  }
}

async function testContentfulAPI() {
  console.log(`${colors.cyan}→ Testing Contentful API...${colors.reset}`);

  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;
  const environment = process.env.CONTENTFUL_ENVIRONNEMENT || 'master';

  if (!spaceId || !accessToken) {
    console.log(`${colors.red}✗ Contentful credentials missing${colors.reset}`);
    console.log(`  Missing: ${!spaceId ? 'CONTENTFUL_SPACE_ID' : ''} ${!accessToken ? 'CONTENTFUL_ACCESS_TOKEN' : ''}\n`);
    return false;
  }

  console.log(`  Space ID: ${spaceId}`);
  console.log(`  Environment: ${environment}`);
  console.log(`  Access Token: ✓ Set\n`);

  try {
    const response = await fetch(
      `https://cdn.contentful.com/spaces/${spaceId}/environments/${environment}/entries?content_type=blogPost&limit=5`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log(`${colors.green}✓ Contentful API: Connected successfully${colors.reset}`);
      console.log(`  Blog posts found: ${data.total || 0}`);

      if (data.items && data.items.length > 0) {
        console.log(`\n  Sample blog posts:`);
        data.items.slice(0, 3).forEach(item => {
          const title = item.fields.title || 'Untitled';
          console.log(`    - ${title}`);
        });
      }
      console.log();
      return true;
    } else {
      const error = await response.text();
      console.log(`${colors.red}✗ Contentful API: Failed${colors.reset}`);
      console.log(`  Status: ${response.status} ${response.statusText}`);
      console.log(`  Error: ${error.substring(0, 200)}...\n`);
      return false;
    }
  } catch (error) {
    console.log(`${colors.red}✗ Contentful API: Error${colors.reset}`);
    console.log(`  ${error.message}\n`);
    return false;
  }
}

async function main() {
  const results = {
    hubspot: false,
    contentful: false
  };

  results.hubspot = await testHubSpotAPI();
  results.contentful = await testContentfulAPI();

  console.log(`${colors.cyan}${colors.bold}═══════════════════════════════════════${colors.reset}`);
  console.log(`${colors.cyan}${colors.bold}           SUMMARY${colors.reset}`);
  console.log(`${colors.cyan}${colors.bold}═══════════════════════════════════════${colors.reset}\n`);

  console.log(`HubSpot API: ${results.hubspot ? colors.green + '✓ OK' : colors.red + '✗ FAILED'}${colors.reset}`);
  console.log(`Contentful API: ${results.contentful ? colors.green + '✓ OK' : colors.red + '✗ FAILED'}${colors.reset}\n`);

  if (results.hubspot && results.contentful) {
    console.log(`${colors.green}✓ All APIs working correctly${colors.reset}\n`);
    process.exit(0);
  } else {
    console.log(`${colors.red}✗ Some APIs failed - check your .env.local configuration${colors.reset}\n`);
    console.log(`${colors.yellow}Troubleshooting:${colors.reset}`);
    console.log(`1. Verify your API keys in .env.local`);
    console.log(`2. Check if keys have been rotated recently`);
    console.log(`3. Verify permissions for the API keys`);
    console.log(`4. Check HubSpot/Contentful dashboard for key status\n`);
    process.exit(1);
  }
}

main();
