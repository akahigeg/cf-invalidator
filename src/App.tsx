import * as React from "react";
import "./App.css";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import * as AWS from "aws-sdk";

import { Form, Button, Container, Message } from "semantic-ui-react";
import Cookies from "universal-cookie";
const cookies = new Cookies();

interface AppState {
  distribution_id: string;
  access_key: string;
  secret_key: string;
  path: string;
  submit_result: string;
}

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      distribution_id: cookies.get("distribution_id") || "",
      access_key: cookies.get("access_key") || "",
      secret_key: cookies.get("secret_key") || "",
      path: cookies.get("path") || "",
      submit_result: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange = (event: any) => {
    this.setState({ [event.target.name]: event.target.value } as AppState);
    cookies.set(event.target.name, event.target.value, { path: "/" });
  };

  handleSubmit = (event: any) => {
    const cloudfront = new AWS.CloudFront({
      apiVersion: "2018-11-05",
      accessKeyId: this.state.access_key,
      secretAccessKey: this.state.secret_key
    });

    const params = {
      DistributionId: this.state.distribution_id,
      InvalidationBatch: {
        CallerReference: String(new Date().getTime()),
        Paths: { Quantity: 1, Items: [this.state.path] }
      }
    };
    cloudfront.createInvalidation(params, (err, data) => {
      if (err) {
        console.log(err, err.stack);
        this.setState({ submit_result: "fail" });
      } else {
        console.log(data);
        this.setState({ submit_result: "success" });
      }
    });
  };

  public render() {
    return (
      <div>
        <SiteHeader />
        <Container className="site-content">
          <Form className="cf-invalidator">
            <Form.Input
              name="distribution_id"
              label="Distribution ID"
              type="text"
              value={this.state.distribution_id}
              onChange={this.handleInputChange}
            />
            <Form.Input
              name="access_key"
              label="Access Key"
              type="text"
              value={this.state.access_key}
              onChange={this.handleInputChange}
            />
            <Form.Input
              name="secret_key"
              label="Secret Key"
              type="text"
              value={this.state.secret_key}
              onChange={this.handleInputChange}
            />
            <Form.Input
              name="path"
              label="Path"
              type="text"
              value={this.state.path}
              onChange={this.handleInputChange}
              placeholder="/*"
            />
            <div className="button-area">
              <Button type="submit" onClick={this.handleSubmit}>
                キャッシュを削除
              </Button>
            </div>
            {this.state.submit_result === "success" && (
              <Message header="キャッシュの削除をリクエストしました" content="削除の完了まで数分程度お待ちください。" />
            )}
            {this.state.submit_result === "fail" && (
              <Message header="キャッシュの削除に失敗しました" content="ディストリビューションIDやアクセスキーなどに入力間違いがないかどうかご確認ください。" />
            )}
          </Form>
        </Container>
        <SiteFooter />
      </div>
    );
  }
}

export default App;
