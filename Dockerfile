FROM node:20

WORKDIR /app

COPY ./backend .

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
