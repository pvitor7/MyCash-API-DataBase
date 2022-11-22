FROM node:16.15.1

ENV PORT=3000

EXPOSE 3000

WORKDIR /app

COPY 'package.json' .

RUN yarn 

COPY . .

CMD ["yarn", "dev"]

# RUN yarn typeorm migration:create src/migrations/initialMigration

# RUN yarn typeorm migration:generate src/migrations/initialMigration -d src/data-source.ts

# RUN yarn typeorm migration:run -d src/data-source.ts




