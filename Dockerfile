FROM node:18

WORKDIR /app
ENV PORT=8080
ENV HOST=0.0.0.0

COPY . .
RUN npm install


ENV MODEL_URL_1=https://storage.googleapis.com/mlgc-sub-ridwan/model.json
EXPOSE 8080
CMD [ "npm", "run", "start"]