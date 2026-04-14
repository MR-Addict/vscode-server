FROM codercom/code-server:latest

# Pre-install VS Code extensions
RUN code-server --install-extension ms-python.python \
    && code-server --install-extension esbenp.prettier-vscode \
    && code-server --install-extension pkief.material-icon-theme \
    && code-server --install-extension ms-ceintl.vscode-language-pack-zh-hans

# Install custom Bilibili Player extension
COPY src/dist/bili-player.vsix /tmp/bili-player.vsix
RUN code-server --install-extension /tmp/bili-player.vsix

EXPOSE 8080
