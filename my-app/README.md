
- Link flags

https://icon-icons.com/search?q=flag+spain

    // const [wordEn, setWordEn] = useState<string>("");
    // const [wordEs, setWordEs] = useState<string>("");
    // const [wordDe, setWordDe] = useState<string>("");
    // const [wordZh, setWordZh] = useState<string>("");

    // const [wordsEn, setWordsEn] = useState<string[]>([]);
    // const [wordsEs, setWordsEs] = useState<string[]>([]);
    // const [wordsDe, setWordsDe] = useState<string[]>([]);
    // const [wordsZh, setWordsZh] = useState<string[]>([]);

    // const [translationsEn, setTranslationsEn] = useState<{ [key: string]: string }>({});
    // const [translationsEs, setTranslationsEs] = useState<{ [key: string]: string }>({});
    // const [translationsDe, setTranslationsDe] = useState<{ [key: string]: string }>({});
    // const [translationsZh, setTranslationsZh] = useState<{ [key: string]: string }>({});

    // const translateText_es = async (text: string, targetLang: string = "es") => {
    //     try {
    //         const res = await fetch("/api/translate/spanish", {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify({ text, targetLang }),
    //         });
    //         const data = await res.json();
    //         return data.translation || text;
    //     } catch (err) {
    //         console.error("Translation error:", err);
    //     return text;
    //     }
    // };

    // const translateText_de = async (text: string, targetLang: string = "de") => {
    //     try {
    //         const res = await fetch("/api/translate/german", {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify({ text, targetLang }),
    //         });
    //         const data = await res.json();
    //         return data.translation || text;
    //     } catch (err) {
    //         console.error("Translation error:", err);
    //     return text;
    //     }
    // };

    // const translateText_zh = async (text: string, targetLang: string = "zh") => {
    //     try {
    //         const res = await fetch("/api/translate/chinese", {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify({ text, targetLang }),
    //         });
    //         const data = await res.json();
    //         return data.translation || text;
    //     } catch (err) {
    //         console.error("Translation error:", err);
    //     return text;
    //     }
    // };


    // const handleSearchEn = (e: ChangeEvent<HTMLInputElement>) => {
    //     let value = e.target.value;
    //     setWordEn(value);
    // };

    // const handleSearchEs = (e: ChangeEvent<HTMLInputElement>) => {
    //     let value = e.target.value;
    //     setWordEs(value);
    // };

    // const handleSearchDe = (e: ChangeEvent<HTMLInputElement>) => {
    //     let value = e.target.value;
    //     setWordDe(value);
    // };

    // const handleSearchZh = (e: ChangeEvent<HTMLInputElement>) => {
    //     let value = e.target.value;
    //     setWordZh(value);
    // };

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
