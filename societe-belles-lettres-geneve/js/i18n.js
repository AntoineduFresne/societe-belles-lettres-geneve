// Société de Belles-Lettres Genève
// Script de gestion multilingue

document.addEventListener('DOMContentLoaded', function() {
    // Initialisation de la langue
    let currentLang = localStorage.getItem('language') || 'fr';
    
    // Appliquer la langue au chargement
    applyLanguage(currentLang);
    
    // Mettre à jour l'affichage du sélecteur de langue
    updateLanguageSelector(currentLang);
    
    // Gestionnaire d'événement pour le sélecteur de langue
    const langSelector = document.getElementById('language-selector');
    if (langSelector) {
        langSelector.addEventListener('change', function() {
            currentLang = this.value;
            localStorage.setItem('language', currentLang);
            applyLanguage(currentLang);
        });
    }
    
    // Fonction pour mettre à jour l'affichage du sélecteur de langue
    function updateLanguageSelector(lang) {
        if (langSelector) {
            langSelector.value = lang;
        }
    }
    
    // Fonction pour appliquer la langue sélectionnée
    function applyLanguage(lang) {
        // Ajouter une classe temporaire pour l'animation de transition
        document.body.classList.add('language-changing');
        
        // Mettre à jour tous les éléments avec attribut data-i18n
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[key] && translations[key][lang]) {
                element.innerHTML = translations[key][lang];
            }
        });
        
        // Mettre à jour les attributs alt et placeholder
        const altElements = document.querySelectorAll('[data-i18n-alt]');
        altElements.forEach(element => {
            const key = element.getAttribute('data-i18n-alt');
            if (translations[key] && translations[key][lang]) {
                element.setAttribute('alt', translations[key][lang]);
            }
        });
        
        const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
        placeholderElements.forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            if (translations[key] && translations[key][lang]) {
                element.setAttribute('placeholder', translations[key][lang]);
            }
        });
        
        // Mettre à jour le titre de la page
        const pageTitle = document.querySelector('title');
        if (pageTitle && pageTitle.getAttribute('data-i18n')) {
            const key = pageTitle.getAttribute('data-i18n');
            if (translations[key] && translations[key][lang]) {
                pageTitle.textContent = translations[key][lang];
            }
        }
        
        // Mettre à jour la description meta
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription && metaDescription.getAttribute('data-i18n')) {
            const key = metaDescription.getAttribute('data-i18n');
            if (translations[key] && translations[key][lang]) {
                metaDescription.setAttribute('content', translations[key][lang]);
            }
        }
        
        // Retirer la classe d'animation après un court délai
        setTimeout(function() {
            document.body.classList.remove('language-changing');
        }, 300);
    }
});

// Dictionnaire de traductions
const translations = {
    // Langue de genre
    'language.gender.notice': {
        'fr': 'Ce site utilise le français comme langue de genre.',
        'en': 'This site uses French as the gender language.',
        'de': 'Diese Website verwendet Französisch als Genussprache.',
        'it': 'Questo sito utilizza il francese come lingua di genere.'
    },
    
    // Navigation
    'nav.home': {
        'fr': 'Accueil',
        'en': 'Home',
        'de': 'Startseite',
        'it': 'Home'
    },
    'nav.history': {
        'fr': 'Histoire',
        'en': 'History',
        'de': 'Geschichte',
        'it': 'Storia'
    },
    'nav.presentation': {
        'fr': 'Présentation',
        'en': 'About Us',
        'de': 'Über uns',
        'it': 'Chi siamo'
    },
    'nav.values': {
        'fr': 'Valeurs',
        'en': 'Values',
        'de': 'Werte',
        'it': 'Valori'
    },
    'nav.archives': {
        'fr': 'Archives',
        'en': 'Archives',
        'de': 'Archiv',
        'it': 'Archivi'
    },
    'nav.photos': {
        'fr': 'Photos',
        'en': 'Photos',
        'de': 'Fotos',
        'it': 'Foto'
    },
    'nav.revue': {
        'fr': 'La Nouvelle Revue',
        'en': 'The New Review',
        'de': 'Die Neue Revue',
        'it': 'La Nuova Rivista'
    },
    'nav.contact': {
        'fr': 'Contact',
        'en': 'Contact',
        'de': 'Kontakt',
        'it': 'Contatto'
    },
    
    // Page d'accueil
    'home.page.title': {
        'fr': 'Société de Belles-Lettres Genève',
        'en': 'Société de Belles-Lettres Geneva',
        'de': 'Société de Belles-Lettres Genf',
        'it': 'Société de Belles-Lettres Ginevra'
    },
    'home.page.description': {
        'fr': 'Site officiel de la Société de Belles-Lettres Genève, une société d\'étudiants qui incarne l\'esprit genevois.',
        'en': 'Official website of the Société de Belles-Lettres Geneva, a student society embodying the spirit of Geneva.',
        'de': 'Offizielle Website der Société de Belles-Lettres Genf, einer Studentengesellschaft, die den Geist Genfs verkörpert.',
        'it': 'Sito ufficiale della Société de Belles-Lettres Ginevra, una società studentesca che incarna lo spirito ginevrino.'
    },
    'home.hero.title': {
        'fr': 'Société de Belles-Lettres Genève',
        'en': 'Société de Belles-Lettres Geneva',
        'de': 'Société de Belles-Lettres Genf',
        'it': 'Société de Belles-Lettres Ginevra'
    },
    'home.hero.subtitle': {
        'fr': 'Une société d\'étudiants qui incarne l\'esprit genevois depuis [ANNÉE]',
        'en': 'A student society embodying the spirit of Geneva since [YEAR]',
        'de': 'Eine Studentengesellschaft, die den Geist Genfs seit [JAHR] verkörpert',
        'it': 'Una società studentesca che incarna lo spirito ginevrino dal [ANNO]'
    },
    'home.hero.discover': {
        'fr': 'Découvrir',
        'en': 'Discover',
        'de': 'Entdecken',
        'it': 'Scoprire'
    },
    'home.hero.contact': {
        'fr': 'Nous contacter',
        'en': 'Contact Us',
        'de': 'Kontaktieren Sie uns',
        'it': 'Contattaci'
    },
    'home.about.title': {
        'fr': 'Présentation',
        'en': 'About Us',
        'de': 'Über uns',
        'it': 'Chi siamo'
    },
    'home.about.text1': {
        'fr': 'La Société de Belles-Lettres Genève est une société d\'étudiants fondée en [ANNÉE] qui rassemble des étudiants de toutes les facultés autour de valeurs communes.',
        'en': 'The Société de Belles-Lettres Geneva is a student society founded in [YEAR] that brings together students from all faculties around common values.',
        'de': 'Die Société de Belles-Lettres Genf ist eine [JAHR] gegründete Studentengesellschaft, die Studenten aller Fakultäten um gemeinsame Werte versammelt.',
        'it': 'La Société de Belles-Lettres Ginevra è una società studentesca fondata nel [ANNO] che riunisce studenti di tutte le facoltà attorno a valori comuni.'
    },
    'home.about.text2': {
        'fr': 'Notre société encourage l\'esprit critique sur le plan politique, économique, social et culturel, et cultive l\'amitié entre ses membres. Notre devise est [DEVISE].',
        'en': 'Our society encourages critical thinking on political, economic, social and cultural levels, and cultivates friendship among its members. Our motto is [MOTTO].',
        'de': 'Unsere Gesellschaft fördert kritisches Denken auf politischer, wirtschaftlicher, sozialer und kultureller Ebene und pflegt die Freundschaft unter ihren Mitgliedern. Unser Motto lautet [MOTTO].',
        'it': 'La nostra società incoraggia il pensiero critico a livello politico, economico, sociale e culturale, e coltiva l\'amicizia tra i suoi membri. Il nostro motto è [MOTTO].'
    },
    'home.about.text3': {
        'fr': 'Belles-Lettres Genève offre un cadre stimulant intellectuellement où développer son esprit critique en débattant et partageant ses opinions, tout en créant des amitiés à vie avec des étudiants qui partagent des valeurs communes malgré la diversité d\'opinions.',
        'en': 'Belles-Lettres Geneva offers an intellectually stimulating environment to develop critical thinking through debate and sharing opinions, while creating lifelong friendships with students who share common values despite diverse opinions.',
        'de': 'Belles-Lettres Genf bietet ein intellektuell anregendes Umfeld, um kritisches Denken durch Debatte und Meinungsaustausch zu entwickeln und gleichzeitig lebenslange Freundschaften mit Studenten zu schließen, die trotz unterschiedlicher Meinungen gemeinsame Werte teilen.',
        'it': 'Belles-Lettres Ginevra offre un ambiente intellettualmente stimolante per sviluppare il pensiero critico attraverso il dibattito e la condivisione di opinioni, creando allo stesso tempo amicizie durature con studenti che condividono valori comuni nonostante la diversità di opinioni.'
    },
    'home.about.more': {
        'fr': 'En savoir plus',
        'en': 'Learn more',
        'de': 'Mehr erfahren',
        'it': 'Scopri di più'
    },
    'home.values.title': {
        'fr': 'Nos valeurs',
        'en': 'Our Values',
        'de': 'Unsere Werte',
        'it': 'I nostri valori'
    },
    'home.values.culture.title': {
        'fr': 'Culture',
        'en': 'Culture',
        'de': 'Kultur',
        'it': 'Cultura'
    },
    'home.values.culture.text': {
        'fr': 'Nous promouvons l\'enrichissement intellectuel et culturel à travers des débats, conférences et activités littéraires.',
        'en': 'We promote intellectual and cultural enrichment through debates, conferences and literary activities.',
        'de': 'Wir fördern die intellektuelle und kulturelle Bereicherung durch Debatten, Konferenzen und literarische Aktivitäten.',
        'it': 'Promuoviamo l\'arricchimento intellettuale e culturale attraverso dibattiti, conferenze e attività letterarie.'
    },
    'home.values.friendship.title': {
        'fr': 'Amitié',
        'en': 'Friendship',
        'de': 'Freundschaft',
        'it': 'Amicizia'
    },
    'home.values.friendship.text': {
        'fr': 'Nous cultivons des liens d\'amitié durables entre nos membres, créant un réseau de soutien qui perdure bien au-delà des études.',
        'en': 'We cultivate lasting bonds of friendship among our members, creating a support network that endures well beyond studies.',
        'de': 'Wir pflegen dauerhafte Freundschaftsbande unter unseren Mitgliedern und schaffen ein Unterstützungsnetzwerk, das weit über das Studium hinaus Bestand hat.',
        'it': 'Coltiviamo legami duraturi di amicizia tra i nostri membri, creando una rete di supporto che dura ben oltre gli studi.'
    },
    'home.values.tradition.title': {
        'fr': 'Tradition',
        'en': 'Tradition',
        'de': 'Tradition',
        'it': 'Tradizione'
    },
    'home.values.tradition.text': {
        'fr': 'Nous perpétuons des traditions riches en histoire tout en les adaptant aux réalités contemporaines.',
        'en': 'We perpetuate traditions rich in history while adapting them to contemporary realities.',
        'de': 'Wir führen geschichtsträchtige Traditionen fort und passen sie gleichzeitig an die zeitgenössischen Realitäten an.',
        'it': 'Perpetuiamo tradizioni ricche di storia adattandole alle realtà contemporanee.'
    },
    'home.values.dialogue.title': {
        'fr': 'Dialogue',
        'en': 'Dialogue',
        'de': 'Dialog',
        'it': 'Dialogo'
    },
    'home.values.dialogue.text': {
        'fr': 'Nous encourageons l\'échange d\'idées et le débat constructif dans un esprit d\'ouverture et de respect mutuel.',
        'en': 'We encourage the exchange of ideas and constructive debate in a spirit of openness and mutual respect.',
        'de': 'Wir fördern den Ideenaustausch und die konstruktive Debatte im Geiste der Offenheit und des gegenseitigen Respekts.',
        'it': 'Incoraggiamo lo scambio di idee e il dibattito costruttivo in uno spirito di apertura e rispetto reciproco.'
    },
    'home.values.discover': {
        'fr': 'Découvrir nos valeurs',
        'en': 'Discover our values',
        'de': 'Entdecken Sie unsere Werte',
        'it': 'Scopri i nostri valori'
    },
    'home.gallery.title': {
        'fr': 'Galerie photos',
        'en': 'Photo Gallery',
        'de': 'Fotogalerie',
        'it': 'Galleria fotografica'
    },
    'home.gallery.event': {
        'fr': 'Événement annuel',
        'en': 'Annual Event',
        'de': 'Jährliche Veranstaltung',
        'it': 'Evento annuale'
    },
    'home.gallery.meeting': {
        'fr': 'Réunion des membres',
        'en': 'Members Meeting',
        'de': 'Mitgliederversammlung',
        'it': 'Riunione dei membri'
    },
    'home.gallery.conference': {
        'fr': 'Conférence',
        'en': 'Conference',
        'de': 'Konferenz',
        'it': 'Conferenza'
    },
    'home.gallery.ceremony': {
        'fr': 'Cérémonie',
        'en': 'Ceremony',
        'de': 'Zeremonie',
        'it': 'Cerimonia'
    },
    'home.gallery.more': {
        'fr': 'Voir toutes les photos',
        'en': 'See all photos',
        'de': 'Alle Fotos ansehen',
        'it': 'Vedi tutte le foto'
    },
    'home.contact.title': {
        'fr': 'Contact',
        'en': 'Contact',
        'de': 'Kontakt',
        'it': 'Contatto'
    },
    'home.contact.address.title': {
        'fr': 'Adresse',
        'en': 'Address',
        'de': 'Adresse',
        'it': 'Indirizzo'
    },
    'home.contact.email.title': {
        'fr': 'Email',
        'en': 'Email',
        'de': 'E-Mail',
        'it': 'Email'
    },
    'home.contact.phone.title': {
        'fr': 'Téléphone',
        'en': 'Phone',
        'de': 'Telefon',
        'it': 'Telefono'
    },
    'home.contact.hours.title': {
        'fr': 'Horaires',
        'en': 'Hours',
        'de': 'Öffnungszeiten',
        'it': 'Orari'
    },
    'home.contact.form.name': {
        'fr': 'Nom complet',
        'en': 'Full Name',
        'de': 'Vollständiger Name',
        'it': 'Nome completo'
    },
    'home.contact.form.email': {
        'fr': 'Email',
        'en': 'Email',
        'de': 'E-Mail',
        'it': 'Email'
    },
    'home.contact.form.subject': {
        'fr': 'Sujet',
        'en': 'Subject',
        'de': 'Betreff',
        'it': 'Oggetto'
    },
    'home.contact.form.message': {
        'fr': 'Message',
        'en': 'Message',
        'de': 'Nachricht',
        'it': 'Messaggio'
    },
    'home.contact.form.submit': {
        'fr': 'Envoyer',
        'en': 'Send',
        'de': 'Senden',
        'it': 'Invia'
    },
    
    // Footer
    'footer.description': {
        'fr': 'La Société de Belles-Lettres Genève est une société d\'étudiants qui incarne l\'esprit genevois depuis [ANNÉE].',
        'en': 'The Société de Belles-Lettres Geneva is a student society embodying the spirit of Geneva since [YEAR].',
        'de': 'Die Société de Belles-Lettres Genf ist eine Studentengesellschaft, die den Geist Genfs seit [JAHR] verkörpert.',
        'it': 'La Société de Belles-Lettres Ginevra è una società studentesca che incarna lo spirito ginevrino dal [ANNO].'
    },
    'footer.navigation': {
        'fr': 'Navigation',
        'en': 'Navigation',
        'de': 'Navigation',
        'it': 'Navigazione'
    },
    'footer.follow': {
        'fr': 'Suivez-nous',
        'en': 'Follow Us',
        'de': 'Folgen Sie uns',
        'it': 'Seguici'
    },
    'footer.copyright': {
        'fr': '© 2025 Société de Belles-Lettres Genève. Tous droits réservés.',
        'en': '© 2025 Société de Belles-Lettres Geneva. All rights reserved.',
        'de': '© 2025 Société de Belles-Lettres Genf. Alle Rechte vorbehalten.',
        'it': '© 2025 Société de Belles-Lettres Ginevra. Tutti i diritti riservati.'
    },
    
    // Histoire
    'history.page.title': {
        'fr': 'Histoire - Société de Belles-Lettres Genève',
        'en': 'History - Société de Belles-Lettres Geneva',
        'de': 'Geschichte - Société de Belles-Lettres Genf',
        'it': 'Storia - Société de Belles-Lettres Ginevra'
    },
    'history.page.description': {
        'fr': 'Découvrez l\'histoire riche et fascinante de la Société de Belles-Lettres Genève.',
        'en': 'Discover the rich and fascinating history of the Société de Belles-Lettres Geneva.',
        'de': 'Entdecken Sie die reiche und faszinierende Geschichte der Société de Belles-Lettres Genf.',
        'it': 'Scopri la ricca e affascinante storia della Société de Belles-Lettres Ginevra.'
    },
    'history.hero.title': {
        'fr': 'Notre Histoire',
        'en': 'Our History',
        'de': 'Unsere Geschichte',
        'it': 'La nostra storia'
    },
    'history.hero.subtitle': {
        'fr': 'L\'héritage et les traditions de la Société de Belles-Lettres Genève',
        'en': 'The heritage and traditions of the Société de Belles-Lettres Geneva',
        'de': 'Das Erbe und die Traditionen der Société de Belles-Lettres Genf',
        'it': 'L\'eredità e le tradizioni della Société de Belles-Lettres Ginevra'
    },
    'history.origins.title': {
        'fr': 'Les origines',
        'en': 'Origins',
        'de': 'Ursprünge',
        'it': 'Origini'
    },
    'history.origins.text1': {
        'fr': 'La Société de Belles-Lettres Genève a été fondée en [ANNÉE] par une poignée d\'étudiants passionnés de littérature, d\'art et de culture. Depuis sa création, elle a joué un rôle important dans la vie intellectuelle et culturelle genevoise.',
        'en': 'The Société de Belles-Lettres Geneva was founded in [YEAR] by a handful of students passionate about literature, art and culture. Since its creation, it has played an important role in Geneva\'s intellectual and cultural life.',
        'de': 'Die Société de Belles-Lettres Genf wurde [JAHR] von einer Handvoll Studenten gegründet, die sich für Literatur, Kunst und Kultur begeisterten. Seit ihrer Gründung spielt sie eine wichtige Rolle im intellektuellen und kulturellen Leben Genfs.',
        'it': 'La Société de Belles-Lettres Ginevra è stata fondata nel [ANNO] da un gruppo di studenti appassionati di letteratura, arte e cultura. Dalla sua creazione, ha svolto un ruolo importante nella vita intellettuale e culturale di Ginevra.'
    },
    'history.origins.text2': {
        'fr': 'À ses débuts, la société rassemblait principalement des étudiants en lettres et en droit, mais elle s\'est rapidement ouverte à toutes les facultés, enrichissant ainsi les échanges et les débats.',
        'en': 'In its early days, the society mainly brought together students of literature and law, but it quickly opened up to all faculties, thus enriching exchanges and debates.',
        'de': 'In ihren Anfängen brachte die Gesellschaft hauptsächlich Studenten der Literatur und des Rechts zusammen, öffnete sich aber schnell für alle Fakultäten und bereicherte so den Austausch und die Debatten.',
        'it': 'Nei suoi primi giorni, la società riuniva principalmente studenti di letteratura e diritto, ma si è rapidamente aperta a tutte le facoltà, arricchendo così gli scambi e i dibattiti.'
    },
    'history.origins.text3': {
        'fr': 'Au fil des décennies, la Société de Belles-Lettres Genève a su préserver son identité tout en évoluant avec son temps, perpétuant des traditions séculaires tout en restant ancrée dans la modernité.',
        'en': 'Over the decades, the Société de Belles-Lettres Geneva has preserved its identity while evolving with the times, perpetuating age-old traditions while remaining anchored in modernity.',
        'de': 'Im Laufe der Jahrzehnte hat die Société de Belles-Lettres Genf ihre Identität bewahrt und sich gleichzeitig mit der Zeit weiterentwickelt, indem sie jahrhundertealte Traditionen fortführte und gleichzeitig in der Moderne verankert blieb.',
        'it': 'Nel corso dei decenni, la Société de Belles-Lettres Ginevra ha preservato la sua identità evolvendosi con i tempi, perpetuando tradizioni secolari pur rimanendo ancorata alla modernità.'
    },
    'history.timeline.title': {
        'fr': 'Chronologie',
        'en': 'Timeline',
        'de': 'Zeitleiste',
        'it': 'Cronologia'
    },
    'history.timeline.foundation.title': {
        'fr': 'Fondation',
        'en': 'Foundation',
        'de': 'Gründung',
        'it': 'Fondazione'
    },
    'history.timeline.foundation.text': {
        'fr': 'Création de la Société de Belles-Lettres Genève par un groupe d\'étudiants.',
        'en': 'Creation of the Société de Belles-Lettres Geneva by a group of students.',
        'de': 'Gründung der Société de Belles-Lettres Genf durch eine Gruppe von Studenten.',
        'it': 'Creazione della Société de Belles-Lettres Ginevra da parte di un gruppo di studenti.'
    },
    'history.timeline.location.title': {
        'fr': 'Premier local',
        'en': 'First Location',
        'de': 'Erster Standort',
        'it': 'Prima sede'
    },
    'history.timeline.location.text': {
        'fr': 'Acquisition du premier local de la société au cœur de Genève.',
        'en': 'Acquisition of the society\'s first premises in the heart of Geneva.',
        'de': 'Erwerb der ersten Räumlichkeiten der Gesellschaft im Herzen von Genf.',
        'it': 'Acquisizione della prima sede della società nel cuore di Ginevra.'
    },
    'history.timeline.publication.title': {
        'fr': 'Publication',
        'en': 'Publication',
        'de': 'Veröffentlichung',
        'it': 'Pubblicazione'
    },
    'history.timeline.publication.text': {
        'fr': 'Première édition de la revue de la Société de Belles-Lettres.',
        'en': 'First edition of the Société de Belles-Lettres journal.',
        'de': 'Erste Ausgabe der Zeitschrift der Société de Belles-Lettres.',
        'it': 'Prima edizione della rivista della Société de Belles-Lettres.'
    },
    'history.timeline.event.title': {
        'fr': 'Événement majeur',
        'en': 'Major Event',
        'de': 'Großes Ereignis',
        'it': 'Evento importante'
    },
    'history.timeline.event.text': {
        'fr': 'Organisation du premier grand événement public de la société.',
        'en': 'Organization of the society\'s first major public event.',
        'de': 'Organisation der ersten großen öffentlichen Veranstaltung der Gesellschaft.',
        'it': 'Organizzazione del primo grande evento pubblico della società.'
    },
    'history.timeline.centenary.title': {
        'fr': 'Centenaire',
        'en': 'Centenary',
        'de': 'Hundertjahrfeier',
        'it': 'Centenario'
    },
    'history.timeline.centenary.text': {
        'fr': 'Célébration du centenaire de la Société de Belles-Lettres Genève.',
        'en': 'Celebration of the centenary of the Société de Belles-Lettres Geneva.',
        'de': 'Feier des hundertjährigen Bestehens der Société de Belles-Lettres Genf.',
        'it': 'Celebrazione del centenario della Société de Belles-Lettres Ginevra.'
    },
    'history.timeline.modern.title': {
        'fr': 'Ère moderne',
        'en': 'Modern Era',
        'de': 'Moderne Ära',
        'it': 'Era moderna'
    },
    'history.timeline.modern.text': {
        'fr': 'La société continue de perpétuer ses traditions tout en s\'adaptant aux enjeux contemporains.',
        'en': 'The society continues to perpetuate its traditions while adapting to contemporary challenges.',
        'de': 'Die Gesellschaft führt ihre Traditionen fort und passt sich gleichzeitig den zeitgenössischen Herausforderungen an.',
        'it': 'La società continua a perpetuare le sue tradizioni adattandosi alle sfide contemporanee.'
    },
    'history.figures.title': {
        'fr': 'Personnages marquants',
        'en': 'Notable Figures',
        'de': 'Bedeutende Persönlichkeiten',
        'it': 'Figure di spicco'
    },
    'history.figures.founder': {
        'fr': 'Fondateur',
        'en': 'Founder',
        'de': 'Gründer',
        'it': 'Fondatore'
    },
    'history.figures.president': {
        'fr': 'Président historique',
        'en': 'Historical President',
        'de': 'Historischer Präsident',
        'it': 'Presidente storico'
    },
    'history.figures.figure': {
        'fr': 'Figure emblématique',
        'en': 'Emblematic Figure',
        'de': 'Symbolische Figur',
        'it': 'Figura emblematica'
    },
    
    // Revue
    'revue.page.title': {
        'fr': 'La Nouvelle Revue - Société de Belles-Lettres Genève',
        'en': 'The New Review - Société de Belles-Lettres Geneva',
        'de': 'Die Neue Revue - Société de Belles-Lettres Genf',
        'it': 'La Nuova Rivista - Société de Belles-Lettres Ginevra'
    },
    'revue.page.description': {
        'fr': 'Découvrez la Nouvelle Revue de Belles-Lettres, un espace d\'expression poétique et artistique des membres.',
        'en': 'Discover the New Review of Belles-Lettres, a space for poetic and artistic expression by members.',
        'de': 'Entdecken Sie die Neue Revue von Belles-Lettres, einen Raum für poetischen und künstlerischen Ausdruck der Mitglieder.',
        'it': 'Scopri la Nuova Rivista di Belles-Lettres, uno spazio di espressione poetica e artistica dei membri.'
    },
    'revue.hero.title': {
        'fr': 'La Nouvelle Revue de Belles-Lettres',
        'en': 'The New Review of Belles-Lettres',
        'de': 'Die Neue Revue von Belles-Lettres',
        'it': 'La Nuova Rivista di Belles-Lettres'
    },
    'revue.hero.subtitle': {
        'fr': 'Expression poétique et artistique des membres',
        'en': 'Poetic and artistic expression of members',
        'de': 'Poetischer und künstlerischer Ausdruck der Mitglieder',
        'it': 'Espressione poetica e artistica dei membri'
    },
    'revue.presentation.title': {
        'fr': 'Présentation de la Revue',
        'en': 'About the Review',
        'de': 'Über die Revue',
        'it': 'Presentazione della Rivista'
    },
    'revue.presentation.text1': {
        'fr': 'La Nouvelle Revue de Belles-Lettres est un espace d\'expression libre où les membres de notre société partagent leurs créations littéraires, poétiques et artistiques.',
        'en': 'The New Review of Belles-Lettres is a space for free expression where members of our society share their literary, poetic and artistic creations.',
        'de': 'Die Neue Revue von Belles-Lettres ist ein Raum für freie Meinungsäußerung, in dem die Mitglieder unserer Gesellschaft ihre literarischen, poetischen und künstlerischen Kreationen teilen.',
        'it': 'La Nuova Rivista di Belles-Lettres è uno spazio di libera espressione dove i membri della nostra società condividono le loro creazioni letterarie, poetiche e artistiche.'
    },
    'revue.presentation.text2': {
        'fr': 'Ces textes n\'ont aucun but scientifique, littéraire ou de revendication d\'originalité. Ils sont simplement des compilations poétiques, une expression de beauté et d\'idées, et ne sont pas monétisables.',
        'en': 'These texts have no scientific or literary purpose, nor do they claim originality. They are simply poetic compilations, an expression of beauty and ideas, and are not monetizable.',
        'de': 'Diese Texte haben keinen wissenschaftlichen oder literarischen Zweck und erheben keinen Anspruch auf Originalität. Sie sind einfach poetische Zusammenstellungen, ein Ausdruck von Schönheit und Ideen, und sind nicht monetarisierbar.',
        'it': 'Questi testi non hanno alcuno scopo scientifico o letterario, né rivendicano originalità. Sono semplicemente compilazioni poetiche, un\'espressione di bellezza e idee, e non sono monetizzabili.'
    },
    'revue.presentation.text3': {
        'fr': 'Nous vous invitons à découvrir ces œuvres qui reflètent la diversité de pensée et la richesse créative de nos membres.',
        'en': 'We invite you to discover these works that reflect the diversity of thought and creative richness of our members.',
        'de': 'Wir laden Sie ein, diese Werke zu entdecken, die die Vielfalt des Denkens und den kreativen Reichtum unserer Mitglieder widerspiegeln.',
        'it': 'Vi invitiamo a scoprire queste opere che riflettono la diversità di pensiero e la ricchezza creativa dei nostri membri.'
    },
    'revue.disclaimer.title': {
        'fr': 'Note importante',
        'en': 'Important Note',
        'de': 'Wichtiger Hinweis',
        'it': 'Nota importante'
    },
    'revue.disclaimer.text': {
        'fr': 'Les textes et œuvres présentés dans cette section sont des expressions personnelles des membres de la Société de Belles-Lettres Genève. Ils n\'ont aucune prétention scientifique ou littéraire et ne sont pas destinés à être monétisés. Ils représentent simplement un espace d\'expression artistique et poétique.',
        'en': 'The texts and works presented in this section are personal expressions of the members of the Société de Belles-Lettres Geneva. They have no scientific or literary pretensions and are not intended to be monetized. They simply represent a space for artistic and poetic expression.',
        'de': 'Die in diesem Abschnitt präsentierten Texte und Werke sind persönliche Ausdrucksformen der Mitglieder der Société de Belles-Lettres Genf. Sie haben keine wissenschaftlichen oder literarischen Ansprüche und sind nicht zur Monetarisierung bestimmt. Sie stellen einfach einen Raum für künstlerischen und poetischen Ausdruck dar.',
        'it': 'I testi e le opere presentati in questa sezione sono espressioni personali dei membri della Société de Belles-Lettres Ginevra. Non hanno pretese scientifiche o letterarie e non sono destinati ad essere monetizzati. Rappresentano semplicemente uno spazio di espressione artistica e poetica.'
    },
    'revue.publications.title': {
        'fr': 'Publications récentes',
        'en': 'Recent Publications',
        'de': 'Neueste Veröffentlichungen',
        'it': 'Pubblicazioni recenti'
    },
    'revue.publications.example1.title': {
        'fr': 'Exemple de publication',
        'en': 'Publication Example',
        'de': 'Veröffentlichungsbeispiel',
        'it': 'Esempio di pubblicazione'
    },
    'revue.publications.example1.author': {
        'fr': 'Par [Nom de l\'auteur]',
        'en': 'By [Author Name]',
        'de': 'Von [Autorenname]',
        'it': 'Di [Nome dell\'autore]'
    },
    'revue.publications.example1.date': {
        'fr': 'Publié le [Date]',
        'en': 'Published on [Date]',
        'de': 'Veröffentlicht am [Datum]',
        'it': 'Pubblicato il [Data]'
    },
    'revue.publications.example1.description': {
        'fr': 'Description brève de cette publication. Les administrateurs du site pourront ajouter ici de véritables publications au fur et à mesure.',
        'en': 'Brief description of this publication. Site administrators will be able to add real publications here as they become available.',
        'de': 'Kurze Beschreibung dieser Veröffentlichung. Website-Administratoren können hier nach und nach echte Veröffentlichungen hinzufügen.',
        'it': 'Breve descrizione di questa pubblicazione. Gli amministratori del sito potranno aggiungere qui pubblicazioni reali man mano che diventano disponibili.'
    },
    'revue.publications.example2.title': {
        'fr': 'Exemple de publication',
        'en': 'Publication Example',
        'de': 'Veröffentlichungsbeispiel',
        'it': 'Esempio di pubblicazione'
    },
    'revue.publications.example2.author': {
        'fr': 'Par [Nom de l\'auteur]',
        'en': 'By [Author Name]',
        'de': 'Von [Autorenname]',
        'it': 'Di [Nome dell\'autore]'
    },
    'revue.publications.example2.date': {
        'fr': 'Publié le [Date]',
        'en': 'Published on [Date]',
        'de': 'Veröffentlicht am [Datum]',
        'it': 'Pubblicato il [Data]'
    },
    'revue.publications.example2.description': {
        'fr': 'Description brève de cette publication. Les administrateurs du site pourront ajouter ici de véritables publications au fur et à mesure.',
        'en': 'Brief description of this publication. Site administrators will be able to add real publications here as they become available.',
        'de': 'Kurze Beschreibung dieser Veröffentlichung. Website-Administratoren können hier nach und nach echte Veröffentlichungen hinzufügen.',
        'it': 'Breve descrizione di questa pubblicazione. Gli amministratori del sito potranno aggiungere qui pubblicazioni reali man mano che diventano disponibili.'
    },
    'revue.publications.download': {
        'fr': 'Télécharger le PDF',
        'en': 'Download PDF',
        'de': 'PDF herunterladen',
        'it': 'Scarica PDF'
    },
    'revue.contribution.title': {
        'fr': 'Comment contribuer',
        'en': 'How to Contribute',
        'de': 'Wie man beitragen kann',
        'it': 'Come contribuire'
    },
    'revue.contribution.text1': {
        'fr': 'La Nouvelle Revue de Belles-Lettres est ouverte aux contributions de tous les membres de la société.',
        'en': 'The New Review of Belles-Lettres is open to contributions from all members of the society.',
        'de': 'Die Neue Revue von Belles-Lettres steht Beiträgen aller Mitglieder der Gesellschaft offen.',
        'it': 'La Nuova Rivista di Belles-Lettres è aperta ai contributi di tutti i membri della società.'
    },
    'revue.contribution.text2': {
        'fr': 'Si vous souhaitez partager vos créations, veuillez contacter le comité éditorial via le formulaire de contact en précisant votre intention de contribuer à la revue.',
        'en': 'If you wish to share your creations, please contact the editorial committee via the contact form, specifying your intention to contribute to the review.',
        'de': 'Wenn Sie Ihre Kreationen teilen möchten, kontaktieren Sie bitte das Redaktionskomitee über das Kontaktformular und geben Sie Ihre Absicht an, zur Revue beizutragen.',
        'it': 'Se desideri condividere le tue creazioni, contatta il comitato editoriale tramite il modulo di contatto, specificando la tua intenzione di contribuire alla rivista.'
    },
    'revue.contribution.text3': {
        'fr': 'Tous les formats sont acceptés (poèmes, essais, nouvelles, dessins, etc.) tant qu\'ils peuvent être présentés sous forme de PDF.',
        'en': 'All formats are accepted (poems, essays, short stories, drawings, etc.) as long as they can be presented in PDF format.',
        'de': 'Alle Formate werden akzeptiert (Gedichte, Essays, Kurzgeschichten, Zeichnungen usw.), solange sie im PDF-Format präsentiert werden können.',
        'it': 'Tutti i formati sono accettati (poesie, saggi, racconti, disegni, ecc.) purché possano essere presentati in formato PDF.'
    },
    'revue.contribution.contact': {
        'fr': 'Contacter le comité éditorial',
        'en': 'Contact the Editorial Committee',
        'de': 'Kontaktieren Sie das Redaktionskomitee',
        'it': 'Contatta il comitato editoriale'
    },
    
    // Autres pages
    // ... Ajouter les traductions pour les autres pages selon le même modèle
};
