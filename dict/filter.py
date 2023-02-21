from unidecode import unidecode
import json

f = open("dictionary.csv", "r")

wordList = []

for mot in f:
    mot = mot.strip().upper()
    mot = unidecode(mot)
    if (' ' in mot):
        continue
    if ('.' in mot):
        continue
    if (len(mot) == 8):
        wordList.append(mot)

print(json.dumps(wordList))
