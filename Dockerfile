FROM codercom/code-server:latest

# Pre-install VS Code extensions
RUN code-server --install-extension ms-python.python \
    && code-server --install-extension esbenp.prettier-vscode \
    && code-server --install-extension pkief.material-icon-theme \
    && code-server --install-extension ms-ceintl.vscode-language-pack-zh-hans

EXPOSE 8080
