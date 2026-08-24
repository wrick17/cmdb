import { useEffect } from "react";
import { useSelector } from "react-redux";

const Meta = ({ name, description, image }) => {
  const config = useSelector((state) => state.config);
  const { images } = config || {};
  const { secure_base_url, poster_sizes } = images || {};

  const src = image
    ? `${secure_base_url}${poster_sizes[poster_sizes.length - 2]}${image}`
    : "/placeholders/placeholder.png";

  useEffect(() => {
    const previousTitle = document.title;
    const entries = [
      ["name", "description", description],
      ["property", "og:title", name],
      ["property", "og:description", description],
      ["property", "og:image", src],
      ["property", "og:site_name", "CMDb"],
      ["property", "og:type", "website"],
      ["name", "twitter:card", "summary"],
      ["name", "twitter:title", name],
      ["name", "twitter:description", description],
      ["name", "twitter:image", src],
      ["name", "twitter:creator", "@wrick7132"],
    ];
    const nodes = entries.map(([attribute, key, content]) => {
      const selector = `meta[${attribute}="${key}"]`;
      const node =
        document.head.querySelector(selector) || document.createElement("meta");
      const created = !node.parentNode;
      const previousContent = node.getAttribute("content");

      node.setAttribute(attribute, key);
      node.setAttribute("content", content || "");
      if (created) document.head.append(node);

      return { node, created, previousContent };
    });

    document.title = name || "CMDb";

    return () => {
      document.title = previousTitle;
      nodes.forEach(({ node, created, previousContent }) => {
        if (created) node.remove();
        else if (previousContent === null) node.removeAttribute("content");
        else node.setAttribute("content", previousContent);
      });
    };
  }, [description, name, src]);

  return null;
};

export default Meta;
