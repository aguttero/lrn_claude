## Bun overview:
https://www.youtube.com/watch?v=M4TufsFlv_o


## Bun 1 hour tutorial
https://www.youtube.com/watch?v=eTB0UCDnMQo
Min 7.29
/bun-first

## Bun Udemy Claude Tutorial


## Install bun:
https://bun.com/docs/quickstart
https://bun.com/docs/installation


```bash
curl -fsSL https://bun.com/install | bash
# get message:
# Added "~/.bun/bin" to $PATH in "~/.zshrc" 
# To get started run:
 exec /bin/zsh 
  bun --help 
```

# Para agregar el directorio a las variables de entorno:
```bash
	echo 'export BUN_INSTALL="$HOME/.bun"' >> ~/.zshrc
	echo 'export PATH="$BUN_INSTALL/bin:$PATH"' >> ~/.zshrc
```
# Para que la terminal reconozca los cambios sin reset:
```bash
	source ~/.zshrc
```

## Install bun types for development
```bash
bun add -d @types/bun
```

## Crear un bun project
1. mkdir bun-first
2. cd bun-first
3. bun init
    define or accept default:
    * package name (bun-first)
    * entry poing (index.tx)
4. start -> bun run index.tx

# Create a web server



## Watch mode: (permite cambios al código sin tener que volver a ejecutar o cargar el server)
Similar a Node.js -> nodemon

Bun - - watch index.ts -> resetea la app entera

Bun — hot index.ts -> reload sin reset de los estados de los objetos globales
______

TypeScript Playground:
https://www.typescriptlang.org/play/

_________

Elysia
https://elysiajs.com/

Install
	bash
	bun create elysia <app-name>
