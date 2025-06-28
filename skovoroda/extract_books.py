import re

# Read the notes file
with open(r'c:\Repositories\SkovorodaRepoLatest2\skovoroda\lib\data\treatises\6 besida_nazvana_dvoie READ NOTES.txt', 'r', encoding='utf-8') as f:
    content = f.read()

# Patterns for different biblical book references
patterns = [
    r'Книга\s+(?:пророка\s+)?([А-ЯІЇЄа-яіїє\']+)',
    r'Євангелія\s+від\s+св\.\s+([А-ЯІЇЄа-яіїє\']+)',
    r'(Перше|Друге|Третє|Четверте|П\'яте)\s+(?:соборне\s+)?послання\s+(?:св\.\s+ап\.\s+)?(?:Павла\s+)?(?:до\s+)?([А-ЯІЇЄа-яіїє\']+)',
    r'(Перша|Друга|Третя|Четверта|П\'ята)\s+книга\s+(?:Мойсеєва:\s+)?([А-ЯІЇЄа-яіїє\']+)',
    r'(Перша|Друга|Третя|Четверта|П\'ята)\s+книга\s+(?:царств|параліпоменон)',
    r'Послання\s+(?:св\.\s+ап\.\s+)?(?:Павла\s+)?(?:до\s+)?([А-ЯІЇЄа-яіїє\']+)',
    r'Дії\s+(?:св\.\s+)?(?:апостолів|св\s+апостолів)',
    r'Апокаліпсис',
    r'Пісня\s+над\s+піснями',
    r'Плач\s+([А-ЯІЇЄа-яіїє\']+)',
    r'Соборне\s+послання\s+св\.\s+ап\.\s+([А-ЯІЇЄа-яіїє\']+)',
    r'книга\s+(царств|параліпоменон)',
]

books = set()

for pattern in patterns:
    matches = re.findall(pattern, content, re.IGNORECASE)
    for match in matches:
        if isinstance(match, tuple):
            books.update([m for m in match if m])
        else:
            books.add(match)

# Also look for specific book names
book_names = [
    'Буття', 'Вихід', 'Левит', 'Числа', 'Повторення Закону',
    'Ісуса Навина', 'Суддів', 'Рут', 'Самуїла', 'царств', 'параліпоменон',
    'Ездри', 'Неємії', 'Естер', 'Йова', 'Псалмів', 'Притч', 'Екклезіястової',
    'Пісня над піснями', 'Ісаї', 'Єремії', 'Плач Єремії', 'Єзекії', 'Даниїла',
    'Осії', 'Іоїла', 'Амоса', 'Авдія', 'Іони', 'Михея', 'Наума', 'Аввакума',
    'Софонії', 'Аггея', 'Захарії', 'Малахії', 'Ісуса, сина Сирахового',
    'Премудрості Соломона', 'Варуха', 'Матвія', 'Марка', 'Луки', 'Івана',
    'римлян', 'коринтян', 'галатів', 'ефесян', 'филип\'ян', 'колосян', 
    'солунян', 'Тимофія', 'Тита', 'Филимона', 'євреїв', 'Якова', 'Петра',
    'Тимотея', 'солун'
]

for book in book_names:
    if book.lower() in content.lower():
        books.add(book)

# Print all found books
print("Found biblical books:")
for book in sorted(books):
    print(f"'{book}'")

print(f"\nTotal: {len(books)} books found")
