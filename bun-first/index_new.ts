const server = Bun.serve({
    port: 3000,
    fetch(req){
        const url = new URL(req.url)

        if(url.pathname === '/') {
            const body = "Hello this is the home page!"
            return new Response (body)
        }
        if(url.pathname === '/about') {
            const body = "About me page!"
            return new Response (body)
        }
        if(url.pathname === '/contact') {
            const body = "Contact me page!"
            return new Response (body)
        }
        // file stream
        if(url.pathname === '/text') {
            return new Response (Bun.file('./text_file.txt'))
        }

        // handle error
        if(url.pathname === '/feed') {
            throw new Error ('Could not fetch feed')
        }

        return new Response ('404!')
    },
    error(error){
        return new Response(`<pre> ${error} \n ${error.stack} </pre>`,{
            headers: {
                'Content-Type': 'text/html'
            }
        })
    }
})

console.log("Hello via Bun!");
console.log(`Listening on PORT http://localhost:${server.port}`)