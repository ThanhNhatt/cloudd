console.log("GATEWAY STARTED - TEST");

const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.use(cors());

// log request trước
app.use((req,res,next)=>{
  console.log("Gateway request:", req.method, req.url)
  next()
})


// ================= AUTH SERVICE =================
app.use(
  "/auth",
  createProxyMiddleware({
    target: "http://localhost:3002",
    changeOrigin: true,
    pathRewrite: {
      "^/auth": ""
    }
  })
);

// ================= STUDENT SERVICE =================
app.use(
  "/students",
  createProxyMiddleware({
    target: "http://localhost:3001",
    changeOrigin: true,
    pathRewrite: {
      "^/students": ""
    },
   
    onError: (err, req, res) => {
      console.error("Proxy error for /students:", err.message);
      res.status(500).send("Proxy error");
    }
  })
);

// ================= COURSES SERVICE =================
app.use(
  "/courses",
  createProxyMiddleware({
    target: "http://localhost:3003",
    changeOrigin: true,
    pathRewrite: {
      "^/courses": ""
    }
  })
);

// ================= ENROLLMENT SERVICE =================
app.use(
  "/enrollments",
  createProxyMiddleware({
    target: "http://localhost:3005",
    changeOrigin: true,
    pathRewrite: {
      "^/enrollments": ""
    }
  })
);

app.listen(5000, () => {
  console.log("API Gateway running on port 5000");
});