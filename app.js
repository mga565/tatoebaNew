const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const dotenv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');

const AppError = require('./controllers/utils/appError');
const globalErrorHandler = require('./controllers/errorcontroller');

const viewRouter = require('./routers/viewrouter');
const authRouter = require('./routers/authrouter'); // Correctly named for authentication
const adminUserRouter = require('./routers/userrouter'); // For admin management of users
const subscriptionRouter = require('./routers/subscriptionrouter');
const referralRouter = require('./routers/referralrouter');
const settingsRouter = require('./routers/settingsrouter');
const pricingRouter = require('./routers/pricingrouter');

dotenv.config({ path: './config.env' });

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// 1. Security Middlewares
// Set security HTTP headers
app.use(helmet());

// Enable CORS
app.use(cors());

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Cookie parser
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS attacks
app.use(xss());

// Prevent parameter pollution
app.use(hpp());

// Rate limiting to prevent brute-force attacks
const limiter = rateLimit({
  max: 100, // max 100 requests per 15 minutes
  windowMs: 15 * 60 * 1000, // 15 minutes
  message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use('/api', limiter); // Apply to API routes

// Speed limiting to prevent brute-force attacks (for sensitive routes like login)
const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000, // 15 minutes
  delayAfter: 100, // Allow 100 requests per 15 minutes, then start slowing down
  delayMs: 500 // Add 500ms delay per request above 100
});
app.use('/api/v1/users/login', speedLimiter); // Apply only to login API route
app.use('/api/v1/users/forgotPassword', speedLimiter); // Apply to forgot password API route

// Routes
app.use('/', viewRouter);
app.use('/api/v1/users', authRouter); // API routes for user authentication (signup/login)
app.use('/api/v1/admin/users', adminUserRouter); // API routes for admin user management
app.use('/api/v1/subscriptions', subscriptionRouter);
app.use('/api/v1/referrals', referralRouter);
app.use('/api/v1/settings', settingsRouter);
app.use('/api/v1/packages', pricingRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handling middleware
app.use(globalErrorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
