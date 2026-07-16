import { Container, Section, Overline } from '../lib/ui'

/*
  Legal notice and disclaimer. Copy is reproduced verbatim from the live
  Kingsway legal page (https://kingsway-financial.com/legal/) — it is lawyer-
  drafted, so treat it as fixed content and don't rewrite it to match the
  site's copy conventions. The all-caps blocks are intentional.
*/
type Clause = { title?: string; body: string; caps?: boolean }
type LegalSection = { heading: string; clauses: Clause[] }

const SECTIONS: LegalSection[] = [
  {
    heading: 'Use of site',
    clauses: [
      {
        body: 'The materials displayed on this Site, including, but not limited to, all written material, photographs, illustrations, artwork and other graphic material, and names, logos, trademarks and service marks, are the property of Kingsway or its licensors and are protected by copyright, trademark and other intellectual property laws. Use of the materials on this Site may violate copyright, trademark, and other laws. Any content from this Site may be displayed and printed solely for your personal, non-commercial use, provided that you retain all copyright and other proprietary notices contained in the original materials on any copies of the materials. You may not modify the materials on this Site in any way, or reproduce, retransmit, distribute, disseminate, sell, publish, broadcast or otherwise use any material from this Site without the express prior written consent of Kingsway. Any use of these materials for any purpose is prohibited.',
      },
    ],
  },
  {
    heading: 'Disclaimers',
    clauses: [
      {
        title: 'No obligation to update information',
        body: 'Kingsway believes that the information contained herein is reliable. Kingsway, however, does not guarantee the accuracy or completeness of any information on this Site. All information included on this Site, whether historic in nature or forward-looking, speaks only as of the date shown on such information. We do not undertake any obligation to update or correct such information after it is posted or to remove such information from the Site if it is no longer accurate or complete.',
      },
      {
        title: 'No cybersecurity warranty',
        body: 'Kingsway does not warrant that this Site and the server connected to it are free of computer viruses or other harmful components.',
      },
      {
        title: 'Stock price information – no offer of securities',
        body: 'Kingsway does not warrant or guarantee the accuracy or completeness of the information regarding stock prices provided on this Site, and under no circumstances will Kingsway be liable for any loss or direct, indirect, incidental, special or consequential damages caused by reliance on this information or by the risks of the stock market. Information on this Site does not constitute an offer to sell, or the solicitation of an offer to buy any securities, and you should not rely on such information in connection with any investment decision.',
      },
      {
        title: 'No warranty',
        caps: true,
        body: 'THE MATERIALS (INCLUDING ALL SOFTWARE) AND SERVICES AT THIS SITE ARE PROVIDED “AS IS” WITHOUT WARRANTIES OF ANY KIND, INCLUDING, BUT NOT LIMITED TO, WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT OF INTELLECTUAL PROPERTY. Kingsway’s obligations with respect to its products and services are governed solely by the agreements under which they are provided and nothing on this Site should be construed to alter such agreements.',
      },
      {
        title: 'Limitation of liability',
        caps: true,
        body: 'IN NO EVENT WILL KINGSWAY, ITS SUPPLIERS, OR OTHER THIRD PARTIES MENTIONED AT THIS SITE BE LIABLE FOR ANY DAMAGES WHATSOEVER (INCLUDING, WITHOUT LIMITATION, SPECIAL, INCIDENTAL, INDIRECT, PUNITIVE, CONSEQUENTIAL, OR THOSE RESULTING FROM LOST PROFITS, LOST DATA OR BUSINESS INTERRUPTION) ARISING OUT OF THE USE, INABILITY TO USE, OR THE RESULTS OF USE OF THIS SITE, ANY WEB SITES LINKED TO THIS SITE, OR THE MATERIALS OR INFORMATION OR SERVICES CONTAINED AT ANY OR ALL SUCH SITES, WHETHER BASED ON WARRANTY, CONTRACT, TORT OR ANY OTHER LEGAL THEORY AND WHETHER OR NOT KINGSWAY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. IF YOUR USE OF THE MATERIALS, INFORMATION OR SERVICES FROM THIS SITE RESULTS IN THE NEED FOR SERVICING, REPAIR OR CORRECTION OF EQUIPMENT OR DATA, YOU ASSUME ALL COSTS THEREOF. APPLICABLE LAW MAY NOT ALLOW THE EXCLUSION OR LIMITATION OF INCIDENTAL OR CONSEQUENTIAL DAMAGES, SO THESE LIMITATIONS OR EXCLUSIONS MAY NOT APPLY TO YOU.',
      },
      {
        title: 'Links to other sites',
        body: 'Links on this Site to third-party web sites are provided solely as a convenience to you. Kingsway makes no representations whatsoever about any other web site which you may access through this Site. When you access a non-Kingsway web site, you should understand that it is independent from Kingsway and that Kingsway has no control over the content presented in that web site. A link to a non-Kingsway site does not mean that Kingsway endorses or accepts any responsibility for the content, or the use, of such a web site. If you decide to access any of the third-party web sites linked to this Site, you do so entirely at your own risk. It is up to you to take precautions to ensure that whatever you select for your use is free of such items as viruses and other items of a destructive nature.',
      },
    ],
  },
  {
    heading: 'SEC information',
    clauses: [
      {
        body: 'The reports filed by us with the Securities and Exchange Commission that are listed on, linked to or are accessed through this Site speak only as of the respective dates on which they were filed. The contents of those reports may become out-of-date. We do not assume any duty of disclosure beyond that which is imposed by law, and expressly disclaim any other (a) obligation to update the information on this Site or (b) duty to update any information set forth in our SEC filings.',
      },
    ],
  },
  {
    heading: 'Forward-looking statements',
    clauses: [
      {
        body: 'This site may include “forward-looking statements” within the meaning of Section 27A of the Securities Act of 1933 and Section 21E of the Securities Exchange Act of 1934 that are not historical facts, and involve risks and uncertainties that could cause actual results to differ materially from those expected and projected. Words such as “expects,” “believes,” “anticipates,” “intends,” “estimates,” “seeks” and variations and similar words and expressions are intended to identify such forward-looking statements; however, the absence of any such words does not mean that a statement is a not a forward-looking statement. Such forward-looking statements relate to future events or future performance but reflect Kingsway management’s current beliefs, based on information currently available. A number of factors could cause actual events, performance or results to differ materially from the events, performance and results discussed in the forward-looking statements. For information identifying important factors that could cause actual results to differ materially from those anticipated in the forward-looking statements, please refer to the section entitled “Risk Factors” in Kingsway’s most recently filed Annual Report on Form 10-K. Except as expressly required by applicable securities law, Kingsway disclaims any intention or obligation to update or revise any forward-looking statements whether as a result of new information, future events or otherwise.',
      },
    ],
  },
]

export default function Legal() {
  return (
    <Section className="pt-20 md:pt-24">
      <Container>
        <Overline>Legal</Overline>
        <h1 className="mt-6 max-w-[18ch] text-[46px] font-semibold tracking-[-0.03em] md:text-[60px]">
          Legal notice and disclaimer
        </h1>

        {/* Standing user agreement notice, above the numbered sections. */}
        <div className="mt-12 max-w-[74ch] border-l-2 border-ink pl-6">
          <h2 className="text-[15px] font-semibold uppercase tracking-[0.1em]">
            Kingsway internet site user agreement and terms of use
          </h2>
          <p className="mt-3 text-[15px] leading-[1.6] text-ink-soft">
            Attention: please read these terms carefully before using this web
            site. Using this web site indicates that you accept these terms. If
            you do not accept these terms, do not use this web site.
          </p>
        </div>

        <div className="mt-16 max-w-[74ch] space-y-14">
          {SECTIONS.map((section) => (
            <section key={section.heading}>
              <h2 className="text-[24px] font-semibold tracking-[-0.01em] md:text-[28px]">
                {section.heading}
              </h2>
              <div className="mt-6 space-y-8">
                {section.clauses.map((clause, i) => (
                  <div key={i}>
                    {clause.title && (
                      <h3 className="text-[17px] font-semibold">{clause.title}</h3>
                    )}
                    <p
                      className={`text-[15px] leading-[1.7] text-ink-soft ${
                        clause.title ? 'mt-2' : ''
                      } ${clause.caps ? 'tracking-[0.01em]' : ''}`}
                    >
                      {clause.body}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </Container>
    </Section>
  )
}
