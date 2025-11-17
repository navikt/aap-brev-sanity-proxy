import { defineQuery } from 'groq';

export const MalQuery = defineQuery(`*[_id==$id && _type=="mal"] {
  ...,
  _id,
  beskrivelse,
  "overskrift": (overskrift[_key == $lang].value)[0],
  journalposttittel,
  kanSendesAutomatisk,
  delmaler[] {
    ...,
    _key,
    obligatorisk,
    delmal -> {
      ...,
      _id,
      beskrivelse,
      "overskrift": (overskrift[_key == $lang].value)[0],
      "teksteditor": (teksteditor[_key == $lang].value)[0][] {
        ...,
        _type == 'block' => {
          ...,
          _key,
          children[] {
            ...,
            _type != 'faktagrunnlag' => {
            _key,
              ...
            },
            _type == 'faktagrunnlag' => @-> {
              ...,
              _key,
              _id,
              datatype,
              tekniskNavn,
              visningsnavn
            }
          }
        },
        _type == 'valgRef' => {
          ...,
          _key,
          obligatorisk,
          valg -> {
            ...,
            _id,
            beskrivelse,
            alternativer[] {
              _type == 'fritekst' => {
                _key,
                ...
              },
              _type == 'kategorisertTekstRef' => {
                ...,
                _key,
                tekst -> {
                  ...,
                  beskrivelse,
                  "teksteditor": (teksteditor[_key == $lang].value)[0][] {
                    ...,
                    _id,
                    children[] {
                      ...,
                      _type != 'faktagrunnlag' => {
                         _key,
                        ...
                      },
                      _type == 'faktagrunnlag' => @-> {
                          ...,
                          _key,
                          _id,
                          datatype,
                          tekniskNavn,
                          visningsnavn
                      }
                    }
                  }
                },
                kategori -> {
                  ...,
                  _id,
                  visningsnavn,
                  tekniskNavn
                  }
                }
              }
          }
        },
        _type == 'periodetekstRef' => {
          periodetekst -> {
            ...,
            _key,
            "teksteditor": (teksteditor[_key == $lang].value)[0][] {
              ...,
              children[] {
                ...,
                _type != 'faktagrunnlag' => {
                  ...
                },
                _type == 'faktagrunnlag' => @-> {
                  ...,
                  _key,
                  _id,
                  datatype,
                  tekniskNavn,
                  visningsnavn
                }
              }
            }
          }
        },
        _type == 'betingetTekstRef' => {
          ...,
          tekst -> {
            ...,
            "teksteditor": (teksteditor[_key == $lang].value)[0][] {
              ...,
              children[] {
                ...,
                _type != 'faktagrunnlag' => {
                  ...,
                  _key,
                },
                _type == 'faktagrunnlag' => @-> {
                  ...,
                  _key,
                  _id,
                  datatype,
                  tekniskNavn,
                  visningsnavn
                }
              }
            }
          },
          kategorier[] -> {
            _id,
            visningsnavn,
            tekniskNavn
          }
        },
        _type == 'fritekst' => {
          ...,
          _key,
          _type,
        }
      }
    }
  }
}[0]`);
