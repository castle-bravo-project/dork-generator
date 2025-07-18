// Dork Generator Application
class DorkGenerator {
    constructor() {
        this.currentTab = 'google';
        this.history = [];
        this.settings = {
            saveHistory: true,
            autoCopy: false
        };
        
        this.init();
        this.loadSettings();
        this.loadHistory();
    }

    init() {
        this.bindEvents();
        this.updateInputs();
        this.setupModals();
    }

    bindEvents() {
        // Tab switching
        document.getElementById('googleTab').addEventListener('click', () => this.switchTab('google'));
        document.getElementById('shodanTab').addEventListener('click', () => this.switchTab('shodan'));

        // Search type changes
        document.getElementById('googleSearchType').addEventListener('change', () => this.updateInputs());
        document.getElementById('shodanSearchType').addEventListener('change', () => this.updateInputs());

        // Generate buttons
        document.getElementById('generateGoogle').addEventListener('click', () => this.generateDork('google'));
        document.getElementById('generateShodan').addEventListener('click', () => this.generateDork('shodan'));

        // Action buttons
        document.getElementById('copyBtn').addEventListener('click', () => this.copyToClipboard());
        document.getElementById('exportBtn').addEventListener('click', () => this.exportDorks());

        // Modal buttons
        document.getElementById('privacyBtn').addEventListener('click', () => this.showModal('privacy'));
        document.getElementById('settingsBtn').addEventListener('click', () => this.showModal('settings'));
        document.getElementById('closePrivacyModal').addEventListener('click', () => this.hideModal('privacy'));
        document.getElementById('closeSettingsModal').addEventListener('click', () => this.hideModal('settings'));

        // Settings
        document.getElementById('saveHistoryToggle').addEventListener('change', (e) => {
            this.settings.saveHistory = e.target.checked;
            this.saveSettings();
        });
        document.getElementById('autoCopyToggle').addEventListener('change', (e) => {
            this.settings.autoCopy = e.target.checked;
            this.saveSettings();
        });
        document.getElementById('clearDataBtn').addEventListener('click', () => this.clearAllData());

        // Close modals on outside click
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('fixed')) {
                this.hideModal('privacy');
                this.hideModal('settings');
            }
        });
    }

    switchTab(tab) {
        this.currentTab = tab;
        
        // Update tab buttons
        document.querySelectorAll('.dork-tab').forEach(btn => {
            btn.classList.remove('active', 'bg-primary');
            btn.classList.add('bg-gray-800');
        });
        
        if (tab === 'google') {
            document.getElementById('googleTab').classList.add('active', 'bg-primary');
            document.getElementById('googleTab').classList.remove('bg-gray-800');
            document.getElementById('googlePanel').classList.remove('hidden');
            document.getElementById('shodanPanel').classList.add('hidden');
        } else {
            document.getElementById('shodanTab').classList.add('active', 'bg-primary');
            document.getElementById('shodanTab').classList.remove('bg-gray-800');
            document.getElementById('shodanPanel').classList.remove('hidden');
            document.getElementById('googlePanel').classList.add('hidden');
        }
        
        this.updateInputs();
    }

    updateInputs() {
        const isGoogle = this.currentTab === 'google';
        const searchType = document.getElementById(isGoogle ? 'googleSearchType' : 'shodanSearchType').value;
        const container = document.getElementById(isGoogle ? 'googleInputs' : 'shodanInputs');
        
        container.innerHTML = '';
        
        if (isGoogle) {
            this.createGoogleInputs(searchType, container);
        } else {
            this.createShodanInputs(searchType, container);
        }
    }

    createGoogleInputs(searchType, container) {
        const inputs = this.getGoogleInputConfig(searchType);
        
        inputs.forEach(input => {
            const div = document.createElement('div');
            div.innerHTML = `
                <label class="block text-sm font-medium text-gray-300 mb-2">${input.label}</label>
                ${input.type === 'select' ? 
                    `<select id="${input.id}" class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-accent focus:border-transparent">
                        ${input.options.map(opt => `<option value="${opt.value}">${opt.label}</option>`).join('')}
                    </select>` :
                    `<input type="${input.type}" id="${input.id}" placeholder="${input.placeholder}" 
                           class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-accent focus:border-transparent">`
                }
            `;
            container.appendChild(div);
        });
    }

    createShodanInputs(searchType, container) {
        const inputs = this.getShodanInputConfig(searchType);
        
        inputs.forEach(input => {
            const div = document.createElement('div');
            div.innerHTML = `
                <label class="block text-sm font-medium text-gray-300 mb-2">${input.label}</label>
                ${input.type === 'select' ? 
                    `<select id="${input.id}" class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-accent focus:border-transparent">
                        ${input.options.map(opt => `<option value="${opt.value}">${opt.label}</option>`).join('')}
                    </select>` :
                    `<input type="${input.type}" id="${input.id}" placeholder="${input.placeholder}" 
                           class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-accent focus:border-transparent">`
                }
            `;
            container.appendChild(div);
        });
    }

    getGoogleInputConfig(searchType) {
        const configs = {
            filetype: [
                { id: 'fileType', label: 'File Type', type: 'select', options: [
                    { value: 'pdf', label: 'PDF' },
                    { value: 'doc', label: 'Word Document' },
                    { value: 'xls', label: 'Excel Spreadsheet' },
                    { value: 'ppt', label: 'PowerPoint' },
                    { value: 'txt', label: 'Text File' },
                    { value: 'xml', label: 'XML' },
                    { value: 'sql', label: 'SQL' },
                    { value: 'log', label: 'Log File' }
                ]},
                { id: 'searchTerm', label: 'Search Term', type: 'text', placeholder: 'Enter search term' }
            ],
            site: [
                { id: 'siteUrl', label: 'Website', type: 'text', placeholder: 'example.com' },
                { id: 'searchTerm', label: 'Search Term', type: 'text', placeholder: 'Enter search term' }
            ],
            inurl: [
                { id: 'urlTerm', label: 'URL Contains', type: 'text', placeholder: 'admin, login, etc.' }
            ],
            intitle: [
                { id: 'titleTerm', label: 'Title Contains', type: 'text', placeholder: 'Enter title term' }
            ],
            intext: [
                { id: 'textTerm', label: 'Text Contains', type: 'text', placeholder: 'Enter text to find' }
            ],
            cache: [
                { id: 'cacheUrl', label: 'Website URL', type: 'text', placeholder: 'https://example.com' }
            ],
            related: [
                { id: 'relatedUrl', label: 'Website URL', type: 'text', placeholder: 'https://example.com' }
            ],
            info: [
                { id: 'infoUrl', label: 'Website URL', type: 'text', placeholder: 'https://example.com' }
            ],
            define: [
                { id: 'defineTerm', label: 'Term to Define', type: 'text', placeholder: 'Enter term' }
            ],
            stocks: [
                { id: 'stockSymbol', label: 'Stock Symbol', type: 'text', placeholder: 'AAPL, GOOGL, etc.' }
            ],
            weather: [
                { id: 'weatherLocation', label: 'Location', type: 'text', placeholder: 'City, State or ZIP' }
            ],
            movie: [
                { id: 'movieTitle', label: 'Movie Title', type: 'text', placeholder: 'Enter movie title' }
            ],
            map: [
                { id: 'mapLocation', label: 'Location', type: 'text', placeholder: 'Address or place name' }
            ],
            book: [
                { id: 'bookTitle', label: 'Book Title', type: 'text', placeholder: 'Enter book title' },
                { id: 'bookAuthor', label: 'Author (optional)', type: 'text', placeholder: 'Enter author name' }
            ],
            custom: [
                { id: 'customDork', label: 'Custom Dork', type: 'text', placeholder: 'Enter your custom Google dork' }
            ]
        };
        
        return configs[searchType] || [];
    }

    getShodanInputConfig(searchType) {
        const configs = {
            port: [
                { id: 'portNumber', label: 'Port Number', type: 'text', placeholder: '22, 80, 443, etc.' }
            ],
            country: [
                { id: 'countryCode', label: 'Country Code', type: 'select', options: [
                    { value: 'US', label: 'United States' },
                    { value: 'CN', label: 'China' },
                    { value: 'DE', label: 'Germany' },
                    { value: 'GB', label: 'United Kingdom' },
                    { value: 'RU', label: 'Russia' },
                    { value: 'FR', label: 'France' },
                    { value: 'JP', label: 'Japan' },
                    { value: 'BR', label: 'Brazil' },
                    { value: 'IN', label: 'India' },
                    { value: 'CA', label: 'Canada' }
                ]}
            ],
            city: [
                { id: 'cityName', label: 'City Name', type: 'text', placeholder: 'New York, London, etc.' }
            ],
            org: [
                { id: 'orgName', label: 'Organization', type: 'text', placeholder: 'Google, Amazon, etc.' }
            ],
            hostname: [
                { id: 'hostName', label: 'Hostname', type: 'text', placeholder: 'example.com' }
            ],
            net: [
                { id: 'networkRange', label: 'Network Range', type: 'text', placeholder: '192.168.1.0/24' }
            ],
            os: [
                { id: 'osName', label: 'Operating System', type: 'select', options: [
                    { value: 'Windows', label: 'Windows' },
                    { value: 'Linux', label: 'Linux' },
                    { value: 'Unix', label: 'Unix' },
                    { value: 'FreeBSD', label: 'FreeBSD' },
                    { value: 'Mac OS', label: 'Mac OS' }
                ]}
            ],
            product: [
                { id: 'productName', label: 'Product/Service', type: 'text', placeholder: 'Apache, nginx, etc.' }
            ],
            version: [
                { id: 'versionNumber', label: 'Version', type: 'text', placeholder: '2.4.41, 1.18.0, etc.' }
            ],
            ssl: [
                { id: 'sslTerm', label: 'SSL Certificate Info', type: 'text', placeholder: 'Common name, issuer, etc.' }
            ],
            http: [
                { id: 'httpHeader', label: 'HTTP Header', type: 'text', placeholder: 'Server, X-Powered-By, etc.' }
            ],
            vuln: [
                { id: 'vulnId', label: 'Vulnerability ID', type: 'text', placeholder: 'CVE-2021-44228, etc.' }
            ],
            custom: [
                { id: 'customShodanDork', label: 'Custom Shodan Dork', type: 'text', placeholder: 'Enter your custom Shodan dork' }
            ]
        };
        
        return configs[searchType] || [];
    }

    generateDork(type) {
        const searchType = document.getElementById(type === 'google' ? 'googleSearchType' : 'shodanSearchType').value;
        let dork = '';
        
        if (type === 'google') {
            dork = this.generateGoogleDork(searchType);
        } else {
            dork = this.generateShodanDork(searchType);
        }
        
        if (dork) {
            this.displayDork(dork, type, searchType);
            if (this.settings.autoCopy) {
                this.copyToClipboard(dork);
            }
        }
    }

    generateGoogleDork(searchType) {
        const getValue = (id) => {
            const element = document.getElementById(id);
            return element ? element.value.trim() : '';
        };

        switch (searchType) {
            case 'filetype':
                const fileType = getValue('fileType');
                const searchTerm = getValue('searchTerm');
                return searchTerm ? `filetype:${fileType} ${searchTerm}` : `filetype:${fileType}`;
            
            case 'site':
                const siteUrl = getValue('siteUrl');
                const siteTerm = getValue('searchTerm');
                return siteTerm ? `site:${siteUrl} ${siteTerm}` : `site:${siteUrl}`;
            
            case 'inurl':
                return `inurl:${getValue('urlTerm')}`;
            
            case 'intitle':
                return `intitle:"${getValue('titleTerm')}"`;
            
            case 'intext':
                return `intext:"${getValue('textTerm')}"`;
            
            case 'cache':
                return `cache:${getValue('cacheUrl')}`;
            
            case 'related':
                return `related:${getValue('relatedUrl')}`;
            
            case 'info':
                return `info:${getValue('infoUrl')}`;
            
            case 'define':
                return `define:${getValue('defineTerm')}`;
            
            case 'stocks':
                return `stocks:${getValue('stockSymbol')}`;
            
            case 'weather':
                return `weather:${getValue('weatherLocation')}`;
            
            case 'movie':
                return `movie:${getValue('movieTitle')}`;
            
            case 'map':
                return `map:${getValue('mapLocation')}`;
            
            case 'book':
                const bookTitle = getValue('bookTitle');
                const bookAuthor = getValue('bookAuthor');
                return bookAuthor ? `book:"${bookTitle}" author:"${bookAuthor}"` : `book:"${bookTitle}"`;
            
            case 'custom':
                return getValue('customDork');
            
            default:
                return '';
        }
    }

    generateShodanDork(searchType) {
        const getValue = (id) => {
            const element = document.getElementById(id);
            return element ? element.value.trim() : '';
        };

        switch (searchType) {
            case 'port':
                return `port:${getValue('portNumber')}`;
            
            case 'country':
                return `country:${getValue('countryCode')}`;
            
            case 'city':
                return `city:"${getValue('cityName')}"`;
            
            case 'org':
                return `org:"${getValue('orgName')}"`;
            
            case 'hostname':
                return `hostname:${getValue('hostName')}`;
            
            case 'net':
                return `net:${getValue('networkRange')}`;
            
            case 'os':
                return `os:"${getValue('osName')}"`;
            
            case 'product':
                return `product:"${getValue('productName')}"`;
            
            case 'version':
                return `version:"${getValue('versionNumber')}"`;
            
            case 'ssl':
                return `ssl:"${getValue('sslTerm')}"`;
            
            case 'http':
                return `http.title:"${getValue('httpHeader')}"`;
            
            case 'vuln':
                return `vuln:${getValue('vulnId')}`;
            
            case 'custom':
                return getValue('customShodanDork');
            
            default:
                return '';
        }
    }

    displayDork(dork, type, searchType) {
        const container = document.getElementById('outputContainer');
        const timestamp = new Date().toLocaleString();
        
        container.innerHTML = `
            <div class="space-y-3">
                <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-400">${type.toUpperCase()} - ${searchType}</span>
                    <span class="text-xs text-gray-500">${timestamp}</span>
                </div>
                <div class="bg-gray-800 border border-gray-600 rounded-lg p-3">
                    <code class="text-accent font-mono text-sm break-all">${dork}</code>
                </div>
                <div class="flex space-x-2">
                    <a href="${this.getSearchUrl(dork, type)}" target="_blank" 
                       class="bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-all hover-glow">
                        Search Now
                    </a>
                </div>
            </div>
        `;
        
        // Enable action buttons
        document.getElementById('copyBtn').disabled = false;
        document.getElementById('exportBtn').disabled = false;
        document.getElementById('copyBtn').classList.remove('opacity-50');
        document.getElementById('exportBtn').classList.remove('opacity-50');
        
        // Add to history
        if (this.settings.saveHistory) {
            this.addToHistory(dork, type, searchType, timestamp);
        }
    }

    getSearchUrl(dork, type) {
        if (type === 'google') {
            return `https://www.google.com/search?q=${encodeURIComponent(dork)}`;
        } else {
            return `https://www.shodan.io/search?query=${encodeURIComponent(dork)}`;
        }
    }

    addToHistory(dork, type, searchType, timestamp) {
        const historyItem = { dork, type, searchType, timestamp };
        this.history.unshift(historyItem);
        
        // Keep only last 10 items
        if (this.history.length > 10) {
            this.history = this.history.slice(0, 10);
        }
        
        this.updateHistoryDisplay();
        this.saveHistory();
    }

    updateHistoryDisplay() {
        const historyList = document.getElementById('historyList');
        
        if (this.history.length === 0) {
            historyList.innerHTML = '<p class="text-gray-500 text-sm">No recent dorks</p>';
            return;
        }
        
        historyList.innerHTML = this.history.map(item => `
            <div class="bg-gray-800 border border-gray-700 rounded-lg p-3 cursor-pointer hover:bg-gray-750 transition-colors"
                 onclick="dorkGenerator.loadHistoryItem('${item.dork}', '${item.type}')">
                <div class="flex items-center justify-between mb-1">
                    <span class="text-xs text-gray-400">${item.type.toUpperCase()} - ${item.searchType}</span>
                    <span class="text-xs text-gray-500">${new Date(item.timestamp).toLocaleDateString()}</span>
                </div>
                <code class="text-accent font-mono text-xs break-all">${item.dork}</code>
            </div>
        `).join('');
    }

    loadHistoryItem(dork, type) {
        const container = document.getElementById('outputContainer');
        container.innerHTML = `
            <div class="space-y-3">
                <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-400">${type.toUpperCase()} - From History</span>
                </div>
                <div class="bg-gray-800 border border-gray-600 rounded-lg p-3">
                    <code class="text-accent font-mono text-sm break-all">${dork}</code>
                </div>
                <div class="flex space-x-2">
                    <a href="${this.getSearchUrl(dork, type)}" target="_blank" 
                       class="bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-all hover-glow">
                        Search Now
                    </a>
                </div>
            </div>
        `;
        
        document.getElementById('copyBtn').disabled = false;
        document.getElementById('exportBtn').disabled = false;
    }

    async copyToClipboard(text) {
        const dorkText = text || document.querySelector('#outputContainer code')?.textContent;
        
        if (!dorkText) return;
        
        try {
            await navigator.clipboard.writeText(dorkText);
            this.showNotification('Copied to clipboard!', 'success');
        } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = dorkText;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            this.showNotification('Copied to clipboard!', 'success');
        }
    }

    exportDorks() {
        if (this.history.length === 0) {
            this.showNotification('No dorks to export', 'error');
            return;
        }
        
        const exportData = {
            exportDate: new Date().toISOString(),
            dorks: this.history
        };
        
        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `dorks-export-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showNotification('Dorks exported successfully!', 'success');
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 px-4 py-2 rounded-lg text-white transition-all transform translate-x-full opacity-0 ${
            type === 'success' ? 'bg-green-600' : type === 'error' ? 'bg-red-600' : 'bg-blue-600'
        }`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.remove('translate-x-full', 'opacity-0');
        }, 100);
        
        setTimeout(() => {
            notification.classList.add('translate-x-full', 'opacity-0');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    showModal(type) {
        document.getElementById(`${type}Modal`).classList.remove('hidden');
    }

    hideModal(type) {
        document.getElementById(`${type}Modal`).classList.add('hidden');
    }

    setupModals() {
        // Setup toggle switches
        const toggles = document.querySelectorAll('.toggle-checkbox');
        toggles.forEach(toggle => {
            toggle.className = 'toggle-checkbox w-12 h-6 bg-gray-600 rounded-full relative cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-accent';
            toggle.style.appearance = 'none';
            
            const slider = document.createElement('div');
            slider.className = 'absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform';
            toggle.parentNode.appendChild(slider);
            
            toggle.addEventListener('change', function() {
                if (this.checked) {
                    this.classList.add('bg-accent');
                    slider.style.transform = 'translateX(24px)';
                } else {
                    this.classList.remove('bg-accent');
                    slider.style.transform = 'translateX(0)';
                }
            });
        });
    }

    // Local Storage and Settings
    saveSettings() {
        if (typeof Storage !== 'undefined') {
            localStorage.setItem('dorkGeneratorSettings', this.encrypt(JSON.stringify(this.settings)));
        }
    }

    loadSettings() {
        if (typeof Storage !== 'undefined') {
            const saved = localStorage.getItem('dorkGeneratorSettings');
            if (saved) {
                try {
                    this.settings = { ...this.settings, ...JSON.parse(this.decrypt(saved)) };
                    document.getElementById('saveHistoryToggle').checked = this.settings.saveHistory;
                    document.getElementById('autoCopyToggle').checked = this.settings.autoCopy;
                } catch (e) {
                    console.warn('Could not load settings');
                }
            }
        }
    }

    saveHistory() {
        if (typeof Storage !== 'undefined' && this.settings.saveHistory) {
            localStorage.setItem('dorkGeneratorHistory', this.encrypt(JSON.stringify(this.history)));
        }
    }

    loadHistory() {
        if (typeof Storage !== 'undefined') {
            const saved = localStorage.getItem('dorkGeneratorHistory');
            if (saved) {
                try {
                    this.history = JSON.parse(this.decrypt(saved));
                    this.updateHistoryDisplay();
                } catch (e) {
                    console.warn('Could not load history');
                }
            }
        }
    }

    clearAllData() {
        if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
            localStorage.removeItem('dorkGeneratorSettings');
            localStorage.removeItem('dorkGeneratorHistory');
            this.history = [];
            this.settings = { saveHistory: true, autoCopy: false };
            this.updateHistoryDisplay();
            document.getElementById('saveHistoryToggle').checked = true;
            document.getElementById('autoCopyToggle').checked = false;
            this.showNotification('All data cleared successfully!', 'success');
        }
    }

    // Simple encryption for local storage (not cryptographically secure, just obfuscation)
    encrypt(text) {
        return btoa(encodeURIComponent(text));
    }

    decrypt(text) {
        return decodeURIComponent(atob(text));
    }
}

// Initialize the application
let dorkGenerator;
document.addEventListener('DOMContentLoaded', () => {
    dorkGenerator = new DorkGenerator();
});

// Service Worker for offline functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('SW registered'))
            .catch(registrationError => console.log('SW registration failed'));
    });
}

