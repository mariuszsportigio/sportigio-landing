# Cloudflare endpoint dla newslettera

To instrukcja uruchomienia Cloudflare Workera, który przyjmuje zapisy do
newslettera i przekazuje je do MailerLite. Landing page będzie wołał Workera
zamiast `/api/subscribe`.

## 1) Dodaj domenę do Cloudflare

- Dodaj `sprtg.pl` do Cloudflare.
- Ustaw DNS na nameserwery Cloudflare.
- Poczekaj na propagację.

## 2) Utwórz Workera

- Cloudflare dashboard -> Workers & Pages -> Create -> Worker.
- Nazwij go (np. `newsletter-subscribe`).
- Wklej kod z `cloudflare/newsletter-worker.js`.

## 3) Skonfiguruj zmienne środowiskowe Workera

Dodaj te zmienne (Workers -> Settings -> Variables):

- `MAILERLITE_API_KEY` = klucz API MailerLite
- `MAILERLITE_GROUP_ID_NEWSLETTER` = ID grupy newslettera w MailerLite
- `ALLOWED_ORIGIN` = `https://landing.sportigio.com`

`ALLOWED_ORIGIN` służy do CORS. Gdy zmienisz domenę landingu, zaktualizuj ją.

## 4) Dodaj route

Workers -> Triggers -> Routes:

- Route: `sprtg.pl/newsletter-subscribe*`
- Worker: wybrany Worker

Po tym `https://sprtg.pl/newsletter-subscribe` będzie endpointem zapisu.

## 5) Ustaw endpoint we frontendzie

Ustaw publiczną zmienną środowiskową dla Astro:

```
PUBLIC_NEWSLETTER_ENDPOINT=https://sprtg.pl/newsletter-subscribe
```

Jeśli nie ustawisz env w deployu, kod i tak ma fallback do
`https://sprtg.pl/newsletter-subscribe`.
