class Produto:
    def __init__(self, nome: str, quantidade_estoque: int, valor_unitario: float):
        self.nome = nome
        self._quantidade_estoque = quantidade_estoque
        if valor_unitario <= 0:
            print(f"Valor unitário precisa ser maior que 0")
        else:
            self.__valor_unitario = valor_unitario
    
    def __valor_total(self):
        return self._quantidade_estoque * self.__valor_unitario

    def vender(self, quantidade: int):
        if quantidade <= 0:
            print(f"Quantidade inserida inválida! Sem ação de venda")
        elif quantidade > self._quantidade_estoque:
            print(f"Quantidade inserida acima do estoque disponível! Sem ação de venda")
        else:
            self._quantidade_estoque -= quantidade
            valor = quantidade * self.__valor_unitario
            print(f"Estoque atual disponível do produto {self.nome}: {self._quantidade_estoque}")
            print(f"Valor total da venda do produto {self.nome}: R$ {valor}")
    
    def repor_estoque(self, quantidade: int):
        if quantidade <= 0:
            print(f"Quantidade inserida inválida!")
        else:
            self._quantidade_estoque += quantidade
        print(f"Quantidade atual do produto {self.nome}: {self._quantidade_estoque}")

    def mostrar_quantidade(self):
        print(f"O produto {self.nome} tem {self._quantidade_estoque} em estoque dispoível.")

    def mostrar_valor_total(self):
        print(f"O valor total do estoque é: R$ {round(self.__valor_total(), 2)}")

if __name__ == "__main__":
    p1 = Produto("Caneta", 100, 2.50)
    p2 = Produto("Caderno", 50, 15.00)

    p1.vender(20)
    print()

    p1.repor_estoque(50)
    print()

    print("\nSituação atual do estoque:")
    p1.mostrar_quantidade()
    p2.mostrar_quantidade()
    print()


    p1.mostrar_valor_total()
    p2.mostrar_valor_total()
    print()
