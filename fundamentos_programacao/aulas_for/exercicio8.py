numero = int(input('Digite o numero: '))
soma = 0
if numero < 0:
    print(f'Numero invalido')
else:
    for i in range(numero + 1):
        if (i % 5 == 0):
            soma += i

    print(f'A soma dos números múltiplos de 5 é: {soma}')