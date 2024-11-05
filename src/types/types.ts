import { components } from "./schema";

// Bestilling
export type BestillBrevRequest =
  components["schemas"]["no.nav.aap.brev.kontrakt.BestillBrevRequest"]
export type BestillBrevResponse =
  components["schemas"]["no.nav.aap.brev.kontrakt.BestillBrevResponse"];
export type BrevBestillingResponse =
  components["schemas"]["no.nav.aap.brev.kontrakt.BrevbestillingResponse"];

// Ferdigstilling
export type FerdigstillBrevRequest =
  components["schemas"]["no.nav.aap.brev.kontrakt.FerdigstillBrevRequest"];

// Jobber
export type JobbInfoDto = components["schemas"]["no.nav.aap.motor.api.JobbInfoDto"];

// Brev
export type Brev = components["schemas"]["no.nav.aap.brev.kontrakt.Brev"];
export type BlokkInnhold = components["schemas"]["no.nav.aap.brev.kontrakt.BlokkInnhold"];
export type Faktagrunnlag =
  components["schemas"]["no.nav.aap.brev.kontrakt.BlokkInnhold.Faktagrunnlag"]
export type FormattertTekst =
  components["schemas"]["no.nav.aap.brev.kontrakt.BlokkInnhold.FormattertTekst"];
export type Tekstbolk = components["schemas"]["no.nav.aap.brev.kontrakt.Tekstbolk"];
export type Blokk = components["schemas"]["no.nav.aap.brev.kontrakt.Blokk"];
export type Innhold = components["schemas"]["no.nav.aap.brev.kontrakt.Innhold"];



