import fs from 'fs';
import { generateEvents } from './schema.js';

const TOTAL_CLICKS = 10_000;
const BATCH_SIZE = 1_000;
const LINK_COUNT = 50;
const LEAD_CONVERSION_RATE = 0.1; // 10% of clicks generate leads
const SALE_CONVERSION_RATE = 0.05; // 5% of clicks generate sales
const CLICKS_FILE = 'dub_click_events.ndjson';
const METADATA_FILE = 'dub_links_metadata.ndjson';
const LEADS_FILE = 'dub_lead_events.ndjson';
const SALES_FILE = 'dub_sale_events.ndjson';

// Clear files if they exist
fs.writeFileSync(CLICKS_FILE, '');
fs.writeFileSync(METADATA_FILE, '');
fs.writeFileSync(LEADS_FILE, '');
fs.writeFileSync(SALES_FILE, '');

// First generate and write all link metadata
console.log(`Generating metadata for ${LINK_COUNT} links...`);
const { metadata } = generateEvents(0, LINK_COUNT);
const metadataNdjson = metadata
    .map(event => JSON.stringify(event))
    .join('\n');
fs.writeFileSync(METADATA_FILE, metadataNdjson + '\n');
console.log('Link metadata generated and saved!');

// Then generate clicks, leads, and sales in batches
const batches = Math.ceil(TOTAL_CLICKS / BATCH_SIZE);
console.log(`Generating:
- ${TOTAL_CLICKS} click events
- ~${Math.floor(TOTAL_CLICKS * LEAD_CONVERSION_RATE)} lead events
- ~${Math.floor(TOTAL_CLICKS * SALE_CONVERSION_RATE)} sale events
in ${batches} batches...`);

for (let i = 0; i < batches; i++) {
    const { clicks, leads, sales } = generateEvents(
        BATCH_SIZE, 
        LINK_COUNT, 
        LEAD_CONVERSION_RATE,
        SALE_CONVERSION_RATE
    );
    
    const clicksNdjson = clicks
        .map(event => JSON.stringify(event))
        .join('\n');
    
    const leadsNdjson = leads
        .map(event => JSON.stringify(event))
        .join('\n');

    const salesNdjson = sales
        .map(event => JSON.stringify(event))
        .join('\n');
    
    fs.appendFileSync(CLICKS_FILE, clicksNdjson + '\n');
    fs.appendFileSync(LEADS_FILE, leadsNdjson + '\n');
    fs.appendFileSync(SALES_FILE, salesNdjson + '\n');
    
    console.log(`Batch ${i + 1}/${batches} complete`);
}

console.log(`Done! Files generated:
- MySQL seed file: seed.sql
- Link metadata: ${METADATA_FILE}
- Click events: ${CLICKS_FILE}
- Lead events: ${LEADS_FILE}
- Sale events: ${SALES_FILE}

Append ndjson files to Tinybird by running;

tb datasource append dub_links_metadata dub_links_metadata.ndjson
tb datasource append dub_click_events dub_click_events.ndjson
tb datasource append dub_lead_events dub_lead_events.ndjson
tb datasource append dub_sale_events dub_sale_events.ndjson

Go to dub/apps/web folder and deed MySQL by running:

docker-compose exec -T ps-mysql mysql -u root planetscale < seed.sql
`); 
