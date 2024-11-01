import { describe, expect, it } from "vitest";
import { mapLocaleString } from "./brevfletter";
import { LocaleString } from "@navikt/aap-sanity-schema-types/sanity-schema";
import { Språk } from "./språk";

describe('mapLocaleToString', () => {
  it('NO skal gi locale.nb', () => {
    const overskrift: LocaleString = {
      _type: 'localeString',
      nb: 'overskrift'
    }
    expect(mapLocaleString(overskrift, Språk.NB)).toBe('overskrift')
  })
})