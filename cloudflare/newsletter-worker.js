const MAILERLITE_API_URL = "https://connect.mailerlite.com/api/subscribers";

const json = (data, status = 200, headers = {}) =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json",
      ...headers,
    },
  });

const withCors = (headers, origin) => ({
  ...headers,
  "access-control-allow-origin": origin,
  "access-control-allow-methods": "POST, OPTIONS",
  "access-control-allow-headers": "Content-Type",
  "access-control-max-age": "86400",
  vary: "Origin",
});

export default {
  async fetch(request, env) {
    const allowedOrigin =
      env.ALLOWED_ORIGIN || "https://landing.sportigio.com";
    const origin = request.headers.get("origin");
    const corsOrigin = origin && origin === allowedOrigin ? origin : allowedOrigin;

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: withCors({}, corsOrigin) });
    }

    if (request.method !== "POST") {
      return json(
        { error: "Method not allowed" },
        405,
        withCors({}, corsOrigin),
      );
    }

    const apiKey = env.MAILERLITE_API_KEY;
    const groupId = env.MAILERLITE_GROUP_ID_NEWSLETTER;
    if (!apiKey || !groupId) {
      return json(
        { error: "Missing MailerLite configuration" },
        500,
        withCors({}, corsOrigin),
      );
    }

    let payload = null;
    try {
      payload = await request.json();
    } catch {
      return json(
        { error: "Invalid JSON body" },
        400,
        withCors({}, corsOrigin),
      );
    }

    const email = String(payload?.email || "")
      .trim()
      .toLowerCase();
    if (!/.+@.+\..+/.test(email)) {
      return json(
        { error: "Invalid email" },
        400,
        withCors({}, corsOrigin),
      );
    }

    const mlRes = await fetch(MAILERLITE_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email,
        groups: [groupId],
      }),
    });

    if (mlRes.status === 200 || mlRes.status === 201) {
      return json({ success: true }, 200, withCors({}, corsOrigin));
    }

    let detail = null;
    try {
      detail = await mlRes.json();
    } catch {}

    return json(
      {
        error: "MailerLite error",
        status: mlRes.status,
        detail,
      },
      502,
      withCors({}, corsOrigin),
    );
  },
};
