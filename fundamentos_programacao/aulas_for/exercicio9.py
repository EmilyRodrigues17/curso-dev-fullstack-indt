qtdEntrevistados = int(input('Digite a quantidade de entrevistados: '))
contadorFastFood = 0
contadorCaseira = 0
contadorVegetariano = 0
contadorVegana = 0
contadorOutros = 0
somatoriaSono = 0
atividadeVegetariano = 0
femininoVegano = 0
somatorioSemAtividade = 0

for i in range(qtdEntrevistados):
    print('----------Pesquisa---------')
    print('Qual habito alimentar principal?')
    print('1 - Fast-food | 2 - Caseira | 3 - Vegetariana | 4 - Vegana | 5 - Outros')
    habitoAlimentar = int(input('Digite o número que corresponde a resposta: '))
    print()
    print('Pratica atividade física regularmente?')
    print('1 - Sim | 2 - Não')
    atividadeFisica = int(input('Digite o número que corresponde a resposta: '))
    print()
    horasSonoNoite = int(input('Digite a quantidade de horas de sono por noite: '))
    idade = int(input('Digite a idade: '))
    print()
    print('Informe o genero')
    print('1 - Feminino | 2 - Masculino | 3 - Outro')
    genero = int(input('Digite o número que corresponde a resposta: '))
    print()

    if habitoAlimentar == 1:
        contadorFastFood += 1
        somatoriaSono += horasSonoNoite
    elif habitoAlimentar == 2:
        contadorCaseira += 1
    elif habitoAlimentar == 3:
        contadorVegetariano += 1
        if atividadeFisica == 1:
            atividadeVegetariano += 1
    elif habitoAlimentar == 4:
        contadorVegana += 1
        if genero == 1:
            femininoVegano += 1
    elif habitoAlimentar == 5: 
        contadorOutros += 1

    if atividadeFisica == 2:
        somatorioSemAtividade += idade


print(f'Quantidade de pessoas com habito alimentar Fast-food: {contadorFastFood}')
print(f'Quantidade de pessoas com habito alimentar Caseira: {contadorCaseira}')
print(f'Quantidade de pessoas com habito alimentar Vegetariana: {contadorVegetariano}')
print(f'Quantidade de pessoas com habito alimentar Vegana: {contadorVegana}')
print(f'Quantidade de pessoas com habito alimentar Outros: {contadorOutros}')

print(f'Media de horas de sono das pessoas com habito alimentar Fast-food: {somatoriaSono/contadorFastFood}')

print(f'Quantidade de pessoas vegetarianas que que praticam atividade fisica: {atividadeVegetariano}')
print(f'Quantidade de pessoas veganas do gênero feminino: {femininoVegano}')
print(f'Media de idade das pessoas que não praticam atividade fisica: {somatorioSemAtividade/qtdEntrevistados}')