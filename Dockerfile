FROM codercom/code-server:latest

USER coder

# Pre-install VS Code extensions
RUN code-server --install-extension ms-python.python \
    && code-server --install-extension esbenp.prettier-vscode \
    && code-server --install-extension PKief.material-icon-theme \
    && code-server --install-extension MS-CEINTL.vscode-language-pack-zh-hans

# Apply code-server configuration
COPY --chown=coder:coder config/config.yaml /home/coder/.config/code-server/config.yaml

EXPOSE 8080
