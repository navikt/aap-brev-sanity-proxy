import {
  Brevtype as SanityBrevtype,
  Content as SanityContent,
  Faktagrunnlag as SanityFaktagrunnlag,
  Innhold as SanityInnhold,
  Tekstbolk as SanityTekstbolk,
} from '@navikt/aap-sanity-schema-types';
import { Blokk, BlokkInnhold, BlokkType, Brev, Formattering, Innhold, Tekstbolk } from './brevModell.js';
import { Språk } from './språk.js';
import { LocaleString } from '@navikt/aap-sanity-schema-types/sanity-schema';
import { v4 as uuidv4 } from 'uuid';

export function flettBrevtype(
  brevtype: SanityBrevtype,
  tekstbolker: SanityTekstbolk[],
  innhold: SanityInnhold[],
  faktagrunnlag: SanityFaktagrunnlag[],
  språk: Språk
): Brev {
  return {
    kanSendesAutomatisk: brevtype.kanSendesAutomatisk || false,
    overskrift: brevtype.overskrift ? mapLocaleString(brevtype.overskrift, språk) : undefined,
    kanOverstyreBrevtittel: brevtype.kanOverstyreBrevtittel,
    journalpostTittel: brevtype.journalpostTittel ? mapLocaleString(brevtype.journalpostTittel, språk) : undefined,
    tekstbolker:
      brevtype.tekstbolker
        ?.map((tekstbolkRef) => findByRef(tekstbolkRef._ref, tekstbolker))
        ?.map((tekstbolk) => flettTekstbolk(tekstbolk, innhold, faktagrunnlag, språk)) || [],
  };
}

export function flettTekstbolk(
  tekstbolk: SanityTekstbolk,
  innhold: SanityInnhold[],
  faktagrunnlag: SanityFaktagrunnlag[],
  språk: Språk
): Tekstbolk {
  return {
    id: uuidv4(),
    overskrift: tekstbolk.overskrift ? mapLocaleString(tekstbolk.overskrift, språk) : undefined,
    innhold:
      tekstbolk.innhold
        ?.map((innholdRef) => findByRef(innholdRef._ref, innhold))
        ?.filter((innhold) => innhold.language === språk.toLowerCase())
        ?.map((innhold) => flettInnhold(innhold, faktagrunnlag)) || [],
  };
}

export function mapLocaleString(localeString: LocaleString, språk: Språk): string | undefined {
  switch (språk) {
    case Språk.NB:
      return localeString.nb;
    case Språk.NN:
      return localeString.nn;
    case Språk.EN:
      return localeString.en;
  }
}

export function flettInnhold(innhold: SanityInnhold, faktagrunnlag: SanityFaktagrunnlag[]): Innhold {
  return {
    id: uuidv4(),
    overskrift: innhold.overskrift,
    blokker: (innhold.riktekst || [])
      .reduce((accumulator: SanityContent[], content: SanityContent) => {
        if (accumulator.length === 0) return accumulator.concat(content);
        if (content.listItem === 'bullet' && accumulator[accumulator.length - 1]?.listItem === 'bullet') {
          const prevItem = accumulator[accumulator.length - 1];
          accumulator[accumulator.length - 1] = {
            ...prevItem,
            // Støtter foreløpig ikke nestede lister, eller lister med ulik formatering etc.
            children: prevItem.children?.concat(content.children ?? []),
          };
          return accumulator;
        }
        return accumulator.concat(content);
      }, [])
      .map((riktekst) => flettBlokk(riktekst, faktagrunnlag)),
    kanRedigeres: innhold.kanRedigeres!,
    erFullstendig: innhold.erFullstendig!,
  };
}

function flettBlokk(riktekst: SanityContent, faktagrunnlag: SanityFaktagrunnlag[]): Blokk {
  return {
    id: uuidv4(),
    innhold: (riktekst.children || [])?.map((child) => flettBlokkInnhold(child, faktagrunnlag)),
    type: mapBlokkType(riktekst),
  };
}

function mapBlokkType(riktekst: SanityContent): BlokkType {
  if (riktekst.listItem === 'bullet') {
    return BlokkType.LISTE;
  }
  return BlokkType.AVSNITT;
}

function flettBlokkInnhold(contentChild: ContentChild, faktagrunnlag: SanityFaktagrunnlag[]): BlokkInnhold {
  if (contentChild._type === 'span') {
    return {
      id: uuidv4(),
      tekst: contentChild.text!,
      formattering: mapFormatterign(contentChild.marks || []),
      type: 'TEKST',
    };
  } else if (contentChild._type === 'faktagrunnlag') {
    const fakta = findByRef(contentChild._ref, faktagrunnlag);
    return {
      id: uuidv4(),
      visningsnavn: fakta.visningsnavn!,
      tekniskNavn: fakta.tekniskNavn!,
      type: 'FAKTAGRUNNLAG',
    };
  }
  throw new Error(`Ukjent innholdstype ${contentChild._type}`);
}

function mapFormatterign(formattering: string[]): Formattering[] {
  return formattering.map((x) => {
    switch (x) {
      case 'underline':
        return Formattering.UNDERSTREK;
      case 'em':
        return Formattering.KURSIV;
      case 'strong':
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
      _type: 'span';
    }
  | {
      _ref: string;
      _type: 'faktagrunnlag' | 'reference';
    };
