# Vercel PDF Generator

## How to use the api using curl

```sh
curl -X POST https://pdf-generator-stable.vercel.app/api/pdfGenerator \
-H "Content-Type: application/json" \
-d '{"payload": "<h1>PDF Content</h1>"}' \
--output my-pdf.pdf
```

## How to use the api using fetch

```js
try {
  const htmlContent = `<h1>PDF Content</h1>`;
  const response = await fetch("https://pdf-generator-stable.vercel.app/api/pdfGenerator", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      payload: htmlContent,
    }),
  });
  if (!response.ok) {
    throw await response.json();
  }

  return response.buffer();
} catch (err) {
  throw new Error(err.error || err.message);
}
```

## Please login into vercel account locally, if not login

```sh
npm install -g vercel
```

```sh
vercel login
```

## Install Dependencies

```sh
yarn install
```

## For Development

- In Local Development,

```sh
vercel dev
```

- In Production testing,

```sh
vercel
```

## Vercel Production Deployment

```sh
vercel --prod
```
