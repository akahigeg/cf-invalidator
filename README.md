## なにか
* CloudFrontのキャッシュ削除をフォームから行うウェブアプリ
* 非技術者だがコンテンツのキャッシュ削除を行いたいユーザーを対象とする

## 画面構成
* Invalidation実行フォーム（一画面のみ）

## 入力項目
* ディストリビューションID
* アクセスキー
* シークレットキー
* パス

## IAMの設定
CloudFrontに対してInvalidationを作成する権限を持つユーザーを作成し、そのアクセスキーとシークレットキーを用いる。

以下はビジュアルエディタで作成したポリシー。リソースは制限できないので「"*"」となっている

    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Sid": "VisualEditor0",
                "Effect": "Allow",
                "Action": [
                    "cloudfront:GetInvalidation",
                    "cloudfront:CreateInvalidation"
                ],
                "Resource": "*"
            }
        ]
    }

## 他のCloudFrontのキャッシュ削除方法
基本的に技術者は他の手段の方が簡単なのでこのアプリを使う必要は無い。

### AWSコンソール
Invalidationのタブからポチポチと。

### AWS CLI
https://docs.aws.amazon.com/cli/latest/reference/cloudfront/create-invalidation.html
   
    aws cloudfront create-invalidation --distribution-id S11A16G5KZMEQD \
      --paths /index.html /error.html
