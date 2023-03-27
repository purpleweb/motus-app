from unidecode import unidecode
import json

f = open("dictionary.csv", "r")

wordList = []

for word in f:
    word = word.strip().upper()
    word = unidecode(word)
    if (' ' in word):
        continue
    if ('.' in word):
        continue
    if ("'" in word):
        continue
    if (len(word) == 8):
        wordList.append(word)

print(json.dumps(wordList))
