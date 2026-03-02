# Search & Explore Feature - Setup & Testing Guide

## ✅ Changes Made

### Backend Files Created/Updated:
1. **`backend/models/search.model.js`** - Search schema
2. **`backend/controllers/search.controller.js`** - Search, Posts search, and Explore controllers with logging
3. **`backend/routes/search.route.js`** - API routes with test endpoint
4. **`backend/index.js`** - Route registration
5. **`backend/models/post.model.js`** - Added timestamps

### Frontend Files Created/Updated:
1. **`frontend/src/components/Search.jsx`** - Improved search component with:
   - User search with profile navigation
   - Post search
   - Better UI (Instagram-style)
   - Console logging for debugging

2. **`frontend/src/components/Explore.jsx`** - Improved explore component with:
   - All posts display
   - Grid layout (Instagram-style)
   - Hover effects with stats
   - Profile navigation

3. **`frontend/src/components/MainLayout.jsx`** - Fixed layout styling
4. **`frontend/src/App.jsx`** - Route registration

---

## 🧪 Testing Steps

### Step 1: Test Backend API
Open browser console and test these endpoints:

```bash
# Test if search routes exist
http://localhost:8000/api/v1/search/test

# Test explore (you need authentication cookies)
http://localhost:8000/api/v1/search/explore

# Test user search
http://localhost:8000/api/v1/search/users?query=john

# Test post search
http://localhost:8000/api/v1/search/posts?query=travel
```

### Step 2: Check Browser Console
1. Open **DevTools** (F12)
2. Go to **Console** tab
3. Click Search or Explore in sidebar
4. You should see logs like:
   ```
   Fetching: http://localhost:8000/api/v1/search/explore
   Response: {success: true, posts: [...]}
   ```

### Step 3: Check Network Tab
1. Go to **Network** tab in DevTools
2. Click Search/Explore
3. Look for requests to `/api/v1/search/*`
4. Check Status code (should be 200)

### Step 4: Backend Logs
Check your Node.js terminal where the backend is running. You should see:
```
[EXPLORE] Fetching all posts
[EXPLORE] Found: 5 posts
```

---

## 🔍 If Data Is Not Showing

### Check These:
1. **Database Connection**
   - Verify MongoDB is running
   - Check if `Post` and `User` collections have data

2. **API Response**
   - Open DevTools → Network
   - Check the response JSON

3. **CORS Issues**
   - Check if frontend URL matches CORS allowedOrigins in index.js

4. **API URL**
   - Verify VITE_API_URL environment variable or default (http://localhost:8000)

---

## 📝 Features Working

✅ Search Users - Find users by username or bio
✅ Search Posts - Find posts by caption
✅ Explore - View all posts in grid layout
✅ User Profile Navigation - Click avatars to go to profiles
✅ Instagram-style UI - Similar to original Instagram
✅ Hover Effects - See likes/comments on hover
✅ Error Handling - Toast notifications for errors

---

## 🚀 API Endpoints

```
GET /api/v1/search/users?query=<search>
GET /api/v1/search/posts?query=<search>
GET /api/v1/search/explore
```

All endpoints require authentication (cookies)

---

## 💡 Troubleshooting

**Issue: "No users found" / "No posts found"**
- Add sample data to your database first
- Or check if the query is matching any records

**Issue: API returns 401 Unauthorized**
- Make sure you're logged in
- Check if cookies are being sent with requests

**Issue: Component not displaying**
- Check browser console for errors
- Verify MainLayout styling
- Clear browser cache and refresh

---

## 📱 UI Features

### Search Component:
- Toggle between Users/Posts search
- Real-time search as you type
- Click user to visit profile
- Grid layout for posts
- Clear search button (X)

### Explore Component:
- All posts from database
- 4-column grid layout
- Hover to see likes/comments
- Click username to visit profile
- Responsive design

---

For more details, check the component code in:
- `frontend/src/components/Search.jsx`
- `frontend/src/components/Explore.jsx`
- `backend/controllers/search.controller.js`
