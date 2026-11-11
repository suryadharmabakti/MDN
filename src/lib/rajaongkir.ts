/**
 * RajaOngkir (Komerce) client. Import only from server code (API routes / server actions):
 * the API key must never reach the browser.
 * Docs: https://rajaongkir.com/docs/shipping-cost
 */
const BASE_URL = (process.env.RAJAONGKIR_BASE_URL || "https://rajaongkir.komerce.id/api/v1").replace(/\/+$/, "");

/** Couriers offered at checkout (RajaOngkir courier codes), overridable via RAJAONGKIR_COURIERS="jne:jnt:pos". */
export const COURIERS = (process.env.RAJAONGKIR_COURIERS || "jne:jnt:sicepat:pos")
  .split(/[:,\s]+/)
  .map((c) => c.trim().toLowerCase())
  .filter(Boolean);

/** Fallback weight per unit when a product's `berat` field cannot be parsed. */
const DEFAULT_WEIGHT_GRAMS = Number(process.env.RAJAONGKIR_DEFAULT_WEIGHT_GRAMS) || 1000;

export class RajaOngkirError extends Error {
  constructor(message: string, public status = 502) {
    super(message);
  }
}

export interface Destination {
  id: number;
  label: string;
  zipCode: string;
}

export interface ShippingOption {
  courier: string; // e.g. "jne"
  courierName: string; // e.g. "Jalur Nugraha Ekakurir (JNE)"
  service: string; // e.g. "REG"
  description: string;
  cost: number; // rupiah
  etd: string; // e.g. "2-3 day"
}

function apiKey() {
  const key = process.env.RAJAONGKIR_API_KEY;
  if (!key) throw new RajaOngkirError("RAJAONGKIR_API_KEY belum diatur di .env", 503);
  return key;
}

export function originId() {
  const id = Number(process.env.RAJAONGKIR_ORIGIN_ID);
  if (!id) throw new RajaOngkirError("RAJAONGKIR_ORIGIN_ID belum diatur di .env", 503);
  return id;
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${BASE_URL}/${path}`, {
    ...init,
    headers: { key: apiKey(), Accept: "application/json", ...(init.headers || {}) },
    cache: "no-store",
  });
  const json = await res.json().catch(() => null);
  if (!res.ok || !json) {
    const message = json?.meta?.message || `RajaOngkir error (${res.status})`;
    throw new RajaOngkirError(message, res.status === 404 ? 404 : 502);
  }
  return json.data as T;
}

/** Search kelurahan/kecamatan/kota by free text, e.g. "cempaka putih". */
export async function searchDestinations(search: string, limit = 10): Promise<Destination[]> {
  const params = new URLSearchParams({ search, limit: String(limit), offset: "0" });
  type Raw = { id: number; label: string; zip_code?: string };
  const data = await request<Raw[]>(`destination/domestic-destination?${params}`);
  return (data || []).map((d) => ({ id: d.id, label: d.label, zipCode: d.zip_code || "" }));
}

/** Get shipping options for all configured couriers. Weight is in grams. */
export async function calculateCost(destination: number, weightGrams: number): Promise<ShippingOption[]> {
  const body = new URLSearchParams({
    origin: String(originId()),
    destination: String(destination),
    weight: String(Math.max(1, Math.ceil(weightGrams))),
    courier: COURIERS.join(":"),
    price: "lowest",
  });
  type Raw = { name: string; code: string; service: string; description: string; cost: number; etd: string };
  const data = await request<Raw[]>("calculate/domestic-cost", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  return (data || [])
    .filter((o) => Number(o.cost) > 0)
    .map((o) => ({
      courier: o.code,
      courierName: o.name,
      service: o.service,
      description: o.description,
      cost: Number(o.cost),
      etd: o.etd || "",
    }))
    .sort((a, b) => a.cost - b.cost);
}

/** Track a shipment by airway bill (resi) once the order has been shipped. */
export async function trackWaybill(awb: string, courier: string) {
  const body = new URLSearchParams({ awb, courier });
  return request<unknown>("track/waybill", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
}

/**
 * Parse the free-text `berat` product field into grams.
 * Examples: "92 kg (bersih)" -> 92000, "1,5 kg" -> 1500, "800 g" -> 800.
 */
export function parseWeightGrams(berat: string | null | undefined): number {
  const match = (berat || "").toLowerCase().match(/(\d+(?:[.,]\d+)?)\s*(kg|kilo|gram|gr|g)\b/);
  if (!match) return DEFAULT_WEIGHT_GRAMS;
  const value = parseFloat(match[1].replace(",", "."));
  if (!value) return DEFAULT_WEIGHT_GRAMS;
  return match[2].startsWith("k") ? Math.round(value * 1000) : Math.round(value);
}
