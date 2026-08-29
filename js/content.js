/* Testi lineari: una cosa per frase, da leggere ad alta voce. */
(function (root) {
  const C = {};

  C.worlds = [
    { id: "w-lucciole", name: "il bosco", line: "Siete in un bosco di notte. Le lucciole fanno un po' di luce." },
    { id: "w-nonna", name: "la cucina gigante", line: "Siete in una cucina enorme. Siete piccoli come formiche." },
    { id: "w-isola", name: "l'isola", line: "Siete su un'isola. L'isola cammina, perché è sul guscio di una tartaruga." },
    { id: "w-soffitta", name: "la soffitta", line: "Siete in una soffitta piena di giochi vecchi." },
    { id: "w-tappeto", name: "sotto il tappeto", line: "Siete sotto il tappeto. C'è una città di briciole e bottoni." },
    { id: "w-caramello", name: "il vulcano", line: "Siete vicino a un vulcano. Invece della lava esce caramello caldo." },
    { id: "w-biblio", name: "la biblioteca", line: "Siete in una biblioteca infinita. I corridoi di libri non finiscono." },
    { id: "w-treno", name: "il treno", line: "Siete su un treno che viaggia tra le nuvole." },
    { id: "w-ombre", name: "il mercato", line: "Siete in un mercato. Si comprano ombre e sbadigli." },
    { id: "w-lago", name: "il lago", line: "Siete su un lago ghiacciato. Si scivola." },
    { id: "w-specchio", name: "lo specchio", line: "Siete dentro uno specchio. I riflessi si muovono da soli." },
    { id: "w-fattoria", name: "la fattoria", line: "Siete in una fattoria. Il sole tramonta in pochi minuti." },
    { id: "w-sale", name: "il deserto", line: "Siete in un deserto di sale. Se correte, fate rumore." },
    { id: "w-porto", name: "il porto", line: "Siete in un porto. I pesci volano." },
    { id: "w-gatti", name: "il giardino", line: "Siete in un giardino. I gatti curano le piante." },
    { id: "w-miniera", name: "la miniera", line: "Siete in una miniera. Si scava la luce delle stelle." },
    { id: "w-pozzo", name: "il pozzo", line: "Siete scesi in un pozzo. Sotto c'è un paesino." },
    { id: "w-circo", name: "il circo", line: "Siete in un circo vuoto. Il tendone c'è ancora." },
    { id: "w-scuola", name: "la scuola", line: "Siete in una scuola di magia. Gli incantesimi fanno l'opposto." },
    { id: "w-giganti", name: "la valle", line: "Siete in una valle. I giganti dormono per terra." },
    { id: "w-te", name: "la tazza", line: "Siete in un villaggio sul bordo di una tazza da tè." },
    { id: "w-divano", name: "sotto il divano", line: "Siete sotto il divano. C'è polvere e calzini persi." },
    { id: "w-faro", name: "il faro", line: "Siete a un faro. La luna è ferma vicino al molo." },
    { id: "w-ombrelli", name: "la foresta", line: "Siete in una foresta di ombrelli. Quando piove si aprono da soli." }
  ];

  C.quests = [
    { id: "q-uovo", name: "l'uovo dei compleanni", line: "Dovete riportare l'uovo dei compleanni. Senza quello nessuno festeggia." },
    { id: "q-chiave", name: "la chiave del domani", line: "Dovete ritrovare la chiave del domani. Senza quella i giorni non arrivano." },
    { id: "q-ricetta", name: "la ricetta del coraggio", line: "Dovete riprendere la ricetta del coraggio." },
    { id: "q-ombra", name: "l'ombra del paese", line: "Dovete riportare l'ombra del paese. Senza ombra non si dorme." },
    { id: "q-bussola", name: "la bussola", line: "Dovete raddrizzare la bussola. Ora punta a caso." },
    { id: "q-drago", name: "la lettera", line: "Dovete consegnare una lettera a un drago timido." },
    { id: "q-orologio", name: "l'orologio della cena", line: "Dovete riavvolgere l'orologio della cena. Altrimenti si cena troppo tardi." },
    { id: "q-seme", name: "il seme della risata", line: "Dovete piantare il seme della risata." },
    { id: "q-mappa", name: "la mappa", line: "Dovete ricucire la mappa. Senza mappa vi perdete." },
    { id: "q-corona", name: "la corona", line: "Dovete nascondere una corona. Chi la mette diventa re, anche un cappello." },
    { id: "q-lume", name: "il lume", line: "Dovete accendere il lume dei persi. Ora è spento." },
    { id: "q-patto", name: "il patto", line: "Dovete spezzare un patto cattivo sulle scorciatoie." },
    { id: "q-canto", name: "il canto delle campane", line: "Dovete restituire la voce alle campane. Ora sono mute." },
    { id: "q-ponte", name: "il ponte", line: "Dovete ricostruire il ponte. Le due rive non si parlano." },
    { id: "q-gatto", name: "il gatto", line: "Dovete liberare il gatto che ricorda i nomi." },
    { id: "q-neve", name: "la farina", line: "Dovete fermare la neve di farina. Sta seppellendo i forni." },
    { id: "q-specchio", name: "lo specchio", line: "Dovete chiudere uno specchio che ruba i volti." },
    { id: "q-nave", name: "la nave di carta", line: "Dovete varare la nave di carta. Porta a casa chi è rimasto fuori." },
    { id: "q-lanterna", name: "la lanterna", line: "Dovete riempire la lanterna di storie. Così fa luce." },
    { id: "q-treno", name: "il vagone", line: "Dovete fermare un vagone che scappa da solo." },
    { id: "q-re", name: "il re delle pause", line: "Dovete svegliare il re delle pause. Altrimenti niente merenda." },
    { id: "q-colore", name: "il rosso", line: "Dovete restituire il rosso al tramonto. Ora il cielo è grigio." },
    { id: "q-chiave2", name: "il baule", line: "Dovete aprire il baule dei sì. Dentro ci sono i permessi di giocare ancora." },
    { id: "q-vento", name: "il vento", line: "Dovete calmare il vento. Racconta i segreti in piazza." }
  ];

  C.villains = [
    { id: "v-conte", name: "il Conte dei Minuti", line: "Il cattivo è il Conte dei Minuti. Ruba il tempo." },
    { id: "v-strega", name: "Strega Brodo", line: "La cattiva è Strega Brodo. Rovina i vostri piani." },
    { id: "v-re", name: "Re Tappo", line: "Il cattivo è Re Tappo. Chiude tutto con i tappi." },
    { id: "v-ombra", name: "la Signora Senza Ombra", line: "La cattiva è la Signora Senza Ombra. Ruba le ombre." },
    { id: "v-mago", name: "Mago Sbagliato", line: "Il cattivo è Mago Sbagliato. I suoi incantesimi fanno l'opposto." },
    { id: "v-lupo", name: "il Lupo dei Cuscini", line: "Il cattivo è il Lupo dei Cuscini. Vi addormenta quando non dovete." },
    { id: "v-capitano", name: "Capitano Muffa", line: "Il cattivo è Capitano Muffa. Fa ammuffire le cose." },
    { id: "v-bambola", name: "la Bambola", line: "La cattiva è la Bambola Direttore. Vuole comandare tutti." },
    { id: "v-cuoco", name: "Chef Fulmine", line: "Il cattivo è Chef Fulmine. Tira tempeste in faccia." },
    { id: "v-bibliotecaria", name: "la Bibliotecaria", line: "La cattiva è la Bibliotecaria del Silenzio. Cancella le parole." },
    { id: "v-nano", name: "il Nano", line: "Il cattivo è il Nano delle Scorciatoie. Vi fa perdere." },
    { id: "v-gatto", name: "Gatto Imperatore", line: "Il cattivo è Gatto Imperatore. Vuole che obbediate." },
    { id: "v-gelataio", name: "il Gelataio", line: "Il cattivo è il Gelataio Gelido. Congela i piedi." },
    { id: "v-pittore", name: "il Pittore", line: "Il cattivo è il Pittore. Dipinge porte false." },
    { id: "v-sarto", name: "il Sarto", line: "Il cattivo è il Sarto. Cuce vestiti che stringono." },
    { id: "v-posta", name: "il Postino dei No", line: "Il cattivo è il Postino dei No. Non consegna mai i sì." },
    { id: "v-rana", name: "Rana Sindaca", line: "La cattiva è Rana Sindaca. Non vi fa entrare in paese." },
    { id: "v-drago", name: "il Drago", line: "Il cattivo è il Drago degli Sbadigli. Vi addormenta." },
    { id: "v-specchio", name: "il Gemello", line: "Il cattivo è il Gemello nello specchio. Copia i gesti e li fa cattivi." },
    { id: "v-mulo", name: "Mulo Doganiere", line: "Il cattivo è Mulo Doganiere. Blocca la strada." },
    { id: "v-luna", name: "la Luna Storta", line: "La cattiva è la Luna Storta. Sposta le cose di notte." },
    { id: "v-sacco", name: "il Sacco", line: "Il cattivo è il Sacco dei Rimpianti. Inghiotte le cose." },
    { id: "v-coro", name: "il Coro", line: "Il cattivo è il Coro dei Non si può. Vi fa stare fermi." },
    { id: "v-reclock", name: "l'Orologiaio", line: "Il cattivo è l'Orologiaio Invertito. Fa andare il tempo all'indietro." }
  ];

  C.treasures = [
    { id: "t-fischietto", name: "un fischietto" },
    { id: "t-calza", name: "una calza magica" },
    { id: "t-mela", name: "una mela" },
    { id: "t-chiave", name: "una chiave" },
    { id: "t-pennello", name: "un pennello" },
    { id: "t-tazza", name: "una tazza" },
    { id: "t-dado", name: "un dado strano" },
    { id: "t-cappa", name: "una cappa" },
    { id: "t-lanterna", name: "una lanterna" },
    { id: "t-corda", name: "una corda" },
    { id: "t-pane", name: "un pane" },
    { id: "t-specchio", name: "uno specchietto" },
    { id: "t-sasso", name: "un sasso" },
    { id: "t-piuma", name: "una piuma" },
    { id: "t-orologio", name: "un orologio" },
    { id: "t-mappa", name: "una mappa" },
    { id: "t-anello", name: "uno spago" },
    { id: "t-foglio", name: "un foglio" },
    { id: "t-campana", name: "una campanella" },
    { id: "t-seme", name: "un seme" },
    { id: "t-guanti", name: "dei guanti" },
    { id: "t-bussola", name: "una bussola" },
    { id: "t-sacco", name: "un sacchetto" },
    { id: "t-corona", name: "una coroncina" }
  ];

  C.npcs = [
    { id: "n-talpa", name: "la talpa", line: "Vi aiuta la talpa. Conosce i cunicoli." },
    { id: "n-nonno", name: "Nonno Nebbia", line: "Vi aiuta Nonno Nebbia." },
    { id: "n-owl", name: "la civetta", line: "Vi aiuta la civetta. Porta le lettere." },
    { id: "n-bimbo", name: "il bambino di fumo", line: "Vi aiuta un bambino fatto di fumo." },
    { id: "n-cuoca", name: "la cuoca", line: "Vi aiuta la cuoca." },
    { id: "n-cane", name: "il cane", line: "Vi aiuta un cane. La coda fa luce." },
    { id: "n-sarta", name: "la sarta", line: "Vi aiuta la sarta." },
    { id: "n-pescatore", name: "il pescatore", line: "Vi aiuta il pescatore." },
    { id: "n-regina", name: "la regina delle formiche", line: "Vi aiuta la regina delle formiche." },
    { id: "n-robot", name: "la stufetta", line: "Vi aiuta una stufetta parlante." },
    { id: "n-albero", name: "l'albero", line: "Vi aiuta un albero. Non ha pazienza." },
    { id: "n-topo", name: "il topo", line: "Vi aiuta il topo della biblioteca." },
    { id: "n-fata", name: "la fata", line: "Vi aiuta una fata. Solo se avete già provato." },
    { id: "n-guardia", name: "la guardia", line: "Vi aiuta una guardia di paglia." },
    { id: "n-mercante", name: "il mercante", line: "Vi aiuta il mercante." },
    { id: "n-lumaca", name: "la lumaca", line: "Vi aiuta la lumaca. È lenta, ma non sbaglia strada." },
    { id: "n-pirata", name: "il pirata", line: "Vi aiuta un pirata in pensione." },
    { id: "n-stella", name: "la stella", line: "Vi aiuta una stella caduta." },
    { id: "n-fornaio", name: "il fornaio", line: "Vi aiuta il fornaio." },
    { id: "n-rana", name: "la rana", line: "Vi aiuta la rana." },
    { id: "n-ombra", name: "un'ombra", line: "Vi aiuta un'ombra smarrita." },
    { id: "n-drago", name: "un draghetto", line: "Vi aiuta un draghetto raffreddato." },
    { id: "n-nonna", name: "Nonna Chiavi", line: "Vi aiuta Nonna Chiavi." },
    { id: "n-vento", name: "il vento", line: "Vi aiuta il vento apprendista." },
    { id: "n-statua", name: "la statua", line: "Vi aiuta una statua. Parla se la salutate." },
    { id: "n-ape", name: "l'ape", line: "Vi aiuta un'ape." },
    { id: "n-re", name: "il re dei calzini", line: "Vi aiuta il re dei calzini." },
    { id: "n-fantasma", name: "il fantasma", line: "Vi aiuta il fantasma della merenda." },
    { id: "n-ponte", name: "il ponte parlante", line: "Vi aiuta un ponte parlante." },
    { id: "n-gatto", name: "il gatto", line: "Vi aiuta un gatto senza nome." },
    { id: "n-orologiaio", name: "l'orologiaia", line: "Vi aiuta l'orologiaia." },
    { id: "n-mulo", name: "il mulo", line: "Vi aiuta un mulo poeta." }
  ];

  C.roles = [
    { id: "r-esplora", name: "Esploratore", knack: "trova la strada" },
    { id: "r-cuoco", name: "Cuoco", knack: "cucina e fa pace" },
    { id: "r-inventa", name: "Inventore", knack: "costruisce cose" },
    { id: "r-parla", name: "Ambasciatore", knack: "parla con tutti" },
    { id: "r-guarda", name: "Sentinella", knack: "vede i dettagli" },
    { id: "r-cura", name: "Guaritore", knack: "sistema i graffi" },
    { id: "r-furbo", name: "Birichino", knack: "sa nascondersi" },
    { id: "r-forza", name: "Spalla forte", knack: "spinge e solleva" },
    { id: "r-canto", name: "Cantastorie", knack: "racconta storie" },
    { id: "r-animale", name: "Amico degli animali", knack: "parla con gli animali" },
    { id: "r-mappa", name: "Cartografo", knack: "non si perde" },
    { id: "r-ombra", name: "Cacciatore", knack: "segue le piste" },
    { id: "r-dado", name: "Portafortuna", knack: "porta fortuna" },
    { id: "r-scala", name: "Arrampicatore", knack: "sa salire" },
    { id: "r-eco", name: "Ascoltatore", knack: "sente gli echi" },
    { id: "r-chiave", name: "Chiavaio", knack: "apre le porte" },
    { id: "r-faro", name: "Portatore di luce", knack: "tiene la lanterna" },
    { id: "r-scudo", name: "Custode", knack: "protegge gli altri" }
  ];

  C.locations = [
    { id: "l-ponte", name: "un ponte" },
    { id: "l-cucina", name: "una cucina" },
    { id: "l-pozzo", name: "un pozzo" },
    { id: "l-mercato", name: "un mercato" },
    { id: "l-grotta", name: "una grotta" },
    { id: "l-torre", name: "una torre" },
    { id: "l-fiume", name: "un fiume" },
    { id: "l-stalla", name: "una stalla" },
    { id: "l-salone", name: "un salone" },
    { id: "l-tetto", name: "un tetto" },
    { id: "l-boschetto", name: "un boschetto" },
    { id: "l-mulino", name: "un mulino" },
    { id: "l-spiaggia", name: "una spiaggia" },
    { id: "l-treno", name: "un vagone" },
    { id: "l-cimitero", name: "un giardino di statue" },
    { id: "l-biblioteca", name: "una sala di libri" },
    { id: "l-cantina", name: "una cantina" },
    { id: "l-piazza", name: "una piazza" },
    { id: "l-faro", name: "un faro" },
    { id: "l-miniera", name: "un cunicolo" },
    { id: "l-teatro", name: "un teatro" },
    { id: "l-orto", name: "un orto" },
    { id: "l-ponte2", name: "un ponticello" },
    { id: "l-nido", name: "un nido" },
    { id: "l-scala", name: "una scala" },
    { id: "l-lago", name: "uno specchio d'acqua" },
    { id: "l-tenda", name: "una tenda" },
    { id: "l-forno", name: "un forno" },
    { id: "l-vicolo", name: "un vicolo" },
    { id: "l-albero", name: "un albero cavo" },
    { id: "l-molo", name: "un molo" },
    { id: "l-cassa", name: "una stanza" },
    { id: "l-ghiaccio", name: "una serra" },
    { id: "l-campane", name: "un campanile" },
    { id: "l-tappeto", name: "una sala" },
    { id: "l-soffitta", name: "una soffitta" },
    { id: "l-chiostro", name: "un cortile" },
    { id: "l-cava", name: "una cava" },
    { id: "l-ponte3", name: "una passerella" },
    { id: "l-cuccia", name: "una cuccia" },
    { id: "l-orologio", name: "una stanza-orologio" },
    { id: "l-serra", name: "una serra di fiori" },
    { id: "l-magazzino", name: "un magazzino" },
    { id: "l-crocevia", name: "un crocevia" },
    { id: "l-cascata", name: "una cascata" },
    { id: "l-archivio", name: "un archivio" },
    { id: "l-cucina2", name: "una dispensa" },
    { id: "l-tunnel", name: "un tunnel" }
  ];

  function ch(id, title, a, b, c, c1, c2) {
    return {
      id,
      title,
      story: [a, b, c],
      prompt: "Cosa fate?",
      choices: [c1, c2]
    };
  }
  function opt(id, label, green, red, greenNext, redNext) {
    return { id, label, dmg: 1, green, red, greenNext, redNext };
  }

  C.challenges = [
    ch("c-ponte", "Il ponte",
      "Dove siete: {location}.",
      "C'è un ponte stretto. Sotto c'è un buco.",
      "Dovete passare.",
      opt("run", "Corriamo", "Passate di corsa.", "{actor} scivola e perde un cuore. Fate il giro lungo.", "Siete arrivati in tempo.", "Arrivate tardi."),
      opt("build", "Facciamo un ponticello", "Il ponticello tiene. Passate.", "{actor} cade e perde un cuore. Girate intorno.", "Il ponticello vi ha salvati.", "Siete stanchi per il giro.")
    ),
    ch("c-indovinello", "La domanda",
      "Dove siete: {location}.",
      "Una voce chiede: «Che cosa si può spezzare senza toccarla?»",
      "Dovete rispondere.",
      opt("think", "Rispondiamo: una promessa", "La voce è contenta. Passate.", "La voce non è contenta. {actor} perde un cuore. Girate.", "La strada è aperta.", "Dovete fare il giro."),
      opt("trick", "Facciamo una domanda noi", "La voce si confonde. Passate.", "{actor} viene spinto via e perde un cuore.", "Siete passati.", "Uscite da un'altra parte.")
    ),
    ch("c-social", "Chi blocca",
      "Dove siete: {location}.",
      "{npc} vi blocca la strada. Ha paura di {villain}.",
      "Dovete fargli fare strada.",
      opt("kind", "Spieghiamo la missione", "{npc} vi crede. Vi fa passare.", "{npc} non vi crede. {actor} perde un cuore. Andate comunque, ma scoperti.", "{npc} è con voi.", "Siete da soli."),
      opt("trade", "Proponiamo uno scambio", "Lo scambio è fatto. Passate.", "È una trappola. {actor} perde un cuore.", "Avete un aiuto.", "Niente aiuto.")
    ),
    ch("c-stealth", "Le sentinelle",
      "Dove siete: {location}.",
      "Ci sono le sentinelle di {villain}.",
      "Dovete passare senza farvi vedere.",
      opt("shadow", "Strisciamo in silenzio", "Nessuno vi vede. Passate.", "Uno starnuto. {actor} perde un cuore. Scappate.", "Nessuno sa che ci siete.", "Vi hanno visti."),
      opt("disguise", "Ci travestiamo", "Il travestimento funziona. Passate.", "Il travestimento cade. {actor} perde un cuore.", "Sembra che siate di qui.", "Le facce sono note.")
    ),
    ch("c-chase", "L'inseguimento",
      "Dove siete: {location}.",
      "Un servo di {villain} scappa con {treasure}.",
      "Dovete acchiapparlo.",
      opt("sprint", "Corriamo dietro", "Lo acchiappate. {treasure} è vostro.", "{actor} inciampa e perde un cuore. Il servo scappa.", "Avete {treasure}.", "Non avete {treasure}."),
      opt("cut", "Tagliamo la strada", "Lo beccate. {treasure} è vostro.", "Vicolo cieco. {actor} perde un cuore.", "Avete {treasure}.", "Il servo è lontano.")
    ),
    ch("c-help", "La trappola",
      "Dove siete: {location}.",
      "{npc} è bloccato in una trappola.",
      "Dovete liberarlo.",
      opt("care", "La apriamo con calma", "{npc} è libero. Vi ringrazia.", "La trappola morde. {actor} perde un cuore. {npc} esce lo stesso.", "{npc} cammina con voi.", "{npc} ha troppa paura per aiutarvi."),
      opt("force", "Tiriamo forte", "La trappola si rompe. {npc} è salvo.", "Lo strattone fa male. {actor} perde un cuore.", "{npc} è con voi.", "Avete fatto rumore.")
    ),
    ch("c-moral", "La scelta",
      "Dove siete: {location}.",
      "{treasure} sta per cadere. {npc} sta per essere scoperto.",
      "Potete salvare una cosa sola, adesso.",
      opt("item", "Salviamo l'oggetto", "Avete {treasure}. {npc} ce la fa da solo.", "Perdete tutte e due. {actor} perde un cuore.", "Avete {treasure}.", "Non avete niente."),
      opt("friend", "Salviamo l'amico", "{npc} è salvo. {treasure} è nel cespuglio.", "Vi scoprono. {actor} perde un cuore.", "{npc} è con voi.", "Vi hanno visti.")
    ),
    ch("c-explore", "Il segno",
      "Dove siete: {location}.",
      "Il posto sembra vuoto.",
      "Dovete cercare un segno di {villain}.",
      opt("high", "Guardiamo in alto", "Trovate un segno. Sapete dove andare.", "Vi cade addosso qualcosa. {actor} perde un cuore.", "Sapete la strada.", "Non sapete la strada."),
      opt("low", "Frughiamo in basso", "Trovate un passaggio basso. Passate.", "Qualcosa morde. {actor} perde un cuore.", "C'è un passaggio.", "Niente passaggio.")
    ),
    ch("c-storm", "La bufera",
      "Dove siete: {location}.",
      "Arriva una bufera. L'ha mandata {villain}.",
      "Dovete resistere.",
      opt("shelter", "Ci accovacciamo", "La bufera passa. Restate qui.", "La bufera vi prende. {actor} perde un cuore. Vi spinge via.", "Siete ancora sulla strada.", "Siete fuori strada."),
      opt("sing", "Cantiamo", "Il vento si calma. Restate qui.", "Il vento si offende. {actor} perde un cuore.", "Siete sulla strada.", "Siete lontani.")
    ),
    ch("c-lock", "La porta",
      "Dove siete: {location}.",
      "Una porta è chiusa.",
      "Dovete aprirla.",
      opt("key", "Proviamo le chiavi", "La porta si apre.", "La porta morde. {actor} perde un cuore. Cercate una finestra.", "Siete dentro.", "Entrate dalla finestra."),
      opt("ask", "Chiediamo scusa alla porta", "La porta si apre.", "La porta sbatte. {actor} perde un cuore.", "La porta è amica.", "La porta è chiusa.")
    ),
    ch("c-climb", "La salita",
      "Dove siete: {location}.",
      "Dovete salire.",
      "In cima c'è la strada.",
      opt("slow", "Salita lenta", "Arrivate in cima.", "{actor} cade e perde un cuore. Cercate un'altra salita.", "Siete in cima.", "Siete ancora sotto."),
      opt("leap", "Facciamo un salto", "Il salto riesce. Siete in cima.", "{actor} cade e perde un cuore.", "Siete in cima, in silenzio.", "Avete fatto rumore.")
    ),
    ch("c-cook", "Il pentolone",
      "Dove siete: {location}.",
      "Un pentolone vuole un piatto.",
      "Dovete cucinare.",
      opt("careful", "Seguiamo la ricetta", "Il pentolone è contento. Apre una botola.", "Schizza. {actor} perde un cuore.", "C'è una botola.", "Uscite dalla dispensa."),
      opt("improv", "Inventiamo", "Il pentolone ride. Apre la porta.", "Il brodo esplode. {actor} perde un cuore.", "Uscite dal retro.", "Uscite sporchi.")
    ),
    ch("c-dark", "Il buio",
      "Dove siete: {location}.",
      "Qui è buio. Il buio sente i passi.",
      "Dovete avanzare.",
      opt("silent", "Camminiamo piano", "Il buio non vi sente. Uscite.", "Un rumore. {actor} perde un cuore.", "Siete usciti nel punto giusto.", "Siete usciti storti."),
      opt("light", "Accendiamo un lume piccolo", "Il buio accetta la luce. Vi fa strada.", "Troppa luce. {actor} perde un cuore.", "Il buio vi ha aiutati.", "Il buio vi ha cacciati.")
    ),
    ch("c-market", "Il mercato",
      "Dove siete: {location}.",
      "Qualcuno vende una notizia su {villain}.",
      "Dovete ottenerla.",
      opt("fair", "Raccontiamo una storia vera", "Avete la notizia. Sapete dove andare.", "Non vi credono. {actor} perde un cuore.", "Sapete dove andare.", "Non sapete niente."),
      opt("bluff", "Facciamo finta di essere ispettori", "Funziona. Avete la notizia.", "Il bluff fallisce. {actor} perde un cuore.", "Avete la notizia.", "Vi hanno cacciati.")
    ),
    ch("c-bridge-riddle", "Il guardiano",
      "Dove siete: {location}.",
      "Un guardiano vieta il passo.",
      "Dovete passare.",
      opt("paper", "Mostriamo un permesso", "Il guardiano vi fa passare.", "Manca un bollo. {actor} perde un cuore.", "Siete oltre.", "Siete in coda."),
      opt("side", "Passiamo di lato", "Passate di lato.", "Vi beccano. {actor} perde un cuore.", "Siete oltre.", "Dovete girare.")
    ),
    ch("c-ice", "Il ghiaccio",
      "Dove siete: {location}.",
      "Il suolo è scivoloso.",
      "Dovete attraversare.",
      opt("slide", "Scivoliamo di proposito", "Arrivate dall'altra parte.", "{actor} sbatte e perde un cuore.", "Siete oltre.", "Dovete strisciare."),
      opt("grip", "Ci teniamo forte", "Passate lenti e salvi.", "{actor} molla e perde un cuore.", "Siete oltre.", "Siete caduti.")
    ),
    ch("c-song", "Il canto",
      "Dove siete: {location}.",
      "Questo posto si apre solo se cantate.",
      "Dovete cantare.",
      opt("solo", "Canta chi ha il turno", "Il posto si apre.", "Fischi. {actor} perde un cuore.", "La strada è aperta.", "Dovete girare."),
      opt("choir", "Cantiamo tutti", "Il posto si apre.", "Troppo caos. {actor} perde un cuore.", "Siete passati.", "Vi ha spinti via.")
    ),
    ch("c-trap", "Il pavimento",
      "Dove siete: {location}.",
      "Alcune mattonelle tengono. Altre no.",
      "Dovete attraversare.",
      opt("test", "Proviamo ogni passo", "Passate. Il pavimento vi lascia stare.", "Una mattonella cede. {actor} perde un cuore.", "Siete oltre.", "Dovete fare il bordo."),
      opt("dash", "Corriamo dritti", "Sorprendete il pavimento. Siete oltre.", "{actor} cade e perde un cuore.", "Siete oltre, veloci.", "Siete lenti e doloranti.")
    ),
    ch("c-animal", "La bestia",
      "Dove siete: {location}.",
      "Una bestia blocca la strada. Non è cattiva. È solo arrabbiata.",
      "Dovete farvi accettare.",
      opt("food", "Offriamo da mangiare", "La bestia vi fa passare.", "Non era cibo, per lei. {actor} perde un cuore.", "La bestia vi scorta.", "Siete da soli."),
      opt("bow", "Facciamo un inchino", "La bestia vi rispetta. Passate.", "L'inchino è troppo corto. {actor} perde un cuore.", "Passate.", "La bestia se ne va.")
    ),
    ch("c-repair", "L'aggeggio",
      "Dove siete: {location}.",
      "C'è un aggeggio rotto. Dovrebbe aiutarvi.",
      "Dovete ripararlo.",
      opt("manual", "Seguiamo le istruzioni", "Parte. Vi porta avanti.", "Scossa. {actor} perde un cuore. Andate a piedi.", "Arrivate portati.", "Andate a piedi."),
      opt("kick", "Diamo un colpo", "Parte. Vi porta avanti.", "Punto sbagliato. {actor} perde un cuore.", "Arrivate di slancio.", "L'aggeggio è morto.")
    ),
    ch("c-memory", "I ricordi",
      "Dove siete: {location}.",
      "Il posto mostra ricordi. Alcuni sono bugie di {villain}.",
      "Dovete trovare quello vero.",
      opt("focus", "Cerchiamo quello vero", "Trovate una cosa vera. Sapete dove andare.", "Ingoiate una bugia. {actor} perde un cuore.", "Sapete dove andare.", "Avete una pista falsa."),
      opt("close", "Usciamo a occhi chiusi", "Uscite. Non vi fate fregare.", "{actor} inciampa e perde un cuore.", "Siete sulla strada vera.", "Uscite storti.")
    ),
    ch("c-crowd", "La folla",
      "Dove siete: {location}.",
      "Una folla crede che siate amici di {villain}.",
      "Dovete farvi ascoltare o andarne via.",
      opt("speech", "Parliamo chiaro", "La folla vi crede. Vi indica la strada.", "La folla non ascolta. {actor} perde un cuore.", "Sapete la strada.", "Dovete scappare."),
      opt("exit", "Ce ne andiamo", "Uscite senza problemi.", "{actor} inciampa e perde un cuore.", "Nessuno vi ferma.", "Qualcuno vi ha visti.")
    ),
    ch("c-water", "L'acqua",
      "Dove siete: {location}.",
      "C'è da attraversare l'acqua.",
      "Dovete passare.",
      opt("float", "Facciamo una zattera", "La zattera galleggia. Sbarcate.", "La zattera affonda. {actor} perde un cuore.", "Siete sulla riva giusta.", "Dovete girare sulla sponda."),
      opt("swim", "Nuotiamo", "Arrivate sull'altra riva.", "La corrente tira. {actor} perde un cuore.", "Siete sulla riva giusta.", "Siete a valle.")
    ),
    ch("c-time", "I minuti",
      "Dove siete: {location}.",
      "I minuti scappano verso {villain}.",
      "Dovete fermarne uno.",
      opt("catch", "Lo acchiappiamo", "Ne tenete uno. Avete tempo.", "Morde. {actor} perde un cuore.", "Avete tempo.", "Siete in ritardo."),
      opt("wait", "Aspettiamo fermi", "I minuti si annoiano e se ne vanno. Siete in orario.", "{actor} si annoia e perde un cuore. Siete in ritardo.", "Siete in orario.", "Siete in ritardo.")
    ),
    ch("c-maze", "Il labirinto",
      "Dove siete: {location}.",
      "È un labirinto.",
      "Dovete uscire.",
      opt("left", "Sempre a sinistra", "Uscite sulla strada giusta.", "Vi perdete. {actor} perde un cuore.", "Siete sulla strada giusta.", "Siete usciti storti."),
      opt("mark", "Lasciamo dei segni", "I segni restano. Uscite.", "I segni spariscono. {actor} perde un cuore.", "Non vi perdete.", "Vi siete persi.")
    ),
    ch("c-gift", "Il dono",
      "Dove siete: {location}.",
      "C'è un dono. Sembra {treasure}. Forse è una trappola di {villain}.",
      "Dovete decidere.",
      opt("take", "Lo prendiamo con calma", "Era quasi una trappola. Ora è vostro, sul serio.", "È una trappola. {actor} perde un cuore.", "Avete l'oggetto.", "Non avete l'oggetto."),
      opt("leave", "Lo lasciamo", "Il dono, per dispetto, indica la strada.", "Il dono vi insegue. {actor} perde un cuore.", "Sapete la strada.", "Non sapete la strada.")
    ),
    ch("c-night", "La ronda",
      "Dove siete: {location}.",
      "{villain} sta facendo il giro.",
      "Dovete passare senza farvi vedere.",
      opt("creep", "Camminiamo quando russa {npc}", "Passate. {villain} non alza la testa.", "{npc} smette di russare. {actor} perde un cuore.", "Nessuno vi ha visti.", "{villain} vi ha visti."),
      opt("decoy", "Facciamo un rumore dall'altra parte", "{villain} va là. Voi passate di qua.", "{villain} viene da voi. {actor} perde un cuore.", "{villain} è lontano.", "{villain} è vicino.")
    ),
    ch("c-storm2", "Il tetto",
      "Dove siete: {location}.",
      "Il tetto sta volando via. Sotto c'è {npc}.",
      "Dovete fare qualcosa.",
      opt("hold", "Teniamo il tetto", "Il tetto resta. {npc} è salvo.", "Il tetto vince. {actor} perde un cuore.", "{npc} è con voi.", "{npc} resta indietro."),
      opt("run", "Tiriamo fuori {npc}", "{npc} è fuori. Siete salvi.", "{actor} inciampa e perde un cuore.", "Siete tutti fuori.", "La via dritta è chiusa.")
    ),
    ch("c-riddle2", "Tre porte",
      "Dove siete: {location}.",
      "Ci sono tre porte. Una è giusta. Una no. Una va da {villain} troppo presto.",
      "Dovete scegliere.",
      opt("listen", "Ascoltiamo dietro le porte", "Scegliete quella giusta.", "Scegliete quella sbagliata. {actor} perde un cuore.", "Siete sulla via giusta.", "Siete troppo vicini a {villain}."),
      opt("smell", "Seguiamo l'odore buono", "Scegliete quella giusta.", "L'odore mente. {actor} perde un cuore.", "Siete sulla via giusta.", "Siete sulla via sbagliata.")
    ),
    ch("c-duel", "La sfida",
      "Dove siete: {location}.",
      "Un servo di {villain} vi sfida.",
      "Dovete rispondere.",
      opt("stare", "Gara di sguardi", "Il servo batte le palpebre. Se ne va.", "{actor} batte le palpebre e perde un cuore.", "Via libera.", "Arrivano gli amici del servo."),
      opt("game", "Gara di equilibrio", "Vincete. Il servo se ne va.", "{actor} cade e perde un cuore.", "Via libera.", "Il servo chiama aiuto.")
    ),
    ch("c-map", "La mappa",
      "Dove siete: {location}.",
      "Trovate una mappa. Forse è vera. Forse no.",
      "Dovete decidere.",
      opt("trust", "La seguiamo", "È abbastanza vera. Vi porta.", "È una trappola. {actor} perde un cuore.", "Siete sulla via giusta.", "Siete sulla via di {villain}."),
      opt("redraw", "La rifacciamo noi", "La vostra mappa è brutta e giusta.", "Vi perdete. {actor} perde un cuore.", "Avete una mappa vostra.", "Siete persi.")
    ),
    ch("c-comfort", "La paura",
      "Dove siete: {location}.",
      "{npc} ha troppa paura.",
      "Dovete calmarlo. Se urla, {villain} sente.",
      opt("talk", "Parliamo piano", "{npc} si calma.", "Le parole escono storte. {actor} perde un cuore. {npc} urla.", "{npc} è con voi.", "{villain} ha sentito."),
      opt("joke", "Facciamo una battuta", "{npc} ride e si calma.", "La battuta è sbagliata. {actor} perde un cuore.", "Nessun allarme.", "{npc} piange più forte.")
    ),
    ch("c-climb2", "Il vuoto",
      "Dove siete: {location}.",
      "C'è un vuoto. Dovete passare.",
      "Dovete farvi una catena.",
      opt("chain", "Ci teniamo per mano", "Passate.", "Un anello cede. {actor} perde un cuore.", "Siete oltre.", "Dovete girare sotto."),
      opt("throw", "Lanciamo chi è più leggero", "Il lancio riesce. Siete oltre.", "Il lancio va male. {actor} perde un cuore.", "Siete oltre, in fretta.", "Avete fatto rumore.")
    ),
    ch("c-shop", "Il permesso",
      "Dove siete: {location}.",
      "Qui serve un permesso per passare.",
      "Dovete ottenerlo.",
      opt("polite", "Chiediamo per favore", "Avete il permesso.", "Troppa cortesia. {actor} perde un cuore. Niente permesso.", "Le porte si aprono.", "Le porte restano chiuse."),
      opt("cousin", "Chiediamo a {npc} di presentarsi", "Avete il permesso.", "{npc} non basta. {actor} perde un cuore.", "Siete in regola.", "Siete degli intrusi.")
    ),
    ch("c-echo", "Gli echi",
      "Dove siete: {location}.",
      "Gli echi dicono cose sbagliate.",
      "Dovete capire la strada.",
      opt("eyes", "Ci fidiamo degli occhi", "Uscite sulla via giusta.", "{actor} inciampa e perde un cuore.", "Siete sulla via giusta.", "Siete storti."),
      opt("ears", "Ascoltiamo l'eco meno bugiardo", "Un eco vi guida. Uscite.", "Era l'eco più bugiardo. {actor} perde un cuore.", "Siete sulla via giusta.", "Siete sulla via di {villain}.")
    ),
    ch("c-finalish", "L'allarme",
      "Dove siete: {location}.",
      "Parte un allarme. {villain} potrebbe sentire.",
      "Dovete spegnerlo.",
      opt("smash", "Lo rompiamo", "Silenzio. {villain} non ha sentito.", "L'allarme colpisce. {actor} perde un cuore. Poi urla di più.", "Nessun allarme.", "{villain} ha sentito."),
      opt("whisper", "Gli chiediamo di smettere", "L'allarme si spegne.", "Non ascolta. {actor} perde un cuore.", "Siete ancora nascosti.", "{villain} arriva.")
    ),
    ch("c-feast", "La tavola",
      "Dove siete: {location}.",
      "C'è da mangiare. Forse è di {villain}.",
      "Dovete decidere se mangiare.",
      opt("taste", "Un assaggio piccolo", "Era buono. Avete energia.", "Era una trappola. {actor} perde un cuore.", "Siete in forma.", "Siete pesanti."),
      opt("skip", "Non mangiamo", "Siete lucidi. Andate.", "Avete troppa fame. {actor} perde un cuore.", "Siete lucidi.", "Siete deboli.")
    ),
    ch("c-keyhunt", "La chiave",
      "Dove siete: {location}.",
      "Serve una chiave. Ce ne sono di false.",
      "Dovete trovare quella vera.",
      opt("grid", "Cerchiamo con calma", "Trovate quella vera.", "Trovate quella falsa. {actor} perde un cuore.", "Avete la chiave.", "Non avete la chiave."),
      opt("luck", "Mettiamo una mano a caso", "Fortuna. Chiave vera.", "Trappola. {actor} perde un cuore.", "Avete la chiave.", "Non avete la chiave.")
    ),
    ch("c-wind", "Il vento",
      "Dove siete: {location}.",
      "Il vento vi spinge. L'ha mandato {villain}.",
      "Dovete fare qualcosa.",
      opt("resist", "Ci teniamo fermi", "Il vento passa. Restate qui.", "Il vento vi sposta. {actor} perde un cuore.", "Siete dove volevate.", "Siete dove vuole {villain}."),
      opt("ride", "Usiamo il vento", "Volate nel punto giusto.", "Direzione sbagliata. {actor} perde un cuore.", "Siete nel punto giusto.", "Siete nel punto sbagliato.")
    ),
    ch("c-promise", "La promessa",
      "Dove siete: {location}.",
      "{npc} chiede una promessa. Se la fate, vi aiuta.",
      "Dovete decidere.",
      opt("yes", "Promettiamo sul serio", "{npc} vi aiuta.", "La voce trema. {actor} perde un cuore. {npc} non aiuta.", "{npc} è con voi.", "{npc} non aiuta."),
      opt("later", "Diciamo: dopo", "{npc} accetta. Vi dà un aiuto piccolo.", "{npc} si offende. {actor} perde un cuore.", "Avete un piccolo aiuto.", "Niente aiuto.")
    )
  ];

  C.climax = [
    {
      id: "x-confront",
      title: "Il cattivo",
      story: [
        "Dove siete: {location}.",
        "Ecco {villain}.",
        "Dovete chiudere la missione: {questName}."
      ],
      prompt: "Cosa fate?",
      choices: [
        opt("brave", "Andiamo avanti", "Ce la fate. {villain} indietreggia. Missione finita.", "{actor} perde un cuore. Dovete scappare. La missione resta aperta.", "", ""),
        opt("talk", "Parliamo", "Le parole funzionano. Missione finita.", "{actor} perde un cuore. Dovete scappare.", "", "")
      ]
    },
    {
      id: "x-steal",
      title: "Il colpo",
      story: [
        "Dove siete: {location}.",
        "{villain} è distratto. {treasure} è lì.",
        "Dovete prenderlo. Missione: {questName}."
      ],
      prompt: "Cosa fate?",
      choices: [
        opt("sneak", "Lo prendiamo in silenzio", "Preso. Missione finita.", "Un rumore. {actor} perde un cuore. Scappate.", "", ""),
        opt("run", "Entriamo di slancio", "Preso. Missione finita.", "Caos. {actor} perde un cuore. Scappate.", "", "")
      ]
    },
    {
      id: "x-break",
      title: "Il trucco",
      story: [
        "Dove siete: {location}.",
        "Il potere di {villain} sta in un trucco.",
        "Dovete spezzarlo. Missione: {questName}."
      ],
      prompt: "Cosa fate?",
      choices: [
        opt("break", "Lo rompiamo", "Si spezza. Missione finita.", "Non si spezza. {actor} perde un cuore. Scappate.", "", ""),
        opt("turn", "Lo giriamo contro di lui", "Funziona. Missione finita.", "Rimbalza. {actor} perde un cuore. Scappate.", "", "")
      ]
    }
  ];

  C.openings = [
    [
      "{worldLine}",
      "La missione: {questLine}",
      "Il cattivo: {villainLine}",
      "Un amico: {npcLine}",
      "Ognuno ha 3 cuori. A zero si esce da questa storia.",
      "Si legge. Si sceglie. Si gira la bussola.",
      "Verde: va bene. Giallo: gira ancora. Rosso: un cuore in meno."
    ]
  ];

  C.winEndings = [
    ["Ce l'avete fatta.", "{villain} è fermo.", "Avete finito la missione.", "Si torna a casa."]
  ];

  C.failEndings = [
    ["Nessuno è rimasto in gioco.", "{villain} tiene ancora tutto.", "Questa storia è finita. Se ne fa un'altra, un altro giorno."]
  ];

  C.fleeEndings = [
    ["Siete scappati.", "Siete vivi.", "La missione resta aperta. Si torna un altro giorno."]
  ];

  C.deathLines = [
    "{name} esce da questa storia. Si rivede a cena.",
    "{name} è fuori gioco, per stavolta."
  ];

  root.AF_CONTENT = C;
})(typeof window !== "undefined" ? window : globalThis);
