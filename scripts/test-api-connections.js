#!/usr/bin/env node

/**
 * Test API Connections — HubSpot (CRM + blog CMS)
 */

require("dotenv").config({ path: ".env.local" });

const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
  bold: "\x1b[1m",
};

console.log(
  `${colors.cyan}${colors.bold}╔═══════════════════════════════════════╗${colors.reset}`
);
console.log(
  `${colors.cyan}${colors.bold}║   API Connection Test - E2I VoIP     ║${colors.reset}`
);
console.log(
  `${colors.cyan}${colors.bold}╚═══════════════════════════════════════╝${colors.reset}\n`
);

async function testHubSpotFormsAPI() {
  console.log(`${colors.cyan}→ Testing HubSpot Forms API...${colors.reset}`);

  const apiKey = process.env.HUBSPOT_API_KEY;
  const accessToken = process.env.HUBSPOT_ACCESS_TOKEN;
  const portalId = process.env.HUBSPOT_PORTAL_ID;

  if (!apiKey && !accessToken) {
    console.log(`${colors.red}✗ No HubSpot credentials found${colors.reset}`);
    console.log(`  Missing: HUBSPOT_API_KEY or HUBSPOT_ACCESS_TOKEN\n`);
    return false;
  }

  console.log(`  Portal ID: ${portalId || "Not set"}`);
  console.log(`  API Key: ${apiKey ? "✓ Set" : "✗ Not set"}`);
  console.log(`  Access Token: ${accessToken ? "✓ Set" : "✗ Not set"}\n`);

  try {
    const headers = {
      Authorization: `Bearer ${accessToken || apiKey}`,
    };

    const response = await fetch(
      `https://api.hubapi.com/forms/v2/forms?portalId=${portalId}`,
      { headers }
    );

    if (response.ok) {
      const data = await response.json();
      console.log(
        `${colors.green}✓ HubSpot Forms API: Connected successfully${colors.reset}`
      );
      console.log(`  Forms found: ${data.length || 0}\n`);
      return true;
    }

    const error = await response.text();
    console.log(`${colors.red}✗ HubSpot Forms API: Failed${colors.reset}`);
    console.log(`  Status: ${response.status} ${response.statusText}`);
    console.log(`  Error: ${error.substring(0, 200)}...\n`);
    return false;
  } catch (error) {
    console.log(`${colors.red}✗ HubSpot Forms API: Error${colors.reset}`);
    console.log(`  ${error.message}\n`);
    return false;
  }
}

async function testHubSpotBlogAPI() {
  console.log(`${colors.cyan}→ Testing HubSpot Blog CMS API...${colors.reset}`);

  const accessToken = process.env.HUBSPOT_ACCESS_TOKEN;

  if (!accessToken) {
    console.log(`${colors.red}✗ HUBSPOT_ACCESS_TOKEN missing${colors.reset}`);
    console.log(
      `  Required for public blog (/blog) — scopes: cms.blog.read, cms.blog_posts.read\n`
    );
    return false;
  }

  try {
    const response = await fetch(
      "https://api.hubapi.com/cms/v3/blogs/posts?limit=3&archived=false&state=PUBLISHED",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      const count = data.results?.length ?? 0;
      console.log(
        `${colors.green}✓ HubSpot Blog API: Connected successfully${colors.reset}`
      );
      console.log(`  Sample posts returned: ${count}`);
      if (data.results?.length) {
        console.log("\n  Sample posts:");
        data.results.slice(0, 3).forEach((post) => {
          console.log(`    - ${post.name} (/${post.slug})`);
        });
      }
      console.log();
      return true;
    }

    const error = await response.text();
    console.log(`${colors.red}✗ HubSpot Blog API: Failed${colors.reset}`);
    console.log(`  Status: ${response.status} ${response.statusText}`);
    console.log(`  Error: ${error.substring(0, 200)}...\n`);
    return false;
  } catch (error) {
    console.log(`${colors.red}✗ HubSpot Blog API: Error${colors.reset}`);
    console.log(`  ${error.message}\n`);
    return false;
  }
}

async function main() {
  const formsOk = await testHubSpotFormsAPI();
  const blogOk = await testHubSpotBlogAPI();

  console.log(
    `${colors.cyan}${colors.bold}═══════════════════════════════════════${colors.reset}`
  );
  console.log(`${colors.cyan}${colors.bold}           SUMMARY${colors.reset}`);
  console.log(
    `${colors.cyan}${colors.bold}═══════════════════════════════════════${colors.reset}\n`
  );

  console.log(
    `HubSpot Forms: ${formsOk ? colors.green + "✓ OK" : colors.red + "✗ FAILED"}${colors.reset}`
  );
  console.log(
    `HubSpot Blog:  ${blogOk ? colors.green + "✓ OK" : colors.red + "✗ FAILED"}${colors.reset}\n`
  );

  if (formsOk && blogOk) {
    console.log(`${colors.green}✓ HubSpot APIs OK${colors.reset}\n`);
    process.exit(0);
  }

  console.log(
    `${colors.red}✗ Configure HUBSPOT_ACCESS_TOKEN (and optional HUBSPOT_API_KEY) in .env.local${colors.reset}\n`
  );
  process.exit(1);
}

main();
