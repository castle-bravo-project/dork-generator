# Dork Generator - Google & Shodan Search Tools

A powerful, privacy-focused web application for generating Google and Shodan dorks for security research and reconnaissance. Built with modern web technologies and designed for educational and legitimate security research purposes.

![Dork Generator Screenshot](https://via.placeholder.com/800x400/111827/3b82f6?text=Dork+Generator+Interface)

## 🚀 Features

### Core Functionality
- **Google Dorks Generation**: Create advanced Google search queries for various purposes
- **Shodan Dorks Generation**: Generate Shodan search queries for IoT and network reconnaissance
- **Interactive Interface**: Modern, responsive UI with dark theme
- **Real-time Generation**: Instant dork creation with live preview
- **Search Integration**: Direct links to Google and Shodan with generated queries

### Privacy & Security
- **Client-side Processing**: All operations happen locally in your browser
- **No External Dependencies**: No data sent to external servers
- **Encrypted Local Storage**: Optional encrypted storage for preferences and history
- **No Tracking**: Zero analytics, cookies, or tracking scripts
- **HTTPS Only**: Secure delivery and operation

### User Experience
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Dark Theme**: Professional dark interface with custom color palette
- **History Management**: Track and reuse previously generated dorks
- **Export Functionality**: Export dork collections as JSON
- **Copy to Clipboard**: One-click copying of generated dorks

## 🛠️ Installation & Setup

### Option 1: Direct Download
1. Download the project files
2. Extract to your desired directory
3. Open `index.html` in a modern web browser

### Option 2: Local Development Server
```bash
# Clone or download the project
cd dork-generator

# Start a local HTTP server (Python 3)
python3 -m http.server 8000

# Or using Node.js
npx http-server -p 8000

# Open browser to http://localhost:8000
```

### Option 3: GitHub Pages Deployment
1. Fork this repository
2. Enable GitHub Pages in repository settings
3. Select source as "Deploy from a branch"
4. Choose "main" branch and "/ (root)" folder
5. Access your deployment at `https://yourusername.github.io/dork-generator`

## 📖 Usage Guide

### Google Dorks

#### File Type Search
Generate dorks to find specific file types:

**Example**: Find PDF files containing "confidential"
- Select: "File Type Search"
- File Type: "PDF"
- Search Term: "confidential"
- **Generated**: `filetype:pdf confidential`

#### Site-specific Search
Search within specific websites:

**Example**: Find admin pages on example.com
- Select: "Site-specific Search"
- Website: "example.com"
- Search Term: "admin"
- **Generated**: `site:example.com admin`

#### URL Contains
Find URLs containing specific terms:

**Example**: Find login pages
- Select: "URL Contains"
- URL Contains: "login"
- **Generated**: `inurl:login`

#### Advanced Examples
```
# Find exposed configuration files
filetype:conf inurl:config

# Search for database dumps
filetype:sql "INSERT INTO"

# Find directory listings
intitle:"Index of" "parent directory"

# Locate admin panels
inurl:admin intitle:login

# Find exposed log files
filetype:log "error" OR "warning"
```

### Shodan Dorks

#### Port Search
Find devices running services on specific ports:

**Example**: Find SSH servers
- Select: "Port Search"
- Port Number: "22"
- **Generated**: `port:22`

#### Country Search
Locate devices in specific countries:

**Example**: Find devices in the United States
- Select: "Country Search"
- Country Code: "US"
- **Generated**: `country:US`

#### Product Search
Find specific products or services:

**Example**: Find Apache web servers
- Select: "Product/Service"
- Product/Service: "Apache"
- **Generated**: `product:"Apache"`

#### Advanced Examples
```
# Find webcams in a specific city
product:"webcam" city:"New York"

# Locate vulnerable systems
vuln:CVE-2021-44228

# Find industrial control systems
product:"Siemens" port:102

# Search for specific organizations
org:"Google" country:US

# Find devices with default passwords
http.title:"login" country:CN
```

## 🎯 Use Cases

### Security Research
- **Vulnerability Assessment**: Find exposed systems and services
- **OSINT Gathering**: Collect open source intelligence
- **Penetration Testing**: Identify potential attack vectors
- **Compliance Auditing**: Verify security configurations

### Educational Purposes
- **Learning Search Techniques**: Understand advanced search operators
- **Security Awareness**: Demonstrate information exposure risks
- **Research Projects**: Academic and professional research
- **Training Materials**: Security education and workshops

### Legitimate Business Use
- **Asset Discovery**: Find your organization's exposed assets
- **Competitive Analysis**: Research industry trends and technologies
- **Threat Intelligence**: Monitor for potential security threats
- **Digital Footprint**: Assess your organization's online presence

## ⚙️ Configuration

### Settings Panel
Access via the gear icon in the header:

- **Save History**: Enable/disable local storage of generated dorks
- **Auto-copy Generated Dorks**: Automatically copy dorks to clipboard
- **Clear All Data**: Remove all stored preferences and history

### Privacy Controls
- **Local Storage**: Opt-in encrypted storage for preferences
- **Data Deletion**: Clear all stored data at any time
- **No Tracking**: Complete privacy with no external data transmission

## 🔧 Technical Specifications

### Browser Compatibility
- **Chrome**: Latest version (recommended)
- **Firefox**: Latest version
- **Safari**: Latest version
- **Edge**: Latest version

### Technology Stack
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Tailwind CSS (CDN)
- **Fonts**: Inter, JetBrains Mono (Google Fonts)
- **Storage**: Local Storage with encryption
- **Service Worker**: Offline functionality

### Performance Features
- **Client-side Processing**: No server dependencies
- **Responsive Design**: Mobile-first approach
- **Progressive Enhancement**: Graceful degradation
- **Offline Support**: Service worker caching

## 🚀 Deployment

### GitHub Pages
1. **Repository Setup**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/dork-generator.git
   git push -u origin main
   ```

2. **Enable Pages**:
   - Go to repository Settings
   - Navigate to Pages section
   - Select "Deploy from a branch"
   - Choose "main" branch, "/ (root)" folder
   - Save settings

3. **Custom Domain** (Optional):
   - Add CNAME file with your domain
   - Configure DNS settings
   - Enable HTTPS in Pages settings

### Other Hosting Options
- **Netlify**: Drag and drop deployment
- **Vercel**: Git-based deployment
- **Firebase Hosting**: Google Cloud hosting
- **AWS S3**: Static website hosting

## 🔒 Security Considerations

### Responsible Use
- **Educational Purpose**: Use only for legitimate security research
- **Legal Compliance**: Ensure compliance with local laws and regulations
- **Ethical Guidelines**: Follow responsible disclosure practices
- **Permission Required**: Only test systems you own or have permission to test

### Data Protection
- **No Data Transmission**: All processing happens locally
- **Encrypted Storage**: Local data is encrypted using base64 encoding
- **Privacy First**: No analytics, tracking, or external dependencies
- **User Control**: Complete control over data storage and deletion

## 🤝 Contributing

### Development Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/dork-generator.git
cd dork-generator

# Start development server
python3 -m http.server 8000

# Open browser to http://localhost:8000
```

### Code Structure
```
dork-generator/
├── index.html          # Main application file
├── app.js             # JavaScript functionality
├── sw.js              # Service worker for offline support
└── README.md          # This documentation
```

### Adding New Dork Types
1. **Google Dorks**: Add to `getGoogleInputConfig()` method
2. **Shodan Dorks**: Add to `getShodanInputConfig()` method
3. **Generation Logic**: Update respective generation methods
4. **Testing**: Verify functionality across browsers

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

This tool is designed for educational and legitimate security research purposes only. Users are responsible for ensuring their use complies with applicable laws and regulations. The developers assume no responsibility for misuse of this tool.

## 🆘 Support

### Common Issues
- **Blank Page**: Ensure JavaScript is enabled
- **Copy Function**: Check browser permissions for clipboard access
- **Storage Issues**: Verify local storage is enabled
- **Mobile Display**: Use latest browser version

### Getting Help
- **Documentation**: Review this README thoroughly
- **Issues**: Report bugs via GitHub Issues
- **Security**: Report security issues privately
- **Feature Requests**: Submit via GitHub Discussions

## 🔄 Updates

### Version History
- **v1.0.0**: Initial release with core functionality
- **v1.1.0**: Added export functionality and improved UI
- **v1.2.0**: Enhanced privacy features and mobile support

### Roadmap
- [ ] Additional dork templates
- [ ] Bulk dork generation
- [ ] Advanced filtering options
- [ ] Integration with security tools
- [ ] Multi-language support

---

**Made with ❤️ for the security research community**

*Remember: With great power comes great responsibility. Use this tool ethically and legally.*

