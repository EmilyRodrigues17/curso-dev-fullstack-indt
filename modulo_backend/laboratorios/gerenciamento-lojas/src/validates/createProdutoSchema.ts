import z from "zod"

export const createProdutoSchema = z.object({
    nome: z.preprocess(
        (val) => (val === undefined ? "" : val),
        z.string().min(1, "Nome do produto é obrigatório.")
    ),

    descricao: z.preprocess(
        (val) => (val === "" || val === null ? undefined : val),
        z.string().optional()
    ),

    preco: z.preprocess(
        (val) => (val === undefined ? "" : val),
        z.coerce.number().positive("O preço do produto precisa ser maior que 0.")
    ),

    estoque: z.preprocess(
        (val) => (val === undefined ? "" : val),
        z.coerce.number().nonnegative("O valor de estoque precisa ser um numero positvo maior ou igual a 0.")
    )

})
