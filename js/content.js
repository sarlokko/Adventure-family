/* Racconto da leggere ad alta voce: paragrafi, non telegrammi. */
(function (root) {
  const C = {};

  C.worlds = [
    { id: "w-lucciole", name: "il bosco delle lucciole", line: "Siete entrati in un bosco che di giorno nessuno trova. Adesso è notte, e migliaia di lucciole camminano sull'aria come briciole di luna sparse tra i rami. L'erba è alta, odora di muschio, e ogni tanto un ramo scricchiola alle spalle: il bosco si sta girando per guardarvi." },
    { id: "w-nonna", name: "la cucina gigante", line: "Siete finiti in una cucina grande come una piazza. I barattoli sono torri, la pentola è un lago, e voi siete piccoli come formiche in grembiule. Da qualche parte una pentola canta, e il vapore sa di brodo della domenica." },
    { id: "w-isola", name: "l'isola che cammina", line: "Siete sbarcati su un'isola coperta di palme basse e sabbia calda. Poi l'isola fa un passo: sotto c'è il guscio di una tartaruga antica, che viaggia lenta tra un'onda e l'altra. Il cielo è enorme, e il mare vi tiene d'occhio." },
    { id: "w-soffitta", name: "la soffitta dei giochi", line: "Siete saliti in una soffitta dove i giochi vecchi non dormono mai del tutto. Una slitta sospira, un orso di pezza ha ancora gli occhi aperti, e la polvere balla nella luce del lucernario come se fosse invitata." },
    { id: "w-tappeto", name: "la città sotto il tappeto", line: "Siete scivolati sotto il tappeto, e lì sotto c'è una città. Le case sono fatte di briciole, i lampioni sono bottoni, e le strade puzzano di lana e di segreti. Qualcuno, laggiù, sta già chiudendo le finestre." },
    { id: "w-caramello", name: "il vulcano di caramello", line: "Siete arrivati ai piedi di un vulcano che non sputa lava, ma caramello caldo. L'aria è dolce e pericolosa, le pietre sono appiccicose, e in cielo le nuvole sembrano toffee che non finiscono di sciogliersi." },
    { id: "w-biblio", name: "la biblioteca infinita", line: "Siete in una biblioteca che non ha parete di fondo. I corridoi di libri si piegano, si intrecciano, e a volte un volume si apre da solo per farvi strada — o per farvi perdere. Qui le storie hanno le gambe." },
    { id: "w-treno", name: "il treno tra le nuvole", line: "Siete saliti su un treno che non tocca mai terra. Fuori dai finestrini corrono le nuvole, i palazzi delle nuvole, e stazioni fatte di nebbia. Il conduttore ha una voce di fischio, e il binario è un nastro di vento." },
    { id: "w-ombre", name: "il mercato delle ombre", line: "Siete in un mercato dove si comprano cose che non si possono mettere in tasca: ombre, sbadigli, mercoledì avanzati. Le bancarelle bisbigliano, le bilance pesano i silenzi, e qualcuno sta già contando i vostri passi." },
    { id: "w-lago", name: "il lago ghiacciato", line: "Siete in mezzo a un lago che ha deciso di diventare specchio. Il ghiaccio canta sotto le scarpe, i canneti sono fermi come soldati, e in fondo, sotto il vetro, nuotano luci che non dovrebbero essere accese." },
    { id: "w-specchio", name: "il paese nello specchio", line: "Siete passati attraverso uno specchio, e adesso camminate in un paese fatto di riflessi. Le case hanno le facciate al contrario, i gatti salutano con la coda, e ogni vostra espressione arriva un attimo prima di voi." },
    { id: "w-fattoria", name: "la fattoria del tramonto veloce", line: "Siete in una fattoria dove il sole tramonta in pochi minuti, poi rinasce, poi tramonta di nuovo. Le galline sono confuse, i campi cambiano colore come un libro che sfoglia da solo, e la cena non sa mai a che ora arrivare." },
    { id: "w-sale", name: "il deserto di sale", line: "Siete in un deserto bianco fatto di sale. Se correte, il suolo scricchiola come zucchero; se parlate troppo forte, l'eco vi ripete le bugie. All'orizzonte le dune sembrano merenghe, e non lo sono." },
    { id: "w-porto", name: "il porto dei pesci volanti", line: "Siete in un porto dove i pesci volano da una barca all'altra come se il cielo fosse acqua. Le funi odono di catrame, le ancore sognano, e i marinai discutono con le nuvole sul prezzo del vento." },
    { id: "w-gatti", name: "il giardino dei gatti giardinieri", line: "Siete in un giardino tenuto da gatti seri, con grembiuli di foglie. Innaffiano, potano, e vi guardano storto se pestate un'aiuola. Tra i cespugli c'è un sentiero che i gatti fingono di non vedere." },
    { id: "w-miniera", name: "la miniera di luce", line: "Siete scesi in una miniera dove non si scava il carbone, ma la luce delle stelle cadute. I picconi fanno scintille dolci, i vagoncini portano barili di bagliore, e il buio, qui, è solo un caposquadra un po' stanco." },
    { id: "w-pozzo", name: "il paesino in fondo al pozzo", line: "Siete scesi in un pozzo e, in fondo, c'è un paesino con le finestre accese. Si sta stretti, si parla piano, e l'acqua del mondo di sopra fa il rumore di un tetto. Qualcuno ha steso i panni sulla corda del secchio." },
    { id: "w-circo", name: "il circo vuoto", line: "Siete sotto un tendone di circo rimasto vuoto. Le tribune ricordano gli applausi, un trapezio dondola da solo, e in pista la segatura tiene ancora l'impronta di un elefante che se n'è andato ieri, o cent'anni fa." },
    { id: "w-scuola", name: "la scuola degli incantesimi al contrario", line: "Siete in una scuola di magia dove gli incantesimi fanno l'opposto. Chi vuole volare affonda, chi vuole silenzio fa un trombino, e i professori hanno imparato a chiedere le cose a rovescio. I corridoi sanno di gesso e di starnuti incantati." },
    { id: "w-giganti", name: "la valle dei giganti addormentati", line: "Siete in una valle dove i giganti dormono per terra, e le loro pance sono colline. Quando russano, tremano i sassi. Tra un dito e l'altro c'è posto per una strada, e voi ci state camminando sopra la punta dei piedi." },
    { id: "w-te", name: "il villaggio sulla tazza", line: "Siete in un villaggio costruito sul bordo di una tazza da tè. Sotto, il tè fuma come un mare caldo; sopra, una cucchiara passa ogni tanto come una luna d'argento. Se qualcuno mescola, è terremoto." },
    { id: "w-divano", name: "il regno sotto il divano", line: "Siete sotto il divano, dove finiscono i calzini, le briciole e le cose che nessuno cerca abbastanza. C'è polvere come nebbia, un deserto di molliche, e una luce lontana che viene dal mondo di sopra, enorme e distratta." },
    { id: "w-faro", name: "il faro della luna ferma", line: "Siete arrivati a un faro. La luna è ferma vicino al molo, come se avesse deciso di scendere a chiedere un bicchiere d'acqua. Le onde fanno piano, e il fascio del faro gira cercando qualcosa che non è una nave." },
    { id: "w-ombrelli", name: "la foresta di ombrelli", line: "Siete in una foresta fatta di ombrelli piantati per il manico. Quando piove si aprono da soli, e sotto nascono sentieri asciutti. Quando c'è il sole restano chiusi, e allora il bosco diventa un palo dopo l'altro, pieno di ombre lunghe." }
  ];

  C.quests = [
    { id: "q-uovo", name: "l'uovo dei compleanni", line: "Dovete riportare l'uovo dei compleanni, che è sparito. Senza di quello i giorni di festa restano spenti, le torte non sanno più di festa, e nessuno riesce a spegnere le candeline perché le candeline non ci sono." },
    { id: "q-chiave", name: "la chiave del domani", line: "Dovete ritrovare la chiave del domani. Senza quella i giorni non arrivano: resta sempre oggi, sempre la stessa merenda, sempre la stessa ora sul muro." },
    { id: "q-ricetta", name: "la ricetta del coraggio", line: "Dovete riprendere la ricetta del coraggio, scritta con inchiostro che trema. Chi la tiene può far paura al buio; chi l'ha rubata la sta cucinando al contrario, e il brodo sa di rimpianto." },
    { id: "q-ombra", name: "l'ombra del paese", line: "Dovete riportare l'ombra del paese. Senza ombra non si dorme, i tetti non hanno fresco, e la gente cammina come se le mancasse la metà più quieta." },
    { id: "q-bussola", name: "la bussola storta", line: "Dovete raddrizzare la bussola del mondo. Adesso punta a caso: a volte a casa, a volte nel piatto, a volte dritto nel naso di chi non c'entra." },
    { id: "q-drago", name: "la lettera al drago", line: "Dovete consegnare una lettera a un drago timido. La lettera è importante, il drago si nasconde, e se non arriva in tempo il drago crederà di non avere amici al mondo." },
    { id: "q-orologio", name: "l'orologio della cena", line: "Dovete riavvolgere l'orologio della cena. Altrimenti si cena troppo tardi, i pentolini si offendono, e la fame fa capricci anche a chi è coraggioso." },
    { id: "q-seme", name: "il seme della risata", line: "Dovete piantare il seme della risata prima che si secchi. Se non lo fate, resta solo il silenzio, e il silenzio qui è una cosa che occupa le sedie." },
    { id: "q-mappa", name: "la mappa strappata", line: "Dovete ricucire la mappa. Senza mappa le strade si nascondono, i ponti fanno finta di non esserci, e vi perdete anche nel cortile di casa." },
    { id: "q-corona", name: "la corona scomoda", line: "Dovete nascondere una corona troppo facile da mettere. Chi se la infila in testa diventa re, anche un cappello, anche una pentola, e il paese non ha bisogno di altri re per oggi." },
    { id: "q-lume", name: "il lume dei persi", line: "Dovete accendere il lume dei persi, che ora è spento. Finché resta buio, chi si è perso resta perso, e le voci chiamano senza trovare la porta." },
    { id: "q-patto", name: "il patto delle scorciatoie", line: "Dovete spezzare un patto cattivo fatto sulle scorciatoie. Chi lo firma arriva prima, ma lascia a casa un pezzetto di sé, e le scorciatoie stanno diventando troppe." },
    { id: "q-canto", name: "il canto delle campane", line: "Dovete restituire la voce alle campane. Ora sono mute: l'ora passa senza suono, e il paese non sa più quando è tempo di tornare a casa." },
    { id: "q-ponte", name: "il ponte tra le due rive", line: "Dovete ricostruire il ponte. Le due rive non si parlano più, i saluti restano a metà fiume, e le famiglie si fanno cenni da lontano come se il mondo si fosse spezzato in due." },
    { id: "q-gatto", name: "il gatto dei nomi", line: "Dovete liberare il gatto che ricorda i nomi. Senza di lui la gente dimentica come si chiama, e salutare diventa un imbarazzo enorme." },
    { id: "q-neve", name: "la neve di farina", line: "Dovete fermare la neve di farina che sta seppellendo i forni. Il pane non cresce, i fornai starnutiscono, e il paese sta diventando un dolce troppo crudo." },
    { id: "q-specchio", name: "lo specchio ladro", line: "Dovete chiudere uno specchio che ruba i volti. Chi si guarda resta senza espressione, e in giro si incontrano facce vuote che cercano lo specchio per riavere il sorriso." },
    { id: "q-nave", name: "la nave di carta", line: "Dovete varare la nave di carta. È fragile e ostinata, e porta a casa chi è rimasto fuori — i tardivi, i sognatori, chi ha preso la strada più lunga." },
    { id: "q-lanterna", name: "la lanterna delle storie", line: "Dovete riempire la lanterna di storie, perché senza storie non fa luce. Finché resta vuota, le stanze restano buie anche con le finestre aperte." },
    { id: "q-treno", name: "il vagone fuggitivo", line: "Dovete fermare un vagone che scappa da solo. Corre sui binari senza macchinista, si porta via i bagagli e le merende, e non ha intenzione di fermarsi alla stazione giusta." },
    { id: "q-re", name: "il re delle pause", line: "Dovete svegliare il re delle pause. Finché dorme, niente merenda, niente respiro, niente «aspetta un momento»: il mondo va troppo in fretta e inciampa." },
    { id: "q-colore", name: "il rosso del tramonto", line: "Dovete restituire il rosso al tramonto. Ora il cielo è grigio anche all'ora giusta, e la gente si dimentica di alzare gli occhi." },
    { id: "q-chiave2", name: "il baule dei sì", line: "Dovete aprire il baule dei sì. Dentro ci sono i permessi di giocare ancora, di restare cinque minuti, di fare una cosa «dopo cena». Senza di quelli, tutto è no." },
    { id: "q-vento", name: "il vento pettegolo", line: "Dovete calmare il vento. Adesso racconta i segreti in piazza, solleva i cappelli e le bugie, e nessuno ha più un pensiero che resti suo." }
  ];

  C.villains = [
    { id: "v-conte", name: "il Conte dei Minuti", line: "Il Conte dei Minuti ruba il tempo a manciate. Mette i minuti in un panciotto, li conta, e vi lascia sempre in ritardo — anche quando siete partiti per tempo." },
    { id: "v-strega", name: "Strega Brodo", line: "Strega Brodo rovina i piani mescolandoli in un pentolone. Un'idea buona, un pizzico di «non ce la fate», e il brodo viene fuori storto." },
    { id: "v-re", name: "Re Tappo", line: "Re Tappo chiude tutto: porte, bottiglie, conversazioni. Porta un mantello di sughero e un scettro che è un cavatappi usato al contrario." },
    { id: "v-ombra", name: "la Signora Senza Ombra", line: "La Signora Senza Ombra ruba le ombre perché la sua le è scappata. Cammina leggera, e dove passa resta troppa luce, che stanca." },
    { id: "v-mago", name: "Mago Sbagliato", line: "Mago Sbagliato lancia incantesimi che fanno l'opposto. Vuole aiutarvi, dice, e intanto vi allunga il naso, vi accorcia la strada sbagliata, vi fa dire «ciao» quando volevate «aiuto»." },
    { id: "v-lupo", name: "il Lupo dei Cuscini", line: "Il Lupo dei Cuscini vi addormenta quando non dovete. Ha un sacco di piume, una voce da nanna, e denti che non servono: gli basta uno sbadiglio." },
    { id: "v-capitano", name: "Capitano Muffa", line: "Capitano Muffa fa ammuffire le cose belle. Il pane, i piani, il coraggio: tutto prende macchie verdi se lui ci passa sopra con gli stivali." },
    { id: "v-bambola", name: "la Bambola Direttore", line: "La Bambola Direttore vuole che tutti obbediscano al suo teatrino. Batte le mani di porcellana, e chi non recita la parte giusta resta fermo come un pupazzo." },
    { id: "v-cuoco", name: "Chef Fulmine", line: "Chef Fulmine cucina tempeste e le tira in faccia. Ha un cappello da cuoco che fuma, e un mestolo che fa tuoni anche nella minestra." },
    { id: "v-bibliotecaria", name: "la Bibliotecaria del Silenzio", line: "La Bibliotecaria del Silenzio cancella le parole. Shh, e un racconto resta a metà; shh, e vi dimenticate il nome della missione." },
    { id: "v-nano", name: "il Nano delle Scorciatoie", line: "Il Nano delle Scorciatoie vi fa perdere con il sorriso. «Di qua è più breve», dice, e di qua c'è sempre un vicolo che torna indietro." },
    { id: "v-gatto", name: "Gatto Imperatore", line: "Gatto Imperatore vuole che obbediate, che vi inginocchiate, che gli portiate merende. Ha una corona di sardine e uno sguardo da re annoiato." },
    { id: "v-gelataio", name: "il Gelataio Gelido", line: "Il Gelataio Gelido congela i piedi, le idee, le corse. Offre coni che non si sciolgono mai, e chi li accetta resta fermo come una statua di vaniglia." },
    { id: "v-pittore", name: "il Pittore delle porte false", line: "Il Pittore dipinge porte che non aprono, finestre sul niente, strade che sono solo colore. È bravo, ed è per questo che è pericoloso." },
    { id: "v-sarto", name: "il Sarto che stringe", line: "Il Sarto cuce vestiti che stringono: giacche di paura, scarpe che non vogliono camminare, cappelli che pensano al posto vostro." },
    { id: "v-posta", name: "il Postino dei No", line: "Il Postino dei No non consegna mai i sì. Porta solo rifiuti, divieti, «non si può». La sua borsa è pesante e fa un suono da catenaccio." },
    { id: "v-rana", name: "Rana Sindaca", line: "Rana Sindaca non vi fa entrare in paese. Siede sul sasso più alto, gonfia la gola, e firma ordinanze con una zampa bagnata." },
    { id: "v-drago", name: "il Drago degli Sbadigli", line: "Il Drago degli Sbadigli vi addormenta col fiato caldo. Non è cattivo per fame: è cattivo per noia, e la noia, da lui, è un incendio lento." },
    { id: "v-specchio", name: "il Gemello nello specchio", line: "Il Gemello nello specchio copia i gesti e li fa cattivi. Se voi salutate, lui spinge; se voi correte, lui vi fa inciampare con lo stesso passo." },
    { id: "v-mulo", name: "Mulo Doganiere", line: "Mulo Doganiere blocca la strada e chiede dazi impossibili: un segreto, un calzino, il vostro nome detto al contrario. Finché non paga qualcuno, nessuno passa." },
    { id: "v-luna", name: "la Luna Storta", line: "La Luna Storta sposta le cose di notte. Mette le sedie sul tetto, i sentieri nei fiumi, e al mattino tutti incolpano il vento." },
    { id: "v-sacco", name: "il Sacco dei Rimpianti", line: "Il Sacco dei Rimpianti inghiotte le cose che avete quasi fatto. Resta aperto, dondola, e se vi avvicinate troppo vi succhia anche il «ci provo»." },
    { id: "v-coro", name: "il Coro dei Non si può", line: "Il Coro dei Non si può vi fa stare fermi cantando divieti in armonia. È bello da sentire, ed è per questo che le gambe obbediscono." },
    { id: "v-reclock", name: "l'Orologiaio Invertito", line: "L'Orologiaio Invertito fa andare il tempo all'indietro. Le ferite si riaprono, le merende si crudono, e i passi che avete fatto tornano nella scarpa." }
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
    { id: "n-talpa", name: "la talpa", line: "Vi accompagna la talpa, che conosce i cunicoli meglio delle proprie tasche. Parla poco, scava molto, e sa quando il terreno sta per fare una birichinata." },
    { id: "n-nonno", name: "Nonno Nebbia", line: "Vi accompagna Nonno Nebbia, che arriva sempre un attimo prima della pioggia. Ha storie lunghe e tasche piene di fazzoletti asciutti." },
    { id: "n-owl", name: "la civetta", line: "Vi accompagna la civetta, postina delle lettere notturne. Vede lontano, giudica poco, e sa quale ramo tiene i segreti." },
    { id: "n-bimbo", name: "il bambino di fumo", line: "Vi accompagna un bambino fatto di fumo, che passa sotto le porte e ride senza rumore. Se soffiate troppo forte, si offende e si dirada." },
    { id: "n-cuoca", name: "la cuoca", line: "Vi accompagna la cuoca, che misura il coraggio a cucchiai. Ha un grembiule macchiato di storie e un mestolo pronto per i draghi piccoli." },
    { id: "n-cane", name: "il cane dalla coda-lume", line: "Vi accompagna un cane la cui coda fa luce. Scodinzola, e il sentiero si accende; si ferma, e tornate a camminare a tentoni." },
    { id: "n-sarta", name: "la sarta", line: "Vi accompagna la sarta, che rammenda strappi nel mondo con filo invisibile. Se vi si è rotto un piano, lei lo imbastisce." },
    { id: "n-pescatore", name: "il pescatore", line: "Vi accompagna il pescatore, paziente come una sponda. Sa aspettare, sa tirare, e sa quando una cosa è troppo pesante per le vostre reti." },
    { id: "n-regina", name: "la regina delle formiche", line: "Vi accompagna la regina delle formiche, che organizza anche il caos. Le sue suddite portano briciole, notizie, e a volte un coraggio più grande di loro." },
    { id: "n-robot", name: "la stufetta parlante", line: "Vi accompagna una stufetta parlante, scricchiolante e gentile. Scalda le mani e i discorsi, e si offende se la usate solo come sedia." },
    { id: "n-albero", name: "l'albero impaziente", line: "Vi accompagna un albero che cammina a piccoli passi di radice. Non ha pazienza, ha foglie, e se lo fate aspettare vi butta una pigna precisa." },
    { id: "n-topo", name: "il topo della biblioteca", line: "Vi accompagna il topo della biblioteca, che ha letto i libri dalle note a piè di pagina. Sa le scorciatoie tra un capitolo e l'altro." },
    { id: "n-fata", name: "la fata dei secondi tentativi", line: "Vi accompagna una fata che aiuta solo se avete già provato da soli. È severa, luccicante, e tiene i miracoli in un barattolino quasi vuoto." },
    { id: "n-guardia", name: "la guardia di paglia", line: "Vi accompagna una guardia di paglia, seria fino al ridicolo. Ha una lancia di stecchino e un giuramento più grosso di lei." },
    { id: "n-mercante", name: "il mercante", line: "Vi accompagna il mercante, che scambia consigli come se fossero spezie. Non è gratis, ma a volte il prezzo è una storia vera." },
    { id: "n-lumaca", name: "la lumaca", line: "Vi accompagna la lumaca. È lenta, e per questo non sbaglia strada: ogni curva la pensa due volte, e la terza la cammina." },
    { id: "n-pirata", name: "il pirata in pensione", line: "Vi accompagna un pirata in pensione, con la barba che sa di sale e i tesori ormai tutti raccontati. Gli è rimasto il coraggio, e un pappagallo che corregge i dettagli." },
    { id: "n-stella", name: "la stella caduta", line: "Vi accompagna una stella caduta, ancora calda e un po' stordita. Illumina male, ma illumina vero, e chiede spesso la strada per tornare su." },
    { id: "n-fornaio", name: "il fornaio", line: "Vi accompagna il fornaio, che impasta anche le paure finché diventano pane. All'alba è già sveglio, e sa quando un cuore ha bisogno di crosta calda." },
    { id: "n-rana", name: "la rana", line: "Vi accompagna la rana, campionessa di salti e di silenzi. Sa quale sasso è un trono e quale è solo un sasso." },
    { id: "n-ombra", name: "un'ombra smarrita", line: "Vi accompagna un'ombra smarrita, che cerca il suo padrone e intanto si presta a coprirvi. È fredda, fedele, e ha paura delle lampade troppo vive." },
    { id: "n-drago", name: "un draghetto raffreddato", line: "Vi accompagna un draghetto raffreddato, che starnutisce scintille. Non fa paura a nessuno, tranne ai fazzoletti." },
    { id: "n-nonna", name: "Nonna Chiavi", line: "Vi accompagna Nonna Chiavi, che ha un mazzo per ogni porta e un biscotto per ogni attesa. Dice «piano» e intende «avanti»." },
    { id: "n-vento", name: "il vento apprendista", line: "Vi accompagna il vento apprendista, che ancora sbaglia le foglie e chiede scusa ai cappelli. Sta imparando a spingere senza rovesciare." },
    { id: "n-statua", name: "la statua", line: "Vi accompagna una statua che parla solo se la salutate. Ha pazienza da piazza, e memorie più vecchie dei tetti." },
    { id: "n-ape", name: "l'ape", line: "Vi accompagna un'ape, puntuale e profumata. Conosce i fiori che dicono la verità e quelli che dicono solo «guarda che bello»." },
    { id: "n-re", name: "il re dei calzini", line: "Vi accompagna il re dei calzini, sovrano dei perduti e dei ritrovati. Sa dove vanno le cose quando spariscono, e a volte le restituisce spaiate." },
    { id: "n-fantasma", name: "il fantasma della merenda", line: "Vi accompagna il fantasma della merenda, che appare all'ora giusta con odore di pane e marmellata. Non spaventa: rincuora, e questo è più raro." },
    { id: "n-ponte", name: "il ponte parlante", line: "Vi accompagna un ponte parlante, che si è stancato di stare fermo. Racconta chi è passato, chi è caduto, chi ha detto «grazie»." },
    { id: "n-gatto", name: "il gatto senza nome", line: "Vi accompagna un gatto senza nome, che si fa chiamare come gli pare. Vi precede, vi giudica, e si siede sui problemi finché si schiacciano." },
    { id: "n-orologiaio", name: "l'orologiaia", line: "Vi accompagna l'orologiaia, che aggiusta i minuti storti. Se siete in ritardo, lei non corre: mette il mondo un po' più lento." },
    { id: "n-mulo", name: "il mulo poeta", line: "Vi accompagna un mulo poeta, testardo in versi. Non lo sposti con le urla, lo sposti con una rima giusta." }
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
      prompt: "Che cosa fate, adesso?",
      choices: [c1, c2]
    };
  }
  function opt(id, label, green, red, greenNext, redNext) {
    return { id, label, dmg: 1, green, red, greenNext, redNext };
  }

  C.challenges = [
    ch("c-ponte", "Il ponte",
      "Il sentiero vi lascia ai piedi di {location}. Davanti, un ponte di tavole storte attraversa un buco così nero che sembra inghiottire anche il rumore. Sotto, qualcosa respira — o forse è solo il vuoto che fa finta.",
      "Dall'altra parte continua la missione: {questName}. Restare qui significa aspettare {villain}, e {villain} non è il tipo che aspetta con pazienza. Il legno scricchiola, come se il ponte stesso avesse paura.",
      "Tocca a {actor} scegliere come passare. Due idee, poco tempo, e il vuoto che ascolta.",
      opt("run", "Corriamo",
        "{actor} parte di slancio. Le tavole protestano, il vuoto sbadiglia, ma i piedi trovano sempre il pezzo di legno giusto. Attraverse il ponte come si attraversa una stanza buia: in un fiato. Siete di là, interi, con il cuore che batte forte e la strada di nuovo sotto le scarpe.",
        "{actor} parte di slancio, ma a metà ponte una tavola ruota come una lingua. Un piede va nel vuoto, le mani si aggrappano, e il vuoto si prende un cuore come pedaggio. Dovete tornare indietro e cercare il giro lungo, con le ginocchia che ballano.",
        "Siete di là in tempo. Il ponte resta alle spalle come un segreto che non racconterete a cena, e la missione ha di nuovo una strada dritta.",
        "Il giro lungo vi mangia minuti preziosi. Arrivate comunque, ma il giorno è già più corto e {villain} ha avuto tempo di prepararsi."
      ),
      opt("build", "Facciamo un ponticello",
        "{actor} mette insieme rametti, corda e ostinazione. Il ponticello è brutto e tiene: uno dopo l'altro passate, e sotto il vuoto resta a bocca asciutta. Dall'altra parte vi guardate e ridete, perché a volte una cosa fatta in fretta è più solida di una cosa bella.",
        "Il ponticello di {actor} sembra tenere, poi cede nel punto sbagliato. Un tonfo, un graffio al coraggio, un cuore in meno. Dovete girare intorno, seguendo un sentiero che puzza di umido e di scuse.",
        "Quel ponticello casalingo vi ha salvati, e adesso camminate più sicuri, come se il mondo avesse accettato un vostro piccolo aggiustamento.",
        "Arrivate stanchi del giro, con i pantaloni sporchi e la sensazione che {villain} abbia sentito il rumore della caduta."
      )
    ),
    ch("c-indovinello", "La domanda",
      "Arrivate a {location}, e l'aria si ferma. Una voce — né uomo né vento — chiede piano: «Che cosa si può spezzare senza toccarla?» L'eco tiene la domanda sollevata, come un piatto troppo pieno.",
      "Se sbagliate, la strada si chiude. Se indovinate, si apre verso {questName}. {villain} ama queste prove: sono pulite, e fanno perdere tempo.",
      "{actor} deve rispondere, o cambiare gioco.",
      opt("think", "Rispondiamo: una promessa",
        "«Una promessa», dice {actor}, e la voce fa un silenzio contento. Davanti a voi il passaggio si apre come una tenda. Passate, e alle spalle la domanda si spegne, soddisfatta di essere stata capita.",
        "La voce non è contenta. Forse voleva un'altra risposta, forse voleva solo farvi stare lì. Una spinta invisibile toglie un cuore a {actor}, e la strada principale si chiude. Resta il giro, lungo e un po' umiliante.",
        "La strada è aperta, e camminate come chi ha detto la cosa giusta al momento giusto: è una forma rara di fortuna.",
        "Dovete fare il giro. L'indovinello resta alle spalle, irrisolto, e vi segue come una canzone stonata."
      ),
      opt("trick", "Facciamo una domanda noi",
        "{actor} risponde con un'altra domanda, e la voce si confonde: non era abituata a essere interrogata. Nel suo imbarazzo il passaggio si spalanca. Passate veloci, prima che si riprenda.",
        "La voce non gradisce il trucco. Spinge via {actor} con un buffetto che vale un cuore, e vi depositate da un'altra parte, un po' storditi, un po' sbagliati di mappa.",
        "Siete passati, e la voce resta lì a pensare. È un bel pensiero da lasciare a qualcuno che non siete voi.",
        "Uscite da un'altra parte. Non è la via più breve, ma è una via, e a volte basta."
      )
    ),
    ch("c-social", "Chi blocca",
      "A {location} trovate {npc} piantato in mezzo alla strada, pallido come una tovaglia troppo lavata. Non è cattivo: ha paura di {villain}, e la paura gli ha fatto da cancello.",
      "Senza passare di qui, {questName} resta lontana. Dovete fargli fare strada, con le parole o con uno scambio, prima che la paura diventi un muro vero.",
      "Tocca a {actor} parlare.",
      opt("kind", "Spieghiamo la missione",
        "{actor} racconta la missione senza orpelli, e {npc} vi crede. Si sposta, vi fa un cenno che è quasi un saluto, e per un attimo la strada è di nuovo una strada. Nei suoi occhi c'è ancora paura, ma non è più un cancello.",
        "{npc} scuote la testa: troppe storie, troppa gente che dice di essere dalla parte giusta. {actor} ci lascia un cuore, perché la sfiducia fa male come un sasso. Passate lo stesso, ma scoperti, e sapete che qualcuno parlerà.",
        "Adesso {npc} cammina un pezzo con voi. Non è un esercito, è meglio: è qualcuno che ha scelto di credervi.",
        "Siete da soli, e un po' più visibili di prima. La missione continua, ma le orecchie sbagliate si sono già tese."
      ),
      opt("trade", "Proponiamo uno scambio",
        "{actor} propone uno scambio onesto, e lo scambio tiene. {npc} si fa da parte con qualcosa in più in tasca e qualcosa in meno sulla coscienza. Passate, e nessuno deve vergognarsi.",
        "Lo scambio era una trappola, o è diventato tale per paura. {actor} ci lascia un cuore, e {npc} sparisce tra le scuse. La strada è libera, ma sa di inganno, anche se non era colpa vostra.",
        "Avete un aiuto, piccolo e concreto, come una chiave che gira al primo tentativo.",
        "Niente aiuto, e un livido nuovo sul coraggio. Andate avanti lo stesso, più guardinghi."
      )
    ),
    ch("c-stealth", "Le sentinelle",
      "A {location} ci sono le sentinelle di {villain}: non dormono, non ridono, e hanno orecchie lunghe come ombre. Il passaggio è lì, stretto, e la missione — {questName} — sta dall'altra parte del loro sguardo.",
      "Se vi vedono, {villain} saprà i vostri nomi. Se non vi vedono, avrete un pezzo di strada che sa di vittoria quieta.",
      "{actor} sceglie il modo.",
      opt("shadow", "Strisciamo in silenzio",
        "Vi fate ombra tra le ombre. {actor} conta i passi, trattiene uno starnuto, e le sentinelle guardano altrove, dove non siete. Passate come un pensiero che non è stato detto.",
        "Uno starnuto — il più piccolo del mondo, il più forte di questa ora — e {actor} ci lascia un cuore nella fuga. Scappate, sì, ma le sentinelle hanno una faccia da ricordare, e la vostra c'è dentro.",
        "Nessuno sa che ci siete. È un lusso raro, e lo spendete bene camminando dritti verso la missione.",
        "Vi hanno visti. Non tutti, non bene, ma abbastanza perché la prossima porta sia più diffidente."
      ),
      opt("disguise", "Ci travestiamo",
        "Il travestimento di {actor} è una bugia gentile: cappucci, fango, un'andatura da gente di qui. Le sentinelle sbadigliano, e voi passate con il cuore in gola che finge di essere un cuore qualunque.",
        "Il travestimento cade nel momento meno comico. {actor} resta scoperto, un cuore se ne va, e dovete correre prima che le risa delle sentinelle diventino un allarme.",
        "Sembra che siate di qui. È una protezione sottile, come un cappotto preso in prestito, e per ora tiene.",
        "Le facce sono note, adesso. Dovrete fare gli schivi, e gli schivi camminano più lenti."
      )
    ),
    ch("c-chase", "L'inseguimento",
      "A {location} un servo di {villain} scappa con {treasure} stretto al petto come un pane caldo. Non è lontano: è solo più disperato di voi, e la disperazione a volte ha le gambe lunghe.",
      "Senza {treasure} la missione zoppica. Dovete acchiapparlo prima che sparisca dietro un angolo che non restituisce.",
      "Tocca a {actor} decidere il modo della corsa.",
      opt("sprint", "Corriamo dietro",
        "{actor} corre come se la strada fosse una corda tesa. Il servo inciampa sulla propria paura, e {treasure} torna tra le vostre mani, ancora caldo dall'essere stato rubato. Per un attimo nessuno parla: si respira soltanto.",
        "{actor} inciampa, e l'inciampo costa un cuore. Il servo non si volta nemmeno. {treasure} diventa un puntino, poi un'idea, poi un rammarico che cammina più veloce di voi.",
        "Avete {treasure}. Pesano poco, le cose giuste, quando finalmente le tenete.",
        "Non avete {treasure}. La missione resta, più magra, e voi con lei."
      ),
      opt("cut", "Tagliamo la strada",
        "{actor} taglia per i vicoli, esce davanti al servo, e il servo capisce di aver finito le scorciatoie. {treasure} passa di mano senza troppa lotta: a volte perdere è più veloce di combattere.",
        "Il vicolo è cieco, e cieco è anche il piano. {actor} sbatte, perde un cuore, e il servo passa altrove, felice di avere ancora le gambe.",
        "Avete {treasure}, e avete anche una piccola lezione: a volte la testa arriva prima dei piedi.",
        "Il servo è lontano. Potete inseguirlo ancora, o accettare che questa pagina sia andata storta e voltare comunque."
      )
    ),
    ch("c-help", "La trappola",
      "A {location}, {npc} è bloccato in una trappola fatta apposta per chi aiuta. La molla è tesa, l'aria sa di metallo, e {npc} cerca di sorridervi come se non fosse grave.",
      "Se lo lasciate, la missione va avanti più povera. Se lo liberate, {villain} forse sentirà il click. Tocca a {actor}.",
      "Due modi, e le dita che già sudano.",
      opt("care", "La apriamo con calma",
        "{actor} lavora piano, come si apre un libro vecchio. La trappola cede senza urlare, e {npc} è libero, con un grazie che occupa tutto il petto. Per un attimo il mondo è soltanto questo: una cosa fatta bene.",
        "La trappola morde. {actor} ritira la mano con un cuore in meno, ma {npc} esce lo stesso, tremante. Il click si è sentito lontano, forse. Forse no.",
        "{npc} cammina con voi, e i vostri passi sono quattro invece di due: è una musica migliore.",
        "{npc} ha troppa paura per aiutarvi, adesso. Resta indietro con un cenno, e voi capite che non tutti i salvataggi finiscono in festa."
      ),
      opt("force", "Tiriamo forte",
        "{actor} tira, la trappola si rompe con un suono da stoviglie, e {npc} è salvo. Non è elegante, è fatto. A volte basta.",
        "Lo strattone fa male a {actor} e rumore al mondo. Un cuore se ne va, {npc} è fuori, e da qualche parte un orecchio di {villain} si è alzato.",
        "{npc} è con voi, riconoscente e un po' stordito, come chi è stato tirato fuori da un sogno brutto.",
        "Avete fatto rumore. La strada è aperta, ma più ascoltata di prima."
      )
    ),
    ch("c-moral", "La scelta",
      "A {location} succedono due cose insieme, e il tempo non è abbastanza per tutte e due. {treasure} sta per cadere in un posto da cui non si riprende; {npc} sta per essere scoperto.",
      "{villain} ha messo questa forbice apposta: per vedervi scegliere, e per farvi sentire in colpa comunque. Tocca a {actor}, adesso, non dopo.",
      "Una cosa sola.",
      opt("item", "Salviamo l'oggetto",
        "{actor} afferra {treasure} in tempo. {npc}, da solo, ce la fa per un pelo, con un'occhiata che non è un rimprovero e non è un grazie. Avete ciò che serviva alla missione, e un silenzio nuovo tra voi.",
        "Le mani di {actor} arrivano tardi a entrambi. Un cuore se ne va, {treasure} no, {npc} nemmeno. Resta la polvere, e la sensazione di aver scelto in un mondo che non aspettava.",
        "Avete {treasure}. Pesano anche i silenzi, ma la missione ha di nuovo i suoi attrezzi.",
        "Non avete niente di ciò che stavate per salvare. La storia diventa più magra, e voi con lei, e dovete inventare un altro modo."
      ),
      opt("friend", "Salviamo l'amico",
        "{actor} tira via {npc} un attimo prima. {treasure} rotola nel cespuglio, visibile, raggiungibile dopo. Per ora conta il respiro di qualcuno che è ancora qui.",
        "Vi scoprono mentre {actor} tira. Un cuore in meno, {npc} salvo per un soffio, {treasure} chissà. La fuga ha il sapore del quasi.",
        "{npc} è con voi, e {treasure} si può ancora cercare. Avete scelto le persone, e la missione, stranamente, non ve ne vuole.",
        "Vi hanno visti. {npc} c'è, la coperta è corta, e {villain} ha un nuovo motivo per affrettarsi."
      )
    ),
    ch("c-explore", "Il segno",
      "A {location} il posto sembra vuoto, troppo vuoto per essere onesto. Le cose vuote, nelle storie, nascondono sempre un'istruzione scritta storto.",
      "Dovete trovare un segno di {villain}: un'impronta, un odore, un graffio che dica da che parte è andata la missione. Senza segno, camminate a caso, e il caso qui non è un amico.",
      "{actor} alza gli occhi o li abbassa.",
      opt("high", "Guardiamo in alto",
        "{actor} guarda in alto, e lassù c'è un segno: un nastro, una bruciatura, una cosa che {villain} non ha pensato di nascondere dal soffitto. Adesso sapete dove andare, e il vuoto non è più vuoto: è una stanza che ha parlato.",
        "Vi cade addosso qualcosa che stava aspettando gli occhi alzati. {actor} ci lascia un cuore, e il segno, se c'era, si è offeso e si è fatto da parte.",
        "Sapete la strada. Non è poco. È quasi tutto, in un posto che voleva tenervela nascosta.",
        "Non sapete la strada. Dovete fiutare, chiedere, sbagliare una curva, e sperare che la missione sia paziente."
      ),
      opt("low", "Frughiamo in basso",
        "{actor} fruga in basso e trova un passaggio basso, umido, onesto. Ci strisciate, e uscite dove la storia voleva che usciate. Le ginocchia sono sporche, e va bene così.",
        "Qualcosa morde, laggiù. {actor} ritrae la mano con un cuore in meno, e il passaggio, se c'era, si è chiuso come una bocca.",
        "C'è un passaggio, e voi ci siete dentro, e per un po' il mondo è soltanto il rumore dei vostri gomiti.",
        "Niente passaggio. Resta la stanza vuota, e la missione che aspetta dietro una porta che non avete trovato."
      )
    ),
    ch("c-storm", "La bufera",
      "A {location} arriva una bufera che non c'entra con il cielo: l'ha mandata {villain}. Il vento porta pezzi di voci, la pioggia sa di inchiostro, e le cose leggere — cappelli, coraggio, mappe — cercano di volare via.",
      "Dovete resistere qui, o la missione vi ritrova chissà dove, chissà quando, con i capelli al contrario.",
      "{actor} decide come stare in piedi.",
      opt("shelter", "Ci accovacciamo",
        "Vi fate piccoli. {actor} tiene i capi dei mantelli, conta i tuoni, e la bufera passa sopra di voi come un treno che ha scelto un altro binario. Quando alzate la testa, {location} è ancora {location}.",
        "La bufera vi prende comunque. {actor} ci lascia un cuore, e il vento vi spinge via di qualche strada, in un posto che non avevate scelto.",
        "Siete ancora sulla strada. I capelli sono umidi, la missione è asciutta, e questo è un buon patto.",
        "Siete fuori strada. Dovrete ricalcolare i passi, e {villain} — che ha mandato il vento — saprà di avervi spostati."
      ),
      opt("sing", "Cantiamo",
        "{actor} intona una cosa semplice, e gli altri si uniscono. Il vento, che è vanitoso, si calma per ascoltare. Restate qui, un po' ridicoli, un po' salvati.",
        "Il vento si offende: non era il suo genere. {actor} ci lascia un cuore nel fracasso, e la canzone muore in gola.",
        "Siete sulla strada, e avete una canzone nuova da portare appresso, che è un tipo di mappa.",
        "Siete lontani. La bufera vi ha messi da un'altra parte del racconto, e dovete tornare a nuoto nel vento."
      )
    ),
    ch("c-lock", "La porta",
      "A {location} una porta è chiusa con un'ostinazione personale. Non è solo legno: è un carattere. La missione sta di là, e di qua state voi, con le mani già alzate.",
      "Dovete aprirla. Le porte, in questi posti, ascoltano più di quanto ammettano.",
      "{actor} prova.",
      opt("key", "Proviamo le chiavi",
        "{actor} prova le chiavi che avete, e una — la più piccola, la più dimenticata — gira. La porta si apre con un sospiro di chi voleva soltanto essere chiesta per bene. Siete dentro.",
        "La porta morde la chiave e un pezzo di coraggio. {actor} perde un cuore, e dovete cercare una finestra, che è sempre un'entrata meno dignitosa.",
        "Siete dentro, e la porta alle spalle si richiude gentile, come chi ha finito il suo lavoro.",
        "Entrate dalla finestra, con le ginocchia graffiate e la sensazione di essere ospiti un po' ladri."
      ),
      opt("ask", "Chiediamo scusa alla porta",
        "{actor} chiede scusa alla porta, sul serio. La porta, che non se l'aspettava, si apre. C'è chi dice che è magia: è solo educazione, spinta un po' più in là del solito.",
        "La porta sbatte. {actor} ci lascia un cuore nel colpo, e il legno resta chiuso, offeso due volte.",
        "La porta è amica, adesso. È una cosa strana da dire, eppure camminate più leggeri.",
        "La porta è chiusa. Resta da trovare un altro umore, o un altro muro."
      )
    ),
    ch("c-climb", "La salita",
      "A {location} dovete salire. Non è una montagna da cartolina: è una salita scomoda, con appigli che cambiano idea. In cima c'è la strada della missione; sotto, il resto del giorno che non basta.",
      "Il vento, quassù, porta notizie di {villain}. Non sono buone, e arrivano prima di voi se tardate.",
      "{actor} mette le mani sulla pietra.",
      opt("slow", "Salita lenta",
        "{actor} sale lento, e il lento tiene. Un appiglio dopo l'altro, senza eroismi, fino al bordo. Arrivate in cima con il fiato corto e le mani intere, che è il lusso vero.",
        "{actor} cade da una presa che sembrava onesta. Un cuore se ne va nel vuoto, e dovete cercare un'altra salita, più lunga, più umile.",
        "Siete in cima. Il mondo, da quassù, sembra una cosa che si può ancora aggiustare.",
        "Siete ancora sotto, a cercare il secondo tentativo, che nelle storie esiste sempre e costa sempre."
      ),
      opt("leap", "Facciamo un salto",
        "{actor} calcola, salta, e il salto riesce come una rima. Siete in cima in un attimo, e l'attimo vi tiene.",
        "Il salto di {actor} non trova l'altro bordo. C'è un cuore in meno, c'è polvere, c'è da rialzarsi senza fare troppo teatro.",
        "Siete in cima, in silenzio, perché i salti riusciti non hanno bisogno di commento.",
        "Avete fatto rumore cadendo. Qualcuno, sotto o sopra, ha contato i vostri errori."
      )
    ),
    ch("c-cook", "Il pentolone",
      "A {location} un pentolone enorme vi fissa. Vuole un piatto. Non è una metafora: ha un coperchio per bocca e un gorgoglio per voce, e finché non cucinate resta piantato in mezzo alla via.",
      "Dentro, forse, c'è un passaggio. Fuori, c'è {villain} che odia i pasti fatti con calma.",
      "{actor} si rimbocca le maniche.",
      opt("careful", "Seguiamo la ricetta",
        "{actor} segue una ricetta trovata sul bordo, scritta in brodo secco. Il pentolone è contento, fa un verso da gatto grosso, e apre una botola calda. Scendete, e l'odore vi resta nei capelli come un salvacondotto.",
        "Schizza. {actor} ci lascia un cuore nel sapore sbagliato, e il pentolone, deluso, vi indica la dispensa come si indica una porta di servizio.",
        "C'è una botola, e voi ci siete passati, e il mondo sotto il pentolone è più stretto e più vero.",
        "Uscite dalla dispensa, un po' unti, un po' umiliati, con la missione che vi aspetta senza tovaglia."
      ),
      opt("improv", "Inventiamo",
        "{actor} inventa, e il pentolone ride — un riso che fa ballare i mestoli. Apre la porta di dietro, da dove escono i cuochi felici e i gatti. Siete fuori, e avete una ricetta nuova che non scriverete mai.",
        "Il brodo esplode in un modo teatrale e ingiusto. {actor} perde un cuore, e uscite sporchi, con le ciglia zuccherate di sbaglio.",
        "Uscite dal retro, che nelle cucine è quasi sempre la via dei furbi onesti.",
        "Uscite sporchi. La missione non si ferma per una macchia, ma la macchia racconta che qui avete litigato con una pentola e non avete vinto del tutto."
      )
    ),
    ch("c-dark", "Il buio",
      "A {location} è buio, e il buio sente i passi. Non è un buio pigro: è un buio con le orecchie, che decide chi può avanzare e chi deve tornare a gattoni.",
      "Dovete avanzare. La missione non si legge al buio, eppure sta proprio di là, dove gli occhi non arrivano.",
      "{actor} sceglie il rumore o la luce.",
      opt("silent", "Camminiamo piano",
        "Camminate piano, e {actor} mette i piedi dove il buio è già d'accordo. Il buio non vi sente, o finge di no, che è lo stesso. Uscite, e la luce vi fa male in un modo felice.",
        "Un rumore — una pietra, un respiro, un «ops» — e il buio punisce {actor} con un cuore. Poi vi lascia uscire storti, per insegnarvi i modi.",
        "Siete usciti nel punto giusto, come chi ha parlato a bassa voce in una chiesa e gli è stato permesso di restare.",
        "Siete usciti storti. Il buio vi ha messi in una pagina laterale, e dovete rientrare nel racconto principale a piedi."
      ),
      opt("light", "Accendiamo un lume piccolo",
        "{actor} accende un lume piccolo, quasi una scusa. Il buio lo accetta, perché è educato, e vi fa strada. Le pareti diventano pareti, e voi diventate di nuovo persone.",
        "Troppa luce. Il buio si offende, toglie un cuore a {actor}, e vi caccia in una direzione che non avevate scelto.",
        "Il buio vi ha aiutati, e questo è un paradosso da tenere in tasca: non tutti i neri sono nemici.",
        "Il buio vi ha cacciati. Fuori c'è luce, sì, ma non quella che vi serviva per {questName}."
      )
    ),
    ch("c-market", "Il mercato",
      "A {location} il mercato è un fiume di voci. Qualcuno, a un banco storto, vende una notizia su {villain}: cara, calda, forse vera. Le notizie, qui, si pesano come il pane.",
      "Senza quella notizia, {questName} è un sentiero senza cartello. Dovete ottenerla senza comprarvi anche una trappola.",
      "{actor} si fa avanti.",
      opt("fair", "Raccontiamo una storia vera",
        "{actor} racconta una cosa vera, piccola e precisa, e il venditore si scioglie. Avete la notizia: sapete dove andare, e sapete anche perché. È un tipo di ricchezza che non si mette nel sacco.",
        "Non vi credono. {actor} ci lascia un cuore nell'umiliazione del banco, e la notizia se ne va in un'altra tasca.",
        "Sapete dove andare. Il mercato, alle spalle, continua a vendere cose meno importanti.",
        "Non sapete niente di più di prima, e il mercato vi ha ricordato che le storie false costano meno, e servono a meno."
      ),
      opt("bluff", "Facciamo finta di essere ispettori",
        "Il bluff di {actor} tiene per il tempo giusto. Avete la notizia, un cenno, e via prima che qualcuno chieda il distintivo, che non esiste.",
        "Il bluff fallisce in modo clamoroso e un po' comico. {actor} perde un cuore, e vi cacciano tra le cassette della frutta, che è una cacciata scomoda.",
        "Avete la notizia, e avete anche imparato che a volte una bugia piccola apre una verità grande. Non abusatene.",
        "Vi hanno cacciati. Restano i vicoli, e la missione che non aspetta gli ispettori finti."
      )
    ),
    ch("c-bridge-riddle", "Il guardiano",
      "A {location} un guardiano vieta il passo. Non è alto, è piantato. Ha un libro di regole e una faccia da «no» che ha fatto pratica.",
      "Dovete passare. {questName} sta di là dal suo «no», e {villain} sta imparando a usare i guardiani come mobili.",
      "{actor} prova il permesso o il lato.",
      opt("paper", "Mostriamo un permesso",
        "{actor} mostra un permesso — magari stropicciato, magari quasi vero. Il guardiano lo guarda, lo trova sufficiente, e vi fa passare con un cenno che è il massimo della poesia che può permettersi.",
        "Manca un bollo. Manca sempre un bollo. {actor} ci lascia un cuore nella burocrazia, e finite in coda, che è un inferno lento.",
        "Siete oltre. Il guardiano torna al suo libro, e voi alla vostra storia, e per un po' le due cose non si toccano.",
        "Siete in coda. La coda insegna pazienza, e la pazienza oggi è un lusso che {villain} vi ha fatturato."
      ),
      opt("side", "Passiamo di lato",
        "{actor} vi porta di lato, dove le regole sono più basse. Passate, tenendo il fiato come si tiene un bicchiere pieno.",
        "Vi beccano. {actor} perde un cuore, e il guardiano prende un'espressione da «ve l'avevo detto» che dura troppo.",
        "Siete oltre, e l'erba di lato è più alta, e va bene così.",
        "Dovete girare. Il lato non era un lato: era un altro «no», vestito da siepe."
      )
    ),
    ch("c-ice", "Il ghiaccio",
      "A {location} il suolo è scivoloso in un modo personale, come se volesse vedervi ballare. Ogni passo è una trattativa. Dall'altra parte c'è la missione, ferma, a guardarvi.",
      "Dovete attraversare senza diventare una storiella da caduta.",
      "{actor} prova il ghiaccio.",
      opt("slide", "Scivoliamo di proposito",
        "{actor} decide di scivolare di proposito, e il ghiaccio, rispettato, vi porta. Arrivate dall'altra parte con un'eleganza che non sapevate di avere, e vi viene da ridere, che sul ghiaccio è pericoloso e necessario.",
        "{actor} sbatte. Un cuore in meno, un livido che racconterete male, e il resto del tragitto da fare in ginocchio.",
        "Siete oltre. Il ghiaccio resta alle spalle, liscio e indifferente, come i veri avversari.",
        "Dovete strisciare. Non è bello, è efficace a metà, e le ginocchia protesteranno a cena."
      ),
      opt("grip", "Ci teniamo forte",
        "Vi tenete. {actor} fa da ancoraggio, e passate lenti e salvi. Il ghiaccio si annoia, e i noiosi a volte lasciano stare.",
        "{actor} molla per un attimo, e l'attimo basta. Un cuore se ne va in una capriola poco nobile.",
        "Siete oltre, lenti, interi, con le mani che ancora si cercano.",
        "Siete caduti, e rialzarvi sul ghiaccio è una filosofia. La missione aspetta, senza offrire sale."
      )
    ),
    ch("c-song", "Il canto",
      "A {location} il posto si apre solo se cantate. Non è scritto, si capisce: le pareti hanno orecchie, e le orecchie hanno nostalgia.",
      "Dovete cantare. Male va bene, falso è un rischio, e {villain} odia le canzoni perché non si possono chiudere a chiave.",
      "Tocca a {actor} intonare, o a tutti.",
      opt("solo", "Canta chi ha il turno",
        "{actor} canta, anche se la voce trema. Il posto si apre come una bocca contenta. Passate, e la canzone resta un po' sui muri, a fare da lume.",
        "Fischi. Non i vostri: quelli del posto. {actor} ci lascia un cuore, e la porta resta chiusa, critica, ingiusta come certi pubblici.",
        "La strada è aperta, e avete una canzone che adesso è vostra, anche se è nata da un obbligo.",
        "Dovete girare, in silenzio, che è il contrario di ciò che il posto voleva, e per questo vi costa di più."
      ),
      opt("choir", "Cantiamo tutti",
        "Cantate tutti, stonati e insieme, che è una forma alta di coraggio. Il posto si apre, commosso, e vi fa strada come si fa strada a una festa.",
        "Troppo caos. Il posto si copre le orecchie, toglie un cuore a {actor}, e vi spinge via con un gesto da usciere.",
        "Siete passati, e per un po' camminate ancora a tempo, senza accorgervene.",
        "Vi ha spinti via. Resta da trovare un passaggio che non abbia orecchio assoluto."
      )
    ),
    ch("c-trap", "Il pavimento",
      "A {location} alcune mattonelle tengono e altre no. Lo sapete perché una, laggiù, ha già tradito qualcuno: c'è un buco, e un cappello accanto, e nessun padrone del cappello.",
      "Dovete attraversare. {questName} sta di là dal pavimento nervoso, e {villain} ha sempre amato i giochi in cui si cade.",
      "{actor} mette un piede.",
      opt("test", "Proviamo ogni passo",
        "{actor} prova ogni passo come si prova un dente che fa male. Il pavimento, rispettato, vi lascia stare. Passate, e alle spalle le mattonelle si riaddormentano.",
        "Una mattonella cede sotto {actor}. Un cuore in meno, una polvere in più, e il bordo come unica via rimasta, stretta e umiliante.",
        "Siete oltre. Il pavimento non vi deve niente, e voi a lui nemmeno: è il miglior accordo.",
        "Dovete fare il bordo, con la spalla al muro e gli occhi bassi, come i visitatori che hanno capito tardi le regole."
      ),
      opt("dash", "Corriamo dritti",
        "{actor} corre dritto, e il pavimento, sorpreso, non fa in tempo a decidere chi tradire. Siete oltre, veloci, con un'allegria da ladri buoni.",
        "{actor} cade nel punto in cui la fretta e la fortuna non si sono messe d'accordo. Un cuore se ne va, e diventate lenti e doloranti, che è il contrario del piano.",
        "Siete oltre, veloci, e la velocità vi resta nelle gambe come un dono a tempo.",
        "Siete lenti e doloranti. La missione non corre per voi: dovete voi, adesso, imparare di nuovo il passo."
      )
    ),
    ch("c-animal", "La bestia",
      "A {location} una bestia blocca la strada. Non è cattiva: è arrabbiata, che è diverso e si vede dagli occhi. Ha una fame o un'offesa, e voi siete nel mezzo, con {questName} dall'altra parte del suo respiro.",
      "Dovete farvi accettare. Chi combatte qui sbaglia capitolo.",
      "{actor} prova il cibo o l'inchino.",
      opt("food", "Offriamo da mangiare",
        "{actor} offre da mangiare, e la bestia capisce il gesto prima del sapore. Vi fa passare, e per un tratto vi scorta, pesante e solenne, come una guardia che ha scelto voi.",
        "Non era cibo, per lei. Era un'offesa avvolta in un tovagliolo. {actor} ci lascia un cuore, e la bestia vi volta la schiena, che è un modo gentile di cacciare.",
        "La bestia vi scorta. I passi suoi coprono i vostri, e {villain} — se ascolta — sentirà un rumore più grosso del vostro coraggio.",
        "Siete da soli. La bestia se n'è andata, e la strada è aperta in un modo che sa di occasione persa."
      ),
      opt("bow", "Facciamo un inchino",
        "{actor} fa un inchino vero, non da teatro. La bestia vi rispetta, si sposta, e passate sentendo il calore del suo fianco come una stufa. Certe diplomazie non hanno ambasciate: hanno ginocchia.",
        "L'inchino è troppo corto, o troppo ironico. La bestia non ride. {actor} perde un cuore, e la bestia se ne va, lasciandovi la strada e un senso di sgarbo.",
        "Passate, e avete imparato che anche le bestie tengono al cerimoniale, specie quelle che potrebbero mangiarvi e non lo fanno.",
        "La bestia se ne va. La via è libera, il rispetto no, e il rispetto a volte serviva più della via."
      )
    ),
    ch("c-repair", "L'aggeggio",
      "A {location} c'è un aggeggio rotto che dovrebbe aiutarvi: un carretto, un argano, una cosa con le ruote e le pretese. Sta lì, offeso, e senza di lui il tratto successivo è una fatica da giganti.",
      "Dovete ripararlo. {villain} lascia spesso le cose rotte proprio dove servirebbero intere.",
      "{actor} si china sull'ingranaggio.",
      opt("manual", "Seguiamo le istruzioni",
        "{actor} trova delle istruzioni scritte storto e le segue dritto. L'aggeggio parte con un colpetto di tosse, e vi porta avanti. Per un pezzo siete passeggeri, e i passeggeri, in una missione, sono una festa.",
        "Scossa. {actor} ritira la mano con un cuore in meno, e l'aggeggio resta morto. Andate a piedi, che è onesto e lungo.",
        "Arrivate portati, e l'aggeggio — riconoscente — vi lascia a un bivio più favorevole di quello di prima.",
        "Andate a piedi. Le scarpe protestano, la missione no: le missioni hanno il vizio di accettare anche il passo lento."
      ),
      opt("kick", "Diamo un colpo",
        "{actor} dà un colpo nel punto che i manuali non osano disegnare. Parte. Vi porta avanti di slancio, e voi vi tenete, ridendo di un riso un po' vergognoso.",
        "Punto sbagliato. {actor} ci lascia un cuore, e l'aggeggio è più morto di prima, se possibile.",
        "Arrivate di slancio, un po' scossi, un po' più avanti nel racconto di quanto meritereste con la sola pazienza.",
        "L'aggeggio è morto. Resta il cammino, e un livido che servirà da istruzione per la prossima volta."
      )
    ),
    ch("c-memory", "I ricordi",
      "A {location} il posto mostra ricordi: i vostri, e altri, e alcuni che sono bugie di {villain} cucite con filo bravo. Le pareti fanno il verso alle vostre case, e per un attimo vorreste restare.",
      "Dovete trovare quello vero. Il vero ha un peso diverso, e le gambe lo sentono prima della testa.",
      "{actor} sceglie se guardare o chiudere gli occhi.",
      opt("focus", "Cerchiamo quello vero",
        "{actor} cerca, e trova una cosa vera: un dettaglio piccolo, un odore giusto, un nome detto come si dice a tavola. Sapete dove andare, e i falsi ricordi restano appesi come quadri storti.",
        "Ingoiate una bugia bella. {actor} ci lascia un cuore, perché le bugie belle costano, e uscite con una pista falsa che sembra d'oro.",
        "Sapete dove andare. È una chiarezza sottile, e la portate come si porta una lanterna in un corridoio di specchi.",
        "Avete una pista falsa. Vi ci vorrà un pezzo per capirlo, e {villain} conta su quel pezzo."
      ),
      opt("close", "Usciamo a occhi chiusi",
        "{actor} chiude gli occhi e vi tira fuori. Non vi fate fregare, perché non guardate. È una strategia da ciechi saggi, e a volte funziona.",
        "{actor} inciampa, da cieco. Un cuore in meno, e uscite storti, che è il prezzo di non voler vedere.",
        "Siete sulla strada vera, con gli occhi di nuovo aperti, e il posto dei ricordi che non merita una seconda visita.",
        "Uscite storti. Il mondo, quando lo si attraversa chiusi, a volte ruota di un quarto, e tocca raddrizzarlo a passi."
      )
    ),
    ch("c-crowd", "La folla",
      "A {location} una folla crede che siate amici di {villain}. Non è cattiva: è convinta, che è peggio. Vi guarda con gli occhi di chi ha già deciso il capitolo.",
      "Dovete farvi ascoltare, o andarne via prima che la convinzione diventi sassi. {questName} non si fa in mezzo a un processo.",
      "{actor} alza la voce o i piedi.",
      opt("speech", "Parliamo chiaro",
        "{actor} parla chiaro, senza ornamenti. La folla, che era pronta al rumore, si trova la verità in faccia e si sposta. Qualcuno indica la strada. Qualcun altro si vergogna, che è già un inizio.",
        "La folla non ascolta. {actor} ci lascia un cuore nella gola, e le parole cadono tra i piedi come monete false.",
        "Sapete la strada, e avete anche una folla che adesso dubita di {villain}: è un seme, e i semi pesano poco e cambiano i campi.",
        "Dovete scappare. Le strade laterali vi prendono, e la missione si fa più stretta, più vostra, più senza pubblico."
      ),
      opt("exit", "Ce ne andiamo",
        "Ve ne andate prima che la cosa cresca. {actor} trova il varco, e uscite senza problemi, che a volte è la frase più coraggiosa del capitolo.",
        "{actor} inciampa sulla riga di uscita. Un cuore in meno, e qualcuno vi ha visti abbastanza da racconto.",
        "Nessuno vi ferma. Il silenzio alle spalle è un regalo, e non vi voltate a controllare se è vero.",
        "Qualcuno vi ha visti. La folla avrà una versione, e le versioni camminano più veloci di voi."
      )
    ),
    ch("c-water", "L'acqua",
      "A {location} c'è da attraversare l'acqua. Non è larga, è decisa: tira, luccica, e tiene sotto cose che non volete nominare mentre nuotate.",
      "Dall'altra riva, {questName} fa cenno. {villain} odia chi sa nuotare, perché l'acqua non firma i suoi patti.",
      "{actor} sceglie la zattera o le braccia.",
      opt("float", "Facciamo una zattera",
        "{actor} fa una zattera di ciò che c'è: legno, corda, ostinazione. Galleggia. Sbarcate con i pantaloni bagnati e l'orgoglio asciutto, che è il contrario di molte imprese.",
        "La zattera affonda a metà. {actor} ci lascia un cuore nell'acqua fredda, e dovete girare sulla sponda, lunghi e gocciolanti.",
        "Siete sulla riva giusta. L'acqua, alle spalle, continua la sua vita senza di voi, e va bene così.",
        "Dovete girare sulla sponda. L'acqua ha vinto questo round, e voi avete ancora le gambe, che è la rivincita dei terrestri."
      ),
      opt("swim", "Nuotiamo",
        "Nuotate. {actor} taglia l'acqua come si taglia una pagina. Arrivate sull'altra riva con il fiato corto e gli occhi pieni di luce, e per un attimo siete soltanto questo: arrivati.",
        "La corrente tira {actor} e un cuore. Uscite a valle, che è una parola piccola per «non dovevolevate».",
        "Siete sulla riva giusta, e l'acqua vi ha lasciato addosso un freddo che è quasi un medaglia.",
        "Siete a valle. Dovrete risalire la riva, e {villain} — se guarda il fiume — saprà dove il racconto vi ha spostati."
      )
    ),
    ch("c-time", "I minuti",
      "A {location} i minuti scappano verso {villain}, visibili, come lucciole in ritardo. Se ne va uno, se ne va un pezzo di oggi. Se ne vanno troppi, {questName} diventa ieri.",
      "Dovete fermarne uno. Non tutti: uno. Basta uno, tenuto bene, per arrivare in orario.",
      "{actor} tende le mani.",
      opt("catch", "Lo acchiappiamo",
        "{actor} acchiappa un minuto: trema, morde, poi sta. Lo mettete in tasca, e avete tempo. È una frase da ricchi, e per un poco lo siete.",
        "Il minuto morde {actor} e se ne va. Un cuore in meno, e siete in ritardo in un modo che si sente nelle ossa.",
        "Avete tempo. Camminate senza correre, e non correre, a volte, è il vero incantesimo.",
        "Siete in ritardo. Le porte che volevate aperte stanno imparando a chiudersi, e dovete bussare più forte."
      ),
      opt("wait", "Aspettiamo fermi",
        "Restate fermi. I minuti, vanitosi, si annoiano e se ne vanno da soli, lasciandovene uno per dispetto. Siete in orario, e non avete inseguito nessuno: è una vittoria da saggi pigri.",
        "{actor} si annoia per primo, e l'annoia costa un cuore. I minuti ridono — se i minuti ridono — e siete in ritardo comunque.",
        "Siete in orario. Il mondo, per una volta, ha aspettato voi, e si sta bene in questo cappotto.",
        "Siete in ritardo. La fermezza non è sempre saggezza: a volte è soltanto stare a guardare mentre la storia parte."
      )
    ),
    ch("c-maze", "Il labirinto",
      "A {location} il labirinto comincia senza cartello, che è il suo modo di presentarsi. I muri sono stretti, gli echi mentono, e ogni svolta giura di essere l'ultima.",
      "Dovete uscire sulla strada di {questName}, non su quella di {villain}. Le due, qui, si sfiorano come cugine antipatiche.",
      "{actor} sceglie una regola e se la tiene.",
      opt("left", "Sempre a sinistra",
        "Sempre a sinistra, dice {actor}, e la regola tiene. Il labirinto, che odia le regole, alla fine si stanca e vi sputa sulla strada giusta. Uscite, e il cielo vi sembra una cosa nuova.",
        "Vi perdete comunque. {actor} ci lascia un cuore in un vicolo identico agli altri, e uscite storti, in un punto del racconto che non era questo.",
        "Siete sulla strada giusta. Il labirinto resta dietro, a fare i capricci con qualcun altro.",
        "Siete usciti storti. Dovrete raddrizzare la mappa con i piedi, che è il mestiere più vecchio."
      ),
      opt("mark", "Lasciamo dei segni",
        "{actor} lascia segni: un filo, un graffio, una briciola. I segni restano, miracolo, e uscite seguendo voi stessi. È una forma alta di compagnia.",
        "I segni spariscono, leccati dal labirinto. {actor} perde un cuore, e vi siete persi in un modo che fa più rabbia, perché avevate fatto le cose per bene.",
        "Non vi perdete. I segni, piccoli, hanno vinto un mostro fatto di corridoi, e questo va raccontato.",
        "Vi siete persi. Il labirinto ha mangiato i vostri segnali, e adesso dovete fidarvi di un istinto che è stanco."
      )
    ),
    ch("c-gift", "Il dono",
      "A {location} c'è un dono in bella vista. Sembra {treasure}. Forse è {treasure}. Forse è una trappola di {villain} con la carta da regalo. L'aria intorno è troppo contenta.",
      "Dovete decidere. I doni, nelle storie, sono esami vestiti da festa.",
      "{actor} allunga o ritira la mano.",
      opt("take", "Lo prendiamo con calma",
        "{actor} lo prende con calma, e la trappola — quasi — si accorge di essere stata capita e si ritira. Ora è vostro, sul serio: {treasure}, senza il sorriso falso. Lo mettete via come si mette via il pane.",
        "È una trappola. {actor} ci lascia un cuore nel fiocco, e il dono ride con una voce che assomiglia a {villain}.",
        "Avete l'oggetto. Non è poco, in una storia in cui le cose spariscono per mestiere.",
        "Non avete l'oggetto. Avete una lezione, e le lezioni non si mettono nello zaino con la stessa gioia."
      ),
      opt("leave", "Lo lasciamo",
        "Lo lasciate. Il dono, per dispetto, indica la strada con un angolo di carta. {actor} ha detto di no, e il no, a volte, è una chiave.",
        "Il dono vi insegue. {actor} perde un cuore nella corsa, e la strada si riempie di fiocchi, che è un incubo elegante.",
        "Sapete la strada. Il dono resta lì, a fare il bello, e voi non vi voltate: i voltarsi, con i doni, sono pericolosi.",
        "Non sapete la strada. Avete soltanto un no in tasca, e un no non è una mappa, anche quando è giusto."
      )
    ),
    ch("c-night", "La ronda",
      "A {location}, {villain} sta facendo il giro. Lo sentite prima di vederlo: un passo che conta, un ciuffo d'aria che si sposta. {npc}, per fortuna, russa da qualche parte con un rumore utile.",
      "Dovete passare senza farvi vedere. La missione, di notte, è più sottile, e i cuori più visibili.",
      "{actor} sceglie il passo o il trucco.",
      opt("creep", "Camminiamo quando russa {npc}",
        "Camminate sui russi di {npc}, che è una musica ridicola e santa. {actor} prende il tempo, e {villain} non alza la testa. Passate. Nessuno, di là, saprà che il russo vi ha salvati.",
        "{npc} smette di russare nel momento sbagliato. {actor} ci lascia un cuore nel silenzio, e {villain} ha quasi, quasi, una faccia da ricordare.",
        "Nessuno vi ha visti. La notte, per una volta, è vostra alleata, e le alleate di notte vanno ringraziate piano.",
        "{villain} vi ha visti, o ha visto abbastanza da sospetto. Dovrete fare gli ombra, e le ombra arrivano più tardi."
      ),
      opt("decoy", "Facciamo un rumore dall'altra parte",
        "{actor} fa un rumore dall'altra parte: un sasso, un miagolio, una bugia di suono. {villain} va là. Voi passate di qua. È un balletto, e per una volta siete i più veloci.",
        "{villain} viene da voi, perché i cattivi imparano. {actor} perde un cuore nella sorpresa, e la fuga ha il sapore del piano al contrario.",
        "{villain} è lontano, occupato da un rumore che non siete più. La strada, adesso, è una striscia di fortuna.",
        "{villain} è vicino. Dovete accorciare i passi e allungare la pazienza, che è una coperta stretta."
      )
    ),
    ch("c-storm2", "Il tetto",
      "A {location} il tetto sta volando via, pezzo a pezzo, come un libro a cui strappano le pagine. Sotto c'è {npc}, che guarda in su con una fiducia che vi fa male.",
      "Dovete fare qualcosa. {villain} manda venti così, a volte, soltanto per vedere chi tiene e chi scappa.",
      "{actor} tiene o tira.",
      opt("hold", "Teniamo il tetto",
        "{actor} tiene il tetto, e gli altri tengono {actor}. Il tetto resta, {npc} è salvo, e per un attimo siete una sola cosa fatta di braccia e di «ce la facciamo». Poi piove, normale, e va benissimo.",
        "Il tetto vince. {actor} ci lascia un cuore tra le tegole, e {npc} resta indietro, coperto alla meno peggio, con un saluto che non volete.",
        "{npc} è con voi, e il tetto — quel che ne resta — tiene. Avete salvato una persona e un pezzo di cielo, che non è poco.",
        "{npc} resta indietro. Voi andate, più magri, con il vento che vi ricorda il rumore delle tegole."
      ),
      opt("run", "Tiriamo fuori {npc}",
        "{actor} tira fuori {npc} un attimo prima che il tetto finisca di partire. Siete salvi, tutti, in un cortile che puzza di pioggia e di «ce l'abbiamo fatta».",
        "{actor} inciampa sulla soglia. Un cuore in meno, {npc} fuori lo stesso, e la via dritta è chiusa da un tetto che adesso è un muro sdraiato.",
        "Siete tutti fuori. È una frase da mettere in cornice, e non avete una cornice: la tenete a mente.",
        "La via dritta è chiusa. Resta il giro, e {npc} con voi, che è comunque una vittoria storto."
      )
    ),
    ch("c-riddle2", "Tre porte",
      "A {location} ci sono tre porte. Una è giusta. Una no. Una va da {villain} troppo presto, e «troppo presto» in una storia è una forma di sconfitta. Non hanno scritte. Hanno umori.",
      "Dovete scegliere. {questName} sta dietro una sola, e le altre due sono capitoli che non volete.",
      "{actor} ascolta o fiuta.",
      opt("listen", "Ascoltiamo dietro le porte",
        "{actor} ascolta. Dietro una porta c'è un silenzio onesto; dietro le altre, troppa fretta o troppa musica. Scegliete quella giusta, e il mondo, per una volta, premia l'orecchio.",
        "Scegliete quella sbagliata. {actor} ci lascia un cuore nella stanza che non c'entrava, e vi ritrovate troppo vicini a {villain}, in un corridoio che sa di arrivo in anticipo.",
        "Siete sulla via giusta. Le altre porte restano chiuse, e lasciarle chiuse è già un mestiere.",
        "Siete troppo vicini a {villain}. Dovete indietreggiare con eleganza, che è difficile quando il cuore batte i tamburi."
      ),
      opt("smell", "Seguiamo l'odore buono",
        "{actor} segue l'odore buono: pane, legno, cosa vera. La porta giusta si apre su quella. Entrati, vi accorgete di aver avuto ragione, e per un poco non dite niente per non spaventare la fortuna.",
        "L'odore mente, profumato da {villain}. {actor} perde un cuore, e la via è quella sbagliata, bella come una trappola da vetrina.",
        "Siete sulla via giusta, e l'odore buono vi accompagna ancora un pezzo, come una guida che non chiede paga.",
        "Siete sulla via sbagliata. Dovrete virare, e i viraggi, a tre porte, costano sempre un po' di orgoglio."
      )
    ),
    ch("c-duel", "La sfida",
      "A {location} un servo di {villain} vi sfida. Non è una battaglia da libri di storia: è una sfida da cortile, seria, con regole che lui conosce meglio. Se vincete, se ne va. Se perdete, chiama gli amici.",
      "Dovete rispondere. Fuggire adesso vorrebbe dire dargli ragione, e lui si allarga.",
      "{actor} accetta il terreno.",
      opt("stare", "Gara di sguardi",
        "{actor} non batte palpebra. Il servo sì, alla fine, e se ne va con una scusa da vento. Via libera. Gli sguardi, a volte, pesano più dei pugni, e fanno meno rumore.",
        "{actor} batte le palpebre un attimo prima. Un cuore in meno, e arrivano gli amici del servo, che è un plurale scomodo.",
        "Via libera. Il servo è un puntino, e voi avete ancora gli occhi, che è tutto ciò che serviva.",
        "Arrivano gli amici del servo. Dovete slittare di lato, fuori dal duello, dentro una fuga che non avevate messo in agenda."
      ),
      opt("game", "Gara di equilibrio",
        "{actor} sta in equilibrio più a lungo. Vince. Il servo se ne va, offeso e rispettoso, che è una coppia rara. La strada si riapre come una schiena che smette di fare il gobbo.",
        "{actor} cade. Un cuore se ne va, e il servo chiama aiuto con una voce troppo contenta.",
        "Via libera. L'equilibrio, una volta trovato, vi resta un poco nelle ginocchia, e camminate dritti.",
        "Il servo chiama aiuto. I passi dietro di voi si moltiplicano, e la missione diventa una corsa, che è un altro libro."
      )
    ),
    ch("c-map", "La mappa",
      "A {location} trovate una mappa. Forse è vera. Forse è un disegno di {villain} per farvi arrivare dove fa comodo a lui. La carta è bella, e le carte belle sono sospette.",
      "Dovete decidere se fidarvi o rifarla voi, con mano brutta e cuore onesto.",
      "{actor} piega la carta, o ne tira fuori una nuova.",
      opt("trust", "La seguiamo",
        "La seguite, e {actor} ha ragione a metà: è abbastanza vera. Vi porta. Non è la verità intera, è una verità che basta, e le verità che bastano sono oro vecchio.",
        "È una trappola. {actor} ci lascia un cuore in un vicolo disegnato apposta, e vi ritrovate sulla via di {villain}, che è una coincidenza troppo precisa.",
        "Siete sulla via giusta, con una mappa che adesso, a modo suo, è anche vostra.",
        "Siete sulla via di {villain}. Dovete tagliare di lato, e le mappe false, una volta smascherate, pesano come pietre in tasca."
      ),
      opt("redraw", "La rifacciamo noi",
        "{actor} la rifà: brutta, sbagliata di inchiostro, giusta di direzione. La vostra mappa è un animale domestico. Vi ci fidate, e arriva.",
        "Vi perdete tra i vostri stessi segni. {actor} perde un cuore, e la bellezza della mappa vecchia vi torna in mente, traditrice.",
        "Avete una mappa vostra. Non la vendereste per niente, e questo è il segno che è quella giusta.",
        "Siete persi, ma persi con una carta fatta da voi, che è un perdere più onorevole e ugualmente scomodo."
      )
    ),
    ch("c-comfort", "La paura",
      "A {location}, {npc} ha troppa paura. Trema in un modo che fa rumore, e se urla {villain} sente, e se {villain} sente questa pagina finisce male per tutti. La paura, qui, è un allarme con le gambe.",
      "Dovete calmarlo. Non con l'ordine: con qualcosa che somigli a casa.",
      "{actor} parla o scherza.",
      opt("talk", "Parliamo piano",
        "{actor} parla piano, e le parole stanno tutte in un bicchiere. {npc} si calma, respira, e torna a essere qualcuno che può camminare. Il pericolo, intorno, resta; dentro, no.",
        "Le parole escono storte. {actor} ci lascia un cuore, {npc} urla, e lontano — sì — {villain} ha sentito. Adesso dovete fare i veloci.",
        "{npc} è con voi, più saldo. La voce di {actor} gli è rimasta addosso come un cappotto, e va bene.",
        "{villain} ha sentito. I passi, da qualche parte, hanno cambiato direzione, e la vostra anche, per forza."
      ),
      opt("joke", "Facciamo una battuta",
        "{actor} fa una battuta giusta, piccola, non crudele. {npc} ride, e la paura — che odia essere ridicola — se ne va un pezzo. Nessun allarme. Solo un riso, che è un tipo di scudo.",
        "La battuta è sbagliata, o è il momento. {actor} perde un cuore, e {npc} piange più forte, che è un volume pericoloso.",
        "Nessun allarme. Camminate, e la battuta vi segue un poco, utile come il pane.",
        "{npc} piange più forte. Dovete coprire il suono con i vostri corpi e i vostri passi, e sperare che {villain} abbia le orecchie occupate."
      )
    ),
    ch("c-climb2", "Il vuoto",
      "A {location} c'è un vuoto. Non largo, abbastanza. Dovete passarci, e l'unico modo onesto è farvi una catena di mani, o tentare un lancio che i grandi sconsiglierebbero.",
      "Sotto, il niente. Di là, {questName}. Accanto, {actor} che già valuta i pesi.",
      "Vi tenete, o lanciate.",
      opt("chain", "Ci teniamo per mano",
        "Vi tenete per mano, e la catena tiene. {actor} è l'anello che trema e non cede. Passate, e dall'altra parte nessuno molla subito, perché molla subito sarebbe un peccato.",
        "Un anello cede. {actor} ci lascia un cuore nel vuoto che non l'ha preso del tutto, e dovete girare sotto, lunghi, umili, interi per un pelo.",
        "Siete oltre. Le mani, adesso, si ricordano. È una memoria migliore di molte mappe.",
        "Dovete girare sotto. Il vuoto ha vinto la via alta, e la via bassa è un racconto più lento."
      ),
      opt("throw", "Lanciamo chi è più leggero",
        "Il lancio riesce. {actor} calcola, qualcuno vola un attimo, e siete oltre, in fretta, con un'allegria da acrobati che non ripeteranno lo spettacolo.",
        "Il lancio va male. {actor} perde un cuore, c'è un urlo troppo vero, e avete fatto rumore abbastanza da copertina.",
        "Siete oltre, in fretta. Il vuoto resta lì, sconfitto da una cosa che i manuali non scrivono.",
        "Avete fatto rumore. {villain} non ha bisogno di vedere: gli basta sentire che qualcuno ha tentato il vuoto e non è stato silenzioso."
      )
    ),
    ch("c-shop", "Il permesso",
      "A {location} serve un permesso per passare. C'è uno sportello, c'è una faccia, c'è una penna che non vuole scrivere «sì». Il mondo, a volte, si difende con la carta.",
      "Dovete ottenerlo. {questName} non è in lista, e {villain} ama le liste perché escludono.",
      "{actor} chiede, o fa chiedere.",
      opt("polite", "Chiediamo per favore",
        "{actor} chiede per favore, e il per favore — detto bene — è una leva. Avete il permesso. Le porte si aprono con quel cigolio da cosa legale, che è un cigolio bello.",
        "Troppa cortesia, o troppo poco bollo. {actor} ci lascia un cuore nello sportello, e niente permesso: soltanto un sorriso stampato.",
        "Le porte si aprono. Siete in regola, e essere in regola, in una storia di magie, è quasi sovversivo.",
        "Le porte restano chiuse. Resta da essere degli intrusi, che è un mestiere con le sue regole, più scomode."
      ),
      opt("cousin", "Chiediamo a {npc} di presentarsi",
        "{npc} si presenta, e la sua faccia vale un timbro. Avete il permesso. {actor} ha capito che a volte non si entra da soli, si entra introdotti.",
        "{npc} non basta. {actor} perde un cuore nell'imbarazzo dello sportello, e siete, di colpo, degli intrusi con un amico inutile in questo preciso minuto.",
        "Siete in regola. {npc} cammina più fiero, e voi più dentro il mondo di quanto foste un'ora fa.",
        "Siete degli intrusi. Il permesso manca, la strada no: soltanto, adesso, dovete farla di sguincio."
      )
    ),
    ch("c-echo", "Gli echi",
      "A {location} gli echi dicono cose sbagliate. «A destra» quando è sinistra, «è sicuro» quando non lo è, «ci siamo» quando manca un pezzo. È un coro di bugie educato.",
      "Dovete capire la strada. Gli occhi e le orecchie, qui, sono due testimoni che non si parlano.",
      "{actor} sceglie il senso.",
      opt("eyes", "Ci fidiamo degli occhi",
        "{actor} si fida degli occhi, e gli occhi, per una volta, non hanno letto i giornali degli echi. Uscite sulla via giusta. Dietro, gli echi restano a litigare tra loro.",
        "{actor} inciampa, perché anche gli occhi, al buio relativo, sbagliano. Un cuore in meno, e siete storti, in un corridoio che gli echi avevano previsto, i maledetti.",
        "Siete sulla via giusta. Avete imparato a non rispondere agli echi, che è una regola buona anche a casa.",
        "Siete storti. Dovrete raddrizzarvi senza ascoltare, il che è un esercizio, e gli esercizi stancano."
      ),
      opt("ears", "Ascoltiamo l'eco meno bugiardo",
        "{actor} trova l'eco meno bugiardo: ha una crepa nella voce, una stanchezza. Quell'eco vi guida, e uscite. Non tutti i bugiardi mentono sempre: alcuni, stanchi, dicono una cosa vera per sbaglio.",
        "Era l'eco più bugiardo, travestito da stanco. {actor} perde un cuore, e siete sulla via di {villain}, che ama i travestimenti vocali.",
        "Siete sulla via giusta, e avete un debito strano con un'eco, che non potrete mai saldare, e va bene.",
        "Siete sulla via di {villain}. Gli echi, alle spalle, ridono in ritardo, che è il loro modo."
      )
    ),
    ch("c-finalish", "L'allarme",
      "A {location} parte un allarme. Non è un suono: è una cosa che si alza in gola al mondo. {villain} potrebbe sentire, e se sente questa è l'ultima pagina tranquilla.",
      "Dovete spegnerlo. Romperlo o parlarci: gli allarmi, qui, a volte hanno orecchie.",
      "{actor} alza la mano o la voce.",
      opt("smash", "Lo rompiamo",
        "{actor} lo rompe. Silenzio. Un silenzio così largo che ci potreste distendere una tovaglia. {villain} non ha sentito, o ha sentito un tuono lontano, e i tuoni lontani non si inseguono.",
        "L'allarme colpisce. {actor} ci lascia un cuore, poi urla di più, offeso, e {villain} — questa volta — ha sentito. Dovete sparire in fretta, che è un mestiere diverso.",
        "Nessun allarme, adesso. Siete ancora nascosti, e il nascondersi, dopo un rumore, è più dolce.",
        "{villain} ha sentito. I minuti successivi sono una corsa scritta in corsivo, e voi siete l'inchiostro."
      ),
      opt("whisper", "Gli chiediamo di smettere",
        "{actor} gli chiede di smettere, piano, come si chiede a un bambino che piange di notte. L'allarme si spegne, sorpreso di essere stato trattato da qualcuno. Siete ancora nascosti, e questo è un incantesimo fatto di educazione.",
        "Non ascolta. {actor} perde un cuore nel fracasso, e {villain} arriva, o sta per, che è quasi lo stesso in una frase.",
        "Siete ancora nascosti. L'allarme dorme, e voi camminate in punta, per non svegliarlo, per non svegliare il resto.",
        "{villain} arriva. Dovete aprire il capitolo della fuga, anche se volevate quello della missione."
      )
    ),
    ch("c-feast", "La tavola",
      "A {location} c'è da mangiare, e odora in un modo che vi fa venire fame anche se avete già mangiato. Forse è di {villain}. Forse è di qualcuno buono. I pasti, nelle storie, sono sempre un bivio.",
      "Dovete decidere se mangiare. La missione ha bisogno di gambe; le gambe, a volte, hanno bisogno di non fidarsi.",
      "{actor} assaggia o salta.",
      opt("taste", "Un assaggio piccolo",
        "{actor} fa un assaggio piccolo. Era buono, era vero, e avete energia. I sapori giusti si riconoscono: non chiedono un secondo piatto con l'inganno, si offrono e basta.",
        "Era una trappola. {actor} ci lascia un cuore nello stomaco, e siete pesanti, lenti, adatti a essere presi. Dovete aspettare che passi, come un temporale interno.",
        "Siete in forma. La tavola resta alle spalle, onesta, e voi le fate un cenno che è quasi un grazie.",
        "Siete pesanti. Ogni passo è un mobile, e {questName} sembra più lontana di un pranzo fa."
      ),
      opt("skip", "Non mangiamo",
        "Non mangiate. {actor} ha detto di no, e siete lucidi. Andate. La fame è un cane al guinzaglio, non un padrone, e per oggi basta.",
        "Avete troppa fame, e la fame fa sbagliare {actor}. Un cuore in meno, e siete deboli, che è un modo da tavola per perdere comunque.",
        "Siete lucidi. Il mondo è tagliente e chiaro, e le trappole, da lucidi, si vedono un po' prima.",
        "Siete deboli. Dovrete fare a pezzi la strada, e i pezzi, quando si è deboli, pesano doppio."
      )
    ),
    ch("c-keyhunt", "La chiave",
      "A {location} serve una chiave. Ce ne sono di false, lucide, convinte di sé. Quella vera è probabilmente la più opaca, come le persone. {villain} le ha mescolate apposta, perché gli piace vedervi scegliere male.",
      "Dovete trovare quella vera. Senza, la porta della missione resta un muro educato.",
      "{actor} cerca o azzarda.",
      opt("grid", "Cerchiamo con calma",
        "{actor} cerca con calma, a griglia, come si cerca una cosa caduta. Trovate quella vera: ha un peso diverso, un freddo diverso. Gira. Avete la chiave, e avete anche la prova che la calma è un attrezzo.",
        "Trovate quella falsa, che era più bella. {actor} ci lascia un cuore nella serratura che ride, e non avete la chiave: avete un pezzo di teatro.",
        "Avete la chiave. Le false restano lì, a fare le belle, e non le meritate nemmeno uno sguardo.",
        "Non avete la chiave. Resta da forzare, o da tornare, o da inventare un'altra porta, che è un mestiere da stanchi."
      ),
      opt("luck", "Mettiamo una mano a caso",
        "{actor} mette una mano a caso, e la fortuna — che a volte si annoia e aiuta — gli mette in palmo quella vera. Fortuna. Chiave vera. Un sorriso stupido e meraviglioso.",
        "Trappola. {actor} perde un cuore, e la mano a caso ha trovato proprio il dente della storia. Non avete la chiave: avete un «avevo detto io» che nessuno dice.",
        "Avete la chiave, e non sapete spiegare perché, e non serve. Le storie accettano anche questo.",
        "Non avete la chiave. Il caso, oggi, lavorava per {villain}, e il caso è un dipendente infedele."
      )
    ),
    ch("c-wind", "Il vento",
      "A {location} il vento vi spinge. L'ha mandato {villain}, e si capisce: ha una direzione, un'intenzione, un odore di «andate lì». I cappelli volano, le mappe anche, e i piani si piegano.",
      "Dovete fare qualcosa: tenervi, o usarlo. Il vento, usato, è un cavallo; subito, è un pugno.",
      "{actor} pianta i piedi o apre le braccia.",
      opt("resist", "Ci teniamo fermi",
        "Vi tenete. {actor} è un palo, gli altri sono funi. Il vento passa, stizzito, e restate qui, dove volevate. A volte non muoversi è l'avventura.",
        "Il vento vi sposta comunque. {actor} ci lascia un cuore, e finite dove vuole {villain}, che è una frase da cancellare al più presto con i piedi.",
        "Siete dove volevate. Il vento, sconfitto, va a infastidire un altro capitolo.",
        "Siete dove vuole {villain}. Dovrete tornare controvento, e controvento è una parola che stanca già a dirla."
      ),
      opt("ride", "Usiamo il vento",
        "{actor} apre le braccia, e usate il vento. Volate — quasi — nel punto giusto. È ridicolo e magnifico, e atterrate con i capelli da tempesta e la missione più vicina.",
        "Direzione sbagliata. {actor} perde un cuore nell'atterraggio, e siete nel punto sbagliato, che assomiglia al giusto abbastanza da far male.",
        "Siete nel punto giusto, portati da una cosa che doveva farvi del male. È il tipo di vittoria che si racconta a voce alta.",
        "Siete nel punto sbagliato. Il vento vi ha letti male, o voi lui, e adesso tocca la camminata di raddrizzamento."
      )
    ),
    ch("c-promise", "La promessa",
      "A {location}, {npc} vi ferma e chiede una promessa. Non è piccola: se la fate, vi aiuta; se la fate a metà, si offende in un modo che chiude le porte. Gli occhi suoi sono due luci serie.",
      "Dovete decidere. Le promesse, in missione, pesano come zaini, e {villain} colleziona quelle rotte.",
      "{actor} parla per tutti.",
      opt("yes", "Promettiamo sul serio",
        "{actor} promette sul serio, e si sente che è vero. {npc} vi aiuta: un passo, un segno, un pezzo di strada che prima non c'era. Le promesse vere spostano i muri, piano, come radici.",
        "La voce trema, e {npc} la sente tremare. {actor} ci lascia un cuore in quella crepa, e {npc} non aiuta. Resta la strada nuda, e una cosa non detta che pesa.",
        "{npc} è con voi. La promessa cammina in mezzo, invisibile, e per ora la tenete, e si sta ritti.",
        "{npc} non aiuta. Avete ancora le gambe, e una lezione sulle voci che devono stare ferme quando dicono «sì»."
      ),
      opt("later", "Diciamo: dopo",
        "{actor} dice «dopo», onesto. {npc} accetta, e vi dà un aiuto piccolo, da acconto. Non è tutto, è qualcosa, e qualcosa, a {location}, è già un ponte.",
        "{npc} si offende. Il dopo, per lui, era un no con la cravatta. {actor} perde un cuore, e niente aiuto: soltanto un silenzio che occupa la stanza.",
        "Avete un piccolo aiuto, e un dopo da onorare. Le storie tengono il conto, anche quando voi fingete di no.",
        "Niente aiuto. Il dopo è rimasto in gola, e {questName} non aspetta i vostri rinvii, anche se erano onesti."
      )
    )
  ];

  C.climax = [
    {
      id: "x-confront",
      title: "Davanti al cattivo",
      story: [
        "Il cammino finisce a {location}. Non c'è più un dopo da mettere in mezzo: c'è {villain}, in carne, in ombra, in voce, come lo avete temuto e un po' immaginato. L'aria è ferma, come prima di un temporale che ha deciso il nome.",
        "La missione — {questName} — sta tutta in questo stallo. Un passo avanti è la fine del libro; un passo indietro è un altro inverno. {treasure} e {npc} sono il coro, se ci sono ancora: ma la battuta, adesso, tocca a voi.",
        "Tocca a {actor} scegliere come chiudere. Non è una scelta piccola. È la pagina che i bambini, a letto, faranno ripetere."
      ],
      prompt: "Che cosa fate, adesso?",
      choices: [
        opt("brave", "Andiamo avanti",
          "{actor} va avanti, e voi con {actor}. Non è un urlo: è un passo. {villain} indietreggia, perché certe ostinazioni, viste da vicino, fanno paura anche a chi fa paura. La missione si chiude come una porta che finalmente trova la serratura. Ce l'avete fatta.",
          "{actor} va avanti, e il colpo arriva lo stesso. Un cuore se ne va, forse l'ultimo, e {villain} è ancora in piedi. Dovete scappare. La missione resta aperta, come una finestra d'inverno. Siete vivi, e non è niente, e è tutto.",
          "", ""
        ),
        opt("talk", "Parliamo",
          "{actor} parla, e le parole — quelle vere, non quelle da spettacolo — funzionano. {villain} si ferma, ascolta, e in quell'ascolto c'è già la sconfitta. La missione è finita. Si torna, e il mondo ha un pezzo sistemato, piccolo e enorme.",
          "Le parole non bastano. {actor} ci lascia un cuore, e {villain} non è il tipo da convincere a tavola. Dovete scappare, con la missione ancora in gola, non detta fino in fondo.",
          "", ""
        )
      ]
    },
    {
      id: "x-steal",
      title: "Il colpo",
      story: [
        "Siete a {location}, e {villain} è distratto: un rumore, una vanità, un minuto rubato a se stesso. {treasure} è lì, a portata di storia. Se lo prendete, {questName} si chiude. Se fate rumore, si apre la caccia.",
        "Il tempo è una stoffa stretta. {npc}, se c'è, trattiene il fiato per voi. I cuori, in tasca, fanno un rumore che sperate nessuno senta.",
        "Tocca a {actor} entrare nel silenzio, o romperlo di proposito."
      ],
      prompt: "Che cosa fate, adesso?",
      choices: [
        opt("sneak", "Lo prendiamo in silenzio",
          "{actor} lo prende in silenzio, e il silenzio tiene. Preso. {treasure} è vostro, la missione è finita, e {villain} continua a essere distratto un attimo di troppo, che è l'attimo in cui si perdono i regni.",
          "Un rumore. Il più piccolo, il più enorme. {actor} perde un cuore, e dovete scappare senza il colpo, o con il colpo a metà, che è quasi peggio. La missione resta aperta dietro di voi, come una porta che non avete avuto il tempo di chiudere.",
          "", ""
        ),
        opt("run", "Entriamo di slancio",
          "Entrate di slancio. {actor} è il primo, e lo slancio, a volte, è più pulito del silenzio. Preso. Missione finita. {villain} si volta tardi, e tardi, per un cattivo, è una parola che brucia.",
          "Caos. {actor} ci lascia un cuore nel fracasso, e scappate. Forse avete {treasure}, forse no: avete comunque il fiato corto e una missione che non ha detto l'ultima riga.",
          "", ""
        )
      ]
    },
    {
      id: "x-break",
      title: "Il trucco",
      story: [
        "A {location} capite, d'un tratto, dove sta il potere di {villain}: in un trucco. Un oggetto, un nodo, una bugia tenuta insieme con lo spago. Se lo spezzate, {questName} è compiuta. Se rimbalza, lui resta, e voi no.",
        "I trucchi, da vicino, sono meno magici e più offensivi. Si può avere paura lo stesso. Si deve avere coraggio lo stesso.",
        "{actor} mette le mani sul nodo, o lo gira, come si gira un coltello da tavola: con attenzione, e senza troppa cerimonia."
      ],
      prompt: "Che cosa fate, adesso?",
      choices: [
        opt("break", "Lo rompiamo",
          "{actor} lo rompe. Si spezza con un suono da cosa vera che finisce. {villain} resta senza palco. Missione finita. Per un poco non succede niente, e quel niente è la pace.",
          "Non si spezza. Rimanda il colpo. {actor} perde un cuore, e dovete scappare mentre il trucco, intatto, continua a fare il suo mestiere. La missione resta aperta, ostinata, vostra ancora un altro giorno.",
          "", ""
        ),
        opt("turn", "Lo giriamo contro di lui",
          "{actor} lo gira contro di lui. Funziona, con quella giustizia da fiaba che i bambini aspettano e i grandi fanno finta di non aspettare. Missione finita. {villain} impara, tardi, che i trucchi hanno due manici.",
          "Rimbalza. {actor} ci lascia un cuore, e il trucco torna al padrone come un cane. Scappate. Siete vivi, la missione no, non ancora, e questo è un tipo di fine che sa di «continua».",
          "", ""
        )
      ]
    }
  ];

  C.openings = [
    [
      "Questa è una storia da leggere ad alta voce, senza fretta, come si legge quando fuori è buio e dentro c'è ancora un po' di luce.",
      "{worldLine}",
      "Ecco perché siete qui. {questLine}",
      "A sbarrarvi la strada c'è {villain}. {villainLine}",
      "Non siete soli. {npcLine}",
      "Ognuno di voi ha tre cuori. Se arrivano a zero, quel bambino esce da questa storia — si rivede a cena, tranquilli, con un bicchiere d'acqua e magari una fetta di qualcosa. Nella fiaba si può cadere; a tavola si torna.",
      "Quando non sapete come andrà a finire, si gira la bussola. Verde: l'azione riesce, e il racconto prende la strada più chiara. Giallo: si gira ancora, stesso turno, stesso coraggio. Rosso: si perde un cuore, e la storia continua lo stesso, più in salita, più vera.",
      "Si legge. Si sceglie. Si gira. Poi si volta pagina."
    ]
  ];

  C.winEndings = [
    [
      "Ce l'avete fatta.",
      "{villain} non occupa più il centro del mondo. Resta, forse, in un angolo, a fare il conto di ciò che non ha funzionato; ma la missione — {questName} — è compiuta, e le cose compiute hanno un odore di pane.",
      "Vi guardate. Siete stanchi, un po' ridicoli, interi. {npc} c'è o c'era, {treasure} ha fatto la sua parte, e il mondo, per stasera, tiene.",
      "Si torna a casa. La porta di casa, dopo certe storie, sembra più stretta e più buona. Qualcuno racconterà; qualcuno mangerà; qualcuno, già, starà pensando alla prossima."
    ]
  ];

  C.failEndings = [
    [
      "Nessuno è rimasto in gioco.",
      "{villain} tiene ancora ciò che teneva, e {questName} resta una cosa da un altro giorno, un altro coraggio, un'altra cena dopo cui si ha sonno diverso.",
      "Non è la fine del mondo. È la fine di questa storia. Si chiude il libro, si lascia il segnalibro storto, e si promette — sul serio, stavolta — di tornarci quando i cuori saranno di nuovo tre."
    ]
  ];

  C.fleeEndings = [
    [
      "Siete scappati.",
      "Siete vivi, che non è una frase piccola. {villain} resta dove stava, la missione resta aperta come una finestra d'inverno, e voi avete ancora i nomi, le gambe, la possibilità di un altro capitolo.",
      "Si torna un altro giorno. Le storie serie accettano le fughe: sono un modo di dire «non ancora», non «mai»."
    ]
  ];

  C.deathLines = [
    "{name} esce da questa storia. Si rivede a cena, con le ginocchia ancora sporche di avventura e la voce un po' rauca dal troppo coraggio.",
    "{name} è fuori gioco, per stavolta. Il racconto gli fa un cenno, e lui risponde da tavola, dove le fiabe — si sa — finiscono sempre in un bicchiere d'acqua."
  ];

  root.AF_CONTENT = C;
})(typeof window !== "undefined" ? window : globalThis);
