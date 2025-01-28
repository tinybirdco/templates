import fs from 'fs';
import { faker } from '@faker-js/faker';

// Define traffic patterns
const trafficPatterns = {
  // Weekday multipliers (0 = Sunday, 6 = Saturday)
  weekday: [0.7, 1.2, 1.3, 1.3, 1.2, 1.1, 0.8],
  // Hour multipliers (0-23)
  hourly: {
    business: [
      0.2, 0.1, 0.1, 0.1, 0.2, 0.5, // 0-5
      1.0, 2.0, 2.5, 3.0, 2.8, 2.5, // 6-11
      2.3, 2.4, 2.5, 2.4, 2.2, 1.8, // 12-17
      1.5, 1.2, 1.0, 0.8, 0.5, 0.3  // 18-23
    ],
    weekend: [
      0.3, 0.2, 0.1, 0.1, 0.1, 0.2, // 0-5
      0.4, 0.7, 1.0, 1.5, 2.0, 2.2, // 6-11
      2.0, 1.8, 1.7, 1.6, 1.5, 1.4, // 12-17
      1.3, 1.2, 1.0, 0.8, 0.6, 0.4  // 18-23
    ]
  },
  // Special days with traffic spikes or dips
  special: {
    '2023-11-24': 3.0,    // Black Friday
    '2023-12-25': 0.3,    // Christmas
    '2024-01-01': 0.2,    // New Year
    '2024-01-15': 2.5,    // Product Launch
    '2024-02-14': 1.5,    // Valentine's Day
    '2024-03-21': 2.0     // Spring Campaign
  }
};

// Generate timestamps for the last year with realistic patterns
const generateTimestamps = () => {
  const timestamps = [];
  const now = new Date();
  const oneYearAgo = new Date(now);
  oneYearAgo.setFullYear(now.getFullYear() - 1); // Exactly 1 year ago
  
  const currentDate = new Date(oneYearAgo);
  while (currentDate <= now) {
    const isWeekend = currentDate.getDay() === 0 || currentDate.getDay() === 6;
    const dateStr = currentDate.toISOString().split('T')[0];
    const baseEvents = isWeekend ? 100 : 200; // Base events per day
    
    // Apply daily pattern
    let dailyMultiplier = trafficPatterns.weekday[currentDate.getDay()];
    
    // Apply special day multiplier if exists
    if (trafficPatterns.special[dateStr]) {
      dailyMultiplier *= trafficPatterns.special[dateStr];
    }
    
    // Generate events for each hour
    for (let hour = 0; hour < 24; hour++) {
      const hourlyPattern = isWeekend ? 
        trafficPatterns.hourly.weekend[hour] : 
        trafficPatterns.hourly.business[hour];
      
      // Calculate number of events for this hour
      const eventsThisHour = Math.floor(
        baseEvents * dailyMultiplier * hourlyPattern * (0.8 + Math.random() * 0.4)
      );
      
      // Generate timestamps within this hour
      for (let i = 0; i < eventsThisHour; i++) {
        const minute = Math.floor(Math.random() * 60);
        const second = Math.floor(Math.random() * 60);
        
        const timestamp = new Date(currentDate);
        timestamp.setHours(hour, minute, second);
        
        timestamps.push(
          timestamp.toISOString().replace('T', ' ').replace('Z', '').split('.')[0]
        );
      }
    }
    
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return timestamps.sort();
};

const timestamps = generateTimestamps();
let timestampIndex = 0;

// Extract URLs and timestamps from the provided list
const urlData = [
  {
    "url": "https://www.tinybird.co/blog-posts/outgrowing-postgres-how-to-identify-scale-problems",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/outgrowinghandling-growing-data-volumes",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/auth0-webhooks-tinybird-integration",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/vercel-webhooks-and-tinybird-integration",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/tinybird-prometheus-endpoint-format",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/analyze-mcp-server-usage",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/building-an-insights-page-for-your-saas",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/building-real-time-live-sports-viewer-analytics-with-tinybird-and-aws",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/claude-analyze-bluesky-data-tinybird-mcp-server",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/text-search-at-scale-with-clickhouse",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/query-dynamodb-with-sql",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/application-architecture-combining-dynamodb-and-tinybird",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/dynamodb-use-cases",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/dynamodb-real-time-analytics",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/dynamodb-aggregation",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/dynamodb-connector-ga",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/dynamodb-connector-ga",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/tinybird-vs-clickhouse",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/adding-join-support-for-parallel-replicas-on-clickhouse",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/using-bloom-filter-text-indexes-in-clickhouse",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/clickhouse-schema-migration-while-streaming",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/clickhouse-lock-contention",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/clickhouse-joins-improvements",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/managed-clickhouse-options",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/dynamodb-public-beta",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/multi-tenant-saas-options",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/mongodb-cdc",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/mysql-cdc",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/postgres-cdc",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/cdc-real-time-analytics-estuary-dekaf",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/using-tinybird-as-a-serverless-online-feature-store",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/real-time-recommendation-system",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/spatial-indexing-aids-finding-which-polygons-contain-a-point",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/tinybird-hipaa-compliant",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/real-time-analytics-a-definitive-guide",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/user-facing-analytics",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/postgresql-table-function-announcement",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/tinybird-frontend-refactor",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/database-timestamps-timezones",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/real-time-personalization",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/more-data-more-apps",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/how-to-set-up-event-based-ingestion-of-files-in-s3-for-free",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/rate-limiting-announcement",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/the-era-of-json-analytics",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/real-time-analytics-bigquery-dataflow",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/eating-our-own-dog-food-how-we-investigate-performance-bottlenecks-using-our-product-and-google-sheets",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/coming-soon-on-clickhouse-window-functions",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/how-tinybird-scales",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/best-database-for-real-time-analytics",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/migrating-from-rockset-feature-comparison",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/jwt-api-endpoints-public-beta",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/jobs-log-launch",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/automating-data-workflows-with-git",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/announcing-tinybird-series-b",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/world-cup-sentiment",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/building-real-time-leaderboards-with-tinybird",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/announcing-tinybird-charts",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/announcing-tinybird-charts",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/tinybird-is-now-available-in-aws-us-west-2",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/tinybird-connect-with-confluent",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/real-time-streaming-analytics-confluent-connector-tinybird",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/python-real-time-dashboard",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/tinybird-joins-aws-isv-accelerate",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/what-are-materialized-views-and-why-do-they-matter-for-realtime",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/rearrange-nodes-in-pipe",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/tinybird-series-a-whats-next",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/5-rules-for-writing-faster-sql-queries",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/simple-time-series-prediction",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/query-csvs-online-with-sql",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/new-feature-sharing-data-sources-across-workspaces",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/google-analytics-alternative-in-3-minutes",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/query-google-sheets-with-sql-in-real-time",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/how-to-build-a-real-time-fraud-detection-system",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/generate-mock-data-schemas-with-gpt",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/create-a-dynamic-api",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/dev-qa-global-api-latency-chronark",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/dev-qa-global-api-latency-chronark",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/dev-qa-global-api-latency-chronark",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/qa-with-jr-the-builder-beam-analytics",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/qa-with-jr-the-builder-beam-analytics",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/tinybird-tips-1-calculating-aggregations-after-and-before-a-date",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/chatting-graphql-with-jamie-barton-of-grafbase",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/real-time-solutions-with-snowflake",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/frontend-ci-monorepo-turborepo-pnpm",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/automating-customer-usage-alerts-with-tinybird-and-make",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/analyzing-nginx-logs-with-clickhouse-and-tinybird",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/add-data-from-csvs-with-different-column-orders",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/real-time-dashboard-step-by-step",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/mockingbird-announcement-mock-data-generator",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/redesigned-tinybird-ui-developer-productivity",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/summer-of-launch-2024",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/bigquery-real-time-dashboard",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/log-analytics-how-to-identify-trends-and-correlations-that-log-analysis-tools-cannot",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/better-ci-pipeline-with-data",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/to-the-limits-of-sql-api-parameters",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/how-i-replaced-google-analytics-with-retool-and-tinybird-part-2",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/tinybird-for-real-time-marketing",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/clickhouse-query-optimization",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/typeform-utm-realtime-analytics",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/real-time-data-visualization",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/real-time-dashboards-are-they-worth-it",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/7-tips-to-make-your-dashboards-faster",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/dev-qa-guilherme-oenning",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/thinking-in-tinybird",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/stable-cli-v-1-0-0",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/real-time-data-processing",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/improved-notifications-ingestion-issues",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/real-time-data-processing",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/dataops-principles",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/anomaly-detection",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/ecommerce-google-analytics-alternative",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/how-i-replaced-google-analytics-with-retool-and-tinybird-part-1",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/how-i-replaced-google-analytics-with-retool-and-tinybird-part-1",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/what-is-a-columnar-database",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/s3-analytics-the-easy-way-tinybird-connector",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/real-time-data-ingestion",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/serverless-realtime-analytics-vercel-marketplace",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/real-time-data-engineering-example-projects",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/event-driven-architecture-best-practices-for-databases-and-files",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/real-time-streaming-data-architectures-that-scale",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/low-code-analytics-with-james-devonport-of-userloop",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/ksqldb-alternative",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/enterprise-grade-real-time-analytics",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/comparing-tinybird-to-aws-kinesis-s3-glue-and-athena",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/announcing-copy-pipes",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/new-docs",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/why-iterating-real-time-data-pipelines-is-hard",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/5-snowflake-struggles-that-every-data-engineer-deals-with",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/real-time-anomaly-detection",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/event-sourcing-with-kafka",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/real-time-change-data-capture",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/s3-sink-launch",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/kafka-horizontal-scaling",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/real-time-databases-what-developers-need-to-know",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/real-time-data-platforms",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/see-how-much-data-your-endpoints-scan-in-real-time",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/you-can-now-create-materialized-views-in-the-tinybird-ui",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/data-rules-materialized-views-40000-dollars",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/real-time-applications-with-bigquery-connector",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/8-considerations-for-designing-public-data-apis",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/designing-and-implementing-a-weather-data-api",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/data-driven-ci-pipeline-monitoring-with-pytest",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/killing-the-processpoolexecutor",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/tinybird-expands-self-service-to-amazon-web-services",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  },
  {
    "url": "https://www.tinybird.co/blog-posts/git-for-real-time-data-projects",
    "timestamp": timestamps[timestampIndex++ % timestamps.length]
  }
].map(item => ({
  ...item,
  timestamp: timestamps[timestampIndex++ % timestamps.length]
}));

// Constants for link metadata
const DOMAIN = 'tbrd.co';
const TAG_IDS = [
  'tag_marketing',
  'tag_product',
  'tag_engineering',
  'tag_sales',
  'tag_support'
];

const PROGRAM_IDS = [
  'prog_main',
  'prog_beta',
  'prog_enterprise',
  'prog_startup'
];

const WORKSPACE_IDS = [
  'ws_cm69o0q2600005cncoq57kd32'
];

// Function to generate a short key
const generateShortKey = () => {
  return faker.string.alphanumeric({ length: { min: 4, max: 6 }, casing: 'lower' });
};

const generateLinkMetadata = (url, timestamp, link_id) => {
  return {
    timestamp: timestamp,
    link_id: link_id,
    domain: DOMAIN,
    key: generateShortKey(),
    url: url,
    tag_ids: faker.helpers.arrayElements(TAG_IDS, { min: 1, max: 3 }),
    program_id: faker.helpers.arrayElement(PROGRAM_IDS),
    workspace_id: faker.helpers.arrayElement(WORKSPACE_IDS),
    created_at: timestamp,
    deleted: faker.helpers.arrayElement([0, 0, 0, 1]) // 25% chance of being deleted
  };
};

const TRAFFIC_WEIGHTS = {
  continents: {
    'NA': 35,  // North America
    'EU': 30,  // Europe
    'AS': 20,  // Asia
    'SA': 8,   // South America
    'OC': 4,   // Oceania
    'AF': 3    // Africa
  },
  countries: {
    'US': 30, 'GB': 12, 'DE': 8, 'FR': 7, 'CA': 5,
    'JP': 5, 'AU': 4, 'BR': 4, 'IN': 4, 'ES': 3,
    'IT': 3, 'NL': 3, 'SE': 2, 'SG': 2, 'KR': 2,
    'Other': 6
  },
  devices: {
    'Desktop': 52,
    'Mobile': 43,
    'Tablet': 4,
    'Smart TV': 0.6,
    'Console': 0.3,
    'Wearable': 0.1
  },
  browsers: {
    'Chrome': 65,
    'Safari': 19,
    'Firefox': 8,
    'Edge': 7,
    'Opera': 1
  },
  os: {
    'Windows': 35,
    'Android': 32,
    'iOS': 20,
    'macOS': 10,
    'Linux': 3
  },
  device_vendors: {
    'Apple': 45,
    'Samsung': 25,
    'Microsoft': 12,
    'Dell': 8,
    'Lenovo': 6,
    'Other': 4
  },
  referers: {
    '(direct)': 30,
    'google': 25,
    'twitter': 15,
    'linkedin': 12,
    'github': 8,
    'bing': 4,
    'reddit': 3,
    'hackernews': 3
  },
  referer_urls: {
    '(direct)': 30,
    'https://google.com': 25,
    'https://twitter.com': 15,
    'https://linkedin.com': 12,
    'https://github.com': 8,
    'https://bing.com': 4,
    'https://reddit.com': 3,
    'https://news.ycombinator.com': 3
  },
  engines: {
    'Blink': 65,
    'WebKit': 19,
    'Gecko': 16
  },
  cpu_architectures: {
    'x64': 75,
    'arm64': 15,
    'x86': 10
  },
  bot_ratio: {
    true: 5,   // 5% chance of being a bot
    false: 95
  },
  qr_ratio: {
    true: 8,   // 8% chance of being a QR code scan
    false: 92
  },
  link_popularity: {
    'high': 50,    // 50% of traffic goes to top links
    'medium': 30,  // 30% of traffic goes to medium popularity links
    'low': 20      // 20% of traffic goes to low popularity links
  }
};

// Helper function for weighted random selection
const weightedRandom = (weights) => {
  const sum = Object.values(weights).reduce((a, b) => a + b, 0);
  let random = Math.random() * sum;
  
  for (const [item, weight] of Object.entries(weights)) {
    random -= weight;
    if (random <= 0) return item;
  }
  return Object.keys(weights)[0];
};

const generateLinkPool = (linkCount = 3) => {
  const links = urlData
    .slice(0, Math.min(linkCount, urlData.length))
    .map((data, index) => {
      const link_id = faker.string.uuid();
      const metadata = generateLinkMetadata(data.url, data.timestamp, link_id);
      
      // Assign popularity tier based on index
      let popularity;
      const percentile = Math.floor((index / linkCount) * 100);
      if (percentile < 20) popularity = 'high';
      else if (percentile < 50) popularity = 'medium';
      else popularity = 'low';
      
      return {
        ...metadata,
        popularity
      };
    });

  return links;
};

// Define a map of countries and their major cities
const LOCATIONS = [
  // Africa (AF)
  {
    country: 'ZA',
    continent: 'AF',
    weight: 3,
    cities: [
      { name: 'Cape Town', region: 'AF-WC', latitude: '-33.9249', longitude: '18.4241', weight: 1 },
      { name: 'Johannesburg', region: 'AF-GT', latitude: '-26.2041', longitude: '28.0473', weight: 1 },
      { name: 'Durban', region: 'AF-KZN', latitude: '-29.8587', longitude: '31.0218', weight: 1 }
    ]
  },
  {
    country: 'NG',
    continent: 'AF',
    weight: 3,
    cities: [
      { name: 'Lagos', region: 'AF-LA', latitude: '6.5244', longitude: '3.3792', weight: 1 },
      { name: 'Abuja', region: 'AF-FC', latitude: '9.0765', longitude: '7.3986', weight: 1 },
      { name: 'Kano', region: 'AF-KN', latitude: '12.0022', longitude: '8.5920', weight: 1 }
    ]
  },
  // Asia (AS)
  {
    country: 'JP',
    continent: 'AS',
    weight: 20,
    cities: [
      { name: 'Tokyo', region: 'AS-TK', latitude: '35.6762', longitude: '139.6503', weight: 1 },
      { name: 'Osaka', region: 'AS-OS', latitude: '34.6937', longitude: '135.5023', weight: 1 },
      { name: 'Yokohama', region: 'AS-KN', latitude: '35.4437', longitude: '139.6380', weight: 1 }
    ]
  },
  {
    country: 'SG',
    continent: 'AS',
    weight: 2,
    cities: [
      { name: 'Singapore', region: 'AS-SG', latitude: '1.3521', longitude: '103.8198', weight: 1 }
    ]
  },
  // Europe (EU)
  {
    country: 'GB',
    continent: 'EU',
    weight: 12,
    cities: [
      { name: 'London', region: 'EU-ENG', latitude: '51.5074', longitude: '-0.1278', weight: 60 },
      { name: 'Manchester', region: 'EU-ENG', latitude: '53.4808', longitude: '-2.2426', weight: 25 },
      { name: 'Birmingham', region: 'EU-ENG', latitude: '52.4862', longitude: '-1.8904', weight: 15 }
    ]
  },
  // North America (NA)
  {
    country: 'US',
    continent: 'NA',
    weight: 30,
    cities: [
      { name: 'New York', region: 'NA-NY', latitude: '40.7128', longitude: '-74.0060', weight: 35 },
      { name: 'Los Angeles', region: 'NA-CA', latitude: '34.0522', longitude: '-118.2437', weight: 20 },
      { name: 'Chicago', region: 'NA-IL', latitude: '41.8781', longitude: '-87.6298', weight: 20 },
      { name: 'San Francisco', region: 'NA-CA', latitude: '37.7749', longitude: '-122.4194', weight: 25 }
    ]
  },
  // Oceania (OC)
  {
    country: 'AU',
    continent: 'OC',
    weight: 4,
    cities: [
      { name: 'Sydney', region: 'OC-NSW', latitude: '-33.8688', longitude: '151.2093', weight: 1 },
      { name: 'Melbourne', region: 'OC-VIC', latitude: '-37.8136', longitude: '144.9631', weight: 1 },
      { name: 'Brisbane', region: 'OC-QLD', latitude: '-27.4698', longitude: '153.0251', weight: 1 }
    ]
  },
  // South America (SA)
  {
    country: 'BR',
    continent: 'SA',
    weight: 4,
    cities: [
      { name: 'São Paulo', region: 'SA-SP', latitude: '-23.5505', longitude: '-46.6333', weight: 1 },
      { name: 'Rio de Janeiro', region: 'SA-RJ', latitude: '-22.9068', longitude: '-43.1729', weight: 1 },
      { name: 'Brasília', region: 'SA-DF', latitude: '-15.7975', longitude: '-47.8919', weight: 1 }
    ]
  }
];

const generateLocation = () => {
  const location = weightedRandom(LOCATIONS.reduce((acc, loc) => {
    acc[loc.country] = loc.weight;
    return acc;
  }, {}));
  
  const selectedLocation = LOCATIONS.find(loc => loc.country === location);
  const city = weightedRandom(selectedLocation.cities.reduce((acc, city) => {
    acc[city.name] = city.weight;
    return acc;
  }, {}));
  
  const selectedCity = selectedLocation.cities.find(c => c.name === city);
  
  return {
    country: selectedLocation.country,
    continent: selectedLocation.continent,
    city: selectedCity.name,
    region: selectedCity.region,
    latitude: selectedCity.latitude,
    longitude: selectedCity.longitude
  };
};

const SALE_EVENT_NAMES = [
  'subscription_created',
  'subscription_renewed',
  'one_time_purchase'
];

const PAYMENT_PROCESSORS = [
  'stripe',
  'paypal',
  'wise',
  'bank_transfer'
];

const CURRENCIES = [
  'USD',
  'EUR',
  'GBP'
];

const PRICE_TIERS = {
  'subscription_created': [2900, 4900, 9900, 29900],
  'subscription_renewed': [2900, 4900, 9900, 29900],
  'one_time_purchase': [49900, 99900, 199900]
};

const LEAD_EVENT_NAMES = [
  'form_submitted',
  'signup_completed',
  'contact_requested',
  'demo_requested',
  'newsletter_subscribed'
];

const generateClickWithExistingMetadata = () => {
  // First select popularity tier
  const popularityTier = weightedRandom(TRAFFIC_WEIGHTS.link_popularity);
  
  // Filter metadata by popularity tier and select one
  const tierMetadata = generatedMetadata.filter(m => m.popularity === popularityTier);
  const metadata = faker.helpers.arrayElement(tierMetadata);
  
  const location = generateLocation();
  const device = weightedRandom(TRAFFIC_WEIGHTS.devices);
  const browser = weightedRandom(TRAFFIC_WEIGHTS.browsers);
  const os = weightedRandom(TRAFFIC_WEIGHTS.os);
  const deviceVendor = weightedRandom(TRAFFIC_WEIGHTS.device_vendors);
  const referer = weightedRandom(TRAFFIC_WEIGHTS.referers);
  const refererUrl = weightedRandom(TRAFFIC_WEIGHTS.referer_urls);
  const engine = weightedRandom(TRAFFIC_WEIGHTS.engines);
  const cpuArchitecture = weightedRandom(TRAFFIC_WEIGHTS.cpu_architectures);
  const isBot = weightedRandom(TRAFFIC_WEIGHTS.bot_ratio) === 'true';
  const isQr = weightedRandom(TRAFFIC_WEIGHTS.qr_ratio) === 'true';
  
  // Generate timestamp after metadata's timestamp with decay pattern
  const metadataDate = new Date(metadata.timestamp);
  const now = new Date();
  const sixMonthsAgo = new Date(now);
  sixMonthsAgo.setMonth(now.getMonth() - 6);
  
  // Use the later of metadata date or six months ago
  const startDate = new Date(Math.max(metadataDate.getTime(), sixMonthsAgo.getTime()));
  const monthsSincePublication = (now - startDate) / (30 * 24 * 60 * 60 * 1000);
  const decayFactor = Math.exp(-0.3 * monthsSincePublication);
  
  let timestamp;
  do {
    const randomDelay = Math.random() * (now - startDate);
    timestamp = new Date(startDate.getTime() + randomDelay);
    
    const isWeekend = timestamp.getDay() === 0 || timestamp.getDay() === 6;
    const dateStr = timestamp.toISOString().split('T')[0];
    const hour = timestamp.getHours();
    
    const hourlyPattern = isWeekend ? 
      trafficPatterns.hourly.weekend[hour] : 
      trafficPatterns.hourly.business[hour];
    
    let probability = hourlyPattern * trafficPatterns.weekday[timestamp.getDay()] * decayFactor;
    
    if (trafficPatterns.special[dateStr]) {
      probability *= trafficPatterns.special[dateStr];
    }
    
    if (Math.random() < probability) {
      break;
    }
  } while (true);

  return {
    timestamp: timestamp.toISOString().replace('T', ' ').replace('Z', '').split('.')[0],
    click_id: faker.string.uuid(),
    link_id: metadata.link_id,
    alias_link_id: faker.string.uuid(),
    url: metadata.url,
    country: location.country,
    city: location.city,
    region: location.region,
    latitude: location.latitude,
    longitude: location.longitude,
    continent: location.continent,
    device,
    device_model: `${deviceVendor} ${faker.helpers.arrayElement(['Pro', 'Air', 'Plus', 'Ultra', 'Standard'])}`,
    device_vendor: deviceVendor,
    browser,
    browser_version: `${faker.number.int({ min: 70, max: 120 })}.0.0.0`,
    os,
    os_version: faker.system.semver(),
    engine,
    engine_version: `${faker.number.int({ min: 70, max: 120 })}.0.0.0`,
    cpu_architecture: cpuArchitecture,
    ua: faker.internet.userAgent(),
    bot: isBot ? 1 : 0,
    referer,
    referer_url: refererUrl,
    user_id: faker.helpers.maybe(() => faker.number.int({ min: 1000, max: 999999 })),
    identity_hash: faker.helpers.maybe(() => faker.string.uuid()),
    ip: faker.internet.ip(),
    qr: isQr ? 1 : 0,
    continent: location.continent
  };
};

// Keep existing generateLeadEvent but modify timestamp generation
const generateLeadEvent = (clickEvent) => {
  const clickTimestamp = new Date(clickEvent.timestamp);
  const maxDelay = 24 * 60 * 60 * 1000; // 24 hours
  const delay = Math.random() * maxDelay;
  const timestamp = new Date(clickTimestamp.getTime() + delay);
  
  return {
    timestamp: timestamp.toISOString(),
    event_id: faker.string.uuid(),
    event_name: faker.helpers.arrayElement(LEAD_EVENT_NAMES),
    customer_id: faker.string.uuid(),
    click_id: clickEvent.click_id,
    link_id: clickEvent.link_id,
    url: clickEvent.url,
    continent: clickEvent.continent,
    country: clickEvent.country,
    city: clickEvent.city,
    region: clickEvent.region,
    latitude: clickEvent.latitude,
    longitude: clickEvent.longitude,
    device: clickEvent.device,
    device_model: clickEvent.device_model,
    device_vendor: clickEvent.device_vendor,
    browser: clickEvent.browser,
    browser_version: clickEvent.browser_version,
    os: clickEvent.os,
    os_version: clickEvent.os_version,
    engine: clickEvent.engine,
    engine_version: clickEvent.engine_version,
    cpu_architecture: clickEvent.cpu_architecture,
    ua: clickEvent.ua,
    bot: clickEvent.bot,
    referer: clickEvent.referer,
    referer_url: clickEvent.referer_url,
    ip: clickEvent.ip,
    qr: clickEvent.qr,
    metadata: JSON.stringify({
      form_data: {
        company: faker.company.name(),
        job_title: faker.person.jobTitle(),
        industry: faker.company.buzzNoun(),
        employees: faker.helpers.arrayElement(['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+']),
        country: clickEvent.country
      }
    })
  };
};

// Keep existing generateSaleEvent but modify timestamp generation
const generateSaleEvent = (clickEvent) => {
  const clickTimestamp = new Date(clickEvent.timestamp);
  const maxDelay = 48 * 60 * 60 * 1000; // 48 hours
  const delay = Math.random() * maxDelay;
  const timestamp = new Date(clickTimestamp.getTime() + delay);
  
  const event_name = faker.helpers.arrayElement(SALE_EVENT_NAMES);
  
  return {
    timestamp: timestamp.toISOString(),
    event_id: faker.string.uuid(),
    event_name,
    customer_id: faker.string.uuid(),
    payment_processor: faker.helpers.arrayElement(PAYMENT_PROCESSORS),
    invoice_id: `INV-${faker.string.alphanumeric(8).toUpperCase()}`,
    amount: faker.helpers.arrayElement(PRICE_TIERS[event_name]),
    currency: faker.helpers.arrayElement(CURRENCIES),
    click_id: clickEvent.click_id,
    link_id: clickEvent.link_id,
    url: clickEvent.url,
    continent: clickEvent.continent,
    country: clickEvent.country,
    city: clickEvent.city,
    region: clickEvent.region,
    latitude: clickEvent.latitude,
    longitude: clickEvent.longitude,
    device: clickEvent.device,
    device_model: clickEvent.device_model,
    device_vendor: clickEvent.device_vendor,
    browser: clickEvent.browser,
    browser_version: clickEvent.browser_version,
    os: clickEvent.os,
    os_version: clickEvent.os_version,
    engine: clickEvent.engine,
    engine_version: clickEvent.engine_version,
    cpu_architecture: clickEvent.cpu_architecture,
    ua: clickEvent.ua,
    bot: clickEvent.bot,
    referer: clickEvent.referer,
    referer_url: clickEvent.referer_url,
    ip: clickEvent.ip,
    qr: clickEvent.qr,
    metadata: JSON.stringify({
      subscription_tier: faker.helpers.arrayElement(['hobby', 'pro', 'enterprise']),
      payment_method: faker.helpers.arrayElement(['credit_card', 'debit_card', 'bank_account']),
      billing_interval: faker.helpers.arrayElement(['monthly', 'yearly']),
      is_trial: faker.datatype.boolean(),
      customer_segment: faker.helpers.arrayElement(['smb', 'mid-market', 'enterprise'])
    })
  };
};

function generateSeedSql(links) {
    let sqlContent = [
        '-- Link seed data',
        'Truncate table Link;',
        'INSERT INTO Link (id, domain, `key`, url, shortLink, archived, trackConversion, proxy, rewrite, doIndex, publicStats, clicks, createdAt, updatedAt, projectId, programId)',
        'VALUES'
    ].join('\n') + '\n';

    const values = links.map((link, i) => {
        const workspaceId = link.workspace_id.replace('ws_', ''); // Remove ws_ prefix
        const archived = link.deleted === 1 ? 'true' : 'false';
        
        const rowValues = [
            `'${link.link_id}'`,                    // id
            `'${link.domain}'`,                     // domain
            `'${link.key}'`,                        // key
            `'${link.url}'`,                        // url
            `'${link.domain}/${link.key}'`,         // shortLink
            archived,                               // archived
            'false',                                // trackConversion
            'false',                                // proxy
            'false',                                // rewrite
            'false',                                // doIndex
            'true',                                 // publicStats
            '0',                                    // clicks
            `'${link.timestamp}'`,                  // createdAt
            `'${link.timestamp}'`,                  // updatedAt
            `'${workspaceId}'`,                     // projectId
            `'${link.program_id}'`                  // programId
        ];
        
        return `(${rowValues.join(', ')})${i < links.length - 1 ? ',' : ';'}`;
    }).join('\n');

    sqlContent += values;

    // Write to file
    fs.writeFileSync('seed.sql', sqlContent);
}

// Store the generated metadata globally so it can be reused
let generatedMetadata = [];

const generateEvents = (eventCount = 10, linkCount = 3, leadConversionRate = 0.1, saleConversionRate = 0.05) => {
  // Only generate metadata if it hasn't been generated yet
  if (generatedMetadata.length === 0) {
    const linkPool = generateLinkPool(linkCount);
    generatedMetadata = linkPool;
    if (eventCount === 0) {
      return { metadata: generatedMetadata };
    }
  }

  const clicks = Array.from({ length: eventCount }, () => {
    // First select popularity tier
    const popularityTier = weightedRandom(TRAFFIC_WEIGHTS.link_popularity);
    
    // Filter metadata by popularity tier
    const tierMetadata = generatedMetadata.filter(m => m.popularity === popularityTier);
    if (tierMetadata.length === 0) {
      // Fallback to random selection if no links in this tier
      return generateClickWithExistingMetadata();
    }
    
    return generateClickWithExistingMetadata(faker.helpers.arrayElement(tierMetadata));
  });

  // Generate leads and sales using the clicks
  const leads = clicks
    .filter(() => Math.random() < leadConversionRate)
    .map(click => generateLeadEvent(click));

  const sales = clicks
    .filter(() => Math.random() < saleConversionRate)
    .map(click => generateSaleEvent(click));

  generateSeedSql(generatedMetadata);

  // Sort all events by timestamp
  return {
    clicks: clicks.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)),
    leads: leads.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)),
    sales: sales.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
  };
};

// Export using ES modules syntax
export {
  generateEvents
};