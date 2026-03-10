const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.use(express.json());

app.use(cors({
  origin: "https://frontend-toee.onrender.com",
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"]
}));

// log request
app.use((req, res, next) => {
  console.log("Gateway request:", req.method, req.url);
  next();
});

// AUTH SERVICE
app.use("/auth",
  createProxyMiddleware({
    target: "https://auth-services-otpw.onrender.com",
    changeOrigin: true,
    pathRewrite: { "^/auth": "" }
  })
);

// STUDENT SERVICE
app.use("/students",
  createProxyMiddleware({
    target: "https://student-services-qme3.onrender.com",
    changeOrigin: true,
    pathRewrite: { "^/students": "" }
  })
);

// COURSE SERVICE
app.use("/courses",
  createProxyMiddleware({
    target: "https://course-services.onrender.com",
    changeOrigin: true,
    pathRewrite: { "^/courses": "" }
  })
);

// ENROLLMENT SERVICE
app.use("/enrollments",
  createProxyMiddleware({
    target: "https://enrollment-services.onrender.com",
    changeOrigin: true,
    pathRewrite: { "^/enrollments": "" }
  })
);

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("API Gateway running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("API Gateway running on port", PORT);
});