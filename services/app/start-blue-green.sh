RUNNING_SERVICE_FILE="running_service"
BLUE_SERVICE="frontend_blue"
BLUE_SERVICE_PORT=5000
GREEN_SERVICE="frontend_green"
GREEN_SERVICE_PORT=5001

if [ -f "$RUNNING_SERVICE_FILE" ]; then
  ACTIVE_SERVICE=$(cat $RUNNING_SERVICE_FILE)
  if [ "$ACTIVE_SERVICE" == "$BLUE_SERVICE" ]; then
    INACTIVE_SERVICE=$GREEN_SERVICE
  else
    INACTIVE_SERVICE=$BLUE_SERVICE
  fi
else
  ACTIVE_SERVICE=""
  INACTIVE_SERVICE=$BLUE_SERVICE
fi

# Updating backend container
docker compose -f compose.app.yaml --env-file .env pull backend
docker compose -f compose.app.yaml --env-file .env stop backend
docker compose -f compose.app.yaml --env-file .env up -d backend

# Starting $INACTIVE_SERVICE container
docker compose -f compose.app.yaml --env-file .env pull $INACTIVE_SERVICE
docker compose -f compose.app.yaml --env-file .env up -d $INACTIVE_SERVICE

# Returning the port of the inactive service
if [ "$INACTIVE_SERVICE" == "$BLUE_SERVICE" ]; then
    echo $BLUE_SERVICE_PORT
else
    echo $GREEN_SERVICE_PORT
fi