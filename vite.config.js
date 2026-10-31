import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import wakatimeHandler from './api/wakatime.js'
import githubHandler from './api/github.js'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  Object.assign(process.env, env)

  const apiDevPlugin = () => ({
    name: 'api-dev-server',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = new URL(req.url, 'http://localhost')
        if (url.pathname === '/api/wakatime') {
          const mockRes = {
            status(code) {
              res.statusCode = code
              return this
            },
            setHeader(name, val) {
              res.setHeader(name, val)
              return this
            },
            json(data) {
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify(data))
            },
          }
          try {
            await wakatimeHandler(req, mockRes)
          } catch (e) {
            res.statusCode = 500
            res.end(JSON.stringify({ error: e.message }))
          }
          return
        }

        if (url.pathname === '/api/github') {
          const mockRes = {
            status(code) {
              res.statusCode = code
              return this
            },
            setHeader(name, val) {
              res.setHeader(name, val)
              return this
            },
            json(data) {
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify(data))
            },
          }
          try {
            await githubHandler(req, mockRes)
          } catch (e) {
            res.statusCode = 500
            res.end(JSON.stringify({ error: e.message }))
          }
          return
        }

        next()
      })
    },
  })

  return {
    base: '/',
    plugins: [react(), tailwindcss(), apiDevPlugin()],
  }
})
