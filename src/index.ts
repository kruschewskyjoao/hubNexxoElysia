import { Elysia, t } from "elysia";
import { getCustomerInfos, newCustomer, getCustomerById } from "./api";

const app = new Elysia()
  .post('/newcustomer', ({ body }) => newCustomer(body), {
    body: t.Object({
      name: t.String(),
      cpfCnpj: t.Optional(t.String()),
      email: t.String({
        format: 'email',
        error: 'Invalid Email Format',
      }),
      postalCode: t.Optional(t.String()),
    }),
  })
  .onError(({ code, error, set }) => {
    if (code === 'NOT_FOUND') {
      set.status = 404
      return 'Não foi encontrado nenhum cliente com esse nome ou CNPJ.'
    }
  })

  .get('/customers/:infos',  ({ params: { infos } }) => getCustomerInfos(infos),  {
    params: t.Object({
      infos: t.String(),
    }),
  })

  .get('/customer/:id', ({ params: { id } }) => getCustomerById(id), {
    params: t.Object({
      id: t.String(),
    }),
  })

.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
