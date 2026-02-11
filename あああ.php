<?php
/**
 * お問い合わせフォーム ハンドラー
 * 目的: フォームデータの受信、バリデーション、CSV保存、完了通知
 */

// セッション開始（二重送信防止などに利用可能）
session_start();

// 設定: 保存先のCSVファイル名
define('DATA_FILE', 'contact_log.csv');

// レスポンスの初期化
$errors = [];
$success = false;

// 1. POSTリクエストのみ受け付ける
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // 2. 入力データの取得とサニタイズ（安全化）
    $name    = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_SPECIAL_CHARS);
    $email   = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_SPECIAL_CHARS);

    // 3. バリデーション（入力チェック）
    if (empty($name)) {
        $errors['name'] = 'お名前を入力してください。';
    }

    if (empty($email)) {
        $errors['email'] = 'メールアドレスを入力してください。';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = '正しいメールアドレスの形式で入力してください。';
    }

    if (empty($message)) {
        $errors['message'] = 'お問い合わせ内容を入力してください。';
    } elseif (mb_strlen($message) > 500) {
        $errors['message'] = 'お問い合わせ内容は500文字以内で入力してください。';
    }

    // 4. エラーがなければ保存処理
    if (empty($errors)) {
        $timestamp = date('Y-m-d H:i:s');
        $ip_address = $_SERVER['REMOTE_ADDR'];

        // 保存するデータ配列
        $data = [$timestamp, $name, $email, $message, $ip_address];

        // ファイルを追記モードで開く
        $file = fopen(DATA_FILE, 'a');

        // ログファイルに処理状況を記録
        $log_message = "Contact form submission - Name: {$name}, Email: {$email}, IP: {$ip_address}, Time: {$timestamp}";
        error_log($log_message, 3, 'contact_form.log');
        
        if ($file) {
            // 文字化け対策（Excelで見れるようにShift-JISに変換する場合が多い）
            mb_convert_variables('SJIS-win', 'UTF-8', $data);
            
            // CSV形式で書き込み
            fputcsv($file, $data);
            fclose($file);
            $success = true;
        } else {
            $errors['system'] = 'システムエラーが発生しました。時間を置いて再度お試しください。';
        }
    }
}

/**
 * 簡易的な表示用HTML（本来は別ファイルにするのが理想）
 */
?>
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>送信結果 | Flower Site</title>
    <style>
        body { font-family: sans-serif; line-height: 1.6; color: #333; padding: 50px; text-align: center; }
        .container { max-width: 500px; margin: 0 auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px; }
        .error { color: #d9534f; background: #f2dede; padding: 10px; margin-bottom: 20px; border-radius: 4px; }
        .success { color: #5cb85c; background: #dff0d8; padding: 20px; border-radius: 4px; }
        .back-btn { display: inline-block; margin-top: 20px; text-decoration: none; color: #666; border: 1px solid #ccc; padding: 10px 20px; border-radius: 4px; }
    </style>
</head>
<body>
    <div class="container">
        <?php if ($success): ?>
            <div class="success">
                <h2>送信完了</h2>
                <p>お問い合わせありがとうございました。<br>内容を確認の上、担当者よりご連絡いたします。</p>
            </div>
            <a href="index.html" class="back-btn">サイトへ戻る</a>
        <?php else: ?>
            <h2>送信エラー</h2>
            <?php if (!empty($errors)): ?>
                <div class="error">
                    <?php foreach ($errors as $error): ?>
                        <p><?php echo $error; ?></p>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>
            <a href="javascript:history.back();" class="back-btn">入力画面に戻る</a>
        <?php endif; ?>
    </div>
</body>
</html>