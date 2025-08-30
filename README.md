# おまけ サーバーサイドのJavaScriptを動かしてみよう

## セットアップ

1. 当ページの `Code > Local > Download ZIP` より開発資材のダウンロードを行ってください
   ![](./_img/01.png)
2. ZIPファイルをデスクトップで解凍し、VSCodeを `javascript1.code-workspace` ファイルから開いてください。
3. VSCodeのメニューバーの `ターミナル > 新しいターミナル` よりWindowsのターミナル（PowerShell）をVSCode上で開き、以下のコマンドで正しく結果が出力されるかを確認してください。
   ```shel
   > node -v
   v22.19.0
   > npm -v
   10.9.3
   > node .\index.js
   Hello world!
   ```
   ![](./_img/02.png)

## nodeコマンドによるJSファイルの実行

ブラウザでは `<script>` タグでJSを実行していましたが、Node.js ではターミナル上で直接コマンドを使って実行します。

例: `hello.js` を作成し、以下を記述します。
```js
console.log("Hello from Node.js!");
```

実行:
```
node hello.js
```

### コマンドライン引数を受け取る

Node.js ではコマンドライン引数を `process.argv` から取得できます。

例: `greet.js`
```js
process.argv[0]; // → Node.js 実行ファイルのパス
process.argv[1]; // → 実行中のスクリプトファイルのパス
process.argv[2]; // 以降 → コマンドに渡した引数

const args = process.argv.slice(2); // 2番目以降を取り出す
const name = args[0] ?? "名無し";

console.log(`Hello, ${name}!`);
```
実行:
```
node greet.js Kato
```
出力例:
```
Hello, Kato!
```

### 練習問題

1. `echo.js` を作成し、渡された引数をすべて表示するプログラムを書いてみましょう。
   * 実行例:
     ```
     node echo.js apple banana orange
     ```
     出力例:
     ```
     apple
     banana
     orange
     ```
2. `calc.js` を作成し、次のようにコマンドライン引数を使って足し算をするプログラムを書いてみましょう。
   * 実行例:
     ```
     node calc.js 10 20
     ```
     出力例:
     ```
     結果: 30
     ```
3. 上記の `calc.js` を改造して、3つ以上の数を入力したときも合計できるようにしてみましょう。


## JavaScriptファイルの分割とimport及びexport

Node.js では、ファイルを分割してモジュールとして利用することができます。
ブラウザで `type="module"` を利用したのと同じように、`export` と `import` を使います。

### 例: 足し算関数を別ファイルに分割する

`math.js`

```js
export function add(a, b) {
  return a + b;
}
```

`main.js`

```js
import { add } from "./math.js";

console.log(add(2, 3)); // 5
```

実行:

```shell
node main.js
```

### 練習問題

1. `math.js` に「引き算」「掛け算」「割り算」の関数を追加してみましょう。
2. `main.js` からそれぞれ呼び出して結果を出力してみましょう。

## ファイルの読み書き

Node.js にはファイルを扱うための組み込みモジュール `fs` があります。

### 例: テキストファイルの読み込み

`read.js`

```js
import { readFileSync } from "node:fs";

const data = readFileSync("sample.txt", "utf-8");
console.log("読み込んだ内容:", data);
```

### 例: ファイルへの書き込み

`write.js`

```js
import { writeFileSync } from "node:fs";

writeFileSync("output.txt", "Hello Node.js!");
console.log("output.txt に書き込みました");
```

### 練習問題

1. `memo.txt` に「今日の授業楽しかった」と書き込むプログラムを作ってください。
2. その後、書き込んだ内容を読み出してターミナルに表示してください。

## ライブラリの利用

Node.js では `npm` を使って外部ライブラリを追加できます。

### 例: 日付操作ライブラリ `dayjs` の利用

```shell
npm install dayjs
```

`date.js`

```js
import dayjs from "dayjs";

console.log("現在の日時:", dayjs().format("YYYY-MM-DD HH:mm:ss"));
```

実行:

```shell
node date.js
```

### 練習問題

1. `dayjs` を使って、自分の誕生日が今年は何曜日かを出力するプログラムを作りましょう。

   * ヒント: `dayjs("2025-01-01").format("dddd")`
2. 今日から100日後の日付を出力してみましょう。

## テストコードの作成

本格的な開発では「テストコード」を書いて動作確認をします。Node.js には組み込みのテストランナーがあります。

### 例: 簡単なテスト

`math.js`

```js
export function add(a, b) {
  return a + b;
}
```

`math.test.js`

```js
import { test } from "node:test";
import assert from "node:assert";
import { add } from "./math.js";

test("add 関数のテスト", () => {
  assert.strictEqual(add(2, 3), 5);
});
```

実行:

```shell
node --test
```

### 練習問題

1. `math.js` にある「引き算」「掛け算」「割り算」の関数もテストしてみましょう。
2. 割り算の時に `0` で割ろうとしたらエラーになるかどうかをテストしてみましょう。
