## なにか
* CloudFrontのキャッシュ削除をフォームから行うウェブアプリ
* 非技術者だがコンテンツのキャッシュ削除を行いたいユーザーを対象とする

## 画面構成
* Invalidation実行フォーム（一画面のみ）

## 入力項目
* ACCESSキー
* SECRETキー
* パス

## I AMの設定
* 該当のCloudFrontのディストリビューションに対してInvalidationを作成する権限を持つ

## 他のCloudFrontのキャッシュ削除方法
基本的に技術者は他の手段の方が簡単なのでこのアプリを使う必要は無い。

### AWSコンソール
Invalidationのタブからポチポチと。

### AWS CLI
https://docs.aws.amazon.com/cli/latest/reference/cloudfront/create-invalidation.html
   
    aws cloudfront create-invalidation --distribution-id S11A16G5KZMEQD \
      --paths /index.html /error.html

### API
https://docs.aws.amazon.com/ja_jp/cloudfront/latest/APIReference/Welcome.html

    POST /2018-11-05/distribution/DistributionId/invalidation HTTP/1.1
    <?xml version="1.0" encoding="UTF-8"?>
    <InvalidationBatch xmlns="http://cloudfront.amazonaws.com/doc/2018-11-05/">
       <CallerReference>string</CallerReference>
       <Paths>
          <Items>
             <Path>string</Path>
          </Items>
          <Quantity>integer</Quantity>
       </Paths>
    </InvalidationBatch>

* POSTで
* RequestBodyはXML