import * as vscode from "vscode";
import { SidebarProvider } from "./sidebarProvider";

export function activate(context: vscode.ExtensionContext) {
  // Register sidebar WebviewView
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(SidebarProvider.viewId, new SidebarProvider(context.extensionUri)),
  );

  // Register open command — accepts a BV ID string
  context.subscriptions.push(
    vscode.commands.registerCommand("biliPlayer.open", (bvid?: string) => {
      bvid = bvid?.trim() || "BV1xx411c7mD";

      const panel = vscode.window.createWebviewPanel("biliPlayer", `Bilibili: ${bvid}`, vscode.ViewColumn.One, {
        enableScripts: true,
      });

      panel.webview.html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta http-equiv="Content-Security-Policy"
    content="default-src 'none'; frame-src https://player.bilibili.com; style-src 'unsafe-inline';">
  <style>
    body { margin: 0; background: #000; display: flex; justify-content: center; align-items: center; height: 100vh; }
    iframe { width: 100%; aspect-ratio: 16/9; border: none; }
  </style>
</head>
<body>
  <iframe
    src="https://player.bilibili.com/player.html?bvid=${bvid}&autoplay=0&high_quality=1"
    allowfullscreen
    sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts allow-popups">
  </iframe>
</body>
</html>`;
    }),
  );
}

export function deactivate() {}
