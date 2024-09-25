import {
  Content as SanityContent,
  Innhold as SanityInnhold,
} from "./sanity/sanityTypes.js";
import { Content, Faktagrunnlag, Innhold, Mark, Tekst } from "./types.js";

export function flettBrev(innhold: SanityInnhold): Innhold {
  return {
    language: innhold.language,
    overskrift: innhold.overskrift!,
    riktekst: (innhold.riktekst || []).map(mapRiktekst),
    kanRedigeres: innhold.kanRedigeres!,
    erFullstendig: innhold.erFullstendig!,
  };
}

function mapRiktekst(riktekst: SanityContent): Content {
  return {
    children: (riktekst.children || [])?.map(mapContentChild),
    style: riktekst.style,
    listItem: riktekst.listItem,
    level: riktekst.level,
  };
}

function mapContentChild(contentChild: ContentChild): Tekst | Faktagrunnlag {
  if (contentChild._type == "span") {
    return {
      marks: (contentChild.marks || []) as Mark[],
      text: contentChild.text!,
      _type: "tekst",
    };
  } else {
    return {
      _ref: contentChild._ref,
      _type: "faktagrunnlag",
    };
  }
}

type ContentChild =
  | {
      marks?: Array<string>;
      text?: string;
      _type: "span";
    }
  | {
      _ref: string;
      _type: "reference";
    };
