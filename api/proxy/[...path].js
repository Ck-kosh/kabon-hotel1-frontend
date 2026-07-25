export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.status(204)
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
    res.end()
    return
  }

  const requestUrl = new URL(req.url || '/', 'https://localhost')
  const path = requestUrl.pathname.replace(/^\/api\/proxy\/?/, '/')
  const backendBase = process.env.BACKEND_URL || 'https://kabon-hotel1-backend.onrender.com/api'
  const upstreamUrl = new URL(`${backendBase}${path}${requestUrl.search}`)

  const headers = { ...(req.headers || {}) }
  delete headers.host
  delete headers.connection

  let body
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    if (typeof req.body === 'string') {
      body = req.body
    } else if (req.body && typeof req.body === 'object') {
      body = JSON.stringify(req.body)
      headers['content-type'] = headers['content-type'] || 'application/json'
    }
  }

  const upstreamResponse = await fetch(upstreamUrl, {
    method: req.method,
    headers,
    body,
  })

  const responseText = await upstreamResponse.text()

  res.status(upstreamResponse.status)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
  res.setHeader('Cache-Control', 'no-store')

  const contentType = upstreamResponse.headers.get('content-type')
  if (contentType) {
    res.setHeader('Content-Type', contentType)
  }

  res.send(responseText)
}
