Dub is an open-source link management platform for tracking link clicks and conversions.

You can use the managed cloud version at [Dub.co](https://dub.co) or host it yourself.

## Set up Dub locally

Read [this guide](https://dub.co/docs/local-development) to set up Dub locally.

## Host Dub yourself

Read [this guide](https://dub.co/docs/self-hosting) to host it yourself.

## Customize the Tinybird project

If you are just interested in the Tinybird project, you can find the project [here](https://github.com/dubinc/dub/packages/tinybird).

## Generate mock data

You can generate mock data for local development and testing by cloning the repository and running the following commands:

```bash
cd dub
npm install
node generate.js

Generating metadata for 50 links...
Link metadata generated and saved!
Generating:
- 100000 click events
- ~10000 lead events
- ~5000 sale events
in 10 batches...
Batch 1/10 complete
Batch 2/10 complete
Batch 3/10 complete
Batch 4/10 complete
Batch 5/10 complete
Batch 6/10 complete
Batch 7/10 complete
Batch 8/10 complete
Batch 9/10 complete
Batch 10/10 complete
Done! Files generated:
- MySQL seed file: seed.sql
- Link metadata: dub_links_metadata.ndjson
- Click events: dub_click_events.ndjson
- Lead events: dub_lead_events.ndjson
.DS_Store
- Sale events: dub_sale_events.ndjson

Append ndjson files to Tinybird by running;

tb datasource append dub_links_metadata dub_links_metadata.ndjson
tb datasource append dub_click_events dub_click_events.ndjson
tb datasource append dub_lead_events dub_lead_events.ndjson
tb datasource append dub_sale_events dub_sale_events.ndjson

Go to dub/apps/web folder and deed MySQL by running:

docker-compose exec -T ps-mysql mysql -u root planetscale < seed.sql
```
