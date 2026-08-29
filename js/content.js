/* Spedizioni tipo «Gira e sopravvivi»: concreto, in seconda persona, niente fiaba. */
(function (root) {
  const C = {};

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

  C.roles = [
    { id: "r-guida", name: "Guida", knack: "legge il terreno" },
    { id: "r-medico", name: "Medico", knack: "tiene in piedi i feriti" },
    { id: "r-mecc", name: "Meccanico", knack: "ripara quello che c'è" },
    { id: "r-radio", name: "Radio", knack: "tiene il contatto" },
    { id: "r-esplora", name: "Esploratore", knack: "va avanti" },
    { id: "r-porto", name: "Portatore", knack: "tiene le scorte" },
    { id: "r-nav", name: "Navigatore", knack: "tiene la rotta" },
    { id: "r-sent", name: "Sentinella", knack: "vede prima degli altri" },
    { id: "r-pilot", name: "Pilota", knack: "sa le macchine" },
    { id: "r-ling", name: "Interprete", knack: "parla con chi trovate" },
    { id: "r-geo", name: "Geologo", knack: "legge roccia e sabbia" },
    { id: "r-sub", name: "Sommozzatore", knack: "sta in acqua" },
    { id: "r-cacci", name: "Cacciatore", knack: "trova cibo e tracce" },
    { id: "r-ing", name: "Ingegnere", knack: "improvvisa strutture" }
  ];

  C.campaigns = [
    {
      id: "camp-jungle",
      name: "la giungla",
      title: "Giungla mortale",
      goal: "raggiungere la costa e accendere il fumogeno",
      goalNeeded: 5,
      threat: "la giungla",
      threatLine: "Il nemico è il terreno: umidità, fiumi, insetti, e le ore di luce che vi restano.",
      setting: "L'aereo ha lasciato un sentiero di rottami per duecento metri. Il motore fuma ancora. Intorno, la volta delle foglie taglia il sole: sotto è umido e ogni passo fa rumore.",
      locations: ["il relitto", "il fiume in piena", "il sentiero di cinghiali", "la palude", "il crinale", "il villaggio abbandonato", "la foce", "la spiaggia"],
      opening: [
        "Tre ore fa l'aereo ha perso un motore sopra la canopy. Avete camminato fuori dal relitto. Radio morta, un ferito già fasciato, acqua per un giorno se non la sprecate.",
        "{worldLine}",
        "L'obiettivo è concreto: {goal}. La carta dice costa a est, due giorni se il terreno tiene. Se sbagliate il fiume, sono quattro.",
        "{villainLine}",
        "Ognuno ha tre vite. A zero quella persona è fuori combattimento: il gruppo va avanti senza di lei. Verde alla ruota: l'azione riesce e avanzate di un passo verso la costa. Giallo: si gira ancora. Rosso: un ferito, e non avanzate. Si va avanti finché uscite o finite le vite."
      ],
      challenges: [
        ch("j-fiume", "Il fiume",
          "Siete a {location}. L'acqua è alta, marrone, e porta rami. L'unica via diretta è un ponte di liane; l'alternativa è scendere a valle e perdere mezza giornata.",
          "Sull'altra sponda il sentiero riprende verso est. Restare qui a notte significa zanzare e niente fuoco asciutto.",
          "{actor} deve decidere adesso, prima che la luce cali dietro le foglie.",
          opt("liane", "Passiamo sulle liane",
            "Le liane tengono. {actor} va per primo, gli altri dietro a un metro. Sull'altra sponda il sentiero è segnato: orme e un taglio di machete vecchio. Avete guadagnato il giorno.",
            "A metà ponte una liana cede. {actor} cade in acqua. La corrente vi trascina a valle. Perdete lo zaino laterale e un giorno di cammino. {actor} esce con la spalla slogata.",
            "Siete a est del fiume, sulla traccia giusta. La costa è un giorno più vicina.",
            "Siete a valle, bagnati, senza metà scorte. Dovete risalire il bordo e trovare un altro varco. Non avete avanzato."
          ),
          opt("valle", "Scendiamo a valle",
            "Il guado basso c'è, duecento metri a sud. Acqua alla vita, fondo di sassi. Attraverse in venti minuti. I vestiti si asciugano camminando. La rotta tiene.",
            "Il fondo è fango. {actor} affonda fino al ginocchio e si sloga una caviglia tirandosi fuori. Tornate indietro. Il ponte di liane, adesso, è l'unica opzione e avete già perso un'ora.",
            "Il fiume è alle spalle. Camminate di nuovo verso est, in orario.",
            "Siete ancora sulla stessa sponda, con un ferito. Il fiume non l'avete passato."
          )
        ),
        ch("j-machete", "Il sottobosco",
          "A {location} il sentiero sparisce. Liane, spine, visibilità a tre metri. Il GPS dà un punto, non una strada.",
          "Tagliare costa tempo e fatica. Girare intorno costa chilometri. L'acqua è già a metà.",
          "{actor} ha il machete.",
          opt("taglia", "Tagliamo dritti",
            "{actor} taglia per un'ora. Uscite su un crinale con vista: a est, un filo di mare. Avete la direzione, non solo il punto sul display.",
            "Il machete slitta. {actor} si apre l'avambraccio. Fascia, disinfettante, venti minuti persi. Il sottobosco è ancora lì. Non avete avanzato.",
            "Dal crinale la costa è visibile. Sapete dove andare.",
            "Siete ancora nel groviglio, con meno benda e meno tempo-luce."
          ),
          opt("gira", "Giriamo a nord",
            "A nord il terreno sale e si apre. Perdete un'ora ma camminate. Ritrovate un sentiero da animali che punta est-sud-est. Va bene.",
            "A nord c'è una frana recente. {actor} scivola. Ginocchio gonfio. Tornate sul punto di partenza. Stesso sottobosco, un ferito in più.",
            "Siete di nuovo su una traccia. Est è chiaro.",
            "Avete fatto un giro e siete al punto di prima. Peggio: {actor} zoppica."
          )
        ),
        ch("j-notte", "Il buio",
          "A {location} il sole è già sotto le foglie. Avete venti minuti di luce utile. Niente fuoco alto: fumo basso, o niente.",
          "Fermarsi qui è umido. Andare avanti al buio è come camminare bendati. Qualcosa si muove a venti metri: probabilmente un pecari.",
          "{actor} decide se accampare o spingere.",
          opt("campo", "Ci fermiamo e facciamo campo",
            "Telo, amache alte, fuoco basso. Nessuno dorme bene, ma all'alba siete interi e la rotta è la stessa. Avete retto la notte senza perdere terreno.",
            "Il telo non tiene. Piove. {actor} passa la notte bagnato e al mattino ha la febbre. Dovete fermarvi fino a mezzogiorno. Non avanzate.",
            "Alba. Zaini in spalla. Est di nuovo, con la rotta che tenevate ieri.",
            "Perdete la mattina a far scendere la febbre. Il fiume, se c'è ancora da passarlo, aspetta."
          ),
          opt("spingi", "Camminiamo ancora un'ora",
            "Camminate un'ora con le torce. Trovate un dosso più asciutto e un albero marcato. Avete guadagnato un tratto che di giorno vi avrebbe preso lo stesso tempo.",
            "{actor} inciampa in una radice e si apre il sopracciglio. Sangue, torcia a terra, dieci minuti a riorganizzarsi. Tornate al punto di prima. Niente guadagno.",
            "All'alba siete già più avanti del campo di ieri. La costa è più vicina.",
            "Siete al punto di ieri, con una medicazione in più. Il buio non vi ha dato niente."
          )
        ),
        ch("j-radio", "La radio",
          "A {location} la radio fa un soffio, due secondi, poi muore. Batteria al tre percento. C'è un'antenna da alzare o un pezzo da asciugare.",
          "Un contatto, anche corto, vi dà una direzione di soccorso. Senza, restano bussola e carta bagnata.",
          "{actor} ha le mani sulla radio.",
          opt("antenna", "Alziamo l'antenna",
            "{actor} lega l'antenna a un ramo. Tre parole passano: «costa… fumogeno… attesa». Poi silenzio. Basta. Sapete che a est vi cercano.",
            "Il ramo cede. La radio cade nell'acqua. {actor} si taglia la mano ripescandola. Morta. Niente contatto, un ferito.",
            "Avete un punto di incontro: costa, fumogeno. La marcia ha un senso preciso.",
            "Niente radio, una mano fasciata. Tornate alla carta e al rumore del fiume."
          ),
          opt("asciuga", "Asciughiamo il circuito",
            "Risina, straccio, dieci minuti. La radio tiene un canale basso. Coordinate approssimative, ma sufficienti. Le segnate sul dorso della carta.",
            "Il corto brucia il resto della batteria e scotta {actor} alle dita. Radio morta. Niente cifre.",
            "Avete le coordinate. Potete correggere la rotta di un quarto verso sud-est.",
            "Senza radio e con le dita ustionate. La carta resta quella di ieri."
          )
        ),
        ch("j-ponte", "Il dirupo",
          "A {location} il sentiero è tagliato da un dirupo di sei metri. In fondo, sassi e un rivolo. A destra, una scaletta di radici. A sinistra, saltare e sperare.",
          "Il gruppo con un ferito non salta. Il gruppo intero può tentare.",
          "{actor} valuta il bordo.",
          opt("radici", "Scendiamo sulle radici",
            "Le radici tengono. Scendete uno alla volta, zaino passato a mano. In fondo il rivolo è acqua buona. Riempite le borracce. Avete il fondo della valle e la direzione.",
            "{actor} molla una presa. Cade due metri. Caviglia. Dovete issarlo su e cercare un altro punto. Il dirupo è ancora lì.",
            "Siete sotto, con acqua. Il sentiero di valle va a est.",
            "Siete ancora sul bordo, con {actor} che non poggia. Il dirupo non è stato passato."
          ),
          opt("salta", "Saltiamo nel punto stretto",
            "Il punto stretto è tre metri. {actor} salta per primo, tiene, prende gli zaini. Gli altri seguono. Siete giù in cinque minuti.",
            "{actor} atterra storto. Ginocchio. Gli altri non saltano. Dovete tornare alle radici, più tardi, con un uomo in meno sul peso.",
            "Siete giù in pochi minuti. La valle è vostra e il sentiero riprende.",
            "Siete sul bordo. {actor} non cammina dritto. Il salto è chiuso."
          )
        ),
        ch("j-villaggio", "Le capanne",
          "A {location} ci sono tre capanne vuote, fuoco spento da giorni. Una pentola, una traccia di pneumatico, niente gente.",
          "Potete prendere ciò che è utile e andarne via, o cercare chi c'era. Cercare costa luce.",
          "{actor} entra per primo.",
          opt("prendi", "Prendiamo acqua e andiamo",
            "Trovate due taniche e un telo. Niente altro di pulito. Uscite in dieci minuti. Il sentiero a est è una pista da moto: più veloce del sottobosco.",
            "Sotto il telo c'è un nido di vespe. {actor} prende tre punture al collo. Gonfiore, respiro corto per un'ora. Restate fermi. Niente pista.",
            "Siete sulla pista. La costa è un cammino da veicolo, non da machete.",
            "Siete ancora alle capanne, {actor} con il collo fasciato. La pista aspetta."
          ),
          opt("cerca", "Cerchiamo chi c'era",
            "Dietro la terza capanna c'è un uomo. Vi indica est, due ore, «mare». Non viene. Vi dà un fiasco. Partite con una direzione detta da qualcuno che ci vive.",
            "Dietro la capanna non c'è nessuno. {actor} pesta una trappola a laccio, caviglia tagliata. Perdete un'ora a tagliare e fasciare. Niente informazione.",
            "Due ore a est, ha detto. Camminate su quella parola.",
            "Senza guida e con un taglio. Le capanne non vi hanno dato la costa."
          )
        ),
        ch("j-palude", "La palude",
          "A {location} l'acqua è ferma, alta al ginocchio, radici a vista. Il punto solido è una lingua di terra a sud, più lunga.",
          "Attraversare dritti è un'ora se il fondo tiene. La lingua è tre ore. Le sanguisughe sono già sui polpacci.",
          "{actor} prova il fondo.",
          opt("dritto", "Attraversiamo dritti",
            "Il fondo tiene. Un'ora, fango fino alla cintura, e uscite. Togliete le sanguisughe. Siete dall'altra parte, in orario.",
            "{actor} trova una buca. Affonda fino al petto. Vi ci vuole venti minuti a tirarlo fuori. Una scarpa persa, un ginocchio aperto. Tornate sulla riva di partenza.",
            "Palude alle spalle. Est di nuovo, con le gambe ancora buone.",
            "Stessa riva, una scarpa in meno. La palude non è stata superata."
          ),
          opt("lingua", "Facciamo il giro sulla terra",
            "Tre ore, ma asciutti. La lingua vi lascia su un dosso con vista sul mare: è lì, grigio, tra le palme. Avete visto l'obiettivo.",
            "Sulla lingua {actor} prende un crampo da disidratazione. Fermata di mezz'ora, sale. Tornate indietro: non ce la fa a chiudere il giro oggi.",
            "Avete visto il mare. Domani è un tratto, non un'ipotesi.",
            "Niente mare, un crampo, stessa palude davanti."
          )
        ),
        ch("j-costa", "L'ultimo tratto",
          "A {location} sentite le onde. Non le vedete ancora. Il terreno scende, l'aria sa di sale. Manca un tratto di dune e palme basse.",
          "Se uscite adesso sulla spiaggia avete il fumogeno. Se sbagliate la foce, siete di nuovo in palude.",
          "{actor} tiene la bussola.",
          opt("dune", "Usciamo sulle dune",
            "Le dune ci sono. In dieci minuti siete sulla sabbia. Il fumogeno è nello zaino. Avete la costa.",
            "Non sono dune, è un altro braccio di palude. {actor} affonda e si graffia una gamba sul legno sommerso. Tornate indietro a cercare il filo di sale nell'aria.",
            "Siete sulla spiaggia. Manca solo accendere e aspettare.",
            "Siete ancora dentro, con una gamba aperta. La spiaggia c'è, non l'avete presa."
          ),
          opt("foce", "Seguiamo la foce",
            "La foce vi porta in un arco di sabbia. Barche lontane, o un'illusione. Il fumogeno ha senso, qui. Siete arrivati al bordo.",
            "La foce è un labirinto di canali. {actor} si perde dieci minuti e torna con una storta. Stesso fango. Niente arco.",
            "Siete al mare. L'obiettivo è a portata di accendino.",
            "Canali, storta, niente mare. Ripartite dal punto di prima."
          )
        )
      ],
      climax: {
        id: "x-jungle",
        title: "Il fumogeno",
        story: [
          "Siete a {location}. Avete la sabbia sotto gli scarponi e il fumogeno in mano. A tre miglia, se la radio di ieri non mentiva, c'è un aereo in attesa del fumo.",
          "Vento da terra. Se lo accendete adesso, il fumo va sul mare. Se aspettate, il vento può girare e coprirvi la canopy.",
          "{actor} tiene l'anello."
        ],
        prompt: "Cosa fate?",
        choices: [
          opt("ora", "Accendiamo adesso",
            "Il fumogeno parte. Colonna arancione, dritta. Dieci minuti dopo sentite il motore. L'aereo vi ha visti. Siete fuori.",
            "Il fumogeno è umido. Parte, muore. {actor} si brucia la mano sul involucro. Niente colonna. Dovete asciugarne un altro, se c'è, o fare fuoco di legno umido — e siete ancora sulla spiaggia.",
            "", ""
          ),
          opt("fuoco", "Facciamo un fuoco alto",
            "Legno secco delle dune, olio della cassetta. Il fumo è nero e alto. Vi vedono. L'aereo bassa. Fine della marcia.",
            "Il legno è umido. Il fuoco non prende. {actor} resta troppo vicino e si ustiona l'avambraccio. Niente segnale. Siete ancora lì.",
            "", ""
          )
        ]
      },
      win: [
        "L'aereo è sulla spiaggia. Vi caricano. La giungla resta alle spalle, concreta come è stata: fango, radio, sangue di zanzara.",
        "Avete raggiunto la costa. {goal}: fatto. Qualcuno conta le bende. Qualcuno beve in silenzio.",
        "Siete fuori."
      ],
      fail: [
        "Le vite sono finite. Il gruppo non cammina più come gruppo.",
        "{goal} resta a est, da qualche parte oltre un fiume che non avete passato.",
        "La spedizione è chiusa. Non c'è un secondo turno, qui: solo il fango, e il motore dell'aereo che non arriva."
      ]
    },
    {
      id: "camp-egypt",
      name: "la tomba",
      title: "La maledizione del faraone",
      goal: "uscire dal complesso funerario con la mappa della camera",
      goalNeeded: 5,
      threat: "il complesso",
      threatLine: "Il pericolo è strutturale: aria viziata, cunicoli instabili, trappole ancora in tensione dopo tremila anni.",
      setting: "Siete sotto la roccia, a otto metri dal piano del deserto. L'ingresso che avete aperto si è richiuso alle vostre spalle: sabbia e una lastra. L'unica via è in avanti, o non c'è.",
      locations: ["il corridoio d'ingresso", "la sala delle stele", "il pozzo", "la rampa", "la camera laterale", "il cunicolo basso", "l'anticamera", "la camera del sarcofago"],
      opening: [
        "La spedizione aveva un permesso e tre giorni. Il secondo giorno la lastra è scesa. Radio al 20 percento, lampade a otto ore, acqua per due se non correte.",
        "{worldLine}",
        "Obiettivo: {goal}. Senza la mappa, il Ministero non riapre il sito e voi restate un rapporto incompleto. Con la mappa, sapete quale pozzo porta fuori.",
        "{villainLine}",
        "Tre vite a testa. Zero: quella persona non cammina più. Verde: l'azione riesce, avanzate verso l'uscita. Giallo: si gira ancora. Rosso: un ferito, restare fermi. Si va avanti finché uscite o non resta nessuno in piedi."
      ],
      challenges: [
        ch("e-lastra", "La lastra",
          "A {location} una lastra di calcare è scesa di dieci centimetri e tiene. Potete alzarla con il martinetto o cercarne il perno e sbloccarlo.",
          "Senza passare, il resto del complesso è teoria. L'aria qui è già più pesante.",
          "{actor} ha il martinetto.",
          opt("martinetto", "Usiamo il martinetto",
            "Il martinetto alza quanto basta. Strisciate. Dall'altra parte il corridoio è libero e l'aria si muove: c'è un tiraggio. Avete un pezzo di via.",
            "Il calcare cede di lato. {actor} si prende un bordo sulla spalla. La lastra resta. Dovete fermarvi e ripensare il perno.",
            "Siete oltre la lastra. Il corridoio va avanti.",
            "Siete ancora di qua, {actor} con la spalla chiusa. La lastra non si è mossa."
          ),
          opt("perno", "Cerchiamo il perno",
            "{actor} trova il perno a destra, basso. Lo sblocca. La lastra sale di uno scatto. Passate in piedi, zaini compresi.",
            "Il perno scatta al contrario. Polvere, un peso sul polso di {actor}. Lussazione. La lastra è più bassa di prima.",
            "Piedi sul pavimento pulito. Il corridoio è vostro, avanti.",
            "Lastra più bassa, un polso. Non siete passati."
          )
        ),
        ch("e-aria", "L'aria",
          "A {location} l'ossimetro dà 17 percento. Potete tornare indietro a un pozzo di aerazione o andare avanti dieci minuti e sperare in un tiraggio.",
          "Dieci minuti a 17 è fattibile. Venti no, non per tutti.",
          "{actor} legge il display.",
          opt("pozzo", "Torniamo al pozzo d'aria",
            "Il pozzo c'è, cinque minuti indietro. Respirate. Poi ripartite con i polmoni pieni e una direzione: il tiraggio va verso l'anticamera.",
            "Il pozzo è ostruito. {actor} si siede, labbra blu per un minuto. Lo tirate su. Siete al punto di prima, più stanchi, senza aria nuova.",
            "Avete aria e una direzione di tiraggio. Avanzate su quella.",
            "Stesso corridoio, stesso 17 percento, un collasso evitato per poco. Non avanzate."
          ),
          opt("avanti", "Andiamo avanti dieci minuti",
            "A otto minuti l'aria si muove. Uscite in una sala più alta. 19 percento. Tenete. Avete guadagnato la sala.",
            "A dodici minuti {actor} cede. Lo trascinate indietro. Niente sala. Un uomo a terra per venti minuti.",
            "Siete nella sala alta. Il complesso si apre.",
            "Siete al punto di partenza, {actor} a terra. L'anticamera aspetta."
          )
        ),
        ch("e-trappola", "I pioli",
          "A {location} il pavimento ha pioli di alabastro. Tre sono abbassati. Il resto, se pesato male, spara un dardo o apre una caditoia. Lo sapete dai fori nel muro.",
          "Passare in fila indiana sui pioli giusti, o smontare la tensione dal lato.",
          "{actor} va per primo.",
          opt("pioli", "Passiamo sui pioli giusti",
            "{actor} marca i tre bassi e i vicini solidi. Passate. Nessun dardo. Siete nella stanza dopo, interi.",
            "{actor} sbaglia il quarto piolo. Un dardo di legno, spalla. Non è veleno, è un buco. Fascia. Tornate indietro a smontare, più lenti.",
            "Stanza dopo. I pioli restano alle spalle.",
            "Stessa soglia, una spalla forata. I pioli non sono stati superati puliti."
          ),
          opt("lato", "Smontiamo dal lato",
            "Trovate la corda di tensione. {actor} la taglia. I pioli diventano pavimento. Passate in tre minuti.",
            "La corda scatta. {actor} si prende un taglio al palmo. I pioli restano attivi. Dovete fare la fila indiana comunque, con una mano in meno.",
            "Pavimento morto. Avanti, in piedi, senza più i pioli sotto.",
            "Corda tagliata male, mano aperta, pioli ancora vivi. Non avete guadagnato la stanza."
          )
        ),
        ch("e-pozzo", "Il pozzo",
          "A {location} c'è un pozzo verticale, nove metri. In fondo, un passaggio. La fune è da 12. Potete calarvi o cercare la rampa che la carta del 1920 segnava a ovest.",
          "La rampa, se c'è, è più sicura. Se non c'è, avete perso un'ora.",
          "{actor} tiene la fune.",
          opt("cala", "Ci caliamo",
            "Calata pulita. {actor} in fondo, poi gli zaini, poi gli altri. Il passaggio c'è. Siete al livello inferiore.",
            "La fune brucia il palmo a {actor}. Molla un metro. Cade gli ultimi due. Caviglia. Lo issate. Il pozzo resta, il gruppo no, non così.",
            "Livello inferiore. La camera è più vicina.",
            "Siete ancora sul bordo. {actor} non poggia. Il pozzo non è stato disceso."
          ),
          opt("rampa", "Cerchiamo la rampa",
            "La rampa c'è, ostruita da due blocchi. Li spostate. Scendete camminando. Più lenti, interi. Siete sotto.",
            "La rampa è crollata. {actor} si prende polvere e un colpo in testa. Tornate al pozzo, un'ora dopo, con un livido e niente rampa.",
            "Siete sotto, a piedi. Il passaggio è lo stesso.",
            "Niente rampa, una testa fasciata, stesso pozzo."
          )
        ),
        ch("e-stele", "Le stele",
          "A {location} quattro stele coprono le pareti. Una ha un foro dietro, visibile di lato. Potrebbe essere un passaggio o una camera vuota.",
          "Spostare una stele è venti minuti e rumore. Il rumore, qui, fa cadere sabbia.",
          "{actor} ha la leva.",
          opt("foro", "Spostiamo la stele col foro",
            "La stele cede. Dietro c'è un cunicolo basso, aria in movimento. Strisciate. Uscite in un corridoio che la pianta non aveva. Avete una via nuova.",
            "La stele si spezza. Un pezzo colpisce {actor} al ginocchio. Dietro c'è muro. Venti minuti per niente, un ginocchio.",
            "Corridoio nuovo, tiraggio. Siete più dentro, verso l'uscita che la carta indica oltre l'anticamera.",
            "Stessa sala, ginocchio. Niente cunicolo."
          ),
          opt("altra", "Proviamo quella a est",
            "A est la stele è su binari di legno. Scorre. Dietro, una scala. La scala va su, verso un livello con più aria. La prendete.",
            "I binari cedono. La stele scivola su {actor} e gli pinca una gamba. La liberate. Niente scala. Una gamba morta per un'ora.",
            "Scala, aria, un livello sopra. Avete guadagnato quota verso l'uscita.",
            "Stele ferma, gamba pincata. La sala è la stessa."
          )
        ),
        ch("e-mappa", "Il papiro",
          "A {location} in una cassa c'è un papiro sotto vetro. Potrebbe essere la pianta del pozzo d'uscita. Aprirlo rischia di sbriciolarlo. Fotografarlo al buio è un'immagine inutile.",
          "Senza pianta, il pozzo giusto è uno su tre.",
          "{actor} ha i guanti.",
          opt("apri", "Apriamo e copiamo",
            "Si apre. {actor} copia i tre pozzi e il segno d'uscita. Dieci minuti. Rimettete il vetro. Avete la pianta in tasca.",
            "Il papiro si sbriciola al bordo. {actor} taglia un dito sul vetro. Avete metà disegno, illeggibile al pozzo centrale. Non basta per avanzare sicuri: restare e rifare la copia costa un'ora che non avete, e partite senza.",
            "Pianta in tasca. Il pozzo giusto ha un segno. Ci andate.",
            "Metà disegno, un dito. Non osate il pozzo. Siete fermi."
          ),
          opt("foto", "Fotografiamo e andiamo",
            "Due scatti, luce bassa, contrasto sufficiente. Sul display si legge il pozzo ovest. Partite su quello.",
            "Il flash fa cadere sabbia dal soffitto. {actor} si prende un sasso sulla spalla. La foto è mossa. Niente pozzo letto.",
            "Pozzo ovest, come sulla foto. Camminate lì senza indovinare.",
            "Foto inutile, spalla. La cassa è ancora lì e voi anche."
          )
        ),
        ch("e-cunicolo", "Il cunicolo",
          "A {location} il passaggio è alto sessanta centimetri. Zaini di lato, strisciare. Qualcuno ha le spalle larghe.",
          "L'alternativa è un giro di quaranta minuti in un corridoio che la pianta marca «instabile».",
          "{actor} va per primo.",
          opt("striscia", "Strisciamo",
            "Passate. Polvere, gomiti, otto minuti. Dall'altra parte l'anticamera. Avete saltato il giro instabile.",
            "{actor} resta incastrato alle spalle. Lo tirate indietro. Pelle via, respiro corto. Il cunicolo, per lui, è chiuso. Il gruppo torna al bivio.",
            "Anticamera. La camera del sarcofago è la porta dopo.",
            "Bivio di prima, {actor} scorticato. Il cunicolo non è stato fatto."
          ),
          opt("giro", "Facciamo il giro",
            "Il corridoio instabile tiene. Quaranta minuti, due cadute di polvere, nessuno sotto. Arrivate all'anticamera comunque.",
            "Un blocco cade. {actor} si tira indietro e si apre la fronte. Tornate. Il giro è chiuso. Resta il cunicolo, che {actor} ora vede peggio.",
            "Anticamera, il giro lungo. Siete lì, interi, con aria migliore.",
            "Stesso bivio, fronte aperta. Né giro né cunicolo, non oggi in questo tentativo."
          )
        ),
        ch("e-uscita", "Il pozzo d'uscita",
          "A {location} ci sono tre pozzi. La pianta, se l'avete, ne marca uno. L'aria, se la sentite, ne marca un altro. Possono coincidere.",
          "Sbagliarne uno è tornare indietro con meno lampada.",
          "{actor} accende la lampada frontale.",
          opt("pianta", "Seguiamo la pianta",
            "Il pozzo marcato ha tiraggio. Salite. A sei metri c'è luce, vera, del deserto. Siete sotto il piano, a un metro dal fuori.",
            "La pianta era ruotata. Il pozzo è cieco. {actor} scivola in discesa e si graffia tutta la schiena. Tornate ai tre bocche.",
            "Luce sopra. Manca issarsi. L'uscita è quella.",
            "Tre pozzi, una schiena aperta. Non siete sotto il cielo."
          ),
          opt("aria", "Seguiamo il tiraggio",
            "Il tiraggio è il pozzo nord. Salite. Sabbia fine, poi aria calda. Il deserto è lì. Avete il foro.",
            "Il tiraggio era da un foro laterale, non dal pozzo. {actor} si forza in un passaggio e si sloga un polso. Niente cielo.",
            "Foro, cielo, calore. Siete a un passo dal fuori.",
            "Polso, stesso incrocio. Il deserto aspetta sopra e non lo vedete."
          )
        )
      ],
      climax: {
        id: "x-egypt",
        title: "L'ultimo metro",
        story: [
          "Siete a {location}. Sopra c'è un foro da settanta centimetri e il sole del pomeriggio. La lastra che vi ha chiusi è da qualche parte a ovest, inutilizzabile.",
          "Issare il primo è il problema: serve schiena e una fune che non abbia già bruciato le mani. Poi gli zaini. Poi gli altri.",
          "{actor} mette il piede nella staffa."
        ],
        prompt: "Cosa fate?",
        choices: [
          opt("issa", "Issiamo il primo",
            "{actor} esce. Tira gli altri. Il deserto è piatto e bianco. La radio, fuori, prende. Siete fuori dal complesso. La pianta, se l'avete, va al Ministero. Se non l'avete, siete vivi: basta.",
            "La fune cede. {actor} ricade un metro e si prende il bordo sulle costole. Siete ancora sotto. Dovete rifare il nodo e riprovare, con meno fiato.",
            "", ""
          ),
          opt("zaini", "Prima gli zaini, poi noi",
            "Zaini fuori, poi i corpi. È più lento e tiene. L'ultimo chiude gli occhi al sole. Fine della tomba.",
            "Uno zaino si incastra e {actor} tira troppo. Spalla. Lo zaino cade giù. Siete ancora sotto, un uomo in meno sul tiro.",
            "", ""
          )
        ]
      },
      win: [
        "Siete sul piano del deserto. La tomba è un buco dietro di voi.",
        "{goal}: se la pianta è in tasca, il sito si riapre. Se no, il rapporto dirà che siete usciti. Basta.",
        "Qualcuno beve. Qualcuno non parla. Siete fuori."
      ],
      fail: [
        "Nessuno è più in grado di issarsi.",
        "{goal} resta sotto, in una sala che adesso è soltanto un volume d'aria cattiva.",
        "La spedizione è chiusa. Il deserto, sopra, non lo sapete."
      ]
    },
    {
      id: "camp-space",
      name: "la nave",
      title: "Sperduto nello spazio",
      goal: "raggiungere il modulo di rientro e sganciarlo",
      goalNeeded: 5,
      threat: "la nave in avaria",
      threatLine: "Meteoriti, poi un incendio in gravità zero, poi l'ossigeno che scende. Non c'è un nemico con la faccia: c'è lo scafo.",
      setting: "Siete a bordo di un cargo per Marte, due settimane di viaggio. Una pioggia di meteoriti ha aperto lo scafo a poppa. La nave è in avaria. Il modulo di rientro è a prua, tre paratie più in là.",
      locations: ["la stiva di poppa", "il corridoio centrale", "la sala macchine", "l'airlock", "la cupola", "il ponte radio", "il tunnel di prua", "il modulo"],
      opening: [
        "Allarme da undici minuti. Tute indossate, caschi aperti dove l'aria tiene. Il capitano non risponde dal ponte: il ponte è dal lato aperto.",
        "{worldLine}",
        "Obiettivo: {goal}. Senza il modulo, l'orbita decade in trenta ore. Con il modulo, avete una chance sulla stazione più vicina.",
        "{villainLine}",
        "Tre vite a testa. A zero, quella persona fluttua e non lavora più. Verde: l'azione tiene, avanzate verso prua. Giallo: si gira ancora. Rosso: un ferito, e restare nel modulo in cui siete. Si va avanti finché sgancia o non resta nessuno a sganciarlo."
      ],
      challenges: [
        ch("s-incendio", "L'incendio",
          "A {location} c'è un incendio in zero-g: sfera di fiamma, non colonna. L'estintore a CO2 è a due metri, o potete chiudere la paratia e lasciare bruciare quel vano.",
          "Chiudere perde il vano e un passaggio. Spegnere tiene il passaggio e rischia le vie aeree.",
          "{actor} è il più vicino all'estintore.",
          opt("estintore", "Usiamo l'estintore",
            "{actor} spara il CO2. La sfera muore. L'aria è cattiva per due minuti, poi i filtri tengono. Il corridoio verso prua è aperto.",
            "Il getto rimbalza. {actor} si prende calore sul braccio della tuta. Allarme ustione. Dovete chiudere la paratia comunque, con un uomo a una mano.",
            "Corridoio aperto. Prua è il passo dopo, non un'ipotesi.",
            "Paratia chiusa, braccio cotto. Il vano è perso. Non avete avanzato verso prua, avete perso un passaggio."
          ),
          opt("paratia", "Chiudiamo e bypassiamo",
            "Chiudete. Il bypass è un tunnel di servizio. Stretto, percorribile. Uscite un modulo più a prua. Il fuoco resta dall'altra parte.",
            "La paratia non chiude in tempo. {actor} prende fumo. Tosse, ossimetro basso. Tornate indietro a prendere l'estintore, più tardi, più stanchi.",
            "Siete un modulo più a prua. Il fuoco è un problema chiuso.",
            "Siete ancora nel vano del fuoco, {actor} che tossisce. Prua non si è avvicinata."
          )
        ),
        ch("s-buco", "Lo scafo",
          "A {location} c'è un foro da dodici centimetri. L'aria fischia. Potete tapparlo con il kit o evacuare il vano e passare dal tunnel parallelo.",
          "Il kit è una manciata di minuti. Il tunnel è venti, in tuta.",
          "{actor} ha il kit.",
          opt("kit", "Tapponiamo",
            "Tappo, resina, pressione che risale. Il fischio muore. Attraverse il vano. Avete tenuto la via corta.",
            "La resina non prende sul bordo bruciato. {actor} si prende un dito nella depressione, gonfio nel guanto. Dovete evacuare comunque.",
            "Vano tappato. Via corta verso prua, senza più quel sibilo.",
            "Dito gonfio, vano ancora aperto. La via corta è chiusa."
          ),
          opt("tunnel", "Passiamo nel tunnel",
            "Venti minuti in tuta, maniglie, niente fischio. Uscite a prua del foro. Il vano lo lasciate al vuoto. Siete oltre.",
            "Nel tunnel {actor} sbaglia un aggancio e si urta l'elmetto. Microfrattura del visore, sigillo d'emergenza. Tornate indietro a cambiare elmetto. Niente prua.",
            "Oltre il foro, in tuta. Il modulo è più vicino.",
            "Stesso airlock, visore da cambiare. Il tunnel aspetta."
          )
        ),
        ch("s-ossigeno", "L'ossigeno",
          "A {location} i serbatoi di zona sono al 31 percento. Potete bypassare da un serbatoio di riserva o ridurre i consumi e andare avanti a razionare.",
          "Il bypass è un lavoro da quindici minuti su valvole che possono essere storte.",
          "{actor} ha la chiave inglese.",
          opt("bypass", "Apriamo il riserva",
            "Le valvole girano. L'ossigeno di zona sale al 62. Respirate senza contare. Avete tempo per il tratto successivo.",
            "Una valvola è storta. {actor} si prende un ritorno di pressione sul polso. Niente riserva. Dovete razionare comunque, con un polso che non gira.",
            "62 percento. Potete camminare senza cronometro sul fiato.",
            "31 percento, polso. Il tratto successivo è più corto di quanto vorreste, e non l'avete ancora fatto."
          ),
          opt("raziona", "Razioniamo e andiamo",
            "Caschi chiusi, dieci minuti di tratto, caschi aperti in zona buona. Funziona. Siete nel modulo dopo, con il 28 percento e le gambe che tengono.",
            "{actor} apre il casco troppo presto. Ipossia, un minuto a terra (a fluttuare). Lo riprendete. Siete tornati al punto di razionamento, un uomo stordito.",
            "Modulo dopo. L'ossigeno ha tenuto per il tratto che serviva.",
            "Stesso vano, {actor} stordito. Non avete chiuso il tratto."
          )
        ),
        ch("s-radio", "Il ponte radio",
          "A {location} la radio della nave è morta. Quella di emergenza è a batteria. Potete chiamare la stazione o spendere la batteria sul telemetro del modulo.",
          "La stazione vi dà una finestra di rientro. Il telemetro vi dà la distanza esatta dal modulo. Non entrambe.",
          "{actor} sintonizza.",
          opt("stazione", "Chiamiamo la stazione",
            "Tre minuti di contatto. Finestra tra sei ore, azimuth. Lo scrivete sul braccio della tuta. Avete un orario, non solo una direzione.",
            "Il canale è pieno di sole. {actor} alza il guadagno e si prende un ritorno in cuffia che lo stordisce. Niente finestra. Batteria più bassa.",
            "Finestra tra sei ore. Ogni passo verso il modulo ha un senso orario.",
            "Niente finestra, orecchio che fischia. Siete al ponte, fermi."
          ),
          opt("tele", "Usiamo il telemetro",
            "Distanza modulo: 84 metri di corridoio equivalente, due paratie. Lo sapete. Partite sul numero.",
            "Il telemetro è tarato male. {actor} si sporge per ricalibrare e si urta una spalla sul telaio. Numero inutile. Spalla.",
            "84 metri, due paratie. Camminate quel numero.",
            "Spalla, niente metro. Il modulo è «davanti», che non basta."
          )
        ),
        ch("s-paratia", "La paratia bloccata",
          "A {location} una paratia è in fail-safe. Si apre dal quadro o si forza con la leva. Il quadro è in corto. La leva è un lavoro da due.",
          "Oltre c'è il tunnel di prua. Senza quella porta, il modulo resta tre paratie e un'ipotesi.",
          "{actor} ha la leva.",
          opt("quadro", "Ripariamo il quadro",
            "{actor} isola il corto e dà corrente. La paratia si apre. Il tunnel è lì, dritto. Entrate.",
            "Il corto scocca. {actor} ritira la mano, palmo bruciato attraverso il guanto sottile. Quadro morto. Resta la leva, più tardi.",
            "Tunnel di prua. Il modulo è la porta in fondo.",
            "Palmo, quadro morto, paratia chiusa. Non siete nel tunnel."
          ),
          opt("leva", "Forziamo con la leva",
            "Due persone, uno scatto. La paratia cede. Non la richiudete. Non importa. Siete nel tunnel.",
            "La leva scivola. {actor} si prende il bordo sulla tibia. Niente scatto. Paratia chiusa.",
            "Nel tunnel. Prua è un rettilineo: tre paratie, poi il modulo.",
            "Tibia, paratia. Il tunnel aspetta dall'altra parte del metallo."
          )
        ),
        ch("s-eva", "Fuori",
          "A {location} il corridoio interno è crollato. L'unica via è una passeggiata esterna di quaranta metri, airlock-airlock.",
          "Tute integre, salvo quella di {actor} che ha già un livido al sigillo. Potete mandare gli altri e farlo restare, o andare tutti.",
          "{actor} controlla il sigillo.",
          opt("tutti", "Usciamo tutti",
            "Quaranta metri, maniglie, niente drammi. L'airlock di prua accetta. Siete dal lato del modulo, in nave.",
            "Il sigillo di {actor} perde. Lo riprendete nell'airlock di partenza. Un decimo di atmosfera, un uomo a terra. I quaranta metri restano.",
            "Airlock di prua. Il modulo è interno, adesso.",
            "Stesso airlock di poppa. {actor} non esce. I quaranta metri sono ancora fuori."
          ),
          opt("altri", "Vanno gli altri, {actor} resta",
            "Gli altri fanno i quaranta metri e aprono da prua, dall'interno. {actor} li raggiunge dal bypass che adesso è in pressione. Riunione a prua. Ha funzionato.",
            "Il bypass non è in pressione. {actor} resta isolato. Un altro deve tornare indietro. Perdete un'ora. Nessuno è a prua come gruppo.",
            "Gruppo a prua. Il modulo è la stanza dopo.",
            "Gruppo spezzato, un'ora persa. Prua non è vostra."
          )
        ),
        ch("s-software", "Il computer",
          "A {location} il computer di sgancio è in safe mode. Potete forzare un boot o fare lo sgancio in manuale dal pannello, più tardi.",
          "Il boot adesso vi dà i controlli in anticipo. Il manuale vi aspetta al modulo.",
          "{actor} ha la console.",
          opt("boot", "Forziamo il boot",
            "Tre cicli, poi i controlli verdi. Sgancio armato, non eseguito. Avete il sistema. Il resto è andare al sedile.",
            "Il boot fallisce e locka la console. {actor} tira un cavo e si prende una scossa bassa. Console morta. Resta il manuale, solo quello.",
            "Controlli verdi. Al modulo dovete solo sedervi e girare la chiave.",
            "Console morta, scossa. Niente anticipo. Il modulo è ancora un mobile spento."
          ),
          opt("aspetta", "Lo facciamo al modulo",
            "Non toccate. Camminate al modulo con i sistemi come sono. Il pannello manuale è etichettato. Siete lì, pronti a quella procedura.",
            "Nel tratto {actor} sbaglia paratia e apre un vano in depressione. Allarme, chiusura, un timpano. Tornate indietro a ricominciare il tratto.",
            "Siete al modulo, procedura manuale sul ginocchio. Manca eseguirla.",
            "Timpano, stesso corridoio. Il modulo non l'avete raggiunto."
          )
        ),
        ch("s-modulo", "Il portello",
          "A {location} il portello del modulo è in tenuta. Si apre con il codice o con la chiave fisica sul lato. Il codice era sul ponte, che non c'è.",
          "La chiave è in una cassetta a un metro, se non è volata via.",
          "{actor} cerca la cassetta.",
          opt("chiave", "Usiamo la chiave",
            "La cassetta c'è. Chiave, portello, sedili. Siete dentro il modulo. Manca sganciare.",
            "La cassetta è vuota. {actor} forza il bordo e si taglia. Niente chiave. Resta il codice, che non avete.",
            "Dentro il modulo. Sgancio è la leva sopra la testa.",
            "Portello chiuso, mano tagliata. Siete ancora nel tunnel."
          ),
          opt("codice", "Proviamo i default",
            "Il default di emergenza è stampato sotto il telaio. {actor} lo legge. Il portello apre. Sedili.",
            "Tre tentativi sbagliati, lockout di dieci minuti. {actor} sbatte il casco per la rabbia e si apre il naso. Dieci minuti fermi, sangue in microgravità.",
            "Dentro il modulo. La leva di sgancio è lì, a portata di mano.",
            "Lockout, naso. Il portello non si è aperto."
          )
        )
      ],
      climax: {
        id: "x-space",
        title: "Lo sgancio",
        story: [
          "Siete a {location}, allacciati. La leva di sgancio è sopra la testa, coperta. I serbatoi del modulo sono al 40 percento. Basta, se la finestra è quella di sei ore fa — o se puntate a vista.",
          "Una volta sganciati non si torna in nave. La nave decade. Questo è il punto.",
          "{actor} ha la mano sulla coperta."
        ],
        prompt: "Cosa fate?",
        choices: [
          opt("leva", "Sganciamo",
            "Sgancio. La nave si allontana, un relitto. Il modulo accende i motori di assetto. La stazione, se c'è la finestra, è un problema di ore, non di paratie. Siete fuori dalla nave.",
            "La leva non arma. {actor} forza e si prende il ritorno sul gomito. Niente sgancio. Dovete ripetere la checklist, con un braccio in meno.",
            "", ""
          ),
          opt("check", "Rifacciamo la checklist e poi sganciamo",
            "Checklist, tre verdi, sgancio. Pulito. La nave resta. Voi no. Fine della avaria, inizio del rientro.",
            "In checklist {actor} salta una valvola. Allarme. Abort. Un minuto a reimpostare, e {actor} ha il naso che sanguina di nuovo per la pressione. Siete ancora agganciati.",
            "", ""
          )
        ]
      },
      win: [
        "Il modulo è lontano dalla nave. L'avaria è un oggetto, là dietro.",
        "{goal}: fatto. Adesso è astrodinamica e silenzio in cuffia.",
        "Siete sganciati. Siete vivi."
      ],
      fail: [
        "Non c'è più nessuno in grado di armare lo sgancio.",
        "La nave decade. {goal} resta una leva sopra una testa che non si alza.",
        "Fine della missione. Lo scafo continua senza di voi al lavoro."
      ]
    },
    {
      id: "camp-mountain",
      name: "la montagna",
      title: "La montagna ghiacciata",
      goal: "scendere a valle e raggiungere la strada",
      goalNeeded: 5,
      threat: "il freddo e il pendio",
      threatLine: "Meno quindici all'alba, vento, neve che copre le tracce in un'ora. Il nemico è restare fermi.",
      setting: "L'aereo ha toccato a duemila metri, su un ghiacciaio laterale. Tre sopravvissuti in grado di camminare, un relitto che non vola, e la valle a sud-ovest se il tempo tiene.",
      locations: ["il relitto", "il seracco", "il canalone", "il bosco di larici", "il ponte di neve", "la baita", "il torrente", "la strada"],
      opening: [
        "L'impatto è stato due ore fa. Avete tratto dal relitto: sacco da bivacco, un fornello, cibo per un giorno e mezzo, un ferito già fermo che non viene.",
        "{worldLine}",
        "Obiettivo: {goal}. La carta dice otto chilometri di dislivello se prendete il canalone. Se sbagliate il seracco, tornate su e perdete il giorno.",
        "{villainLine}",
        "Tre vite a testa. A zero, quella persona non scende. Verde: l'azione tiene, scendete di un tratto. Giallo: si gira ancora. Rosso: un ferito, quota invariata. Si scende finché la strada o finché non resta nessuno in piedi."
      ],
      challenges: [
        ch("m-seracco", "Il seracco",
          "A {location} il ghiaccio è a torre. Potete aggirarlo a ovest in un'ora o tagliare sotto, più corto, più esposto.",
          "Il vento alza cristalli. Visibilità a quaranta metri. Sotto, se il ghiaccio cede, non c'è un secondo tentativo pulito.",
          "{actor} ha la picozza.",
          opt("ovest", "Aggiriamo a ovest",
            "Un'ora, neve alla ginocchia, ma il seracco resta a destra. Uscite sul canalone. Avete la linea di discesa.",
            "{actor} affonda in un ponte di neve. Lo tirate fuori, ginocchio freddo, non carica. Tornate a rivedere il taglio sotto. Stessa quota.",
            "Canalone. La valle è sotto, visibile a tratti.",
            "Stessa quota, ginocchio. Il seracco è ancora davanti."
          ),
          opt("sotto", "Tagliamo sotto",
            "Venti minuti, ramponi, {actor} che fa i gradini. Siete sotto il seracco, sul ghiaccio vivo, in discesa.",
            "Un blocco si stacca. Non vi centra, ma {actor} scivola evitandolo. Polso. Risalite al punto di decisione. Niente sotto.",
            "Sotto il seracco. Il canalone è il passo dopo.",
            "Polso, stessa cengia. Il taglio non è stato fatto."
          )
        ),
        ch("m-notte", "Il bivacco",
          "A {location} sono le sedici e la luce muore alle diciassette. Potete bivaccare qui o spingere al bosco, un'ora se non nevica.",
          "Qui è esposto: vento e niente legna. Il bosco è riparo, e un'ora se il tempo tiene.",
          "{actor} guarda l'orologio.",
          opt("qui", "Bivacchiamo qui",
            "Buca nella neve, sacco, fornello. La notte passa. All'alba potete camminare. Non avete perso dita. Avete tenuto.",
            "La buca cede sul lato. {actor} passa due ore bagnato. Al mattino non parte. Restate fino a mezzogiorno. Quota invariata.",
            "Alba, zaini, discesa. Il bosco è l'obiettivo del mattino.",
            "Mezzogiorno, {actor} che trema ancora. Non avete sceso un metro."
          ),
          opt("bosco", "Spingiamo al bosco",
            "Un'ora, ultime luci, i larici. Legna secca. Fuoco. Siete cento metri più in basso e al coperto.",
            "Nevica. Vi perdete il filo. {actor} ha un principio di congelamento alle dita. Tornate al punto aperto a fare la buca, più tardi, più freddi.",
            "Bosco, fuoco, cento metri guadagnati. La strada è più vicina.",
            "Dita bianche, stesso aperto. Il bosco non l'avete preso."
          )
        ),
        ch("m-ponte", "Il ponte di neve",
          "A {location} un crepaccio è coperto da un ponte. Potete provarlo o scendere nel crepaccio e risalire dall'altra parte, un'ora.",
          "Il ponte è più corto. Se cede, è un problema di corde che avete mezze.",
          "{actor} si lega.",
          opt("ponte", "Proviamo il ponte",
            "{actor} passa, la neve tiene. Gli altri sul passo. Siete sull'altra sponda in dieci minuti.",
            "Il ponte cede sotto {actor}. Cade due metri, imbrago tiene. Lo issate. Spalla. Il ponte è chiuso. Resta il fondo.",
            "Altra sponda. Il canalone continua in discesa.",
            "Spalla, stesso bordo. Il crepaccio non è stato superato."
          ),
          opt("fondo", "Scendiamo nel crepaccio",
            "Un'ora, due calate, risalita su ghiaccio. Siete oltre. Più stanchi, interi, e il canalone continua.",
            "{actor} prende un colpo di picozza in discesa, gamba. Lo riportate su. Niente oltre. Una gamba.",
            "Oltre il crepaccio. La discesa è aperta e la valle è sotto.",
            "Gamba, stesso bordo. Né il ponte né il fondo sono stati fatti."
          )
        ),
        ch("m-bait", "La baita",
          "A {location} c'è una baita chiusa. Potete forzare e riposare o ignorarla e perdere il riparo per due ore di luce ancora buone.",
          "Dentro, se c'è, c'è legno e forse una radio a manovella.",
          "{actor} ha il piede di porco del relitto.",
          opt("forza", "Forziamo e usiamo la baita",
            "La porta cede. Legno, una coperta, la radio fa un soffio. Non parlate con nessuno, ma avete un tetto e un'ora di calore. Poi ripartite più in basso, interi.",
            "La trave cade. {actor} si prende un chiodo nella coscia. Niente riposo. Fascia, sangue sulla neve. La baita è un problema, non un aiuto.",
            "Uscite dalla baita e scendete. Avete recuperato e la valle è più vicina.",
            "Coscia, baita inutilizzabile. Siete alla stessa quota, più lenti."
          ),
          opt("ignora", "Ignoriamo e scendiamo",
            "Due ore di luce, duecento metri di dislivello. I larici si fanno abeti. Siete più in basso, senza aver perso tempo sulla porta.",
            "{actor} inciampa su una radice gelata, ginocchio. La baita, adesso, è sopra e non ci tornate. Quota quasi uguale, un ginocchio.",
            "Duecento metri. La strada è un'ipotesi più seria.",
            "Ginocchio, dislivello nullo. La baita è sopra, chiusa, e voi qui."
          )
        ),
        ch("m-torrente", "Il torrente",
          "A {location} il torrente è parzialmente gelato. Potete attraversare sui sassi o cercare il ponte di tronco che i cacciatori usano a valle.",
          "I sassi sono dieci minuti. Il tronco è quaranta e una discesa.",
          "{actor} prova il primo sasso.",
          opt("sassi", "Passiamo sui sassi",
            "Dieci minuti, piedi asciutti. Sponda sud. Il sentiero dei cacciatori è lì, battuto.",
            "{actor} scivola. Stivale pieno, piede già bianco. Dieci minuti a cambiare calza. Tornate a cercare il tronco, con un piede a rischio.",
            "Sentiero battuto, sponda giusta. La valle è di nuovo un fatto.",
            "Piede bagnato, stessa sponda. Il torrente non è stato passato."
          ),
          opt("tronco", "Cerchiamo il tronco",
            "Il tronco c'è. Quaranta minuti, passaggio pulito. Siete a valle del punto sassi, più in basso.",
            "Il tronco è marcio. {actor} cade in acqua fino alla vita. Risalita, cambio, mezz'ora. Stessa sponda, un uomo gelato.",
            "Sponda sud, più in basso dei sassi. Avete sceso.",
            "Uomo gelato, stessa sponda. Il torrente vince questo giro."
          )
        ),
        ch("m-nebbia", "La nebbia",
          "A {location} la nebbia chiude a dieci metri. Bussola o restare. Camminare a caso è un crepaccio.",
          "Restare costa freddo. La bussola costa fiducia nel quadrante che avete picchiato all'impatto.",
          "{actor} tiene la bussola.",
          opt("bussola", "Marchiamo in bussola",
            "Sud-ovest, un'ora, passi corti. La nebbia si apre su un bosco che riconoscente: è quello della carta. Avete tenuto la linea.",
            "La bussola era storta. Usciate su un canalone sbagliato. {actor} scivola in correzione. Gomito. Tornate al punto di nebbia, se lo trovate.",
            "Bosco giusto. La strada è sotto quel bosco.",
            "Gomito, nebbia, linea persa. Non avete sceso."
          ),
          opt("resta", "Restiamo finché si apre",
            "Quaranta minuti. Si apre. Riconoscete il crinale e scendete sul lato giusto. Avete aspettato bene.",
            "Aspettate un'ora. {actor} ha i piedi che non sente. Dovete muovervi comunque, male, e tornate su per far circolare. Quota invariata.",
            "Crinale, lato giusto. La discesa è quella che avevate scelto.",
            "Piedi morti, stessa buca nella nebbia. Niente valle."
          )
        ),
        ch("m-pendio", "Il pendio duro",
          "A {location} il pendio è 40 gradi, ghiaccio vivo. Corda da 30, siete in tre che camminano. Calata o traverso.",
          "La calata è veloce. Il traverso è più lungo e tiene i feriti meglio.",
          "{actor} pianta il chiodo.",
          opt("cala", "Ci caliamo",
            "Tre calate, venti minuti. Siete duecento metri più in basso, sugli alberi. La strada, se c'è, è in quei rumori di auto lontani — o vento.",
            "Il chiodo cede. {actor} fa due metri. Schiena. Lo fermate. La calata è chiusa per oggi.",
            "Duecento metri. Gli alberi. La valle è quella.",
            "Schiena, stessa cengia. Il pendio non è stato sceso."
          ),
          opt("traverso", "Attraversiamo in cordata",
            "Quaranta minuti, passi. Uscite sul lato morbido, neve, poi alberi. Più lenti, interi, più in basso.",
            "{actor} perde un ramponi. Scivolo, ginocchio. Tornate al chiodo. Niente lato morbido.",
            "Alberi, dislivello fatto. La strada è il passo dopo.",
            "Ginocchio, stesso ghiaccio. Il traverso è fallito."
          )
        ),
        ch("m-strada", "Il rumore",
          "A {location} sentite un motore, o un fiume. Se è la strada, siete a venti minuti. Se è il fiume, è un altro tratto.",
          "{actor} va avanti di cinquanta metri a vedere. Se sbaglia il rumore, perdete la luce che resta.",
          "Il gruppo resta sul filo del bosco, zaini a terra, in ascolto.",
          opt("motore", "Seguiamo il motore",
            "È un camion sulla provinciale. Uscite sul guard-rail. Avete la strada, non un altro canalone.",
            "Era un generatore di baita, lontano. {actor} si perde dieci minuti e torna con una storta. Niente asfalto.",
            "Asfalto. Il fumogeno, se lo accendete, è per i soccorsi. O un autostop. Siete a valle.",
            "Storta, bosco. La strada c'è, non l'avete vista."
          ),
          opt("fiume", "Seguiamo l'acqua",
            "L'acqua va alla strada: un tombino, poi l'asfalto. Dieci minuti. Siete fuori dal bosco.",
            "L'acqua va in una gola. {actor} scende due metri e deve risalire. Mano. Niente asfalto.",
            "Asfalto dal tombino. Fine della montagna come problema di cammino.",
            "Mano, gola. L'acqua non vi ha portati alla strada."
          )
        )
      ],
      climax: {
        id: "x-mountain",
        title: "La provinciale",
        story: [
          "Siete a {location}. L'asfalto è lì, o il guard-rail, o un tornante. Un'auto ogni tanto. Avete ancora il corpo per alzare un braccio.",
          "Se nessuno ferma, camminate fino al primo paese. Sono tre chilometri, pianeggianti, che adesso pesano come trenta.",
          "{actor} esce dal bosco per primo."
        ],
        prompt: "Cosa fate?",
        choices: [
          opt("stop", "Fermiamo un'auto",
            "Un furgone ferma. Vi caricano. La montagna resta a monte, un relitto e una traccia. Siete a valle.",
            "Nessuno ferma. {actor} resta troppo al bordo e una macchina lo sfiora: cade, ginocchio. Dovete camminare comunque, peggio.",
            "", ""
          ),
          opt("cammina", "Camminiamo al paese",
            "Tre chilometri. Il paese c'è. Un bar, un telefono. Fine della discesa.",
            "{actor} cede a un chilometro. Lo sostenete. Non arrivate. Dovete tornare al bordo strada e riprovare lo stop, con un uomo che non poggia.",
            "", ""
          )
        ]
      },
      win: [
        "Siete a valle. La strada è sotto gli scarponi, nera, banale.",
        "{goal}: fatto. Qualcuno chiama. Qualcuno non si toglie i guanti.",
        "La montagna è un dislivello, dietro. Siete scesi."
      ],
      fail: [
        "Non scendete più.",
        "{goal} resta in fondo a un canalone che non avete chiuso.",
        "Il freddo chiude la spedizione. Non c'è un altro alba, per questo gruppo."
      ]
    },
    {
      id: "camp-sea",
      name: "il mare",
      title: "Naufragio",
      goal: "raggiungere terra o una rotta battuta",
      goalNeeded: 5,
      threat: "il mare",
      threatLine: "Acqua, sole, e le ore prima che le scorte finiscano. Il nemico è la distanza.",
      setting: "La barca ha preso uno scoglio di notte. Avete il gommone, due pagaie, acqua per un giorno, un ferito già in coperta. Terra, se la carta non mente, a sud-est.",
      locations: ["il relitto", "il gommone", "la corrente", "l'isolotto", "la scogliera", "il canale", "la baia", "la spiaggia"],
      opening: [
        "L'alba è già alta. La barca è sul fianco, a cento metri dallo scoglio. Avete gettato il gommone e ciò che galleggiava di utile.",
        "{worldLine}",
        "Obiettivo: {goal}. A sud-est, sei ore di pagaia se la corrente aiuta. Se no, dodici, e l'acqua non basta.",
        "{villainLine}",
        "Tre vite a testa. A zero, quella persona non pagaia. Verde: l'azione tiene, avanzate verso terra. Giallo: si gira ancora. Rosso: un ferito, miglia invariate. Si va avanti finché sbarcate o il gommone resta vuoto di braccia."
      ],
      challenges: [
        ch("w-gommone", "Il gommone",
          "A {location} il gommone ha una valvola che sfiata. Potete ripararla ora o partire e gonfiare ogni mezz'ora.",
          "Riparare costa un'ora al sole, fermi. Partire costa fiato e rischio di sgonfiarsi al largo.",
          "{actor} ha il kit.",
          opt("ripara", "Ripariamo ora",
            "Un'ora. La valvola tiene. Partite pieni. Le miglia successive sono pagaia, non pompa.",
            "Il kit non prende sul gomma umida. {actor} si taglia sul bordo della valvola. Partite comunque, sgonfi, un taglio in acqua salata.",
            "Gommone pieno, rotta sud-est. Avete il mezzo.",
            "Taglio, gommone molle. Siete ancora sullo scoglio, di fatto: non avete chiuso miglia."
          ),
          opt("parti", "Partiamo e gonfiamo dopo",
            "Due miglia, una sosta, pompa. Tiene. Siete al largo nella direzione giusta, non più sullo scoglio.",
            "A un miglio sfiata troppo. Tornate allo scoglio a remi, {actor} con una crampo da sforzo. Niente miglia nette.",
            "Due miglia a sud-est. Terra è un'ipotesi più corta.",
            "Scoglio, crampo, gommone molle. Zero miglia."
          )
        ),
        ch("w-corrente", "La corrente",
          "A {location} la corrente tira a nord, contro la terra. Potete tagliare di traverso o seguirla e riprendere dopo, più lunghi.",
          "Tagliare è fatica a tutta pagaia. Seguire è tempo, e la terra resta a sud mentre voi scivolate.",
          "{actor} ha la pagaia di dritta.",
          opt("taglia", "Tagliamo di traverso",
            "Un'ora a tutta. Uscite dalla lingua di corrente. La prua punta di nuovo sud-est. Avete vinto lo slittamento.",
            "{actor} si prende un colpo di pagaia in faccia dal ritorno d'onda. Naso. Dovete riallinearvi, e la corrente vi ha rimessi a nord.",
            "Fuori dalla corrente. Rotta ripresa. Terra più vicina.",
            "Naso, slittati a nord. Le miglia verso terra non ci sono."
          ),
          opt("segui", "La seguiamo e riprendiamo dopo",
            "Due ore, poi un eddies. Riprendete sud-est con meno fatica. Siete più a est, che è quasi terra se la carta è quella.",
            "L'eddies non c'è. {actor} cede le braccia. Drift a nord. Tornate a tagliare, più tardi, più stanchi.",
            "Est, poi sud-est. Avete chiuso un tratto.",
            "Nord, braccia morte. Terra più lontana di due ore fa."
          )
        ),
        ch("w-acqua", "L'acqua",
          "A {location} le taniche sono a un terzo. Potete razionare o tentare di raccogliere da un temporale che si vede a ovest.",
          "Il temporale è un'ora di pagaia fuori rotta. Il razionamento è sete e testa chiara.",
          "{actor} guarda le nubi.",
          opt("raziona", "Razioniamo e teniamo la rotta",
            "Bicchiere ogni due ore. Teste chiare. La rotta tiene. Avete scelto le miglia, non l'acqua in più.",
            "{actor} beve di nascosto, poi cede al colpo di sole. Lo coprite. Perdete un'ora fermi. Niente miglia.",
            "Rotta tenuta. La terra, se c'è, è su questa linea.",
            "Ora ferma, colpo di sole. Il gommone non ha avanzato."
          ),
          opt("temporale", "Andiamo sotto il temporale",
            "Un'ora, pioggia, taniche a due terzi. Poi tornate sulla linea. Avete acqua e, netto, qualche miglio se il temporale era a sud.",
            "Il temporale è a nord. {actor} si prende un'onda in faccia, spalla. Taniche quasi uguali. Fuori rotta. Tornate.",
            "Acqua e linea ripresa. Potete pagare ancora.",
            "Spalla, stessa sete, posizione peggiore. Non avanzate verso terra."
          )
        ),
        ch("w-isolotto", "L'isolotto",
          "A {location} c'è uno scoglio con gabbiani. Potete sbarcare, riposare, o ignorarlo e tenere i miglia.",
          "Sbarcare è un'ora persa e un rischio di tagli. Ignorare è sete, schiena, e le braccia che avete ancora.",
          "{actor} stima la distanza: trecento metri.",
          opt("sbarca", "Sbardiamo e riposiamo",
            "Sbarco goffo, dieci minuti a terra, ombra. Ripartite con le braccia. Avete tenuto il gruppo in grado di pagare il tratto dopo.",
            "{actor} si apre una gamba sulla roccia. Sale, salsedine. Un'ora a fasciare. Il gommone è lì, le miglia no.",
            "Di nuovo in acqua, braccia buone. Sud-est.",
            "Gamba, stesso scoglio. La terra vera è ancora là, non qui."
          ),
          opt("ignora", "Ignoriamo e paghiamo",
            "Due ore dritte. L'isolotto resta a poppa. Avete chiuso il tratto più lungo della giornata.",
            "{actor} ha un crampo a un'ora. Dovete andare all'isolotto comunque, più tardi, con un rematore in meno. Niente tratto chiuso pulito.",
            "Due ore di miglia. La costa, se la carta è giusta, è il prossimo segno.",
            "Crampo, isolotto come piano B. Non avete chiuso il tratto."
          )
        ),
        ch("w-notte", "La notte in mare",
          "A {location} il sole è a una mano. Potete pagare al buio sulla stella o mettere la drizza e dormire a turni, in deriva.",
          "Pagare al buio è rotta se la stella è quella. Dormire è deriva a nord.",
          "{actor} conosce la stella, o dice di sì.",
          opt("stella", "Paghiamo sulla stella",
            "Quattro ore, turni. All'alba la linea di costa è un segno, basso, a prua. Avete pagato la notte.",
            "La stella non era quella. All'alba siete slittati. {actor} ha le mani a pelle. Costa non in vista. Dovete riallinearvi di giorno.",
            "Costa in vista. Un tratto, non un giorno.",
            "Mani a pelle, slittati. La notte non vi ha dato terra."
          ),
          opt("deriva", "Dormiamo a turni",
            "Deriva a nord, ma le braccia tengono all'alba. Riprendete sud-est freschi. Avete scambiato miglia per braccia. In questo mare, a volte, è il pezzo giusto — e chiudete comunque un tratto perché la corrente, di notte, ha girato a est.",
            "{actor} non si sveglia al turno. Il gommone gira. All'alba siete più a nord e {actor} ha un colpo di sole da tuta bagnata. Niente tratto utile.",
            "Est, braccia, alba. Potete vedere dove andare.",
            "Nord, colpo di sole. La terra è più lontana."
          )
        ),
        ch("w-scogli", "La scogliera",
          "A {location} la terra è quella: una scogliera, non una spiaggia. Potete cercare un varco a sud o tentare uno sbarco sulle rocce.",
          "Le rocce rompono il gommone. Il varco è un'ora di pagaia.",
          "{actor} vede un punto più basso.",
          opt("varco", "Cerchiamo il varco a sud",
            "Un'ora. Una baia, ciottoli, niente surf alto. Sbardate. Piedi a terra, gommone a secco.",
            "Il varco è un altro tratto di scoglio. {actor} si prende un'onda e il gomito sul tubo. Perdete aria. Dovete pompare, fermi, sotto la scogliera.",
            "Baia. Terra. L'obiettivo è sotto gli scarponi.",
            "Gomito, aria persa, stessa scogliera. Non sbarcati."
          ),
          opt("rocce", "Sbardiamo sulle rocce",
            "Timing tra due onde. {actor} salta, tiene la cima. Gli altri dietro. Il gommone si graffia e tiene. Siete in piedi sulla roccia.",
            "L'onda prende {actor} tra gommone e roccia. Costole. Lo tirate su. Il gommone è a cinque metri, vuoto. Dovete recuperarlo prima di riprovare.",
            "In piedi sulla roccia. Terra. Fine del mare come distanza.",
            "Costole, gommone a derivare. Non siete sbarcati."
          )
        ),
        ch("w-nave", "Una nave",
          "A {location} c'è una nave a quattro miglia, o un miraggio. Potete pagare verso quella o tenere sud-est sulla carta.",
          "La nave è un soccorso vero o un errore di un'ora, e le braccia non sono infinite.",
          "{actor} ha il binocolo incrinato.",
          opt("nave", "Paghiamo verso la nave",
            "Non è un miraggio. Un peschereccio. Vi vedono quando siete a un miglio, se fate lo specchio. Vi prendono. Fine del gommone.",
            "È un miraggio, o è andata via. {actor} ha le braccia finite. Siete fuori rotta, sete, niente nave.",
            "Sul ponte del peschereccio. Terra è un porto, non una pagaia.",
            "Braccia, fuori rotta. Sud-est è da riprendere da zero."
          ),
          opt("carta", "Teniamo la carta",
            "Sud-est, due ore. La costa si fa una riga. Avete scelto la terra, non il punto in movimento.",
            "{actor} sbaglia il quarto d'ora e pagate a est. Costa non in vista. Correzione, fatica. Niente riga.",
            "Riga di costa sulla carta. Il resto è un tratto di pagaia.",
            "Est inutile, stesse miglia verso il niente. La carta non è stata tenuta."
          )
        ),
        ch("w-surf", "Il surf",
          "A {location} la spiaggia c'è, con un metro di frangente. Potete aspettare un set basso o tentare adesso.",
          "Aspettare è venti minuti in deriva laterale. Tentare è il gommone in coppia.",
          "{actor} conta le onde.",
          opt("aspetta", "Aspettiamo il set basso",
            "Il set arriva. Entrate. Sbardate bagnati, in piedi. La sabbia cede sotto gli scarponi. Siete a terra.",
            "Il set non è basso. {actor} si prende il gommone in faccia. Naso. Siete di nuovo fuori, a pompare.",
            "Sabbia sotto le ginocchia. Fine della pagaia, non del segnale.",
            "Naso, fuori dal surf. La spiaggia è lì e non ci siete."
          ),
          opt("ora", "Tentiamo adesso",
            "Due onde, la terza vi mette in riva. Il gommone si piega e tiene. Piedi. Terra sotto gli scarponi.",
            "Vi ribalta. {actor} tocca il fondo con una spalla. Recupero a nuoto, gommone a venti metri. Non sbarcati, un uomo che non nuota bene.",
            "Riva. Il mare è a ovest. Avete {goal} in tasca, di fatto.",
            "Spalla, gommone a derivare. La riva aspetta un altro set."
          )
        )
      ],
      climax: {
        id: "x-sea",
        title: "Terra",
        story: [
          "Siete a {location}. La sabbia o i ciottoli sono sotto. Il gommone è a secco o lo sarà tra un'onda. Avete ancora da farvi vedere: un fuoco, un telo, un telefono se c'è una strada sopra la duna.",
          "Senza segnale, siete solo sbarcati, non salvati. Con un segnale, la spedizione chiude.",
          "{actor} ha l'accendino, se è asciutto."
        ],
        prompt: "Cosa fate?",
        choices: [
          opt("fuoco", "Facciamo fumo",
            "Plastica del gommone, legno della duna. Fumo nero. Un peschereccio o una macchina sulla litoranea vi vede. Siete a terra e visti.",
            "L'accendino è umido. {actor} si brucia le dita sui fiammiferi del kit. Niente fumo. Dovete salire la duna a piedi, se {actor} poggia.",
            "", ""
          ),
          opt("duna", "Saliamo alla strada",
            "La litoranea c'è. Una macchina ferma. Fine del naufragio come problema di acqua.",
            "{actor} cede sulla duna. Tornate in riva. Niente strada, un uomo a terra sulla sabbia.",
            "", ""
          )
        ]
      },
      win: [
        "Siete a terra. Il gommone è un oggetto sulla spiaggia.",
        "{goal}: fatto. Qualcuno si toglie i scarponi. Qualcuno no.",
        "Il mare è a ovest. Siete fuori."
      ],
      fail: [
        "Non c'è più chi pagaia o chi cammina sulla duna.",
        "{goal} resta una riga, se c'era, a sud-est.",
        "Il gommone deriva. La spedizione è chiusa."
      ]
    },
    {
      id: "camp-desert",
      name: "il deserto",
      title: "Il deserto bianco",
      goal: "raggiungere un avamposto o una strada asfaltata",
      goalNeeded: 5,
      threat: "il deserto",
      threatLine: "Sole, sete e disorientamento. Senza acqua e senza direzione il deserto vi chiude in un cerchio.",
      setting: "Il 4x4 è morto su una pista di pietrisco. Serbatoio bucato o sabbia nel filtro: non importa. Radio muta, telefono con una tacca e poi niente. Intorno, duna e cielo.",
      locations: ["il 4x4 fermo", "la duna", "il wadi secco", "le rovine", "l'avamposto", "la pista", "il pozzo", "l'asfalto"],
      opening: [
        "Il mezzo non riparte. Avete un bidone d'acqua, un telo, una bussola vera e una carta del 2004. La temperatura salirà fino a far male.",
        "{worldLine}",
        "Obiettivo: {goal}. Sulla carta la pista taglia un wadi e poi un avamposto. Se sbagliate la direzione, il bidone non basta.",
        "{villainLine}",
        "Tre vite a testa. A zero, quella persona non cammina. Verde: l'azione tiene, avanzate verso l'uscita. Giallo: si gira ancora. Rosso: un ferito, e restare dove siete. Si va avanti finché uscite o non resta nessuno in piedi."
      ],
      challenges: [
        ch("d-sole", "Il sole",
          "A {location} è mezzogiorno. Il metallo brucia. State ancora decidendo se restare o partire. Il bidone è all'ombra del parafango.",
          "Restare qui è sperare in un passaggio. Partire adesso è camminare nel forno. La regola è: non nelle ore peggiori.",
          "{actor} guarda l'orologio.",
          opt("ombra", "Restiamo all'ombra, partiamo all'alba",
            "Telo e sedili fanno un riparo. Bevete a sorsi. All'alba camminate due ore sulla pista e trovate un cumulo di lattine e un litro in un bidone. Qualcuno è passato. Avete una direzione.",
            "Aspettate, ma bevete troppo per noia. {actor} ha un colpo di calore sotto il telo. All'alba partite tardi e più deboli. Stesso 4x4, meno acqua.",
            "Vi fermate all'ombra di un affioramento. Non siete più incollati al parafango.",
            "Siete di nuovo al parafango. Il bidone è più basso. Il giorno è perso."
          ),
          opt("adesso", "Partiamo adesso sulla pista",
            "Camminate un'ora e mezza, poi ombra di una roccia. Trovate un segno di pneumatici recenti. La pista rinasce. Non è l'uscita, è una traccia.",
            "Dopo un'ora {actor} ha pelle secca e vomito. Tornate al 4x4 con meno acqua. La pista, a quell'ora, non vi ha dato niente di utile.",
            "Siete su una traccia recente. L'avamposto non è un'ipotesi a caso.",
            "Siete al parafango. Acqua in meno, metri utili zero."
          )
        ),
        ch("d-acqua", "L'acqua",
          "A {location} il bidone è a un terzo. C'è un avvallamento con tamerici: forse umidità sotto. Scavare costa sudore. Sudore costa acqua.",
          "Uno di voi ha le labbra spaccate. Bere adesso o tenere: è concreto, non un discorso.",
          "{actor} ha la pala pieghevole.",
          opt("scava", "Scaviamo e razioniamo",
            "A mezzo metro la sabbia è umida. A un metro, fango. Filtrate con una maglietta. Non è tanto, è un altro giorno. {actor} segna il punto con un telo.",
            "{actor} scava troppo in fretta, si disidrata e cede. Il buco resta a mezzo metro, asciutto. Avete sudato l'acqua che dovevate tenere.",
            "Avete una fonte: un buco umido. Vi basta per non tornare indietro.",
            "Il bidone è più vuoto. Il buco non ha dato niente. Domani è peggio."
          ),
          opt("duna", "Beviamo e tentiamo un'altra duna",
            "Bevete il razionamento giusto, non di più. Dietro la duna c'è un alveo con sale e, sotto una lastra, un litro fermo. Sporco, ma bevibile dopo il telo.",
            "Bevete troppo. {actor} vomita. La prossima duna è uguale. Tornate all'avvallamento a mani vuote e con meno forze.",
            "Avete un litro in più e un punto da segnare. La sete cala un grado.",
            "Stesso avvallamento, bidone quasi vuoto. L'altra duna non esisteva."
          )
        ),
        ch("d-pista", "La pista",
          "A {location} la pista sparisce sotto la sabbia. Due direzioni: seguire i sassi a valle, o salire in cresta per vedere.",
          "A valle può esserci vegetazione. In cresta vedete lontano e camminate di più al sole. Tra un'ora il vento cancella le tracce.",
          "{actor} tiene la bussola.",
          opt("valle", "Seguiamo il wadi a valle",
            "Due chilometri, alveo umido, poi un segno di pneumatici e una bottiglia sigillata semi-sepolta. {actor} la apre: è acqua, non benzina.",
            "Il wadi gira. {actor} si storce una caviglia sui sassi. Tornate al taglio della pista. Niente pneumatici, una zoppia.",
            "Siete di nuovo su una traccia. Qualcuno passa di qui.",
            "Siete al taglio della pista. Acqua in meno, stessa sabbia sopra la strada."
          ),
          opt("cresta", "Salimo in cresta",
            "Dalla cresta vedete un filare di pali, lontano. Scendete sul lato giusto. I fili del telefono, bassi, vanno verso est.",
            "Il vento in cresta vi spinge. {actor} scende dal lato sbagliato. Perdete un'ora a ritrovare il wadi. Stesso taglio, più sole in corpo.",
            "I fili ci sono. Est ha un senso, non solo una stima.",
            "Siete al taglio. I fili, se ci sono, non li avete visti."
          )
        ),
        ch("d-notte", "La notte",
          "A {location} ci sono quattro muri e un arco. Di notte la temperatura crolla. Lontano, una luce: troppo ferma per un incendio.",
          "Camminare di notte risparmia il sole. Perdersi di notte è facile. La luce può essere un faro, un campo, un riflesso.",
          "{actor} decide se muoversi.",
          opt("alba", "Restiamo, partiamo all'alba verso la luce",
            "Vi coprite. All'alba la luce è un traliccio. Due ore e arrivate a una recinzione e a una cisterna. L'acqua sa di ruggine. La bevete. {actor} riempie le bottiglie.",
            "Restate, ma il telo vola. {actor} passa la notte al vento e al mattino non cammina dritto. La luce, di giorno, non si vede più.",
            "Avete una struttura umana e acqua. Non è l'uscita. È la prova che la carta non mentiva del tutto.",
            "I muri sono gli stessi. La luce è sparita. Avete bruciato la notte."
          ),
          opt("adesso", "Camminiamo adesso verso la luce",
            "La luce è un ripetitore. Arrivate prima del gelo peggiore. C'è un cancello aperto e un bidone. Meglio delle rovine.",
            "La luce sparisce dietro una duna. {actor} si separa dieci minuti e si perde. Lo ritrovate. All'alba siete alle rovine, più freddi.",
            "Siete a una recinzione, non a quattro muri. Avete guadagnato il tratto di notte.",
            "Rovine, di nuovo. La luce di notte non si insegue a caso."
          )
        ),
        ch("d-pozzo", "L'avamposto",
          "A {location} c'è una stanza di cemento, una cisterna, un cancello aperto. Un foglio: «torniamo venerdì». Non è chiaro quale.",
          "La cisterna esce marrone, poi chiara. C'è sale e riso. Restare è ragionevole. Se il venerdì è passato, nessuno viene.",
          "{actor} apre il rubinetto.",
          opt("fili", "Riempiamo e seguiamo i fili del telefono",
            "Riempite tutto. I fili vanno a est. Dopo un'ora {actor} vede l'asfalto: un nastro scuro, lontano. Non ci siete. Lo vedete.",
            "Uscite troppo in fretta. {actor} lascia il bidone mezzo vuoto e si storce sul pietrisco. Tornate al cancello. L'asfalto, se c'è, non l'avete visto.",
            "L'asfalto è un fatto. Vi serve un'ultima tappa, non una preghiera.",
            "Siete ancora al cancello. Il foglio è lo stesso. Il venerdì non è venuto."
          ),
          opt("aspetta", "Aspettiamo in avamposto",
            "Aspettate un giorno. Passa un fuoristrada. Si ferma. Acqua, un passaggio, una domanda su quanti siete. Non è il paese. È un mezzo.",
            "Aspettate due giorni. L'acqua scende. Nessuno arriva. {actor} ha i crampi. Quando ripartite siete più deboli. L'asfalto è più lontano di quanto ricordavate.",
            "Siete su un mezzo, o avete visto un mezzo. Il deserto come trappola si è incrinato.",
            "Stesso cancello, meno acqua, {actor} che non poggia. Il venerdì era già passato."
          )
        ),
        ch("d-vento", "Il vento",
          "A {location} il vento alza un muro di sabbia. Visibilità: pochi metri. Camminare è chiudere gli occhi. Fermarsi è perdere direzione.",
          "Potete fare un riparo basso e aspettare, o legarvi e avanzare a passi corti sulla bussola. La tempesta dura un'ora o sei. Non lo sapete.",
          "{actor} tiene il telo.",
          opt("riparo", "Riparo e bussola a terra",
            "Vi sdraiate dietro il telo. Quando cala, la duna è cambiata, la bussola no. {actor} ritrova i fili del telefono, piegati ma lì.",
            "Il telo si strappa. {actor} prende sabbia negli occhi e non vede per un'ora. Quando il vento cala, i fili non ci sono. Stessa duna, ciechi un pezzo.",
            "La linea è recuperata. Non avete camminato nel bianco.",
            "Duna che non riconoscete. La direzione è una stima. Avete perso la linea."
          ),
          opt("legati", "Avanzare legati sulla bussola",
            "Passi corti, corda, azimut. Uscite dal muro su un pietrisco che conoscete: la pista. {actor} ha tenuto il grado.",
            "Dopo venti minuti non sapete se siete sulla linea. {actor} inciampa e si sloga una caviglia. Vi fermate nel posto sbagliato. I fili, dopo, non si vedono.",
            "Siete di nuovo sulla pista. Il vento è alle spalle.",
            "Siete su una duna nuova, {actor} che non poggia. La linea è persa."
          )
        ),
        ch("d-rovine", "Le iscrizioni",
          "A {location} c'è un pennarello recente: una freccia e «H2O 3km». Può essere vero. Può essere vecchio.",
          "Tre chilometri sono un'ora se andate dritti. Se la freccia mente, un'ora e più sete. Avete un litro in tre.",
          "{actor} legge la scritta.",
          opt("freccia", "Seguiamo la freccia",
            "La freccia è vera. Pozzo coperto da una lastra, acqua bassa ma pulita. {actor} lascia data e direzione. Potete tornare, se serve.",
            "La freccia è vecchia. Tre chilometri, un cratere di sale. {actor} torna con le labbra bianche. Avete bevuto metà di quel che restava.",
            "Avete acqua e un segno. Non è l'asfalto. È un giorno in più.",
            "Le rovine di nuovo. Il pennarello è sbiadito. La sete no."
          ),
          opt("bussola", "Ignoriamo e teniamo la bussola",
            "Tenete l'azimut verso i fili. Dopo un'ora il pietrisco torna. Una tanica arrugginita, vuota, e un cartello abbattuto: distanza da un paese. Siete sulla linea giusta.",
            "Senza la freccia vi accorciate su una duna. {actor} si disorienta. Tornate alle rovine. Un'ora persa, stesso pennarello.",
            "Il cartello è un fatto. Il paese ha un nome. La direzione tiene.",
            "Stesse rovine, meno acqua. La bussola da sola non vi ha spostati."
          )
        ),
        ch("d-asfalto", "L'asfalto",
          "A {location} l'asfalto c'è: due corsie, nessuna macchina da venti minuti. Un cartello: distanza da un paese che conoscete.",
          "Potete camminare sul bordo o fermarvi e fare segnale. Il telefono, qui, a volte prende. Non è il paese. È la fine del deserto come trappola.",
          "{actor} guarda la strada.",
          opt("bordo", "Camminiamo sul bordo",
            "Dopo quaranta minuti passa un furgone. Si ferma. Acqua, un passaggio. {actor} sale per primo. Il condizionatore fa male ed è la cosa più utile della settimana.",
            "Camminate due ore. Nessuno passa. {actor} si siede e non si rialza subito. Tornate al cartello. Stesso asfalto, meno gambe.",
            "Siete fuori dal deserto come problema di acqua. Manca chiudere: l'ultima cosa.",
            "Siete ancora al cartello. L'asfalto c'è. Il passaggio no. Il giorno se ne va."
          ),
          opt("segnale", "Restiamo al cartello e segnaliamo",
            "Uno specchio, un telo. Dopo un'ora un mezzo frena. Vi caricano. Fine della pista come trappola.",
            "Restate tre ore. Il telefono non prende. {actor} ha un colpo di sole fermo. Quando camminate, il primo passaggio è lontano.",
            "Siete su un sedile. Il bidone, alle spalle, è un oggetto nel deserto.",
            "Cartello, di nuovo. {actor} non sta in piedi al sole. Il segnale non è bastato."
          )
        )
      ],
      climax: {
        id: "x-desert",
        title: "Fuori",
        story: [
          "Siete a {location}. Avete asfalto o avamposto o entrambi. Un mezzo si ferma, o una radio risponde, o vedete il paese. Non è un miracolo. È geometria e ostinazione.",
          "Manca l'ultima cosa: farvi prendere, o arrivare, senza che l'ultimo tratto vi spezzi. Il bidone è vuoto. Le gambe sono finite.",
          "{actor} alza un braccio o fa l'ultimo chilometro."
        ],
        prompt: "Cosa fate?",
        choices: [
          opt("prendi", "Ci facciamo prendere",
            "Vi caricano. O arrivate al primo edificio con una porta e un rubinetto. L'acqua ha il cloro. La bevete a sorsi. Qualcuno chiama. Qualcuno risponde.",
            "Il mezzo gira l'angolo mentre {actor} è ancora sulla sabbia, non sull'asfalto. Dovete aspettare di nuovo, con meno forze.",
            "", ""
          ),
          opt("corto", "Tentiamo la scorciatoia sulla sabbia",
            "La scorciatoia è corta e tiene. Uscite su una strada migliore. Un'auto frena. Fine.",
            "La sabbia è morbida. {actor} crolla. Il mezzo che avevate visto sparisce. Tornate sulla strada e aspettate, più vuoti.",
            "", ""
          )
        ]
      },
      win: [
        "Siete fuori. Non salvati da un angelo. Fuori: un tetto, un rubinetto, una strada con macchine. Il 4x4 resta nel deserto.",
        "{goal}: fatto. Avete camminato, scavato, aspettato il vento. Avete detto di no alle ore sbagliate.",
        "Si chiude qui."
      ],
      fail: [
        "Il deserto non ha bisogno di uccidervi in un colpo. Vi toglie acqua e direzione finché non vi alzate più.",
        "{goal} resta una riga sulla carta del 2004.",
        "La storia finisce sulla pista. Non c'è un altro capitolo."
      ]
    }
  ];

  C.worlds = C.campaigns.map(function (c) {
    return { id: c.id, name: c.title, locations: c.locations };
  });
  C.quests = C.campaigns.map(function (c) {
    return { id: c.id, title: c.goal };
  });
  C.villains = C.campaigns.map(function (c) {
    return { id: c.id + "-th", name: c.threat, line: c.threatLine };
  });
  C.treasures = [{ id: "t-scorte", name: "le scorte" }];
  C.npcs = [{ id: "n-gruppo", name: "il gruppo", line: "" }];
  C.locations = [];
  C.challenges = [];
  C.climax = [];
  C.campaigns.forEach(function (c) {
    c.locations.forEach(function (name, i) {
      C.locations.push({ id: c.id + "-l" + i, name: name });
    });
    c.challenges.forEach(function (chl) {
      C.challenges.push(chl);
    });
    C.climax.push(c.climax);
  });
  C.openings = C.campaigns.map(function (c) {
    return c.opening;
  });
  C.endings = {
    win: C.campaigns.map(function (c) {
      return c.win;
    }),
    fail: C.campaigns.map(function (c) {
      return c.fail;
    })
  };

  C.deathLines = [
    "{name} non si rialza. Il gruppo va avanti: fermarsi qui finisce anche gli altri.",
    "{name} è fuori. Resta dove può. Voi no. {villain} non aspetta.",
    "{name} cede. Contate chi resta in piedi e la distanza che manca."
  ];

  root.AF_CONTENT = C;
})(typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : this);