# Quick Notes - Figma Widget

A simple and beautiful Figma Widget for creating quick text notes that stay on your canvas! 📝

## ✨ Features

- 📝 **Quick Text Notes** - Type and save notes instantly
- 🎨 **5 Color Options** - Choose from Blue, Purple, Pink, Yellow, or Green
- ⏱️ **Timestamps** - See when each note was created
- 🗑️ **Easy Delete** - Remove notes with one click
- 💾 **Always Visible** - Notes stay on the canvas permanently
- 🎯 **Simple Interface** - Clean, intuitive design

## 🚀 Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Build the Widget**
   ```bash
   npm run build
   ```

3. **Load in Figma**
   - Open Figma Desktop App
   - Go to `Menu` → `Widgets` → `Development` → `Import widget from manifest...`
   - Select the `manifest.json` file

4. **Use the Widget**
   - Add the "Quick Notes" widget to your canvas
   - Type your note in the text box
   - Choose a color
   - Click "Add Note"
   - Your note appears instantly!

## 💡 How to Use

### Adding Notes
1. Click on the widget to activate it
2. Type your note in the input field (can be multiple lines!)
3. Pick a color by clicking one of the 5 colored circles
4. Click "➕ Add Note"

### Deleting Notes
- Click the "🗑 Delete" button on any note

### Organizing
- Move the widget around your canvas to organize your notes
- Each note shows when it was created ("Just now", "5m ago", etc.)

## 🎨 Color Themes

The widget includes 5 beautiful color themes:
- 🔵 **Blue** - Default, professional
- 💜 **Purple** - Creative, important
- 💗 **Pink** - Ideas, fun
- 💛 **Yellow** - Warnings, todos
- 💚 **Green** - Success, done

## 📂 Project Structure

```
├── manifest.json          # Widget manifest
├── package.json          # Dependencies
├── tsconfig.json         # TypeScript config
├── widget-src/
│   └── code.tsx          # Widget source code
└── dist/
    └── code.js           # Compiled widget
```

## 🛠️ Development

### Build
```bash
npm run build
```

### Watch Mode (auto-rebuild)
```bash
npm run watch
```

### Testing
After building, reload the widget in Figma:
- `Menu` → `Widgets` → `Development` → `Reload widget from manifest`

## 💾 Data Storage

- All notes are stored using Figma's `useSyncedState`
- Notes persist across sessions
- Shared with all collaborators viewing the file
- Each widget instance has its own set of notes

## 🎯 Use Cases

Perfect for:
- ✅ **Quick Todos** - Jot down tasks
- 💡 **Brainstorming** - Capture ideas quickly
- 🐛 **Bug Tracking** - Note issues to fix
- 💬 **Comments** - Leave notes for teammates
- 📋 **Checklists** - Track progress
- 🎨 **Design Notes** - Document decisions

## 🤝 Tips & Tricks

1. **Multiple Widgets** - Add multiple Quick Notes widgets to organize different types of notes
2. **Color Coding** - Use colors to categorize your notes
3. **Move Around** - Drag the widget to position it near relevant designs
4. **Team Collaboration** - Notes are visible to everyone with access to the file
5. **Frames & Groups** - Place widgets inside frames for better organization

## 📝 Technical Details

- Built with **Figma Widget API**
- Written in **TypeScript**
- Uses **React-like** JSX syntax
- Stores data with `useSyncedState` (no external servers)
- Works in both **Figma and FigJam**

## 🌟 Features in Detail

### Multiline Support
The input field supports multiple lines - perfect for longer notes or lists!

### Relative Timestamps
Timestamps automatically update to show:
- "Just now" (< 1 minute)
- "5m ago" (< 1 hour)
- "2h ago" (< 24 hours)
- "Yesterday" (1 day)
- Full date (older)

### Responsive Design
The widget automatically adjusts to show all your notes with smooth scrolling.

## 🐛 Troubleshooting

**Widget not showing up?**
- Make sure you've run `npm run build`
- Check that `dist/code.js` exists
- Try re-importing the manifest

**Notes not saving?**
- Make sure you clicked "Add Note"
- Check that the text field isn't empty
- Try reloading the widget

**Can't see my notes?**
- The widget shows the most recent notes at the top
- Scroll down to see older notes
- Check if you're looking at the right widget instance

## 📄 License

MIT License - feel free to use and modify!

## 🙏 Credits

Built with ❤️ for the Figma community

---

**Enjoy taking quick notes! 📝✨**
