FROM node:18

WORKDIR /app
ENV PORT=8080
ENV HOST=0.0.0.0

COPY . .
RUN npm install


ENV MODEL_URL_1=https://storage.googleapis.com/plantscan-model/grape-model/model.json
ENV MODEL_URL_1=https://storage.googleapis.com/plantscan-model/tomato-model/model.json
EXPOSE 8080
CMD [ "npm", "run", "start"]