RUNNING_SERVICE_FILE="running_service"
BLUE_SERVICE="frontend_blue"
BLUE_SERVICE_PORT=5000
GREEN_SERVICE="frontend_green"
GREEN_SERVICE_PORT=5001

if [ -f "$RUNNING_SERVICE_FILE" ]; then
    ACTIVE_SERVICE=$(cat "$RUNNING_SERVICE_FILE")
    if [ "$ACTIVE_SERVICE" == "$BLUE_SERVICE" ]; then
        INACTIVE_SERVICE=$GREEN_SERVICE
    else
        INACTIVE_SERVICE=$BLUE_SERVICE
    fi
else
  ACTIVE_SERVICE=""
  INACTIVE_SERVICE=$BLUE_SERVICE
fi

# Updating Nginx config to $INACTIVE_SERVICE
cp ./$INACTIVE_SERVICE.conf ./proxy.conf
docker compose -f compose.app.yaml --env-file .env exec proxy nginx -s reload

# Updating the running_service file
echo $INACTIVE_SERVICE > $RUNNING_SERVICE_FILE

# Removing old $ACTIVE_SERVICE container
docker compose -f compose.app.yaml --env-file .env stop $ACTIVE_SERVICE
docker compose -f compose.app.yaml --env-file .env rm -f $ACTIVE_SERVICE

docker image prune -a -f