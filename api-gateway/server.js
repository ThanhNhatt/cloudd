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
    target: "https://auth-services-otpw.onrender.com",
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
    target: "https://student-services-qme3.onrender.com",
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
    target: "https://course-services.onrender.com",
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
    target: "https://enrollment-services.onrender.com",
    changeOrigin: true,
    pathRewrite: {
      "^/enrollments": ""
    }
  })
);

app.listen(5000, () => {
  console.log("API Gateway running on port 5000");
});