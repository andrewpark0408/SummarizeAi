import { getAuthToken } from "./get-token";
import { getStrapiURL } from "@/lib/utils";
import qs from "qs";

const query = qs.stringify({
  populate: { image: { fields: ["url", "alternativeText"] } },
});

export async function getUserMeLoader() {
  const baseUrl = getStrapiURL();
  console.log('Base URL: ', baseUrl);

  const url = new URL("/api/users/me", baseUrl);
  url.search = query;
  console.log('Full URL: ', url.href);

  const authToken = await getAuthToken();
  console.log('Auth token: ', authToken);
  if (!authToken) return { ok: false, data: null, error: null };

  try {
    const response = await fetch(url.href, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      cache: "no-cache",
    });
    console.log('Response status: ', response.status);
    const data = await response.json();
    console.log('Response data: ', data);
    if (data.error) return { ok: false, data: null, error: data.error };
    return { ok: true, data: data, error: null };
  } catch (error) {
    console.error('Error occurred: ', error);
    return { ok: false, data: null, error: error };
  }
}