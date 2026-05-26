const stripProblemStyleBlocks = (html) => {
  return html.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, (styleBlock) => {
    const content = styleBlock
      .replace(/margin-block-(start|end)\s*:[^;}]*(;)?/gi, "")
      .replace(/div\.\s+\.hl-code-toolbar/gi, "div .hl-code-toolbar");
    return content.trim() === "<style></style>" ? "" : content;
  });
};

const appendImageProcess = (url) => {
  if (!url || /image_process=format,webp/i.test(url)) return url;
  if (/^(data:|blob:|wxfile:|file:)/i.test(url)) return url;

  const hashIndex = url.indexOf("#");
  const hash = hashIndex >= 0 ? url.slice(hashIndex) : "";
  const baseUrl = hashIndex >= 0 ? url.slice(0, hashIndex) : url;
  const separator = baseUrl.includes("?") ? "&" : "?";

  return `${baseUrl}${separator}image_process=format,webp${hash}`;
};

export const formatRichText = (content) => {
  if (!content) return "";

  return stripProblemStyleBlocks(String(content))
    .replace(/<img[^>]*>/gi, (match) => {
      return match
        .replace(/\sstyle=("[^"]*"|'[^']*')/gi, "")
        .replace(/\ssrc=(["'])(.*?)\1/gi, (_srcMatch, quote, url) => {
          return ` src=${quote}${appendImageProcess(url)}${quote}`;
        });
    })
    .replace(/<img/gi, '<img style="width:100%;height:auto;display:block;"');
};
