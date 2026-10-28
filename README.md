# つっくん本人確認ページ

Discord サーバー内の本人確認方法と、サーバーが利用できなくなった場合に案内する臨時確認方法を掲載する静的サイトです。GitHub Pages で配信できます。

## 通常時の確認方法

当サーバーで「つっくん本人」ロールが付与されていることだけを本人確認の条件とします。名前、プロフィール、DMなどは確認方法として扱いません。

## サーバー停止時の案内を更新する

`identity.js` の `verificationConfig` を編集します。ページは Discord ウィジェット画像の読み込み可否で現行サーバーの状態を確認し、設定したサーバー名と本人確認方法を表示します。ウィジェットを確認できない場合は、削除またはウィジェット停止の可能性を表示して予備サーバーへ案内します。通信障害も同様に確認できない状態になるため、削除と断定はしません。

- `currentServerId`: 現行サーバーのID（ウィジェットと一致させる）
- `currentServerName`: 本人確認方法に表示するサーバー名。サーバー名を変更したら更新します
- `fallbackMethod`: このサイトに掲載する新しい本人確認方法
- `backupServerUrl`: 予備サーバーの招待リンク

臨時の方法がないときは `fallbackMethod` を空欄にします。新しい方法を掲載したら、変更を `main` ブランチへ push すると GitHub Pages に反映されます。

## GitHub Pages への公開

- このフォルダの内容を GitHub リポジトリの `main` ブランチへ push します。
- リポジトリの **Settings → Pages → Build and deployment** で **GitHub Actions** を選択します。
- `.github/workflows/pages.yml` が実行されると、Actions の実行結果に公開 URL が表示されます。
- サーバーが使える間にページの URL を案内し、利用者にも保存してもらいます。

GitHub Pages の URL は通常 `https://<GitHubユーザー名>.github.io/<リポジトリ名>/` です。

左上のプロフィール画像は `assets/tsukkun-profile.png` です。差し替える場合は同じファイル名で置き換えてください。

