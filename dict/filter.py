from unidecode import unidecode
import json

f = open("dictionary.csv", "r")

wordList = []

index = 0
for mot in f:
    if (index > 100):
        pass
        #break
    mot = mot.strip().upper()
    mot = unidecode(mot)
    if (' ' in mot):
        continue
    if (len(mot) == 8):
        index += 1
        wordList.append(mot)

print(json.dumps(wordList))
