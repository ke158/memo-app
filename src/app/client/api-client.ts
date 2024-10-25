const baseURL = process.env.NEXT_PUBLIC_BASE_API_URL ?? "";

const apiClient = {
  get: async <T>(url: string): Promise<T> => {
    const res = await fetch(`${baseURL}${url}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.json();
  },
  post: async <T, U>(url: string, body: U): Promise<T> => {
    const res = await fetch(`${baseURL}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return res.json();
  },
  put: async <T, U>(url: string, body: U): Promise<T> => {
    const res = await fetch(`${baseURL}${url}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return res.json();
  },
  delete: async <T>(url: string): Promise<T> => {
    const res = await fetch(`${baseURL}${url}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.json();
  },
};

export default apiClient;
