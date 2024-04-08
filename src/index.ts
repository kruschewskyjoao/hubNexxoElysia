import { Elysia, NotFoundError, t } from "elysia";
import { getConsumerByNameOrCnpj, newConsumer } from "./api";

const app = new Elysia()
  .post('/newcustomer', ({ body }) => newConsumer(body), {
    body: t.Object({
      name: t.String(),
      email: t.String(),
      postalCode: t.Optional(t.String()),
    }),
  })
  .onError(({ code, error, set }) => {
    if (code === 'NOT_FOUND') {
      set.status = 404
      return 'Não foi encontrado nenhum cliente com esse nome ou CNPJ.'
    }
  })
  .get('/customers/:nameOrCnpj',  ({ params: { nameOrCnpj } }) => getConsumerByNameOrCnpj(nameOrCnpj),  {
    params: t.Object({
      nameOrCnpj: t.String(),
    }),
  })

.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
