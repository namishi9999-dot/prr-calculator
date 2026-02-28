# プラズマリフィリングレート計算ツール
## Plasma Refilling Rate (PRR) Calculator

透析治療中のプラズマリフィリングレートを計算するWebアプリです。

## 使い方

1. **循環血液量の算出方法を選択**
   - `体重 ÷ 13`（標準推算式）
   - `体重の X %`（割合を自由に指定）

2. **患者情報を入力**
   - 体重（kg）
   - ΔBV%（血液量変化率）
   - 経過時間（治療開始からの時間）

3. **計算ボタンを押す**
   - PRR（mL/hour）
   - PRR（mL/min）
   が表示されます。

## 計算式

```
BV₀(mL) = 体重 ÷ 13 × 1000  または  体重 × X% × 1000
ΔBV(mL) = (ΔBV% ÷ 100) × BV₀
PRR(mL/hr) = ΔBV ÷ 経過時間
PRR(mL/min) = PRR(mL/hr) ÷ 60
```

## 公開URL

GitHub Pages: https://&lt;username&gt;.github.io/prr-calculator/
