# Adventure Family

Libro-game di sopravvivenza, nello stile di *Giungla mortale*, *La maledizione del faraone* e *Sperduto nello spazio*. Si legge in seconda persona, si sceglie, si gira la ruota. Niente fiabe: giungla, tomba, nave in avaria, montagna, mare, deserto.

## Come si gioca

Un solo schermo, tutti insieme. Non serve un master.

1. Si mettono i nomi (da 1 a 6). Uno può tenere il telefono e leggere.
2. Si legge un pezzo di spedizione, come un libro-game.
3. Chi ha il turno sceglie **una** delle due azioni.
4. Si gira la **bussola**:
   - **verde**: l’azione riesce e il gruppo **avanza** (contatore +1)
   - **giallo**: si gira ancora, stesso turno
   - **rosso**: l’azione fallisce, **una vita in meno**, e **non avanzate** — la storia va avanti da una posizione peggiore
5. Ognuno ha **3 vite**. A zero quella persona è fuori combattimento. Il gruppo continua senza di lei.
6. Non c’è un tetto di scene. Si continua finché fate abbastanza passi avanti e chiudete l’uscita, o finché cadono tutti.

Ogni nuova partita pesca una spedizione non ancora usata. Quando le avete fatte tutte, si rimescola.

## Avvio locale

Apri `index.html` nel browser, oppure:

```
python3 -m http.server 8080
```

Poi vai su `http://localhost:8080`.

## GitHub Pages

In **Settings → Pages** del repo `Adventure-family`, pubblica il branch `main` dalla cartella `/`.

Tutto resta nel browser (`localStorage`): niente account, niente server.
