## Tutorial links
Keith AI
opencode desktop - Multiple tasks running in parallel / review / MCPs
https://www.youtube.com/watch?v=WOOzCHaQipU


25min video:
Brandon Melville
https://www.youtube.com/watch?v=QzqaZshQcJI


Darren Builds - Series
https://www.youtube.com/watch?v=QnDpKxNe5UA&list=PLAIphj_4bMivPm5KCdvTsR4QP6zLkLJP_
GitHub
darrenhinde/OpenAgentsControl

AI-Assisted Coding Tutorial
freeCodeCamp.org - Beau Carnes
https://www.youtube.com/watch?v=wlpBCazAY9Q

Build a python coding Agent with Gemini
freeCodeCamp.org
https://www.youtube.com/watch?v=YtHdaXuOAks


## Claude Notes

Here's the honest picture on opencode + VSCode diff view:

## Native Diff View: Not Yet Available

Currently, opencode handles file diffs exclusively within the TUI. The VS Code native diff editor integration has been proposed as a feature request, but it's not yet implemented. So the side-by-side diff you're looking for — where VSCode's own diff editor opens showing the agent's proposed changes — doesn't exist as a built-in feature yet.

---

## What You *Can* Do Right Now

### 1. Use Git as Your Diff View
This is the most practical workaround:
- Make sure your project is a git repo with a clean working tree before running opencode
- After opencode makes changes, open the **Source Control panel** (`Ctrl+Shift+G`) in VSCode
- Click any modified file → VSCode opens its native side-by-side diff editor showing exactly what changed

### 2. Install the Official VSCode Extension
Search for **OpenCode** in the Extension Marketplace and click **Install**, or just run `opencode` in your integrated terminal and it installs automatically.

This gives you:
- `Cmd+Esc` (Mac) or `Ctrl+Esc` (Win/Linux) to open opencode in a split terminal view
- Context awareness — it can automatically share your current selection or active tab with opencode, and you can insert file references like `@File#L37-42` via `Cmd+Option+K` on macOS or `Alt+Ctrl+K` on Windows/Linux

But again, this doesn't yet give you a native VSCode diff pane — opencode's diffs still happen in the TUI.

### 3. Third-Party Extension: OpenCode UI
There's a community VS Code extension called **"OpenCode UI - AI Coding Agent"** that claims to add code diff and change list views. You can search for it in the marketplace (`TanShiyong.opencode-gui`). It's unofficial/community-built, so YMMV, but it's worth trying if the diff workflow is important to you.

### 4. Set VSCode as Your Editor for `/editor` Command
If you use opencode's `/editor` command from the TUI, you can make it open files in VSCode:

```bash
export EDITOR="code --wait"
```

The `--wait` flag matters because some editors fork and return immediately; opencode expects the process to block until you finish editing.

---

## Summary

| Feature                                     | Status |
|---|---|
| Native VSCode diff editor for agent changes | ❌ Not yet (feature requested) |
| Git Source Control diff (manual workaround) | ✅ Works great |
| Split terminal with opencode TUI            | ✅ Via official extension |
| Community diff extension                    | ⚠️ Unofficial, experimental |

The cleanest workflow today is: **run opencode → review changes via git diff in VSCode's Source Control panel**. It's not automatic, but it gets you the side-by-side view you want.

## About the editor configuration:
Esta configuración vincula el comando /editor de la terminal de OpenCode directamente con VSCode, permitiéndote editar archivos de forma mucho más cómoda que en la terminal básica. [1, 2] 
Aquí te explico qué hace cada parte:

* export EDITOR=: Le dice a tu sistema operativo (y a OpenCode) que tu editor de texto preferido por defecto es el que viene a continuación.
* "code ...": Es el comando para llamar a Visual Studio Code desde la terminal.
* --wait: Esta es la parte crítica. Obliga a la terminal a "esperar" a que cierres la pestaña o el archivo en VSCode antes de retomar el control. Sin esto, OpenCode pensaría que terminaste de editar en cuanto se abra la ventana, sin darte tiempo de escribir nada. [3, 4, 5, 6, 7] 

## Cómo aplicarlo:
Para que esto sea permanente y no tengas que escribirlo cada vez que abras la terminal, debes añadir esa línea a tu archivo de configuración de shell:

   1. Abre tu archivo de perfil (usualmente ~/.bashrc o ~/.zshrc) en tu terminal.
   2. Pega la línea export EDITOR="code --wait" al final.
   3. Reinicia la terminal o ejecuta source ~/.bashrc (o el que corresponda). [8, 9] 

Ahora, cuando estés en la interfaz de OpenCode y uses /editor, se te abrirá una pestaña de VSCode; al guardar y cerrar, OpenCode recibirá tus cambios automáticamente. [10, 11, 12] 
¿Te gustaría saber cómo verificar qué archivo de configuración (.bashrc o .zshrc) está usando tu terminal actualmente?

Esta configuración vincula el comando /editor de la terminal de OpenCode directamente con VSCode, permitiéndote editar archivos de forma mucho más cómoda que en la terminal básica. [1, 2] 
Aquí te explico qué hace cada parte:

* export EDITOR=: Le dice a tu sistema operativo (y a OpenCode) que tu editor de texto preferido por defecto es el que viene a continuación.
* "code ...": Es el comando para llamar a Visual Studio Code desde la terminal.
* --wait: Esta es la parte crítica. Obliga a la terminal a "esperar" a que cierres la pestaña o el archivo en VSCode antes de retomar el control. Sin esto, OpenCode pensaría que terminaste de editar en cuanto se abra la ventana, sin darte tiempo de escribir nada. [3, 4, 5, 6, 7] 

## Cómo aplicarlo:
Para que esto sea permanente y no tengas que escribirlo cada vez que abras la terminal, debes añadir esa línea a tu archivo de configuración de shell:

   1. Abre tu archivo de perfil (usualmente ~/.bashrc o ~/.zshrc) en tu terminal.
   2. Pega la línea export EDITOR="code --wait" al final.
   3. Reinicia la terminal o ejecuta source ~/.bashrc (o el que corresponda). [8, 9] 

Ahora, cuando estés en la interfaz de OpenCode y uses /editor, se te abrirá una pestaña de VSCode; al guardar y cerrar, OpenCode recibirá tus cambios automáticamente. [10, 11, 12] 

# ¿Te gustaría saber cómo verificar qué archivo de configuración (.bashrc o .zshrc) está usando tu terminal actualmente?

Para saber cuál estás usando, solo tienes que ejecutar este comando en tu terminal:

```bash
echo $SHELL
```

* Si el resultado termina en /bin/bash, tu archivo es ~/.bashrc.
* Si el resultado termina en /bin/zsh, tu archivo es ~/.zshrc.

## Cómo añadir la configuración rápido:
Una vez que sepas cuál es, puedes usar este comando (cambia .bashrc por .zshrc si es necesario) para añadir la línea sin abrir el editor manualmente:

```bash
echo 'export EDITOR="code --wait"' >> ~/.bashrc
```

Luego, aplica los cambios con source ~/.bashrc.

