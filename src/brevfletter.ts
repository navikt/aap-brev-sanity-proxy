import {
  Content as SanityContent,
  Innhold as SanityInnhold,
} from "@navikt/aap-sanity-schema-types";
import {
  Tekst,
  Faktagrunnlag,
  Innhold,
  Formattering,
  Segment,
} from "./types.js";

export function flettBrev(innhold: SanityInnhold): Innhold {
  return {
    language: innhold.language,
    overskrift: innhold.overskrift!,
    riktekst: (innhold.riktekst || []).map(mapRiktekst),
    kanRedigeres: innhold.kanRedigeres!,
    erFullstendig: innhold.erFullstendig!,
  };
}

function mapRiktekst(riktekst: SanityContent): Tekst {
  return {
    children: (riktekst.children || [])?.map(mapContentChild),
    listeInnrykk: riktekst.level,
  };
}

function mapContentChild(contentChild: ContentChild): Segment | Faktagrunnlag {
  if (contentChild._type === "span") {
    return {
      formattering: (contentChild.marks || []) as Formattering[],
      text: contentChild.text!,
      tekstType: "tekst",
    };
  } else if (contentChild._type === "faktagrunnlag") {
    return {
      referanse: contentChild._ref,
      tekstType: "faktagrunnlag",
    };
  }
  throw new Error("");
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
