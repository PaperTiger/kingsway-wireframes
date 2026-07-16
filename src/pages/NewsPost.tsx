import { useRoute, Link } from 'wouter'
import { Container, Section, Overline, TextLink, Placeholder } from '../lib/ui'
import { NEWS_SORTED, newsHref } from '../lib/news'

export default function NewsPost() {
  const [, params] = useRoute('/news/:slug')
  const post = NEWS_SORTED.find((n) => n.slug === params?.slug && n.body)

  if (!post) {
    return (
      <Section className="pt-24 md:pt-32">
        <Container>
          <Overline>News</Overline>
          <h1 className="mt-6 text-[46px] font-semibold tracking-[-0.03em] md:text-[60px]">
            Post not found
          </h1>
          <div className="mt-8">
            <TextLink href="/news" arrow="">← Back to news</TextLink>
          </div>
        </Container>
      </Section>
    )
  }

  /* Three most recent other posts. */
  const related = NEWS_SORTED.filter((n) => n.slug !== post.slug).slice(0, 3)

  return (
    <>
      <Section className="pt-20 md:pt-24">
        <Container>
          <article className="max-w-[68ch]">
            <Overline>{post.date}</Overline>
            <h1 className="mt-6 text-[40px] font-semibold leading-[1.1] tracking-[-0.03em] md:text-[52px]">
              {post.title}
            </h1>

            {post.thumbnail && (
              <Placeholder
                label="Image placeholder"
                dims={post.thumbnail}
                className="mt-10 w-full rounded-[3px]"
              />
            )}

            {/* Rich text body */}
            <div className="mt-10">
              {post.body!.map((block, i) => (
                <div key={i} className={i > 0 ? 'mt-6' : ''}>
                  {block.h && (
                    <h2 className="mb-3 text-[22px] font-semibold tracking-[-0.01em] md:text-[24px]">
                      {block.h}
                    </h2>
                  )}
                  {block.p && (
                    <p className="text-[17px] leading-[1.7] text-ink-soft">{block.p}</p>
                  )}
                  {block.ul && (
                    <ul className="space-y-2.5">
                      {block.ul.map((li) => (
                        <li key={li} className="flex gap-3 text-[17px] leading-[1.7] text-ink-soft">
                          <span aria-hidden className="text-ink-faint">—</span>
                          {li}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </article>
        </Container>
      </Section>

      {/* Related news */}
      <Section warm className="border-t border-line">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-[24px] font-semibold tracking-[-0.01em] md:text-[28px]">
              Related news
            </h2>
            <TextLink href="/news">All news</TextLink>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={newsHref(item)}
                className="group flex flex-col rounded-[3px] border border-line bg-paper p-6 transition-colors hover:border-ink-faint"
              >
                <div className="text-[12px] font-medium uppercase tracking-[0.12em] text-ink-faint">
                  {item.date}
                  {item.documentHref && <span> · PDF</span>}
                </div>
                <h3 className="mt-3 text-[18px] font-semibold leading-[1.3] tracking-[-0.01em]">
                  {item.title}
                </h3>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </>
  )
}
