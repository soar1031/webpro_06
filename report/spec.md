# アプリケーション仕様書

今回の課題では、以下の3つのWebアプリケーションを作成した。
すべてのアプリで「一覧・詳細・登録・編集・削除」のCRUD機能を実装している。

---

## 1. ミステリー小説管理アプリ
おすすめのミステリー小説を管理・共有するためのアプリケーション。

### データ構造
変数名: `mysteries`
| ID | 変数名 | 型 | 説明 |
|:--|:--|:--|:--|
| 1 | `id` | int | ID (自動連番) |
| 2 | `title` | String | 小説のタイトル |
| 3 | `author` | String | 著者名 |
| 4 | `detective` | String | 探偵役の名前 |
| 5 | `comment` | String | 感想・メモ |

### API (URL設計)
| 機能 | URL | メソッド | 説明 |
|:--|:--|:--|:--|
| 一覧表示 | `/novels` | GET | 小説リストを表示 |
| 詳細表示 | `/novels/:id` | GET | 指定IDの詳細を表示 |
| 新規登録 | `/novels/create` | GET | 登録フォームを表示 |
| 登録処理 | `/novels` | POST | データを追加 |
| 編集画面 | `/novels/edit/:id` | GET | 編集フォームを表示 |
| 更新処理 | `/novels/update/:id` | POST | データを更新 |
| 削除処理 | `/novels/delete/:id` | GET | データを削除 |

---

## 2. 映画レビュー管理アプリ
映画の公開年や5段階評価を記録するアプリケーション。

### データ構造
変数名: `movies`
| ID | 変数名 | 型 | 説明 |
|:--|:--|:--|:--|
| 1 | `id` | int | ID |
| 2 | `title` | String | 映画タイトル |
| 3 | `year` | int | 公開年 |
| 4 | `rating` | int | 評価 (1-5) |
| 5 | `review` | String | 感想 |

### API (URL設計)
| 機能 | URL | メソッド | 説明 |
|:--|:--|:--|:--|
| 一覧表示 | `/movies` | GET | 映画リストを表示 |
| 詳細表示 | `/movies/:id` | GET | 詳細を表示 |
| 新規登録 | `/movies/create` | GET | 登録フォームを表示 |
| 登録処理 | `/movies` | POST | データを追加 |
| 編集画面 | `/movies/edit/:id` | GET | 編集フォームを表示 |
| 更新処理 | `/movies/update/:id` | POST | データを更新 |
| 削除処理 | `/movies/delete/:id` | GET | データを削除 |

---

## 3. 筋トレ記録アプリ
日々のトレーニング種目、重量、回数を記録するアプリケーション。

### データ構造
変数名: `trainings`
| ID | 変数名 | 型 | 説明 |
|:--|:--|:--|:--|
| 1 | `id` | int | ID |
| 2 | `menu` | String | トレーニング種目 |
| 3 | `weight` | int | 重量 (kg) |
| 4 | `reps` | int | 回数 |
| 5 | `date` | String | 実施日 (YYYY-MM-DD) |

### API (URL設計)
| 機能 | URL | メソッド | 説明 |
|:--|:--|:--|:--|
| 一覧表示 | `/training` | GET | 記録リストを表示 |
| 詳細表示 | `/training/:id` | GET | 詳細を表示 |
| 新規登録 | `/training/create` | GET | 登録フォームを表示 |
| 登録処理 | `/training` | POST | データを追加 |
| 編集画面 | `/training/edit/:id` | GET | 編集フォームを表示 |
| 更新処理 | `/training/update/:id` | POST | データを更新 |
| 削除処理 | `/training/delete/:id` | GET | データを削除 |

---

## 4. 画面遷移図 (Mermaid)
3つのアプリ共通の画面遷移フローを以下に示す。

```mermaid
stateDiagram-v2
    [*] --> 一覧画面
    一覧画面 --> 詳細画面: [詳細を見る]
    一覧画面 --> 新規登録画面: [新規登録]
    
    新規登録画面 --> 一覧画面: [登録]ボタン(POST)
    
    詳細画面 --> 編集画面: [編集する]
    詳細画面 --> 一覧画面: [削除する] (削除処理後リダイレクト)
    詳細画面 --> 一覧画面: [戻る]
    
    編集画面 --> 一覧画面: [更新]ボタン(POST)