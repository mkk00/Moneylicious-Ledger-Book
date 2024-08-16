import { Helmet } from 'react-helmet-async'

interface MetaTagsProps {
  title: string
  description: string
  url: string
}

const MetaTags = ({ title, description, url }: MetaTagsProps) => (
  <Helmet>
    <title>{title}</title>
    <meta
      name="description"
      content={description}
    />
    <meta
      property="og:title"
      content={title}
    />
    <meta
      property="og:description"
      content={description}
    />
    <meta
      property="og:url"
      content={url}
    />
  </Helmet>
)

export default MetaTags
