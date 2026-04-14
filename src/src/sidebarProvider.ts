import * as fs from "node:fs";
import * as path from "node:path";
import * as vscode from "vscode";

export class SidebarProvider implements vscode.WebviewViewProvider {
  public static readonly viewId = "biliPlayer.sidebar";
  private _view?: vscode.WebviewView;

  constructor(private readonly _extensionUri: vscode.Uri) {}

  resolveWebviewView(webviewView: vscode.WebviewView) {
    this._view = webviewView;

    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this._extensionUri],
    };

    webviewView.webview.html = this._getHtml(webviewView.webview);

    webviewView.webview.onDidReceiveMessage((msg) => {
      switch (msg.command) {
        case "openVideo":
          vscode.commands.executeCommand("biliPlayer.open", msg.bvid);
          break;
      }
    });
  }

  private _getHtml(webview: vscode.Webview): string {
    const htmlPath = path.join(this._extensionUri.fsPath, "webview", "sidebar.html");
    return fs.readFileSync(htmlPath, "utf8");
  }
}
