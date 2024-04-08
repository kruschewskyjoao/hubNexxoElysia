import { NotFoundError } from "elysia";

type Consumer = {
  name: string;
  email: string;
  postalCode?: string;
}
export const newConsumer = async (consumer: Consumer) => {
  const url = 'https://sandbox.asaas.com/api/v3/customers';
  consumer.postalCode = consumer.postalCode ?? "";
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'access_token': '$aact_YTU5YTE0M2M2N2I4MTliNzk0YTI5N2U5MzdjNWZmNDQ6OjAwMDAwMDAwMDAwMDAwNzc5MzI6OiRhYWNoXzgxMGFjMTk1LTdiNGYtNGJjNy04OTU4LWUxMmQzMmRlMjhlYQ=='
    },
    body: JSON.stringify(consumer)
  });
  const data = await response.json();
  return data;
}

export const getConsumerByNameOrCnpj = async (nameOrCnpj: string) => {
  const url = `https://sandbox.asaas.com/api/v3/customers?name=${nameOrCnpj}`;
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'access_token': '$aact_YTU5YTE0M2M2N2I4MTliNzk0YTI5N2U5MzdjNWZmNDQ6OjAwMDAwMDAwMDAwMDAwNzc5MzI6OiRhYWNoXzgxMGFjMTk1LTdiNGYtNGJjNy04OTU4LWUxMmQzMmRlMjhlYQ=='
    }
  });
  const data = await response.json();
  if (data.data.length === 0) {
    throw new NotFoundError()
  }
  return data;
}