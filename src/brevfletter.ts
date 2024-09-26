import {
  Tekstbolk as SanityTekstbolk,
  Innhold as SanityInnhold,
  Content as SanityContent,
  Faktagrunnlag as SanityFaktagrunnlag,
} from "@navikt/aap-sanity-schema-types";
import {
  Tekst,
  Faktagrunnlag,
  Innhold,
  Formattering,
  Segment,
  Tekstbolk,
} from "./types.js";

export function flettTekstbolk(
  tekstbolk: SanityTekstbolk,
  innhold: SanityInnhold[],
  faktagrunnlag: SanityFaktagrunnlag[],
): Tekstbolk {
  return {
    overskrift: tekstbolk.overskrift,
    innhold:
      tekstbolk.innhold?.map((innholdRef) =>
        flettInnhold(findByRef(innholdRef._ref, innhold)!, faktagrunnlag),
      ) || [],
  };
}

export function flettInnhold(
  innhold: SanityInnhold,
  faktagrunnlag: SanityFaktagrunnlag[],
): Innhold {
  return {
    language: innhold.language,
    overskrift: innhold.overskrift!,
    riktekst: (innhold.riktekst || []).map((riktekst) =>
      mapRiktekst(riktekst, faktagrunnlag),
    ),
    kanRedigeres: innhold.kanRedigeres!,
    erFullstendig: innhold.erFullstendig!,
  };
}

function mapRiktekst(
  riktekst: SanityContent,
  faktagrunnlag: SanityFaktagrunnlag[],
): Tekst {
  return {
    children: (riktekst.children || [])?.map((child) =>
      mapContentChild(child, faktagrunnlag),
    ),
    listeInnrykk: riktekst.level,
  };
}

function mapContentChild(
  contentChild: ContentChild,
  faktagrunnlag: SanityFaktagrunnlag[],
): Segment | Faktagrunnlag {
  if (contentChild._type === "span") {
    return {
      formattering: (contentChild.marks || []) as Formattering[],
      text: contentChild.text!,
      tekstType: "tekst",
    };
  } else if (contentChild._type === "faktagrunnlag") {
    const fakta = findByRef(contentChild._ref, faktagrunnlag);
    return {
      visningsnavn: fakta.visningsnavn!,
      tekniskNavn: fakta.tekniskNavn!,
      tekstType: "faktagrunnlag",
    };
  }
  throw new Error(`Ukjent innholdstype ${contentChild._type}`);
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
