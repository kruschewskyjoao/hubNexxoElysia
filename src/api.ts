import { NotFoundError, ValidationError } from "elysia";

type Customer = {
  name: string;
  email: string;
  cpfCnpj?: string;
  postalCode?: string;
}
export const newCustomer = async (customer: Customer) => {
  const url = 'https://sandbox.asaas.com/api/v3/customers';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'access_token': Bun.env.TOKENAPI ?? '',
    },
    body: JSON.stringify(customer)
  });
  const data = await response.json();
  return data;
}

export const getCustomerInfos = async (infos: string) => {
  const url = `https://sandbox.asaas.com/api/v3/customers?name=${infos}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'access_token': Bun.env.TOKENAPI ?? '',
    }
  });
  const data = await response.json();
  if (data.data.length === 0) {
    throw new NotFoundError()
  }
  return data;
}

export const getCustomerById = async (id: string) => {
  const url = `https://sandbox.asaas.com/api/v3/customers/${id}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'access_token': Bun.env.TOKENAPI ?? '',
    }
  });
  const data = await response.json();
  return data;
}