from collections import deque

class Produto:
    def __init__(self, nome: str, preco: float):
        self.nome = nome
        self.preco = preco
    
    def __str__(self):
        return f"Produto: {self.nome} - Preço: {self.preco}"
    
    def altera_preco_produto(self, novo_preco: float):
        print(f"Alterando o preco do produto {self.nome} para {novo_preco}")
        self.preco = novo_preco


class CarrinhoDeCompras:
    def __init__(self):
        self.lista_produtos = deque()
    
    def adicionar(self, produto: Produto):
        self.lista_produtos.append(produto)
        print(f"Produto {produto.nome} adicionado ao carrinho!")

    def retirar_produto_carrinho(self, produto: Produto):
        if not self.lista_produtos:
            print("Carrinho Vazio!")
        else:
            print(f"Removendo produto {produto.nome} do carrinho!")
            self.lista_produtos.remove(produto)

    def listar_produtos_carrinho(self):
        print(f"\nProdutos Presentes no carrinho de compras")
        if not self.lista_produtos:
            print("Carrinho Vazio!")
        else:
            for i, produto in enumerate(self.lista_produtos):
                print(f"Produto: {produto.nome} - Preço: {produto.preco}")

    def calcular_total(self):
        total = 0
        for produto in self.lista_produtos:
            total += produto.preco
        
        print(f"\nO valor total do carrinho de compras até o momento é de R$ {round(total, 2)}")


produto1 = Produto("Sabão em pó", 14.56)
produto2 = Produto("Amaciante Ipê", 13.68)
produto3 = Produto("Agua Sanitária", 1.79)

print(produto1)
print(produto2)
print(produto3)


carrinho = CarrinhoDeCompras()
print()

carrinho.adicionar(produto1)
carrinho.adicionar(produto2)
carrinho.adicionar(produto3)
print()

carrinho.listar_produtos_carrinho()
print()

carrinho.calcular_total()
print()
produto1.altera_preco_produto(25.67)

print(produto1)

carrinho.retirar_produto_carrinho(produto1)
print()

carrinho.listar_produtos_carrinho()
print()

carrinho.calcular_total()
print()