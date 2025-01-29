Build a real-time dashboard in Python using Tinybird and Dash. To learn more about this implementation, check out the [blog post](https://www.tinybird.co/blog-posts/python-real-time-dashboard).

## Prerequisites

- Python > v3.8
- Node.js > v18 (to use the [Mockingbird CLI](https://github.com/tinybirdco/mockingbird))

## Set up the project

```
python -mvenv .e
. .e/bin/activate
echo ".e*" >> .gitignore
pip install requirements.txt
pip install tinybird-cli  # to work with Tinybird
```

## Deploy the project

Fork and deploy the project to Tinybird. Alternatively, use the tinybird-cli to push to a Workspace or use Tinybird Local.

## Append sample data

```
npm install -G @tinybirdco/mockingbird-cli
echo "node_modules" >> .gitignore

export TINYBIRD_HOST=https://api.tinybird.co  # or use your Tinybird region host
export TINYBIRD_TOKEN=<your_user_admin_token>  # https://app.tinybird.co/tokens
mockingbird-cli tinybird \
--template "Flight Bookings" \
--eps 10  \
--endpoint=$TINYBIRD_HOST \
--datasource=flight_bookings \
--token=$TINYBIRD_TOKEN
```

## Run the dashboard

```
python app.py
```

Open http://127.0.0.1:8050/ to view your real-time dashboard
