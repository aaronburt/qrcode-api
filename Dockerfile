FROM node:18 as Builder
WORKDIR /app

COPY . .

RUN npm install

# Build the deployment apline container
FROM alpine
# Install requirements for the application to run
RUN apk add --update nodejs
#RUN apk add nano
WORKDIR /app
# Extract the contents of builder
COPY --from=Builder /app /app

# Expose access to port 8080 for index.js
EXPOSE 8080

# Run index.js
CMD [ "node", "./dist/index.js" ]