/**
 * Offline fixture data for local development, built from a real sample response
 * of the piratereads.com API (so the shapes match exactly). Lets the app be
 * exercised end to end without a live Goodreads sync.
 */
import { PrismaClient, Shelf } from "@prisma/client";
import { colorForTag } from "../src/lib/tags";

const prisma = new PrismaClient();

interface SeedBook {
  id: string;
  title: string;
  author: string;
  isbn: string | null;
  coverSmall: string;
  coverMedium: string;
  coverLarge: string;
  link: string;
  avgRating: number;
  shelf: Shelf;
}

const BOOKS: SeedBook[] = [
  {
    id: "1168191",
    title: "Meditations",
    author: "Marcus Aurelius",
    isbn: "0812968255",
    coverSmall: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1383681793l/1168191._SY75_.jpg",
    coverMedium: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1383681793l/1168191._SX98_.jpg",
    coverLarge: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1383681793l/1168191.jpg",
    link: "https://www.goodreads.com/book/show/1168191.Meditations",
    avgRating: 4.39,
    shelf: "READ",
  },
  {
    id: "61535",
    title: "The Selfish Gene",
    author: "Richard Dawkins",
    isbn: "0199291152",
    coverSmall: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1366758096l/61535._SY75_.jpg",
    coverMedium: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1366758096l/61535._SY160_.jpg",
    coverLarge: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1366758096l/61535.jpg",
    link: "https://www.goodreads.com/book/show/61535.The_Selfish_Gene",
    avgRating: 4.15,
    shelf: "READ",
  },
  {
    id: "24280",
    title: "Les Misérables",
    author: "Victor Hugo",
    isbn: "0451525264",
    coverSmall: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1411852091l/24280._SY75_.jpg",
    coverMedium: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1411852091l/24280._SY160_.jpg",
    coverLarge: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1411852091l/24280.jpg",
    link: "https://www.goodreads.com/book/show/24280.Les_Mis_rables",
    avgRating: 4.19,
    shelf: "READ",
  },
  {
    id: "42086531",
    title: "The Phantom of the Opera and other Gothic Tales",
    author: "Aleksey Nikolayevich Tolstoy",
    isbn: "1435167139",
    coverSmall: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1538107588l/42086531._SY75_.jpg",
    coverMedium: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1538107588l/42086531._SX98_.jpg",
    coverLarge: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1538107588l/42086531.jpg",
    link: "https://www.goodreads.com/book/show/42086531-the-phantom-of-the-opera-and-other-gothic-tales",
    avgRating: 4.25,
    shelf: "WANT_TO_READ",
  },
  {
    id: "23692271",
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    isbn: null,
    coverSmall: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1703329310l/23692271._SY75_.jpg",
    coverMedium: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1703329310l/23692271._SX98_.jpg",
    coverLarge: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1703329310l/23692271._SY475_.jpg",
    link: "https://www.goodreads.com/book/show/23692271-sapiens",
    avgRating: 4.31,
    shelf: "READ",
  },
  {
    id: "11468377",
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    isbn: "0374275637",
    coverSmall: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1317793965l/11468377._SX50_.jpg",
    coverMedium: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1317793965l/11468377._SX98_.jpg",
    coverLarge: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1317793965l/11468377.jpg",
    link: "https://www.goodreads.com/book/show/11468377-thinking-fast-and-slow",
    avgRating: 4.16,
    shelf: "CURRENTLY_READING",
  },
  {
    id: "68428",
    title: "Mistborn: The Final Empire (Mistborn, #1)",
    author: "Brandon Sanderson",
    isbn: null,
    coverSmall: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1617768316l/68428._SY75_.jpg",
    coverMedium: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1617768316l/68428._SX98_.jpg",
    coverLarge: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1617768316l/68428._SY475_.jpg",
    link: "https://www.goodreads.com/book/show/68428.Mistborn",
    avgRating: 4.47,
    shelf: "READ",
  },
  {
    id: "68429",
    title: "The Well of Ascension (Mistborn, #2)",
    author: "Brandon Sanderson",
    isbn: "0765316889",
    coverSmall: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1619538925l/68429._SY75_.jpg",
    coverMedium: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1619538925l/68429._SX98_.jpg",
    coverLarge: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1619538925l/68429._SY475_.jpg",
    link: "https://www.goodreads.com/book/show/68429.The_Well_of_Ascension",
    avgRating: 4.37,
    shelf: "WANT_TO_READ",
  },
  {
    id: "2767793",
    title: "The Hero of Ages (Mistborn, #3)",
    author: "Brandon Sanderson",
    isbn: "0765316897",
    coverSmall: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1628563911l/2767793._SY75_.jpg",
    coverMedium: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1628563911l/2767793._SX98_.jpg",
    coverLarge: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1628563911l/2767793._SY475_.jpg",
    link: "https://www.goodreads.com/book/show/2767793-the-hero-of-ages",
    avgRating: 4.55,
    shelf: "WANT_TO_READ",
  },
  {
    id: "25744928",
    title: "Deep Work: Rules for Focused Success in a Distracted World",
    author: "Cal Newport",
    isbn: "1455586692",
    coverSmall: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1447957962l/25744928._SY75_.jpg",
    coverMedium: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1447957962l/25744928._SX98_.jpg",
    coverLarge: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1447957962l/25744928._SY475_.jpg",
    link: "https://www.goodreads.com/book/show/25744928-deep-work",
    avgRating: 4.15,
    shelf: "READ",
  },
  {
    id: "35068705",
    title: "The Poppy War (The Poppy War, #1)",
    author: "R.F. Kuang",
    isbn: "0062662597",
    coverSmall: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1515691735l/35068705._SY75_.jpg",
    coverMedium: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1515691735l/35068705._SX98_.jpg",
    coverLarge: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1515691735l/35068705.jpg",
    link: "https://www.goodreads.com/book/show/35068705-the-poppy-war",
    avgRating: 4.13,
    shelf: "WANT_TO_READ",
  },
  {
    id: "27036528",
    title: "Ego Is the Enemy",
    author: "Ryan Holiday",
    isbn: "1591847818",
    coverSmall: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1459114043l/27036528._SX50_.jpg",
    coverMedium: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1459114043l/27036528._SX98_.jpg",
    coverLarge: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1459114043l/27036528.jpg",
    link: "https://www.goodreads.com/book/show/27036528-ego-is-the-enemy",
    avgRating: 4.11,
    shelf: "READ",
  },
  {
    id: "51164133",
    title: "How to Think Like a Roman Emperor: The Stoic Philosophy of Marcus Aurelius",
    author: "Donald J. Robertson",
    isbn: "1250621437",
    coverSmall: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1565885296l/51164133._SY75_.jpg",
    coverMedium: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1565885296l/51164133._SX98_.jpg",
    coverLarge: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1565885296l/51164133.jpg",
    link: "https://www.goodreads.com/book/show/51164133-how-to-think-like-a-roman-emperor",
    avgRating: 4.37,
    shelf: "WANT_TO_READ",
  },
  {
    id: "41881472",
    title: "The Psychology of Money: Timeless Lessons on Wealth, Greed, and Happiness",
    author: "Morgan Housel",
    isbn: null,
    coverSmall: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1581527774l/41881472._SY75_.jpg",
    coverMedium: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1581527774l/41881472._SX98_.jpg",
    coverLarge: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1581527774l/41881472._SY475_.jpg",
    link: "https://www.goodreads.com/book/show/41881472-the-psychology-of-money",
    avgRating: 4.25,
    shelf: "READ",
  },
  {
    id: "139587074",
    title: "Twenty Thousand Leagues under the Sea",
    author: "Jules Verne",
    isbn: null,
    coverSmall: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1682336508l/139587074._SY75_.jpg",
    coverMedium: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1682336508l/139587074._SX98_.jpg",
    coverLarge: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1682336508l/139587074._SY475_.jpg",
    link: "https://www.goodreads.com/book/show/139587074-twenty-thousand-leagues-under-the-sea",
    avgRating: 5,
    shelf: "DID_NOT_FINISH",
  },
  {
    id: "28430515",
    title: "The Arabian Nights",
    author: "Anonymous",
    isbn: "1435156234",
    coverSmall: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1575469800l/28430515._SX50_.jpg",
    coverMedium: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1575469800l/28430515._SX98_.jpg",
    coverLarge: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1575469800l/28430515._SX318_.jpg",
    link: "https://www.goodreads.com/book/show/28430515-the-arabian-nights",
    avgRating: 3.88,
    shelf: "DID_NOT_FINISH",
  },
  {
    id: "40495148",
    title: "Blindness",
    author: "José Saramago",
    isbn: null,
    coverSmall: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1528481068l/40495148._SY75_.jpg",
    coverMedium: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1528481068l/40495148._SX98_.jpg",
    coverLarge: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1528481068l/40495148._SY475_.jpg",
    link: "https://www.goodreads.com/book/show/40495148-blindness",
    avgRating: 4.15,
    shelf: "CURRENTLY_READING",
  },
  {
    id: "23848190",
    title: "Extreme Ownership: How U.S. Navy SEALs Lead and Win",
    author: "Jocko Willink",
    isbn: "1250067057",
    coverSmall: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1427163007l/23848190._SX50_.jpg",
    coverMedium: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1427163007l/23848190._SX98_.jpg",
    coverLarge: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1427163007l/23848190.jpg",
    link: "https://www.goodreads.com/book/show/23848190-extreme-ownership",
    avgRating: 4.22,
    shelf: "READ",
  },
  {
    id: "59088361",
    title: "Do Hard Things: Why We Get Resilience Wrong and the Surprising Science of Real Toughness",
    author: "Steve Magness",
    isbn: "006309861X",
    coverSmall: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1649650728l/59088361._SY75_.jpg",
    coverMedium: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1649650728l/59088361._SX98_.jpg",
    coverLarge: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1649650728l/59088361.jpg",
    link: "https://www.goodreads.com/book/show/59088361-do-hard-things",
    avgRating: 3.76,
    shelf: "WANT_TO_READ",
  },
  {
    id: "61539",
    title: "The Structure of Scientific Revolutions",
    author: "Thomas S. Kuhn",
    isbn: "0226458083",
    coverSmall: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1396422530l/61539._SY75_.jpg",
    coverMedium: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1396422530l/61539._SX98_.jpg",
    coverLarge: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1396422530l/61539.jpg",
    link: "https://www.goodreads.com/book/show/61539.The_Structure_of_Scientific_Revolutions",
    avgRating: 4.01,
    shelf: "WANT_TO_READ",
  },
];

interface SeedQuote {
  bookId: string;
  text: string;
  pageNumber?: number;
  note?: string;
  tags: string[];
}

interface SeedReflection {
  bookId: string;
  title?: string;
  body: string;
  tags: string[];
}

const QUOTES: SeedQuote[] = [
  {
    bookId: "1168191",
    text: "You have power over your mind — not outside events. Realize this, and you will find strength.",
    pageNumber: 12,
    note: "The whole book, really, compressed into one line.",
    tags: ["stoicism", "self-control", "inner emotions"],
  },
  {
    bookId: "61535",
    text: "We are survival machines — robot vehicles blindly programmed to preserve the selfish molecules known as genes.",
    pageNumber: 24,
    tags: ["selfishness", "human nature", "biology"],
  },
  {
    bookId: "24280",
    text: "To love another person is to see the face of God.",
    pageNumber: 1213,
    note: "Against every selfish instinct in the book, this is the one that stays with me.",
    tags: ["redemption", "inner emotions"],
  },
  {
    bookId: "27036528",
    text: "The only relationship between work and success is the work itself.",
    tags: ["ego", "ambition", "self-control"],
  },
  {
    bookId: "41881472",
    text: "Wealth is what you don't see. It's the cars not purchased.",
    pageNumber: 45,
    tags: ["ambition", "human nature"],
  },
  {
    bookId: "23692271",
    text: "Fiction has enabled us not merely to imagine things, but to do so collectively.",
    tags: ["human nature", "survival"],
  },
  {
    bookId: "40495148",
    text: "I don't think we did go blind, I think we are blind, Blind but seeing, Blind people who can see, but do not see.",
    note: "About the morality that surfaces — or doesn't — under pressure.",
    tags: ["morality", "human nature", "inner emotions"],
  },
];

const REFLECTIONS: SeedReflection[] = [
  {
    bookId: "1168191",
    title: "The discipline of the inner citadel",
    body: "Aurelius keeps returning to the same idea from a hundred angles: the only territory you truly govern is your own judgment. Everything else — reputation, fortune, other people's selfishness — is weather. It reframes ambition, too: not as something to be sought from the outside, but tended from within.",
    tags: ["stoicism", "mortality", "self-control"],
  },
  {
    bookId: "61535",
    title: "Selfish genes, generous people",
    body: "The unsettling and clarifying idea here is that altruism can be a survival strategy for the gene even when it costs the individual. Selfishness at one level of description produces cooperation at another. Les Misérables works the same seam from the opposite direction — grace as a strategy against a selfish world.",
    tags: ["selfishness", "human nature", "survival"],
  },
  {
    bookId: "24280",
    body: "Valjean's whole arc is a rebuttal to the idea that human nature is fixed toward self-interest. One act of undeserved mercy and the rest of the novel follows the ripple. It sits right next to the Dawkins book on the shelf in my head now, arguing with it.",
    tags: ["redemption", "morality", "human nature"],
  },
  {
    bookId: "40495148",
    title: "What survives when the rules disappear",
    body: "Saramago strips away sight to ask what's left of morality without observation, without shame. It's the darkest possible answer to the question Meditations answers so calmly: what governs you when nothing external is watching?",
    tags: ["morality", "inner emotions", "mortality"],
  },
];

async function main() {
  await prisma.profile.upsert({
    where: { id: 1 },
    create: { id: 1 },
    update: {},
  });

  for (const book of BOOKS) {
    await prisma.book.upsert({
      where: { id: book.id },
      create: {
        id: book.id,
        title: book.title,
        author: book.author,
        isbn: book.isbn,
        coverSmall: book.coverSmall,
        coverMedium: book.coverMedium,
        coverLarge: book.coverLarge,
        goodreadsLink: book.link,
        avgRating: book.avgRating,
        shelf: book.shelf,
      },
      update: {},
    });
  }

  const tagId = new Map<string, string>();
  async function tag(name: string): Promise<string> {
    const cached = tagId.get(name);
    if (cached) return cached;
    const record = await prisma.tag.upsert({
      where: { name },
      create: { name, color: colorForTag(name) },
      update: {},
    });
    tagId.set(name, record.id);
    return record.id;
  }

  for (const quote of QUOTES) {
    const tagIds = await Promise.all(quote.tags.map(tag));
    await prisma.quote.create({
      data: {
        bookId: quote.bookId,
        text: quote.text,
        pageNumber: quote.pageNumber ?? null,
        note: quote.note ?? null,
        tags: { create: tagIds.map((id) => ({ tagId: id })) },
      },
    });
  }

  for (const reflection of REFLECTIONS) {
    const tagIds = await Promise.all(reflection.tags.map(tag));
    await prisma.reflection.create({
      data: {
        bookId: reflection.bookId,
        title: reflection.title ?? null,
        body: reflection.body,
        tags: { create: tagIds.map((id) => ({ tagId: id })) },
      },
    });
  }

  console.log(`Seeded ${BOOKS.length} books, ${QUOTES.length} quotes, ${REFLECTIONS.length} reflections.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
