import {
  Content as SanityContent,
  Innhold as SanityInnhold,
  Faktagrunnlag as SanityFaktagrunnlag,
} from "@navikt/aap-sanity-schema-types";
import {
  Tekst,
  Faktagrunnlag,
  Innhold,
  Formattering,
  Segment,
} from "./types.js";

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
    const fakta = faktagrunnlag.find(
      (fakta) => fakta._id === contentChild._ref,
    );
    if (!fakta) {
      throw new Error(
        `Fant ikke faktagrunnlag med referanse ${contentChild._ref}`,
      );
    }
    return {
      visningsnavn: fakta.visningsnavn!,
      tekniskNavn: fakta.tekniskNavn!,
      tekstType: "faktagrunnlag",
    };
  }
  throw new Error(`Ukjent innholdstype ${contentChild._type}`);
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
