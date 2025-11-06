export const style = (saksnummer?: string) => `
    @page {
        size: A4 portrait;
        margin: 1cm 0.3cm 0.5cm;
        padding-bottom: 1cm;

        ${
          saksnummer
            ? `@bottom-left {
            font-family: "Source Sans Pro", SourceSansPro, Source_Sans_Pro, ArialSystem, sans-serif;
            font-size: 12px;
            content: "Saksnummer ${saksnummer}";
        }`
            : ''
        }

        @bottom-right {
            font-family: "Source Sans Pro", SourceSansPro, Source_Sans_Pro, ArialSystem, sans-serif;
            font-size: 12px;
            content: "Side " counter(page) " av " counter(pages);
        }
    }

    * {
        font-family: "Source Sans Pro";
    }

    main {
        margin: 40px, 40px, 0, 40px;
    }

     .header {
           margin-bottom: 40px;
    }

    .navLogo {
        height: 75px;
        margin-bottom: 40px;
    }

    .mottaker {
        clear: both;
        padding-bottom: 16px;
    }

    .mottaker p {
        margin: 0;
        margin-bottom: 0.5rem;
    }

    .signatur-wrapper {
       width: 100%;
       padding: 4px 0;
       display: block;
    }

    .signatur {
        vertical-align: top;
        display: inline-block;
        width: 45%;
        margin-bottom: 1rem;

    }

    .avoid-page-break {
        page-break-inside: avoid;
    }

    .signatur p {
        margin: 0;
        margin-bottom: 0.5rem;
    }

    #footer {
        position: running(footer);
        font-size: 12px;
        margin-top: -25px;
        padding-left: 0.6cm;
    }

    .sidetall {
        float: right;
    }

    #pagenumber:before {
        content: counter(page);
    }

    #pagecount:before {
        content: counter(pages)
    }
   
    .clear {
        clear: left;
    }
`;
