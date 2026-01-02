import { GetMyURL } from "./BaseAPI";

export async function fetchAdmissionDetails({
  page = 1,
  search = "",
  city = "",
  field = "",
}) {
  try {
    const params = new URLSearchParams();

    params.set("page", page.toString());
    params.set("limit", "7");

    if (search) params.set("search", search);
    if (city) params.set("city", city);
    if (field) params.set("field", field);

    const res = await fetch(`${GetMyURL()}/admissions?${params.toString()}`);

    return await res.json();
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function fetchAdmissionById(id) {
  try {
    const res = await fetch(`${GetMyURL()}/admissions/${id}`);
    return await res.json();
  } catch (error) {
    console.error("Error:", error);
  }
}
