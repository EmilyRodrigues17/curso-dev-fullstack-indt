palavra = input('Digite uma palavra: ')
count = 0
for i in palavra:

    if i in ('a', 'e', 'i', 'o', 'u'):
        count += 1
    else:
        pass

print(f'Na palavra: {palavra} tem {count} vogais')