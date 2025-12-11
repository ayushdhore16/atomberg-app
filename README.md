# Atomberg Smart Fan Controller 🌀

Control all your Atomberg smart fans from one place. Simple, clean, and actually works.

## What You Can Do

- Login with your Atomberg credentials
- See all your fans at a glance
- Add new fans to the system
- Delete fans you don't need
- Control power, speed, brightness, and set timers
- Watch stats update in real-time
- Click the logo to spin it (totally unnecessary but fun)

## Requirements

- Node.js 18 or higher
- npm (comes with Node.js)

## Getting Started

```bash
# Get the code
git clone https://github.com/ayushdhore16/atomberg-app.git
cd atomberg-app

# Install dependencies
npm install

# Run it
npm run dev
```

Open your browser to `http://localhost:3000`

## Demo Credentials

For testing:
- API Key: `abc`
- Refresh Token: `abc`

## Build It for Production

```bash
npm run build
npm start
```


## 🌐 Deployment

### Quick Deploy to Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Docker Deployment

```bash
docker build -t atomberg-app .
docker run -p 3000:3000 atomberg-app
```

### Linux/Ubuntu Server

```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Build and run with PM2
npm install
npm run build
npm install -g pm2
pm2 start npm --name "atomberg" -- start
```

See [DOCUMENTATION.md](./DOCUMENTATION.md) for detailed deployment guides.

## 📁 Project Structure

```
src/
├── app/               # Next.js app directory
├── components/        # React components
├── lib/               # Utilities and API
└── public/            # Static assets
```

## 🛠️ Tech Stack

- **Framework:** Next.js 16
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** React Context
- **API:** Atomberg Public API

## 📚 Documentation

- **[DOCUMENTATION.md](./DOCUMENTATION.md)** - Complete guide with deployment options
- **[Atomberg API Docs](https://developer.atomberg-iot.com/)** - Official API reference

## 🔧 Available Commands

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm start         # Start production server
npm run lint      # Run ESLint
```

## 📋 Supported Controls

| Control | Range | Description |
|---------|-------|-------------|
| Power | On/Off | Turn fan on or off |
| Speed | 1-5 | Set fan speed level |
| Brightness | 0-100% | Adjust light brightness |
| Sleep Timer | Minutes | Set auto-off timer |

## 🔒 Security Features

- ✅ Secure credential handling
- ✅ HTTPS ready
- ✅ Input validation
- ✅ Error handling
- ✅ No persistent credential storage

## 🌍 Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 📊 API Limits

- **Daily:** 100 calls/day
- **Rate:** 5 calls/second

## ❓ Troubleshooting

**Invalid credentials?**
- Verify API Key and Refresh Token in Atomberg app
- Check Developer Mode is enabled
- Ensure tokens are correctly copied

**No devices showing?**
- Add a device in Atomberg Home app
- Check device WiFi connection
- Refresh the page

**Port 3000 in use?**
```bash
npm run dev -- -p 3001
```

## 📞 Support

- **Atomberg Help:** app@atomberg.com
- **Deployment Issues:** Refer to platform documentation
  - Vercel: https://vercel.com/docs
  - Docker: https://docs.docker.com

## 📜 License

Provided as-is for evaluation purposes.

## 🎉 What's Included

✨ Modern React 19 with hooks
✨ Server components support
✨ Tailwind CSS 4
✨ TypeScript strict mode
✨ ESLint configuration
✨ Responsive design
✨ Real-time updates
✨ Comprehensive error handling

---

**Ready to control your fans? Start the dev server and log in!** 🚀
