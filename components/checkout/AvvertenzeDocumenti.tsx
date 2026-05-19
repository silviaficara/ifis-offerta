import Link from "next/link";

const POLIZZA_GENERALI_URL =
  "https://tsfiri.blob.core.windows.net/docesterni/IFIS/400253791.pdf";

export function AvvertenzeDocumenti() {
  return (
    <section className="mt-16 pt-12 border-t border-zinc-200">
      <h2 className="text-sm font-semibold text-zinc-900 mb-3">
        Avvertenze e Documenti
      </h2>

      <p className="text-[9px] text-zinc-500 leading-tight">
        Noleggio offerto da Ifis Rental Services S.r.l., società commerciale del
        Gruppo Banca Ifis S.p.A, ai consumatori. Per la conclusione del
        contratto di noleggio è obbligatorio fornire dati, informazioni e
        documentazione autentici, veritieri, completi ed aggiornati, nonché i
        dati del conto corrente accessibile online di cui il cliente è
        intestatario presso soggetti terzi; un recapito telefonico mobile
        attivo e un indirizzo email valido di cui il cliente dispone in via
        esclusiva. La verifica positiva di tali requisiti è soggetta a
        valutazione da parte della società. Per fruire del noleggio è inoltre
        obbligatorio registrarsi all’Area Riservata resa disponibile da Ifis
        Rental Services dopo la consegna del bene. Diritto di ripensamento: il
        cliente ha diritto di recedere dal contratto di noleggio, per qualsiasi
        motivo, senza necessità di fornire spiegazioni e senza alcuna penalità,
        nel termine di 14 (quattordici) giorni dalla data di consegna del bene
        (art. 52 D. Lgs. 206/2005 “Codice del Consumo”). Durata del noleggio:
        12, 24 o 36 mesi. Se il cliente non restituisce il bene entro la
        scadenza originaria, il contratto si rinnova, per la durata di
        ulteriori 12 mesi. Durante tale periodo il cliente potrà recedere, dal
        contratto, in qualsiasi momento, restituendo il bene. A seguito della
        restituzione Ifis Rental Services non addebiterà più alcun canone di
        locazione e il contratto si intenderà automaticamente cessato. Un
        estratto della polizza stipulata da Ifis Rental Services in qualità di
        contraente, assicurato e beneficiario contro i rischi di furto e danno
        totale (non riparabile) e parziale (riparabile) ai propri beni è
        allegata al contratto di noleggio. Per poterne beneficiare è necessario
        denunciare il danno o il furto entro 3 giorni dall’evento con le
        modalità definite nel contratto di noleggio, dichiarando altresì
        l’eventuale adesione del cliente ad altre polizze a copertura del bene
        noleggiato per i medesimi rischi. Si segnala che in caso di furto e
        danno (non riparabile) coperto dalla polizza, Ifis Rental Services
        provvederà a risolvere il contratto addebitando al cliente i costi
        relativi alle franchigie previste nell’ “Estratto di Polizza” allegato
        al contratto. In caso di danno parziale (riparabile), il cliente potrà
        provvedere alla riparazione del bene, solo qualora autorizzato da Ifis
        Rental Service, con costi a proprio carico che il Ifis Rental Services
        provvederà a rimborsare entro i limiti previsti nell’”Estratto Polizza”
        e nel contratto di noleggio. Per maggiori dettagli si invita a leggere
        con attenzione il contratto (art. 9) e l’allegato “Estratto Polizza”
        oltre a consultare il testo integrale della polizza di Generali
        reperibile al{" "}
        <a
          href={POLIZZA_GENERALI_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#0066cc] hover:underline"
        >
          seguente link
        </a>
        , prestando particolare attenzione a quanto indicato nelle esclusioni,
        limiti di rimborso dei danni ed eventuali costi a carico del cliente.
        Per la consultazione dei documenti relativi al prodotto di noleggio
        offerto da Ifis Rental Services si riavvia alla sezione dedicata.
      </p>

      <Link
        href="/documenti-consultabili"
        className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-[#0066cc] hover:underline"
      >
        Documenti noleggio consultabili →
      </Link>
    </section>
  );
}
