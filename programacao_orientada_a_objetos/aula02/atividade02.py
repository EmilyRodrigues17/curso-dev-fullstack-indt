
from collections import deque

class Passageiro:
    def __init__(self, nome, idade):
        self.nome = nome
        self.idade = idade
        
    def mostrar_passageiro(self):
        return f"Passageiro {self.nome} - Idade: {self.idade}"

class Onibus:
    def __init__(self, linha: str, capacidade: int):
        self.linha = linha
        self.capacidade = capacidade
        self.lista_passageiros = deque()

    def embarcar_passegeiro(self, passageiro: Passageiro):
        if len(self.lista_passageiros) < self.capacidade:
            self.lista_passageiros.append(passageiro)
            mensagem = passageiro.mostrar_passageiro()
            print(f"{mensagem} embarcou no onibus!")
        else:
            print(f"Capacidade atingida! Não é possível fazer o embarque!")
    
    def listar_passageiros(self):
        print(f"\nListagem dos passageiros da linha {self.linha}")
        if not self.lista_passageiros:
            print(f"Sem passageiros no onibus")
        else:
            for p in self.lista_passageiros:
                print(p.mostrar_passageiro())


p1 = Passageiro("Emily", 26)
p2 = Passageiro("Lucas", 48)
p3 = Passageiro("Elena", 15)

p1.mostrar_passageiro()

onibus = Onibus("212 - João Vitótia", 2)

onibus.embarcar_passegeiro(p1)
onibus.embarcar_passegeiro(p2)
onibus.embarcar_passegeiro(p3)

onibus.listar_passageiros()