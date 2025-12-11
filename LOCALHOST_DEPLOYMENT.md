# 🚀 Atomberg Smart Fan Control App - Setup Guide

Want to test the Atomberg fan control app locally? Takes about 5 minutes to get running.

## Before You Start

You'll need:
- **Node.js 18 or higher** (grab it from https://nodejs.org if you don't have it)
- A terminal/command prompt
- Internet connection to download packages

---

## 1. Verify Node.js is installed

Open your terminal and check:

```bash
node --version
npm --version
```

Should both show 18 or higher. If not, go download Node.js.

---

## 2. Get the Code

Either clone from GitHub:

```bash
git clone https://github.com/ayushdhore16/atomberg-app.git
cd atomberg-app
```

Or navigate to where you have it locally:

```bash
cd d:\atomberg-app
```

---

## 3. Install Everything

Run npm install to grab all dependencies:

```bash
npm install
```

This takes about 2-3 minutes depending on your internet speed.

---

## 4. Start the Dev Server

```bash
npm run dev
```

You should see something like:

```
▲ Next.js 16.0.8
- Local:        http://localhost:3000
- Ready in 1335ms
```

---

## 5. Open It Up

Just navigate to `http://localhost:3000` in your browser. It should open automatically, but if not, copy-paste that address.

---

## 6. Login

Use the demo credentials:
- **API Key:** `abc`
- **Refresh Token:** `abc`

Click the Login button and you're in.

---

## What to Try

---

## What to Try

Once you're logged in, here's what you can play with:

- **Add a Fan** - Hit the green "Add Fan" button at the top, give it a name, pick a type. It'll instantly show up in your list
- **Delete a Fan** - Red "Delete Fan" button. Pick one, confirm (can't undo this one), and it's gone
- **Control a Device** - Click on any fan to open its control panel. You can toggle power, adjust speed (0-5), brightness (0-5), and set a timer (0-60 minutes)
- **Watch the Numbers Change** - The stats cards at the top update in real-time as you add/remove fans
- **Click the Logo** - That yellow Atomberg fan icon in the top left? Click it to watch it spin. It's subtle but kinda cool
- **Check Mobile** - Resize your browser or test on your phone. Everything adapts nicely

---

## Troubleshooting

**Port 3000 already in use?**
```bash
npm run dev -- -p 3001
```

**npm install fails?**
Make sure you have the latest Node.js (18+) and try deleting `node_modules` folder, then run `npm install` again.

**Changes not showing?**
Hard refresh your browser (Ctrl + Shift + R on Windows/Linux, Cmd + Shift + R on Mac) or clear cache.

**Can't login?**
Double-check the credentials: `abc` and `abc` (no spaces, exactly as shown)

---

## Quick Commands Reference

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Check code quality
npm run start        # Run production build
npm install          # Install dependencies
```

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
