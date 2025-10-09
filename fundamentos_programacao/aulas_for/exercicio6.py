numero = int(input('Digite um numero: '))
resultado = 1
for i in range(1, numero + 1):
    
    print(f'{numero - i}', end = "x")
    resultado *= i


print(f'\n O resultado do fatorial de {numero} é {resultado}')