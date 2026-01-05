import { GetBaseURL } from "./BaseAPI";

export async function fetchInstitutes({ page = 1, search = "", city = "" }) {
  try {
    const params = new URLSearchParams();

    params.set("page", page.toString());
    params.set("limit", "10");

    if (search) params.set("search", search);
    if (city) params.set("city", city);

    const res = await fetch(
      `${GetBaseURL()}/get-institutes?${params.toString()}`
    );
    const response = await res.json();
    return response;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function fetchInstituteById(id: string | number) {
  try {
    const res = await fetch(`${GetBaseURL()}/institutes/${id}`, {
      cache: "no-store",
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch institute: ${res.status}`);
    }
    
    const response = await res.json();
    return response;
  } catch (error) {
    console.error("Error fetching institute:", error);
    throw error;
  }
}
