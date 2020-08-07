# URL Shortener Service

API to create short URLs using Node, Express and MongoDB

## Setup

Copy the env example and complete the Mongo URI and Base URL for your application

```
cp .env.example .env
```

## Install dependencies

```bash
npm install
```

## Run the service

```
npm start
```

## Endpoint to create short url

**POST** to `api/url/shorten` with the following payload

```json
{
  "longUrl": "xxxx"
}
```
