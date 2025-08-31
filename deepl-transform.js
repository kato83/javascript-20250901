import { readFileSync, writeFileSync } from 'node:fs';
import * as deepl from 'deepl-node';

const env = readFileSync('./.env', 'utf-8');
const { DEEPL_API_KEY } = Object.fromEntries(env.split(/\r\n|\r|\n/).map(row => row.split('=')))


const authKey = DEEPL_API_KEY; // Replace with your key
const translator = new deepl.Translator(authKey);

const input = readFileSync(process.argv[2], 'utf-8');
const target = process.argv[3];
const output = process.argv[4];

console.log(input,
  target,
  output);

const result = await translator.translateText(input, null, target.toLowerCase());
writeFileSync(output, result.text, 'utf-8');
console.log('翻訳完了');