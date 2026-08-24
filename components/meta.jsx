import { useSelector } from "react-redux";

const Meta = ({ name, description, image }) => {
  const config = useSelector((state) => state.config);
  const { images } = config || {};
  const { secure_base_url, poster_sizes } = images || {};

  const src = image
    ? `${secure_base_url}${poster_sizes[poster_sizes.length - 2]}${image}`
    : "/placeholders/placeholder.png";

  return (
    <>
      <title>{name}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={name} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={src} />

      <meta property="og:site_name" content="CMDb" />
      <meta property="og:type" content="website" />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={name} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={src} />
      <meta name="twitter:creator" content="@wrick7132" />
    </>
  );
};

export default Meta;
