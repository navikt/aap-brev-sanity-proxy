import {
  Brevtype as SanityBrevtype,
  Content as SanityContent,
  Faktagrunnlag as SanityFaktagrunnlag,
  Innhold as SanityInnhold,
  Tekstbolk as SanityTekstbolk,
} from "@navikt/aap-sanity-schema-types";
import {
  Blokk,
  BlokkInnhold,
  BlokkType,
  Brev,
  Formattering,
  Innhold,
  Tekstbolk,
} from "./brevModell.js";
import { Språk } from "./språk.js";
import { LocaleString } from "@navikt/aap-sanity-schema-types/sanity-schema";

export function flettBrevtype(
  brevtype: SanityBrevtype,
  tekstbolker: SanityTekstbolk[],
  innhold: SanityInnhold[],
  faktagrunnlag: SanityFaktagrunnlag[],
  språk: Språk,
): Brev {
  return {
    overskrift: brevtype.overskrift
      ? mapLocaleString(brevtype.overskrift, språk)
      : undefined,
    tekstbolker:
      brevtype.tekstbolker
        ?.map((tekstbolkRef) => findByRef(tekstbolkRef._ref, tekstbolker))
        ?.map((tekstbolk) =>
          flettTekstbolk(tekstbolk, innhold, faktagrunnlag, språk),
        ) || [],
  };
}

export function flettTekstbolk(
  tekstbolk: SanityTekstbolk,
  innhold: SanityInnhold[],
  faktagrunnlag: SanityFaktagrunnlag[],
  språk: Språk,
): Tekstbolk {
  return {
    overskrift: tekstbolk.overskrift
      ? mapLocaleString(tekstbolk.overskrift, språk)
      : undefined,
    innhold:
      tekstbolk.innhold
        ?.map((innholdRef) => findByRef(innholdRef._ref, innhold))
        ?.filter((innhold) => innhold.language === språk.toLowerCase())
        ?.map((innhold) => flettInnhold(innhold, faktagrunnlag)) || [],
  };
}

function mapLocaleString(
  localeString: LocaleString,
  språk: Språk,
): string | undefined {
  switch (språk) {
    case Språk.NB:
      return localeString.nb;
    case Språk.NN:
      return localeString.nn;
    case Språk.EN:
      return localeString.en;
  }
}

export function flettInnhold(
  innhold: SanityInnhold,
  faktagrunnlag: SanityFaktagrunnlag[],
): Innhold {
  return {
    overskrift: innhold.overskrift!,
    blokker: (innhold.riktekst || []).map((riktekst) =>
      flettBlokk(riktekst, faktagrunnlag),
    ),
    kanRedigeres: innhold.kanRedigeres!,
    erFullstendig: innhold.erFullstendig!,
  };
}

function flettBlokk(
  riktekst: SanityContent,
  faktagrunnlag: SanityFaktagrunnlag[],
): Blokk {
  return {
    innhold: (riktekst.children || [])?.map((child) =>
      flettBlokkInnhold(child, faktagrunnlag),
    ),
    type: mapBlokkType(riktekst),
  };
}

function mapBlokkType(riktekst: SanityContent): BlokkType {
  if (riktekst.listItem === "bullet") {
    return BlokkType.LISTE;
  }
  return BlokkType.AVSNITT;
}

function flettBlokkInnhold(
  contentChild: ContentChild,
  faktagrunnlag: SanityFaktagrunnlag[],
): BlokkInnhold {
  if (contentChild._type === "span") {
    return {
      tekst: contentChild.text!,
      formattering: mapFormatterign(contentChild.marks || []),
      type: "tekst",
    };
  } else if (contentChild._type === "faktagrunnlag") {
    const fakta = findByRef(contentChild._ref, faktagrunnlag);
    return {
      visningsnavn: fakta.visningsnavn!,
      tekniskNavn: fakta.tekniskNavn!,
      type: "faktagrunnlag",
    };
  }
  throw new Error(`Ukjent innholdstype ${contentChild._type}`);
}

function mapFormatterign(formattering: string[]): Formattering[] {
  return formattering.map((x) => {
    switch (x) {
      case "underline":
        return Formattering.UNDERSTREK;
      case "em":
        return Formattering.KURSIV;
      case "strong":
        return Formattering.FET;
      default:
        throw new Error(`Ukjent formattering ${x}`);
    }
  });
}

type SanityObjekt = {
  _id: string;
};

function findByRef<T extends SanityObjekt>(ref: string, sanityObjekts: T[]): T {
  const innhold = sanityObjekts.find((x) => x._id === ref);
  if (!innhold) {
    throw new Error(`Fant ikke objekt basert på referanse ${ref}`);
  }
  return innhold;
}

type ContentChild =
  | {
      marks?: Array<string>;
      text?: string;
      _type: "span";
    }
  | {
      _ref: string;
      _type: "faktagrunnlag" | "reference";
    };
