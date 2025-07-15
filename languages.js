// Language configuration and translations for HawkAI
// This file contains all text strings used in the app

export const LANGUAGES = {
  EN: 'en',
  FR: 'fr',
};

export const LANGUAGE_NAMES = {
  [LANGUAGES.EN]: 'English',
  [LANGUAGES.FR]: 'Français',
};

export const TRANSLATIONS = {
  [LANGUAGES.EN]: {
    // App General
    APP_NAME: 'HawkAI',
    LOADING: 'Loading...',
    SAVE: 'Save',
    CANCEL: 'Cancel',
    CLOSE: 'Close',
    ERROR: 'Error',
    SUCCESS: 'Success!',
    ASSISTANT_NAME_DEFAULT: 'Assistant',
    
    // Main Chat Interface
    CHAT_PLACEHOLDER: 'Type your message...',
    SEND: 'Send',
    ASSISTANT_TYPING: 'I am thinking...',
    
    // Welcome Message
    WELCOME_MESSAGE: `Hello! I'm your personal assistant powered by Gemini AI. 💫

I'm designed to be lightweight, fast, and straightforward - your go-to for quick questions when in doubt:
• Instant answers to quick questions during non overwhelming moments
• Minimal storage footprint
• Straightforward information lookup
• Simple task assistance
• Daily planning on the go

What would you like to know?`,

    WELCOME_NO_API: `Welcome to HawkAI! 🔑

You have 5 free messages to try out the app with demo responses.

For unlimited AI-powered conversations:
• Tap the settings icon to add your Gemini API key
• Get your free API key from Google AI Studio
• Start chatting with real AI responses

Your conversations will be private and secure!`,

    // Settings Modal
    SETTINGS_TITLE: 'Settings',
    API_KEY_SECTION: 'API Key',
    API_KEY_DESCRIPTION: 'Manage your Gemini AI API key for personalized access',
    API_KEY_SETUP: 'Setup API Key',
    API_KEY_UPDATE: 'Update API Key',
    API_KEY_CONFIGURED: 'Configured',
    API_KEY_REQUIRED: 'Required for AI chat',
    
    ASSISTANT_NAME_SECTION: 'Assistant Name',
    ASSISTANT_NAME_DESCRIPTION: 'Give your AI assistant a personal name',
    ASSISTANT_NAME_PLACEHOLDER: 'Enter assistant name...',
    ASSISTANT_NAME_SUGGESTIONS: 'Quick suggestions:',
    ASSISTANT_NAME_SUCCESS: 'Your assistant is now called',
    ASSISTANT_NAME_INVALID: 'Please enter a valid name for your assistant.',
    ASSISTANT_NAME_TOO_LONG: 'Please choose a name with 20 characters or less.',
    ASSISTANT_NAME_CHARACTERS: 'characters',
    
    LANGUAGE_SECTION: 'Language',
    LANGUAGE_DESCRIPTION: 'Choose your preferred language',
    
    THEME_SECTION: 'Theme',
    THEME_DESCRIPTION: 'Choose your preferred theme',
    THEME_SYSTEM: 'Follow System',
    THEME_LIGHT: 'Light Mode',
    THEME_DARK: 'Dark Mode',
    
    ACCENT_COLOR_SECTION: 'Accent Color',
    ACCENT_COLOR_DESCRIPTION: 'Customize your app\'s accent color',
    
    PREVIEW_SECTION: 'Preview',
    PREVIEW_USER_MESSAGE: 'Your message',
    PREVIEW_ASSISTANT_MESSAGE: 'Assistant response',
    
    CREDITS_SECTION: 'Credits',
    CREDITS_DEVELOPED_BY: 'Developed by',
    CREDITS_POWERED_BY: 'Powered by Google Gemini AI',
    CREDITS_BUILT_WITH: 'Built with React Native & Expo',
    CREDITS_COMPANY: 'BLWK Studio',
    
    // API Key Modal
    API_KEY_MODAL_TITLE: 'API Key Settings',
    API_KEY_INPUT_TITLE: 'Your Gemini API Key',
    API_KEY_INPUT_DESCRIPTION: 'Enter your personal Gemini API key to start chatting with AI',
    API_KEY_PLACEHOLDER: 'AIza... (paste your Gemini API key here)',
    API_KEY_ENTERED: 'API key entered',
    API_KEY_NOT_ENTERED: 'No API key entered',
    API_KEY_INSTRUCTIONS_TITLE: 'How to get your API key',
    API_KEY_INSTRUCTIONS_STEP1: 'Visit Google AI Studio and sign in with your Google account',
    API_KEY_INSTRUCTIONS_STEP2: 'Click "Get API Key" or "Create API Key" button',
    API_KEY_INSTRUCTIONS_STEP3: 'Create a new project or select an existing one',
    API_KEY_INSTRUCTIONS_STEP4: 'Copy the generated API key (starts with "AIza...")',
    API_KEY_INSTRUCTIONS_STEP5: 'Paste it in the field below and save',
    API_KEY_OPEN_STUDIO: 'Open Google AI Studio',
    API_KEY_SECURITY_NOTE: 'Your API key is stored locally on your device and never shared with anyone.',
    API_KEY_WARNING_NOTE: 'Keep your API key secure! Don\'t share it with others or post it publicly.',
    API_KEY_BENEFITS_TITLE: 'Why Your Own API Key?',
    API_KEY_BENEFIT_PERFORMANCE: 'Better Performance: Direct connection to Google\'s AI',
    API_KEY_BENEFIT_PRIVACY: 'Privacy: Your conversations stay between you and Google',
    API_KEY_BENEFIT_COST: 'Cost Control: You control your own usage and costs',
    API_KEY_BENEFIT_LIMITS: 'No Limits: Use the app as much as you want',
    API_KEY_VALIDATION_EMPTY: 'Please enter a valid API key',
    API_KEY_VALIDATION_INVALID: 'This doesn\'t look like a valid Gemini API key. Gemini API keys typically start with "AIza" and are longer than 35 characters.',
    
    // Error Messages
    ERROR_GENERAL: 'Sorry, I encountered an error. Please try again.',
    ERROR_OVERLOADED: 'Sorry my brain is overloaded, I cannot give you an answer right now. Try again later.',
    ERROR_QUOTA_EXCEEDED: 'You reached your quotas and your dose of AI, may I tell you that you should lower your usage of AI. For now use the old way and go find a good book for your question.',
    ERROR_API_KEY: 'Please check your API key configuration.',
    
    // Color Names
    COLOR_UNICORN_DREAMS: 'Unicorn Dreams',
    COLOR_BUBBLEGUM_POP: 'Bubblegum Pop',
    COLOR_MINTY_FRESH: 'Minty Fresh',
    COLOR_SUNSET_VIBES: 'Sunset Vibes',
    COLOR_PEACHY_KEEN: 'Peachy Keen',
    COLOR_COTTON_CANDY: 'Cotton Candy',
    COLOR_SKY_DREAMS: 'Sky Dreams',
    COLOR_LAVENDER_LOVE: 'Lavender Love',
    COLOR_MERMAID_TAIL: 'Mermaid Tail',
    COLOR_FLAMINGO_SASS: 'Flamingo Sass',
  },
  
  [LANGUAGES.FR]: {
    // App General
    APP_NAME: 'HawkAI',
    LOADING: 'Chargement...',
    SAVE: 'Enregistrer',
    CANCEL: 'Annuler',
    CLOSE: 'Fermer',
    ERROR: 'Erreur',
    SUCCESS: 'Succès !',
    ASSISTANT_NAME_DEFAULT: 'Assistant',
    
    // Main Chat Interface
    CHAT_PLACEHOLDER: 'Tapez votre message...',
    SEND: 'Envoyer',
    ASSISTANT_TYPING: 'Je réfléchis...',
    
    // Welcome Message
    WELCOME_MESSAGE: `Bonjour ! Je suis votre assistant personnel alimenté par Gemini AI. 💫

Je suis conçu pour être léger, rapide et simple - votre référence pour les questions rapides en cas de doute :
• Réponses instantanées aux questions rapides lors des moments non surchargés
• Empreinte de stockage minimale
• Recherche d'informations directe
• Assistance pour les tâches simples
• Planification quotidienne en déplacement

Que souhaitez-vous savoir ?`,

    WELCOME_NO_API: `Bienvenue sur HawkAI ! 🔑

Vous avez 5 messages gratuits pour essayer l'application avec des réponses de démonstration.

Pour des conversations illimitées alimentées par l'IA :
• Appuyez sur l'icône des paramètres pour ajouter votre clé API Gemini
• Obtenez votre clé API gratuite depuis Google AI Studio
• Commencez à discuter avec de vraies réponses IA

Vos conversations seront privées et sécurisées !`,

    // Settings Modal
    SETTINGS_TITLE: 'Paramètres',
    API_KEY_SECTION: 'Clé API',
    API_KEY_DESCRIPTION: 'Gérez votre clé API Gemini AI pour un accès personnalisé',
    API_KEY_SETUP: 'Configurer la clé API',
    API_KEY_UPDATE: 'Mettre à jour la clé API',
    API_KEY_CONFIGURED: 'Configurée',
    API_KEY_REQUIRED: 'Requise pour le chat IA',
    
    ASSISTANT_NAME_SECTION: 'Nom de l\'assistant',
    ASSISTANT_NAME_DESCRIPTION: 'Donnez un nom personnel à votre assistant IA',
    ASSISTANT_NAME_PLACEHOLDER: 'Entrez le nom de l\'assistant...',
    ASSISTANT_NAME_SUGGESTIONS: 'Suggestions rapides :',
    ASSISTANT_NAME_SUCCESS: 'Votre assistant s\'appelle maintenant',
    ASSISTANT_NAME_INVALID: 'Veuillez entrer un nom valide pour votre assistant.',
    ASSISTANT_NAME_TOO_LONG: 'Veuillez choisir un nom de 20 caractères ou moins.',
    ASSISTANT_NAME_CHARACTERS: 'caractères',
    
    LANGUAGE_SECTION: 'Langue',
    LANGUAGE_DESCRIPTION: 'Choisissez votre langue préférée',
    
    THEME_SECTION: 'Thème',
    THEME_DESCRIPTION: 'Choisissez votre thème préféré',
    THEME_SYSTEM: 'Suivre le système',
    THEME_LIGHT: 'Mode clair',
    THEME_DARK: 'Mode sombre',
    
    ACCENT_COLOR_SECTION: 'Couleur d\'accent',
    ACCENT_COLOR_DESCRIPTION: 'Personnalisez la couleur d\'accent de votre application',
    
    PREVIEW_SECTION: 'Aperçu',
    PREVIEW_USER_MESSAGE: 'Votre message',
    PREVIEW_ASSISTANT_MESSAGE: 'Réponse de l\'assistant',
    
    CREDITS_SECTION: 'Crédits',
    CREDITS_DEVELOPED_BY: 'Développé par',
    CREDITS_POWERED_BY: 'Alimenté par Google Gemini AI',
    CREDITS_BUILT_WITH: 'Construit avec React Native & Expo',
    CREDITS_COMPANY: 'BLWK Studio',
    
    // API Key Modal
    API_KEY_MODAL_TITLE: 'Paramètres de la clé API',
    API_KEY_INPUT_TITLE: 'Votre clé API Gemini',
    API_KEY_INPUT_DESCRIPTION: 'Entrez votre clé API Gemini personnelle pour commencer à discuter avec l\'IA',
    API_KEY_PLACEHOLDER: 'AIza... (collez votre clé API Gemini ici)',
    API_KEY_ENTERED: 'Clé API saisie',
    API_KEY_NOT_ENTERED: 'Aucune clé API saisie',
    API_KEY_INSTRUCTIONS_TITLE: 'Comment obtenir votre clé API',
    API_KEY_INSTRUCTIONS_STEP1: 'Visitez Google AI Studio et connectez-vous avec votre compte Google',
    API_KEY_INSTRUCTIONS_STEP2: 'Cliquez sur le bouton "Obtenir une clé API" ou "Créer une clé API"',
    API_KEY_INSTRUCTIONS_STEP3: 'Créez un nouveau projet ou sélectionnez-en un existant',
    API_KEY_INSTRUCTIONS_STEP4: 'Copiez la clé API générée (commence par "AIza...")',
    API_KEY_INSTRUCTIONS_STEP5: 'Collez-la dans le champ ci-dessous et enregistrez',
    API_KEY_OPEN_STUDIO: 'Ouvrir Google AI Studio',
    API_KEY_SECURITY_NOTE: 'Votre clé API est stockée localement sur votre appareil et n\'est jamais partagée.',
    API_KEY_WARNING_NOTE: 'Gardez votre clé API sécurisée ! Ne la partagez pas avec d\'autres ou ne la publiez pas publiquement.',
    API_KEY_BENEFITS_TITLE: 'Pourquoi votre propre clé API ?',
    API_KEY_BENEFIT_PERFORMANCE: 'Meilleures performances : Connexion directe à l\'IA de Google',
    API_KEY_BENEFIT_PRIVACY: 'Confidentialité : Vos conversations restent entre vous et Google',
    API_KEY_BENEFIT_COST: 'Contrôle des coûts : Vous contrôlez votre propre utilisation et vos coûts',
    API_KEY_BENEFIT_LIMITS: 'Aucune limite : Utilisez l\'application autant que vous le souhaitez',
    API_KEY_VALIDATION_EMPTY: 'Veuillez entrer une clé API valide',
    API_KEY_VALIDATION_INVALID: 'Cela ne ressemble pas à une clé API Gemini valide. Les clés API Gemini commencent généralement par "AIza" et font plus de 35 caractères.',
    
    // Error Messages
    ERROR_GENERAL: 'Désolé, j\'ai rencontré un soucis. Veuillez réessayer.',
    ERROR_OVERLOADED: 'Désolé, mon cerveau est surchargé, je ne peux pas vous donner de réponse maintenant. Réessayez plus tard.',
    ERROR_QUOTA_EXCEEDED: 'Vous avez atteint vos quotas et votre dose d\'IA, puis-je vous dire que vous devriez réduire votre utilisation de l\'IA. Pour l\'instant, utilisez l\'ancienne méthode et allez chercher un bon livre pour votre question.',
    ERROR_API_KEY: 'Veuillez vérifier la configuration de votre clé API.',
    
    // Color Names
    COLOR_UNICORN_DREAMS: 'Rêves de licorne',
    COLOR_BUBBLEGUM_POP: 'Pop bubble-gum',
    COLOR_MINTY_FRESH: 'Fraîcheur mentholée',
    COLOR_SUNSET_VIBES: 'Ambiance coucher de soleil',
    COLOR_PEACHY_KEEN: 'Pêche vive',
    COLOR_COTTON_CANDY: 'Barbe à papa',
    COLOR_SKY_DREAMS: 'Rêves de ciel',
    COLOR_LAVENDER_LOVE: 'Amour lavande',
    COLOR_MERMAID_TAIL: 'Queue de sirène',
    COLOR_FLAMINGO_SASS: 'Flamant rose',
  },
};

// Default language
export const DEFAULT_LANGUAGE = LANGUAGES.EN;

// Get translation for a key
export const getTranslation = (key, language = DEFAULT_LANGUAGE) => {
  return TRANSLATIONS[language]?.[key] || TRANSLATIONS[DEFAULT_LANGUAGE]?.[key] || key;
};

// Get all available languages
export const getAvailableLanguages = () => {
  return Object.keys(LANGUAGES).map(key => ({
    code: LANGUAGES[key],
    name: LANGUAGE_NAMES[LANGUAGES[key]],
    key: key
  }));
};
