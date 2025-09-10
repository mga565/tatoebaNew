const catchAsync = require('./utils/catchAsync');

exports.getOverview = catchAsync(async (req, res, next) => {
  res.status(200).render('home', {
    title: 'Anki Go - Home'
  });
});

exports.getSignupForm = (req, res) => {
  res.status(200).render('signup', {
    title: 'Anki Go - Sign Up'
  });
};

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Anki Go - Log In'
  });
};

exports.getForgotPasswordForm = (req, res) => {
  res.status(200).render('forgot-password', {
    title: 'Anki Go - Forgot Password'
  });
};

exports.getResetPasswordForm = (req, res) => {
  res.status(200).render('reset-password', {
    title: 'Anki Go - Reset Password',
    token: req.params.token
  });
};

exports.getSuperAdminDashboard = (req, res) => {
  res.status(200).render('dashboard-superadmin', {
    title: 'Anki Go - Super Admin Dashboard'
  });
};

exports.getSuperAdminSubscriptions = (req, res) => {
  res.status(200).render('superadmin-subscriptions', {
    title: 'Anki Go - Super Admin - Subscriptions'
  });
};

exports.getSuperAdminUsers = (req, res) => {
  res.status(200).render('superadmin-users', {
    title: 'Anki Go - Super Admin - Users'
  });
};

exports.getSuperAdminResolutionCenter = (req, res) => {
  res.status(200).render('superadmin-resolution-center', {
    title: 'Anki Go - Super Admin - Resolution Center'
  });
};

exports.getSuperAdminReferrals = (req, res) => {
  res.status(200).render('superadmin-referrals', {
    title: 'Anki Go - Super Admin - Referrals'
  });
};

exports.getSuperAdminSiteSettings = (req, res) => {
  res.status(200).render('superadmin-site-settings', {
    title: 'Anki Go - Super Admin - Site Settings'
  });
};

exports.getSuperAdminPackages = (req, res) => {
  res.status(200).render('superadmin-packages', {
    title: 'Anki Go - Super Admin - Packages'
  });
};

exports.getSuperAdminAnalytics = (req, res) => {
  res.status(200).render('superadmin-analytics', {
    title: 'Anki Go - Super Admin - Analytics'
  });
};

exports.getUserDashboard = (req, res) => {
  res.status(200).render('dashboard-user', {
    title: 'Anki Go - User Dashboard'
  });
};

exports.getUserSubscriptionHistory = (req, res) => {
  res.status(200).render('user-subscription-history', {
    title: 'Anki Go - User - Subscription History'
  });
};

exports.getUserMessages = (req, res) => {
  res.status(200).render('user-messages', {
    title: 'Anki Go - User - Messages'
  });
};

exports.getUserProfile = (req, res) => {
  res.status(200).render('user-profile', {
    title: 'Anki Go - User - Profile'
  });
};

exports.getUserBilling = (req, res) => {
  res.status(200).render('user-billing', {
    title: 'Anki Go - User - Billing'
  });
};

exports.getUserReferrals = (req, res) => {
  res.status(200).render('user-referrals', {
    title: 'Anki Go - User - Referrals'
  });
};

exports.getErrorPage = (req, res) => {
  res.status(200).render('error', {
    title: 'Anki Go - Error',
    statusCode: req.statusCode || 500,
    message: req.message || 'Something went wrong!'
  });
};

exports.getSuccessPage = (req, res) => {
  res.status(200).render('success', {
    title: 'Anki Go - Success',
    message: req.message || 'Your action was completed successfully.'
  });
};

exports.getOffloadingPage = (req, res) => {
  res.status(200).render('offloading', {
    title: 'Anki Go - Processing'
  });
};

exports.getPricingPage = (req, res) => {
  res.status(200).render('pricing', {
    title: 'Anki Go - Pricing'
  });
};

exports.getDetailsPage = (req, res) => {
  res.status(200).render('details', {
    title: 'Anki Go - Details',
    itemId: req.params.id,
    itemName: 'Sample Item',
    itemDescription: 'This is a sample description for the item.',
    itemStatus: 'Active'
  });
};

exports.getSubscriptionPage = (req, res) => {
  res.status(200).render('subscription', {
    title: 'Anki Go - Subscription',
    planName: 'Premium',
    status: 'Active',
    startDate: '2023-01-01',
    endDate: '2024-01-01',
    price: '19.99',
    features: ['Unlimited Decks', 'Unlimited Cards', 'AI Assistant', 'Advanced Analytics']
  });
};
