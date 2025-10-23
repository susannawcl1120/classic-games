import csv from "csvtojson";
import fs from "fs/promises";
import { IncomingMessage } from "http";
import https from "https";
import path from "path";
import { URL } from "url";

const SHEETS_URL =
  "https://docs.google.com/spreadsheets/d/1VzcJL0sdNWWv6nTu5rQEQfAw3_cCmU_EKrQXTYfSl1g/gviz/tq?tqx=out:csv&sheet=i18n";
const CSV_PATH = "./i18n/site.csv";
const OUTPUT_PATH = "./i18n/locales";

const LANG_KEYS = ["zh", "en"] as const;
type Lang = (typeof LANG_KEYS)[number];

type CSVRow = {
  category: string;
  key: string;
} & Record<Lang, string>;

function getUniqueUrl(url: string): string {
  const timestamp = `timestamp=${Date.now()}`;
  return url.includes("?") ? `${url}&${timestamp}` : `${url}?${timestamp}`;
}

async function downloadCSV(url: string, dest: string): Promise<void> {
  const uniqueUrl = getUniqueUrl(url);

  return new Promise((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const file = require("fs").createWriteStream(dest);
    https
      .get(uniqueUrl, (res) => {
        const handleResponse = (response: IncomingMessage) => {
          response.pipe(file);
          file.on("finish", () => file.close(resolve));
        };

        if ([302, 307].includes(res.statusCode || 0)) {
          const redirectUrl = new URL(res.headers.location || "");
          https.get(redirectUrl, handleResponse).on("error", reject);
        } else if (res.statusCode === 200) {
          handleResponse(res);
        } else {
          reject(`HTTP ${res.statusCode} error for ${uniqueUrl}`);
        }
      })
      .on("error", (err) => {
        fs.unlink(dest).catch(() => null);
        reject(err);
      });
  });
}

async function processCSV(): Promise<void> {
  const csvData = await fs.readFile(CSV_PATH, "utf8");
  const rows: CSVRow[] = await csv({
    headers: ["category", "key", ...LANG_KEYS],
  }).fromString(csvData);

  const result: Record<Lang, Record<string, Record<string, string>>> = {
    zh: {},
    en: {},
  };

  for (const row of rows) {
    const { category, key } = row;

    for (const lang of LANG_KEYS) {
      const value = row[lang];
      if (!result[lang][category]) {
        result[lang][category] = {};
      }
      result[lang][category][key] = value;
    }
  }

  await fs.mkdir(OUTPUT_PATH, { recursive: true });

  for (const lang of LANG_KEYS) {
    const langPath = path.join(OUTPUT_PATH, `${lang}.json`);
    await fs.writeFile(langPath, JSON.stringify(result[lang], null, 4), "utf8");
  }

  await fs.unlink(CSV_PATH);
}

async function i18nGenerator(): Promise<void> {
  try {
    await downloadCSV(SHEETS_URL, CSV_PATH);
    await processCSV();

    console.log("✅ i18n generation complete.");
  } catch (error) {
    console.error("❌ Failed to process i18n:", error);
    process.exit(1);
  }
}

i18nGenerator();
