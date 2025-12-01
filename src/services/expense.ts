import { API_URL, handleResponse } from "./api";

export interface Expense {
  id: number;
  description: string;
  amount: number;
  date: string;
  userId: number;
}

export interface CreateExpenseDTO {
  description: string;
  amount: number;
  date: string;
}

export interface UpdateExpenseDTO {
  description?: string;
  amount?: number;
  date?: string;
}

export const expenseService = {
  async getAll(month?: string, year?: string) {
    const token = localStorage.getItem("access_token");

    let url = `${API_URL}/expenses`;
    const params = new URLSearchParams();
    if (month) params.append("month", month);
    if (year) params.append("year", year);

    if (params.toString()) url += `?${params.toString()}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await handleResponse(response);

    // In case postgres cast amount to string
    return data.map((item: any) => ({
      ...item,
      amount: Number(item.amount),
    })) as Expense[];
  },

  async create(data: CreateExpenseDTO) {
    const token = localStorage.getItem("access_token");
    const response = await fetch(`${API_URL}/expenses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    return handleResponse(response);
  },

  async update(id: number, data: UpdateExpenseDTO) {
    const token = localStorage.getItem("access_token");
    const response = await fetch(`${API_URL}/expenses/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    return handleResponse(response);
  },

  async delete(id: number) {
    const token = localStorage.getItem("access_token");
    const response = await fetch(`${API_URL}/expenses/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  },
};
