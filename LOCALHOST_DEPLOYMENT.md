# 🚀 ATOMBERG APP - LOCAL DEPLOYMENT GUIDE

## Quick Start (5 minutes)

### Prerequisites
- **Node.js 18+** (Download from https://nodejs.org)
- **Terminal/Command Prompt**
- **Internet connection**

---

## Step 1: Check Node.js Installation

Open terminal and run:

```bash
node --version
npm --version
```

Both should show versions 18+. If not, download Node.js from https://nodejs.org

---

## Step 2: Clone the Repository

```bash
git clone https://github.com/ayushdhore16/atomberg-app.git
cd atomberg-app
```

Or if you have it locally:

```bash
cd d:\atomberg-app
```

---

## Step 3: Install Dependencies

```bash
npm install
```

This downloads all required packages (takes 2-3 minutes).

---

## Step 4: Run Development Server

```bash
npm run dev
```

You should see:

```
▲ Next.js 16.0.8
- Local:        http://localhost:3000
- Ready in 1335ms
```

---

## Step 5: Open in Browser

1. Click: http://localhost:3000
2. Or type in browser address bar: `http://localhost:3000`

---

## Step 6: Login

Enter credentials:
- **API Key:** `abc`
- **Refresh Token:** `abc`

Click **Login**

---

## Using the App

### Dashboard Features:

1. **Add Fan** (Green Button)
   - Click "➕ Add Fan"
   - Enter device name
   - Select device type
   - Click "Add Fan"

2. **Delete Fan** (Red Button)
   - Click "🗑️ Delete Fan"
   - Select device to delete
   - Confirm deletion

3. **Control Device** (Blue Button)
   - Click "⚡ Control Fan"
   - Adjust power, speed, brightness, timer
   - Changes update instantly

4. **Interactive Logo**
   - Click Atomberg logo (yellow fan)
   - Watch it spin! 🔄

---

## Features to Test

✅ Login with abc/abc  
✅ Add a new fan  
✅ Delete a fan  
✅ Control device (power on/off)  
✅ Adjust speed (0-5)  
✅ Adjust brightness (0-5)  
✅ Set timer (0-60 min)  
✅ View real-time statistics  
✅ Click logo animation  
✅ Mobile responsive design  

---

## Stop the Server

Press `Ctrl + C` in terminal

---

## Production Build (Optional)

To build for production:

```bash
npm run build
npm run start
```

Visit: http://localhost:3000

---

## Troubleshooting

### "Port 3000 already in use"
```bash
npm run dev -- -p 3001
# Then visit: http://localhost:3001
```

### "npm: command not found"
- Install Node.js again from https://nodejs.org
- Restart terminal after installation

### "Module not found"
```bash
rm -r node_modules package-lock.json
npm install
npm run dev
```

### Can't login
- Check credentials: `abc` (lowercase) for both fields
- Make sure no spaces before/after
- Reload page (F5)

---

## Demo Credentials

```
API Key: abc
Refresh Token: abc
```

---

## Project Information

- **Framework:** Next.js 16 (React 19)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State:** React Context API
- **Build Tool:** Turbopack

---

## File Structure

```
atomberg-app/
├── src/
│   ├── app/
│   │   ├── page.tsx          (Main page)
│   │   ├── layout.tsx        (Layout)
│   │   └── globals.css       (Styles)
│   ├── components/
│   │   ├── Dashboard.tsx     (Main view)
│   │   ├── AddFanModal.tsx   (Add feature)
│   │   ├── DeleteFanModal.tsx (Delete feature)
│   │   ├── FanControl.tsx    (Controls)
│   │   └── ...
│   └── lib/
│       ├── api.ts
│       ├── context.tsx
│       └── mockData.ts
├── package.json
├── tsconfig.json
└── README.md
```

---

## Commands Reference

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Check for linting errors
npm run lint
```

---

## ✅ Ready!

Your app is ready to deploy locally!

**Next Steps:**
1. Follow steps 1-5 above
2. Test all features
3. Submit with GitHub link!

---

## 🎯 Submission

When submitting, include:
- ✅ This file (deployment guide)
- ✅ GitHub link: https://github.com/ayushdhore16/atomberg-app
- ✅ Demo credentials: abc/abc
- ✅ Brief description

---

## 📞 Support

If issues occur:
1. Check error message carefully
2. See troubleshooting section above
3. Restart terminal
4. Reinstall dependencies: `npm install`

---

**Good luck with your deployment!** 🚀
