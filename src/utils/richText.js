const stripProblemStyleBlocks = (html) => {
  return html.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, (styleBlock) => {
    const content = styleBlock
      .replace(/margin-block-(start|end)\s*:[^;}]*(;)?/gi, "")
      .replace(/div\.\s+\.hl-code-toolbar/gi, "div .hl-code-toolbar");
    return content.trim() === "<style></style>" ? "" : content;
  });
};

export const formatRichText = (content) => {
  if (!content) return "";

  return stripProblemStyleBlocks(String(content))
    .replace(/<img[^>]*>/gi, (match) => {
      return match.replace(/\sstyle=("[^"]*"|'[^']*')/gi, "");
    })
    .replace(/<img/gi, '<img style="width:100%;height:auto;display:block;"');
};
