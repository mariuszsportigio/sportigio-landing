export const prerender = false;

import type { APIRoute } from "astro";

type SubscribeRequestBody = {
    email?: string;
};

const MAILERLITE_API_URL = "https://connect.mailerlite.com/api/subscribers";

export const POST: APIRoute = async ({ request }) => {
    try {
        const apiKey = import.meta.env.MAILERLITE_API_KEY as string | undefined;
        const groupId = import.meta.env
            .MAILERLITE_GROUP_ID_NEWSLETTER as string | undefined;

        if (!apiKey) {
            return new Response(
                JSON.stringify({ error: "Missing MAILERLITE_API_KEY server env" }),
                { status: 500, headers: { "content-type": "application/json" } }
            );
        }
        if (!groupId) {
            return new Response(
                JSON.stringify({
                    error: "Missing MAILERLITE_GROUP_ID_NEWSLETTER server env",
                }),
                { status: 500, headers: { "content-type": "application/json" } }
            );
        }

        const body = (await request.json()) as SubscribeRequestBody;
        const email = (body?.email || "").trim().toLowerCase();

        // Basic email sanity check
        const emailOk = /.+@.+\..+/.test(email);
        if (!emailOk) {
            return new Response(
                JSON.stringify({ error: "Invalid email" }),
                { status: 400, headers: { "content-type": "application/json" } }
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
            return new Response(
                JSON.stringify({ success: true }),
                { status: 200, headers: { "content-type": "application/json" } }
            );
        }

        // Attempt to forward error payload for easier debugging
        let detail: unknown = undefined;
        try {
            detail = await mlRes.json();
        } catch { }

        return new Response(
            JSON.stringify({
                error: "MailerLite error",
                status: mlRes.status,
                detail,
            }),
            { status: 502, headers: { "content-type": "application/json" } }
        );
    } catch (err) {
        return new Response(
            JSON.stringify({ error: "Server error" }),
            { status: 500, headers: { "content-type": "application/json" } }
        );
    }
};


